# AGENTS.md

## Repo snapshot
- Astro 5 static site with TypeScript strict mode.
- Package manager: `pnpm` (see `package.json`).
- Content and routing live under `src/` with `astro:content` collections.
- Deployment uses GitHub Pages via `withastro/action`.

## CI/CD notes
- GitHub Actions workflow is in `.github/workflows/deploy.yaml`.
- Build and deploy are handled by `withastro/action@v4` and `deploy-pages@v4`.

## Project layout
- `src/pages/` routes, including locale-prefixed pages and OG endpoints.
- `src/components/` shared Astro components (PascalCase filenames).
- `src/layouts/` page shells (`BaseLayout`, `PostLayout`).
- `src/content/` Astro content collections and schema.
- `src/utils/` TypeScript utilities (i18n, OG generator).
- `src/styles/theme.css` global styles and CSS variables.
- `src/scripts/` browser-side scripts.
- `public/` static files copied to output.

## Code style (general)
- Match existing file formatting; avoid reformatting unrelated code.
- TypeScript uses semicolons and single quotes.
- Astro frontmatter uses TypeScript/JS syntax with single quotes.
- Indentation:
  - TypeScript/Astro frontmatter: 2 spaces.
  - CSS in `theme.css`: 4 spaces.
- Prefer `const` for bindings; use `let` only when reassigned.
- Avoid one-letter variable names unless consistent with surrounding code.
- Keep helpers small and pure when possible.

## Imports
- Prefer `import type` for type-only imports.
- Order imports in this sequence when editing:
  1. External packages.
  2. Node built-ins using the `node:` prefix.
  3. Local relative modules.
- Keep relative imports consistent with existing files (no aliasing).

## TypeScript
- Strict mode is enabled via `astro/tsconfigs/strict`.
- Use explicit types for public exports and props.
- Use `as const` for fixed literal lists (see `SUPPORTED_LANGS`).
- Prefer `interface` for component props, `type` for unions/aliases.
- Use type guards where appropriate (e.g., `isSupportedLang`).

## Astro component conventions
- Component filenames are PascalCase (e.g., `ThemeToggle.astro`).
- Props are defined in the frontmatter `interface Props`.
- Access props via `Astro.props` with destructuring.
- For conditional classes, use `class:list` rather than manual string concat.
- Keep markup readable; avoid inline comments unless requested.

## Content and i18n
- Supported locales live in `src/utils/i18n.ts` (`SUPPORTED_LANGS`).
- Profile content lives in `src/content/profile/<lang>.md`.
- Posts live in `src/content/posts/<lang>/` and use frontmatter:
  - `title`, `date`, `lang` (required)
  - `description`, `tags`, `hero`, `openGraph`, `draft` (optional)
- Use `translationKey` to link translated posts.

## CSS/style guidelines
- Global design tokens are CSS variables in `src/styles/theme.css`.
- Prefer updating variables over hard-coding new colors.
- Keep layout rules in `.wrap`, `.grid`, `.span-*` patterns.
- Respect light/dark theme variables (`[data-theme="dark"]`).
- Use consistent class naming (kebab-case) when adding new classes.

## Error handling and guardrails
- Favor early returns for empty state handling.
- Use optional chaining to avoid null/undefined checks where appropriate.
- For async utilities, let errors surface unless a fallback is required.
- Avoid swallowing errors without logging or surfacing to the caller.

## Assets
- Images live under `src/assets/pictures/`.
- Downloadable files live under `public/files/`.

## Open Graph image pipeline
- OG endpoints are in `src/pages/[lang]/og.png.ts`.
- Rendering logic lives in `src/utils/og.ts` (Satori + Resvg).
- Keep style constants centralized (e.g., `ACCENT_COLOR`, `WIDTH`).

## When editing
- Keep changes minimal and scoped to the task.
- Update `src/README.md` if you change core behavior or structure.
- Do not add new tooling or dependencies without user request (if you want to add something useful — propose and request user's approve).
