import { logger } from '../core/Logger';

/**
 * Utilitários para processamento e otimização de imagens.
 */
export const imageProcessor = {
  /**
   * Processa uma imagem para ser usada no editor.
   * @param file Arquivo de imagem original
   * @param quality Qualidade (0.0 a 1.0)
   * @param maxWidth Largura máxima em pixels
   * @returns Objeto com o base64 e as dimensões em pixels (para cálculo posterior em mm)
   */
  async process(
    file: File,
    quality: number = 0.7,
    maxWidth: number = 1200,
  ): Promise<{ src: string; width: number; height: number }> {
    logger.debug('Image', `Processando: ${file.name}`);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Redimensionamento proporcional se necessário
          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('Falha ao obter contexto Canvas');

          ctx.drawImage(img, 0, 0, width, height);

          // Exporta como JPEG para melhor compressão em fotos
          const base64 = canvas.toDataURL('image/jpeg', quality);

          logger.debug('Image', `Otimizada: ${(base64.length / 1024).toFixed(1)} KB`);
          
          resolve({
            src: base64,
            width: width,
            height: height
          });
        };

        img.onerror = (err) => reject(err);
      };

      reader.onerror = (err) => reject(err);
    });
  }
};
