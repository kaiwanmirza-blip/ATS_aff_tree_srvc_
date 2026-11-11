# Affordable Tree Service Inc. project status

**Snapshot: November 10, 2026.** The Vite build serves the multi-theme React prototype with the selected **ATS-05** branding. The estimate form works in demo mode without Supabase and supports live lead and photo submission when configured.

## Current file tree

```text
AffordableTreeServiceInc/
├── .env.example
├── .gitignore
├── .nvmrc
├── .vercelignore
├── DEPLOYMENT.md
├── PROJECT_STATUS.md
├── ROADMAP.md
├── index.html
├── netlify.toml
├── package-lock.json
├── package.json
├── project-tracker.html
├── vercel.json
├── vite.config.js
├── img_ref/
│   ├── FB_image_01.png
│   └── FB_image_02.png
├── src/
│   ├── assets/
│   │   ├── ATS-05-mark.jpg
│   │   ├── ATS-05.png
│   │   └── arborist.jpg
│   ├── components/
│   │   └── ATSLogo.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── themes/
│   │   └── siteThemes.js
│   ├── App.jsx
│   ├── ServiceCoverage.jsx
│   ├── StormBanner.jsx
│   ├── index.css
│   └── main.jsx
└── supabase/
    ├── README.md
    └── migrations/
        └── 20260301_init_leads.sql
```

The tree omits Git metadata, installed dependencies (`node_modules/`), generated build output (`dist/`), and private local environment files.

## Entry points

| Path | Current role |
| --- | --- |
| [`index.html`](index.html) | Vite HTML entry. Defines `#root` and loads `/src/main.jsx`. |
| [`src/main.jsx`](src/main.jsx) | Calls `createRoot`, renders `App`, and loads `src/index.css`. |
| [`src/App.jsx`](src/App.jsx) | Multi-theme landing page and estimate form. |
| [`src/index.css`](src/index.css) | Tailwind import, theme palettes, and responsive layouts. |
| [`project-tracker.html`](project-tracker.html) | Standalone offline tracker. Open it directly in a browser. |

## Implementation status

### Multi-theme prototype

The theme selector switches among Rugged Pro, Eco-Clean, and Emergency Rapid. Five tabs cover Home, About Us, Estimator & Payments, Testimonials & Reviews, and Emergency / Insurance. The site includes the Shoals service-area selector and ticker, a radius diagram with optional Google Maps, office and emergency call links, NWS storm alerts, a feet/meters plot-area calculator, a sample payment-plan comparison, and an estimate form with optional photo attachment. Vercel and Netlify build the checkout and serve `dist/`. A hosted preview URL has yet to be verified. See [DEPLOYMENT.md](DEPLOYMENT.md).

### Logo

The site header uses a compact JPEG derived from the selected 1254 × 1254 [ATS-05 PNG](src/assets/ATS-05.png). [`ATSLogo.jsx`](src/components/ATSLogo.jsx) retains the earlier inline SVG with a navy default fill, a red emergency fill, and a green accent.

### Supabase

- [`src/lib/supabase.js`](src/lib/supabase.js) exports a shared browser client using `@supabase/supabase-js` `2.119.0`. It reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` and throws if the module is imported with either value missing. [`.env.example`](.env.example) provides placeholders. The key must be a browser-safe publishable or legacy anon key.
- The [initial SQL migration](supabase/migrations/20260301_init_leads.sql) defines `public.leads`, `public.lead_status_logs`, a trigger that records the initial status and later status changes, and a private `lead-photos` bucket. The SQL enables row-level security on both tables, gives visitors insert-only lead intake and upload access, and limits uploads to JPEG, PNG, and WebP files up to 10 MiB.
- The estimate form loads the client when both variables are present. It submits the lead first and then uploads the optional photo. If the upload fails, the same lead ID is used for the retry. With no configuration, demo mode makes no network submission. Live database and Storage access depend on the intended project's migration and environment setup. See [Supabase setup](supabase/README.md).

## Verify the build and preview locally

Run from Windows PowerShell with Node.js 24. The commands below were checked with Node `24.12.0` and npm `11.6.2`. Run `npm.cmd ci` first only on a fresh checkout or when dependencies need to be restored. It requires npm registry access. The current checkout already has its dependencies installed.

```powershell
Set-Location -LiteralPath 'C:\Users\kaiwa\OneDrive\ALGDGADU\AffordableTreeServiceInc'
node --version
npm.cmd --version
npm.cmd run build
```

A successful build creates `dist/index.html`, bundled JavaScript and CSS, and hashed image assets. After the build succeeds, serve that output with:

```powershell
npm.cmd run preview -- --port 4173 --strictPort
```

Open <http://127.0.0.1:4173/> to check the three themes and estimate form. Press `Ctrl+C` to stop the preview server. If port `4173` is occupied, choose another free port and use the URL Vite prints.

For development with live reload, use the following command. Port `5174` was used because `5173`, Vite's default development port, was already occupied. If the development server is already running, open its URL directly.

```powershell
npm.cmd run dev -- --port 5174
```

Open <http://127.0.0.1:5174/>. The production build passed using the installed dependencies.
