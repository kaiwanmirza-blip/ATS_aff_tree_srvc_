# Affordable Tree Service INC - Project Roadmap & Tracker

Open [project-tracker.html](project-tracker.html) directly in a browser for the offline Kanban board, task details, and delivery evidence. Tracker edits are stored in that browser and do not update this Markdown file.

The November 10, 2026 workspace review is reflected below. See [PROJECT_STATUS.md](PROJECT_STATUS.md) for the file inventory and local preview instructions and [AGENTS.md](AGENTS.md) for tracker maintenance during project work.

## Phase 1: Free Hook Prototype & Branding (Current)
* [x] Collect branding, business, and before/after photo references in `img_ref/`
  * The folder includes Facebook branding and business screenshots, the original About Us group photo, and 57 gallery photos, including before/after images.
* [x] Initialize Git and configure the `ATS_aff_tree_srvc_` origin URL
* [x] Scaffold local directory structure (`src/components`, `src/themes`, `src/lib`, `supabase`)
* [x] Build the original React logo preview with Vite and Tailwind and verify that it compiles
  * The multi-theme app replaced the standalone preview. The former preview source files were removed from the working tree.
* [x] Save the project roadmap and create the offline Kanban tracker
* [x] Integrate the selected ATS-05 logo into the local preview
  * The original logo preview used the ATS-05 PNG. The current prototype header uses a compact JPEG derived from that image.
  * ATS-01.11: Both branches use a 32 × 32 ATS-05 PNG for the browser tab. Both production builds passed and their generated HTML references the packaged icon. Verify the tab icon on each hosted preview after deployment.
* [x] Prepare Vercel and Netlify configuration and document the preview deployment steps
  * The configurations build the current multi-theme prototype. A hosted preview URL has yet to be verified. See [DEPLOYMENT.md](DEPLOYMENT.md).
* [ ] Modernize 20th-century tree logo into a crisp 2026 vector/SVG concept
  * In progress. The earlier inline SVG remains in `ATSLogo.jsx`. The selected ATS-05 concept is currently a PNG. A matching standalone SVG and size and background checks are pending.
* [ ] Create the first Git commit and verify the baseline on GitHub
  * The local baseline on `feature/multi-theme-prototype` includes the current portal, gallery assets, and hosting configuration. Verification on GitHub is pending.
* [ ] Build the switchable Rugged Pro, Eco-Clean, and Emergency themes and verify the contact flow locally
  * In review. The portal now uses one continuous page with seven jump links. Rugged Pro has a thicker oak and scroll-driven squirrel. The About section uses the cropped original group photo and the company's service commitment. Chrome verified section jumps, service selection in the estimator, mobile width, and the root reveal. The Maps overlay is paused and the coverage diagram is marked “Enhancements coming soon.” Confirm commercial plan terms and carrier partnerships before publication.
  * The Services section includes ten detailed popups, 21 related article previews, and relevant project photos. Chrome verified mobile layout, focus return, source links, all ten estimator handoffs, and the emergency call action.
  * ATS-01.10 includes a separate v0.7 preview on `codex/ats-v0.7`. The woodland theme restyles the existing ATS content, service dialogs, estimator, gallery, and FAQ. The production build passed, and Chromium verified all ten estimator handoffs, demo submission, gallery and FAQ controls, and desktop and mobile layout. Client review, hosted preview, and live lead and photo submission are pending. See [design-qa.md](design-qa.md).
  * v0.7 now offers Light, Dark, and System. The woodland hero and estimate banner switch between matching sunlit and dusk scenes. Chromium verified preference persistence, live system changes, responsive artwork, and the estimate handoff. The branch verification confirmed that Services, Estimator, Reviews, FAQs, and Insurance Claims remain available in Woodland. A fresh local build passed. The preview is ready for client review.
* [ ] Deploy multi-theme React prototype (Rugged Pro, Eco-Clean, Emergency)
  * A fresh production build passed for the continuous-page portal. A hosted preview remains unverified.
* [ ] Present the prototype for feedback

## Phase 2: Client Conversion & Contract (Billable Setup)
* [ ] Client presentation & feedback session
* [ ] Finalize scope of work agreement & retainer/project fee
* [ ] Domain registration & DNS configuration (`affordableserviceal.com` or similar)

## Phase 3: Production Build & Backend Integration (Billable)
* [x] Prepare the local Supabase client and starter lead migration
  * The local files include an environment template, setup instructions, lead and status log tables, and private photo storage policies.
* [ ] Supabase database setup for leads, photo uploads, and scheduling logs
  * In progress. Applying the migration, verifying lead and photo access, and implementing appointment scheduling remain open.
* [ ] Interactive Plot Estimator & Photo Upload Tool integration
  * In progress. The app includes a feet/meters plot-area calculator, service selection, an optional photo, and demo submission. Live lead and photo submission and retry still need end-to-end verification with the intended Supabase project.
* [ ] Social media asset packs (Facebook optimization, Instagram Reels/Grid templates, Pinterest boards)
  * Facebook screenshots and the expanded 57-photo website gallery are available as reference material. Asset pack production and approval remain open.
* [ ] Local SEO (Google Business Profile optimization across Shoals area cities)
  * The local prototype has a Shoals service-area section, review links, and optional Google review cards. Live review cards and Google Business Profile changes remain unverified.

## Phase 4: Automation & Handoff
* [ ] AI/Agent intake workflow setup (answering emails/DMs & scheduling calendar)
* [ ] Final deployment on Vercel / custom host
* [ ] Client training & handover
