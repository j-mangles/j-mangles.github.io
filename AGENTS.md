# Mr. Mangles' Class site: working rules for coding agents

Static GitHub Pages site for a Grade 7/8 class (Manitoba). Subjects: `social-studies/` (map atlas), `science/`, `ela/`, `math/`, `critical-thinking/`. Hubs share `assets/hub.js` and `assets/site.css`; each hub's lessons live in its `data.js`.

## Every change
1. `git pull origin main` before you start. Another agent also pushes here.
2. After your change, run every test: `for t in tools/*.cjs; do node "$t" || echo "FAIL $t"; done` (skip `tools/test_site_browser.cjs` unless a local server and Playwright are available). Fix failures before pushing.
3. Push to `main` only when tests pass.

## Content
- Build lessons only from the teacher's Drive decks, booklets and handouts. Don't invent content.
- Student-facing text only: no teacher notes, setup instructions or planning language on the site.
- Self-check questions use different numbers from the practice sheets and skill checks, and the correct answer moves around between positions.
- Units not yet taught stay `status:"soon"` (Social Studies: leave `released` flags as they are).
- Canadian spelling. Plain, direct language for Grade 7/8.

## Design (use the Impeccable skill)
- Skill folders: `.agents/skills/impeccable` (Codex: `$impeccable`) and `.claude/skills/impeccable` (Claude Code: `/impeccable`).
- This is a **refinement** project. Each subject's look (fonts, colours, radius in `assets/site.css`) is the design authority. Polish within it; don't redesign or swap themes.
- Mode: **Read** for lesson pages, **Operate** for tools. Precision and restraint over spectacle.
- No labels/eyebrows above headings, no coloured side stripes on cards, no boxes inside boxes. Put meta (unit, lesson number, question count) on a line under the heading.
- Colours come from CSS variables (`--accent`, `--ink`, `--muted`, `--rule`, `--paper`, `--soft`), so diagrams work in light and dark mode.
- Motion explains a change (feedback, continuity), stays under ~400 ms, and every animation has a `prefers-reduced-motion` path.
- After UI edits run the detector on the files you changed: `.agents/skills/impeccable/scripts/impeccable detect --json <files>`. Intentional fonts are already ignored in `.impeccable/config.json`.

## Check it visually (use the Playwright CLI skill)
- Skill folders: `.agents/skills/playwright-cli`, `.claude/skills/playwright-cli`. Needs `npm install -g @playwright/cli@latest`.
- Serve the site (`python3 -m http.server 8765`), then screenshot each page you touched at 1280×900 and 390×844 and look at them before you push. Fix overlaps, clipped text and sideways scrolling.
- The Social Studies map loads d3/topojson from cdnjs; if the network blocks it, check that page on the live site instead.
