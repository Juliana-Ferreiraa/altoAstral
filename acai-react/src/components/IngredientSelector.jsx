import { CONFIG, ADD, IMG, money } from '../data/config'
export default function IngredientSelector({ add, onChange }) {
  const max = CONFIG.regras.maxPorAdicional
  return (<><h3>Escolha os adicionais</h3><small>Até {max} de cada.</small>
    <div className="cards" style={{ marginTop: 12 }}>
      {ADD.map((a) => { const q = add[a.id] || 0; return (
        <div key={a.id} className={'card' + (q ? ' sel' : '')}>
          <img src={IMG[a.id]} alt="" /><h3>{a.nome}</h3><small>+ {money(a.preco)}</small>
          <div className="qty">
            <button disabled={!q} aria-label={`Remover ${a.nome}`} onClick={() => onChange(a.id, -1)}>−</button>
            <b>{q}</b>
            <button disabled={q >= max} aria-label={`Adicionar ${a.nome}`} onClick={() => onChange(a.id, 1)}>+</button>
          </div>
        </div>) })}
    </div></>)
}
