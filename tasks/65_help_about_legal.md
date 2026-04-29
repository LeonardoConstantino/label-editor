# Task 65: Aba "About" & Compliance (Social, Termos e Privacidade)

## Objetivo
Criar a aba "About" no Help Center para fornecer créditos, links sociais e transparência jurídica (Termos e Privacidade), reforçando a filosofia "Privacy-First" do projeto.

## Workflow
1. `git checkout -b task/65-help-about-legal`
2. **Dados (helpData.ts):**
   - Redigir texto sobre o projeto (missão de produtividade e design).
   - Criar seção de **Privacy Policy**: Foco em "Local-Only Data" (IndexedDB), ausência de telemetria externa e processamento local de imagens.
   - Criar seção de **Terms of Use**: Isenção de responsabilidade, licença de uso (ex: MIT) e diretrizes de uso da ferramenta.
3. **Componente (HelpCenter.ts):**
   - Adicionar `about` ao `activeTab`.
   - Implementar `renderAbout()` com layout de cartões.
   - Usar `details/summary` para as seções jurídicas para economizar espaço vertical.
4. **UI/UX:**
   - Botões táteis para GitHub, LinkedIn e outras redes.
   - Indicação de versão do App (v4.0 Alpha).

## Critérios de Aceite
- [x] Navegação fluida entre as abas do Help Center.
- [x] Textos jurídicos acessíveis e bem formatados no estilo Prism.
- [x] Links externos seguros (rel="noopener").
- [x] O usuário é informado claramente que seus dados permanecem privados no dispositivo.
