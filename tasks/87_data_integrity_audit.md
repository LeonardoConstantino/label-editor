# Task 87: Auditoria de Integridade & Segurança de Dados (Zero Trust)

## Objetivo
Implementar uma camada de segurança rigorosa em todos os pontos de entrada de dados do sistema. O princípio norteador é o **"Zero Trust"**: todo dado inserido pelo usuário (via inputs, CSV, JSON ou colagem) deve ser tratado como potencialmente malicioso. Mesmo sendo uma aplicação local-first, essa barreira protege o usuário de scripts injetados em planilhas compartilhadas e garante a estabilidade do motor de renderização.

## Escopo da Auditoria
- **Sanitização de Interpolação:** Garantir que tags como `{{key}}` não possam executar código JavaScript (XSS) ao serem injetadas no Canvas ou na UI.
- **Data Source Poisoning:** Validar e sanitizar campos de CSV/JSON antes que cheguem ao Store.
- **DoS Protection (Local):** Implementar limites para o tamanho dos dados de entrada para evitar estouro de memória e travamento da aba.
- **Math Expression Safety:** Na Task 84 (Parser Pro), garantir que cálculos matemáticos sejam realizados em um ambiente isolado ou via parser de gramática segura, nunca via `eval()`.
- **Image/SVG Scrutiny:** Verificar se SVGs importados contêm scripts maliciosos.

## Critérios de Aceite
- [x] Implementação de um `DataSanitizer` centralizado usado por todos os serviços.
- [x] Suite de Testes Automatizados com "Malicious Payloads" (XSS, SQLi strings, Recursion depth).
- [x] Validação visual: O sistema deve sinalizar e neutralizar dados que contenham caracteres de controle ou tags HTML não permitidas.
- [x] Proteção contra "Bilion Laughs" em importações de SVG/XML.
- [ ] Zero uso de `eval()` ou `new Function()` em todo o código relacionado a dados.

## Suite de Testes (Exaustiva)
- **Teste A:** Importação de CSV com `<script>alert('xss')</script>` em diversas colunas.
- **Teste B:** Tags de interpolação aninhadas infinitamente: `{{a:{{b:{{c}}}}}}`.
- **Teste C:** Payloads de estouro de buffer (strings de 1MB+ em um único campo).
- **Teste D:** Fórmulas matemáticas que tentam acessar o objeto `window`.

---
**Esta task é o pré-requisito de segurança para a expansão do motor de dados (Parser Pro).**
