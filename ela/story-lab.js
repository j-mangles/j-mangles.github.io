"use strict";
const byId = id => document.getElementById(id);
const node = (tag, text) => {
  const el = document.createElement(tag);
  el.textContent = text;
  return el;
};

function route() {
  const current = ["review", "test"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "simulation";
  for (const link of document.querySelectorAll(".lab nav a")) {
    const selected = link.hash === "#" + current;
    byId(link.hash.slice(1)).hidden = !selected;
    if (selected) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}
window.addEventListener("hashchange", route);
route();

// Reveal timing changes the reader's knowledge. The climax changes the public outcome.
const sceneOpening = "Noor tested the microphone with her thumbnail. The gym fell quiet. On the lectern, above the tally for the winter concert vote, someone had written FINAL in thick pencil.";
const earlyClue = "Under the lectern, an envelope marked BALCONY VOTES had slipped behind a box. Noor straightened the tally sheet without looking down.";
const lateClue = "Noor straightened the tally sheet. In the front row, the concert band had already lifted their instruments.";
const discovery = "The announcer lifted a hand. Noor bent to plug in the loose microphone lead. There, behind the box, lay a sealed envelope. The balcony votes. The winning margin on her sheet was two.";
const endings = {
  speak: ["Noor switched the microphone on. “There’s one row we haven’t counted.” She held up the envelope. Every face in the gym turned towards the balcony.", "Five minutes later the band put their instruments away. The drama club had won by one. On the stairs, someone from the balcony caught Noor’s sleeve. “You counted us,” he said."],
  pass: ["Noor left the microphone off. She slid the envelope under the tally sheet and nudged both towards the announcer. He was already reading from his copy.", "The band struck its first chord. Only then did the announcer break the seal. He struck out his figure and wrote a new one. From the front row the drama club watched him try to wave the music to a stop."]
};
let pinned = null, beat = 0;
const beats = ["Exposition", "Clue", "Discovery", "Decision", "Consequence"];
function settings() {
  return ["reveal", "decision"].map(name => document.querySelector('input[name="' + name + '"]:checked').value);
}
function sceneParts([reveal, decision]) {
  return [sceneOpening, reveal === "early" ? earlyClue : lateClue, discovery, ...endings[decision]];
}
function drawScene() {
  const current = settings(), [reveal, decision] = current;
  const parts = sceneParts(current), earlier = pinned && sceneParts(pinned);
  const stepping = byId("step-mode").checked;
  const count = stepping ? beat + 1 : beats.length;
  function paragraphs(version) {
    return version.slice(0, count).map((text, i) => {
      const p = node("p", text);
      if (earlier && parts[i] !== earlier[i]) p.classList.add("changed-beat");
      return p;
    });
  }
  byId("scene").replaceChildren(...paragraphs(parts));
  if (earlier) byId("earlier").replaceChildren(...paragraphs(earlier));
  byId("kept").hidden = !earlier;
  byId("reader-controls").hidden = !stepping;
  byId("back-beat").disabled = beat === 0;
  byId("next-beat").disabled = beat === beats.length - 1;
  byId("beat").textContent = "Beat " + (beat + 1) + " of 5 · " + beats[beat];
  const pauseQuestions = ["What seems settled at the start?", "What do you know that Noor knows, or does not know yet?", "What makes the two-vote margin matter now?", "What consequence do you expect from Noor’s choice?", "Which earlier line prepared you for this ending?"];
  byId("pause-question").textContent = pauseQuestions[beat];
  const knowledge = reveal === "early" ? "You know about the votes while Noor is still preparing. Her ordinary movements now delay a discovery you expect." : "You find the votes with Noor. The question changes suddenly from who won to whether she can stop the announcement.";
  const result = decision === "speak" ? "Switching on the microphone forces a public recount before a winner is announced." : "Passing the envelope avoids interrupting the room, but the original result is announced before anyone reads it.";
  byId("debrief").hidden = stepping && count < beats.length;
  byId("effect").textContent = knowledge + " " + result;
  if (pinned) {
    const changed = parts.slice(0,count).filter((text,i) => text !== earlier[i]).length;
    byId("compare").textContent = changed ? changed + (changed === 1 ? " visible paragraph changes." : " visible paragraphs change.") + " Look for the shaded passages." : "Both versions read the same up to this point.";
  }
}
byId("simulation").addEventListener("change", e => {
  if (e.target.id === "step-mode") {beat=0;byId("debrief").open=false;}
  drawScene();
});
byId("next-beat").onclick = () => {beat=Math.min(4,beat+1);drawScene();};
byId("back-beat").onclick = () => {beat=Math.max(0,beat-1);drawScene();};
byId("keep").onclick = () => {pinned=settings();drawScene();};
drawScene();

const rounds = [
  ["Plot", [
    ["A cyclist wants to finish the race. Halfway to the starting line, a tyre goes flat. Which detail sets the story in motion?", "The flat tyre is the inciting incident. Wanting to finish establishes the goal."],
    ["Ava drops the key, tries a window, then calls the neighbour she argued with. Which event could serve as the climax? Give a reason.", "Calling the neighbour can be the climax if Ava must choose between her pride and getting help. An alternative needs a decision or reversal supported by the scene."],
    ["A first draft reads, “The door jammed. Dev was trapped. Dev was still trapped.” Replace the last two sentences with two attempts that build pressure.", "One possible pair: Dev pushes a note under the door, but the hall stays silent. He reaches for his phone and sees one per cent battery. Award the square for two distinct, connected attempts with a consequence."],
    ["A writer ends a scene immediately after the character confesses. A second version adds a friend sliding a chair closer. What changes for the reader?", "Both versions end with the confession as a turning point. The chair adds a consequence and suggests the friendship might survive. The shorter version leaves the response open."]]],
  ["Character", [
    ["“It’s fine,” Tess says. Under the table, she tears her napkin into strips. What can you infer?", "She may be upset or anxious despite sounding calm. The torn napkin supports that inference."],
    ["Give the character both an external problem and an internal conflict: a student finds a friend's lost race entry five minutes before the deadline.", "The deadline is external. Wanting to help a friend while wanting the open spot for oneself creates an internal conflict. Accept another plausible tension."],
    ["Turn “Eli felt guilty” into a line of action or dialogue. Let the other team infer the feeling.", "For example: Eli put the broken handle on the counter and stayed there after everyone else left. Accept a concrete action or dialogue that makes guilt inferable."],
    ["The captain returns a medal in private. Another draft has her return it during assembly. Give two plausible readings of the public choice and one detail that would help distinguish them.", "Publicly returning it might correct the record or attract praise. Looking towards the overlooked runner versus checking the cameras could support different readings. Accept supported alternatives."]]],
  ["Evidence & craft", [
    ["Which claim can serve as a theme: “loyalty” or “loyalty becomes difficult when a friend is wrong”? Explain.", "The second makes a claim about life. Loyalty alone names a topic."],
    ["A paragraph opens, “I knew the bell would ring.” It continues, “Jules had no idea what I was planning.” Identify the point of view and one limit on the narrator’s knowledge.", "First person. The narrator can describe what they know and observe, but can only infer what Jules thinks unless Jules tells them."],
    ["A story mentions a split umbrella rib on page one. On page three the umbrella folds in a storm. Explain how the earlier detail changes the later moment.", "The split rib foreshadows the collapse. It gives readers grounds to anticipate trouble and makes the failure feel earned."],
    ["“When Ren spoke, the table went quiet. Lee put a second spoon beside Ren’s bowl.” Build a claim about Lee, cite one detail and explain its meaning.", "Lee offers quiet support. Setting out a spoon includes Ren in the meal despite everyone’s silence. Award for a defensible claim, a specific detail and a link between them."]]]
];
const gameKey = "ela-showdown-v1";
function validKey(key) {return typeof key === "string" && /^[0-2]-[0-3]$/.test(key);}
let turns = [], active = null;
try {
  const saved = JSON.parse(sessionStorage.getItem(gameKey));
  if (saved && Array.isArray(saved.turns) && saved.turns.length <= 12 &&
      saved.turns.every(x => x && validKey(x.key) && [0,1,2].includes(x.award)) &&
      new Set(saved.turns.map(x => x.key)).size === saved.turns.length) {
    turns = saved.turns;
    if (saved.active && validKey(saved.active.key) && typeof saved.active.revealed === "boolean" &&
        !turns.some(x => x.key === saved.active.key)) active = saved.active;
  }
} catch {}
function saveGame() {
  try {sessionStorage.setItem(gameKey, JSON.stringify({turns, active}));} catch {}
}
function pointsFor(key) {return Number(key.split("-")[1]) + 1;}
function drawBoard() {
  const scores=[0,0];
  for (const turn of turns) if (turn.award<2) scores[turn.award]+=pointsFor(turn.key);
  const team=turns.length%2+1, finished=turns.length===12;
  const outcome=scores[0]===scores[1] ? "Tie game." : "Team "+(scores[0]>scores[1]?1:2)+" wins.";
  byId("score").textContent="Team 1 · "+scores[0]+"     |     Team 2 · "+scores[1]+"     |     "+(finished?outcome:"Team "+team+" picks.");
  byId("new-game").hidden=!finished;
  byId("correct-score").hidden=!turns.length || Boolean(active);
  byId("board").replaceChildren(...rounds.map(([category, questions], c) => {
    const column = document.createElement("div");
    column.append(node("h3", category));
    questions.forEach((_, index) => {
      const key=c+"-"+index, points=index+1, played=turns.some(turn=>turn.key===key);
      const button=node("button",played?"Played":points+(points===1?" point":" points"));
      button.disabled=played||Boolean(active);
      button.setAttribute("aria-label",category+", "+points+" points"+(played?", played":""));
      button.onclick=()=>{active={key,revealed:false};saveGame();drawBoard();byId("clue-title").focus();};
      column.append(button);
    });
    return column;
  }));
  byId("clue").hidden=!active;
  if (!active) return;
  const [c,i]=active.key.split("-").map(Number), points=i+1;
  byId("clue-title").textContent=rounds[c][0]+" · "+points+(points===1?" point":" points");
  byId("clue-text").textContent=rounds[c][1][i][0];
  byId("model").textContent=active.revealed?rounds[c][1][i][1]:"";
  byId("judging").hidden=!active.revealed;
  byId("reveal").hidden=active.revealed;
}
byId("reveal").onclick=()=>{if(active){active.revealed=true;saveGame();drawBoard();byId("awards").firstElementChild.focus();}};
byId("awards").replaceChildren(...["Team 1 scores","Team 2 scores","No points"].map((label,award)=>{
  const button=node("button",label);
  button.onclick=()=>{
    if(!active?.revealed)return;
    turns.push({key:active.key,award});
    active=null;saveGame();drawBoard();
    (byId("board").querySelector("button:enabled")||byId("new-game")).focus();
  };
  return button;
}));
byId("correct-score").onclick=()=>{
  const last=turns.pop();
  if(!last)return;
  active={key:last.key,revealed:true};saveGame();drawBoard();byId("awards").firstElementChild.focus();
};
byId("new-game").onclick=()=>{turns=[];active=null;saveGame();drawBoard();byId("board").querySelector("button").focus();};
drawBoard();

const testItems = [
  ["What starts Kit’s central problem?", ["His sister paints the record sign.", "He sees a second landing mark.", "The announcer gives the result.", "Mara rakes the sand."]],
  ["Which moment is the climax of Kit’s decision?", ["The crowd stamps.", "Kit sees his sister in the stands.", "Mara nods once.", "Kit moves the peg to the handprint."]],
  ["Which description best fits the point of view?", ["Third person, close to Kit’s experience.", "First person, told by Mara.", "Third person, reporting everyone’s private thoughts.", "Second person, addressing an official."]],
  ["Which detail most clearly shows how Mara responds to Kit’s explanation?", ["The hall smells of sawdust.", "The sign is wooden.", "She nods and smooths the pit.", "The crowd begins stamping."]],
  ["Explain how pressure builds between the jump and Kit’s decision. Use two details in sequence and explain what each adds."],
  ["What can you infer about Kit’s sister from her handling of the programme and her last words? Explain how each detail supports your reading."],
  ["A reader says the last sentence is mostly about a sports record. Offer your own reading of the ending. Use two details and explain what the final image adds."],
  ["Retell the moment when Kit moves the peg in two or three sentences from Mara’s first-person point of view. Then explain one thing Mara can observe and one thing she can only infer."]
];
const form = byId("assessment"), fields = [], storageKey = "ela-blue-line-responses-v1";
let saved = {};
try { saved = JSON.parse(sessionStorage.getItem(storageKey)) || {}; } catch {}
byId("student").value = typeof saved.name === "string" ? saved.name : "";
testItems.forEach(([prompt, options], i) => {
  const group = document.createElement("fieldset"), number = i + 1;
  group.append(node("legend", number + ". " + prompt + (options ? " (1 mark)" : " (4 marks)")));
  if (options) {
    options.forEach((choice, j) => {
      const label = document.createElement("label"), input = document.createElement("input");
      input.type = "radio"; input.name = "q" + number; input.value = choice; input.checked = saved[number] === choice;
      label.append(input, " " + String.fromCharCode(65 + j) + ". " + choice); group.append(label);
    });
  } else {
    const area = document.createElement("textarea");
    area.rows = 4; area.setAttribute("aria-label", "Response to question " + number); area.value = typeof saved[number] === "string" ? saved[number] : "";
    const printAnswer = node("div", area.value);
    printAnswer.className = "print-answer";
    area.oninput = () => { printAnswer.textContent = area.value; };
    group.append(area, printAnswer);
  }
  fields.push(group);
  byId("questions").append(group);
});
function answers() {
  return fields.map(group => (group.querySelector("textarea, input:checked")?.value || "").trim());
}
function progress() {
  byId("progress").textContent = answers().filter(Boolean).length + " of 8 answered.";
}
form.addEventListener("submit", e => e.preventDefault());
form.addEventListener("input", () => {
  const values = {name:byId("student").value};
  answers().forEach((answer, i) => { values[i + 1] = answer; });
  try { sessionStorage.setItem(storageKey, JSON.stringify(values)); } catch { byId("test-status").textContent = "Session saving is unavailable. Download a copy before leaving."; }
  progress();
});
byId("download").onclick = () => {
  const responses = answers();
  const lines = ["The blue line · Grade 8 ELA", "Name: " + byId("student").value, ...testItems.map(([q], i) => (i + 1) + ". " + q + "\n" + (responses[i] || "[Unanswered]"))];
  const url = URL.createObjectURL(new Blob([lines.join("\n\n")], {type:"text/plain;charset=utf-8"}));
  const link = document.createElement("a"); link.href = url; link.download = "blue-line-responses.txt"; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  byId("test-status").textContent = "Response copy prepared. Hand it in using your teacher’s instructions.";
};
byId("print").onclick = () => window.print();
progress();
