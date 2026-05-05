# Task 73: System Status Bar (Telemetry & Dev Console)

## Objetivo
Criar um componente de rodapé para o painel lateral (Inspector) que atua como um "Monitor de Telemetria". Ele deve observar o `Store` em tempo real. Em seu estado padrão, é ultra-compacto e minimalista. No hover, exibe um tooltip rico com dados aprofundados do sistema (Engine Stats), focado em *Power Users* e desenvolvedores.

## Workflow
1. `git checkout -b task/73-status-bar`
2. Criar `src/components/editor/StatusBar.ts`.
3. Injetar o componente `<ui-status-bar>` no final da tag `<aside>` principal, logo abaixo do Inspector, garantindo que ele fique preso ao rodapé (`mt-auto`).
4. Conectar o componente ao `EventBus` para escutar eventos como `state:change`, `canvas:zoom` e `mouse:move` (opcional).

## Detalhamento da Execução (UX & Juice)

### 1. Estado Compacto (The Glitch Bar)
- **Visual:** Uma barra minúscula de 24px de altura, com fundo `bg-[#050608]` (mais escuro que o painel).
- **Tipografia:** Fonte estritamente monoespaçada (`font-mono text-[9px]`), com a propriedade CSS `tabular-nums` (CRÍTICO: impede que a barra "trema" quando os números mudam de largura).
- **Dados Visíveis (Exemplo):**
  - `[🟢 SYS OK]` (LED pulsante animado).
  - `EL: 14` (Total de elementos no Store).
  - `Z: 100%` (Nível de Zoom atual).
- **Juice Visual:** Os números devem ter a cor `text-accent-primary` (Indigo), enquanto as labels são `text-text-muted`.

### 2. Estado Hover (The Dev Console Tooltip)
- Envelopar a barra em um `<ui-tooltip placement="top">` sem delay (`delay="0"`), para que o "Raio-X" abra instantaneamente.
- O tooltip deve revelar uma tabela técnica "Cyberpunk/Terminal":
  - **Memory/Store State:** O tamanho do array de histórico (Ex: `History Nodes: 12/50`).
  - **Canvas Dimensions:** Largura x Altura em pixels calculados.
  - **Engine Version:** `Label Forge OS v4.0.0`.
  - **Render Status:** `[ Hardware Accelerated ]` em cor de sucesso.

### 3. O Easter Egg (Developer Mode)
- Adicionar um listener de clique ao LED `[🟢 SYS OK]`.
- Se o usuário clicar **5 vezes rápidas**, ele ativa o `Developer Mode`.
- Emite um som secreto (ex: `sound.play('notify')`) e dispara um `console.table()` com o estado bruto do `Store`, além de acender o LED de verde para **Roxo (Magenta)**.

## Critérios de Aceite
- [ ] A barra fica permanentemente fixada no fundo do painel lateral.
- [ ] Atualizações no Store (adicionar/remover elemento, mudar zoom) refletem instantaneamente nos números da barra.
- [ ] O uso de `tabular-nums` impede o layout shift horizontal.
- [ ] O Tooltip rico abre perfeitamente para cima, sem ser cortado pela tela.

---

## 💻 Exemplo de Implementação (Referência para IA)

### 1. O CSS via `adoptedStyleSheets`
```typescript
import { sharedSheet } from '../../utils/shared-styles';

const statusSheet = new CSSStyleSheet();
statusSheet.replaceSync(`
  :host {
    display: block;
    width: 100%;
    margin-top: auto; /* Força para o fundo do flexbox do aside */
    border-top: 1px solid var(--color-border-ui);
    background-color: #050608;
    user-select: none;
  }

  .telemetry-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    font-family: var(--font-mono);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    font-variant-numeric: tabular-nums; /* Mágica para números não tremerem */
  }

  .led {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--color-accent-success);
    box-shadow: 0 0 8px var(--color-accent-success);
    animation: pulse-led 2s infinite;
    cursor: crosshair;
  }
  
  .led.dev-mode {
    background-color: #d946ef; /* Fuchsia Neon */
    box-shadow: 0 0 12px #d946ef;
  }

  @keyframes pulse-led {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .stat-value {
    color: var(--color-text-main);
    font-weight: bold;
  }
`);
```

### 2. O Template e a Lógica TS (`StatusBar.ts`)

```typescript
export class UiStatusBar extends HTMLElement {
  private clickCount = 0;
  private clickTimer: any;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [sharedSheet, statusSheet];
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  // Método que será chamado pelo EventBus toda vez que o Store mudar
  public updateTelemetry(data: { elementCount: number, zoom: number, historyNodes: number }) {
    const elCount = this.shadowRoot!.querySelector('#el-count');
    const zoomLvl = this.shadowRoot!.querySelector('#zoom-lvl');
    const histNodes = this.shadowRoot!.querySelector('#hist-nodes');
    
    // Atualização cirúrgica do DOM (Sem re-render completo)
    if (elCount) elCount.textContent = String(data.elementCount).padStart(2, '0');
    if (zoomLvl) zoomLvl.textContent = String(Math.round(data.zoom * 100));
    if (histNodes) histNodes.textContent = String(data.historyNodes);
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <ui-tooltip placement="top-start" variant="primary" delay="100">
        
        <!-- GATILHO: A BARRA COMPACTA -->
        <div slot="target" class="telemetry-bar">
          <div class="flex items-center gap-2" title="System Online">
            <span id="sys-led" class="led"></span>
            <span>SYS OK</span>
          </div>
          
          <div class="flex items-center gap-4">
            <span>EL: <span id="el-count" class="stat-value text-accent-primary">00</span></span>
            <span>Z: <span id="zoom-lvl" class="stat-value">100</span>%</span>
          </div>
        </div>

        <!-- CONTEÚDO RICO: O DEV CONSOLE -->
        <div slot="content" class="tooltip-rich-panel w-70">
          <div class="tooltip-rich-header mb-2 pb-1 border-b border-white/10 flex justify-between">
            <span class="flex items-center gap-1.5 text-accent-primary"><ui-icon name="terminal" class="w-3 h-3"></ui-icon> System Telemetry</span>
            <span class="text-accent-success animate-pulse">LIVE</span>
          </div>
          
          <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[10px] text-text-muted mt-2">
            <span class="opacity-50">Engine:</span> <span class="text-text-main">Tactile Render v4.0</span>
            <span class="opacity-50">Target:</span> <span class="text-text-main">HTMLCanvas 2D API</span>
            <span class="opacity-50">History Stack:</span> <span class="text-text-main"><span id="hist-nodes">0</span> / 50 Nodes</span>
            <span class="opacity-50">Memory Heap:</span> <span class="text-text-main">Optimized</span>
          </div>

          <div class="mt-3 pt-2 border-t border-white/5 flex gap-2 items-start text-[9px] text-accent-primary/80">
            <ui-icon name="cpu" class="w-3 h-3 shrink-0 mt-0.5"></ui-icon>
            <span>Hardware acceleration active. UI parsing via adoptedStyleSheets.</span>
          </div>
        </div>

      </ui-tooltip>
    `;
  }

  setupListeners() {
    const led = this.shadowRoot!.getElementById('sys-led');
    
    // O Easter Egg Hacker 🕵️‍♂️
    led?.addEventListener('click', () => {
      this.clickCount++;
      clearTimeout(this.clickTimer);
      
      this.clickTimer = setTimeout(() => { this.clickCount = 0; }, 1000);

      if (this.clickCount === 5) {
        led.classList.add('dev-mode');
        console.log('%c[LABEL FORGE OS] Developer Mode Unlocked', 'color: #d946ef; font-weight: bold; font-size: 14px;');
        // Emite som secreto
        window.soundManager.play('notify');
        this.clickCount = 0;
      }
    });
  }
}
customElements.define('ui-status-bar', UiStatusBar);
```

### 🧠 Por que este componente exala "Juice"?

1. **`tabular-nums`**: Esse é o segredo de ouro. Quando um número muda de `1` (fino) para `8` (largo), os elementos do lado tremem. Com o `font-variant-numeric: tabular-nums`, todos os números ocupam a mesma largura mágica, fazendo a barra parecer um display digital perfeito e estável de um avião de caça.
2. **Atualização Cirúrgica do DOM**: O método `updateTelemetry` não destrói e recria o componente (isso mataria a animação do tooltip caso estivesse aberto). Ele vai no DOM e atualiza apenas o texto dos spans `id="el-count"`. Isso é performance máxima.
3. **Cursor Crosshair no LED**: Quando o usuário passa o mouse pelo LED, o cursor vira uma mira (`crosshair`). Isso é um *Affordance* sutil (uma pista) indicando que ele pode clicar ali para algo especial (o nosso Easter Egg de Dev Mode).
