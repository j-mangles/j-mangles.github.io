/*
 * Draft module for the Grade 8 Science site.
 * Load this script on science/index.html before ../assets/hub.js. In the
 * existing renderReview(u) function, add a mount point after #review, then:
 *   UnitPracticeQuiz.mount(document.querySelector('#unit-practice-quiz'), u);
 * The unit object is supplied by assets/hub.js, so each review page gets its
 * own quiz and students never need to choose a unit from a separate hub.
 */
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
    @media(max-width:520px){.uq{padding:17px}.uq-head{font-size:12px}}
  `;

  function collect(checks, lessonTitle, out) {
    if (!checks || typeof checks !== 'object') return;
    if (Array.isArray(checks)) {
      checks.forEach(item => collect(item, lessonTitle, out));
      return;
    }
    if (typeof checks.q === 'string' && Array.isArray(checks.a) &&
        Number.isInteger(checks.c) && checks.c >= 0 && checks.c < checks.a.length) {
      out.push({
        q: checks.q,
        a: checks.a,
        c: checks.c,
        why: typeof checks.why === 'string' ? checks.why : 'Review the lesson notes and try again.',
        lesson: lessonTitle
      });
      return;
    }
    Object.values(checks).forEach(value => collect(value, lessonTitle, out));
  }

  function shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function mount(target, unit) {
    if (!target || !unit) return;
    const bank = [];
    (unit.lessons || []).forEach(lesson => collect(lesson.check, lesson.title || 'Lesson check', bank));
    target.innerHTML = `<style>${styles}</style><section class="uq" aria-label="${esc(unit.name)} practice quiz">
      <div class="uq-kicker">Unit ${esc(unit.n)} · Practice</div>
      <h3>Check what you know</h3>
      <p>Try a short quiz using questions from this unit’s lesson checks. You’ll see an explanation after each answer.</p>
      ${bank.length ? `<button class="uq-start" type="button">Start practice</button><div class="uq-stage" hidden aria-live="polite"></div>` : '<p>Practice questions for this unit are coming soon.</p>'}
    </section>`;
    if (!bank.length) return;

    const start = target.querySelector('.uq-start');
    const stage = target.querySelector('.uq-stage');
    let questions = [], index = 0, score = 0, selected = -1, missed = [];

    function renderQuestion() {
      const item = questions[index];
      selected = -1;
      stage.innerHTML = `<div class="uq-head"><span>Unit ${esc(unit.n)}: ${esc(unit.name)}</span><span>Question ${index + 1} of ${questions.length}</span></div>
        <div class="uq-track" aria-hidden="true"><span style="width:${Math.round(index / questions.length * 100)}%"></span></div>
        <p class="uq-lesson">${esc(item.lesson)}</p><p class="uq-question">${esc(item.q)}</p>
        <div class="uq-options">${item.a.map((answer, i) => `<button class="uq-choice" type="button" aria-pressed="false" data-answer="${i}"><span class="uq-letter">${String.fromCharCode(65 + i)}</span><span>${esc(answer)}</span></button>`).join('')}</div>
        <p class="uq-feedback" hidden></p><button class="uq-next" type="button" disabled>Check answer</button>`;
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
          if (correct) score++;
          else missed.push({ item, selected });
          stage.querySelectorAll('.uq-choice').forEach((button, i) => {
            button.disabled = true;
            if (i === item.c) button.style.borderColor = 'var(--good,#1e8a5a)';
            else if (i === selected) button.style.borderColor = 'var(--bad,#c2373a)';
          });
          feedback.hidden = false;
          feedback.dataset.correct = String(correct);
          feedback.innerHTML = `<strong>${correct ? 'That’s right.' : 'Not quite.'}</strong>${esc(item.why)}`;
          stage.querySelector('.uq-next').textContent = index === questions.length - 1 ? 'See results' : 'Next question';
          return;
        }
        index++;
        if (index < questions.length) renderQuestion();
        else renderResults();
      });
    }

    function renderResults() {
      const missedHTML = missed.length ? missed.map(({ item, selected: answer }) => `<article><h4>${esc(item.q)}</h4><p style="color:var(--bad,#c2373a)">Your answer: ${esc(item.a[answer])}</p><p style="color:var(--good,#1e8a5a)">Best answer: ${esc(item.a[item.c])}</p><p>${esc(item.why)}</p></article>`).join('') : '<article><h4>All correct</h4><p>Try another round when you’re ready.</p></article>';
      stage.innerHTML = `<div class="uq-result"><div class="uq-kicker">Round complete</div><div class="uq-score">${score} / ${questions.length}</div><p>${score === questions.length ? 'Excellent work.' : 'Review any missed ideas, then try again.'}</p><div class="uq-missed">${missedHTML}</div><button class="uq-retry" type="button">Try another round</button></div>`;
      stage.querySelector('.uq-retry').addEventListener('click', begin);
    }

    function begin() {
      questions = shuffle(bank).slice(0, Math.min(10, bank.length));
      index = 0; score = 0; missed = [];
      start.hidden = true; stage.hidden = false;
      renderQuestion();
    }
    start.addEventListener('click', begin);
  }

  window.UnitPracticeQuiz = { mount };
})();
