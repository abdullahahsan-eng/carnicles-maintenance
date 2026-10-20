// Tiny dependency-free 3D renderer: flat-shaded convex solids, painter's algorithm.
export type V = [number, number, number]
export type Spec = { color: string; L: number; W: number; ride: number; belt: number; roof: number; cabA: number; cabB: number; nose: number; tail: number; wheelR: number }
export type Face = { p: V[]; n: V; c: [number, number, number] }

const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const norm = (a: V): V => { const l = Math.hypot(...a) || 1; return [a[0] / l, a[1] / l, a[2] / l] }
const rgb = (h: string): [number, number, number] => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const mean = (ps: V[]): V => { const k = ps.length; return [ps.reduce((s, p) => s + p[0], 0) / k, ps.reduce((s, p) => s + p[1], 0) / k, ps.reduce((s, p) => s + p[2], 0) / k] }

function solid(polys: V[][], centre: V, color: string): Face[] {
  const c = rgb(color)
  return polys.map(p => {
    let n = norm(cross(sub(p[1], p[0]), sub(p[2], p[0])))
    if (dot(n, sub(mean(p), centre)) < 0) n = [-n[0], -n[1], -n[2]]
    return { p, n, c }
  })
}
function frustum(xa0: number, xb0: number, w0: number, y0: number, xa1: number, xb1: number, w1: number, y1: number, color: string): Face[] {
  const b: V[] = [[xa0, y0, -w0 / 2], [xb0, y0, -w0 / 2], [xb0, y0, w0 / 2], [xa0, y0, w0 / 2]]
  const t: V[] = [[xa1, y1, -w1 / 2], [xb1, y1, -w1 / 2], [xb1, y1, w1 / 2], [xa1, y1, w1 / 2]]
  return solid([[b[0], b[1], b[2], b[3]], [t[0], t[1], t[2], t[3]], [b[0], b[1], t[1], t[0]], [b[1], b[2], t[2], t[1]], [b[2], b[3], t[3], t[2]], [b[3], b[0], t[0], t[3]]], mean([...b, ...t]), color)
}
function prism(cx: number, cy: number, cz: number, r: number, th: number, color: string, n = 12): Face[] {
  const ring = (z: number): V[] => Array.from({ length: n }, (_, i) => [cx + r * Math.cos((i / n) * 6.2832), cy + r * Math.sin((i / n) * 6.2832), z] as V)
  const f = ring(cz - th / 2), b = ring(cz + th / 2)
  const polys: V[][] = [f, b]
  for (let i = 0; i < n; i++) polys.push([f[i], f[(i + 1) % n], b[(i + 1) % n], b[i]])
  return solid(polys, [cx, cy, cz], color)
}

export function buildCar(s: Spec): Face[] {
  const hl = s.L / 2, f: Face[] = []
  const bodyTopW = s.W * 0.9
  f.push(...frustum(-hl, hl, s.W, s.ride, -hl + s.tail, hl - s.nose, bodyTopW, s.belt, s.color))
  const ct = 0.4
  f.push(...frustum(s.cabA, s.cabB, s.W * 0.88, s.belt, s.cabA + ct + (s.roof - s.belt) * 0.35, s.cabB - ct - (s.roof - s.belt) * 0.55, s.W * 0.7, s.roof, '#11151a'))
  f.push(...frustum(s.cabA + ct + (s.roof - s.belt) * 0.35 - 0.05, s.cabB - ct - (s.roof - s.belt) * 0.55 + 0.05, s.W * 0.72, s.roof - 0.02, s.cabA + ct + (s.roof - s.belt) * 0.35, s.cabB - ct - (s.roof - s.belt) * 0.55, s.W * 0.7, s.roof + 0.03, s.color))
  const my = (s.ride + s.belt) / 2 + 0.05, fx = hl - s.nose * 0.5 + 0.02, rx = -hl + s.tail * 0.5 - 0.02
  for (const z of [-s.W * 0.32, s.W * 0.32]) {
    f.push(...frustum(fx - 0.04, fx + 0.04, 0.34, my - 0.06, fx - 0.04, fx + 0.04, 0.34, my + 0.06, '#f4f7da').map(q => ({ ...q, p: q.p.map(v => [v[0], v[1], v[2] + z - 0] as V) })))
    f.push(...frustum(rx - 0.04, rx + 0.04, 0.34, my - 0.04, rx - 0.04, rx + 0.04, 0.34, my + 0.06, '#c0392b').map(q => ({ ...q, p: q.p.map(v => [v[0], v[1], v[2] + z] as V) })))
  }
  f.push(...frustum(-hl, hl, s.W + 0.01, s.belt - 0.06, -hl + s.tail, hl - s.nose, bodyTopW + 0.01, s.belt - 0.03, '#3ddc84')) // neon accent line
  for (const x of [-s.L * 0.3, s.L * 0.3]) for (const z of [-s.W / 2 + 0.05, s.W / 2 - 0.05]) {
    f.push(...prism(x, s.wheelR, z, s.wheelR, 0.28, '#0d0e10'))
    f.push(...prism(x, s.wheelR, z + (z > 0 ? 0.015 : -0.015), s.wheelR * 0.58, 0.28, '#9aa0a6'))
  }
  return f
}

const LIGHT = norm([-0.35, 0.85, 0.5])
export function render(ctx: CanvasRenderingContext2D, faces: Face[], angle: number, w: number, h: number, tilt = 0.2) {
  const ca = Math.cos(angle), sa = Math.sin(angle), ct = Math.cos(tilt), st = Math.sin(tilt)
  const D = 9, F = h * 2.35
  const rot = (v: V): V => { const x = v[0] * ca + v[2] * sa, z = -v[0] * sa + v[2] * ca; return [x, v[1] * ct - z * st, v[1] * st + z * ct] }
  const proj = (v: V): [number, number] => { const k = F / (D - v[2]); return [w / 2 + v[0] * k, h * 0.64 - (v[1] - 0.6) * k] }
  ctx.clearRect(0, 0, w, h)
  const [gx, gy] = proj(rot([0, 0, 0])); const gk = F / (D - rot([0, 0, 0])[2])
  const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gk * 3.2)
  g.addColorStop(0, 'rgba(61,220,132,0.28)'); g.addColorStop(1, 'rgba(61,220,132,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(gx, gy, gk * 3.2, gk * 3.2 * Math.max(0.25, st * 1.6 + 0.1), 0, 0, 6.2832); ctx.fill()
  const out: { z: number; pts: [number, number][]; col: string }[] = []
  for (const f of faces) {
    const n = rot(f.n), pr = f.p.map(rot), c = mean(pr)
    if (dot(n, sub([0, 0, D], c)) <= 0) continue
    const sh = 0.3 + 0.7 * Math.max(0, dot(n, LIGHT))
    out.push({ z: c[2], pts: pr.map(proj), col: `rgb(${Math.round(f.c[0] * sh)},${Math.round(f.c[1] * sh)},${Math.round(f.c[2] * sh)})` })
  }
  out.sort((a, b) => a.z - b.z)
  ctx.lineJoin = 'round'; ctx.lineWidth = 0.6
  for (const o of out) {
    ctx.beginPath(); o.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath()
    ctx.fillStyle = o.col; ctx.strokeStyle = o.col; ctx.fill(); ctx.stroke()
  }
  return out.length
}
