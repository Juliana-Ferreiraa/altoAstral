import { useEffect, useState } from 'react'
import BaseSelector from './BaseSelector'
import SizeSelector from './SizeSelector'
import IngredientSelector from './IngredientSelector'
import LiveCupPreview from './LiveCupPreview'
import OrderSummary from './OrderSummary'

const EMPTY = { base: null, size: null, add: {}, step: 0 }
const FUN = ['Boa escolha!', 'Esse vai ficar bom!', 'Mais um pra conta!', 'Combinação de respeito.', 'Já deu água na boca.']
const STEPS = ['1. Base', '2. Tamanho', '3. Adicionais']

export default function ProductCustomizer({ load, editing, onSave }) {
  const [S, setS] = useState(EMPTY)
  const [msg, setMsg] = useState('Escolha uma base para começar.')
  const [n, setN] = useState(0)
  const say = (m) => { setN(n + 1); setMsg(m ?? FUN[n % 5]) }

  // carrega um pedido (editar na sacola ou escolher no cardápio)
  useEffect(() => { if (load) setS({ ...EMPTY, ...load.item, add: { ...(load.item.add || {}) }, step: load.step }) }, [load])

  const set = (p) => setS((s) => ({ ...s, ...p }))
  const canGo = (i) => i <= S.step || (S.base && (i < 2 || S.size))
  const blocked = (S.step === 0 && !S.base) || (S.step === 1 && !S.size)
  const changeAdd = (id, d) => { setS((s) => { const add = { ...s.add }; add[id] = (add[id] || 0) + d; if (add[id] <= 0) delete add[id]; return { ...s, add } }); if (d > 0) say() }
  const next = () => {
    if (S.step < 2) return set({ step: S.step + 1 })
    onSave({ base: S.base, size: S.size, add: { ...S.add }, qty: 1 })
    setS(EMPTY); setMsg(editing ? 'Pedido atualizado!' : 'Copo na sacola!')
  }

  return (
    <div className="cust">
      <div>
        <div className="prog">{STEPS.map((t, i) => (
          <button key={t} className={(i === S.step ? 'on ' : '') + (i < S.step ? 'ok' : '')} onClick={() => canGo(i) && set({ step: i })}>{t}</button>))}</div>
        {S.step === 0 && <BaseSelector value={S.base} onChange={(b) => { set({ base: b }); say() }} />}
        {S.step === 1 && <SizeSelector value={S.size} onChange={(z) => { set({ size: z }); say(`Copo ${z} ml. ${FUN[n % 5]}`) }} />}
        {S.step === 2 && <IngredientSelector add={S.add} onChange={changeAdd} />}
        <div className="nav">
          <button className="btn s" disabled={S.step === 0} onClick={() => set({ step: S.step - 1 })}>Voltar</button>
          <button className="btn s" onClick={() => { setS(EMPTY); say('Copo limpo. Vamos de novo?') }}>Limpar montagem</button>
          <button className="btn" disabled={blocked} onClick={next}>{S.step < 2 ? 'Próximo' : editing ? 'Salvar alteração' : 'Adicionar à sacola'}</button>
        </div>
      </div>
      <aside className="side">
        <div className="stage"><LiveCupPreview base={S.base || 'acai'} size={S.size} add={S.add} uid="live" /></div>
        <div><div className="msg" aria-live="polite">{msg}</div><OrderSummary order={S} /></div>
      </aside>
    </div>
  )
}
