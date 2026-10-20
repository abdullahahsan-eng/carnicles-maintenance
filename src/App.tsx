import { lazy, Suspense, useEffect, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { config } from './config'
import CarArt from './CarArt'
import Games from './games/Games'
import Social from './Social'
const CarShowcase = lazy(() => import('./CarShowcase'))

function Countdown({ target }: { target: number }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id) }, [])
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
  useEffect(() => { if (reduce) return; const f = () => setY(window.scrollY); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [reduce])
  const t = Date.parse(config.launchDate); const hasDate = !!config.launchDate && !isNaN(t) && t > Date.now()
  const a = (delay: number) => reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay } }
  return (
    <>
      <div className="bg" aria-hidden="true" style={{ transform: `translateY(${y * 0.15}px)` }} />
      <main>
        <header className="hero">
          <motion.p className="badge" {...a(0)}><i /> {config.status}</motion.p>
          <motion.h1 className="wordmark" {...a(0.1)}>CARNICLES</motion.h1>
          <motion.p className="tag" {...a(0.2)}>Beyond the Drive.</motion.p>
          <motion.div className="showwrap" {...a(0.3)}><Suspense fallback={<div className="carwrap"><CarArt /><p role="status" className="meta">Loading showcase…</p></div>}><CarShowcase /></Suspense></motion.div>
          <motion.h2 className="lead" {...a(0.5)}>We're Tuning Something Big.</motion.h2>
          <motion.p className="msg" {...a(0.6)}>Carnicles is getting a major upgrade. We're building a faster, bigger and more exciting experience for all car lovers.</motion.p>
          <motion.div {...a(0.7)}>{hasDate ? <Countdown target={t} /> : <p className="launch">Launching Soon</p>}</motion.div>
          <NotifyForm />
          <a className="btn" href="#play">Play While You Wait ↓</a>
        </header>
        <Social />
        <Games />
      </main>
      <footer><p className="wordmark sm">CARNICLES</p><p>Beyond the Drive.</p><p>© {new Date().getFullYear()} Carnicles · carnicleauto.com · All rights reserved.</p></footer>
    </>)
}
