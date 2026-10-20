import { useMemo, useState } from 'react'
import { launches, type Launch } from './launches'

const socials = [
  { name: 'Instagram', handle: '@carnicle.auto', href: 'https://www.instagram.com/carnicle.auto/', mark: 'ig', copy: 'Reels, launches & quick takes' },
  { name: 'Facebook', handle: 'Carnicles', href: 'https://www.facebook.com/share/1FGsDPkvmq/', mark: 'f', copy: 'Join the automotive community' },
  { name: 'YouTube', handle: '@Carnicleauto', href: 'https://www.youtube.com/@Carnicleauto', mark: '▶', copy: 'Videos, reviews & comparisons' },
]

const months = ['October', 'November', 'December'] as const

function Arrow({ right = false }: { right?: boolean }) {
  return <span aria-hidden="true">{right ? '↗' : '←'}</span>
}

function CarSprite({ color = '#c9d0d8' }: { color?: string }) {
  return (
    <svg className="car-sprite" viewBox="0 0 160 72" role="img" aria-label="Illustration of a car">
      <ellipse cx="80" cy="59" rx="63" ry="7" fill="rgba(0,0,0,.36)" />
      <path d="M22 47 L29 34 Q32 30 43 29 L59 13 Q63 9 72 9 L101 9 Q110 10 116 20 L129 31 Q137 33 140 40 L141 51 L130 54 L29 54 L20 51 Z" fill={color} stroke="#edf0f3" strokeOpacity=".55" strokeWidth="1.5"/>
      <path d="M45 29 L61 15 Q64 13 72 13 L81 13 L81 29 Z" fill="#1c2934" />
      <path d="M86 13 L100 14 Q105 15 110 24 L114 29 L86 29 Z" fill="#1c2934" />
      <path d="M28 36 L45 36 L43 42 L25 43 Z" fill="#f2f4f6" />
      <path d="M119 34 L132 39 L133 43 L122 42 Z" fill="#b6f1c5" />
      <path d="M46 32 L114 32" stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
      <circle cx="43" cy="51" r="10" fill="#090b0e" stroke="#89919b" strokeWidth="2"/>
      <circle cx="43" cy="51" r="4" fill="#aeb5be"/>
      <circle cx="117" cy="51" r="10" fill="#090b0e" stroke="#89919b" strokeWidth="2"/>
      <circle cx="117" cy="51" r="4" fill="#aeb5be"/>
    </svg>
  )
}

function LaunchCard({ item, active, onClick }: { item: Launch; active: boolean; onClick: () => void }) {
  return (
    <button className={`launch-card ${active ? 'active' : ''}`} onClick={onClick} type="button">
      <div className="launch-image" style={{ backgroundImage: `linear-gradient(180deg,rgba(7,9,12,.03),rgba(7,9,12,.75)),url("${item.image}")` }}>
        <span className={`status status-${item.status.toLowerCase()}`}>{item.status}</span>
        <span className="brand-chip">{item.brand}</span>
      </div>
      <div className="launch-card-body">
        <div className="card-month">{item.month.toUpperCase()} 2026 <span>·</span> {item.date}</div>
        <h3>{item.name}</h3>
        <p>{item.type}</p>
        <div className="card-foot"><span>{item.price}</span><span className="round-arrow">↗</span></div>
      </div>
    </button>
  )
}

function App() {
  const [month, setMonth] = useState<(typeof months)[number]>('October')
  const [activeId, setActiveId] = useState(launches[0].id)
  const [gameScore, setGameScore] = useState(0)
  const [lane, setLane] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)

  const filtered = useMemo(() => launches.filter((car) => car.month === month), [month])
  const active = launches.find((car) => car.id === activeId) ?? filtered[0] ?? launches[0]

  function selectMonth(nextMonth: (typeof months)[number]) {
    setMonth(nextMonth)
    const next = launches.find((car) => car.month === nextMonth)
    if (next) setActiveId(next.id)
  }

  function moveCar(direction: number) {
    setLane((current) => Math.max(0, Math.min(2, current + direction)))
    if (gameStarted) setGameScore((score) => score + 10)
  }

  return (
    <main>
      <nav className="nav shell">
        <a className="wordmark" href="#top" aria-label="Carnicles home"><span className="wordmark-icon">C</span><span>CARNICLES<small>BEYOND THE DRIVE.</small></span></a>
        <div className="nav-links"><a href="#calendar">Launch calendar</a><a href="#play">Play</a><a href="#community">Community</a></div>
        <a className="nav-cta" href="https://www.instagram.com/carnicle.auto/" target="_blank" rel="noreferrer">Follow Carnicles <Arrow right /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> THE INDIAN AUTOMOTIVE EDIT</div>
          <h1>The road ahead.<br /><em>Starts here.</em></h1>
          <p className="hero-description">Your front-row seat to upcoming car launches, new technology and everything worth knowing about the drive ahead.</p>
          <div className="hero-actions"><a className="button button-light" href="#calendar">Explore launch calendar <Arrow right /></a><a className="text-link" href="#community">Stay connected <span>↓</span></a></div>
          <div className="hero-stats"><div><strong>03</strong><span>MONTHS IN VIEW</span></div><i /><div><strong>01</strong><span>PASSION FOR CARS</span></div><i /><div><strong>∞</strong><span>REASONS TO DRIVE</span></div></div>
        </div>
        <div className="hero-art" aria-label="Automotive hero artwork">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-glow" />
          <div className="hero-car"><CarSprite color="#c8d1dc" /></div>
          <div className="hero-caption"><span>THE NEXT CHAPTER</span><strong>DRIVE WHAT'S NEXT.</strong></div>
          <div className="hero-index">INDIA / AUTO / 2026</div>
        </div>
      </section>

      <section className="ticker" aria-label="Carnicles topics"><div className="ticker-track"><span>NEW LAUNCHES</span><b>✳</b><span>REAL-WORLD REVIEWS</span><b>✳</b><span>CAR CULTURE</span><b>✳</b><span>THE FUTURE OF MOBILITY</span><b>✳</b><span>NEW LAUNCHES</span><b>✳</b><span>REAL-WORLD REVIEWS</span><b>✳</b></div></section>

      <section className="calendar-section shell section" id="calendar">
        <div className="section-heading">
          <div><div className="eyebrow">MARK YOUR CALENDAR / 2026</div><h2>The next big <em>arrivals.</em></h2><p>New cars to watch. Dates, details and first impressions — all in one place.</p></div>
          <div className="month-tabs" role="tablist" aria-label="Choose launch month">{months.map((m) => <button key={m} role="tab" aria-selected={month === m} className={month === m ? 'selected' : ''} onClick={() => selectMonth(m)}>{m}<small>{m === 'October' ? 'OCT' : m === 'November' ? 'NOV' : 'DEC'}</small></button>)}</div>
        </div>
        <div className="launch-layout">
          <div className="launch-grid">{filtered.map((item) => <LaunchCard key={item.id} item={item} active={activeId === item.id} onClick={() => setActiveId(item.id)} />)}</div>
          <aside className="detail-panel">
            <div className="detail-top"><span>FEATURED / {active.month.toUpperCase()}</span><span className={`status status-${active.status.toLowerCase()}`}>{active.status}</span></div>
            <div className="detail-photo" style={{ backgroundImage: `linear-gradient(180deg,rgba(7,9,12,.02),rgba(7,9,12,.65)),url("${active.image}")` }}><div className="detail-brand">{active.brand}</div><CarSprite /></div>
            <div className="detail-content"><div className="date-line"><span className="date-icon">◷</span><span>{active.date}</span></div><h3>{active.name}</h3><p className="detail-type">{active.type}</p>
              <div className="spec-row"><div><small>POWERTRAIN</small><strong>{active.powertrain}</strong></div><div><small>EXPECTED PRICE</small><strong>{active.price}</strong></div></div>
              <div className="highlights"><h4>WHAT TO WATCH</h4>{active.highlights.map((h) => <div className="highlight" key={h}><span>↗</span>{h}</div>)}</div>
              <p className="editor-note">{active.note}</p>
            </div>
          </aside>
        </div>
        <p className="disclaimer">Editorial note: launch dates and prices can change. Confirm all details from official manufacturer announcements before publishing.</p>
      </section>

      <section className="spotlight section">
        <div className="shell spotlight-inner"><div className="spotlight-copy"><div className="eyebrow">THE CARNICLES POV</div><h2>Not just the launch.<br /><em>What it means.</em></h2><p>From first looks to features that matter in everyday driving, we make car news easier to understand — without the noise.</p><a className="button button-outline" href="https://www.instagram.com/carnicle.auto/" target="_blank" rel="noreferrer">Explore our reels <Arrow right /></a></div>
          <div className="spotlight-visual"><div className="spotlight-ring" /><div className="spotlight-car"><CarSprite color="#e2e5e9" /></div><span className="spotlight-label">BUILT FOR THE CURIOUS.</span><span className="spotlight-number">C / 026</span></div></div>
      </section>

      <section className="game-section shell section" id="play">
        <div className="section-heading"><div><div className="eyebrow">TAKE A QUICK PIT STOP</div><h2>Play while you <em>wait.</em></h2><p>A tiny lane-dodging challenge. Keep your car clear of the traffic.</p></div><div className="game-badge"><span className="live-dot" /> MINI GAME / BETA</div></div>
        <div className="game-wrap">
          <div className="game-hud"><div><small>DISTANCE</small><strong>{String(gameScore).padStart(4, '0')} <small>PTS</small></strong></div><div className="game-lane-label">CARNICLES HIGHWAY <span>•</span> 01</div><button className="reset-button" onClick={() => { setGameScore(0); setLane(1); setGameStarted(false) }}>Reset ↺</button></div>
          <div className={`road ${gameStarted ? 'road-moving' : ''}`}>
            <div className="road-edge edge-left" /><div className="road-edge edge-right" /><div className="lane-line lane-a" /><div className="lane-line lane-b" />
            <div className="road-horizon" /><div className="traffic-car traffic-one"><CarSprite color="#a8b3c2" /></div><div className="traffic-car traffic-two"><CarSprite color="#7fb6a0" /></div>
            <div className="player-car" style={{ left: `${16 + lane * 34}%` }}><CarSprite color="#dce3eb" /></div>
            {!gameStarted && <div className="game-start-overlay"><span className="play-mark">▶</span><strong>READY WHEN YOU ARE</strong><button className="button button-light" onClick={() => setGameStarted(true)}>Start driving</button></div>}
          </div>
          <div className="game-controls"><span>USE THE CONTROLS TO CHANGE LANES</span><div><button aria-label="Move left" onClick={() => moveCar(-1)}>←</button><button aria-label="Move right" onClick={() => moveCar(1)}>→</button></div></div>
        </div>
      </section>

      <section className="community-section section" id="community"><div className="shell">
        <div className="community-heading"><div className="eyebrow">THE DRIVE DOESN'T END HERE</div><h2>Stay connected.<br /><em>Stay ahead.</em></h2><p>Follow Carnicles for the latest automotive news, car launches, comparisons, reviews and reels.</p></div>
        <div className="social-grid">{socials.map((social) => <a className="social-card" key={social.name} href={social.href} target="_blank" rel="noreferrer"><span className={`social-mark ${social.mark}`}>{social.mark === 'ig' ? '◎' : social.mark}</span><span className="social-copy"><strong>{social.name}</strong><small>{social.copy}</small><span className="social-handle">{social.handle}</span></span><span className="social-arrow">↗</span></a>)}</div>
        <div className="community-bottom"><span>NEW CONTENT. NEW CARS. EVERY WEEK.</span><a href="https://www.instagram.com/carnicle.auto/" target="_blank" rel="noreferrer">FOLLOW @CARNICLE.AUTO ↗</a></div>
      </div></section>

      <footer className="footer shell"><a className="wordmark" href="#top"><span className="wordmark-icon">C</span><span>CARNICLES<small>BEYOND THE DRIVE.</small></span></a><span className="footer-copy">Independent automotive culture. Made for the drive ahead.</span><a href="#top" className="back-top">BACK TO TOP ↑</a><span className="copyright">© 2026 CARNICLES</span></footer>
    </main>
  )
}

export default App