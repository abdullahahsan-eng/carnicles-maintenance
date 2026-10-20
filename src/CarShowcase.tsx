import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cars, weeklyIndex } from './cars'
import { buildCar, render } from './model3d'

const TAU = Math.PI * 2
const VIEWS: [string, number][] = [['Side', 0], ['3/4 front', 315], ['Front', 270], ['Rear', 90], ['Other side', 180]]
const CW = 960, CH = 440

export default function CarShowcase() {
  const reduce = useReducedMotion()
  const weekly = useMemo(() => weeklyIndex(), [])
  const [idx, setIdx] = useState(weekly)
  const [deg, setDeg] = useState(315)
  const car = cars[idx]
  const cv = useRef<HTMLCanvasElement>(null)
  const ang = useRef((315 * Math.PI) / 180)
  const idle = useRef(0)
  const drag = useRef<{ x: number; a: number } | null>(null)
  const tween = useRef(0)
  const faces = useMemo(() => buildCar(car.spec), [car])

  const paint = useCallback(() => {
    const c = cv.current; if (!c) return
    ang.current = ((ang.current % TAU) + TAU) % TAU
    if (!car.frames) render(c.getContext('2d')!, faces, ang.current, CW, CH)
    setDeg(Math.round((ang.current * 180) / Math.PI) % 360)
  }, [faces, car])

  useEffect(() => { paint() }, [paint])
  useEffect(() => {
    if (reduce) return
    let raf = 0
    const loop = () => { if (!drag.current && !tween.current && performance.now() - idle.current > 3500) { ang.current += 0.006; paint() } raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduce, paint])

  const goTo = (target: number) => {
    idle.current = performance.now(); cancelAnimationFrame(tween.current)
    const to = (target * Math.PI) / 180
    let d = ((to - ang.current + Math.PI) % TAU + TAU) % TAU - Math.PI
    if (reduce) { ang.current += d; tween.current = 0; paint(); return }
    const from = ang.current, t0 = performance.now()
    const step = (t: number) => { const k = Math.min(1, (t - t0) / 600), e = 1 - Math.pow(1 - k, 3); ang.current = from + d * e; paint(); tween.current = k < 1 ? requestAnimationFrame(step) : 0 }
    tween.current = requestAnimationFrame(step)
  }
  const nudge = (dd: number) => { idle.current = performance.now(); cancelAnimationFrame(tween.current); tween.current = 0; ang.current += (dd * Math.PI) / 180; paint() }
  const step = (n: number) => { setIdx(i => (i + n + cars.length) % cars.length); ang.current = (315 * Math.PI) / 180; idle.current = performance.now() }

  const n = car.frames?.length ?? 0
  const frame = n ? car.frames![Math.round((deg / 360) * n) % n] : ''
  return (
    <section className="show" aria-label="Featured car showcase">
      <p className="featured-tag">{idx === weekly ? 'Featured this week' : 'From the catalogue'}</p>
      <div className="stage" tabIndex={0} role="group" aria-label={`${car.name}: drag or use left and right arrow keys to rotate`}
        onKeyDown={e => { if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-10) } if (e.key === 'ArrowRight') { e.preventDefault(); nudge(10) } }}
        onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, a: ang.current }; cancelAnimationFrame(tween.current); tween.current = 0 }}
        onPointerMove={e => { if (!drag.current) return; ang.current = drag.current.a + ((e.clientX - drag.current.x) / e.currentTarget.clientWidth) * TAU * 0.9; idle.current = performance.now(); paint() }}
        onPointerUp={() => { drag.current = null; idle.current = performance.now() }} onPointerCancel={() => { drag.current = null }}>
        {n ? <img src={frame} alt={`${car.name} at ${deg} degrees`} draggable={false} /> : <canvas ref={cv} width={CW} height={CH} aria-hidden="true" />}
        <span className="drag-hint" aria-hidden="true">⟷ Drag to rotate</span>
      </div>
      <div className="show-ctl">
        <button className="btn ghost ctl" aria-label="Rotate left" onClick={() => nudge(-20)}>↺</button>
        <input type="range" min={0} max={359} value={deg} aria-label="Rotation angle in degrees" onChange={e => { idle.current = performance.now(); cancelAnimationFrame(tween.current); tween.current = 0; ang.current = (Number(e.target.value) * Math.PI) / 180; paint() }} />
        <button className="btn ghost ctl" aria-label="Rotate right" onClick={() => nudge(20)}>↻</button>
      </div>
      <div className="views" role="group" aria-label="Preset angles">{VIEWS.map(([l, a]) => <button key={l} className="chip" onClick={() => goTo(a)}>{l}</button>)}</div>
      <div className="show-info">
        <button className="btn ghost" aria-label="Previous car" onClick={() => step(-1)}>‹ Prev</button>
        <div aria-live="polite"><h3>{car.name} <span>{car.year}</span></h3><p>{car.description}</p><small>{idx + 1} / {cars.length}</small></div>
        <button className="btn ghost" aria-label="Next car" onClick={() => step(1)}>Next ›</button>
      </div>
    </section>)
}
