# ATS v0.7 design QA

Review date November 10, 2026. Local preview at http://127.0.0.1:5187/ on `codex/ats-v0.7`.

## Reference and browser evidence

- The client supplied `20261110_220210.mp4` and `20261110_220144.heic`. The desktop hero and FAQ use decoded frames 03 and 13. The mobile About comparison uses the phone area of the supplied photograph.
- The desktop frame exports were 1450 × 670 pixels before perspective correction. The phone crop was corrected from a 1400 × 647 preview of the 4000 × 1848 HEIC. The desktop comparison crops were normalized to 840 × 530 and the phone crop to 355 × 665. Exact device scale and animation timing cannot be recovered from a filmed screen.
- In-app Chromium used viewport overrides of 1440 × 900 and 390 × 844 CSS pixels. Visible-page screenshots were 1425 × 891 and 375 × 812 pixels after browser UI and scrollbar insets. Both sides were fitted proportionally within the comparison sheets. The desktop hero and FAQ show their resting states, and the mobile About comparison shows the stacked text and image.
- [Desktop hero comparison](../ats-v07-hero-comparison.jpg), [mobile About comparison](../ats-v07-mobile-comparison.jpg), [desktop FAQ comparison](../ats-v07-faq-comparison.jpg), [photo-led service](../ats-v07-final-services-desktop.jpg), [gallery rail](../ats-v07-gallery-desktop.jpg), [mobile service dialog](../ats-v07-service-mobile.jpg).

## Findings and fixes

- [P2, fixed] The first mobile hero used a dark wash through the middle and left too much space under the controls. The revised crop moves the bright clearing into view and shortens the hero. The [initial mobile view](../ats-v07-mobile.jpg) and [final mobile view](../ats-v07-final-mobile.jpg) show the difference.
- [P2, fixed] The desktop About label was shifted left by the shared paragraph width. The final stylesheet centers that label, as shown in the [revised About capture](../ats-v07-final-about-desktop.jpg). The [initial About capture](../ats-v07-about-desktop.jpg) also shows the loaded center image.
- [P2, fixed] In the initial service capture, the image painted in front of the gradient. The corrected stacking order and stronger bottom fade keep the heading, summary, and link legible over the photograph. The final service capture shows the correction.
- Typography and copy were checked at desktop and mobile widths. DM Sans and Georgia italic reproduce the mixed hierarchy with ATS text. The FAQ uses the existing questions with clear, expandable rows. The hero keeps the office and estimate actions, and ATS uses the existing logo and real project photos.
- Layout, palette, and media were checked in the side-by-side captures. The dark green tones, left-aligned hero, illuminated woodland, centered section headings, stacked mobile About content, and scrolling gallery follow the reference. ATS's persistent navigation, dispatch strip, and estimate call to action account for the visible layout differences. The prototype uses a brief image entrance and scroll-linked service imagery with reduced-motion support. The reference's branded loader and sound control were left out of this theme.

## Functional checks

- `npm run build` passed. Chromium showed no errors during the checked flows.
- Verified mobile menu navigation and Escape, all ten service dialogs and estimator handoffs, dialog focus return, both phone link targets, 120 × 80 ft plot calculation, and an estimate submission using demo data.
- Verified the 57-photo gallery rail controls, photo modal, next photo and Escape, FAQ expansion, Florence coverage selection, and annual sample pricing.
- Checked for horizontal document overflow at 320, 390, 768, 1140, and 1440 CSS pixels.
- Client review, hosted preview, and live lead/photo submission remain open.

## Hero asset

Built-in ImageGen generated the woodland scene. The worktree contains an optimized [desktop image](src/assets/woodland-at-dusk.webp) and [mobile image](src/assets/woodland-at-dusk-small.webp).

Prompt: “Generate one landscape 3:2 photorealistic cinematic website hero background image for a tree care company. Ground-level shot inside a mature Northwest Alabama hardwood woodland at deep blue-green dusk, giant mossy old oak and lush ferns illuminated by a single soft pale green beam from behind on the RIGHT HALF and lower right. Low-key chiaroscuro, deep black-green canopy shadows, a few real floating golden spores in light, fine natural film grain, editorial photography, restrained color. The entire left 44% is deep charcoal-black woodland shadow with very low texture and ample negative space for website headline overlay. Make image continue dark at top and extreme left, brightest area at x=74%, y=66%. No people, no roads, no fire, no text, no letters, no device frame, no layout, no logo. Aim for the feeling of a quiet illuminated forest clearing on a near-black website.”

final result: passed
