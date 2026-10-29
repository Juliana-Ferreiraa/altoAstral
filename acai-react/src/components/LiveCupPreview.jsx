import { CONFIG, ADD, IMG, POS } from '../data/config'
const CUP = 'M22 46H178L160 272Q159 280 151 280H49Q41 280 40 272Z'

export default function LiveCupPreview({ base = 'acai', size, add = {}, uid = 'cup' }) {
  const escala = CONFIG.tamanhos.find((t) => t.ml === size)?.escala ?? 1
  const stops = base === 'cupuacu' ? ['#fffaf0', '#eadfc4'] : ['#6b2a78', '#2d0a3a']
  const tops = []
  ADD.forEach((a, i) => {
    const q = add[a.id] || 0
    const n = a.liq ? Math.min(q, 1) : q * 2
    for (let k = 0; k < n; k++) {
      const p = POS[(i * 5 + k * 3) % 12]
      tops.push(a.liq
        ? { key: a.id + k, id: a.id, cls: 'l', style: { left: '27%', top: '13%' } }
        : { key: a.id + k, id: a.id, style: { left: p[0] + '%', top: p[1] + 6 + '%', transform: `rotate(${((i * 37 + k * 23) % 50) - 25}deg)` } })
    }
  })
  return (
    <div className="cupw">
      <div className="in" style={{ transform: `scale(${escala})` }}>
        <svg viewBox="0 0 200 290" aria-hidden="true">
          <defs>
            <linearGradient id={`g${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={stops[0]} /><stop offset="1" stopColor={stops[1]} /></linearGradient>
            <clipPath id={`c${uid}`}><path d={CUP} /></clipPath>
          </defs>
          <path d={CUP} fill="#e9dcf7" opacity=".55" />
          <g clipPath={`url(#c${uid})`}>
            <rect x="0" y="70" width="200" height="220" fill={`url(#g${uid})`} style={{ transition: '.5s' }} />
            <ellipse cx="100" cy="72" rx="82" ry="14" fill={`url(#g${uid})`} />
            <g opacity={base === 'casadinho' ? 1 : 0} style={{ transition: '.5s' }}>
              <path d="M0 120C60 90 110 160 200 120V150C110 190 60 120 0 150Z" fill="#fff4d6" />
              <path d="M0 200C70 170 120 240 200 200V225C120 265 70 200 0 230Z" fill="#fff4d6" />
            </g>
            <path d="M40 50L52 276" stroke="#fff" strokeWidth="5" opacity=".25" />
          </g>
          <path d={CUP} fill="none" stroke="#8d5bc4" strokeWidth="3" />
          <rect x="14" y="36" width="172" height="14" rx="7" fill="#b38ae0" />
          <g transform="translate(100 185)">
            <circle r="42" fill="#fff" stroke="#ffc72c" strokeWidth="5" />
            <circle r="36" fill="none" stroke="#5b2287" strokeWidth="2" strokeDasharray="2 4" />
            <text y="8" textAnchor="middle" fontFamily="Fraunces,serif" fontWeight="900" fontSize="26" fill="#ffc72c" stroke="#5b2287" strokeWidth="1.5" paintOrder="stroke">Açaí</text>
            <text y="22" textAnchor="middle" fontFamily="Nunito" fontWeight="800" fontSize="9" fill="#5b2287">Alto astral</text>
            <circle cy="-22" r="8" fill="#5b2287" />
          </g>
        </svg>
        <div className="tops">{tops.map((t) => <img key={t.key} src={IMG[t.id]} alt="" className={t.cls} style={t.style} />)}</div>
      </div>
    </div>
  )
}
