// ===== CONFIGURAÇÃO: edite aqui. Valores demonstrativos, a confirmar com o proprietário =====
const files = import.meta.glob('../assets/img/*.webp', { eager: true, import: 'default' })
export const IMG = Object.fromEntries(Object.entries(files).map(([p, u]) => [p.split('/').pop().replace('.webp', ''), u]))

export const CONFIG = {
  loja: 'Açaí Alto Astral',
  bases: [
    { id: 'acai', nome: 'Açaí Tradicional', desc: 'Intenso, gelado e cremoso.', preco: 0 },
    { id: 'cupuacu', nome: 'Cupuaçu', desc: 'Suave, ácido na medida certa.', preco: 0 },
    { id: 'casadinho', nome: 'Casadinho', desc: 'Açaí e cupuaçu no mesmo copo.', preco: 0 },
  ],
  tamanhos: [
    { ml: 300, preco: 12, escala: 0.8 },
    { ml: 500, preco: 17, escala: 0.9 },
    { ml: 700, preco: 22, escala: 1 },
  ],
  // id, nome, preço, líquido (calda desenhada como faixa em vez de pedaços)
  adicionais: [
    ['condensado', 'Leite Condensado', 2, true], ['leitepo', 'Leite em Pó', 2], ['morango', 'Morango', 3],
    ['banana', 'Banana', 2], ['granola', 'Granola', 2], ['pacoca', 'Paçoca', 2.5], ['mms', "M&M's", 3.5],
    ['ovomaltine', 'Ovomaltine', 3.5], ['jujuba', 'Jujuba', 2.5], ['lacta', 'Farinha Láctea', 2.5],
  ],
  regras: { adicionaisGratis: 0, maxPorAdicional: 3, taxaEntrega: 5 },
}
export const ADD = CONFIG.adicionais.map(([id, nome, preco, liq]) => ({ id, nome, preco, liq: !!liq }))
export const POS = [[18,2],[52,0],[34,8],[66,7],[10,12],[44,13],[76,2],[26,17],[58,17],[86,12],[40,-2],[68,13]]
export const money = (v) => 'R$ ' + v.toFixed(2).replace('.', ',')
export const baseNome = (id) => CONFIG.bases.find((b) => b.id === id)?.nome ?? '—'

export function price(o) {
  let t = CONFIG.bases.find((b) => b.id === o.base)?.preco ?? 0
  t += CONFIG.tamanhos.find((s) => s.ml === o.size)?.preco ?? 0
  let n = 0
  for (const [id, q] of Object.entries(o.add)) {
    const a = ADD.find((x) => x.id === id)
    for (let i = 0; i < q; i++) { n++; if (n > CONFIG.regras.adicionaisGratis) t += a.preco }
  }
  return t
}
