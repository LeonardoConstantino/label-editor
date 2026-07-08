// src/utils/theme-bridge.ts

/**
 * Observa data-theme no <html> e replica no host do Shadow DOM.
 * Isso permite que [data-theme='light'] case dentro do shadow root.
 */
export function bridgeTheme(hostElement: HTMLElement): () => void {
  const apply = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme) hostElement.setAttribute('data-theme', theme);
  };

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  apply(); // aplica o tema atual imediatamente

  return () => observer.disconnect(); // retorna cleanup
}