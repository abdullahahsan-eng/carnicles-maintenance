import type { Ob } from './raceLogic'
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath()
}
// Top-down car, nose pointing up. (x, y) = top-left of the sprite box.
export function drawPlayer(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save()
  ctx.shadowColor = 'rgba(61,220,132,.9)'; ctx.shadowBlur = 16
  const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#8d949b'); g.addColorStop(.5, '#f1f3f5'); g.addColorStop(1, '#8d949b')
  rr(ctx, x + 2, y, w - 4, h, 11); ctx.fillStyle = g; ctx.fill(); ctx.shadowBlur = 0
  ctx.fillStyle = '#10161b'; for (const wx of [x - 2, x + w - 4]) for (const wy of [y + 8, y + h - 20]) { rr(ctx, wx, wy, 6, 13, 2); ctx.fill() }
  ctx.fillStyle = '#3ddc84'; ctx.fillRect(x + w / 2 - 2, y + 2, 4, h - 4)
  ctx.fillStyle = '#0d1318'; ctx.beginPath(); ctx.moveTo(x + 7, y + h * .38); ctx.lineTo(x + w - 7, y + h * .38); ctx.lineTo(x + w - 9, y + h * .6); ctx.lineTo(x + 9, y + h * .6); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#fffbd0'; ctx.fillRect(x + 6, y + 2, 7, 3); ctx.fillRect(x + w - 13, y + 2, 7, 3)
  ctx.fillStyle = '#d6dbe0'; ctx.fillRect(x + 3, y + h - 6, w - 6, 3)
  ctx.restore()
}
export function drawTraffic(ctx: CanvasRenderingContext2D, o: Ob) {
  const { x, y, w, h } = o
  ctx.save()
  ctx.fillStyle = 'rgba(0,0,0,.35)'; rr(ctx, x + 3, y + 3, w, h, 8); ctx.fill()
  ctx.fillStyle = '#0a0b0c'; for (const wx of [x - 2, x + w - 3]) for (const wy of [y + 8, y + h - 20]) { rr(ctx, wx, wy, 5, 12, 2); ctx.fill() }
  if (o.kind === 'truck') {
    rr(ctx, x, y, w, 24, 6); ctx.fillStyle = o.c; ctx.fill()
    ctx.fillStyle = '#12171c'; ctx.fillRect(x + 5, y + 6, w - 10, 8)
    ctx.fillStyle = '#7a8087'; rr(ctx, x + 1, y + 26, w - 2, h - 26, 3); ctx.fill()
    ctx.fillStyle = '#5c6268'; ctx.fillRect(x + 4, y + 30, w - 8, 3)
  } else {
    rr(ctx, x, y, w, h, 9); ctx.fillStyle = o.c; ctx.fill()
    ctx.fillStyle = '#12171c'; ctx.beginPath(); ctx.moveTo(x + 5, y + h * .3); ctx.lineTo(x + w - 5, y + h * .3); ctx.lineTo(x + w - 6, y + h * .62); ctx.lineTo(x + 6, y + h * .62); ctx.closePath(); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(x + 5, y + h * .66, w - 10, 3)
  }
  ctx.fillStyle = '#ffd9a0'; ctx.fillRect(x + 3, y + 1, 5, 3); ctx.fillRect(x + w - 8, y + 1, 5, 3)
  ctx.fillStyle = '#ff4d4d'; ctx.fillRect(x + 3, y + h - 4, 6, 3); ctx.fillRect(x + w - 9, y + h - 4, 6, 3)
  ctx.restore()
}
