# Task 25: Persistência de Preferências do Usuário

## Objetivo
Implementar um sistema para persistir as preferências do usuário (como zoom padrão, unidade preferida, modo de visualização) utilizando o motor de IndexedDB aprimorado.

## Arquivos de Entrada
- `src/core/IndexedDBStorage.ts`
- `src/core/Store.ts` (Integrar com as preferências)

## Detalhamento da Execução
1. **Model:** Criar interface `UserPreferences` no domínio.
2. **Storage Setup:** Configurar um object store `preferences` no `label_editor_db`.
3. **Store Integration:** Sincronizar o estado global de preferências com o IndexedDB em cada mudança.
4. **Initial Load:** Carregar preferências ao inicializar a aplicação.

## Critérios de Aceite
- [x] Preferências são salvas automaticamente ao serem alteradas.
- [x] A aplicação inicializa com as últimas preferências do usuário.
- [x] Testes garantem que falhas no storage não travam a aplicação (graceful degradation).
