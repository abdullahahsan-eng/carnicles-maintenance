export default function CarArt() {
  return (
    <svg viewBox="0 0 800 280" role="img" aria-label="Stylised illustration of a low sports car" className="car">
      <defs>
        <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6e9ec"/><stop offset=".45" stopColor="#7d848b"/><stop offset="1" stopColor="#23262a"/></linearGradient>
        <radialGradient id="g" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#3ddc84" stopOpacity=".5"/><stop offset="1" stopColor="#3ddc84" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="400" cy="245" rx="360" ry="22" fill="url(#g)"/>
      <path d="M40 200c4-26 30-38 80-46l130-18c50-38 110-60 170-60 70 0 110 24 150 58l110 18c50 8 72 24 72 48v14H40z" fill="url(#b)"/>
      <path d="M270 138c40-28 90-46 140-46 50 0 90 16 124 44z" fill="#0b0c0d" opacity=".85"/>
      <path d="M60 196h680" stroke="#3ddc84" strokeWidth="2" opacity=".8"/>
      <circle cx="210" cy="212" r="40" fill="#0b0c0d"/><circle cx="210" cy="212" r="22" fill="#9aa0a6"/>
      <circle cx="610" cy="212" r="40" fill="#0b0c0d"/><circle cx="610" cy="212" r="22" fill="#9aa0a6"/>
      <path d="M730 178l30 6-4 12-34-4z" fill="#3ddc84"/>
    </svg>)
}
