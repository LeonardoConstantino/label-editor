# Task 33: Importação/Exportação de JSON

## Objetivo
Permitir que o usuário salve o arquivo de projeto da etiqueta (`.label`) em seu computador e o recupere posteriormente, independente do banco de dados local.

## Workflow
1. `git checkout -b task/33-json-import-export`
2. Modificar `src/domain/services/TemplateManager.ts` e adicionar botões na `Toolbar`.

## Detalhamento
- **Export:** Serializar o objeto `Label` atual em uma string JSON e disparar download do arquivo.
- **Import:** Ler arquivo `.json`, validar o schema via `ElementValidator` e carregar no `Store`.

## Critérios de Aceite
- [ ] Exportação gera um arquivo legível e completo.
- [ ] Importação restaura 100% do estado visual e histórico do design.
