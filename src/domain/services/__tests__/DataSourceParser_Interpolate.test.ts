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

  describe('Task 50: Context & Math', () => {
    const context = { index: 5, total: 100, date: '2026-05-16' };

    it('should interpolate context variables if not in data', () => {
      expect(DataSourceParser.interpolate('Etiqueta {{ index }} de {{ total }}', {}, context)).toBe('Etiqueta 5 de 100');
    });

    it('should prioritize data over context', () => {
      expect(DataSourceParser.interpolate('{{ index }}', { index: 'RealData' }, context)).toBe('RealData');
    });

    it('should apply math:add formatter', () => {
      expect(DataSourceParser.interpolate('{{ index:add(1) }}', {}, context)).toBe('6');
      expect(DataSourceParser.interpolate('{{ preco:add(100) }}', data)).toBe('1350.5');
    });

    it('should apply math:sub formatter', () => {
      expect(DataSourceParser.interpolate('{{ total:sub(1) }}', {}, context)).toBe('99');
    });

    it('should apply math:mul formatter', () => {
      expect(DataSourceParser.interpolate('{{ index:mul(2) }}', {}, context)).toBe('10');
    });

    it('should apply math:div formatter', () => {
      expect(DataSourceParser.interpolate('{{ total:div(2) }}', {}, context)).toBe('50');
    });

    it('should chain context, math and other formatters', () => {
      expect(DataSourceParser.interpolate('COUNT: {{ total:sub(1):mul(10):number }}', {}, context)).toBe('COUNT: 990');
    });
  });
});
