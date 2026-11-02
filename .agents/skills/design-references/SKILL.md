---
name: "design-references"
description: "Use when the user names a brand, app or site as design inspiration, wants a ready-made design system for decks or pages, or wants a 3D model or scene on a web page."
---

# Design references: brand systems, design-system kits and Three.js

## Brand inspiration (Awesome Design)

VoltAgent's awesome-design-md (MIT, github.com/VoltAgent/awesome-design-md) holds DESIGN.md files describing real brands' design systems (colours, type, spacing, components): Apple, Spotify, Nike, The Verge, Linear, Stripe, PlayStation, Nintendo and about 70 more.

- When the user names a brand or site as inspiration, fetch its file: `https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/<brand>/DESIGN.md` (list folders at `https://github.com/VoltAgent/awesome-design-md/tree/main/design-md`).
- Borrow ideas such as the type scale, how numbers are styled or how colour is rationed. Don't reproduce a company's logo, name or full identity in anything the user will share.

## Ready-made design systems (Open Design kit)

feimacode's Open Design Agent Kit (github.com/feimacode/open-design-agent-kit) has 198 systems in Claude Design's format under `claude-design-systems/<name>/project/` (`README.md`, `tokens.json`, `design-system.json`).

- The hand-written ones are the strongest: kami (print-like, parchment and ink blue, good for handouts and decks), riso (paper, deep blue and fluorescent pink, good for on-screen slides), tom-modern, mission-control, hud, trading-terminal, totality-festival, atelier-zero. Many generic names (editorial, clean, friendly, doodle) are thin auto-generated token sets.
- To use one in code, clone the repo, read that system's `README.md` and `tokens.json`, and map its colours, fonts and radius onto the project's CSS variables. Preview it on the user's real screens before committing.
- To use one in Claude Design, the user adds it under Add design system, then From GitHub, `feimacode/open-design-agent-kit`, folder `claude-design-systems/<name>`.

## 3D on a web page (Three.js)

Use Three.js only when 3D carries meaning: a model you can rotate or cut open (a cell, Earth's layers, a molecule, a building), not as decoration.

- Load a pinned version as an ES module from cdnjs or jsdelivr and keep it to the one page or tool that needs it.
- Ship a static fallback (an image or an SVG diagram) for when WebGL or the script fails.
- Pause the render loop when the canvas is off screen or the tab is hidden; respect `prefers-reduced-motion` (no auto-spin).
- Keep the scene light: simple geometry, few lights, `setPixelRatio(Math.min(devicePixelRatio, 2))`, and resize with the container.
- Controls must work by touch and by keyboard, with labels for the parts being taught.