import { useEffect, useRef, useState } from 'react'
import { H, M, PH, PW, W, hits, spawn, type Ob } from '../raceLogic'
import { drawPlayer, drawTraffic } from '../sprites'

export default function Race() {
  const cv = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<'idle' | 'run' | 'over'>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => { try { return Number(localStorage.getItem('carnicles-best')) || 0 } catch { return 0 } })
  const keys = useRef({ l: false, r: false })
  const g = useRef({ x: W / 2, obs: [] as Ob[], sp: 3, spawn: 0, s: 0, off: 0 })

  const start = () => { keys.current.l = keys.current.r = false; g.current = { x: W / 2, obs: [], sp: 3, spawn: 30, s: 0, off: 0 }; setScore(0); setStatus('run') }

  useEffect(() => {
    const k = (v: boolean) => (e: KeyboardEvent) => {
      const c = e.key
      if (c === 'ArrowLeft' || c === 'a' || c === 'A') { keys.current.l = v; if (status === 'run') e.preventDefault() }
      if (c === 'ArrowRight' || c === 'd' || c === 'D') { keys.current.r = v; if (status === 'run') e.preventDefault() }
    }
    const dn = k(true), up = k(false)
    window.addEventListener('keydown', dn); window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up) }
  }, [status])

  useEffect(() => {
    const ctx = cv.current!.getContext('2d')!
    const py = H - PH - 20
    const draw = (s = g.current) => {
      ctx.fillStyle = '#15171a'; ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#2a2d31'; ctx.fillRect(M, 0, W - 2 * M, H)
      ctx.fillStyle = '#3ddc84'; ctx.fillRect(M - 4, 0, 4, H); ctx.fillRect(W - M, 0, 4, H)
      ctx.fillStyle = '#9aa0a6'
      for (let y = -40 + (s.off % 80); y < H; y += 80) ctx.fillRect(W / 2 - 2, y, 4, 40)
      s.obs.forEach(o => drawTraffic(ctx, o))
      drawPlayer(ctx, s.x - PW / 2, py, PW, PH)
    }
    if (status !== 'run') { draw(); return }
    let raf = 0, last = performance.now(), shown = 0
    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67; last = now
      const s = g.current
      const dir = (keys.current.r ? 1 : 0) - (keys.current.l ? 1 : 0)
      s.x = Math.max(M + PW / 2, Math.min(W - M - PW / 2, s.x + dir * 5 * dt))
      s.sp += 0.002 * dt; s.s += s.sp * dt * 0.1; s.off += s.sp * dt
      s.spawn -= dt
      if (s.spawn <= 0) { s.obs.push(spawn(Math.random)); s.spawn = Math.max(28, 70 - s.sp * 5) }
      s.obs.forEach(o => (o.y += s.sp * dt)); s.obs = s.obs.filter(o => o.y < H + 100)
      const hit = s.obs.some(o => hits(s.x, py, o))
      draw(s)
      const sc = Math.floor(s.s)
      if (sc !== shown) { shown = sc; setScore(sc) }
      if (hit) {
        setStatus('over')
        setBest(b => { const n = Math.max(b, sc); try { localStorage.setItem('carnicles-best', String(n)) } catch { /* ignore */ } return n })
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [status])

  const hold = (d: 'l' | 'r') => ({
    onPointerDown: (e: React.PointerEvent) => { e.preventDefault(); keys.current[d] = true },
    onPointerUp: () => (keys.current[d] = false), onPointerLeave: () => (keys.current[d] = false), onPointerCancel: () => (keys.current[d] = false),
  })
  return (
    <div className="game">
      <p className="hint">Dodge the traffic in your silver car with the green stripe. Keyboard: ← → or A / D. Touch: hold the on-screen arrows or press the left/right side of the road.</p>
      <p className="meta" aria-live="polite">Score {score} · Best {best}</p>
      <div className="canvaswrap">
        <canvas ref={cv} width={W} height={H} aria-label="Car racing game canvas"
          onPointerDown={e => { const r = e.currentTarget.getBoundingClientRect(); const left = e.clientX - r.left < r.width / 2; keys.current.l = left; keys.current.r = !left }}
          onPointerUp={() => { keys.current.l = keys.current.r = false }} onPointerLeave={() => { keys.current.l = keys.current.r = false }} />
        {status !== 'run' && <div className="overlay">
          <p className="big">{status === 'over' ? `Crashed! Score ${score}` : 'Ready?'}</p>
          <button className="btn" onClick={start}>{status === 'over' ? 'Restart' : 'Start'}</button></div>}
      </div>
      <div className="row pad">
        <button className="btn ctl" aria-label="Steer left" {...hold('l')}>◀</button>
        <button className="btn ghost" onClick={start}>Restart</button>
        <button className="btn ctl" aria-label="Steer right" {...hold('r')}>▶</button>
      </div>
    </div>)
}
