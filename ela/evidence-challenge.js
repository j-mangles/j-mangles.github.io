/* Reading practice for the four Choices Under Pressure core writing tasks.
   All details are paraphrased. Each claim asks for one particular connection. */
(() => {
  "use strict";
  const rounds = [
    {
      story: "roger", skill: "Character change",
      claim: "After Mrs. Jones takes Roger home, he starts to care whether she trusts him.",
      details: [
        ["Roger tells her he wanted blue suede shoes.", "That explains why he tried to take the purse earlier."],
        ["Roger sits where Mrs. Jones can see him while she prepares their food.", "This is something Roger chooses to do after she gives him some freedom."],
        ["Mrs. Jones gives him money for the shoes.", "That shows her generosity. Look for an action Roger takes himself."]
      ], detailKey: 1,
      reasons: [
        ["Staying in sight gives her a reason to trust him, even when he has the chance to leave.", "His choice matters because he could have acted differently."],
        ["Sitting down shows that Roger has become too tired to run.", "The scene draws attention to where he sits in relation to her."],
        ["Mrs. Jones can watch him, so she must have ordered him to sit there.", "Roger chooses the spot himself. An order would change the meaning of his action."]
      ], reasonKey: 0
    },
    {
      story: "summer", skill: "Setting",
      claim: "The setting makes the children's decision to shut Margot away especially cruel.",
      details: [
        ["Margot remembers living on Earth.", "That helps explain why she stands apart from her classmates."],
        ["The children rush outside together.", "That describes the group's behaviour. Look for a feature of life on Venus."],
        ["Years of rain separate one brief appearance of the sun from the next.", "The long interval tells us what a missed opportunity costs."]
      ], detailKey: 2,
      reasons: [
        ["A wet playground explains why the children choose an indoor hiding place.", "The claim is about what Margot loses when they shut the door."],
        ["Missing a few minutes costs Margot an experience she will have to wait years to have again.", "The length of the wait changes the consequence of the group's act."],
        ["The rain makes the children lock the door as soon as the sun appears.", "The weather sets the stakes. The children make the decision."]
      ], reasonKey: 1
    },
    {
      story: "house", skill: "Foreshadowing",
      claim: "A detail that first makes the boarding house look cosy takes on a threatening second meaning.",
      details: [
        ["Billy sees a dog by the fire and later learns that the landlady preserved it.", "The same animal changes meaning when Billy learns something new."],
        ["Billy is looking for an affordable place to stay.", "That gives Billy a reason to enter. It does not change meaning later."],
        ["The landlady greets Billy at the door.", "The greeting can feel odd, but this detail alone gives us no later discovery."]
      ], detailKey: 0,
      reasons: [
        ["The dog seems unusual because Billy has never seen a dog indoors.", "The story gives us another reason to reconsider what Billy sees."],
        ["The dog proves exactly what happened to every earlier guest.", "The detail raises a suspicion. It cannot establish every guest's fate."],
        ["Something Billy took as a sign of life is dead and preserved. The reader starts to question what else only looks ordinary.", "The later discovery changes how we read the first glimpse."]
      ], reasonKey: 2
    },
    {
      story: "paw", skill: "Human choice",
      claim: "Mr. White has a chance to walk away from the paw before anyone makes a wish.",
      details: [
        ["The company offers the family two hundred pounds.", "That happens after the first wish."],
        ["Mr. White retrieves the paw after Morris throws it into the fire.", "This moment brings the paw back into the family's hands."],
        ["Knocking is heard at the door.", "That raises uncertainty much later in the story."]
      ], detailKey: 1,
      reasons: [
        ["Letting the fire consume the paw would close off the wishes. Keeping it leaves Mr. White responsible for a choice.", "The fire gives him a genuine alternative before he wishes."],
        ["The fire tells us that Mr. White already knows exactly how every wish will end.", "He hears a warning. He does not know the exact outcomes."],
        ["Because he saves the paw, supernatural fate cannot be part of the story.", "One act supports the choice argument without ruling out another force."]
      ], reasonKey: 0
    },
    {
      story: "roger", skill: "Compassion",
      claim: "Mrs. Jones makes it easier for Roger to see her as someone who understands him.",
      details: [
        ["She holds on to Roger after he tries to take her purse.", "This establishes her control at the beginning."],
        ["Roger nearly falls when he pulls on the bag.", "That explains how the theft fails."],
        ["She admits that she, too, has done things she would feel ashamed to describe.", "She offers something personal from her own past."]
      ], detailKey: 2,
      reasons: [
        ["Mrs. Jones tells him that she once stole the same kind of purse.", "She does not identify a specific act. Avoid filling in her past."],
        ["Sharing her own shame gives Roger room to admit a mistake without being reduced to that mistake.", "Her admission changes the relationship between the two characters."],
        ["Keeping the details private means she wants Roger to guess her secret.", "The scene focuses on their shared experience of regret."]
      ], reasonKey: 1
    },
    {
      story: "summer", skill: "Group responsibility",
      claim: "Bradbury shows how one child's hostility becomes a choice the whole group makes.",
      details: [
        ["One child urges the others on, and together they force Margot into the closet.", "The shift from an instigator to the group shows who acts."],
        ["Margot describes the sun from memory.", "That helps explain the difference her classmates resent."],
        ["The first drops of rain bring the children back indoors.", "That changes the scene after the harm is done."]
      ], detailKey: 0,
      reasons: [
        ["The child who speaks first is the only one who has any responsibility.", "The others help carry out the suggestion."],
        ["The children's silence afterwards tells us exactly what each child thinks.", "Silence can suggest guilt. It cannot establish everyone's private thoughts."],
        ["The suggestion becomes harmful because others join in. Several children could have refused before the door closed.", "The action lets us trace responsibility beyond the first speaker."]
      ], reasonKey: 2
    },
    {
      story: "house", skill: "Dramatic irony",
      claim: "The reader has reason to doubt the landlady while Billy is still trying to make sense of his visit.",
      details: [
        ["Billy has just arrived in Bath.", "That establishes why he needs a room."],
        ["Billy recognises names in the guest book, and the landlady insists those guests are still there.", "The familiar names and her account of the guests invite different readings."],
        ["Billy thinks the price is low.", "The price helps explain the appeal, but gives little evidence about the earlier guests."]
      ], detailKey: 1,
      reasons: [
        ["The names prove Billy has met both guests before.", "Finding a name familiar does not establish a personal meeting."],
        ["The landlady clears up the mystery once she says the guests stayed.", "Her answer makes their long absence from the register more unsettling."],
        ["The reader can suspect danger in her answer while Billy keeps treating it as a puzzle about names.", "Dramatic irony grows from the gap between the reader's suspicion and Billy's response."]
      ], reasonKey: 2
    },
    {
      story: "paw", skill: "Counterargument",
      claim: "A reader argues that human choices drive the tragedy. Which detail gives the strongest support to the opposing view that fate also plays a part?",
      details: [
        ["The compensation after Herbert's death exactly matches the sum Mr. White wished for.", "The precise match is an important detail for a reader arguing for fate."],
        ["Mr. White chooses to make the first wish.", "That supports the human-choice side of the argument."],
        ["Mrs. White urges her husband to use the paw again.", "That is another example of human pressure and choice."]
      ], detailKey: 0,
      reasons: [
        ["The match proves someone at the company heard the wish.", "There is no evidence the company knew about the wish."],
        ["The family chose the amount, yet had no control over the company's payment. The match leaves room for a force beyond their choices.", "This acknowledges evidence for fate while leaving the family's decisions open to discussion."],
        ["Receiving money means the wish turned out as the family intended.", "The way the money arrives is precisely what makes the outcome horrifying."]
      ], reasonKey: 1
    }
  ];

  const el = id => document.getElementById("ec-" + id);
  const key = "ela-story-evidence-v1";
  let run = null;
  const select = el("set");
  select.add(new Option("All four stories · 8 rounds", "all"));
  for (const [id,title] of Object.entries(classStories)) select.add(new Option(title + " · 2 rounds", id));

  function save() {
    try {
      if (run) sessionStorage.setItem(key, JSON.stringify(run));
      else sessionStorage.removeItem(key);
    } catch {}
  }
  try {
    const stored = JSON.parse(sessionStorage.getItem(key));
    if (stored && Array.isArray(stored.ids) && stored.ids.length > 0 && stored.ids.length <= rounds.length &&
        stored.ids.every(i => Number.isInteger(i) && rounds[i]) && Number.isInteger(stored.at) &&
        stored.at >= 0 && stored.at <= stored.ids.length && [0,1].includes(stored.part) &&
        Array.isArray(stored.answers) && stored.answers.length === stored.ids.length &&
        stored.answers.every(a => Array.isArray(a) && a.length <= 2 && a.every(n => [0,1,2].includes(n)))) run = stored;
  } catch {}
  function start(ids, practice) {
    run = {ids, at:0, part:0, answers:ids.map(() => []), practice};
    save(); draw(); el("claim").focus();
  }
  function earned(id, answers) {
    return Number(answers[0] === rounds[id].detailKey) + Number(answers[1] === rounds[id].reasonKey);
  }
  function draw() {
    const finished = run && run.at === run.ids.length;
    el("setup").hidden = Boolean(run);
    el("play").hidden = !run || finished;
    el("results").hidden = !finished;
    if (!run) return;
    if (finished) {
      const scores = run.ids.map((id,i) => earned(id,run.answers[i]));
      el("total").textContent = (run.practice ? "Practice score" : "First-pass score") + " · " + scores.reduce((a,b) => a+b,0) + " of " + (scores.length*2) + " points.";
      el("breakdown").replaceChildren(...run.ids.map((id,i) => {
        const r = rounds[id], a = run.answers[i], li = document.createElement("li");
        li.textContent = classStories[r.story] + " · " + r.skill + " · " + scores[i] + "/2" +
          (scores[i] === 2 ? "" : " · Revisit " + [a[0] !== r.detailKey && "the detail", a[1] !== r.reasonKey && "the explanation"].filter(Boolean).join(" and ") + ".");
        return li;
      }));
      el("retry").hidden = scores.every(score => score === 2);
      return;
    }
    const r = rounds[run.ids[run.at]], reason = run.part === 1, selected = run.answers[run.at][run.part];
    const options = reason ? r.reasons : r.details, correct = reason ? r.reasonKey : r.detailKey;
    const locked = selected !== undefined;
    el("round").textContent = (run.practice ? "Practice · " : "") + "Round " + (run.at+1) + " of " + run.ids.length + " · " + classStories[r.story];
    el("claim").textContent = r.claim;
    el("question").textContent = reason ? "Which explanation links this detail to the claim?" : "Which detail gives the strongest support?";
    el("evidence").hidden = !reason;
    if (reason) el("evidence").textContent = "Detail to explain: " + r.details[r.detailKey][0];
    el("options").replaceChildren(...options.map(([text],i) => {
      const label = document.createElement("label"), input = document.createElement("input");
      input.type = "radio"; input.name = "evidence-answer"; input.value = i;
      input.checked = selected === i; input.disabled = locked;
      input.onchange = () => { el("check").disabled = false; };
      label.append(input, text); return label;
    }));
    el("feedback").textContent = locked ? (selected === correct ? "One point. " : "No point this time. ") + options[selected][1] +
      (selected === correct ? "" : " Strongest choice: " + options[correct][0]) : "";
    el("check").hidden = locked; el("check").disabled = true;
    el("next").hidden = !locked;
    el("next").textContent = !reason ? "Explain the detail" : run.at === run.ids.length-1 ? "See results" : "Next round";
  }
  el("start").onclick = () => start(rounds.map((_,i) => i).filter(i => select.value === "all" || rounds[i].story === select.value), false);
  el("check").onclick = () => {
    const pick = el("options").querySelector("input:checked");
    if (!pick || run.answers[run.at][run.part] !== undefined) return;
    run.answers[run.at].push(Number(pick.value));
    save(); draw(); el("next").focus();
  };
  el("next").onclick = () => {
    if (run.answers[run.at][run.part] === undefined) return;
    if (run.part === 1) { run.at++; run.part = 0; } else run.part = 1;
    save(); draw();
    el(run.at === run.ids.length ? "results-title" : run.part ? "question" : "claim").focus();
  };
  el("retry").onclick = () => start(run.ids.filter((id,i) => earned(id,run.answers[i]) < 2), true);
  function chooseSet() { run = null; save(); draw(); select.focus(); }
  el("again").onclick = chooseSet;
  el("leave").onclick = () => {
    if (!run.answers.some(a => a.length) || window.confirm("Leave this round set and clear its score?")) chooseSet();
  };
  draw();
})();
