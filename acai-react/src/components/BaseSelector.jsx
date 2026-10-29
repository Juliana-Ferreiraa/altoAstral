import { CONFIG, IMG } from '../data/config'
export default function BaseSelector({ value, onChange }) {
  return (<><h3>Escolha a base</h3>
    <div className="cards" style={{ marginTop: 12 }}>
      {CONFIG.bases.map((b) => (
        <button key={b.id} className={'card' + (value === b.id ? ' sel' : '')} onClick={() => onChange(b.id)}>
          <img src={IMG[b.id]} alt="" /><h3>{b.nome}</h3><small>{b.desc}</small>
        </button>))}
    </div></>)
}
