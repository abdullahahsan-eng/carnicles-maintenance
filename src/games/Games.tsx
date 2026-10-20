import { useState } from 'react'
import Quiz from './Quiz'
import Race from './Race'
import { carQuiz, guessCar, logoQuiz } from './data'
const tabs = ['Car Quiz', 'Racing', 'Guess the Car', 'Logo Quiz'] as const
export default function Games() {
  const [t, setT] = useState(0)
  return (
    <section id="play" aria-labelledby="play-h" className="panel">
      <h2 id="play-h">Play While You Wait</h2>
      <div role="tablist" aria-label="Mini-games" className="tabs">
        {tabs.map((n, i) => <button key={n} role="tab" aria-selected={t === i} className={t === i ? 'tab on' : 'tab'} onClick={() => setT(i)}>{n}</button>)}
      </div>
      <div role="tabpanel" key={t}>
        {t === 0 && <Quiz title="Car Quiz" intro="10 questions. Pick an answer, then press Next." items={carQuiz} />}
        {t === 1 && <Race />}
        {t === 2 && <Quiz title="Guess the Car" intro="Read the clue and pick the car." items={guessCar} />}
        {t === 3 && <Quiz title="Car Logo Quiz" intro="Identify the brand from a description of its emblem." items={logoQuiz} />}
      </div>
    </section>)
}
