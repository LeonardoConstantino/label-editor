# Task 64: Controle Global de Áudio (UI Sound Toggle)

## Objetivo
Implementar um sistema de ativação/desativação de áudio da interface, permitindo que o usuário silencie o aplicativo tanto via configurações persistentes quanto por um atalho rápido na interface.

## Workflow
1. `git checkout -b task/64-ui-sound-toggle`
2. **Domínio:** Adicionar `soundEnabled: boolean` ao modelo `UserPreferences.ts` (default: true).
3. **Core:** Modificar o `UISoundManager.ts` para verificar o estado da preferência no `Store` antes de executar `play()`.
4. **UI (Configuração):** Inserir o toggle "UI SOUNDS" na seção de Preferências do `ElementInspector.ts` (Document Setup).
5. **UI (Acesso Rápido):** Adicionar um botão de volume na `Toolbar.ts` (ou no Header do Inspector) com ícones alternantes (`volume-high` / `volume-mute`).
6. **Atalho:** Registrar `Ctrl+M` para alternar o mute rapidamente via `ShortcutService`.

## Critérios de Aceite
- [ ] O usuário pode silenciar todos os sons com um único clique na interface.
- [ ] O estado do áudio é salvo automaticamente e restaurado ao abrir o app.
- [ ] O ícone visual reflete o estado atual (Muted/Unmuted).
- [ ] O `UISoundManager` silencia imediatamente todas as chamadas de áudio ao ser desativado.
