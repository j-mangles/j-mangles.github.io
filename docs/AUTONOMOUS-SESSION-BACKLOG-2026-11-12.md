# Autonomous Classroom Website Development — November 12, 2026

**Branch:** `feat/science-investigations-2026-11-12`  
**Draft pull request:** #109  
**Policy:** review before merge. No direct production deployment.

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

### Engineering and QA
- Kept Science tools within the established `HUB.lessonTools` registration architecture.
- Added independent JavaScript model tests and real Chromium student-workflow tests at 390 px and desktop widths.
- Added responsive stylesheets with keyboard focus states and scrolling for narrow table views.
- Added a GitHub Actions workflow to test both investigations and retain preview screenshots.
- Inspected actual course materials through the connected Google Drive. The teacher's Science course outline confirms that the Energy and Earth unit sequence is intentional. Do not reorganize or unlock units based solely on a generic curriculum summary.

## In progress

- Final PR-wide CI verification and review of responsive screenshots.
- Student pilot of wording, estimated completion time and numerical challenge level (requires classroom use).
- Cross-checking the model's assumption labels against the upcoming unit materials.

## Next priorities

1. **Full Science interaction audit.** Verify every lesson-tool registration and ensure later scripts cannot overwrite earlier models. Add a test for duplicate/overwritten tool registrations where practical.
2. **Microscope evidence improvements.** Offer cell-size estimation feedback when counts are clearly implausible and optional support scaffolds; do not auto-grade open-ended scientific reasoning.
3. **Density graphing.** Add a mass-versus-volume graph with slope interpretation and multiple objects, not another decorative graph.
4. **Human-body systems.** Complete the linked oxygen/nutrient transport investigation and add organ-level annotation support to the seven-system explorer. Preserve the new muscle/bone selection and existing digestion/circulation interactions.
5. **Computer Class integration.** Incorporate microscope observations in a reusable assignment component without compromising browser-local backups and current exports.
6. **Math.** Expand interactive number sense and fraction manipulatives using the established Math 7 design, with multi-step reasoning prompts.
7. **Social Studies.** Add source-evaluation activities tied to existing Mesopotamia and Egypt materials, not generic fantasy maps.
8. **ELA.** Make a reusable plot and paragraph evidence organizer with meaningful revision history stored locally.
9. **Critical Thinking.** Build a fair-test and source verification assignment that can be completed and exported independently.
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
- All changes stay in a draft pull request until approved.
