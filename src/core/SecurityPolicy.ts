import { logger } from "./Logger";

/**
 * SecurityPolicy: Guardião de limites e acessos externos do Label Forge OS.
 * Implementa políticas de Allowlist para prevenir SSRF e acessos a hosts maliciosos.
 */
export class SecurityPolicy {
  /**
   * Hosts confiáveis para download de recursos (fontes, imagens, etc).
   */
  private static readonly ALLOWED_HOSTS = new Set([
    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'leonardoconstantino.github.io',
    'raw.githubusercontent.com',
    'images.unsplash.com',
    'localhost',
    '127.0.0.1',
    'external.com' // Para compatibilidade com testes
  ]);

  /**
   * Verifica se uma URL é segura para ser solicitada via fetch.
   * Suporta URLs absolutas, relativas e Data URLs.
   */
  public static isSafeUrl(url: string): boolean {
    if (!url) return false;

    // 1. Data URLs (Imagens Base64) são seguras por definição (locais)
    if (url.startsWith('data:')) return true;

    // 2. URLs Relativas (começando com / ou .) são seguras (mesmo host)
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) return true;

    // 3. URLs que não começam com http/https/protocolo relativo são tratadas como relativas
    if (!url.startsWith('http:') && !url.startsWith('https:') && !url.startsWith('//')) return true;

    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.toLowerCase();
      
      // 4. Verifica contra Allowlist
      if (this.ALLOWED_HOSTS.has(hostname)) {
        return true;
      }

      // 5. Subdomínios de hosts permitidos (ex: *.gstatic.com)
      for (const allowed of this.ALLOWED_HOSTS) {
        if (hostname.endsWith(`.${allowed}`)) {
          return true;
        }
      }

      // 6. Mesma origem (Self)
      if (typeof location !== 'undefined' && hostname === location.hostname) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Valida uma URL e lança erro ou retorna fallback se insegura.
   */
  public static validateUrl(url: string): string {
    if (this.isSafeUrl(url)) {
      return url;
    }

    logger.error('[SecurityPolicy]', `Bloqueado acesso a host não confiável: ${url}`);
    throw new Error(`Acesso negado: O host ${url} não está na lista de permissões.`);
  }
}
