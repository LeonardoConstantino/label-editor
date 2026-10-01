# Task 93 — UserPreferences: Campos Cloud Sync

- **Branch:** `task/93-cloud-prefs-model`
- **Prioridade:** 07
- **Dependências:** —
- **Bloqueia:** 94, 97

---

## 🎯 Objetivo

Estender o modelo `UserPreferences` com os campos necessários para a integração com GistDB. Esta task é puramente de modelo — nenhuma lógica de UI ou sincronização.

---

## 📋 Análise Profunda (Antes de Codar)

1. Confirmar que nenhum outro arquivo serializa/deserializa `UserPreferences` de forma que quebre com campos novos (ex: merges com spread `{ ...DEFAULT_PREFERENCES, ...data }` são seguros — novos campos recebem o default automaticamente).
2. Confirmar que `IndexedDBStorage` não tem schema rígido para o store `preferences` — como usa `keyPath: 'id'`, campos novos são aceitos automaticamente.

---

## 🏗️ Arquivos a Editar

### `src/domain/models/UserPreferences.ts`

**Adicionar** ao final da interface `UserPreferences`:

```typescript
  // --- CLOUD SYNC (GistDB) ---
  cloudSync: boolean;    // Habilita/desabilita toda a sincronização em nuvem
  gistToken: string;     // GitHub Personal Access Token (escopo "gist") — salvo apenas no IDB local
  gistId: string;        // ID do Gist GitHub (auto-preenchido após primeira configuração)
```

**Adicionar** ao objeto `DEFAULT_PREFERENCES`:

```typescript
  // --- CLOUD SYNC ---
  cloudSync: false,
  gistToken: '',
  gistId: '',
```

---

## ⚠️ Atenção de Segurança

O campo `gistToken` é salvo no `IndexedDB` local — **nunca deve ser incluído em nenhum push para o GistDB**. A remoção deste campo antes de sincronizar é responsabilidade do `PreferenceManager` (Task 96), não deste modelo.

---

## ✅ Critérios de Aceite

- [ ] Interface `UserPreferences` possui os 3 novos campos tipados corretamente
- [ ] `DEFAULT_PREFERENCES` possui os 3 defaults (`false`, `''`, `''`)
- [ ] `npm run build` sem erros de tipo
- [ ] Nenhum arquivo que consome `UserPreferences` quebra (verificar `PreferenceManager`, `PreferencesModal`, `Store`, `main.ts`)
