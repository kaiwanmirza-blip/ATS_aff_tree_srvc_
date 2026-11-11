# Affordable Tree Service INC - Project Roadmap & Tracker

Open [project-tracker.html](project-tracker.html) directly in a browser for the offline Kanban board, task details, and delivery evidence. Tracker edits are stored in that browser and do not update this Markdown file.

Updated November 11, 2026. See [PROJECT_STATUS.md](PROJECT_STATUS.md) for the file inventory and local preview instructions and [AGENTS.md](AGENTS.md) for tracker maintenance during project work.

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
* [x] Prepare Vercel and Netlify configuration and document the preview deployment steps (`ATS-01.12`)
  * Both branches use Node 24 and the same Vite, Vercel, and Netlify configuration. Both local production builds passed. [DEPLOYMENT.md](DEPLOYMENT.md) records Replit GitHub and ZIP import steps.
* [ ] Modernize 20th-century tree logo into a crisp 2026 vector/SVG concept
  * In progress. The earlier inline SVG remains in `ATSLogo.jsx`. The selected ATS-05 concept is currently a PNG. A matching standalone SVG and size and background checks are pending.
* [x] Commit both versions and verify the branch tips on GitHub (`ATS-01.9`)
  * Both branches are on GitHub. The favicon commits are [multi-theme at 1df798a](https://github.com/kaiwanmirza-blip/ATS_aff_tree_srvc_/commit/1df798af5ab3c12cf896356d2d66e36981a99b66) and [Woodland at 2510802](https://github.com/kaiwanmirza-blip/ATS_aff_tree_srvc_/commit/25108028360651b9a174126037c0430c9cece23c).
* [ ] Build the switchable Rugged Pro, Eco-Clean, and Emergency themes and verify the contact flow locally
  * In review. The portal now uses one continuous page with seven jump links. Rugged Pro has a thicker oak and scroll-driven squirrel. The About section uses the cropped original group photo and the company's service commitment. Chrome verified section jumps, service selection in the estimator, mobile width, and the root reveal. The Maps overlay is paused and the coverage diagram is marked “Enhancements coming soon.” Confirm commercial plan terms and carrier partnerships before publication.
  * The Services section includes ten detailed popups, 21 related article previews, and relevant project photos. Chrome verified mobile layout, focus return, source links, all ten estimator handoffs, and the emergency call action.
  * The woodland branch's `design-qa.md` records Chromium checks for desktop and mobile layouts, ten service-to-estimator handoffs, demo submission, gallery and FAQ controls, and Light, Dark, and System appearance behavior. Client review and live lead and photo submission remain open.
  * `ATS-01.10` readiness review checked both production builds at 320, 390, 768, 1024, and 1440 CSS pixels. All section links, unit help, annual plan, and an FAQ worked at 390px. Multi-theme navigation requires sideways scrolling on phones and at 768px. Live reviews, physical-device checks, and any required admin or checkout functionality remain open.
  * The final branch check confirmed the three-theme switcher, plot estimator, expandable one-time, monthly, and annual sample plans with a 15% annual discount, insurance guidance, FAQs, and the Shoals radius diagram. The fallback testimonial matches the review published by ATS. Live Google review cards still require the configured Places credentials and an end-to-end check.
* [x] Publish the multi-theme and Woodland v0.7 prototypes (`ATS-01.4`)
  * The project owner confirmed on November 11, 2026 that both prototypes were published. The published URLs, deployed revisions, and hosted smoke checks still need to be recorded.
* [ ] Present the prototypes for feedback (`ATS-01.5`)
  * In progress. The project owner confirmed on November 11, 2026 that the first client communication was sent. The client response and feedback session remain open.

## Phase 2: Client Conversion & Contract (Billable Setup)
* [ ] Client presentation & feedback session
  * Initial outreach is recorded in ATS-01.5. Client feedback and decisions are pending.
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
