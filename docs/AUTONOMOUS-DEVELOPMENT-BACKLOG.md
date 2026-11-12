# Autonomous Classroom Website — Development Backlog

**Scope:** existing Grade 7/8 classroom website, branch \`feature/science-interactive-expansion-20261111\`
**Release policy:** do not merge this branch into main or deploy production before teacher approval.
**Source context:** current Science pages plus the teacher's \`Sci8_CS_Cells_Student_Booklet\`, \`Sci8_CS_Systems_Student_Booklet_v2\`, and \`Sci8_MDF_StudentBooklet\` in connected Drive. Do not copy private classroom documents or personal data into this public repository.

## Completed in this branch

- **Cells · Microscope Investigation Studio**: illustrative onion, cheek-cell and red-blood-cell views, three objective lenses, 10× eyepiece, quantitative field of view, focus, XY stage movement, prediction, observations, numerical checks, CSV export, responsive layout. Registered within released \`cells/theory\` without replacing its original notes.
- **Human Systems Explorer**: muscular and skeletal systems added to the original respiratory, circulatory, digestive, nervous and integumentary categories. Tab and accessible SVG interactions, accurate organ/function summaries, revised nervous pathway, additional quiz questions, and a movement-pathway sequence challenge.
- **Matter · Beyond Freshwater**: composable extension to the existing density diagrams, four idealized liquid densities, mass/volume and fluid controls, float/sink predictions, submerged fraction visualization, separate trial records and CSV export.
- **Science Lab Library**: microscopy listed as available in current Cells lessons; new buoyancy comparison remains clearly “Coming soon” with the Matter unit.
- **Quality automation**: model tests for microscope optics and liquid buoyancy, additional human-systems unit assertions, Chrome browser checks at mobile and desktop widths, Science workflow expanded.

## In progress / acceptance checks

- Finish GitHub Actions Science and human-systems browser/unit checks for the final commit on this branch.
- Review mobile and desktop screenshot artifacts for the microscope, human-systems and buoyancy modules.
- Confirm all existing Science lessons, Lab Library filters and future-unit gating remain functional.
- Verify accessibility and keyboard operation, particularly microscope SVG controls and the system pathway sequence.

## Next priorities — highest value first

1. **Cell size and magnification assignment:** turn the microscope data into an optional complete Computer Class investigation, with estimation prompts, teacher-friendly evidence export and clear instructions, without collecting student names unnecessarily.
2. **Human systems depth:** add a digestive–circulatory nutrient transport case, nerve–muscle reflex case, and deeper named-organ hotspots (not just a silhouette); avoid implying schematics are anatomical cross-sections.
3. **Matter graphing:** use recorded experimental density data to build and interpret a graph, with guided variable selection, units, prediction and explanation.
4. **Curriculum crosswalk:** compare existing Science lesson IDs with the teacher's student booklets and Manitoba Grade 8 outcomes. Distinguish textbook-specific energy/earth units from the official science cluster names.
5. **Course accessibility:** check screen-reader names, contrast, text scale, reduced-motion and keyboard-only tasks, then repair failures.
6. **Site-wide QA:** improve flaky asynchronous browser assertions, broken-link validation, and repeated layout regressions.
7. **Computer skills:** original digital citizenship, research-source evaluation, AI literacy, spreadsheet thinking and introductory coding lessons, each with an assessable digital output.

## Future improvements

- Guided science investigations that unify predictions, variables, evidence tables, graphing and conclusions into a reusable cross-subject system.
- Differentiated hints, vocabulary support, core tasks and extensions; keep accommodations private.
- More accurate three-dimensional/atlas-style organ diagrams if suitable licensed or original assets become available.
- Math virtual manipulatives, ELA interactive writing organizers, and Social Studies evidence- and timeline-based activities.
- A teacher-facing release dashboard, accessible only after proper authentication and school approval.

## Blocked / requires teacher or school approval

- Automatic student submissions, class rosters and grades: GitHub Pages is public/static; needs a division-approved authenticated service and a privacy review.
- Production deployment: teacher has explicitly requested **branch + pull request only**.
- Publishing unreleased Matter, Solar Energy/Light or Earth resources: the teacher must decide when they become available.
- A real anatomical 3D model and photo-real microscopic specimens: require validated illustrations/assets and scientific review. Current models are openly labelled as illustrative.

## Development workflow

1. Audit existing work and teacher-provided source before building.
2. Implement small complete, curriculum-aligned features; avoid duplicating established tools.
3. Add unit invariants and Chrome tests for core interactions and future-unit gating.
4. Commit to the feature branch only.
5. Keep a draft pull request open for review; do not merge automatically.
6. Update this backlog and PR description with tested results and remaining limitations.
