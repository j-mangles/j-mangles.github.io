# Class Website — High-Impact Engineering and Curriculum Roadmap
_Last reviewed: 2026-11-11 · for human/agent planning; not a student lesson_

## Current baseline (checked against repository)
- Static GitHub Pages architecture; no authenticated accounts, backend or secure submission API.
- Five subject hubs, shared \`assets/hub.js\` and \`assets/site.css\`.
- Computer Class: 15 assignments, 141 question/response prompts, six types of embedded investigation model.
- Teacher Review Desk: reads student-exported JSON entirely within the browser; CSV export and feedback; explicit review-session JSON backup/restore with unsaved-work warning.
- Science has a large bank of lessons and interactive simulations; not all units are released to students.
- The repo includes dozens of focused tests and workflows, but a passing model test does not replace a visual/accessibility/content review.

## Non-negotiable constraints
1. **No student names, written responses, grades or identifiers committed to GitHub or placed in URL query strings.**
2. Use official, school-approved submission/authentication infrastructure if genuine cloud hand-in is needed. A public GitHub Pages site cannot provide private student submission merely by hiding a page or sharing a secret link.
3. Preserve all current drafts and student work across code releases; never change a draft schema without a tested migration.
4. Preserve unit release status until the teacher explicitly changes it.
5. Derive student-facing curricular content from the teacher's actual booklets/slides/handouts. Original scenarios can be useful as supplemental practice, but require teacher approval and clear labelling. Do not imply they are historical primary sources or real experimental data.
6. Keep Canadian spelling and distinguish conceptual simulations from scientific measurements.
7. Avoid cosmetic redesigns that conflict with established subject themes. Ensure strong keyboard and touch operation.

## Important curriculum alignment checkpoint
The current site includes **Solar Energy and Light** and **Earth Science: Earth's Interior and Tectonics**. The Manitoba Grade 8 Science public learning overview identifies four major areas: **Cells and Systems, Optics, Fluids, and Water Systems**. The existing booklets and timetable might intentionally differ, but **do not assume** the site covers all provincial outcomes until the booklets and site have been mapped outcome-by-outcome.
- Grade 8 science outcomes: https://www.edu.gov.mb.ca/k12/cur/science/grade8_outcomes.html
- Grade 8 science overview: https://www.edu.gov.mb.ca/k12/mychild/grade8_science.html
- Grade 8 Social Studies overview: https://www.edu.gov.mb.ca/k12/mychild/grade8_social.html
- Grade 7 mathematics: https://www.edu.gov.mb.ca/k12/mychild/grade7_math.html

### Phase A — Reliability and privacy (P0)
**A1: Teacher Review Desk backup/restore — implemented**
- Back up all imported student files, teacher ratings and comments to a local JSON session.
- Explicit restore with schema validation and replacement confirmation.
- Warn before leaving when the current session has changes not yet backed up.
- Never autosync student records to the public site.
- Acceptance: browser test imports and marks a student, exports a session, reloads, restores, and recovers the feedback exactly.

**A2: Revision/duplicate handling (P0 — next)**
- Never silently overwrite graded work when an updated file is imported.
- Show the uploaded timestamp, duplicate identity and current review status.
- Offer an explicit choice: keep prior revision, compare answers, or replace it.
- Acceptance: import same-name assignment twice and demonstrate that completed reviews survive.

**A3: Student draft resilience (P0)**
- Add an explicit last-saved timestamp, prominent backup reminder and a single-click portable JSON export.
- Validate JSON imports thoroughly, including bounds on every answer and lab trial.
- Add a migration/version test for any later assignment changes.
- Acceptance: student types, refreshes, exports, reopens on second device, and recovers every answer; no inadvertent overwrites.

**A4: Security and accessibility pass (P0)**
- All student input escaped; safe links; strict upload size/type limits; no uncontrolled inline script insertion from imported JSON.
- Verify screen-reader labels, contrast, keyboard-only completion and visible focus.
- Test Safari/iPad and Chrome, tablet landscape, Android at 390 px, and desktop.
- Acceptance: no critical accessibility violations, no student data in network requests, no horizontal overflow at common widths.

### Phase B — Curriculum coverage audit (P0/P1)
**B1: Source-of-truth inventory**
- Inventory all available teacher decks, handouts, textbook/booklet lessons and original unit plans from Drive/Project files.
- For each website lesson and Computer Class task record: the source material, unit, date/release status, grade, curricular outcomes and assessment evidence.
- Do **not** publish unpublished unit materials in a public site during this audit.
- Output: an internal coverage table: planned / drafted / tested / released / outcome aligned.

**B2: Outcome alignment**
- Map Science specifically to Manitoba Grade 8 outcomes (including actual Optics, Fluids and Water Systems).
- Map Grade 7 Mathematics to Number, Patterns and Relations, Shape and Space, Statistics and Probability.
- Map Grade 8 Social Studies to its five clusters, including transition to the modern world.
- For ELA, distinguish reading, writing, language, speaking/viewing and inquiry evidence.
- Assign outcome identifiers only when supported by the original official curriculum text and the actual task.

**B3: Accuracy and pedagogy audit**
- Identify ambiguous questions, answers that leak through order, oversimplified scientific explanations, invented evidence and models with unjustified precision.
- Verify historical dates, geography, vocabulary and reliable primary/secondary source framing.
- Check suggested independent task duration by actual word count and cognitive load.
- Acceptance: independent review flags no critical factual/curricular mistakes in released units.

### Phase C — Classroom operations (P1)
**C1: Teacher lesson launcher / Today page**
- Teacher chooses a day in the existing 6-day timetable and a subject/lesson/assignment from an indexed bank.
- Generate one simple QR code / classroom URL per task, with a warm-up, directions, lesson, interactive practice, and finishing work.
- Public lesson URLs contain no private student names or grades.
- Acceptance: teacher can organize the day's Grade 7 Math and Grade 8 classes from one page without editing code.

**C2: Assignment index and metadata**
- Move from repeated manually edited JavaScript packs to a validated content schema with subject, grade, unit, sources, time, questions, prerequisites, supports, extension and release status.
- Build student-facing directories automatically from source metadata.
- Show "Continue" on this device, and let students filter by subject, length, status and assignment type.
- Acceptance: adding one validated assignment automatically updates the library, launcher, content checks and QA.

**C3: Authorized hand-in process**
- Evaluate school-approved LMS, Google Workspace for Education or other division-authorized tools.
- Only integrate after permission, authentication and data-handling requirements are understood.
- Until then, keep secure local exports and submission instructions; do not call the existing Review Desk a cloud submission system.

### Phase D — Deep interaction and differentiated instruction (P1/P2)
**D1: Full investigation workbooks**
- Every substantial simulation supports a question, prediction/hypothesis, controlled variables, 3+ trials, data table, graph where relevant, conclusion and model limitations.
- Build one reusable investigation engine rather than bespoke forms that disagree about completion criteria.
- Include accurate units, accessible diagrams, and meaningful feedback that does not reveal all answers at once.

**D2: Differentiation**
- A support route with hints, sentence starters, examples, vocabulary and reduced visual clutter.
- A core route assessing the same essential outcome.
- An extension route involving a new scenario and higher-level explanation.
- Do not publicly label a student as modified or store sensitive accommodation data in the site.

**D3: Content depth**
- Science: microscope skills, membranes and systems; align further light/fluids/water resources to Manitoba outcomes.
- Social Studies: source-based investigations, artifact interpretation, mapping, chronology and perspectives.
- Math: worked/error-analysis examples, manipulatives, variable question banks and cumulative retrieval.
- ELA: original/approved texts, plot and theme annotation, paragraph builder and revision.
- Critical Thinking: fair-test builder, source reliability, multiple-hypothesis investigation and evidence revision.
- Each activity should generate an assessable artifact, not just a click-through spectacle.

### Phase E — Teacher assessment (P2)
**E1: Rubric engine**
- Common strength/challenge/next-step feedback fields, outcome-connected descriptors, reusable comments and teacher overrides.
- Differentiate auto-checked practice from teacher-graded writing.
- Export CSV with clear headers for manual review, not direct PowerSchool write access.

**E2: Review analytics**
- Group by assignment, show number submitted/reviewed, frequent wrong answers and question-level gaps.
- Drill into the original work; support reteaching decisions.
- No analytics involving student identities unless stored and handled within school-approved systems.

### Phase F — Engineering hardening (ongoing)
- Add a link checker: all assignment lesson URLs and cross-subject links resolve.
- Add an outcome/source validator: newly published assignments must identify grade/subject/source/release.
- Test all question types, correct options, duplicate IDs, ordering, numerical tolerance and lab-trial uniqueness.
- Add automated screenshot comparison at 390, ~820 (iPad landscape/portrait), 1200 widths; inspect real device behavior.
- Run a11y checks, reduced-motion checks, contrast checks and load budgets.
- Consolidate redundant CI workflows carefully without breaking independent subject verification.
- Keep no sensitive user data in repo fixtures. All demo names should be synthetic.

## Recommended execution sequence
1. **Preserve marks and drafts:** A1 done; A2, A3, A4 next.
2. **Audit and align:** B1–B3 before generating dozens more activities.
3. **Teacher daily utility:** C1 Today / Lesson Launcher.
4. **Build a reusable rich investigation engine:** C2, D1; apply to one activity in each subject.
5. **Then scale:** differentiated assignments, rubrics, analytics and comprehensive QA.

## What success looks like in a real 40-minute class
- Teacher opens Today, chooses the current lesson and copies one student URL.
- Students read clear instructions, run an appropriate model, record trials and answer written questions.
- Progress survives a refresh and can be restored from a student-owned backup.
- Students hand in via an approved process and the teacher gets a reliable copy.
- Teacher can return to grading later without losing comments; review is exportable.
- All released tasks can be traced to source handouts and relevant curriculum outcomes.
