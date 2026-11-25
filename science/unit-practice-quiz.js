/* Shared formative quiz for unit reviews and standalone review games. */
(() => {
  'use strict';

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  const styles = `
    .uq{margin-top:24px;padding:22px;background:var(--paper,#fff);border:1px solid var(--rule,#dedfe7);border-radius:var(--radius,14px)}
    .uq-kicker{font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--accent-ink,var(--accent,#5968e8))}
    .uq h3{margin:6px 0 4px;font-size:21px;line-height:1.3;color:var(--ink,#202126)}
    .uq p{margin:5px 0;color:var(--muted,#6b6e79)}
    .uq-start,.uq-next,.uq-retry{min-height:42px;margin-top:12px;padding:0 18px;border:0;border-radius:var(--btn-radius,980px);background:var(--btn,var(--accent,#5968e8));color:var(--on-btn,#fff);font:inherit;font-weight:700;cursor:pointer}
    .uq-start:focus-visible,.uq-next:focus-visible,.uq-retry:focus-visible,.uq-choice:focus-visible{outline:3px solid #aab0ff;outline-offset:2px}
    .uq-head{display:flex;justify-content:space-between;gap:12px;color:var(--muted,#6b6e79);font-size:13px}
    .uq-track{height:7px;margin:9px 0 18px;background:var(--soft,#eef0fb);border-radius:8px;overflow:hidden}
    .uq-track span{display:block;height:100%;background:var(--accent,#5968e8);transition:width .2s}
    .uq-lesson{margin-bottom:6px!important;color:var(--accent-ink,var(--accent,#5968e8))!important;font-size:13px;font-weight:700}
    .uq-question{margin:0 0 14px!important;color:var(--ink,#202126)!important;font-size:20px;font-weight:650;line-height:1.35}
    .uq-options{display:grid;gap:8px}
    .uq-choice{display:flex;gap:10px;align-items:flex-start;width:100%;padding:12px 14px;border:1px solid var(--rule,#dedfe7);border-radius:11px;background:var(--paper,#fff);color:var(--ink,#202126);text-align:left;font:inherit;cursor:pointer}
    .uq-choice:hover{border-color:var(--accent,#5968e8)}.uq-choice[aria-pressed=true]{border-color:var(--accent,#5968e8);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent,#5968e8) 16%,transparent)}
    .uq-letter{display:grid;place-items:center;flex:none;width:24px;height:24px;border-radius:50%;background:var(--soft,#eef0fb);color:var(--accent-ink,var(--accent,#5968e8));font-size:12px;font-weight:700}
    .uq-feedback{margin-top:12px!important;padding:12px 14px;border-radius:10px;background:var(--soft,#eef0fb)}
    .uq-feedback[data-correct=true]{background:#e8f5ee}.uq-feedback[data-correct=false]{background:#fbecee}.uq-feedback strong{display:block;margin-bottom:3px;color:var(--ink,#202126)}
    .uq-result{padding:12px 0 2px}.uq-score{font-size:28px;font-weight:750;color:var(--accent-ink,var(--accent,#5968e8))}
    .uq-missed{margin-top:12px;display:grid;gap:8px}.uq-missed article{padding:12px;border:1px solid var(--rule,#dedfe7);border-radius:10px}.uq-missed h4{margin:0 0 5px;font-size:15px}.uq-missed p{margin:3px 0;font-size:14px}
    .uq-choice[data-verdict]{opacity:1}
    .uq-choice[data-verdict=correct]{border-color:var(--good,#1e8a5a)}
    .uq-choice[data-verdict=selected]{border-color:var(--bad,#c2373a)}
    .uq .uq-feedback{color:var(--ink,#202126);background:var(--soft,#eef0fb);border-inline-start:4px solid var(--good,#1e8a5a)}
    .uq .uq-feedback[data-correct=false]{border-color:var(--bad,#c2373a)}
    .uq .uq-feedback span{display:block;margin-top:.25rem}
    .uq .uq-result h4,.uq .uq-question{margin-block:.4rem;font-family:inherit;letter-spacing:normal;text-transform:none}
    .uq .uq-actions{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .85rem;margin:1rem 0}
    .uq .uq-actions button{margin:0}.uq .uq-actions .uq-secondary{background:transparent;color:var(--ink);border:1px solid var(--muted)}
    .uq .uq-review-lesson{display:inline-block;margin:.35rem 0;color:var(--accent-ink,var(--ink));text-underline-offset:.18em}
    .uq-sr{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
    @media(max-width:520px){.uq{padding:17px}.uq-head{font-size:12px}}
  `;

  function collect(checks, lesson, out) {
    if (!checks || typeof checks !== 'object') return;
    if (Array.isArray(checks)) {
      checks.forEach(item => collect(item, lesson, out));
      return;
    }
    if (typeof checks.q === 'string' && Array.isArray(checks.a) &&
        Number.isInteger(checks.c) && checks.c >= 0 && checks.c < checks.a.length) {
      out.push({
        q: checks.q,
        a: checks.a,
        c: checks.c,
        why: typeof checks.why === 'string' ? checks.why : 'Review the lesson notes and try again.',
        lesson: lesson.title || 'Lesson check',
        lessonId: lesson.id
      });
      return;
    }
    Object.values(checks).forEach(value => collect(value, lesson, out));
  }

  function shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function mount(target, unit, onLesson) {
    if (!target || !unit) return;
    const bank = [];
    (unit.lessons || []).forEach(lesson => collect(lesson.check, lesson, bank));
    target.innerHTML = `<style>${styles}</style><section class="uq" aria-label="${esc(unit.name)} practice quiz">
      <div class="uq-kicker">Unit ${esc(unit.n)} · Practice</div>
      <h3>Check what you know</h3>
      <p>${esc(unit.quizIntro || 'Try a short quiz using questions from this unit’s lesson checks. You’ll see an explanation after each answer.')}</p>
      ${bank.length ? `<button class="uq-start" type="button">Start practice</button><div class="uq-stage" hidden></div>` : '<p>Practice questions for this unit are coming soon.</p>'}
    </section>`;
    if (!bank.length) return;

    const start = target.querySelector('.uq-start');
    const stage = target.querySelector('.uq-stage');
    let questions = [], index = 0, selected = -1, missed = [];
    let firstAttempt = null;

    function renderQuestion() {
      const item = questions[index];
      selected = -1;
      stage.innerHTML = `<div class="uq-head"><span>${firstAttempt ? 'Correction round' : 'Unit ' + esc(unit.n) + ' · ' + esc(unit.name)}</span><span>Question ${index + 1} of ${questions.length}</span></div>
        <div class="uq-track" aria-hidden="true"><span style="width:${Math.round(index / questions.length * 100)}%"></span></div>
        <p class="uq-lesson">${esc(item.lesson)}</p><h4 class="uq-question" tabindex="-1"><span class="uq-sr">Question ${index + 1} of ${questions.length}. </span>${esc(item.q)}</h4>
        <div class="uq-options">${item.a.map((answer, i) => `<button class="uq-choice" type="button" aria-pressed="false" data-answer="${i}"><span class="uq-letter">${String.fromCharCode(65 + i)}</span><span>${esc(answer)}</span></button>`).join('')}</div>
        <p class="uq-feedback" tabindex="-1" hidden></p><button class="uq-next" type="button" disabled>Check answer</button>`;
      stage.querySelector('.uq-question').focus();
      stage.querySelectorAll('.uq-choice').forEach(button => button.addEventListener('click', () => {
        if (!stage.querySelector('.uq-feedback').hidden) return;
        selected = Number(button.dataset.answer);
        stage.querySelectorAll('.uq-choice').forEach((choice, i) => choice.setAttribute('aria-pressed', String(i === selected)));
        stage.querySelector('.uq-next').disabled = false;
      }));
      stage.querySelector('.uq-next').addEventListener('click', () => {
        const feedback = stage.querySelector('.uq-feedback');
        if (feedback.hidden) {
          if (selected < 0) return;
          const correct = selected === item.c;
          if (!correct) missed.push({ item, selected });
          stage.querySelectorAll('.uq-choice').forEach((button, i) => {
            button.disabled = true;
            if (i === item.c) button.dataset.verdict = 'correct';
            else if (i === selected) button.dataset.verdict = 'selected';
          });
          feedback.hidden = false;
          feedback.dataset.correct = String(correct);
          feedback.innerHTML = correct
            ? `<strong>Correct.</strong>${esc(item.why)}`
            : `<strong>Correct answer: ${esc(item.a[item.c])}</strong><span>You chose: ${esc(item.a[selected])}</span><span>${esc(item.why)}</span>`;
          feedback.focus();
          stage.querySelector('.uq-next').textContent = index === questions.length - 1 ? 'See results' : 'Next question';
          return;
        }
        index++;
        if (index < questions.length) renderQuestion();
        else renderResults();
      });
    }

    function lessonLink(item) {
      if (!item.lessonId) return '';
      const title = esc(item.lesson);
      if (unit.lessonPrefix) {
        const href = esc(unit.lessonPrefix + encodeURIComponent(item.lessonId));
        return `<a class="uq-review-lesson" href="${href}" target="_blank" rel="noopener">Review ${title} (new tab)</a>`;
      }
      return typeof onLesson === 'function'
        ? `<button class="uq-review-lesson" type="button" data-review-lesson="${esc(item.lessonId)}">Review ${title}</button>` : '';
    }

    function renderResults() {
      const isCorrection = firstAttempt !== null;
      if (!isCorrection) firstAttempt = { total: questions.length, missed: missed.length };
      const remaining = missed.length;
      const summary = isCorrection
        ? `${firstAttempt.missed - remaining} of ${firstAttempt.missed} originally missed ${firstAttempt.missed === 1 ? 'question' : 'questions'} corrected.`
        : remaining ? 'Read the explanations below, then retry the questions you missed.' : 'You answered every question correctly.';
      const missedHTML = missed.map(({ item, selected: answer }) => `<article><h4>${esc(item.q)}</h4>
        <p>Your answer: ${esc(item.a[answer])}</p><p><strong>Correct answer: ${esc(item.a[item.c])}</strong></p>
        <p>${esc(item.why)}</p>${lessonLink(item)}</article>`).join('');
      const retryLabel = remaining === 1 ? 'Retry 1 missed question' : `Retry ${remaining} missed questions`;
      stage.innerHTML = `<div class="uq-result"><h4 tabindex="-1">First attempt <span class="uq-score">${firstAttempt.total - firstAttempt.missed} / ${firstAttempt.total}</span></h4>
        <p class="uq-summary">${summary}</p><div class="uq-actions">
        ${remaining ? `<button class="uq-retry" data-retry-missed type="button">${retryLabel}</button>` : ''}
        <button class="uq-retry${remaining ? ' uq-secondary' : ''}" data-restart-quiz type="button">${esc(unit.restartLabel || 'Start a full round')}</button></div>
        ${remaining ? `<div class="uq-missed">${missedHTML}</div>` : ''}</div>`;
      stage.querySelector('.uq-result h4').focus();
      stage.querySelector('[data-restart-quiz]').addEventListener('click', begin);
      if (remaining) stage.querySelector('[data-retry-missed]').addEventListener('click', () => run(missed.map(entry => entry.item)));
      stage.querySelectorAll('[data-review-lesson]').forEach(button => button.addEventListener('click', () => onLesson(button.dataset.reviewLesson)));
    }

    function run(items) {
      questions = items;
      index = 0;
      missed = [];
      start.hidden = true;
      stage.hidden = false;
      renderQuestion();
    }

    function begin() {
      firstAttempt = null;
      run(shuffle(bank).slice(0, 10));
    }
    start.addEventListener('click', begin);
  }

  window.UnitPracticeQuiz = { mount };
})();
