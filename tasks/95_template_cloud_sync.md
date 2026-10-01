# Task 95 — TemplateManager: Dual-write & Pull da Nuvem

- **Branch:** `task/95-template-cloud-sync`
- **Prioridade:** 07
- **Dependências:** 92 (CloudSyncService)
- **Bloqueia:** —

---

## 🎯 Objetivo

Estender o `TemplateManager` com dual-write (IDB + GistDB) em `saveCurrentLabel()` e `deleteTemplate()`, além de um novo método público `syncFromCloud()` para pull manual de templates.

---

## 📋 Análise Profunda (Antes de Codar)

1. Confirmar que `saveCurrentLabel()` já possui o `label.thumbnail` — este campo **deve** ser incluído no push para o GistDB (thumbnails são úteis para outros dispositivos renderizarem o Vault). Avaliar tamanho médio.
   - Se thumbnail base64 tipicamente > 50KB, **excluir do push** e documentar a decisão.
   - Se tipicamente < 20KB, incluir normalmente.
2. Verificar se `deleteTemplate()` retorna algum valor que poderia ser afetado.
3. Confirmar que o `VaultGallery` possui um mecanismo de refresh que pode ser acionado por evento.

---

## 🏗️ Arquivo a Editar

**`src/domain/services/TemplateManager.ts`**

### 1. Import do `cloudSyncService`

```typescript
import { cloudSyncService } from './CloudSyncService';
```

### 2. `saveCurrentLabel()` — Dual-write

Adicionar **após** o `await db.put(this.STORE_NAME, labelToSave)` existente:

```typescript
// Cloud Sync: fire-and-forget — falha nunca bloqueia o salvamento local
if (cloudSyncService.isReady) {
  cloudSyncService.pushTemplate(labelToSave).catch((err) => {
    logger.warn('TemplateManager', 'Cloud push failed for template:', err);
  });
}
```

### 3. `deleteTemplate()` — Delete na nuvem

Adicionar **após** o `await db.delete(this.STORE_NAME, id)` existente:

```typescript
if (cloudSyncService.isReady) {
  cloudSyncService.deleteTemplate(id).catch((err) => {
    logger.warn('TemplateManager', 'Cloud delete failed for template:', err);
  });
}
```

### 4. Novo método `syncFromCloud()`

```typescript
/**
 * Faz pull de todos os templates da nuvem e os mescla no IndexedDB local.
 * Usa last-write-wins: se um template com o mesmo ID já existir localmente,
 * o remoto prevalece apenas se tiver `updatedAt` mais recente.
 * Emite 'vault:refreshed' ao final para forçar re-render do VaultGallery.
 */
public async syncFromCloud(): Promise<void> {
  if (!cloudSyncService.isReady) {
    eventBus.emit('notify', { type: 'info', message: 'Cloud Sync não configurado.' });
    return;
  }

  try {
    const remoteTemplates = await cloudSyncService.pullTemplates();
    const localTemplates  = await this.getTemplates();
    const localMap        = new Map(localTemplates.map(t => [t.id, t]));

    let merged = 0;
    for (const remote of remoteTemplates) {
      const local = localMap.get(remote.id);
      if (!local || remote.updatedAt > local.updatedAt) {
        await db.put(this.STORE_NAME, remote);
        merged++;
      }
    }

    eventBus.emit('vault:refreshed', {});
    eventBus.emit('notify', {
      type: 'success',
      message: `${merged} template(s) sincronizado(s) da nuvem.`,
      duration: 4000,
    });
    logger.info('TemplateManager', `syncFromCloud: ${merged}/${remoteTemplates.length} merged`);
  } catch (err) {
    logger.error('TemplateManager', 'syncFromCloud failed:', err);
    eventBus.emit('notify', { type: 'error', message: 'Falha ao sincronizar da nuvem.' });
  }
}
```

---

## ✅ Critérios de Aceite

- [ ] `saveCurrentLabel()` continua funcionando normalmente mesmo que o push na nuvem falhe
- [ ] `deleteTemplate()` continua funcionando normalmente mesmo que o delete na nuvem falhe
- [ ] `syncFromCloud()` só executa se `cloudSyncService.isReady === true`
- [ ] `syncFromCloud()` usa last-write-wins baseado em `updatedAt`
- [ ] `syncFromCloud()` emite `vault:refreshed` ao final (mesmo que 0 templates sejam mesclados)
- [ ] `syncFromCloud()` exibe toast de sucesso com contagem e toast de erro em falha
- [ ] Nenhum template local com `updatedAt` mais recente é sobrescrito pelo remoto
- [ ] `npm run build` sem erros de tipo
