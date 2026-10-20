import { useEffect, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { config } from './config'
import CarArt from './CarArt'
import Games from './games/Games'

function Countdown({ target, now }: { target: number; now: number }) {
  const d = Math.max(0, target - now)
  const parts: [number, string][] = [[Math.floor(d / 864e5), 'Days'], [Math.floor(d / 36e5) % 24, 'Hours'], [Math.floor(d / 6e4) % 60, 'Min'], [Math.floor(d / 1e3) % 60, 'Sec']]
  return <div className="count" role="timer" aria-label="Time until launch">{parts.map(([v, l]) => <div key={l}><b>{String(v).padStart(2, '0')}</b><span>{l}</span></div>)}</div>
}

function NotifyForm() {
  const [s, setS] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle')
  if (!config.formEndpoint) return null
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setS('busy')
    const email = new FormData(e.currentTarget).get('email')
    try {
      const r = await fetch(config.formEndpoint, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      setS(r.ok ? 'ok' : 'err')
    } catch { setS('err') }
  }
  return (
    <form className="notify" onSubmit={submit}>
      <label htmlFor="em">Notify me at launch</label>
      <div className="row"><input id="em" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        <button className="btn" disabled={s === 'busy'}>{s === 'busy' ? 'Sending…' : 'Notify me'}</button></div>
      <p role="status">{s === 'ok' && "Thanks — you're on the list."}{s === 'err' && "Sorry, that didn't go through. Please try again later."}</p>
    </form>)
}

export default function App() {
  const reduce = useReducedMotion()
  const [y, setY] = useState(0)
  const [now, setNow] = useState(Date.now())
  useEffect(() => { if (reduce) return; const f = () => setY(window.scrollY); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [reduce])
  const t = Date.parse(config.launchDate)
  const hasDate = !!config.launchDate && Number.isFinite(t)
  useEffect(() => {
    if (!hasDate || t <= Date.now()) return
    const id = window.setInterval(() => {
      const current = Date.now()
      setNow(current)
      if (current >= t) window.clearInterval(id)
    }, 1000)
    return () => window.clearInterval(id)
  }, [hasDate, t])
  const isLive = hasDate && now >= t
  const a = (delay: number) => reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay } }
  const { instagram, facebook, youtube } = config.social
  return (
    <>
      <div className="bg" aria-hidden="true" style={{ transform: `translateY(${y * 0.15}px)` }} />
      <main>
        <header className="hero">
          <motion.p className="badge" {...a(0)}><i /> {config.status}</motion.p>
          <motion.h1 className="wordmark" {...a(0.1)}>CARNICLES</motion.h1>
          <motion.p className="tag" {...a(0.2)}>Beyond the Drive.</motion.p>
          <motion.div className="carwrap" style={{ transform: `translateY(${y * -0.05}px)` }} {...(reduce ? {} : { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1.1, delay: 0.3 } })}><CarArt /></motion.div>
          <motion.h2 className="lead" {...a(0.5)}>We're Tuning Something Big.</motion.h2>
          <motion.p className="msg" {...a(0.6)}>Carnicles is getting a major upgrade. We're building a faster, bigger and more exciting experience for all car lovers.</motion.p>
          <motion.div {...a(0.7)}>{!hasDate ? <p className="launch">Launching Soon</p> : isLive ? <div className="launch-live"><p className="launch">WE'RE LIVE</p><a className="btn" href={config.liveSiteUrl}>Explore Carnicles ↗</a></div> : <Countdown target={t} now={now} />}</motion.div>
          <NotifyForm />
          <a className="btn" href="#play">Play While You Wait ↓</a>
        </header>
        <Games />
        <section aria-labelledby="sc-h" className="panel">
          <h2 id="sc-h">Stay Connected</h2>
          <ul className="social">
            {instagram && <li><a className="btn ghost" href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>}
            <li>{facebook ? <a className="btn ghost" href={facebook} target="_blank" rel="noopener noreferrer">Facebook</a> : <span className="btn ghost off" aria-disabled="true">Facebook — coming soon</span>}</li>
            {youtube && <li><a className="btn ghost" href={youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>}
          </ul>
        </section>
      </main>
      <footer><p className="wordmark sm">CARNICLES</p><p>Beyond the Drive.</p><p>© {new Date().getFullYear()} Carnicles · carnicleauto.com · All rights reserved.</p></footer>
    </>)
}
