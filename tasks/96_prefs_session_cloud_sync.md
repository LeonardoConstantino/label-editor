# Task 96 — PreferenceManager & SessionManager: Push para a Nuvem

- **Branch:** `task/96-prefs-session-sync`
- **Prioridade:** 06
- **Dependências:** 92 (CloudSyncService)
- **Bloqueia:** —

---

## 🎯 Objetivo

Estender `PreferenceManager` e `SessionManager` com push fire-and-forget para o GistDB, garantindo que preferências e sessão ativa sejam sincronizados entre dispositivos.

---

## 📋 Análise Profunda (Antes de Codar)

1. **`PreferenceManager`:** O campo `gistToken` nunca deve sair do dispositivo — confirmar que o spread de sanitização `{ gistToken: _ignored, ...rest }` está correto em TypeScript strict.
2. **`SessionManager`:** O campo `thumbnail` de um `Label` pode ter 30–80KB em base64. Confirmar que o GistDB tem limite de tamanho por arquivo (Gist suporta até ~1MB por arquivo — thumbnail deveria ser OK, mas a decisão é excluí-la para manter o payload leve e a sessão focada em dados estruturais).
3. Confirmar que `SessionManager.saveSession()` é chamado com debounce de 1s — o push para nuvem deve herdar esse comportamento (não adicionar debounce extra).

---

## 🏗️ Arquivos a Editar

---

### `src/domain/services/PreferenceManager.ts`

**Import:**

```typescript
import { cloudSyncService } from './CloudSyncService';
```

**Em `savePreferences()`**, adicionar após o `await db.put(...)` existente:

```typescript
// Cloud Sync: remove gistToken antes de sincronizar (nunca sai do dispositivo)
if (cloudSyncService.isReady) {
  const { gistToken: _ignored, ...prefsToSync } = updated;
  cloudSyncService.pushPreferences(prefsToSync).catch((err) => {
    logger.warn('PreferenceManager', 'Cloud push failed for preferences:', err);
  });
}
```

> **Por que remover `gistToken`?** O token é uma credencial de segurança. Armazená-lo em um Gist — mesmo privado — aumenta o risco de exposição. O usuário deve reinserir o token em cada novo dispositivo.

---

### `src/domain/services/SessionManager.ts`

**Import:**

```typescript
import { cloudSyncService } from './CloudSyncService';
```

**Em `saveSession()`** (método privado), adicionar após o `await db.put(...)` existente:

```typescript
// Cloud Sync: exclui thumbnail (payload base64 desnecessário para sessão cross-device)
if (cloudSyncService.isReady) {
  const { thumbnail: _ignored, ...labelWithoutThumb } = label;
  cloudSyncService.pushSession(labelWithoutThumb).catch((err) => {
    logger.warn('SessionManager', 'Cloud session push failed:', err);
  });
}
```

---

## ✅ Critérios de Aceite

- [ ] `preferenceManager.savePreferences()` não inclui `gistToken` no push para GistDB
- [ ] `preferenceManager.savePreferences()` não quebra quando `cloudSyncService.isReady === false`
- [ ] `sessionManager.saveSession()` não inclui `thumbnail` no push para GistDB
- [ ] `sessionManager.saveSession()` não quebra quando `cloudSyncService.isReady === false`
- [ ] Falha de rede em qualquer push **não** lança exceção não-tratada nem bloqueia a operação local
- [ ] `npm run build` sem erros de tipo (atenção ao `{ gistToken: _ignored, ...rest }` em strict mode)
