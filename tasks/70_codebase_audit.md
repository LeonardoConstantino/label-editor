# Task 70: Grande Auditoria de Integridade (TS, CSS, HTML & Segurança)

## Objetivo
Realizar uma varredura profunda em todo o ecossistema do projeto para identificar dívidas técnicas, inconsistências de estilo, vulnerabilidades de segurança e lacunas de teste, gerando um backlog de refatoração cirúrgica.

## Workflow
1. `git checkout -b task/70-codebase-audit`
2. **Auditoria de TypeScript:**
   - Analisar `src/core` e `src/domain` em busca de tipos `any` ocultos ou casts desnecessários (`as any`).
   - Verificar a consistência dos modificadores de acesso (`private`, `readonly`).
3. **Auditoria de CSS & Estética:**
   - Validar o uso das variáveis de tema do Tailwind v4 em todos os Shadow DOMs.
   - Identificar estilos "hardcoded" que deveriam ser centralizados no `shared-styles.ts`.
4. **Auditoria de Segurança:**
   - Revisar o fluxo de dados do `DataSourceParser` e do `ElementInspector` para garantir sanitização total contra XSS.
5. **Mapeamento de Testes (Vitest):**
   - Avaliar a cobertura de testes nos serviços de renderização e cálculo de unidades.
6. **Relatório de Refatoração:**
   - Criar novas tasks específicas baseadas nas descobertas desta auditoria.

## Critérios de Aceite
- [ ] Diagnóstico completo da saúde do código realizado.
- [ ] Backlog de refatoração atualizado com tasks táticas.
- [ ] Adição de testes para pelo menos 2 funções críticas identificadas como vulneráveis.
- [ ] Garantia de que o "Code Style" definido na Task 60 está sendo aplicado.
