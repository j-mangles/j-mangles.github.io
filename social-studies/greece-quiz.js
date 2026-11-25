const greeceQuiz = {
  name:"Ancient Greece", n:"3", lessonPrefix:"./#greece-",
  quizIntro:"Eight new questions on geography, evidence, citizenship and power. You will get feedback after each choice and can revisit the lesson for any missed question.",
  lessons:[
    {id:"l1",title:"Mountains and sea",check:[{q:"Two coastal poleis have a difficult mountain journey between them. Which discovery would best support the claim that they remained connected?",a:["Both sites have steep slopes.","Each city chose its own laws.","Pottery made in one city turns up in the other city’s harbour."],c:2,why:"An object that travelled between the two places is evidence of exchange across the geographic divide."}]},
    {id:"l2",title:"Troy and evidence",check:[{q:"An excavator finds a burnt layer at a settlement linked to the Troy stories. What claim can the layer support on its own?",a:["A fire affected the settlement.","The wooden horse caused the fire.","Every event in the epic happened in order."],c:0,why:"A burnt layer records burning. Its cause and its connection to a particular story need additional evidence."}]},
    {id:"l4",title:"Spartan society",check:[{q:"How did helot labour support the lives of Spartan male citizens?",a:["Helots elected all military officers.","Compelled farm labour supplied food while citizens trained.","Helots collected harbour tolls as independent rulers."],c:1,why:"Helots worked the land under compulsion. Their production supported the citizen military system."}]},
    {id:"l5",title:"Athenian government",check:[{q:"A citizen attends the Assembly and votes on a proposed law. What is direct about this system?",a:["A king announces the result.","Every Athenian resident must agree.","Eligible citizens decide the issue themselves."],c:2,why:"In the Assembly, eligible citizens voted personally on decisions."}]},
    {id:"l10",title:"Who had a voice?",check:[{q:"A wealthy resident foreigner pays taxes in Athens. Which conclusion follows from the citizenship rules?",a:["Paying taxes alone did not grant an Assembly vote.","The size of the tax bill determined the number of votes.","Wealth gave the resident an automatic seat on the council."],c:0,why:"Resident foreigners, called metics, could contribute economically while remaining outside the citizen voting body."}]},
    {id:"l8",title:"The Delian League",check:[{q:"An ally wants to leave the Delian League and Athens forces it to stay. What does that suggest about the alliance?",a:["Every member held equal power over Athens.","Athens could use the alliance to exercise imperial power.","The league had stopped collecting resources."],c:1,why:"Preventing an ally from leaving is evidence of coercion and unequal power."}]},
    {id:"l11",title:"Historical order",check:[{q:"The Peloponnesian War began in 431 BCE and Athens surrendered in 404 BCE. Approximately how long separated these events?",a:["835 years.","35 years.","27 years."],c:2,why:"Within BCE dates, subtract 404 from 431 to find the elapsed years."}]},
    {id:"l12",title:"Alexander’s legacy",check:[{q:"Greek and Egyptian traditions appear together in an object from a Hellenistic city. Which interpretation is most cautious?",a:["The object suggests contact and cultural blending in this setting.","Everyone in the city followed the same customs.","All earlier Egyptian customs disappeared."],c:0,why:"One object can show traditions interacting. It cannot establish how everyone lived."}]}
  ]
};
window.UnitPracticeQuiz.mount(document.getElementById("greece-quiz-panel"), greeceQuiz);

function showCircuitMode(focusHeading) {
  const quizOpen = location.hash === "#quiz";
  document.getElementById("quiz").hidden = !quizOpen;
  document.getElementById("stations").hidden = quizOpen;
  for (const link of document.querySelectorAll("[data-circuit-mode]")) {
    if (link.dataset.circuitMode === (quizOpen ? "quiz" : "stations")) link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  }
  if (focusHeading) document.getElementById(quizOpen ? "quiz-title" : "geo-title").focus();
}
showCircuitMode(false);
window.addEventListener("hashchange", () => showCircuitMode(true));
