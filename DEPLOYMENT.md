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

## Replit client demos

Create one Replit App per branch so each version has its own published URL.

| Branch | Demo |
| --- | --- |
| `feature/multi-theme-prototype` | Rugged Pro, Eco-Clean with five scenery choices, and Emergency Rapid |
| `codex/ats-v0.7` | Woodland with Light, Dark, and System appearance. System is the default. |

GitHub reported zero branches on November 10, 2026. To link the apps to the public GitHub repository, run the following from the existing local checkout after approving the repository contents for public sharing.

```powershell
git push -u origin feature/multi-theme-prototype
git push -u origin codex/ats-v0.7
git ls-remote --heads origin feature/multi-theme-prototype codex/ats-v0.7
```

1. Open [Replit Import](https://replit.com/import), choose **GitHub**, connect your account if prompted, and import `kaiwanmirza-blip/ATS_aff_tree_srvc_` into two apps. If the import opens a different branch, use the Git pane to switch branches or run `git fetch origin` and then `git switch feature/multi-theme-prototype` in the first app and `git switch codex/ats-v0.7` in the second. Confirm each checkout with `git log -1 --oneline`. [Replit Git documentation](https://docs.replit.com/replit-workspace/workspace-features/version-control)
2. To import without pushing to GitHub, create two archives locally with `git archive -o ats-multi-theme.zip feature/multi-theme-prototype` and `git archive -o ats-v07-woodland.zip codex/ats-v0.7`. In Replit Import choose **ZIP** and upload one archive per app. ZIP import copies the source snapshot. Use the GitHub path for a linked checkout. [Replit import documentation](https://docs.replit.com/build/import-from-providers)
3. Set the workspace runtime to Node.js 24 and check `node --version`. In the Replit Shell run `npm ci` and `npm run build`. For an optional workspace preview, use the command below and expose port `3000` in Replit's Ports tool if it is not detected. [Replit configuration documentation](https://docs.replit.com/features/project-setup/configuration)

   ```sh
   __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS="$REPLIT_DEV_DOMAIN" npm run dev -- --host 0.0.0.0 --port 3000
   ```

4. In **Publishing**, choose **Static**, set the build command to `npm ci && npm run build`, and set the public directory to `dist`. Publish each app and copy its published URL. Use the visibility appropriate for the client audience. [Replit deployment types](https://docs.replit.com/features/publishing/deployment-types)
5. Open each published URL in a private browser window. Check the selected theme, navigation to `#estimator` and `#faqs`, the payment-plan disclosure, and a demo estimate submission. Leave the Supabase variables unset for demo mode. For a live test, use the intended test project's public client variables at build time and verify lead and photo submission end to end. Live Google review cards also need a restricted browser key and the confirmed Place ID.

## Production readiness review

Both branches use the same locked dependencies and Node.js 24 setup. A clean `npm ci` and Vite build passed for the woodland snapshot. The multi-theme build also passed. Vercel runs `npm ci` and `npm run build`. Netlify uses the existing `.nvmrc` and `npm run build`. Both serve `dist`. Current section URLs use `/#section` anchors, which need no catch-all rewrite.

In desktop Chromium emulation, both production builds fit 320, 390, 768, 1024, and 1440 CSS-pixel viewports without document-level horizontal overflow. At 390px, all seven section links reached their target hashes on both builds. The unit-help disclosure, annual plan panel, and first FAQ opened on both. Eco-Clean switched to Fall, Summer, Rain, Winter, and Spring, and Emergency Rapid activated. Woodland switched between Light, Dark, and System. The browser reported no console errors in these checks.

- **Multi-theme navigation** scrolls horizontally at 320, 390, and 768px. Links beyond the visible strip require a sideways swipe or keyboard navigation. Woodland uses a Menu disclosure at these widths.
- **Estimator and payments** include tap-to-open unit help and sample plan pricing. Real checkout and an authenticated theme admin are outside the current implementation. The theme control is available to all visitors and the Rain scene is selected manually.
- **Testimonials** showed the fallback review and project gallery in demo mode. Google review cards sort by recency and offer a five-star filter after a successful Places fetch. Live review data and sorting/filtering remain unverified.
- **Insurance claims** rendered the guidance and carrier/dispatch links. Confirm business claims and payment terms with ATS before a public launch.
- **Release checks remaining** are an external hosted smoke test, physical-device Safari/Android testing, and end-to-end lead and photo submission with the target backend.
