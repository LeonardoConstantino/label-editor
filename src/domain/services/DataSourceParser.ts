import Papa from 'papaparse';

/**
 * DataSourceParser: Processa arquivos externos para geração em lote.
 */
export class DataSourceParser {
  /**
   * Converte um arquivo CSV em um array de objetos usando PapaParse.
   */
  public async parseCSV(file: File): Promise<Record<string, string>[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as Record<string, string>[]);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  /**
   * Converte um arquivo JSON em um array de objetos.
   */
  public async parseJSON(file: File): Promise<Record<string, any>[]> {
    const text = await file.text();
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [data];
  }

  /**
   * Aplica os dados em uma string substituindo variáveis {{key}}
   * Suporta espaços: {{ nome }}
   */
  public static interpolate(template: string, data: Record<string, any>): string {
    if (!template) return '';
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match;
    });
  }
}

export const dataSourceParser = new DataSourceParser();
