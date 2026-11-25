/* A round has two decisions. Keep the first choice private until both are locked. */
(() => {
  const unit = window.UnitPrep;
  const game = document.getElementById("game");
  const quiz = document.getElementById("quiz");
  const board = document.getElementById("round");
  const record = document.getElementById("record");
  const options = document.getElementById("choices");
  const prompt = document.getElementById("decision");
  const feedback = document.getElementById("round-result");
  const next = document.getElementById("continue");
  const result = document.getElementById("game-result");
  const start = document.getElementById("begin-game");
  const again = document.getElementById("play-again");
  const retry = document.getElementById("retry-rounds");
  let deck = [], missed = [], picks = [], index = 0, score = 0;

  function begin(cases) {
    deck = [...cases];
    missed = [];
    index = 0;
    score = 0;
    start.hidden = true;
    document.getElementById("game-intro").hidden = true;
    result.hidden = true;
    board.hidden = false;
    loadRound();
  }

  function loadRound() {
    const card = deck[index];
    picks = [];
    feedback.hidden = true;
    next.hidden = true;
    document.getElementById("progress").textContent =
      "Round " + (index + 1) + " of " + deck.length + " · " + score + " points";
    document.getElementById("case-title").textContent = card.title;
    document.getElementById("source").textContent = card.source;
    record.textContent = card.evidence;
    if (unit.showEvidence) unit.showEvidence(card);
    showDecision();
    document.getElementById("case-title").focus();
  }

  function showDecision() {
    const step = deck[index].steps[picks.length];
    prompt.textContent = (picks.length === 0 ? "1. " : "2. ") + step.q;
    options.replaceChildren();
    for (const [i, answer] of step.a.entries()) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = answer;
      button.onclick = () => {
        picks.push(i);
        if (picks.length < deck[index].steps.length) showDecision();
        else reveal();
      };
      options.append(button);
    }
    prompt.focus();
  }

  function reveal() {
    const card = deck[index];
    const points = card.steps.filter((step, i) => picks[i] === step.c).length;
    score += points;
    if (points < card.steps.length) missed.push(card);
    options.replaceChildren();
    prompt.textContent = "Round result";
    feedback.replaceChildren();
    const heading = document.createElement("strong");
    heading.textContent = points + " of 2 points";
    feedback.append(heading);
    const list = document.createElement("ol");
    card.steps.forEach((step, i) => {
      const row = document.createElement("li");
      row.textContent = picks[i] === step.c ? "Correct. " + step.a[step.c] :
        "You chose “" + step.a[picks[i]] + "”. Best answer: " + step.a[step.c];
      list.append(row);
    });
    const reason = document.createElement("p");
    reason.textContent = card.why;
    feedback.append(list, reason);
    feedback.hidden = false;
    next.textContent = index + 1 === deck.length ? "See final score" : "Next round";
    next.hidden = false;
    prompt.focus();
  }

  next.onclick = () => {
    index++;
    if (index < deck.length) { loadRound(); return; }
    board.hidden = true;
    result.hidden = false;
    document.getElementById("case-title").textContent = "Game results";
    const total = document.getElementById("total");
    total.textContent = score + " of " + (deck.length * 2) + " points";
    document.getElementById("summary").textContent = missed.length ?
      "Revisit these rounds: " + missed.map(card => card.title).join(", ") + "." :
      "You made and supported every decision in this round set.";
    retry.hidden = !missed.length;
    total.focus();
  };
  start.onclick = again.onclick = () => begin(unit.rounds);
  retry.onclick = () => begin(missed);

  window.UnitPracticeQuiz.mount(document.getElementById("quiz-panel"), unit,
    lessonId => { location.href = unit.lessonPrefix + encodeURIComponent(lessonId); });

  function selectMode() {
    const mode = location.hash === "#quiz" ? "quiz" : "game";
    game.hidden = mode !== "game";
    quiz.hidden = mode !== "quiz";
    for (const a of document.querySelectorAll("a[data-mode]")) {
      if (a.dataset.mode === mode) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    }
  }
  selectMode();
  window.addEventListener("hashchange", () => {
    selectMode();
    document.querySelector(".prep-mode:not([hidden]) h2").focus();
  });
})();
