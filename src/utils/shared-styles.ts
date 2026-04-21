// @ts-ignore - Vite lida com o sufixo ?inline
import mainStyles from '../styles/main.css?inline';

/**
 * sharedStyles: Exporta o CSS processado do Tailwind v4 para ser injetado 
 * em Shadow DOMs sem depender de caminhos de arquivos em produção.
 */
export const sharedStyles = mainStyles;
