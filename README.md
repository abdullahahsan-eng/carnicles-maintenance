# Carnicles Coming Soon
Install: `npm install` · Dev: `npm run dev` · Build: `npm run build` (output: `dist/`)
Config (launch date, live-site URL, status, social links, form endpoint): `src/config.ts`

## Countdown
Leave `launchDate: ""` until the launch date is confirmed. The page will show **Launching Soon**. When ready, set an ISO date/time with the India Standard Time offset, for example `"2026-12-01T18:00:00+05:30"`. The countdown updates every second and switches to **WE'RE LIVE** after the target time, with a button linking to `liveSiteUrl`.

## Cloudflare Pages
1. Push this folder to GitHub/GitLab. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`. Node 18+.
3. Deploy, then Custom domains → add `carnicleauto.com`.
`public/_redirects` makes refresh/direct URLs serve the page. Replace `public/robots.txt` when the full site launches.
