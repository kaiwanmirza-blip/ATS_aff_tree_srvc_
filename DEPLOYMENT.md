# Deploy a client preview

Run these PowerShell commands from the project root with Node.js 24 installed. Both hosts use `npm run build` and serve the static `dist/` directory. The CLI workflows deploy from your local checkout and do not require a Git push.

This checkout deploys the multi-theme application via `src/main.jsx`. It features the selected **ATS-05** logo. The form runs in demo mode unless both Supabase build variables are configured. See [Supabase setup](supabase/README.md) to enable live lead and photo submission.

The interactive Google map overlay is paused in `src/ServiceCoverage.jsx`. The city selector and coverage diagram are available with an “Enhancements coming soon” watermark. When the overlay work resumes, set `serviceMapPaused` to `false` and set `VITE_GOOGLE_MAPS_API_KEY` in `.env.local` or the host's build settings. Enable Maps JavaScript API in the Google Cloud project and restrict the browser key to that API and your local or hosted origins. Restart Vite or rebuild after setting the key.

Create the key in [Google Cloud Credentials](https://console.cloud.google.com/apis/credentials) under the company’s billing-enabled project. For local testing, allow `http://127.0.0.1:5174/*` in the key’s website restrictions. To also load review cards, enable Places API (New), allow it in the key’s API restrictions, and set `VITE_GOOGLE_PLACE_ID` to the confirmed business listing ID. Google supplies up to five reviews. The app filters or sorts that returned set.

## Verify locally

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run preview
```

Open the localhost URL that Vite prints and confirm it shows the page you want to share. Press `Ctrl+C` to stop the preview server.

## Vercel

```powershell
npx.cmd --yes vercel@latest login
npx.cmd --yes vercel@latest deploy
```

Choose the account or team and create or link the project when prompted. Copy the Preview URL from the output. If the preview requires Vercel login, use [Share → Anyone with the link](https://vercel.com/docs/deployments/sharing-deployments) and test the resulting link in a private browser window. For a production deployment, run `npx.cmd --yes vercel@latest deploy --prod`.

## Netlify

```powershell
npx.cmd --yes netlify-cli@latest login
npx.cmd --yes netlify-cli@latest deploy --context deploy-preview
```

Create or select a site when prompted. The CLI builds locally and prints a draft deploy URL. Test it in a private browser window before sharing. For a production deployment, run `npx.cmd --yes netlify-cli@latest deploy --prod --context production`.
