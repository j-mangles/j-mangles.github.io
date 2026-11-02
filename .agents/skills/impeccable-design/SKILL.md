---
name: "impeccable-design"
description: "Use when improving an existing web page, app screen, tool or lesson page: polish, audit, layout, type, colour, motion, accessibility, or making UI look less AI-generated."
---

# Impeccable (design refinement)

Impeccable is Paul Bakaus's open-source design skill (Apache-2.0, github.com/pbakaus/impeccable). This skill loads the full, current version from GitHub and follows it.

## Load it

1. Clone it once per session into a scratch folder (not the user's project):
   `git clone --depth 1 https://github.com/pbakaus/impeccable.git <scratch>/impeccable`
2. Read the copy for your tool and follow it: `<scratch>/impeccable/.agents/skills/impeccable/SKILL.md` for Codex and other agents, `<scratch>/impeccable/.claude/skills/impeccable/SKILL.md` for Claude. Its references live in that folder's `reference/` directory: load the one for the command you're running (`audit.md`, `polish.md`, `animate.md`, `layout.md`, `typeset.md`, `critique.md`, ...) and always read `reference/craft-floor.md` right before editing UI.
3. Run its context step from the user's project root: `<scratch>/impeccable/.agents/skills/impeccable/scripts/impeccable context` (or the `.claude/` copy).
4. After UI edits, run the detector on the changed files: `.../scripts/impeccable detect --json <files>`. If a URL scan fails because the browser won't start (for example running as root), scan the source files instead and say the rendered checks didn't run.
5. If the project's own fonts are intentional, add them to the ignores instead of fighting the detector: `.../scripts/impeccable ignores add-value overused-font <Font> --reason "<why>"`.

If GitHub can't be reached, say so in one line and work from the core rules below.

## Core rules (fallback, and the ones that matter most)

- **Refine, don't redesign.** For existing work, the current look (fonts, colours, radius, tokens) is the authority. Polish within it. Only redesign when asked, and then pick a direction with the user first (use the design-taste skill).
- **Pick the mode from the surface:** Read (lessons, docs) and Operate (tools, dashboards, scoring apps) want precision and restraint; Persuade (landing pages) and Experience (portfolios) can be bolder.
- **Cut the template tells:** no small uppercase label above every heading (put unit/lesson/count meta on a line under the heading instead), no coloured side stripes on cards, no boxes inside boxes, no identical icon-card grids, no gradient text, no decorative glass or glow.
- **Hierarchy follows the task:** the thing people came to do comes first, especially on a phone.
- **Spacing:** tight inside groups, generous between groups, more space above a heading than below it.
- **Type:** body text around 65 to 75 characters wide, clear steps in size and weight, balanced headings, nothing overflowing at phone width.
- **Colour from tokens** so light and dark both work. Body text contrast at least 4.5:1.
- **Theme the browser surfaces:** text selection, focus rings, caret, scrollbars, underline offset, tabular numerals in tables and scores.
- **States:** hover, focus, pressed, disabled, empty, error.
- **Motion explains a change** (feedback, continuity between views), stays roughly 150 to 400 ms with an ease-out, never makes people wait, and always has a `prefers-reduced-motion` path that keeps the meaning. View Transitions are good for page-to-page continuity.
- **Verify by looking:** screenshot at desktop and phone widths, fix everything one look shows, then look again.