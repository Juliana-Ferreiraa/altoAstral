import { CONFIG, money } from '../data/config'
export default function SizeSelector({ value, onChange }) {
  return (<><h3>Escolha o tamanho</h3>
    <div className="cards" style={{ marginTop: 12 }}>
      {CONFIG.tamanhos.map((t) => (
        <button key={t.ml} className={'card' + (value === t.ml ? ' sel' : '')} onClick={() => onChange(t.ml)}>
          <h3 style={{ fontSize: 30 }}>{t.ml} ml</h3><small>{money(t.preco)}</small>
        </button>))}
    </div></>)
}
