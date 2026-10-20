import { useState } from 'react'
import type { Item } from './data'
export default function Quiz({ title, intro, items }: { title: string; intro: string; items: Item[] }) {
  const [i, setI] = useState(0), [score, setScore] = useState(0), [pick, setPick] = useState<number | null>(null)
  const done = i >= items.length
  const reset = () => { setI(0); setScore(0); setPick(null) }
  if (done) return (
    <div className="game"><h3>{title}: Final score</h3>
      <p className="big" role="status">{score} / {items.length}</p>
      <p>{score === items.length ? "Flawless lap! Pure petrolhead." : score >= items.length / 2 ? "Solid pace. Try for a perfect run." : "Back to the garage — go again!"}</p>
      <button className="btn" onClick={reset}>Restart</button></div>)
  const it = items[i]
  return (
    <div className="game"><p className="hint">{intro}</p>
      <p className="meta" aria-live="polite">Question {i + 1} of {items.length} · Score {score}</p>
      <h3>{it.q}</h3>
      <div className="opts">{it.options.map((o, n) => {
        const cls = pick === null ? "" : n === it.a ? "ok" : n === pick ? "bad" : ""
        return <button key={n} className={`opt ${cls}`} disabled={pick !== null}
          onClick={() => { setPick(n); if (n === it.a) setScore(s => s + 1) }}>{o}</button>
      })}</div>
      {pick !== null && <p role="status">{pick === it.a ? "Correct!" : `Not quite — the answer is ${it.options[it.a]}.`}</p>}
      <div className="row">
        <button className="btn" disabled={pick === null} onClick={() => { setI(i + 1); setPick(null) }}>{i + 1 === items.length ? "See score" : "Next"}</button>
        <button className="btn ghost" onClick={reset}>Restart</button></div></div>)
}
