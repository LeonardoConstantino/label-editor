# Task 97 — EventBus, StatusBar & Bootstrap: Feedback Visual do Cloud Sync

- **Branch:** `task/97-cloud-sync-feedback`
- **Prioridade:** 06
- **Dependências:** 92 (CloudSyncService), 93 (campos UserPreferences)
- **Bloqueia:** —

---

## 🎯 Objetivo

Fechar o loop visual da integração com GistDB: registrar os novos eventos `cloud:*` no `EventBus`, adicionar o indicador de status na `StatusBar`, e inicializar o `cloudSyncService` no bootstrap da aplicação (`main.ts`).

---

## 📋 Análise Profunda (Antes de Codar)

1. Mapear como a `StatusBar` adiciona novos indicadores — ela usa `renderSkeleton()` + `syncValues()`? Identificar o padrão existente para telemetria (render FPS, etc.) e replicar.
2. Confirmar que o `EventMap` em `EventBus.ts` é a interface central de tipos — todos os eventos novos devem ser adicionados lá.
3. Verificar o evento `vault:refreshed` — se já existir no `EventMap`, não duplicar. Se não existir, adicionar aqui também (foi emitido na Task 95).
4. Em `main.ts`, confirmar que `preferenceManager.getPreferences()` já retorna os novos campos `cloudSync`, `gistToken` e `gistId` após a Task 93 ser mergeada.

---

## 🏗️ Arquivos a Editar

---

### 1. `src/core/EventBus.ts` — Novos eventos no `EventMap`

Adicionar à interface `EventMap` (ou equivalente tipado):

```typescript
// Cloud Sync Events (Task 97)
'cloud:status:change': { status: 'idle' | 'syncing' | 'error' | 'offline' | 'unconfigured'; error?: unknown };
'cloud:configured':    { gistId: string };
'cloud:sync:start':    { collection: string };
'cloud:sync:done':     { collection: string; count: number };
'cloud:sync:error':    { collection: string; error: unknown };

// Vault Events (também emitido em Task 95)
'vault:refreshed': Record<string, never>;
```

---

### 2. `src/components/editor/StatusBar.ts` — Indicador de Cloud Sync

#### No `renderSkeleton()` — adicionar o chip de cloud:

```html
<div class="status-item" data-id="cloud-sync-indicator" title="Cloud Sync desativado" hidden>
  <span data-id="cloud-sync-icon">☁️</span>
  <span data-id="cloud-sync-label" class="status-label">—</span>
</div>
```

#### Método `#updateCloudIndicator(status)`:

```typescript
#updateCloudIndicator(status: string): void {
  const indicator = this.shadowRoot!.querySelector('[data-id="cloud-sync-indicator"]') as HTMLElement | null;
  const icon      = this.shadowRoot!.querySelector('[data-id="cloud-sync-icon"]');
  const label     = this.shadowRoot!.querySelector('[data-id="cloud-sync-label"]');

  if (!indicator) return;

  const map: Record<string, { icon: string; text: string; color: string; show: boolean }> = {
    idle:         { icon: '☁️', text: 'Sync OK',       color: 'var(--color-success)', show: true  },
    syncing:      { icon: '↻',  text: 'Sincronizando', color: 'var(--color-info)',    show: true  },
    error:        { icon: '⚠',  text: 'Sync Error',    color: 'var(--color-error)',   show: true  },
    offline:      { icon: '◌',  text: 'Offline',       color: 'var(--color-warning)', show: true  },
    unconfigured: { icon: '☁️', text: '',              color: '',                     show: false },
  };

  const cfg = map[status] ?? map['unconfigured'];
  indicator.hidden = !cfg.show;

  if (icon)  icon.textContent  = cfg.icon;
  if (label) label.textContent = cfg.text;
  if (cfg.color) (indicator as HTMLElement).style.color = cfg.color;

  indicator.title = `Cloud Sync: ${cfg.text || 'Não configurado'}`;
}
```

#### Listener no `init()` ou `connectedCallback()`:

```typescript
eventBus.on('cloud:status:change', ({ status }) => {
  this.#updateCloudIndicator(status);
});
```

---

### 3. `src/main.ts` — Bootstrap do CloudSyncService

Adicionar **após** `store.loadPreferences(prefs)` (e antes do `UISM.toggle`):

```typescript
import { cloudSyncService } from './domain/services/CloudSyncService';

// Bootstrap Cloud Sync (lazy, não bloqueia o boot da app)
if (prefs.cloudSync && prefs.gistToken) {
  cloudSyncService
    .configure(prefs.gistToken, prefs.gistId || undefined)
    .then(() => {
      // Se o GistDB criou um Gist novo, persiste o ID gerado
      const newGistId = cloudSyncService.gistId;
      if (newGistId && newGistId !== prefs.gistId) {
        preferenceManager.savePreferences({ gistId: newGistId });
      }
    })
    .catch((err) => {
      logger.error('Main', 'Cloud Sync bootstrap failed:', err);
      // Não exibe toast de erro no boot — o indicador na StatusBar já comunica o erro
    });
}

// Persiste gistId gerado automaticamente sempre que o GistDB criar um Gist novo
eventBus.on('cloud:configured', ({ gistId }) => {
  const currentPrefs = store.getState().preferences;
  if (gistId !== currentPrefs.gistId) {
    preferenceManager.savePreferences({ gistId });
  }
});
```

---

## ✅ Critérios de Aceite

- [ ] `EventMap` contém todos os 6 novos eventos `cloud:*` e `vault:refreshed` com payloads tipados
- [ ] StatusBar exibe o indicador de nuvem quando `cloudSync` está ativo
- [ ] Indicador muda de visual a cada `cloud:status:change` sem recriar o DOM
- [ ] Indicador está `hidden` quando status é `unconfigured`
- [ ] Bootstrap em `main.ts` não bloqueia a inicialização da app (`.catch()` tratado)
- [ ] `gistId` gerado automaticamente é persistido nas preferências via `cloud:configured`
- [ ] App inicializa normalmente quando `prefs.cloudSync === false` (sem erros no console)
- [ ] `npm run build` sem erros de tipo
