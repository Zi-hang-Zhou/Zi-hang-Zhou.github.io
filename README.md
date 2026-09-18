# Zihang Zhou — academic homepage

Public website: https://zi-hang-zhou.github.io/

Responsive portfolio adapted from Xiyuan Yang's [Who Am I](https://github.com/xiyuanyang-code/whoami), under its MIT license. The layout uses a full-height centered introduction, alternating image/text project rows, and numbered sections. Built with HTML, CSS, and a small dependency-free Node.js static generator. All main content is rendered into HTML; JavaScript adds theme switching, publication filtering, figure enlargement, and citation copying. No analytics, cookies, external font services, or account credentials.

## Publication approval — 2026-09-18

The owner explicitly approved pushing and publishing the paper-and-pine redesign on 2026-09-18, lifting the earlier local-review hold. The approved release includes the Who Am I-inspired layout and the warm-paper/pine-green palette. Local build and screenshot tests do not publish anything; deployment is performed separately through GitHub Pages.

## Palette — paper & pine

Retains the reference's centered full-height introduction, system typography, whitespace, and alternating project rows. The palette is deliberately distinct: warm paper (`#faf8f4`), pine green (`#2e6556`), and restrained brown numbering (`#856345`). Dark mode uses a forest-charcoal background (`#191e1b`) and lighter sage accents. The name and status badges are solid colors rather than animated gradients; background glows are static and faint. Paper figures are unchanged, including their original colors and white backgrounds. Favicon, share artwork, and browser theme color use the same palette.

## Maintain

- Paper titles, ordered authors, descriptions, status, figure sources and licenses: `data/publications.json`.
- Biography, experience, projects and page templates: `scripts/build.mjs`.
- Who Am I-style home layout: `scripts/portfolio.mjs`.
- Appearance: `styles.css`; interactions: `app.js` and `theme.js`.
- Downloadable CV source: `cv/Zihang-Zhou-CV.tex`. Recompile with pdfLaTeX after editing and commit the PDF too. The website workflow does not compile TeX.
- Rebuild pages with `npm run build`, validate local links/assets with `npm test`, preview with `npm start` (port 4173).
- `npm run test:browser` runs local desktop/mobile and theme checks and saves screenshots outside the website in `../whoami-previews/`; it starts its own temporary loopback server and never publishes.

## Publish

Repository Settings → Pages → Source: GitHub Actions. Pushing main builds and validates the pages, stages only public website assets, then deploys to Pages. No npm packages are needed. Generated HTML is also committed for easy inspection.

## Content & attribution

The owner requested an academic homepage using the supplied CV and images from the four linked papers. Bibliographic metadata and figure URLs were checked on 2026-09-18. Acceptance and submission statuses are **author-provided**, not independently confirmed by the arXiv metadata. Under review is never labeled accepted. Do not invent author order, impact metrics, project links, or Google Scholar IDs.

Figure-level sources, original author credit, licenses and modifications are shown on `/credits/`. Three papers use CC BY 4.0. The SetupX figure is used for this coauthor’s personal page at their request under retained author rights; the arXiv distribution license is not a general reuse license. Figures and the GitHub avatar retain their respective rights. Layout, CSS tokens and motion patterns are adapted from `xiyuanyang-code/whoami` at `3fda181e1ebd679e32a06ed0105715f96fddca30`; the full copyright and MIT notice is retained in `credits/whoami-LICENSE.txt`. His photographs, project images and personal text are not reused.

Personal phone number and the discontinued ToolAdapter experience are intentionally omitted. MSRA material is limited to the user-provided high-level CV description; no private data is included. An empty blog and unsupported social/profile links are intentionally not created.