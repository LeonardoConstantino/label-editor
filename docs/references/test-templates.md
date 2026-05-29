# Templates de Teste — Label Forge OS

## Template base Vitest para serviço de renderização

```typescript
import { describe, it, expect, vi } from 'vitest'
import { calculateUnitDimensions } from '../src/core/render-service'

describe('calculateUnitDimensions', () => {
  it('deve calcular dimensões corretamente em milímetros', () => {
    const result = calculateUnitDimensions({ value: 100, unit: 'mm' })
    expect(result.pixels).toBeCloseTo(378, 0) // 100mm a 96dpi
  })

  it('deve calcular dimensões corretamente em centímetros', () => {
    const result = calculateUnitDimensions({ value: 10, unit: 'cm' })
    expect(result.pixels).toBeCloseTo(378, 0)
  })

  it('deve calcular dimensões corretamente em polegadas', () => {
    const result = calculateUnitDimensions({ value: 1, unit: 'in' })
    expect(result.pixels).toBe(96)
  })

  it('deve lançar erro para unidade inválida', () => {
    expect(() => calculateUnitDimensions({ value: 10, unit: 'px' as any }))
      .toThrow('Unidade não suportada')
  })

  it('deve lançar erro para valor negativo', () => {
    expect(() => calculateUnitDimensions({ value: -5, unit: 'mm' }))
      .toThrow('Valor deve ser positivo')
  })
})
```

## Template base para sanitização XSS

```typescript
import { describe, it, expect } from 'vitest'
import { DataSourceParser } from '../src/core/data-source-parser'

describe('DataSourceParser — Segurança XSS', () => {
  it('deve sanitizar script tags em labels', () => {
    const parser = new DataSourceParser()
    const maliciousInput = '<script>alert("xss")</script>Label Normal'
    const result = parser.parse({ label: maliciousInput })
    expect(result.label).not.toContain('<script>')
    expect(result.label).toContain('Label Normal')
  })

  it('deve sanitizar atributos onerror em imagens', () => {
    const parser = new DataSourceParser()
    const maliciousInput = '<img src=x onerror="alert(1)">'
    const result = parser.parse({ label: maliciousInput })
    expect(result.label).not.toContain('onerror')
  })

  it('deve preservar texto legítimo após sanitização', () => {
    const parser = new DataSourceParser()
    const legitimateInput = 'Produto A — Ref: 001/2024'
    const result = parser.parse({ label: legitimateInput })
    expect(result.label).toBe(legitimateInput)
  })
})
```

## Template para modificadores de acesso TypeScript

```typescript
// Exemplo de como refatorar após achado TS-N
// ANTES (problemático):
class LabelService {
  data: LabelData[] // público por padrão — vazamento de encapsulamento
  config: Config    // deveria ser readonly

  processLabel(input: any): any { // any oculto
    return input as any
  }
}

// DEPOIS (correto):
interface ProcessedLabel {
  id: string
  content: string
  dimensions: Dimensions
}

class LabelService {
  private readonly data: LabelData[]
  private readonly config: Config

  processLabel(input: RawLabelInput): ProcessedLabel {
    // implementação tipada
  }
}
```