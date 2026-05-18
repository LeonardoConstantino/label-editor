# Task 83: Fidelidade de Fontes no Web Worker

## Objetivo
Garantir que as fontes carregadas na Main Thread (via CSS ou Google Fonts) sejam aplicadas corretamente durante a renderização no Web Worker. Atualmente, o `OffscreenCanvas` no Worker utiliza fontes padrão do sistema, quebrando a fidelidade visual do PDF gerado.

## Especificações Técnicas
- **Transferência de Fontes:** Como Workers não acessam o DOM, as fontes precisam ser carregadas como `ArrayBuffer` ou `Blob` na Main Thread e enviadas ao Worker.
- **FontFace API no Worker:** Utilizar `self.fonts.add(new FontFace(...))` dentro do Worker para registrar as fontes dinamicamente.
- **Persistência (Opcional):** Avaliar o uso de IndexedDB para cachear os binários das fontes, evitando re-transmissão em cada lote.

## Workflow de Implementação
1. Identificar quais fontes estão sendo usadas no `Label`.
2. Carregar os arquivos `.woff2` ou similares como `ArrayBuffer`.
3. Enviar as fontes no payload da `WorkerTask`.
4. No `BatchWorker.ts`, carregar as fontes antes de iniciar o loop de renderização.
5. Aguardar `document.fonts.ready` (ou equivalente no Worker) para garantir o desenho correto.

## Critérios de Aceite
- [x] O PDF gerado utiliza exatamente as mesmas fontes selecionadas no editor.
- [x] O posicionamento e quebra de linha são idênticos ao canvas principal.
- [/] Mecanismo de Cache: As fontes não são re-escaneadas/re-baixadas a cada geração de PDF.
- [ ] Persistência: Binários das fontes são armazenados no IndexedDB para uso em sessões futuras.

## Observações de Performance (Task Refinement)
- **Status:** Incompleta (Pendente Otimização de Cache).
- **Problema:** A cada clique em "Gerar PDF", o sistema varre todos os stylesheets e faz fetch de dezenas de binários, o que é ineficiente e custoso.
- **Melhoria Planejada:** Implementar um `SessionCache` na Main Thread e persistência no IndexedDB para que o processo de "captura" ocorra apenas uma vez por fonte.

