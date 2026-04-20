import { describe, it, expect } from 'vitest';
import { DataSourceParser } from '../DataSourceParser';

describe('DataSourceParser.interpolate', () => {
  const data = {
    nome: 'João Silva',
    preco: 1250.5,
    percentual: 0.15,
    quantidade: 1000,
    data_envio: '2026-04-19T10:00:00',
    texto_longo: 'Este é um texto muito longo que deve ser truncado para testes.',
    extra: { chave: 'valor' },
    espacos: '   trim me   ',
  };

  it('should interpolate simple variables', () => {
    expect(DataSourceParser.interpolate('Olá {{ nome }}', data)).toBe('Olá João Silva');
  });

  it('should support dots and dashes in keys', () => {
    const complexData = { 'meu.dado': 'valor1', 'outro-dado': 'valor2' };
    expect(DataSourceParser.interpolate('{{ meu.dado }} e {{ outro-dado }}', complexData)).toBe('valor1 e valor2');
  });

  it('should apply upper and lower formatters', () => {
    expect(DataSourceParser.interpolate('{{ nome:upper }}', data)).toBe('JOÃO SILVA');
    expect(DataSourceParser.interpolate('{{ nome:lower }}', data)).toBe('joão silva');
  });

  it('should apply capitalize and title formatters', () => {
    expect(DataSourceParser.interpolate('{{ "teste de texto":capitalize }}', { '"teste de texto"': 'joão silva' })).toBe('João silva');
    expect(DataSourceParser.interpolate('{{ nome:title }}', { nome: 'joão silva' })).toBe('João Silva');
  });

  it('should apply currency formatter (pt-BR)', () => {
    // Note: Intl format might vary slightly in some environments (e.g. non-breaking spaces)
    const result = DataSourceParser.interpolate('{{ preco:currency }}', data);
    expect(result).toMatch(/R\$\s?1\.250,50/);
  });

  it('should apply number and percent formatters', () => {
    expect(DataSourceParser.interpolate('{{ quantidade:number }}', data)).toBe('1.000');
    expect(DataSourceParser.interpolate('{{ percentual:percent }}', data)).toMatch(/15%/);
  });

  it('should apply date and datetime formatters', () => {
    expect(DataSourceParser.interpolate('{{ data_envio:date }}', data)).toBe('19/04/2026');
    expect(DataSourceParser.interpolate('{{ data_envio:datetime }}', data)).toMatch(/19\/04\/2026/);
  });

  it('should apply truncate formatter', () => {
    expect(DataSourceParser.interpolate('{{ texto_longo:truncate(10) }}', data)).toBe('Este é um ...');
  });

  it('should apply trim formatter', () => {
    expect(DataSourceParser.interpolate('{{ espacos:trim }}', data)).toBe('trim me');
  });

  it('should apply json formatter', () => {
    const result = DataSourceParser.interpolate('{{ extra:json }}', data);
    expect(result).toContain('"chave": "valor"');
  });

  it('should handle default values (||)', () => {
    expect(DataSourceParser.interpolate('{{ inexistente||Valor Padrão }}', data)).toBe('Valor Padrão');
    expect(DataSourceParser.interpolate('{{ nulo||Vazio }}', { nulo: null })).toBe('Vazio');
  });

  it('should handle chaining formatters', () => {
    expect(DataSourceParser.interpolate('{{ nome:trim:upper }}', { nome: '   joao   ' })).toBe('JOAO');
  });

  it('should return original tag if variable not found and no default provided', () => {
    expect(DataSourceParser.interpolate('{{ missing }}', {})).toBe('{{ missing }}');
  });

  it('should ignore non-existent formatters', () => {
    expect(DataSourceParser.interpolate('{{ nome:fake }}', data)).toBe('João Silva');
  });

  it('should handle spaces inside tags', () => {
    expect(DataSourceParser.interpolate('{{   nome   :   upper   }}', data)).toBe('JOÃO SILVA');
  });
});
