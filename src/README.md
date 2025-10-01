# Roman Domrachev

Personal profile built with Astro.

## Features
- **Profile layout** – `ProfilePage.astro` renders hero, toolbox, experience with breakdown toggles, writing list, and project cards sourced from `src/content/profile/*.md`.
- **Per-language routes** – URLs are prefixed with the active locale (`/en`, `/fr`) and resolved via `SUPPORTED_LANGS` in `src/utils/i18n.ts`; `LangSwitcher.astro` provides alternate links.
- **Blog collection with translations** – Markdown under `src/content/posts/<lang>/` builds index and article pages; `translationKey` links translated versions for the language switcher.
- **Dynamic OG image service** – `src/pages/[lang]/og.png.ts` hydrates profile data into a branded PNG via `generateOgImage` (Satori + Resvg) and ships per-locale `<meta>` tags with cache-busting hashes.
- **Theme system** – `BaseLayout.astro` injects `theme.css`, seeds random accent hues, and wires `ThemeToggle.astro` to persist light/dark selection with an animated ripple.
- **Print-friendly experience breakdowns** – `scripts/details-controls.ts` forces `<details>` open during printing; `ContactLinks.astro` adds a print-ready CV button.
- **Static site output** – `astro.config.mjs` sets `output: 'static'` for simple deployment to any static host.

## Directory Overview
- `src/pages/` – Route handlers (`/index`, `/[lang]/`, `/[lang]/posts`, dynamic post pages, OG endpoint, legacy redirects).
- `src/components/` – Shared components: primary nav, language toggle, theme toggle, profile modules.
- `src/layouts/` – Page shells (`BaseLayout`, `PostLayout`).
- `src/content/` – `astro:content` collections for profile entries and posts, plus schema in `config.ts`.
- `src/styles/theme.css` – Global grid, typography, responsive rules, and component styles.
- `src/utils/` – Locale helpers and OG image generator.
- `src/assets/` – Fonts and imagery used by the profile and OG pipeline.
- `public/` – Static files copied verbatim (e.g. `files/profile.pdf`).

## Editing the Profile
1. Update locale-specific markdown under `src/content/profile/`. Frontmatter drives all hero and section content:
   - `photo` references an image in `src/assets/pictures/`.
   - `toolbox`, `writing`, `projects`, and `experience` arrays power the respective sections.
   - Optional `breakdown` fields support lightweight markdown (paragraphs, lists) shown in expandable `<details>`.
2. The body of the markdown file becomes the “About” rich text rendered via `Content` slot.
3. If you add another locale, create a matching markdown file named after the language code and extend `SUPPORTED_LANGS` plus `profileI18n` strings.

## Managing Posts
1. Add markdown files under `src/content/posts/<lang>/`. Required frontmatter:
   - `title`, `date` (`YYYY-MM-DD`), and `lang` matching a supported locale.
   - Optional fields: `description`, `tags`, `hero` image object, `openGraph` overrides, `draft` flag.
2. Use `translationKey` to associate language variants of the same article so `LangSwitcher` can expose alternates; otherwise the switcher stays hidden.
3. Draft posts (`draft: true`) are excluded from build outputs but remain accessible in development.
4. Generated pages live at `/<lang>/posts/<slug>/`, with the index pulled from `src/pages/[lang]/posts/index.astro`.

## Styling and Components
- Global styling is centralised in `src/styles/theme.css`; adjust fonts, colours, layout variables, and component modules here.
- Navigation, language toggle, and theme toggle behaviour live in `PrimaryNav.astro`, `LangSwitcher.astro`, and `ThemeToggle.astro` respectively.
- Experience expand/collapse behavior can be tuned in `scripts/details-controls.ts` if you need custom print or animation logic.
- Replace assets in `src/assets/pictures/` and `public/files/` to update photos or downloadable resources; ensure `photo` paths in content frontmatter stay current.

## Dynamic Open Graph Images
- Profiles feed the OG endpoint located at `src/pages/[lang]/og.png.ts`. The generator pulls fonts and the hero photo from `src/assets`.
- OG image URLs include a `?v=<hash>` query derived from the generated PNG to force social refreshes.
- To change the visual template, edit `buildTemplate` inside `src/utils/og.ts`.
- Cache headers are set for one day (`s-maxage=86400`); adjust if your deployment platform requires different behaviour.

## Development Scripts
- Install dependencies with `pnpm install` (Astro 5.x required).
- `pnpm dev` – Start the local dev server.
- `pnpm build` – Produce the static site output in `dist/` (PDF generation disabled by default).
- `pnpm preview` – Serve the built output locally.
- `pnpm check` – Run Astro’s type and content schema checks.
- `pnpm pdf:build` – Build the site with `astro-pdf` enabled and sync `public/files/profile.pdf`.

## PDF Generation
- PDF output is generated only when `ASTRO_PDF=true` to avoid CI browser requirements.
- Run `pnpm pdf:build` before committing when profile content changes.
- Enable the hook by setting `git config core.hooksPath .githooks` (one-time setup).

## Using This Template
1. **Clone & install** – copy the project, run `pnpm install`, and start `pnpm dev`.
2. **Personalise content** – update `src/content/profile/<lang>.md`, add/remove posts, adjust assets, and verify both locales render.
3. **Tweak styling/components** – edit `src/styles/theme.css` or component files to match your branding; update `BaseLayout` for fonts/accent logic if desired.
4. **Add languages (optional)** – extend `SUPPORTED_LANGS`, provide new translations in `profileI18n`, create locale-specific profile/posts content, and update navigation copy.
5. **Ship** – run `pnpm build` and deploy the contents of `dist/` to any static hosting platform.
