# Zihang Zhou — academic homepage

Public website: https://zi-hang-zhou.github.io/

Original responsive academic portfolio, built with HTML, CSS, and a small dependency-free Node.js static generator. All main content is rendered into HTML; JavaScript adds theme switching, publication filtering, figure enlargement, and citation copying. No analytics, cookies, external font services, or account credentials.

## Maintain

- Paper titles, ordered authors, descriptions, status, figure sources and licenses: `data/publications.json`.
- Biography, experience, projects and page templates: `scripts/build.mjs`.
- Appearance: `styles.css`; interactions: `app.js` and `theme.js`.
- Downloadable CV source: `cv/Zihang-Zhou-CV.tex`. Recompile with pdfLaTeX after editing and commit the PDF too. The website workflow does not compile TeX.
- Rebuild pages with `npm run build`, validate local links/assets with `npm test`, preview with `npm start` (port 4173).

## Publish

Repository Settings → Pages → Source: GitHub Actions. Pushing main builds and validates the pages, stages only public website assets, then deploys to Pages. No npm packages are needed. Generated HTML is also committed for easy inspection.

## Content & attribution

The owner requested an academic homepage using the supplied CV and images from the four linked papers. Bibliographic metadata and figure URLs were checked on 2026-09-18. Acceptance and submission statuses are **author-provided**, not independently confirmed by the arXiv metadata. Under review is never labeled accepted. Do not invent author order, impact metrics, project links, or Google Scholar IDs.

Figure-level sources, original author credit, licenses and modifications are shown on `/credits/`. Three papers use CC BY 4.0. The SetupX figure is used for this coauthor’s personal page at their request under retained author rights; the arXiv distribution license is not a general reuse license. Figures and the GitHub avatar retain their respective rights. No third-party website source code or photographs were copied. GitHub avatar is used until the owner supplies a preferred portrait.

Personal phone number and the discontinued ToolAdapter experience are intentionally omitted. MSRA material is limited to the user-provided high-level CV description; no private data is included. An empty blog and unsupported social/profile links are intentionally not created.