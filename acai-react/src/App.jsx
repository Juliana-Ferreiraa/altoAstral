import { useEffect, useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProductCustomizer from './components/ProductCustomizer'
import ShoppingCart from './components/ShoppingCart'
import Checkout from './components/Checkout'
import { CONFIG, IMG, money } from './data/config'

export default function App() {
  const [cart, setCart] = useState([])
  const [panel, setPanel] = useState(null) // null | 'bag' | 'checkout'
  const [editIdx, setEditIdx] = useState(-1)
  const [load, setLoad] = useState(null)
  const count = cart.reduce((a, c) => a + c.qty, 0)
  const go = () => document.getElementById('monte').scrollIntoView()

  useEffect(() => { const k = (e) => e.key === 'Escape' && setPanel(null); document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k) }, [])

  const save = (item) => {
    setCart((c) => (editIdx >= 0 ? c.map((x, i) => (i === editIdx ? { ...item, qty: x.qty } : x)) : [...c, item]))
    setEditIdx(-1)
  }
  const edit = (i) => { setEditIdx(i); setLoad({ item: cart[i], step: 2 }); setPanel(null); go() }
  const pick = (id) => { setEditIdx(-1); setLoad({ item: { base: id, size: null, add: {} }, step: 1 }); go() }

  return (<>
    <Header count={count} onBag={() => setPanel('bag')} />
    <HeroSection />
    <main>
      <section className="sec" id="monte">
        <h2>Monte seu copo</h2>
        <div className="note">Preços e tamanhos de exemplo, configuráveis em src/data/config.js.</div>
        <ProductCustomizer load={load} editing={editIdx >= 0} onSave={save} />
      </section>
      <section className="sec" id="cardapio" style={{ marginTop: '8vh' }}>
        <h2>Nosso cardápio</h2>
        <div className="menu">{CONFIG.bases.map((b) => (
          <button key={b.id} className="card" onClick={() => pick(b.id)}>
            <img src={IMG[b.id]} alt="" /><h3>{b.nome}</h3><small>{b.desc}</small>
            <small>a partir de {money(CONFIG.tamanhos[0].preco + b.preco)}</small>
          </button>))}</div>
      </section>
    </main>
    <footer>Protótipo demonstrativo. Preços, tamanhos e regras são exemplos e ainda serão confirmados com o proprietário. Nenhum pagamento real é processado.</footer>
    <div className={'over' + (panel ? ' on' : '')} onClick={(e) => e.target === e.currentTarget && setPanel(null)}>
      <div className="pnl" role="dialog" aria-modal="true">
        {panel === 'bag' && <ShoppingCart cart={cart} setCart={setCart} onClose={() => setPanel(null)} onEdit={edit} onCheckout={() => setPanel('checkout')} />}
        {panel === 'checkout' && <Checkout cart={cart} onBack={() => setPanel('bag')} onClose={() => setPanel(null)} onDone={() => setCart([])} />}
      </div>
    </div>
  </>)
}
