# Task 48: Organização, Limpeza e Documentação (Pre-Deploy Beta)

## Objetivo
Refinar o código-fonte, consolidar a documentação e preparar o ambiente para o lançamento da versão Beta, garantindo que o projeto esteja limpo, performático e bem documentado.

## Workflow
1. `git checkout -b task/48-pre-deploy-cleanup`
2. Auditoria de Código.
3. Consolidação de Documentação.
4. Validação de Build e Testes.

## Detalhamento da Execução

### 1. Limpeza de Código (Code Audit)
- [ ] Remover todos os `console.log`, `console.warn` e `console.error` não essenciais.
- [ ] Substituir logs críticos pelo utilitário `Logger.ts`.
- [ ] Rodar `npm run lint` (se disponível) ou fazer varredura manual por imports não utilizados.
- [ ] Verificar consistência de nomes: Componentes (PascalCase), arquivos (kebab-case ou PascalCase conforme o padrão local).

### 2. Documentação Técnica & de Usuário
- [ ] **README.md:** Atualizar com instruções claras de instalação, funcionalidades principais (Vault, Batch Printing, Interpolation) e stack tecnológica.
- [ ] **Consolidação:** Mover documentos de arquitetura para uma pasta `/docs` (ex: `proposta de arquitetura.md`, `Design_System.md`, `Layout_UX_Guide.md`).
- [ ] **JSDoc:** Garantir que os métodos principais em `src/core/` e `src/domain/services/` possuam comentários JSDoc claros.

### 3. Integridade de Assets e Sons
- [ ] Verificar o `UISoundManager.ts` e garantir que os arquivos em `/public/sounds` (ou similar) existem e estão nomeados corretamente.
- [ ] Validar carregamento de ícones do `icon.ts`.

### 4. Estabilidade e Performance
- [ ] Executar `npm run test` e garantir 100% de passagem.
- [ ] Executar `npm run build` e verificar o output na pasta `dist/`.
- [ ] Testar o carregamento inicial: garantir que o IndexedDB inicialize sem erros em uma aba anônima.

## Critérios de Aceite
- [ ] Código livre de "junk" de desenvolvimento (logs e comentários temporários).
- [ ] Documentação centralizada e legível.
- [ ] Build de produção gerado sem erros de TypeScript.
- [ ] README.md atraente para novos usuários.
