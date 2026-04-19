import { describe, it, expect } from 'vitest';
import { dataSourceParser, DataSourceParser } from '../DataSourceParser';

describe('DataSourceParser', () => {
  it('should parse simple CSV correctly', async () => {
    const csvContent = 'id,nome,preco\n1,Etiqueta A,10.50\n2,Etiqueta B,20.00';
    const file = new File([csvContent], 'test.csv', { type: 'text/csv' });
    
    const data = await dataSourceParser.parseCSV(file);
    expect(data).toHaveLength(2);
    expect(data[0].nome).toBe('Etiqueta A');
    expect(data[1].preco).toBe('20.00');
  });

  it('should handle CSV with quoted commas', async () => {
    const csvContent = 'id,descricao\n1,"Descrição com, vírgula"\n2,"Outra, com vírgula"';
    const file = new File([csvContent], 'test.csv', { type: 'text/csv' });

    const data = await dataSourceParser.parseCSV(file);
    expect(data).toHaveLength(2);
    expect(data[0].descricao).toBe('Descrição com, vírgula');
  });

  it('should handle different delimiters (semicolon)', async () => {
    // PapaParse auto-detects delimiters if enough data is provided
    const csvContent = 'id;nome;valor\n1;Teste A;100\n2;Teste B;200';
    const file = new File([csvContent], 'test.csv', { type: 'text/csv' });

    const data = await dataSourceParser.parseCSV(file);
    expect(data).toHaveLength(2);
    expect(data[0].nome).toBe('Teste A');
  });

  it('should interpolate template strings', () => {
    const template = 'Olá {{ nome }}, seu ID é {{ id }}';
    const data = { nome: 'João', id: '123' };
    
    const result = DataSourceParser.interpolate(template, data);
    expect(result).toBe('Olá João, seu ID é 123');
  });

  it('should handle spaces in interpolation', () => {
    const template = 'Valor: {{ preco }}';
    const data = { preco: '10.00' };
    
    const result = DataSourceParser.interpolate(template, data);
    expect(result).toBe('Valor: 10.00');
  });
});
