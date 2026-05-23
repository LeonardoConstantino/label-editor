# Task 86: Micro Image Editor (Asset Post-Processing)

## Objetivo
Criar uma interface leve de edição de imagens integrada ao módulo `AssetLibrary`. O objetivo é permitir que o usuário realize ajustes essenciais em logotipos e fotos (Crop, Rotação, Filtros) diretamente no app, sem depender de softwares externos, garantindo que o asset esteja perfeito antes de ir para a etiqueta.

## Funcionalidades Propostas
- **Crop (Recorte):** Ferramenta de recorte retangular para remover bordas indesejadas.
- **Rotação:** Botões para girar a imagem em passos de 90° (Clockwise/Counter-clockwise).
- **Filtros Industriais:**
    - **Grayscale:** Essencial para prever como a imagem sairá em impressoras térmicas/monocromáticas.
    - **Invert:** Para transformar logos escuros em logos claros para fundos pretos.
    - **Brightness/Contrast:** Ajustes rápidos de legibilidade.
- **Transparency Tool:** Um seletor de "Chroma Key" simples para remover uma cor de fundo sólida (ex: fundo branco de um JPG).

## Workflow de UI/UX (Tactile Prism)
1. **Acesso:** Ícone de "Pincel/Editar" no hover de cada item da `AssetLibrary`.
2. **Editor Modal:** Abre um modal centralizado com a imagem em destaque.
3. **Live Preview:** Os filtros e ajustes são visualizados em tempo real.
4. **Save Strategy:** Ao salvar, o asset original no IndexedDB é atualizado com a nova versão processada (WebP otimizado).

## Especificações Técnicas
- **Canvas Processing:** Utilizar um canvas oculto para aplicar transformações via `ctx.filter` e matrizes de rotação.
- **Crop Engine:** Implementar handles de redimensionamento sobre a imagem para definir a área de corte.
- **Fidelidade:** Manter a resolução original do asset (respeitando o limite de 800-1200px definido no `imageProcessor`).

## Critérios de Aceite
- [x] O usuário consegue abrir qualquer imagem da biblioteca no editor.
- [x] O recorte (crop) gera uma nova imagem com as dimensões corretas.
- [x] A conversão para preto e branco (grayscale) é fiel e nítida.
- [ ] O asset editado é atualizado instantaneamente em todas as etiquetas que já o utilizam (Sync via EventBus).

---
**Com este micro-editor, o Label Forge OS fecha o ciclo de produção de ativos visuais.**
