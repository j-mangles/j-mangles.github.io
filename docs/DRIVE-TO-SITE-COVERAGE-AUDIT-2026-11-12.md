# Drive-to-Site Coverage Audit — November 12, 2026

**Status:** first-pass inventory comparison, read-only in Google Drive. Compared Drive course/unit folders with the student-facing catalogs and assets on the review branch `feat/science-investigations-2026-11-12` (draft PR #109).

**Important limit:** this confirms course and unit coverage at catalog level and some named activities. It is not yet a file-by-file audit of every slide, handout, assignment, answer key and lesson page. Google Drive does not sync into the website automatically. The website contains selected student-facing lesson explanations and activities, not literal copies of every Drive file.

## Coverage summary

| Course | What Drive currently contains | What the website branch has | Assessment |
|---|---|---|---|
| **Grade 8 Science** | Course folders for Science Skills, Cells & Systems, Energy & Light, Earth Science and Particle Theory of Matter. Cells includes booklets/answer keys, decks, a unit test, labs and projects. | Student hub catalogs Science Skills and Cells & Systems; Cells & Systems is released. Matter/Density/Fluids is prepared and marked “soon.” Several Energy, Earth and Matter interactive modules exist as separate code files, but the current course catalog does not yet represent the full Drive sequence. | **Partial.** Energy & Light and Earth Science still need lesson-level catalog/content mapping. Keep the order aligned with the teacher's actual course outline, not a generic pacing sequence. |
| **Grade 7 Math** | Course information and units 1–13, with folders organized by lesson. Unit 1 contains lessons 1–22; Probability is Unit 2, with later units through Geometric Constructions. | The site has 13 unit entries. The current fractions/decimals/percents sequence has manipulatives and feedback tools; Probability is listed next. Some unit labels differ slightly from Drive labels, and the per-lesson source match has not been completed. | **Unit catalog present; lesson transfer unverified.** Do a lesson-ID crosswalk before claiming all 13 units are transferred. |
| **Grade 8 ELA** | Course folders for Answering Well, Grammar, Short Stories, Media & Film, Novel Study, Essays & Research and year-long Writing. The Short Stories folder contains multiple story/film folders and plot-structure materials. | The website has corresponding Answering Well, Grammar and Language, Short Stories, Media and Film, Novel Study, and Essays and Research units. It includes story analysis, the plot evidence board, the writing workshop and media-framing resources. | **Unit catalog present; individual source match unverified.** Verify every intended story, film and assignment against the Drive subfolders; do not assume the library titles alone are complete. |
| **Grade 8 Social Studies** | Seven Drive units: First Humans, First Civilizations, Egypt, Greece, Rome, Middle Ages, and Shaping the Modern World. The unit folders include lesson materials, student tasks and unit review/test items. | Full student-facing lesson arrays exist for Egypt (13), Greece (13), Rome (13) and the Middle Ages (13). The site also has standalone First Civilizations investigations, including Sargon and Hammurabi activities, plus Egypt source labs and many Greece/Rome investigations. There is not yet a matching 13-lesson student catalog for First Humans or First Civilizations, and no lesson array for Shaping the Modern World. | **Partial.** Greece and Rome sequences were compared to their unit overviews and student investigations, but that is not the same as transferring every Drive file. First Humans, the full Mesopotamia sequence and the Modern World unit remain clear coverage gaps. |
| **Critical Thinking / Computer Skills** | Lesson folders 1–11, a Game Theory folder and extra activities. | The site has a Think Lab and Game Theory catalog, an evidence inspector, payoff-matrix activities and digital Computer Class assignments. | **Unit catalog present; activity-by-activity match unverified.** The Computer Class activities supplement instruction and do not replace the eleven-lesson Drive sequence. |

## Confirmed source integration

- Greece and Rome have 13 lesson objects each on this branch. The source sequence was compared with the Drive unit overviews and student investigations. Six missing student activities were added to their matching lessons, and the Lesson 9 Pompeii task was restored as the assigned task while the water-network model remains an extension.
- Egypt and Middle Ages have student-facing lesson arrays and related interactive work on the site. Their full Drive lesson folders have not yet been reconciled one by one.
- The Drive handout **Systems Working Together** has now been used as the source for the new **Systems in Motion** activity in Science Lesson 9. It keeps the four class situations, asks students to choose systems and explain a dependency, then reveals a simplified pathway model. Student writing is not auto-scored or uploaded.

## Materials intentionally kept off the student site

Teacher guides, answer keys, quizzes/unit tests, student work, and private administrative files are not public website content. The site should use their curricular substance to guide instruction, but those documents should not be copied into student-facing pages.

## Work still required for a true transfer audit

1. Build a per-unit, per-lesson crosswalk with columns for Drive slide/deck, guided notes, student assignment, teacher guide/key, site lesson, and interactive activity.
2. Mark each row **matched**, **adapted**, **not built**, **not applicable**, or **teacher-only**. Do not count hidden or unlinked scripts as transferred lessons.
3. Start with the largest student-facing gaps: Science Energy & Light and Earth Science; Social Studies First Humans, First Civilizations and Shaping the Modern World; then verify all Mathematics and ELA lesson files against their catalogs.
4. Review the actual public-facing lesson text against source materials before release. Keep teacher keys, tests and any student information off the public site.
5. After the crosswalk, update each subject backlog and request a classroom review of the draft branch. PR #109 is still a draft; nothing here changes `main` or production.

## Evidence checked for this pass

- Google Drive filing rules and current course outline.
- Drive course/unit folder trees for all five subjects; lesson folder inventory was sampled for current and next units.
- Website unit catalogs and Social Studies lesson-array filenames on the draft branch.
- Drive Greece/Rome unit overview inventories, the Systems Working Together handout, and the existing PR backlog.

This audit deliberately avoids a percentage-complete estimate: folder and catalog counts are not reliable evidence that every teaching file has been transferred or reviewed.

## Unit-by-unit catalog map

This mapping is exact at the **unit label / student-catalog level**. It does not claim every lesson slide or worksheet has been mirrored. “Present” means an appropriate catalog or lesson sequence exists; a separate per-lesson comparison is still required unless stated otherwise.

### Science

| Drive unit | Site catalog | Status |
|---|---|---|
| 0. Science Skills | Science Skills | Present; lesson content and the Fair Test Studio are in the site. |
| 1. Cells & Systems | Cells and Systems | Present and released. Current PR adds the source-based Systems in Motion task to Lesson 9. |
| 2. Energy & Light | No matching lesson catalog yet | Gap. Some supporting lab scripts exist, but unlinked files do not count as transferred lessons. |
| 3. Earth Science | No matching lesson catalog yet | Gap. Some explorer/lab scripts exist, but a complete student lesson sequence is not in the current catalog. |
| 4. Particle Theory of Matter | Matter, Density and Fluids | Prepared, but the site keeps this unit behind its “soon” release state. |

### Math

| Drive unit | Website catalog unit | Status |
|---|---|---|
| 1. Converting Fractions/Decimals/Percentages | Fractions, Decimals and Percents | Present; student tools are concentrated here. Lesson-level match remains to be checked. |
| 2. Probability Foundations | Probability | Present and marked next. |
| 3. Divisibility | Divisibility | Present. |
| 4. Fraction Operations | Fraction Operations | Present. |
| 5. Integer Operations | Integer Operations | Present. |
| 6. Patterns and One-Step Equations | Patterns and Equations | Present; website label is broader. |
| 7. Linear Equations and Coordinate Plane | Linear Equations and the Coordinate Plane | Present. |
| 8. Circles | Circles | Present. |
| 9. Area and Circle Graphs | Area and Circle Graphs | Present. |
| 10. Decimal Operations | Decimal Operations | Present. |
| 11. Two-Event Probability | Two-Event Probability | Present. |
| 12. Patterns Revisited | Patterns Revisited | Present. |
| 13. Geometric Constructions | Geometric Constructions | Present. |

### ELA

| Drive unit/folder | Website catalog unit | Status |
|---|---|---|
| Answering Well | Answering Well | Present. |
| Grammar & Language | Grammar and Language | Present; individual handouts still need mapping. |
| Short Stories | Short Stories | Present; compare every planned story/film folder with the site story catalog. |
| Media & Film | Media and Film | Present; the Drive plot-diagram assignment and The Present folder should be checked against the site. |
| Novel Study | Novel Study | Catalog present; Drive's chosen novel and lesson materials still need content confirmation. |
| Essays & Research | Essays and Research | Catalog present; lesson-file match not verified. |
| Writing (year-long) | No separate unit; writing tools appear inside other sections | Partial / structural difference; decide whether to expose a year-long writing hub after reviewing the Drive contents. |

### Social Studies

| Drive unit | Website lesson catalog or activity | Status |
|---|---|---|
| Unit 1 — First Humans | No matching unit-wide lesson array identified | Gap. There is a student webquest and a handful of activities, but that is not the full Drive sequence. |
| Unit 2 — First Civilizations | Sargon and Hammurabi source activities; no matching unit-wide lesson array identified | Partial. The Drive sequence needs a lesson-by-lesson map. |
| Unit 3 — Ancient Egypt | Egypt student lesson array | 13 lesson objects present; match each against its Drive lesson folder before claiming complete. |
| Unit 4 — Ancient Greece | Greece student lesson array | 13 lesson objects present and sequence compared with the unit overview; student activity pages are linked from lessons. |
| Unit 5 — Ancient Rome | Rome student lesson array | 13 lesson objects present and sequence compared with the unit overview; student activity pages are linked from lessons. |
| Unit 6 — Middle Ages | Middle Ages student lesson array | 13 lesson objects cover Drive Lessons 1–13. Drive Lesson 14 is review/test material; keep teacher test/key content private. |
| Unit 7 — Shaping the Modern World | No matching unit-wide lesson array identified | Gap. The site does not yet carry this Drive unit's Renaissance, exploration and Industrial Revolution sequence. |

### Critical Thinking / Computer Skills

| Drive source | Website catalog | Status |
|---|---|---|
| Critical Thinking Lessons 1–11 | Think Lab | Unit catalog exists; lesson-level source match remains outstanding. |
| Game Theory and extra activities | Game Theory plus payoff-matrix and Computer Class activities | Partial supplements exist; verify which Drive lessons they serve and what remains classroom-only. |
