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

## Which design skill
- **Impeccable** (`.agents/skills/impeccable`, `.claude/skills/impeccable`; Codex `$impeccable`, Claude Code `/impeccable`): the default. Use it for any change to an existing page, tool or lesson: polish, audit, layout, type, motion.
- **Taste** (`.agents/skills/taste-skill`, `.claude/skills/taste-skill`): only when the teacher asks for a new look or a brand-new standalone page (for example a redesign of the home page). Use its `draw.mjs` to deal three directions and let the teacher pick before building. Needs Node 22+. Don't run it over existing hub pages unasked; the subject themes stay.
- **Awesome Design** (github.com/VoltAgent/awesome-design-md): a reference library of brand DESIGN.md files. Read one only when the teacher names a brand or site as inspiration; borrow ideas, don't copy a brand's identity.
- **Three.js**: only for a genuine 3D teaching model (e.g. a cell you can rotate, Earth's layers). Load a pinned version from cdnjs, keep it to that one lesson tool, give it a static fallback, and pause rendering when it's off screen.

## Design rules (Impeccable)
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
