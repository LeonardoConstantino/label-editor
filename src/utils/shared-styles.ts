// @ts-ignore - Vite lida com o sufixo ?inline
import mainStyles from '../styles/main.css?inline';

/**
 * sharedSheet: Instância única de CSSStyleSheet para uso com adoptedStyleSheets.
 * Melhora a performance ao evitar o re-parsing do CSS global em cada Shadow DOM.
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(mainStyles);

export const sharedSheet = sheet;

/**
 * sharedStyles: String original para compatibilidade com injeção direta via <style>
 * em componentes que ainda não foram migrados.
 */
export const sharedStyles = mainStyles;
