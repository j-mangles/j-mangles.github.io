# Claude visual polish brief: At the Assembly

## Goal

Polish the visual quality of the new Ancient Greece field-walk game in this branch. Treat this as a visual and interaction-design pass on a working classroom feature, not a feature expansion.

The game is linked as a second activity from Grade 8 Ancient Greece Lesson 5. It already has keyboard movement, touch controls, direct accessible location buttons, three evidence locations, a conclusion form and local text-report download.

## Files to inspect

- `social-studies/athens-assembly-walk.html` — new game page and its current self-contained CSS/JavaScript.
- `social-studies/index.html` — established Societies of the Past Atlas, theme tokens, map interface and lesson activity links.
- `social-studies/greece-lessons.js` — source lesson sequence and activity data.
- `social-studies/giza-expedition.html` and `social-studies/giza-harbour.html` — existing original exploration-game patterns.

The Social Studies atlas is a bespoke historical atlas with pale paper, map blue, terracotta/coral accents, restrained borders, editorial serif headings and a compact sans-serif interface. The Egypt games show how the site uses original environments, field notebooks, character/object inspection and evidence-led progress. The Athens game should feel like it belongs to this same world while keeping its own clear identity.

## Visual direction

Make the map feel like a place students can explore: stronger depth, readable paths, distinct civic spaces, purposeful landmarks and a clear visual hierarchy for the Pnyx, Agora and Council House/Bouleuterion. Give each clue site a recognizable visual cue and make collected versus unvisited clues easy to distinguish.

Refine the field notebook so it feels like part of a historical investigation. Keep the current objective and evidence visible without turning the page into a stack of generic cards. Improve the experience at phone and tablet widths, where the map, notebook and movement controls need to remain legible and comfortable.

Use original visual assets or code-drawn details. Do not copy Zelda characters, maps, icons, names, music or other protected game assets. Avoid decorative flourishes that compete with the map or evidence.

## Content and behaviour to preserve

- Keep the central question: who had a voice in Athenian democracy?
- Keep the three learning stops and their historical meaning: Assembly participation at the Pnyx; civic and commercial life in the Agora; selection by lot for the Council and public offices.
- Keep the exclusion of women, enslaved people and resident foreigners visible in the historical interpretation.
- Keep the clear distinction between a stylized classroom reconstruction and historical evidence. Do not invent quotations or label invented game details as primary sources.
- Preserve the link from Greece Lesson 5 and its existing Mystery in the Well activity.
- Preserve keyboard movement, touch movement, accessible direct location selection, progress feedback, the written conclusion, and optional local report download.
- Keep all student work in the current page session unless the student downloads the report. No accounts, network requests, server storage or new dependencies.
- Preserve the site’s current architecture and teacher-review workflow. Do not merge or deploy.

## Review sequence

1. Read the current branch and inspect the page at desktop and narrow/mobile widths.
2. Propose a short list of high-impact visual changes before editing.
3. Make focused CSS/SVG/canvas improvements while preserving the learning logic and lesson routing.
4. Check keyboard, touch, direct location selection, clue states, conclusion and report download after styling.
5. Run the Ancient Greece regression checks and a game-specific browser check if available.
6. Report changed files, screenshots or visual evidence, checks run, and anything still needing teacher review.

## Acceptance criteria

- The map is visually legible and inviting, with a clear route through three distinct places.
- Students can tell where to explore, how to move, what evidence they found, and when they can conclude.
- The notebook and controls remain usable on classroom laptops and iPads.
- Keyboard focus and touch targets are easy to see and operate.
- Historical caveats, accessibility and local-only student work remain intact.
- The final page looks like a considered extension of the Societies of the Past Atlas, not a generic AI-generated game UI.
