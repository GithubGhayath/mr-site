# Multi Ripping Machine (MRM) — Engineering Showcase

A bilingual (Arabic-default / English) engineering showcase for the **Multi Ripping Machine (MRM)** —
a reverse-engineered double-arbor multi-rip wood cutting machine enhanced with live monitoring,
production analytics, and predictive maintenance.

An engineering project · **Department of Mechanical Design Engineering · Damascus University**.

## Tech stack

- **Vite** + **React 19**
- **framer-motion** — scroll-driven animations & the industrial saw-blade
- **recharts** — live monitoring & analytics charts
- **lucide-react** — icons
- Custom lightweight i18n (Arabic/English) with full RTL/LTR support and a dark/light theme system

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  main.jsx                # entry — wraps Theme + Language providers
  App.jsx                 # composes all sections
  index.css               # design tokens, themes, RTL, primitives
  styles/sections.css     # section-specific styles + responsive rules
  context/                # LanguageContext (i18n) + ThemeContext (dark/light)
  i18n/translations.js    # all bilingual copy (ar default, en)
  components/             # Navbar, SawBlade, LiveChart, shared UI helpers
  sections/               # Hero, Overview, Machine, Components, Engineering,
                          # Software, Monitoring, Analytics, Maintenance,
                          # ProductionLine, Gallery, Documents, References,
                          # Team, Contact, Footer
  data/config.js          # external links + media file hooks
```

## Adding media (photos, video, thesis PDF, production-line layout)

Drop the file into `public/` and set the matching field in `src/data/config.js`:

| Field                  | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `THESIS_PDF`           | Enables the embedded PDF viewer (Documents) |
| `PROJECT_VIDEO`        | Adds the project video to the Gallery     |
| `PRODUCTION_LINE_IMG`  | Production-line layout image (set: `production-line.png`) |
| `APP_DEMO_VIDEO`       | Desktop-app demo video in the Software section (set: `app-demo.mp4`) |
| `GITHUB_REPO`          | The application repository link           |

The Software section also displays the five real application screenshots from
`public/screens/` (`app-home`, `app-monitoring`, `app-history`, `app-process`,
`app-maintenance`). Sections with unset media show a labelled placeholder until
the file is added.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to **GitHub Pages**. In the repository settings, set
**Settings → Pages → Build and deployment → Source = GitHub Actions**.

The production base path (`/mr-site/`) is configured in `vite.config.js`.
