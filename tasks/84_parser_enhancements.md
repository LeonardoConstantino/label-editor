# Task 84: Expansão e Robustez do DataSourceParser

## Objetivo
Evoluir o motor de interpolação e formatação para suportar localizações dinâmicas, parâmetros avançados e proteção contra falhas em objetos complexos.

## Melhorias Identificadas (TODOs)
- **Locale Dinâmico:** Adicionar suporte a parâmetros de localidade nos formatadores `:currency`, `:number` e `:percent`. Ex: `{{valor:currency(en-US,USD)}}`.
- **Cálculos de Data (Offset):** Suporte a adição/subtração de dias/meses/anos diretamente no formatador (essencial para datas de validade). Ex: `{{data_fabricacao:date_add(30,days)}}`.
- **Timezones e Locales:** Suporte a fuso horário e localidade para datas UTC.
- **Segurança JSON:** Implementar trava de profundidade no formatador `:json` para evitar quebra de memória em objetos circulares ou massivos.
- **Fallback de Formatação:** Melhorar o comportamento quando um formatador falha (ex: passar texto para um formatador de número).

## Workflow de Implementação
1. Refatorar a interface `FormatterDef` para aceitar tipos mais complexos de parâmetros.
2. Atualizar as funções no registro `FORMATTERS` no `DataSourceParser.ts`.
3. Expandir a suite de testes unitários para cobrir os novos parâmetros.
4. Atualizar a UI do `VariableManager` para permitir a configuração desses parâmetros (opcional, foco inicial no motor).

## Critérios de Aceite
- [x] Formatadores aceitam parâmetros opcionais de locale.
- [x] O sistema não trava ao tentar processar JSONs extremamente profundos.
- [x] Erros de formatação são tratados graciosamente (retornam o valor original ou fallback).
