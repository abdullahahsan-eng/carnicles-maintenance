# Carnicles Coming Soon
Install: `npm install` · Dev: `npm run dev` · Build: `npm run build` (output: `dist/`)
Config (launch date, status, social links, form endpoint): `src/config.ts`

## Cloudflare Pages
1. Push this folder to GitHub/GitLab. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`. Node 18+.
3. Deploy, then Custom domains → add `carnicleauto.com`.
`public/_redirects` makes refresh/direct URLs serve the page. Replace `public/robots.txt` when the full site launches.

## Upgrade notes
- Featured car: catalogue in `src/cars.ts`, rotation settings in `src/config.ts` (`featured`). Weekly mode is computed in the visitor's browser from the date; it does not fetch new cars — add cars in `cars.ts` and redeploy. To use real photos, add a `frames` list (evenly spaced angles, full turn) to a car.
- Social links: `src/config.ts` → `social` (empty = "Link coming soon", not clickable).
- Racing sprites: `src/sprites.ts`; collision/spawn logic: `src/raceLogic.ts`.
