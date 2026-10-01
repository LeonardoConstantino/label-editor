# Task 94 — PreferencesModal: Aba "Cloud Sync"

- **Branch:** `task/94-cloud-settings-ui`
- **Prioridade:** 07
- **Dependências:** 92 (CloudSyncService), 93 (campos UserPreferences)
- **Bloqueia:** —

---

## 🎯 Objetivo

Adicionar a aba **"☁️ Cloud Sync"** ao `PreferencesModal`, permitindo que o usuário configure o token GitHub, visualize o Gist ID gerado e monitore o status da sincronização em tempo real.

---

## 📋 Análise Profunda (Antes de Codar)

1. Mapear como as abas existentes são registradas no `PreferencesModal` — identificar o array/objeto de tabs e o sistema de `renderSkeleton()` vs `syncValues()` (padrão Atomic Sync do GEMINI.md).
2. Identificar o componente `<app-input type="password">` já existente para usar no campo de token.
3. Confirmar que o `Shadow DOM` do modal aceita novos `adoptedStyleSheets` sem conflito.
4. Não usar `innerHTML = ...` para atualizar o status badge — usar `syncValues()` com seleção direta de elemento.

---

## 🏗️ Arquivo a Editar

**`src/components/preferences/PreferencesModal.ts`**

### 1. Adicionar item na sidebar

Incluir a nova aba na lista de itens da sidebar (junto com `general`, `grid`, `snapping`, etc.):

```typescript
{ id: 'cloud', label: '☁️ Cloud Sync' }
```

### 2. `renderSkeleton()` — Seção "cloud"

Adicionar o bloco HTML estático da aba dentro do `renderSkeleton()` (executado uma única vez):

```html
<section class="settings-section" data-section="cloud" hidden>
  <h2 class="section-title">Cloud Sync</h2>
  <p class="section-description">
    Sincronize seus templates e preferências entre dispositivos usando um GitHub Gist privado.
    <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">
      Criar token GitHub →
    </a>
  </p>

  <!-- Toggle principal -->
  <div class="setting-row">
    <label class="setting-label">Habilitar sincronização</label>
    <app-toggle data-pref="cloudSync"></app-toggle>
  </div>

  <!-- Token -->
  <div class="setting-row" data-cloud-field>
    <label class="setting-label">GitHub Token (PAT)</label>
    <app-input
      data-id="cloud-token-input"
      type="password"
      placeholder="ghp_..."
      autocomplete="off"
    ></app-input>
  </div>

  <!-- Gist ID (read-only / editável para reutilizar Gist existente) -->
  <div class="setting-row" data-cloud-field>
    <label class="setting-label">Gist ID</label>
    <app-input
      data-id="cloud-gist-id-input"
      placeholder="Auto-gerado após salvar"
    ></app-input>
  </div>

  <!-- Botão de teste + Status badge -->
  <div class="setting-row">
    <app-button data-id="cloud-test-btn" variant="secondary">Testar Conexão</app-button>
    <span data-id="cloud-status-badge" class="cloud-status-badge">●  Não configurado</span>
  </div>
</section>
```

### 3. `syncValues()` — Atualização granular

No método `syncValues()`, adicionar leitura dos campos de cloud sem recriar o DOM:

```typescript
// Cloud Sync
const tokenInput    = this.shadowRoot!.querySelector('[data-id="cloud-token-input"]') as any;
const gistIdInput   = this.shadowRoot!.querySelector('[data-id="cloud-gist-id-input"]') as any;
const cloudToggle   = this.shadowRoot!.querySelector('[data-pref="cloudSync"]') as any;

if (tokenInput)  tokenInput.value  = prefs.gistToken ?? '';
if (gistIdInput) gistIdInput.value = prefs.gistId ?? '';
if (cloudToggle) cloudToggle.checked = prefs.cloudSync ?? false;

this.#updateCloudStatusBadge(cloudSyncService.status);
```

### 4. Método `#updateCloudStatusBadge(status)`

```typescript
#updateCloudStatusBadge(status: SyncStatus): void {
  const badge = this.shadowRoot!.querySelector('[data-id="cloud-status-badge"]');
  if (!badge) return;

  const map: Record<SyncStatus, { label: string; color: string }> = {
    idle:          { label: '● Conectado',       color: 'var(--color-success)' },
    syncing:       { label: '↻ Sincronizando…',  color: 'var(--color-info)' },
    error:         { label: '✗ Erro',            color: 'var(--color-error)' },
    offline:       { label: '◌ Offline',         color: 'var(--color-warning)' },
    unconfigured:  { label: '● Não configurado', color: 'var(--color-muted)' },
  };

  const { label, color } = map[status];
  badge.textContent = label;
  (badge as HTMLElement).style.color = color;
}
```

### 5. Listener do botão "Testar Conexão"

```typescript
// No connectedCallback ou setupListeners():
this.shadowRoot!.querySelector('[data-id="cloud-test-btn"]')
  ?.addEventListener('click', async () => {
    const token  = (this.shadowRoot!.querySelector('[data-id="cloud-token-input"]') as any)?.value ?? '';
    const gistId = (this.shadowRoot!.querySelector('[data-id="cloud-gist-id-input"]') as any)?.value ?? '';

    try {
      await cloudSyncService.configure(token, gistId || undefined);
      // Salva nas preferências após sucesso
      await preferenceManager.savePreferences({
        gistToken: token,
        gistId: cloudSyncService.gistId ?? gistId,
        cloudSync: true,
      });
      eventBus.emit('notify', { type: 'success', message: 'Cloud Sync configurado com sucesso!' });
    } catch {
      eventBus.emit('notify', { type: 'error', message: 'Falha ao conectar. Verifique o token.' });
    }
  });
```

### 6. Listener reativo ao `cloud:status:change`

```typescript
eventBus.on('cloud:status:change', ({ status }) => {
  this.#updateCloudStatusBadge(status);
});
```

### 7. Campos desabilitados quando `cloudSync === false`

Usar `data-cloud-field` como seletor para desabilitar/habilitar inputs quando o toggle estiver desligado:

```typescript
const cloudFields = this.shadowRoot!.querySelectorAll('[data-cloud-field]');
cloudFields.forEach(el => (el as HTMLElement).style.opacity = prefs.cloudSync ? '1' : '0.4');
```

---

## 🎨 CSS (adoptar no `settingsSheet`)

```css
.cloud-status-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 12%, transparent);
  transition: color 0.3s ease;
}
```

---

## ✅ Critérios de Aceite

- [ ] Aba "☁️ Cloud Sync" aparece na sidebar do modal de preferências
- [ ] Campos de token e Gist ID são preenchidos ao abrir o modal (via `syncValues()`)
- [ ] Botão "Testar Conexão" chama `cloudSyncService.configure()` e exibe toast de sucesso/erro
- [ ] Badge de status atualiza em tempo real ao receber `cloud:status:change`
- [ ] Campos ficam com opacidade reduzida quando `cloudSync === false`
- [ ] Token nunca é exibido em texto claro (input `type="password"`)
- [ ] Nenhum `innerHTML = ...` utilizado para atualizar valores (Atomic Sync)
- [ ] `npm run build` sem erros de tipo
