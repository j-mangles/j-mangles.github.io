# Mr. Mangles' Class site: working rules for coding agents

Static GitHub Pages site for a Grade 7/8 class (Manitoba). Subjects: `social-studies/` (map atlas), `science/`, `ela/`, `math/`, `critical-thinking/`. Hubs share `assets/hub.js` and `assets/site.css`; each hub's lessons live in its `data.js`.

## Every change
1. `git pull origin main` before you start. Another agent also pushes here.
2. After your change, run every test: `for t in tools/*.cjs; do node "$t" || echo "FAIL $t"; done` (skip `tools/test_site_browser.cjs` unless a local server and Playwright are available). Fix failures before pushing.
3. Push to `main` only when tests pass.

## Coding discipline (from andrej-karpathy-skills, MIT)
- **Surgical changes:** touch only what the task needs. Don't reformat, rename or "improve" files you weren't asked to change. Mention unrelated problems instead of fixing them. Remove only what your own change made unused.
- **Simplicity first:** the least code that does the job. No extra features, single-use abstractions or speculative options.
- **Think first:** state your assumptions. If a reasonable one exists, take it and say so; stop and ask only when a wrong guess would be costly.
- **Verify:** define what "done" means (a passing test, a screenshot that looks right) and check it before pushing.

## Content
- Build lessons only from the teacher's Drive decks, booklets and handouts. Don't invent content.
- Student-facing text only: no teacher notes, setup instructions or planning language on the site.
- Self-check questions use different numbers from the practice sheets and skill checks, and the correct answer moves around between positions.
- Units not yet taught stay `status:"soon"` (Social Studies: leave `released` flags as they are).
- Canadian spelling. Plain, direct language for Grade 7/8.

## Which design skill
Skills aren't stored in this repo. Clone the one you need into a temp folder outside the repo when a task calls for it.
- **Impeccable** (default for any change to an existing page, tool or lesson): `git clone --depth 1 https://github.com/pbakaus/impeccable.git /tmp/impeccable`, then follow `/tmp/impeccable/.agents/skills/impeccable/SKILL.md` (Claude: `.claude/skills/impeccable/SKILL.md`). Detector: `/tmp/impeccable/.agents/skills/impeccable/scripts/impeccable detect --json <files>`, run from this repo so `.impeccable/config.json` applies.
- **Taste** (only when the teacher asks for a new look or a brand-new standalone page): `git clone --depth 1 https://github.com/Leonxlnx/taste-skill.git /tmp/taste`, follow `skills/taste-skill/SKILL.md`, deal three directions with its `draw.mjs` and let the teacher pick before building. Don't run it over existing hub pages unasked.
- **Awesome Design** (github.com/VoltAgent/awesome-design-md): read one brand's DESIGN.md only when the teacher names it as inspiration; borrow ideas, don't copy a brand's identity.
- **Three.js**: only for a genuine 3D teaching model (a cell you can rotate, Earth's layers). Pinned version from cdnjs, one lesson tool only, static fallback, pause rendering when off screen.

## Design rules (Impeccable)
- This is a **refinement** project. Each subject's look (fonts, colours, radius in `assets/site.css`) is the design authority. Polish within it; don't redesign or swap themes.
- Mode: **Read** for lesson pages, **Operate** for tools. Precision and restraint over spectacle.
- No labels/eyebrows above headings, no coloured side stripes on cards, no boxes inside boxes. Put meta (unit, lesson number, question count) on a line under the heading.
- Colours come from CSS variables (`--accent`, `--ink`, `--muted`, `--rule`, `--paper`, `--soft`), so diagrams work in light and dark mode.
- Motion explains a change (feedback, continuity), stays under ~400 ms, and every animation has a `prefers-reduced-motion` path.
- After UI edits run the Impeccable detector on the files you changed (see above). Intentional fonts are already ignored in `.impeccable/config.json`.

## Check it visually (Playwright CLI)
- Install: `npm install -g @playwright/cli@latest` (run `playwright-cli --help` for commands).
- Serve the site (`python3 -m http.server 8765`), then screenshot each page you touched at 1280×900 and 390×844 and look at them before you push. Fix overlaps, clipped text and sideways scrolling.
- The Social Studies map loads d3/topojson from cdnjs; if the network blocks it, check that page on the live site instead.
