// src/utils/theme-bridge.ts

// Conjunto de elementos ativos que precisam de sincronização de tema
const activeHosts = new Set<HTMLElement>();
let globalObserver: MutationObserver | null = null;

function syncAllThemes() {
  const theme = document.documentElement.getAttribute('data-theme');
  if (!theme) return;
  
  for (const host of activeHosts) {
    if (host.getAttribute('data-theme') !== theme) {
      host.setAttribute('data-theme', theme);
    }
  }
}

/**
 * Observa o atributo `data-theme` no <html> usando um MutationObserver único
 * e replica no host do Shadow DOM para compatibilidade de seletores.
 */
export function bridgeTheme(hostElement: HTMLElement): () => void {
  // Sincroniza o tema atual imediatamente no registro
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme) {
    hostElement.setAttribute('data-theme', currentTheme);
  }

  activeHosts.add(hostElement);

  // Inicializa o observer global se for o primeiro elemento registrado
  if (!globalObserver) {
    globalObserver = new MutationObserver(syncAllThemes);
    globalObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  // Retorna a função de limpeza (cleanup)
  return () => {
    activeHosts.delete(hostElement);
    
    // Desconecta o observer se não houver mais elementos ativos
    if (activeHosts.size === 0 && globalObserver) {
      globalObserver.disconnect();
      globalObserver = null;
    }
  };
}