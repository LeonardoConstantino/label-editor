# Label Forge OS | Tactile Prism | [🚀 Live Demo](https://leonardoconstantino.github.io/label-editor/)

[![Project Status: Alpha](https://img.shields.io/badge/Status-Alpha-orange.svg)]()
[![Build: Success](https://img.shields.io/badge/Build-Success-brightgreen.svg)]()
[![Privacy: Local-Only](https://img.shields.io/badge/Privacy-Local--Only-blue.svg)]()

**Label Forge OS** é um sistema operacional de design gráfico e produção em lote de alto desempenho, rodando inteiramente no navegador. Focado em precisão milimétrica, fidelidade visual e privacidade absoluta, ele transforma o processo de criação de etiquetas técnicas em uma experiência tátil e intuitiva.

> [!NOTE]
> <!-- GI-01: GIF de apresentação rápida (Overview) -->
> ![Label Forge OS Overview Placeholder](https://placehold.co/800x400?text=GIF+Overview:+Editor+Interaction+and+Animations)

---

## 💎 O Diferencial "Tactile Prism"

Diferente de editores comuns, o Label Forge OS foi projetado com uma arquitetura de **"Engrenagens Sincronizadas"**:

- **Motor Híbrido de Renderização:** Utiliza a Main Thread para design fluido (60 FPS) e **Web Workers + OffscreenCanvas** para geração de PDFs massivos sem travar a interface.
- **Infiltração de Dados:** Um motor de interpolação robusto com suporte a formatadores matemáticos, lógica de fallback e variáveis de sistema.
- **Typeface Engine:** Injeção dinâmica de Google Fonts com persistência automática no arquivo do projeto.
- **Resiliência Industrial:** Auto-save em tempo real no IndexedDB v3 e rastreamento de "Dirty State" para evitar perda de progresso.

---

## 🚀 Funcionalidades Pro

### 1. Production Cockpit & Studio
Gerencie milhares de registros com facilidade. O Studio permite navegar por planilhas CSV/JSON enquanto visualiza a etiqueta final no canvas principal em tempo real.
- **Imposição Dinâmica:** Suporte a formatos ISO (A4, A3) e US Letter, em Portrait ou Landscape.
- **Calibração Física:** Controle total sobre margens, gaps, sangria (bleed) e marcas de corte profissionais.
<!-- IM-01: Imagem do Production Cockpit em ação -->
![Production Cockpit Placeholder](https://placehold.co/600x300?text=IMAGE:+Production+Cockpit+with+A4+Preview)

### 2. Variable Manager (Visual Data Pipeline)
Visualize o fluxo de dados desde o input bruto até o output formatado através de uma interface estilo "Lego".
- **Formatadores Inteligentes:** `:currency`, `:date`, `:upper`, `:math` e mais.
- **Metadata Tray:** Acesso rápido a variáveis de sistema como `{{index}}` e `{{total}}`.
<!-- GI-02: GIF do Variable Manager arrastando formatadores -->
![Variable Manager GIF Placeholder](https://placehold.co/600x300?text=GIF:+Variable+Manager+Pipeline+Interaction)

### 3. Time Machine (Histórico Visual)
Não apenas uma lista de ações, mas uma fita cronológica com **previews reais** de cada estado anterior do seu design. Viaje no tempo com um clique.
<!-- IM-02: Screenshot da barra lateral do Time Machine -->
![Time Machine Placeholder](https://placehold.co/400x600?text=IMAGE:+Visual+History+Timeline+Thumbnails)

---

## 🛠️ Arquitetura Técnica

O projeto segue um padrão **Event-Driven Modular**:

- **Core Layer:** `EventBus` tipado (`EventMap`), `Store` centralizado (Single Source of Truth) e `IndexedDBStorage` otimizado.
- **Domain Layer:** Lógica pura de renderização, conversores de unidades (mm <-> px) e validadores de integridade.
- **UI Layer:** Web Components puros (Shadow DOM) que reagem ao estado global, utilizando `adoptedStyleSheets` para performance máxima.

### Tecnologias de Ponta:
- **TypeScript (Strict Mode):** Zero `any`, tipagem total de payloads.
- **Vite:** Pipeline de build ultrarrápido com suporte nativo a Workers.
- **Tailwind CSS v4.2:** Configuração CSS-first com variáveis nativas.
- **bwip-js:** Motor industrial para geração de QR Codes e Barcodes (EAN, Code128, etc).

---

## 📦 Instalação e Desenvolvimento

```bash
# Clone e entre no diretório
git clone https://github.com/LeonardoConstantino/label-editor.git
cd label-editor

# Instale dependências
npm install

# Inicie o ecossistema de desenvolvimento
npm run dev

# Gere o bundle de produção otimizado
npm run build
```

---

## 🗺️ Roadmap de Amadurecimento

- [x] **Task 24:** Otimização de Lote via Web Workers.
- [x] **Task 83:** Fidelidade de Fontes (CORS & FontFace API).
- [/] **Task 58:** Suporte Expandido a Barcodes.
- [ ] **Task 78:** Asset Library (Parts Bin).
- [ ] **Task 39:** Efeitos Prism (Sombras e Filtros).

---

## 📄 Licença e Contribuição

Este é um software de código aberto sob a licença **ISC**. 
Desenvolvido com precisão e 💙 pela **Tactile Prism**.

*Última grande atualização técnica: 20/05/2026*
