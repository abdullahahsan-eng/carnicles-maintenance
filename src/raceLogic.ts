export type Ob = { x: number; y: number; w: number; h: number; c: string; kind: 'sedan' | 'small' | 'truck' }
export const W = 360, H = 520, PW = 34, PH = 60, M = 20
// Axis-aligned hit test with a small forgiveness inset so near-misses feel fair.
export function hits(px: number, py: number, o: Pick<Ob, 'x' | 'y' | 'w' | 'h'>, inset = 4): boolean {
  return px - PW / 2 + inset < o.x + o.w - inset && px + PW / 2 - inset > o.x + inset &&
    py + inset < o.y + o.h - inset && py + PH - inset > o.y + inset
}
const KINDS = [
  { kind: 'sedan' as const, w: 34, h: 60 }, { kind: 'small' as const, w: 30, h: 50 }, { kind: 'truck' as const, w: 40, h: 88 }]
const COLORS = ['#a14a4a', '#4a6fa1', '#b08a3e', '#6b5b95']
export function spawn(rand: () => number): Ob {
  const k = KINDS[Math.floor(rand() * KINDS.length)]
  return { x: M + 4 + rand() * (W - 2 * M - 8 - k.w), y: -k.h - 10, w: k.w, h: k.h, c: COLORS[Math.floor(rand() * COLORS.length)], kind: k.kind }
}
