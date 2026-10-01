# Task 92 — CloudSyncService: Orquestrador GistDB

- **Branch:** `task/92-cloud-sync-service`
- **Prioridade:** 08
- **Dependências:** —
- **Bloqueia:** 94, 95, 96, 97

---

## 🎯 Objetivo

Criar `src/domain/services/CloudSyncService.ts` — o único ponto de acesso ao GistDB em toda a aplicação. Este serviço abstrai completamente a biblioteca do restante do app, garantindo que qualquer mudança futura no GistDB seja contida aqui.

---

## 📦 Instalação

```bash
npm install gistdb
```

Verificar se o `package.json` possui `gistdb` como `dependency` (não `devDependency`).

---

## 📋 Análise Profunda (Antes de Codar)

1. Ler o README do GistDB para entender a API de `GistDB.create()` e os eventos disponíveis.
2. Confirmar que `GistDB` suporta `gistId: null` para criar um Gist novo automaticamente.
3. Verificar se `GistDB.create()` é idempotente ao receber o mesmo `gistId` duas vezes.

---

## 🏗️ Arquivo a Criar

**`src/domain/services/CloudSyncService.ts`**

### Tipos internos

```typescript
type SyncStatus = 'idle' | 'syncing' | 'error' | 'offline' | 'unconfigured';

interface CloudSyncServiceState {
  status: SyncStatus;
  gistId: string | null;
}
```

### Contrato público da classe

```typescript
class CloudSyncService {
  // Estado interno com private class fields
  #db: GistDB | null;
  #status: SyncStatus;

  // Re(inicializa) a instância GistDB com novas credenciais.
  // Destrói a instância anterior antes de criar nova.
  // Emite 'cloud:status:change' em cada transição.
  public async configure(token: string, gistId?: string): Promise<void>

  // true se #db !== null e status === 'idle'
  public get isReady(): boolean

  // Retorna o gistId atual (null se não configurado)
  public get gistId(): string | null

  // Retorna o status atual
  public get status(): SyncStatus

  // --- Templates ---
  public async pushTemplate(label: Label): Promise<void>
  public async pullTemplates(): Promise<Label[]>
  public async deleteTemplate(id: string): Promise<void>

  // --- Preferências ---
  // ATENÇÃO: nunca recebe gistToken — deve ser sanitizado pelo chamador
  public async pushPreferences(prefs: Omit<UserPreferences, 'gistToken'>): Promise<void>
  public async pullPreferences(): Promise<Partial<Omit<UserPreferences, 'gistToken'>> | null>

  // --- Sessão ---
  // ATENÇÃO: nunca recebe thumbnail (payload base64 muito grande)
  public async pushSession(label: Omit<Label, 'thumbnail'>): Promise<void>
  public async pullSession(): Promise<Omit<Label, 'thumbnail'> | null>

  // Cancela polling, remove listeners, apaga token do KeyVault interno do GistDB
  public destroy(): void
}

export const cloudSyncService = new CloudSyncService();
```

### Lógica de `configure()`

```typescript
public async configure(token: string, gistId?: string): Promise<void> {
  this.#db?.destroy();
  this.#db = null;

  if (!token) {
    this.#setStatus('unconfigured');
    return;
  }

  this.#setStatus('syncing');

  try {
    this.#db = await GistDB.create({
      token,
      prefix: 'label-editor',
      gistId: gistId ?? null,
      ttl: 5 * 60 * 1000,
      conflictResolver: 'last-write-wins',
      autoSync: { onFocus: true, onReconnect: true, onUnload: false },
      deviceName: navigator.platform,
    });

    // Escuta eventos de rede do GistDB e repassa para o EventBus
    this.#db.on('network:offline', () => this.#setStatus('offline'));
    this.#db.on('network:online',  () => this.#setStatus('idle'));
    this.#db.on('sync:error',      () => this.#setStatus('error'));
    this.#db.on('sync:success',    () => this.#setStatus('idle'));

    eventBus.emit('cloud:configured', { gistId: this.#db.gistId! });
    this.#setStatus('idle');
    logger.info('CloudSyncService', 'GistDB configured. GistId:', this.#db.gistId);
  } catch (err) {
    this.#setStatus('error');
    logger.error('CloudSyncService', 'Configuration failed:', err);
    throw err; // Propaga para o chamador mostrar feedback na UI
  }
}
```

### Helper interno

```typescript
#setStatus(status: SyncStatus): void {
  this.#status = status;
  eventBus.emit('cloud:status:change', { status });
}
```

### Naming convention das coleções GistDB

| Dado | Coleção GistDB | ID da chave |
|------|---------------|-------------|
| Template | `'templates'` | `label.id` |
| Preferências | `'preferences'` | `'global'` |
| Sessão | `'session'` | `'current'` |

---

## ✅ Critérios de Aceite

- [ ] `cloudSyncService.isReady` retorna `false` quando `gistToken` está vazio
- [ ] `configure('')` emite `cloud:status:change` com `{ status: 'unconfigured' }`
- [ ] `configure(validToken)` emite `cloud:configured` com o `gistId` após sucesso
- [ ] Token inválido (401) emite `cloud:status:change` com `{ status: 'error' }` e não lança exceção não-tratada
- [ ] `pushTemplate()` não falha silenciosamente — loga o erro com `logger.warn`
- [ ] `destroy()` chama `this.#db?.destroy()` e zera `#db = null`
- [ ] Build de produção (`npm run build`) sem erros de tipo
