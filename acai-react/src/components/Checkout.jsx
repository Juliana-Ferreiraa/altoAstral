import { useState } from 'react'
import { CONFIG, money, price } from '../data/config'
export default function Checkout({ cart, onBack, onClose, onDone }) {
  const [f, setF] = useState({ ent: 'e', nome: '', end: '', pg: 'Pix (demonstrativo)' })
  const [err, setErr] = useState({})
  const [ok, setOk] = useState(false)
  const entrega = f.ent === 'e'
  const total = cart.reduce((a, c) => a + price(c) * c.qty, 0) + (entrega ? CONFIG.regras.taxaEntrega : 0)
  const up = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const confirm = () => {
    const e = { nome: !f.nome.trim(), end: entrega && !f.end.trim() }
    setErr(e)
    if (!e.nome && !e.end) { setOk(true); onDone() }
  }
  if (ok) return (<div style={{ textAlign: 'center', padding: '60px 0' }}><div style={{ fontSize: 60 }}>🎉</div><h2>Pedido demo confirmado</h2>
    <p>Nada foi enviado ou cobrado. Aqui entraria a integração real.</p><button className="btn" onClick={onClose}>Fechar</button></div>)
  return (<>
    <h2>Finalizar</h2>
    <p className="note">Finalização demonstrativa: use dados fictícios. Nada é enviado nem cobrado.</p>
    <label className="fld">Entrega ou retirada<select value={f.ent} onChange={up('ent')}>
      <option value="e">Entrega (+ {money(CONFIG.regras.taxaEntrega)})</option><option value="r">Retirada na loja</option></select></label>
    <label className={'fld' + (err.nome ? ' bad' : '')}>Nome<input value={f.nome} onChange={up('nome')} /><span className="e">Informe seu nome.</span></label>
    {entrega && <label className={'fld' + (err.end ? ' bad' : '')}>Endereço de teste<input value={f.end} onChange={up('end')} /><span className="e">Informe um endereço fictício.</span></label>}
    <label className="fld">Pagamento<select value={f.pg} onChange={up('pg')}><option>Pix (demonstrativo)</option><option>Cartão (demonstrativo)</option><option>Dinheiro</option></select></label>
    <p>Total: <b>{money(total)}</b></p>
    <button className="btn" style={{ width: '100%' }} onClick={confirm}>Confirmar pedido demo</button>
    <p><button className="btn s" onClick={onBack}>Voltar à sacola</button></p>
  </>)
}
