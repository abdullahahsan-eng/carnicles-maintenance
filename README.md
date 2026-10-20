# Carnicles — Launch Calendar Website

A responsive React + Vite + TypeScript website concept for Carnicles. It includes:
- Premium automotive editorial homepage
- October / November / December 2026 launch calendar
- Launch cards and a featured detail panel
- Instagram, Facebook and YouTube links
- Lightweight lane-dodging mini-game
- Responsive mobile layout

## Important: launch data
The supplied calendar entries are intentionally marked as watchlist / expected placeholders. Do not publish unverified car names, prices, or launch dates as facts. Edit `src/launches.ts` and replace each placeholder with a model and details after verifying the manufacturer's official announcement or a reliable current report.

## Run locally on Windows PowerShell
Open PowerShell in this project folder and run:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Deploy
Upload the project source to the existing GitHub repository that is connected to Cloudflare Pages/Workers. Include `src`, `public`, `index.html`, `package.json`, `package-lock.json` (if generated), `tsconfig*.json`, and `vite.config.ts`. Do not upload `node_modules`.
Build command: `npm run build`
Output directory: `dist`

For a Workers static-assets deployment, use the existing project's current deployment method/settings rather than changing database or unrelated Worker routes.

## Notes
- The car graphic is a custom lightweight SVG illustration, not a 3D model.
- Automotive photos are loaded from Unsplash image URLs and require internet access.
- The mini-game is a simple interactive lane selector prototype, not a full physics-based racing game.
