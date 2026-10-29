import { ADD, money, price, baseNome } from '../data/config'
export default function OrderSummary({ order }) {
  return (<>
    <div className="sum">
      <div><span>Base</span><b>{order.base ? baseNome(order.base) : '—'}</b></div>
      <div><span>Tamanho</span><b>{order.size ? order.size + ' ml' : '—'}</b></div>
      {ADD.filter((a) => order.add[a.id]).map((a) => (
        <div key={a.id}><span>{order.add[a.id]}× {a.nome}</span><b>{money(a.preco * order.add[a.id])}</b></div>))}
    </div>
    <div className="tot">Total {money(price(order))}</div></>)
}
