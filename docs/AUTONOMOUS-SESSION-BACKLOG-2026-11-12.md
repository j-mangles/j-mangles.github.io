# Autonomous Classroom Website Development — November 12, 2026

**Branch:** `feat/science-investigations-2026-11-12`  
**Draft pull request:** #109  
**Policy:** review before merge. No direct production deployment.

## Continuation — November 12, 2026 (second development session)

### Completed: Science — Mass–Volume Investigation
- New `science/mass-volume-investigation.js`, appended to the **existing Density lesson** without replacing the prior Density and Buoyancy tools.
- Students gather real *virtual trials* at 20–120 cm³ for light wood, dense plastic, and aluminium; see every measurement on an independently plotted mass-versus-volume SVG.
- Lines are drawn from the student's collected observations. The calculated slope of the fitted line through zero estimates density in g/cm³; the display explicitly explains the mathematical and physical assumptions.
- Checks the scientific prediction that the steepest line corresponds to the densest sample; allows removing or repeating any trial, and records claim, evidence and reasoning.
- Exports both a local text investigation and a standalone, labelled SVG graph with embedded display styles.
- Mater unit remains `status: "soon"` in `science/data.js`: this content is prepared, not visible as a released unit.

### Completed: Science — Organ Inspector
- New `science/organ-inspector.js` enhances the already released Human Systems Explorer with **12 selected structures** across all seven body systems.
- Numbered, focusable SVG hotspot controls and accessible text-button alternatives reveal each structure's job and its related systems.
- Students answer cross-system connection questions, see immediate feedback, track correct responses during the session and download a short written report.
- Preserved original systemic body diagrams, pathways, digestion and oxygen-model interactions by wrapping the existing `cells/systems` lesson tool after its other registrations.
- Updated the existing `science-oxygen-systems` Computer Class activity to link directly to the Organ Inspector and require organ-level evidence in the CER paragraph; retained the same question IDs and existing draft storage.

### Completed: Science — Fair Test Planner
- Extended the existing released Science Skills Fair Test Studio with a student-authored investigation plan.
- Students can start from one of three existing classroom examples, then write a testable question, prediction, changed and measured variables, three distinct controlled variables, repeat count and reproducible procedure.
- The planner checks for missing fields, identical independent/dependent variables, reused controls and fewer than three or more than twenty repeats; it does not grade the prediction or procedure quality.
- Produces a local `.txt` plan only after the student chooses download. The page does not save or upload the plan.
- Added deterministic validation checks and phone/desktop Chrome coverage for template fill, complete export and no-upload feedback.

### Completed: Grade 7 Math — Worked-Solution Error Detective
- Created `math/error-detective.js` and added it to the existing released Unit 1 **Percent Skill Check and Unit Review** lesson (`fdp/l21`).
- Nine original worked examples target common misconceptions: percent-to-decimal place value, negative-number ordering, finding a percentage, fraction-to-percent conversion, discount and tax order, percents over 100, mixed-form comparison, finding the whole and mixed-number conversion.
- Students identify the **first incorrect step**, enter the corrected numerical value and explain the misconception in their own words. Steps and numerical corrections are machine-checked; reasoning is explicitly left to teacher review.
- Provides visual checks, per-case progress, feedback, revisitable problems and a local text review-record download after at least five solved cases.
- New JavaScript and real Chrome mobile/desktop workflow with screenshots; **passed** on the feature branch.
- No account, tracking, student name collection, persistent storage or syllabus release change.

### Completed: Local Science evidence hand-off
- Added a reusable Computer Class response for a student-selected `.txt` investigation report. Students can import the Virtual Microscope or Organ Inspector report, read it in the assignment, write a reflection, and include both in the text or teacher-copy export.
- Imports are limited to 64 KB, escaped before display, and kept in the existing browser-local draft. Students choose each report themselves; nothing is uploaded or submitted.
- Added the response to the microscope and Oxygen Mission assignments without changing existing assignment IDs, version, or answer keys.
- Added data/schema checks and real-Chrome tests for report import, refresh persistence, assignment export, teacher review and removal. Computer Class now has **194 response prompts**.
- All 63 non-browser project suites pass. Updated two stale regression expectations to match the existing seven-system explorer and 14 current Science lab links. Local real-Chrome execution is blocked because Chromium cannot start in this container (`socket() failed: Operation not permitted`); the browser suites run in the existing GitHub Actions workflows.

### Completed: Exercise & Circulation Data Lab
- Added an interactive graph analysis to the released Circulatory System lesson using the lesson's existing one-student rest–jog–recovery dataset directly from `science/data.js`.
- Students inspect all 15 minute-by-minute values, choose a phase, identify the peak and increase above the resting average, and calculate how long recovery takes to return within 5 bpm of rest.
- Explicitly separates the measured heart-rate data from oxygen and carbon-dioxide exchange, which the graph does not measure. Model assumptions and sample size are stated in student-facing text.
- Exports the dataset, calculations, student observations and explanation as a local text report.
- Linked the lab and Human Systems Explorer from Oxygen Mission. Added an evidence-import question so students can include the downloaded data report in their local Computer Class draft and teacher review copy.
- Added source-data unit checks and real-Chrome tests at phone and desktop widths for phase selection, calculation feedback, report export, assignment links and teacher review.

### New QA
- Automated JS model and actual Chrome tests for mass-volume calculations, density slope, 3-series plotted graph, exports and responsive page widths.
- Automated organ-model and actual Chrome tests for twelve structures, keyboard navigation, knowledge checking, progress, local export and page widths.
- Extended existing Science GitHub Actions workflow; screenshots retained as build artifacts.
- All new tests have produced successful Science CI runs. Later updates also trigger routine Computer Class and Mission Control regression checks.
- Added regression coverage for seven shared Science keys across Systems, Circulatory, Transport, Density, Displacement, Viscosity and Water tools. It checks script order, predecessor capture and invocation.
- Extended the real-Chrome Systems check to assert the Organ Inspector still mounts after the full wrapper chain.
- Fixed the site-wide browser test to wait for the selected ELA story prompt, preventing stale previous-lesson content from producing a false failure.

### Next highest-impact priorities
1. Classroom review of the exported-report hand-off on student devices; confirm the file picker and reflection prompt are clear.
2. Broaden number-line feedback only after teacher review confirms the hints match observed student thinking.
3. Extend source-based historical inquiry using dated and licensed artefacts from museums.
4. Build a reusable ELA plot/paragraph organizer with local revision history.
5. Classroom pilot and teacher content review before changing the `main` branch.

## Completed

### Science — Cells and Systems (currently released)
- Added a virtual microscope investigation directly to **Cell Theory and Cell Size**.
- Supports onion bulb epidermis, cheek epithelium and green alga schematic slides.
- Includes 4×, 10× and 40× objective lenses, a 10× ocular, approximate calibrated field diameters, focus and stage movement.
- Students predict how field of view changes, make estimates, record unique trial combinations and compute approximate cell widths.
- Claim–Evidence–Reasoning writing areas and a downloadable text report.
- Added the lab to the released **Interactive Science Labs** directory.
- Removed the schematic cell-count answer from the pre-measurement display. After recording, a count far from the illustration prompts a scale-bar and partial-cell recheck without rejecting the student's observation.
- No account, name, or automatic submission; no new student data transmitted.

### Science — Matter, Density and Fluids (prepared, unreleased)
- Added an idealized buoyancy investigation to the existing **Mass, Volume and Density** lesson, retaining the previous content.
- Compares oil, freshwater, saltwater and glycerin under explicitly stated approximations.
- Solid presets include wood, wax, ice, dense plastic, aluminium and steel, plus custom mass/volume.
- Predictions, observable float/sink/neutral results, approximate submerged fractions, evidence table and CER export.
- Maintained the Matter unit's `soon` status; this is built for future classroom release, not released now.

### Science — Human Systems Explorer (currently released)
- Added the **Muscular** and **Skeletal** systems to the existing interactive body explorer rather than creating a disconnected model.
- Each new system has its organ group, role, cross-system relationships and four-stage explanation of how movement is produced.
- Added selectable schematic muscle/bone overlays with keyboard access and two student comprehension questions.
- Existing nervous, circulatory, digestive, respiratory and integumentary views remain available.
- Added unit tests and real Chrome checks for tabs, pathways and keyboard selection.
- Added an exercise-and-circulation data lab using the existing one-student heart-rate series from the Science booklet; students inspect phases, calculate the rise and recovery interval, and download observations with the graph's measurement limits stated clearly.
- Fixed the Homeostasis tool's shared `cells/systems` registration so it composes with an earlier tool instead of overwriting it; added a collision regression case.
- Added an automated audit covering the registration order and wrapper composition for seven shared Science lesson keys.

### Math 7 — Fraction Strip Lab feedback
- Added problem-specific feedback for common denominator mistakes: multiplying denominators, choosing a non-least common multiple, and adding/subtracting denominators.
- Correct-but-equivalent final fractions are recognized by the diagnostic model; existing strips, manipulatives, and self-check rules remain intact.
- Added regression cases and refreshed the versioned script reference.
- Number Line Lab now gives targeted hints for a dropped negative sign, an omitted whole number, an improper fraction treated only as a remainder, and percent-to-decimal shifts; it still leaves the placement decision to the student.
- Added regression cases for each identified misconception and versioned its script reference.

### Computer Class — five new independent digital lessons
- Expanded the shared Computer Class library from **15 to 20 activities** and from **141 to 194 question/response prompts** without changing existing draft storage keys or schema versions.
- **Science:** Microscope Field Notes — prediction, magnification and field-width calculations, observations, limitations, and CER writing, linked to the released Cell Theory lesson.
- **Math 7:** Fraction Budget — fractions of a budget, discounts, a practice sales-tax calculation, checking the order of operations and explaining decisions.
- **Social Studies 8:** Mesopotamian Historical Evidence Desk — invented classroom source cards *clearly labeled as reconstructions*, real historical reasoning, GRAPES and cautious conclusions.
- **ELA 8:** The Lost Page — original school-appropriate short narrative with plot sequencing, conflict, characterization and evidence-based paragraph revision.
- **Critical Thinking / Computer Skills:** AI Fact-Check Lab — inspect a deliberately flawed fictional AI answer, check claims and citations, evaluate reputable sources and explain responsible use.
- Reused the existing self-checking, locally saved drafts, student file export, teacher-copy review and Student Board lesson catalog rather than introducing a second assignment engine.
- Updated Computer Class, Teacher Review Desk and Mission Control script loading and regression tests for all 20 assignments.

### Engineering and QA
- Kept Science tools within the established `HUB.lessonTools` registration architecture.
- Added independent JavaScript model tests and real Chromium student-workflow tests at 390 px and desktop widths.
- Added responsive stylesheets with keyboard focus states and scrolling for narrow table views.
- Added a GitHub Actions workflow testing microscope, buoyancy, and body-system investigation logic and real Chrome interactions at phone and desktop widths. Screenshots are retained as workflow artifacts.
- Expanded Computer Class and Mission Control regression tests for all 20 assignments, review compatibility, and published lesson links.
- All three workstream test suites passed on the feature branch in GitHub Actions (Science, Computer Class, Classroom Mission Control).
- Inspected actual course materials through the connected Google Drive. The teacher's Science course outline confirms that the Energy and Earth unit sequence is intentional. Do not reorganize or unlock units based solely on a generic curriculum summary.

## In progress

- Teacher visual review of new Mass–Volume SVG graph and Organ Inspector UI on physical iPad/smartboard.

- Visual review of responsive screenshots and full pull-request review before merging; automatic tests have passed.
- Student pilot of wording, estimated completion time and numerical challenge level (requires classroom use).
- Cross-checking the model's assumption labels against the upcoming unit materials.

## Next priorities

1. **Science registration.** Extend the shared-key audit whenever a new tool collides with an existing lesson registration.
2. **Microscope evidence improvements.** Use classroom review to tune the new non-grading estimate comparison and any optional support scaffolds; do not auto-grade open-ended scientific reasoning.
3. **Human-body systems.** Add a multi-variable, data-based circulation/gas-exchange investigation with explicit model limits.
4. **Math.** Use classroom observations to refine the new number-sense feedback before adding more diagnostic cases.
5. **Social Studies.** Work with genuine dated and licensed historical materials for artifact investigation.
6. **ELA.** Build a reusable plot/paragraph organizer with local revision history.
7. **Critical Thinking.** Extend the fair-test builder and add a citation provenance checker.
8. **Cross-site UX.** Audit mobile/iPad focus, keyboard operation, scroll behavior, link validity, colour contrast and heading hierarchy.

## Future improvements

- An outcome-by-outcome Science curriculum/source crosswalk, using the actual student booklets and teacher materials as the source of truth.
- A consistent reusable experiment worksheet template (question, prediction, variables, trials, graph, explanation, limitations).
- Support/core/extension task routes, without storing accommodation labels in public-facing systems.
- A school-approved authentication and hand-in integration, only after division approval and privacy review.
- A Classroom Mission Control assessment summary that avoids exposing student records through public URLs.

## Blocked or intentionally deferred

- **Cloud student submissions / grades:** requires explicit school-approved infrastructure and permissions. GitHub Pages alone is not a private data store.
- **Production release:** explicitly awaiting teacher review and approval. No merge to `main`.
- **Real specimen imagery:** current microscope is openly a schematic model; higher-fidelity biological micrographs would require permitted image sources, usage rights, calibration and label verification.
- **Classroom pilot:** student-device behaviour and instructional duration must be confirmed in a real class.

## Acceptance criteria

- Grade 8 student can change microscope objective, focus a slide, estimate a measurement, record three distinct trials and download a CER report.
- Student can compare a block in different liquids, see the density-based outcome and export three observed trials.
- Browser tests run at phone and desktop widths; no unhandled errors or horizontal page overflow.
- Existing Science modules remain functional and the Matter release gate remains unchanged.
- Muscle and skeleton can be selected using mouse/touch or keyboard, with correct four-step explanatory pathways.
- Computer Class displays 20 activities with 194 unique question IDs; the standard teacher-copy and browser-local draft workflows still pass.
- All changes stay in a draft pull request until approved.

## Ancient Greece and Rome source integration (Nov 12)

- Compared the 13-lesson Greece and Rome sequences against their Drive unit overviews and student-facing investigations.
- Built a student-facing Greece Lesson 8 investigation from “Follow the Money”: alliance chronology, the Plutarch debate with source limitations, a perspective letter, and a balanced Parthenon-sculptures argument.
- Built a student-facing Rome Lesson 9 “Pompeii Walkabout”: eight evidence stops, Pliny source analysis, quantitative engineering questions, and a reconstruction task that highlights Pompeii's limits as a sample of Roman life.
- Corrected the Rome lesson link so the Water Network Studio remains an extension instead of displacing the assigned Pompeii investigation.
- Added responsive, keyboard-visible activity styling and browser-local downloadable work; no student response is uploaded or stored.
- Kept Greece and Rome behind the current “soon” unit gates. No teacher guides, marking notes, answer keys or tests were copied into the student pages.
- Greece, Rome and integrated smoke tests pass locally. Real Chrome interactions and responsive checks passed in CI at 390 px and desktop width; all 36 PR workflow runs passed.\n\n## Science — Systems in Motion (source-based addition)\n\n- Added `science/systems-team-lab.js`, based on the Drive handout `Sci8_CS_SystemsWorkingTogether`. It reuses the handout’s four situations (catch the bus, eat lunch and walk, shiver in cold weather, and feel nervous before a test).\n- Students choose the systems they think are involved, explain one dependency and cite a detail from the situation before revealing a model pathway. Pathway cards show nervous/muscular/skeletal movement and respiratory/circulatory oxygen delivery with context-specific explanations.\n- Added the integumentary system as a clearly marked extension for skin temperature receptors. The diagram states where pathways are simplified and does not score written explanations.\n- Student writing stays on the page until the student downloads a text response; nothing is uploaded or submitted.\n- Loaded after the existing `cells/systems` registration chain so the Anatomy Atlas, Organ Inspector, Homeostasis and earlier systems activities remain available.\n- **Review still needed:** inspect the lesson at phone width, desktop width and on the classroom iPad/smartboard before merge. The checks described above refer to the earlier revision; later PR pushes automatically queued a fresh CI set.\n

## Drive-to-site coverage audit — November 12, 2026

- Added `docs/DRIVE-TO-SITE-COVERAGE-AUDIT-2026-11-12.md`, a read-only inventory comparison of the five Drive course trees against the current website catalogs and unit modules.
- Confirmed that Drive is not synchronized with the static website. The audit distinguishes catalog presence from actual lesson-file matching and does not invent a percentage-complete estimate.
- Corrected the Science status: Solar Energy & Light (14 lessons) and Earth Science (16 lessons) are already present in `science/data.js`, both marked `soon`. Their topic-level coverage has now been mapped to the Drive student booklets; per-slide and per-task comparisons remain. Social Studies First Humans, First Civilizations and Shaping the Modern World remain unit-level gaps. Math, ELA and Critical Thinking need lesson-by-lesson crosswalks.
- Teacher guides, tests, answer keys and private student material remain excluded from the public student site. The audit is first-pass and requires a full per-lesson crosswalk before claiming complete Drive transfer.
- No changes to `main` or production. The branch remains a draft for teacher review.


## Overnight continuation — November 13, 2026

- Expanded the Lesson 9 Systems in Motion lab with colour-coded SVG pathway maps, labelled system links, and a parallel-branch diagram for the test-stress response; kept the explanatory steps and local-only student response workflow. On narrow screens, the diagram gives way to the vertical text pathway.
- Extended the Drive audit with a 30-row topic crosswalk for all 14 Solar Energy/Light and 16 Earth Science lesson records against their student booklets. The site sequences are present and topic-aligned, but both units remain marked `soon`; teacher slide/task matching and release timing still need review.
- Expanded the teacher-facing video audit with short, lesson-matched NASA, UCAR, USGS and PBS selections for energy budget, EM spectrum, greenhouse effect, plate motion, glaciers, rivers and erosion. It retains the age/complexity and perspective cautions and leaves a blank where no strong match was found.
- No tests were started by hand in this continuation. GitHub Actions has automatically queued the existing PR workflows after commits; review their final results before merge.
- Draft PR only. No change to `main`, no release, and no production deployment.


## November 13, 2026 — Drive source reconciliation

- Inventoried the five Energy & Light and four Earth Science student slide decks and mapped each deck to the existing site lesson ranges.
- Mapped the identified Energy & Light student assignments/labs to lessons. Found one explicit coverage gap: the Light Sources textbook assignment teaches luminous/non-luminous objects and light-source mechanisms; the existing site sequence does not explicitly teach that classification. Keep it textbook-dependent pending a teacher decision.
- Confirmed the checked Earth Science booklet folder contains the student booklet and teacher answer key; no separate student assignment documents were found there. This is limited to that folder inventory.
- Updated the Drive audit with named source mappings and limits. Both units remain unreleased (“soon”); teacher keys, quizzes and tests remain off-site.
- PR #109 automatic workflows at head aea1b971520f00ac947d152118ee4acce49db516 completed successfully: 34/34 runs. This is the last validated head; documentation edits trigger fresh automatic checks.


## November 13, 2026 — video source-page recheck

- Rechecked official NASA, UCAR and PBS pages for four high-fit Solar Energy/Light and Earth Science candidates. Confirmed NASA energy-balance subtitles/prompts, the advanced 9–12+ label on NASA's EM-spectrum video, UCAR's middle/high-school teaching context, and PBS Rivers' 7:33 duration, captions and TV-G rating.
- Updated the teacher video audit with source-page metadata and retained the requirement to preview playback on the school network. The video shortlist remains teacher-facing; nothing was embedded into the student site.


## November 13, 2026 — ELA short-film audit

- Added a separately screened NFB shortlist for Grade 7/8 story/media lessons: The Sweater, The Apprentice and The Visit, each mapped to a specific literacy objective and accompanied by age/content/access caveats.
- The Sweater is the strongest full plot-structure fit; The Apprentice is the strongest wordless inference/fable fit; The Visit is a specialized film-craft choice. Playback and licensing conditions remain a teacher check before class.
- This extends the high-quality video audit without adding filler links or embedding video into the student site.


## November 13, 2026 — Mesopotamia Google Earth tour

- Corrected the Drive coverage audit: the Mesopotamia/First Civilizations catalog was already present as 10 released lesson records and aligns with the checked Drive student lesson materials and assignments. The earlier audit had incorrectly described it as a unit-level gap.
- Added `social-studies/mesopotamia-google-earth-tour.html`, adapting the separate Drive “Flying Over Mesopotamia” Google Earth task into six guided stops, structured evidence prompts, a blank map sketch pad with PNG download, and a written-response text download. Draft responses are held in the current browser tab; there is no upload.
- Linked the activity from the Mesopotamia unit. It relies on Google Earth for current imagery and ruler measurements; the atlas is labeled as a location fallback, not an equivalent substitute.
- Teacher review and classroom-network playback check remain. The First Humans and Shaping the Modern World units are still the largest Social Studies catalog gaps.


## Egypt source audit — Lessons 7–9 (November 13, 2026)

- Verified the primary and alternate student assignment files for Egypt Lessons 7–9 in Drive; similarly named L7–L9 files are distinct tasks, not duplicates.
- L7's site lab mirrors the nine-card “Test the Claim” task and its three claims. Added the separate “The Place of Truth” absence-register reading, a six-person evidence/social-pyramid table, and its source-reasoning and synthesis prompts. The strike sequence remains common to both worksheets; keep the two tasks distinct.
- L8 now covers both source assignments: trade routes and priorities, all six imports and their uses, Punt source types and Hatshepsut's myrrh trees, Uluburun and Amarna evidence, innovation argument, deben/barter, the Hyksos question, and six historical medical predictions. Medical answers remain for class discussion; the teacher's modern verdict key is not online.
- L9's lesson-linked activity previously focused on the separate “Rivals or Partners?” task (relationship phases, Strabo/Augustus and the “Kush just copied Egypt” claim). Added the missing comparison from “Two Sides of the Nile”: student-facing summaries of Senusret III's boundary inscription and Piye's Victory Stela, with the four source-analysis prompts from the worksheet. Responses stay local and clear with the existing reset control.
- No teacher guides, marking notes, modern medical verdicts or answer keys were added to student pages. Egypt's release state is unchanged.
