import { config } from './config'
import type { Spec } from './model3d'

// Featured-car catalogue. Each entry renders as a real, rotatable 3D model built in code
// (src/model3d.ts): these four are ORIGINAL stylised Carnicles concepts, not real vehicles.
//
// To feature a real car with photos: add `frames` = an ordered list of image URLs taken
// at evenly spaced angles around the car (e.g. 24 or 36 shots, first = side-on view,
// rotating one full turn). Put them in /public/cars/<id>/ and list "/cars/<id>/01.webp"...
// Only use photos you own or are licensed to use. When `frames` is present it replaces the 3D model.
export type Car = { id: string; name: string; year: number; description: string; spec: Spec; frames?: string[] }

export const cars: Car[] = [
  { id: 'concept-gt', name: 'Carnicles Concept GT', year: 2026,
    description: 'A low, wide grand tourer concept built around long-distance speed and a planted stance.',
    spec: { color: '#aeb4bb', L: 4.6, W: 1.95, ride: 0.22, belt: 0.78, roof: 1.2, cabA: -0.7, cabB: 0.95, nose: 0.55, tail: 0.3, wheelR: 0.37 } },
  { id: 'concept-hot-hatch', name: 'Carnicles Concept Hot Hatch', year: 2026,
    description: 'A compact, quick-turning hatchback concept for tight roads and everyday fun.',
    spec: { color: '#2f9e63', L: 3.9, W: 1.8, ride: 0.24, belt: 0.88, roof: 1.42, cabA: -1.2, cabB: 1.25, nose: 0.35, tail: 0.12, wheelR: 0.36 } },
  { id: 'concept-suv', name: 'Carnicles Concept Explorer', year: 2026,
    description: 'A tall-riding family SUV concept with a commanding view and plenty of space.',
    spec: { color: '#5b6672', L: 4.8, W: 1.98, ride: 0.36, belt: 1.02, roof: 1.68, cabA: -1.5, cabB: 1.3, nose: 0.4, tail: 0.15, wheelR: 0.46 } },
  { id: 'concept-roadster', name: 'Carnicles Concept Roadster', year: 2026,
    description: 'A compact two-seat roadster concept: light, open and built for sunset drives.',
    spec: { color: '#c9ced3', L: 4.2, W: 1.9, ride: 0.22, belt: 0.74, roof: 1.0, cabA: -0.35, cabB: 0.55, nose: 0.5, tail: 0.3, wheelR: 0.36 } },
]

export function weeklyIndex(now = Date.now()): number {
  const { mode, manualId, rotationStart } = config.featured
  if (mode === 'manual') { const i = cars.findIndex(c => c.id === manualId); return i >= 0 ? i : 0 }
  const start = Date.parse(rotationStart)
  if (isNaN(start)) return 0
  const weeks = Math.floor((now - start) / (7 * 864e5))
  return ((weeks % cars.length) + cars.length) % cars.length
}
