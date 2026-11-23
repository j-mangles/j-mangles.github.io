(() => {
  "use strict";
  const byId = id => document.getElementById(id);
  const first = byId("first-judgments");
  const eventKeys = ["ration", "walkout", "officials", "demand", "paid"];
  const eventText = eventKeys.map(key => document.querySelector('label[for="strike-' + key + '"]').textContent);
  const events = byId("strike-events");
  const turning = byId("turning-point");
  const selectEvent = byId("next-event");
  const pair = byId("source-reading");
  const shown = byId("ticket-shows");
  const limit = byId("ticket-limit");
  const textOf = id => byId(id).value.trim();
  function showFile() {
    byId("follow-up").hidden = false;
    byId("independent-path").hidden = true;
  }
  byId("open-cards").onclick = () => { showFile(); byId("cards-title").focus(); };
  function revealEntry() {
    const index = events.children.length;
    const item = document.createElement("li");
    item.textContent = eventText[index];
    events.append(item);
    turning.add(new Option((index + 1) + " · " + eventText[index], String(index + 1)));
    byId("event-count").textContent = " Entry " + (index + 1) + " of " + eventKeys.length;
    if (events.children.length === eventKeys.length) {
      selectEvent.hidden = true;
      byId("discuss").hidden = false;
      showFile();
      byId("joint-title").focus();
    }
  }
  first.onsubmit = event => {
    event.preventDefault();
    for (const box of first.querySelectorAll("textarea")) {
      if (!box.value.trim()) { box.setCustomValidity("Write your first judgment."); box.reportValidity(); return; }
    }
    byId("first-a").textContent = "Farmers · " + textOf("farmer-first");
    byId("first-b").textContent = "Tomb builders · " + textOf("worker-first");
    first.hidden = true;
    byId("first-record").hidden = false;
    byId("strike-record").hidden = false;
    revealEntry();
    byId("strike-title").focus();
  };
  first.oninput = event => event.target.setCustomValidity("");
  selectEvent.onclick = revealEntry;
  byId("keep-verdict").onclick = () => {
    if (!turning.value || !pair.value.trim()) {
      byId("verdict-status").textContent = "Choose a strike entry and write your joint verdict first.";
      (turning.value ? pair : turning).focus();
      return;
    }
    turning.disabled = true;
    pair.readOnly = true;
    byId("keep-verdict").hidden = true;
    byId("verdict-status").textContent = "Joint verdict recorded for both partners.";
    byId("ticket").hidden = false;
    byId("ticket-title").focus();
  };
  byId("save-ticket").onclick = () => {
    if (!shown.value.trim() || !limit.value.trim()) {
      byId("ticket-status").textContent = "Answer both questions before downloading your ticket.";
      (shown.value.trim() ? limit : shown).focus();
      return;
    }
    const lines = ["Who benefited from Egypt? · Lesson 7", "Our first judgments",
      byId("first-a").textContent, byId("first-b").textContent, "Strike entry " + turning.value + " · " + eventText[Number(turning.value)-1],
      "Our joint verdict", pair.value.trim(), "My exit ticket", "What the workers could do", shown.value.trim(),
      "What I still need to know", limit.value.trim()];
    const url = URL.createObjectURL(new Blob([lines.join("\n\n")], {type:"text/plain;charset=utf-8"}));
    const link = document.createElement("a");
    link.href = url; link.download = "egypt-strike-exit-ticket.txt";
    document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
    byId("ticket-status").textContent = "Your download includes the pair’s verdict and your individual answers.";
    byId("new-ticket").disabled = false;
  };
  byId("ticket").oninput = () => { byId("new-ticket").disabled = true; byId("ticket-status").textContent = ""; };
  byId("new-ticket").onclick = () => {
    shown.value = ""; limit.value = "";
    byId("new-ticket").disabled = true;
    byId("ticket-status").textContent = "The second ticket is ready. Your pair’s verdict is above.";
    shown.focus();
  };
  function readLetters(value) {
    const parts = value.trim().toUpperCase().split(/[\s,;]+/).filter(Boolean);
    return parts.length && parts.every(letter => /^[A-I]$/.test(letter)) ? parts : [];
  }
  const claimHints = {
    women:"Does each source address a legal right or a limit on how much power that right gave someone? Compare a court or property record with access to government jobs.",
    power:"Does the example show authority over someone or a way to influence an outcome? Explain which detail in each source tells you.",
    birth:"Look for a position someone inherited or a change in someone’s status. Explain how much that example can tell you about other families."
  };
  document.querySelector("[data-check-claims]").onclick = () => {
    let count = 0;
    for (const id of ["women","power","birth"]) {
      const support = readLetters(textOf(id + "-support")), challenge = readLetters(textOf(id + "-challenge"));
      let message = "";
      if (!support.length || !challenge.length) message = "Choose a card letter from A to I on each side. Separate multiple letters with a comma.";
      else if (support.some(card => challenge.includes(card))) message = "Use different cards on the two sides of this claim.";
      else if (!textOf(id + "-verdict") || !textOf(id + "-reason")) message = "Choose your verdict and explain how the two sources bear on it.";
      else { count++; message = "Both sources recorded. " + claimHints[id]; }
      byId(id + "-note").textContent = message;
    }
    document.querySelector("[data-claims-feedback]").textContent = count + " of 3 evidence files complete. Your verdict and reasoning are open to discussion.";
  };
  document.querySelector("[data-check-strike]").onclick = () => {
    const correct = eventKeys.filter((key,i) => byId("strike-" + key).value === String(i + 1)).length;
    document.querySelector("[data-strike-feedback]").textContent = correct === 5 ? "All five events are in order." :
      correct + " of 5 events are in place. Compare the officials’ first response with what the workers did next.";
  };
  document.querySelector("[data-clear]").onclick = () => {
    for (const field of document.querySelectorAll("input, textarea, select")) { field.value = ""; field.setCustomValidity(""); }
    for (const note of document.querySelectorAll(".feedback,.claim-note,[role=status],.summary-line")) note.textContent = "";
    for (const id of ["first-record","strike-record","discuss","ticket","follow-up"]) byId(id).hidden = true;
    events.replaceChildren(); turning.length = 1; turning.disabled = false; pair.readOnly = false;
    byId("independent-path").hidden = false;
    first.hidden = false; selectEvent.hidden = false; byId("keep-verdict").hidden = false; byId("new-ticket").disabled = true;
    document.querySelectorAll("details[open]").forEach(details => { details.open = false; });
    byId("farmer-first").focus();
  };
})();
