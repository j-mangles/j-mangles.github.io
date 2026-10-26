# Mr. Mangles' Class — shared development and publishing guide

This repository is the **student-facing website**, not the source folder for all teaching material. Existing Google Drive course materials and the teacher's judgement remain authoritative for what is ready to teach.

## Non-negotiable design rules

- Preserve the five established subject identities. Shared colour, font and layout variables are in `assets/site.css`; the historical atlas has its own established layout in `social-studies/index.html`.
- Keep Social Studies' map/atlas experience intact. Don't regenerate it using `tools/build_pages.py` or flatten it into a generic lesson hub.
- Reuse established buttons, spacing, colours and typography when adding interactive activities.
- Don't bulk rename, reorganize or replace Drive files; don't overwrite approved lesson decks or teacher guides.
- Follow Canadian English in all student-facing copy, with the teacher's preferred labels taking precedence.
- Never copy student names, student records, teacher answer keys, unreleased tests, or private documents into this public repository.

## Authoring and approval process

1. **Locate the teaching source** in the subject's Google Drive folder. Confirm the latest version, especially where `OLDER`, `V2`, adapted assessment, or answer-key variants exist.
2. **Check curriculum and accuracy** before transferring content. In 2026–27, renewed Manitoba K–10 Science is fully implemented. The older 8-1-xx Science outcomes are archived and should not be the sole audit reference. Grade 8 ELA renewal is in pilot/voluntary implementation.
3. **Prepare only the student-safe content**: lesson summary, key terms, original self-checks, media with licences, and accessible interactions. Treat your revised text as **proposed** until the teacher approves it.
4. **Create a topic-specific branch and draft PR** against `main`; do not commit directly to `main`. Keep each PR small and note which Drive materials were consulted.
5. **Run `node tools/check_content.cjs` and `node --check`**, then perform a manual visual and keyboard check for changed tools. GitHub Actions runs basic validation on PRs.
6. **Teacher review**: verify correctness, instructional sequencing, activities, language, visuals and accessibility. Only merge/publish after this review.

## Activities pilot

Optional `lesson.activity` objects use `title`, `context`, `prompts: [{label,hint,rows}]` and `checklist`. The shared lesson hub renders a writing area and **Copy**/**Download** controls inside the existing theme.

- Student responses are held in the current page's JavaScript memory during navigation within the tab, **not** sent to any server and **not** permanently saved.
- Students must download or copy before leaving/refreshing; simply answering on the site is **not assignment submission**.
- The tools contain no student accounts, gradebook, or submission storage. Actual collection/assessment requires a school-approved system.
- Free-response tasks aren't automatically marked correct; student/teacher judgement is required.

## Sensible future design directions

- **Social Studies: Living Atlas** — geographic timelines, source analysis, historical investigations; protect existing design.
- **Science: Investigation Lab** — manipulable models with prediction → observation → explanation → reflection; use renewed Manitoba science outcomes.
- **Math: Number Workshop** — representations, adjustable simulations, step-by-step strategies, random practice and misconceptions.
- **ELA: Writer's Studio** — evidence collection, paragraph drafting, revision and comparison of interpretations.
- **Critical Thinking: Case Files** — evidence logs, revisable claims, competing explanations, argument construction and game-theory decisions.

These are **directions for small approved features**, not instructions to redesign the site all at once.

## Source control note

Lessons currently live in JavaScript data files and do not synchronize automatically from Drive. A future comparison tool should *propose* updates and generate a reviewable diff rather than auto-publish unreviewed materials.
