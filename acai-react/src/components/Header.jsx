export default function Header({ count, onBag }) {
  return (
    <header>
      <b>Açaí Alto Astral</b>
      <a className="n" href="#top">Início</a><a className="n" href="#monte">Monte seu copo</a><a className="n" href="#cardapio">Cardápio</a>
      <button key={count} className="bag pop" onClick={onBag} aria-label="Abrir sacola">Sacola<i>{count}</i></button>
    </header>
  )
}
