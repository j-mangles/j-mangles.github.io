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

### New QA
- Automated JS model and actual Chrome tests for mass-volume calculations, density slope, 3-series plotted graph, exports and responsive page widths.
- Automated organ-model and actual Chrome tests for twelve structures, keyboard navigation, knowledge checking, progress, local export and page widths.
- Extended existing Science GitHub Actions workflow; screenshots retained as build artifacts.
- All new tests have produced successful Science CI runs. Later updates also trigger routine Computer Class and Mission Control regression checks.

### Next highest-impact priorities
1. Student-device/teacher visual review of the new graphs, numbered organ hotspots and their instruction length.
2. Link student-exported investigations into an opt-in reusable Computer Class evidence importer; keep data local and require deliberate student action.
3. Create a multi-variable, data-based human circulation/gas-exchange lab with explicit model assumptions rather than anatomical decoration.
4. Build a complete grade 7 multi-step number-sense error-analysis activity using existing fraction/percent manipulatives rather than duplicating them.
5. Audit all Science lesson-tool wrapper registration ordering and implement a collision test covering future unit modules.
6. Extend source-based historical inquiry using dated and licensed artefacts from museums.
7. Classroom pilot and teacher content review before changing the `main` branch.

## Completed

### Science — Cells and Systems (currently released)
- Added a virtual microscope investigation directly to **Cell Theory and Cell Size**.
- Supports onion bulb epidermis, cheek epithelium and green alga schematic slides.
- Includes 4×, 10× and 40× objective lenses, a 10× ocular, approximate calibrated field diameters, focus and stage movement.
- Students predict how field of view changes, make estimates, record unique trial combinations and compute approximate cell widths.
- Claim–Evidence–Reasoning writing areas and a downloadable text report.
- Added the lab to the released **Interactive Science Labs** directory.
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

### Computer Class — five new independent digital lessons
- Expanded the shared Computer Class library from **15 to 20 activities** and from **141 to 191 question/response prompts** without changing existing draft storage keys or schema versions.
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

1. **Full Science interaction audit.** Verify every lesson-tool registration and ensure later scripts cannot overwrite earlier models. Add a test for duplicate/overwritten tool registrations where practical.
2. **Microscope evidence improvements.** Offer cell-size estimation feedback when counts are clearly implausible and optional support scaffolds; do not auto-grade open-ended scientific reasoning.
3. **Density graphing.** Add a mass-versus-volume graph with slope interpretation and multiple objects, not another decorative graph.
4. **Human-body systems.** Complete the linked oxygen/nutrient transport investigation and add organ-level annotation support to the seven-system explorer. Preserve the new muscle/bone selection and existing digestion/circulation interactions.
5. **Computer Class integration.** The microscope reasoning assignment is complete; next incorporate actual microscope observation tables into a reusable cross-page assignment component without changing existing draft formats.
6. **Math.** The fraction-budget assignment is complete; next expand interactive number sense and fraction manipulatives with multi-step reasoning prompts.
7. **Social Studies.** A Mesopotamian source-reasoning assignment is complete; next work with genuine dated and licensed historical materials for artifact investigation.
8. **ELA.** The original Lost Page narrative and revision assignment are complete; next build a reusable plot/paragraph organizer with local revision history.
9. **Critical Thinking.** The AI source-verification assignment is complete; next extend the fair-test builder and add a citation provenance checker.
10. **Cross-site UX.** Audit mobile/iPad focus, keyboard operation, scroll behavior, link validity, colour contrast and heading hierarchy.

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
- Computer Class displays 20 activities with 191 unique question IDs; the standard teacher-copy and browser-local draft workflows still pass.
- All changes stay in a draft pull request until approved.
