# Claude visual polish brief: At the Assembly

## Goal

Polish the visual quality of the Ancient Greece field-walk game so it belongs to the **current Fable-revamped site**. Treat this as a visual and interaction-design pass on a working classroom feature, not a feature expansion. Keep the distinctive map exploration and evidence-led learning; bring its visual language into line with the new Social Studies gallery and Greece room.

The game is linked as a second activity from Grade 8 Ancient Greece Lesson 5. It already has keyboard and touch movement, accessible direct location selection, three evidence locations, a conclusion form and optional local text-report download.

## Branch and current-site context

The Fable redesign has landed on `main` since this draft began. Pull/inspect the latest `main` first and compare it with this branch before editing; this branch is behind and diverged. Preserve both the newer site work and this activity. Do not reset, overwrite, or merge without reviewing the diff.

The current Social Studies visual system is defined primarily by:

- `social-studies/rooms.css` — room tokens, including the Greece palette and typography.
- `social-studies/gallery.css` — current atlas/gallery interface language.
- `social-studies/lab.css` — current investigation-page patterns.
- `social-studies/greece-missing-voices.html` or another current Greece investigation — an example of using `data-room="greece"`, `rooms.css` and `lab.css`.
- `social-studies/index.html` — current museum-gallery atlas and Greece activity entry points.
- `social-studies/greece-lessons.js` — lesson content and activity wiring.
- `social-studies/giza-expedition.html` and `social-studies/giza-harbour.html` — established original exploration-game patterns.

The Greece room uses a black-figure pottery palette: charcoal glaze, warm clay and orange accents, with Cormorant Garamond / Newsreader / Space Grotesk and square-edged interfaces. The atlas and labs now use civilization-specific room materials and gallery framing. The prior brief described the older pale-paper, coral-accent atlas; that direction is obsolete. Follow the current files and their design tokens.

## Visual direction

Make the map feel like a place students can explore: clear depth, paths, distinct civic spaces, purposeful landmarks and a readable route through the Pnyx, Agora and Council House/Bouleuterion. Give each clue site a recognizable visual cue and make collected versus unvisited evidence easy to distinguish.

Make the field notebook feel like a historical investigation in the new gallery system. Use the Greece room tokens and current site typography and edge treatment where they fit. Avoid rounded generic dashboard cards and avoid simply recolouring the old design. The map should remain the activity's visual centre, with the journal supporting it.

Improve laptop, iPad and phone layouts. At narrow widths, keep the map legible, controls comfortable, and objective/evidence easy to find. Respect reduced-motion settings and visible focus. Use original code-drawn details; do not copy Zelda characters, maps, icons, names, music or other protected game assets.

## Content and behaviour to preserve

- Keep the central question: who had a voice in Athenian democracy?
- Keep the three learning stops and their historical meaning: Assembly participation at the Pnyx; civic and commercial life in the Agora; selection by lot for the Council and public offices.
- Keep the exclusion of women, enslaved people and resident foreigners visible in the historical interpretation.
- Clearly distinguish a stylized classroom reconstruction from historical evidence. Do not invent quotations or label invented game details as primary sources.
- Preserve the link from Greece Lesson 5 and its existing Mystery in the Well activity.
- Preserve keyboard movement, touch movement, accessible direct location selection, progress feedback, written conclusion and optional local report download.
- Keep student work in the current page session unless the student downloads the report. No accounts, network requests, server storage or new dependencies.
- Preserve current architecture, Fable's redesign and teacher-review workflow. Do not merge or deploy.

## Review sequence

1. Inspect the latest `main`, this branch, and the diff. Identify overlap and preserve the Fable redesign.
2. Open the current atlas and a Greece lab to understand the actual design system; inspect this page at desktop and narrow/mobile widths.
3. Propose a short list of high-impact visual changes before editing.
4. Make focused CSS/SVG/canvas improvements. Reuse the site's Greece room variables and typography rather than introducing a parallel theme.
5. Check keyboard, touch, direct location selection, clue states, conclusion and report download after styling.
6. Run Ancient Greece regression checks and the game-specific desktop/mobile browser check.
7. Report changed files, screenshots or visual evidence, checks run, and anything still needing teacher review.

## Acceptance criteria

- The page looks like a considered extension of the current Social Studies gallery and the Greece room, not the retired atlas theme or a generic AI game UI.
- The map is inviting and legible, with a clear route through three distinct places.
- Students can tell where to explore, how to move, what evidence they found, and when they can conclude.
- The notebook and controls remain usable on classroom laptops and iPads.
- Keyboard focus and touch targets are easy to see and operate.
- Historical caveats, accessibility and local-only student work remain intact.
