import { ADD, money, price, baseNome } from '../data/config'
export default function ShoppingCart({ cart, setCart, onClose, onEdit, onCheckout }) {
  const sub = cart.reduce((a, c) => a + price(c) * c.qty, 0)
  const qty = (i, d) => setCart(cart.map((c, j) => (j === i ? { ...c, qty: Math.max(1, c.qty + d) } : c)))
  return (<>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}><h2>Sua sacola</h2><button className="btn s" onClick={onClose}>Fechar</button></div>
    {cart.length === 0 ? (
      <div style={{ textAlign: 'center', padding: '50px 0' }}><div style={{ fontSize: 60 }}>🥣</div><h3>Sua sacola está vazia</h3>
        <p>Monte seu primeiro copo e ele aparece aqui.</p><button className="btn" onClick={onClose}>Montar agora</button></div>
    ) : (<>
      {cart.map((c, i) => (
        <div className="li" key={i}>
          <b>{baseNome(c.base)} {c.size} ml</b>
          <p>{Object.entries(c.add).map(([k, q]) => `${q}× ${ADD.find((a) => a.id === k).nome}`).join(', ') || 'Sem adicionais'}</p>
          <p>{money(price(c))} cada</p>
          <div className="qty">
            <button aria-label="Menos" onClick={() => qty(i, -1)}>−</button><b>{c.qty}</b><button aria-label="Mais" onClick={() => qty(i, 1)}>+</button>
            <button className="btn s" onClick={() => onEdit(i)}>Editar</button>
            <button className="btn s" onClick={() => setCart(cart.filter((_, j) => j !== i))}>Remover</button>
          </div>
        </div>))}
      <p>Subtotal: <b>{money(sub)}</b></p>
      <button className="btn" style={{ width: '100%' }} onClick={onCheckout}>Finalizar pedido</button>
    </>)}
  </>)
}
