import LiveCupPreview from './LiveCupPreview'
export default function HeroSection() {
  return (
    <section className="hero" id="top">
      <span className="bd" style={{ width: 180, height: 180, right: '6%', top: '12%' }} />
      <span className="bd" style={{ width: 90, height: 90, left: '44%', bottom: '8%', animationDelay: '-3s' }} />
      <div>
        <h1>Seu sabor.<br /><em>Suas regras.</em></h1>
        <p>Escolha a base, o tamanho e os adicionais e veja o copo ficar pronto na sua frente.</p>
        <p><button className="btn" onClick={() => document.getElementById('monte').scrollIntoView()}>CRIAR MEU COPO</button></p>
      </div>
      <LiveCupPreview base="casadinho" size={700} uid="hero" add={{ morango: 1, granola: 1, banana: 1, condensado: 1 }} />
    </section>
  )
}
