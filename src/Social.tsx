import { config } from './config'
const Ig = () => <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>
const Fb = () => <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.5-3.2h-3.2V7.9c0-.9.4-1.7 1.8-1.7h1.5V3.4S15.5 3.2 14.2 3.2c-2.7 0-4.4 1.6-4.4 4.5v2.1H7v3.2h2.8v8z"/></svg>
const Yt = () => <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"/></svg>
const items = [
  { name: 'Instagram', url: config.social.instagram, icon: <Ig />, blurb: 'Reels, launches and behind the scenes' },
  { name: 'Facebook', url: config.social.facebook, icon: <Fb />, blurb: 'News, updates and community' },
  { name: 'YouTube', url: config.social.youtube, icon: <Yt />, blurb: 'Reviews and comparisons' },
]
export default function Social() {
  return (
    <section id="follow" className="panel social-panel" aria-labelledby="sa-h">
      <h2 id="sa-h">Stay Connected. Stay Ahead.</h2>
      <p className="msg">Follow Carnicles across your favourite platforms for the latest automotive news, car launches, comparisons, reviews and reels.</p>
      <ul className="scards">
        {items.map(i => <li key={i.name}>{i.url
          ? <a className="scard" href={i.url} target="_blank" rel="noopener noreferrer" aria-label={`Follow Carnicles on ${i.name} (opens in a new tab)`}>
              {i.icon}<b>{i.name}</b><span>{i.blurb}</span><em>Follow Carnicles →</em></a>
          : <div className="scard off" role="group" aria-label={`${i.name}: link coming soon`}>{i.icon}<b>{i.name}</b><span>{i.blurb}</span><em>Link coming soon</em></div>}</li>)}
      </ul>
      <p className="tagline">New content. New cars. Every week.</p>
    </section>)
}
