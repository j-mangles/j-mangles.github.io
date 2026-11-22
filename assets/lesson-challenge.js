/* Two-decision partner rounds and an independently marked transfer task. */
(() => {
  "use strict";
  const data = window.lessonChallenge;
  const activity = document.getElementById("activity");
  const heading = document.getElementById("activity-title");
  const paper = document.getElementById("print-copy");
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
  const blankTest = () => ({name:"", answers:{}, writing:{}, finished:false});
  const newGame = order => ({order, turn:0, picks:[], started:false});
  const straightOrder = data.rounds.map((_, i) => i);
  const key = "gr8-lesson-challenge-v1-" + data.file;
  let game = newGame(straightOrder.slice()), test = blankTest();
  let storageOK = true;
  try {
    const saved = JSON.parse(sessionStorage.getItem(key) || "null");
    if (saved) {
      const g = saved.game;
      if (g && Array.isArray(g.order) && g.order.length === straightOrder.length &&
          new Set(g.order).size === g.order.length && g.order.every(i => Number.isInteger(i) && data.rounds[i]) &&
          Number.isInteger(g.turn) && g.turn >= 0 && g.turn <= g.order.length && Array.isArray(g.picks)) game = g;
      if (saved.test && typeof saved.test.name === "string" && saved.test.answers && saved.test.writing) test = saved.test;
    }
  } catch { storageOK = false; }
  function save() {
    try { sessionStorage.setItem(key, JSON.stringify({game, test})); }
    catch { storageOK = false; }
    const status = document.getElementById("storage-note");
    if (status) status.textContent = storageOK ? "Your draft stays in this tab. Give your finished copy to your teacher." : "Keep this page open and save a copy before leaving. This browser cannot store the draft.";
  }
  function readings(rows) {
    return '<div class="reading"><table><thead><tr>' +
      data.columns.map(c => '<th scope="col">' + esc(c) + '</th>').join("") +
      '</tr></thead><tbody>' + rows.map(row => '<tr>' + row.map((cell, i) =>
        i === 0 ? '<th scope="row">' + esc(cell) + '</th>' : '<td>' + esc(cell) + '</td>').join("") + '</tr>').join("") +
      '</tbody></table></div>';
  }
  function choices(question, name, selected, prefix = "") {
    return '<fieldset><legend>' + esc(prefix + question.prompt) + '</legend>' +
      question.options.map((option, i) => '<label class="choice"><input type="radio" required name="' + name +
        '" value="' + i + '"' + (selected === i ? ' checked' : '') + '><span>' + esc(option) + '</span></label>').join("") + '</fieldset>';
  }
  function button(label, id, secondary = false) {
    return '<button type="button" class="action' + (secondary ? ' secondary' : '') + '" id="' + id + '">' + esc(label) + '</button>';
  }
  function points() {
    return game.picks.reduce((sum, picks, turn) => {
      const round = data.rounds[game.order[turn]];
      return sum + Number(picks[0] === round.first.key) + Number(picks[1] === round.second.key);
    }, 0);
  }
  function moveFocus(id) { document.getElementById(id)?.focus(); }
  function showGame(focus = false) {
    heading.textContent = data.gameTitle;
    paper.replaceChildren();
    if (!game.started) {
      activity.innerHTML = '<p>' + esc(data.intro) + '</p><p>' + esc(data.note) +
        '</p><p>Five rounds · two decisions per round · one point per correct first answer.</p>' + button("Start the game","start-game");
      document.getElementById("start-game").onclick = () => { game.started = true; save(); showGame(true); };
      return;
    }
    if (game.turn === game.order.length) {
      const misses = game.order.map((n, i) => {
        const round = data.rounds[n];
        return [round.first, round.second].filter((q, j) => q.key !== game.picks[i][j])
          .map(q => '<li><strong>' + esc(round.title) + '</strong> · ' + esc(q.why) + '</li>').join("");
      }).join("");
      activity.innerHTML = '<h2 id="game-focus" tabindex="-1">Game complete · ' + points() + ' / 10</h2>' +
        (misses ? '<h3>Revisit these decisions</h3><ul>' + misses + '</ul>' : '<p>You supported every decision. Try the individual test with a fresh case.</p>') +
        '<div class="actions">' + button("Play again","replay",true) + '<a href="#test">Open the individual test</a></div>';
      document.getElementById("replay").onclick = () => {
        const order = game.order.slice();
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]];
        }
        game = newGame(order); game.started = true; save(); showGame(true);
      };
    } else {
      const round = data.rounds[game.order[game.turn]];
      const picks = game.picks[game.turn] || [];
      const stages = [round.first, round.second];
      const result = (q, pick, latest) => '<div class="feedback"' + (latest ? ' id="decision-feedback" tabindex="-1"' : '') + '><p><strong>' + (pick === q.key ? 'Point earned' : 'No point this time') +
        '</strong> · You chose “' + esc(q.options[pick]) + '”.</p><p>' + esc(q.why) + '</p></div>';
      const role = data.role[Math.min(picks.length, 1)];
      activity.innerHTML = '<section class="game-panel"><p class="progress">Round ' + (game.turn + 1) + ' of 5 · Team score ' + points() + ' / 10</p>' +
        '<h2>' + esc(round.title) + '</h2>' + readings(round.rows) +
        (picks.length ? result(round.first, picks[0], picks.length === 1) + '<h3>New report</h3><p>' + esc(round.update) + '</p>' : '') +
        (picks.length === 2 ? result(round.second,picks[1], true) + '<h3 id="game-focus" tabindex="-1">Round complete</h3>' +
          button(game.turn === 4 ? "See team results" : "Switch roles and start the next round","next-round") :
          '<h3 id="game-focus" tabindex="-1">' + esc(role) + '’s turn</h3><form id="round-form">' + choices(stages[picks.length],"pick",null) +
          '<button class="action">Lock in decision</button></form>') + '</section>';
      const form = document.getElementById("round-form");
      if (form) form.onsubmit = e => {
        e.preventDefault();
        picks.push(Number(new FormData(form).get("pick")));
        game.picks[game.turn] = picks; save(); showGame(true);
      };
      const next = document.getElementById("next-round");
      if (next) next.onclick = () => { game.turn++; save(); showGame(true); };
    }
    if (focus) moveFocus(document.getElementById("decision-feedback") ? "decision-feedback" : "game-focus");
  }
  const questionId = (i,j) => "q" + i + "-" + j;
  function objectiveScore() {
    return data.cases.reduce((sum,c,i) => sum + c.questions.filter((q,j) => test.answers[questionId(i,j)] === q.key).length, 0);
  }
  function criteria(c) { return '<ul class="criteria">' + c.criteria.map(s => '<li>' + esc(s) + '</li>').join("") + '</ul>'; }
  function printCopy() {
    const status = test.finished ? 'Finished copy · Selected responses ' + objectiveScore() + ' / 4 · Written responses await marking (6 marks).' : 'Working copy · 10 marks';
    paper.innerHTML = '<h1>' + esc(data.testTitle) + '</h1><p>' + esc(data.unit) + ' · ' + status + '</p><p>Name: ' +
      esc(test.name || "________________________") + '</p><p>' + esc(data.note) + '</p>' +
      data.cases.map((c,i) => '<section class="test-block"><h2>' + esc(c.title) + '</h2>' + readings(c.rows) +
        c.questions.map((q,j) => '<div class="prompt"><strong>' + (3*i+j+1) + '. ' + esc(q.prompt) + ' (1)</strong><ol type="A">' +
          q.options.map((o,k) => '<li>' + (test.answers[questionId(i,j)] === k ? '<b>[Selected] </b>' : '') + esc(o) + '</li>').join("") +
          '</ol></div>').join("") + '<strong>' + (3*i+3) + '. ' + esc(c.write) + ' (3)</strong>' +
        criteria(c) + '<div class="written' + (test.writing[i] ? '' : ' blank') + '">' + esc(test.writing[i]) + '</div></section>').join("");
  }
  function download() {
    const lines = [data.testTitle,data.unit,"Name: " + (test.name || "________________"),test.finished ? "Finished copy" : "Draft",
      "Selected responses: " + (test.finished ? objectiveScore()+" / 4" : "unmarked"),"Written responses: ____ / 6    Total: ____ / 10","",data.note];
    data.cases.forEach((c,i) => {
      lines.push("",c.title,data.columns.join(" | "),...c.rows.map(row => row.join(" | ")));
      c.questions.forEach((q,j) => lines.push("",(i*3+j+1)+". "+q.prompt,"Answer: "+(q.options[test.answers[questionId(i,j)]] ?? "[blank]")));
      lines.push("",(i*3+3)+". "+c.write,test.writing[i] || "[blank]","Marking criteria (1 mark each):",...c.criteria);
    });
    const url = URL.createObjectURL(new Blob([lines.join("\n")], {type:"text/plain;charset=utf-8"}));
    const a = document.createElement("a"); a.href = url; a.download = data.file+"-test.txt";
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function showTest() {
    heading.textContent = data.testTitle;
    if (test.finished) {
      activity.innerHTML = '<h2>Finished copy</h2><p><strong>Selected responses · ' + objectiveScore() + ' / 4.</strong> Your teacher will mark the two written responses out of 6.</p>' +
        '<p>Download or print your answers and give the copy to your teacher.</p><div class="actions">' +
        button("Download answers","download-test") + button("Print answers","print-test",true) + '</div>' +
        '<details><summary>Read my answers</summary>' + data.cases.map((c,i) => '<h3>' + esc(c.title) + '</h3>' +
        c.questions.map((q,j) => '<p><b>' + esc(q.prompt) + '</b><br>' + esc(q.options[test.answers[questionId(i,j)]]) + '</p>').join('') +
        '<p><b>' + esc(c.write) + '</b></p><p style="white-space:pre-wrap;overflow-wrap:anywhere">' + esc(test.writing[i]) + '</p>').join("") +
        '</details><details><summary>Start a new attempt</summary><p>Save your finished copy first. Starting over clears this test in this tab.</p>' +
        button("Clear this test and start again","clear-test",true) + '</details>';
      document.getElementById("download-test").onclick = download;
      document.getElementById("clear-test").onclick = () => { test = blankTest(); save(); showTest(); moveFocus("activity-title"); };
    } else {
      activity.innerHTML = '<p>Work independently. Each case is worth 5 marks. Answer two questions and write one explanation for each case.</p>' +
        '<p>' + esc(data.note) + '</p><p id="storage-note"></p><form id="test-form"><label class="name-label">Name (optional)<input type="text" name="student" autocomplete="off" maxlength="100" value="' +
        esc(test.name) + '"></label>' + data.cases.map((c,i) => '<section class="test-case"><h2>' + esc(c.title) + '</h2>' + readings(c.rows) +
          c.questions.map((q,j) => choices(q,questionId(i,j),test.answers[questionId(i,j)],(i*3+j+1)+'. ')).join("") +
          '<label class="write-label" for="w' + i + '">' + (i*3+3) + '. ' + esc(c.write) + ' (3 marks)</label>' +
          '<textarea required id="w' + i + '" name="w' + i + '">' + esc(test.writing[i]) + '</textarea>' +
          '<details><summary>How the 3 marks are earned</summary>' + criteria(c) + '</details></section>').join("") +
        '<p>Check your answers before finishing. Your finished copy is ready to hand in.</p><div class="actions"><button class="action">Finish test</button>' +
        button("Print working copy","print-test",true) + '</div></form>';
      const form = document.getElementById("test-form");
      form.oninput = e => {
        const field = e.target;
        if (field.name === "student") test.name = field.value;
        else if (field.type === "radio") test.answers[field.name] = Number(field.value);
        else if (field.tagName === "TEXTAREA") { test.writing[field.name.slice(1)] = field.value; field.setCustomValidity(""); }
        save();
      };
      form.onsubmit = e => {
        e.preventDefault();
        for (const box of form.querySelectorAll("textarea")) {
          if (!box.value.trim()) { box.setCustomValidity("Write your explanation before finishing."); box.reportValidity(); return; }
        }
        test.finished = true; save(); showTest(); moveFocus("activity-title");
      };
      save();
    }
    printCopy();
    document.getElementById("print-test").onclick = () => { printCopy(); window.print(); };
  }
  function render() {
    const mode = location.hash === "#test" ? "test" : "review";
    document.querySelectorAll(".challenge-nav a").forEach(a => {
      if (a.hash === "#" + mode) a.setAttribute("aria-current","page");
      else a.removeAttribute("aria-current");
    });
    if (mode === "test") showTest(); else showGame();
  }
  window.addEventListener("beforeprint", () => { if (location.hash === "#test") printCopy(); });
  window.addEventListener("hashchange", () => { render(); moveFocus("activity-title"); });
  render();
})();
