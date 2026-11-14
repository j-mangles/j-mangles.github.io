# Hub homepage prompts (ELA, Math 7, Critical Thinking)

Paste one prompt per session, in this order: ELA, then Math 7, then Critical Thinking. Each one is self-contained. The fifth prompt (Science Matter materials) is separate work with a December deadline.

Mockups for all three homepages are in `docs/mockups/` in the repo, and on the claude.ai design canvas "Class Site Homepages: ELA, Math 7, Critical Thinking".

---

## Shared context (already inside each prompt below)

- Repo: `j-mangles/j-mangles.github.io` (GitHub Pages, the class site). Pull first: ChatGPT also edits this repo.
- Read and follow `AGENTS.md` in the repo root.
- Every hub (`ela/`, `math/`, `critical-thinking/`, `science/`) runs on `assets/hub.js`, with its content in `<hub>/data.js` as `window.HUB = {subject, units:[{id, n, name, status, when, intro, lessons:[{id, n, title, big, notes, terms, work, check, ...}]}]}`. Status is one of `done`, `now`, `next`, `soon` or `ongoing`.
- `assets/hub.js` already supports a subject homepage. If a hub sets `H.home = (el, {go, units}) => {...}`, that function renders `#main` when the URL has no hash. It sets `body[data-view="home"|"page"]` and `body[data-unit="<unitId>"]`.
- The reference build is Science: `science/zoom.js` (the homepage) and `science/science.css` (its look on the homepage and on unit and lesson pages). Copy that pattern, not that look.
- Lessons a student has checked are kept in `localStorage["hub-done-<subject>"]` as `"unitId/lessonId"` strings.
- Fonts are self-hosted in `assets/fonts/` and declared in `assets/fonts.css`. Pages may not load fonts from Google or any other outside site.

---

## 1. ELA: the bookshelf

```
Build a new homepage for the Grade 8 ELA hub on my class site: a bookshelf that fills up over the year.

Repo: j-mangles/j-mangles.github.io. Pull the latest first, because ChatGPT also edits this repo. Read and follow AGENTS.md.

How the site works: every hub runs on assets/hub.js with its content in <hub>/data.js (window.HUB.units, each with lessons). hub.js already supports a subject homepage: set H.home = (el, {go, units}) => {...} and it renders when the URL has no hash, and sets body[data-view] and body[data-unit]. Science already does this. Study science/zoom.js and science/science.css and copy the pattern, not the look.

The mockup is docs/mockups/ela-bookshelf.dc.html. Match its layout and feel: a dark bottle-green wall, a walnut shelf, book spines in bookcloth colours, a skills "drawer" below, and a panel for the book that's pulled out. Treat the mockup as the target, but every piece of content must come from ela/data.js, not from the mockup.

What to build:
1. ela/shelf.js sets H.home. Spines come from the lessons in the stories, film and novel units. A lesson whose title ends in "(short film)", or that sits in the film unit, is a film spine: thinner, dark, with a coloured top. Other lessons are book spines. Skill lessons like "Plot Structure" go in the drawer, not on the shelf. Make that a small list in shelf.js, not a guess from the title.
2. Spine width, height and colour come from a fixed palette and a hash of the lesson id, so the shelf looks the same on every visit. Titles run vertically.
3. The pulled-out spine is the most recent lesson in the unit whose status is "now". It's tilted out of the shelf, and its panel shows the big idea, key terms (from terms), and "Open the lesson" and "Check yourself" links that use go().
4. Units with status "soon" show dashed empty spaces with their name and month, so students see what's coming. Don't invent novel titles: the novel isn't chosen yet.
5. The drawer holds the Answering Well and Grammar units and the skill lessons, each as a card linking to its unit or lesson.
6. Show an author on a spine only if it's in the data. You may add an optional author field to the story lessons in ela/data.js, but only for authors you can verify: Langston Hughes, Ray Bradbury, Roald Dahl, W. W. Jacobs. Leave any you can't verify blank.
7. ela/ela.css gives the ELA unit and lesson pages the same look as the homepage: the same dark bar and fonts, light reading pages, square edges, no rounded cards or soft shadows. Load it after assets/site.css.
8. Fonts: the mockup uses Fraunces, Literata and Bricolage Grotesque. Self-host the ones you use as woff2 in assets/fonts/ and declare them in assets/fonts.css, downloading from the google/fonts GitHub repo. If you can't reach it, use the closest font already hosted and tell me.

Rules: real links and buttons that work with the keyboard; text contrast 4.5:1; it must work on a phone (the shelf scrolls sideways inside its box) and be readable on a projector. No outside requests. Don't change any lesson content. Don't touch the other hubs, except that a hub.js change must keep Science working.

When done: add tools/test_ela_shelf.cjs (every story and film lesson is on the shelf or in the drawer, the layout is the same on every load, and nothing outside is loaded), run every test in tools/, check the page in a browser at 1920, 1366 and 390 wide, send me screenshots, then commit and push. Tell me anything you couldn't do.
```

---

## 2. Math 7: the transit map

```
Build a new homepage for the Grade 7 Math hub on my class site: a transit map of the year's units.

Repo: j-mangles/j-mangles.github.io. Pull the latest first, because ChatGPT also edits this repo. Read and follow AGENTS.md.

How the site works: every hub runs on assets/hub.js with its content in <hub>/data.js. hub.js already supports a subject homepage: set H.home = (el, {go, units}) => {...} and it renders when the URL has no hash. Study science/zoom.js and science/science.css and copy the pattern, not the look. The unit order follows NAP 2.0, so don't reorder units.

The mockup is docs/mockups/math-transit-map.dc.html. Match its look: a clean signage feel, a white map on a light grey page, a navy bar, condensed headings, and four coloured lines.

What to build:
1. math/metro.js sets H.home. Draw the map as inline SVG. Keep the station layout as a small config in metro.js. Unit names, dates, status and lesson counts come from math/data.js.
2. Lines follow the Manitoba Grade 7 strands, as in the mockup:
   - Number (red): Fractions, Decimals and Percents; Divisibility; Fraction Operations; Integer Operations; Decimal Operations.
   - Statistics and Probability (purple): Fractions, Decimals and Percents; Probability; Area and Circle Graphs; Two-Event Probability.
   - Patterns and Relations (blue): Patterns and Equations; Linear Equations and the Coordinate Plane; Patterns Revisited.
   - Shape and Space (green): Linear Equations and the Coordinate Plane; Circles; Area and Circle Graphs; Geometric Constructions.
   Interchanges are where two lines share a station: Fractions, Decimals and Percents; Linear Equations and the Coordinate Plane; Area and Circle Graphs. Draw them as pill-shaped stations marked "change here".
3. Stations show their state from data.js. A done station is filled with its line colour. The now station gets "You are here" and a pulsing ring, turned off for prefers-reduced-motion. Next and soon stations are hollow. Every station is a real link that opens its unit with go().
4. Below the map: a "current station" panel (the unit's intro, three of its lessons and an "All N lessons" link) and a "Next stops" list of the next three units by order, with their dates.
5. math/math.css gives the Math unit and lesson pages the same look as the homepage: the navy bar, the line colour of the unit's strand as its accent (use body[data-unit]), square edges, no rounded cards or soft shadows. Load it after assets/site.css. Keep the existing math tools and fraction visuals working.
6. Fonts: the mockup uses Barlow and Barlow Condensed. Self-host them as woff2 in assets/fonts/, from the google/fonts GitHub repo, and declare them in assets/fonts.css. If you can't reach it, use the closest hosted font and tell me.

Rules: the map must stay readable on a phone (it scrolls sideways in its box at under 820 px) and on a projector; real links; contrast 4.5:1; no outside requests; don't change lesson content.

When done: add tools/test_math_metro.cjs (every unit in data.js is a station, every station is on at least one line, the interchanges are on two lines, and nothing outside is loaded), run every test in tools/, check in a browser at 1920, 1366 and 390 wide, send me screenshots, commit and push. Tell me anything you couldn't do.
```

---

## 3. Critical Thinking: the case wall

```
Build a new homepage for the Critical Thinking hub on my class site: a detective's case wall.

Repo: j-mangles/j-mangles.github.io. Pull the latest first, because ChatGPT also edits this repo. Read and follow AGENTS.md.

How the site works: every hub runs on assets/hub.js with its content in <hub>/data.js. hub.js already supports a subject homepage: set H.home = (el, {go, units}) => {...} and it renders when the URL has no hash. Study science/zoom.js and science/science.css and copy the pattern, not the look. Critical Thinking already has a dark theme in assets/site.css (mint #3CFFD0 and ultraviolet, League Gothic). Keep those colours so the hub still feels like itself.

The mockup is docs/mockups/critical-thinking-case-wall.dc.html. Match it: a dark board with a dot grid, typed index cards pinned at slight angles, coloured thread between related cases, label tapes for each group, and one big "open case" card in the middle.

What to build:
1. critical-thinking/casewall.js sets H.home. Cards come from the lessons in critical-thinking/data.js. Groups and card positions live in a small config in casewall.js:
   - Evidence (mint thread): The Missing Time Capsule Mystery, Seeing vs. Assuming, Two People, One Event, How Do You Know That?
   - Persuasion (purple thread): Ad Break, Spot the Fake, Build a Better Argument
   - Strategy (purple thread): Cooperate or Betray, The Art of the Deal, and the Game Theory unit as one stacked card
   - Hard calls: Impossible Choices
   - The open case in the centre: the newest lesson in the unit whose status is "now", which today is Case File: The Loonie Line
   Any lesson missing from the config still appears, in an "Unsorted" column, so new lessons ChatGPT adds never vanish.
2. Thread runs from each group's cards to the open case, and between cards in the same group. Draw it in one SVG behind the cards. Card tilt comes from a hash of the lesson id, so the wall is the same on every visit.
3. Stamps: a unit with status "done" gets a SOLVED stamp on its card. Lessons a student has checked get a small stamp too, read from localStorage["hub-done-ct"]. Say on the page that these stamps are only saved on this device.
4. Every card is a real link that opens its lesson with go().
5. critical-thinking/ct.css gives the unit and lesson pages a matching look: typed card style for notes and questions, League Gothic headings, square edges, no rounded cards. Load it after assets/site.css.
6. Fonts: League Gothic and Space Grotesk are already hosted. The typed cards use Courier Prime: self-host it as woff2 in assets/fonts/, from the google/fonts GitHub repo, and declare it in assets/fonts.css. If you can't reach it, use Space Mono and tell me.

Rules: on a phone, the wall turns into a simple stacked list grouped the same way, with no sideways scroll for the main content. Readable on a projector; contrast 4.5:1 on the cards and labels; real links; no outside requests; don't change lesson content.

When done: add tools/test_ct_casewall.cjs (every lesson appears exactly once, the open case is the now unit's latest lesson, the layout is the same on every load, and nothing outside is loaded), run every test in tools/, check in a browser at 1920, 1366 and 390 wide, send me screenshots, commit and push. Tell me anything you couldn't do.
```

---

## 4. After all three: one consistency pass

```
On my class site (j-mangles/j-mangles.github.io, pull first, follow AGENTS.md), every subject hub now has its own homepage: Social Studies (the atlas, social-studies/index.html), Science (science/zoom.js), ELA (ela/shelf.js), Math 7 (math/metro.js) and Critical Thinking (critical-thinking/casewall.js).

Do a consistency and quality pass, without redesigning anything:
1. Open every hub homepage, one unit page and one lesson page per hub, in a browser at 1920, 1366 and 390 wide, in light and dark mode. List anything broken, clipped, unreadable or inconsistent: the top bar, subject nav, footer, focus outlines, button sizes, contrast.
2. Check that the site's front page (index.html at the repo root) links to each hub and that its look fits the five hubs. If it still looks generic, propose two directions with a quick screenshot of each and wait for me to pick before building.
3. Fix only clear bugs. For anything that's a design choice, list it and ask.
4. Run every test in tools/, commit the fixes, push, and send me the screenshots and a short list of what you changed.
```

---

## 5. Science: finish the Matter unit materials (deadline: December)

```
I teach Grade 8 Science in Manitoba. The Matter, Density and Fluids unit starts in December. Lessons 1 to 8 are on my class site (j-mangles/j-mangles.github.io, science/data.js, unit id "matter"; pull first, follow AGENTS.md). My Google Drive folder "4. Particle Theory of Matter" has the student booklet and answer key (Sci8_MDF_StudentBooklet, Sci8_MDF_AnswerKey), the Lesson 2 deck and the Lesson 3 density lab with its key. Those only cover Lessons 1 to 3.

Build the missing materials for Lessons 4 to 8, matching the style, layout and voice of my Lesson 1 to 3 materials exactly:
1. Booklet pages for Lessons 4 to 8 in the same format as the existing booklet: guided notes with blanks, a worked example where it helps, and practice questions that go from basic to application. Answer key pages to match.
2. A deck for each of Lessons 4 to 8 in the same format as Sci8_MDF_L02_MassVolumeDensity, with speaker notes.
3. A unit test that only assesses what Lessons 1 to 8 teach: mostly foundational and application questions, a few deeper ones, no trick questions, with a key and a mark breakdown.
4. Curriculum gaps to close while you're in there, under Manitoba's current Grade 8 Science framework (SCI.8.C.2, SCI.8.E.1 to E.6): name pressure units (Pa and kPa) in Lesson 6, and state water's melting and boiling points (0 °C and 100 °C) and cover humidity and precipitation briefly in Lesson 8.
5. Use the site's lesson notes as the source of truth for content. Where my Drive materials and the site disagree, list the difference and ask; don't pick one.
6. Fact-check every number and claim against reliable sources. Use the densities already in my booklet table (water 1.00 g/mL, ice 0.92 g/cm³, and so on).

Save everything to Drive in the "4. Particle Theory of Matter" folder: decks in Decks, booklet and key pages in Booklets & Answer Keys. Give me the links and a short list of anything you need me to decide.
```
