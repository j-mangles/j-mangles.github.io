---
name: "design-taste"
description: "Use when the user wants a new look, a redesign, or a brand-new page or app screen and needs a design direction chosen, rather than polish of an existing design."
---

# Taste (art direction for new looks)

Taste is Leonxlnx's open-source art-direction skill (MIT, github.com/Leonxlnx/taste-skill), built from a study of 247 award-winning sites. It deals researched design directions instead of letting the model invent the category default. This skill loads the current version from GitHub and follows it.

## When to use it, and when not

- Use it for a new page or app screen, or when the user asks for a new look or says something looks generic or AI-made.
- Don't use it to polish existing work whose look should stay. Use the impeccable-design skill for that.
- The user picks the direction. Never choose one silently.

## Load it

1. Clone it once per session into a scratch folder:
   `git clone --depth 1 https://github.com/Leonxlnx/taste-skill.git <scratch>/taste`
2. Read `<scratch>/taste/skills/taste-skill/SKILL.md` and follow its run. `<skill>` in its commands means `<scratch>/taste/skills/taste-skill`. Run its scripts from the user's project root; its working files go in `.taste-skill/` there. The scripts need Node 22+ and Chrome or Edge (Playwright's bundled Chromium also works).
3. To deal directions: `node <skill>/scripts/draw.mjs --list sectors`, then `node <skill>/scripts/draw.mjs --sector <closest> --brief "<one line about the subject>"`. For app screens add `--app --kind <kind>` (see its `references/app-screens.md`).
4. Show the user the three directions in plain words, ideally as a quick visual sampler, and wait for their pick. Then deal that direction with `--direction <id>` and build it.
5. Before calling it done, run its lint and inspect steps and look at screenshots at three widths, as the skill describes.

If GitHub can't be reached, say so in one line, then still offer two or three clearly different directions drawn from the subject itself (its materials, places, objects) and let the user pick before building.