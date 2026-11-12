/* Whose Golden Age? A Walk Through Athens: evidence, unlock order and testable logic.
 * Grade 8 Social Studies, Ancient Greece. Built from the teacher's U3 lessons:
 * L5 Athens and Democracy, L8 The Golden Age of Athens, L10 Left Out.
 * Manitoba outcomes: 8-KC-001, 8-KC-002, 8-KC-003, 8-VC-001.
 * The map is a composite sketch (evidence spans about 550 to 403 BCE), not surveyed.
 * No invented people, dialogue or quotations. Every card carries a label and a lesson tag.
 * Lines marked TODO(teacher) are details to check against the lesson decks before release.
 */
(function(global){
"use strict";
const QUESTION="Whose golden age was it?";
const EMPTY_VOICE="No first-person account survives in this evidence.";
const LABELS={source:"Real source",paraphrase:"Paraphrase",interpretation:"Interpretation"};
const BINS=[
 {id:"shows",title:"The source shows"},
 {id:"infer",title:"Historians infer"},
 {id:"unknown",title:"We can't know"}
];
const MAP={w:1000,h:620,step:26,range:70,start:{x:120,y:500}};
const PLACES=[
 {id:"acropolis",n:1,title:"The Acropolis",short:"Acropolis",lesson:"L8",x:480,y:330,needs:[],
  intro:"The buildings on this hill are what most people picture when they hear “golden age”. Start with two questions: who paid, and who built?",
  items:[
   {id:"league",kind:"paraphrase",lesson:"L8",title:"From league to empire",
    text:"The Delian League began as an alliance against Persia. Members paid tribute in ships or money. In 454 BCE (the traditional date) Athens moved the League treasury from Delos to Athens. The league became an empire.",
    cite:"Paraphrased from the Lesson 8 notes."},
   /* TODO(teacher): the brief names the debate but not its two sides. Add each side's argument from the L8 Follow the Money task if you want it on this card. */
   {id:"debate",kind:"paraphrase",lesson:"L8",title:"The debate over the building fund",
    text:"Plutarch describes a debate over whether money collected from the allies should pay for building in Athens.",
    cite:"Paraphrased from Plutarch, Pericles 12. Plutarch wrote about 500 years later, so this is a reconstruction, not a transcript."},
   /* TODO(teacher): confirm from the L8 guide who is listed as receiving the equal wage and the amount; neither was in the brief, so neither is stated here. */
   {id:"accounts",kind:"source",lesson:"L8",title:"The Erechtheion accounts",
    text:"Building accounts from 409 to 406 BCE are the evidence that workers were paid an equal daily wage. They are the accounts for the Erechtheion, not the Parthenon. The Parthenon was built earlier, in 447 to 432 BCE.",
    cite:"Erechtheion building accounts, 409 to 406 BCE."}
  ],
  sort:[
   {id:"a1",text:"The Erechtheion accounts record an equal daily wage.",bin:"shows",why:"That is written in the accounts themselves."},
   {id:"a2",text:"Workers on the Parthenon were paid the same way.",bin:"infer",why:"The accounts are for a different building, years later. Applying them to the Parthenon is an inference."},
   {id:"a3",text:"The exact words spoken in the debate over the building fund.",bin:"unknown",why:"Plutarch wrote about 500 years later. His version is a reconstruction, not a transcript."},
   {id:"a4",text:"Plutarch's account describes a debate about spending the allies' money on building.",bin:"shows",why:"That is what his text says, whether or not the debate went exactly that way."}
  ]},
 {id:"assembly",n:2,title:"The Assembly and the ostraka well",short:"Assembly and well",lesson:"L5",x:270,y:250,needs:["acropolis"],
  intro:"Male citizens met in the Assembly to vote. One of those votes was ostracism: sending a man away from Athens for ten years.",
  items:[
   {id:"voters",kind:"paraphrase",lesson:"L5",title:"Who could vote",
    text:"Adult men with two Athenian parents could vote. Women, enslaved people, children and resident foreigners could not.",
    cite:"Paraphrased from the Lesson 5 notes."},
   /* TODO(teacher): the find is not placed at a specific spot on the map (schematic). Verify the find-spot before adding one. */
   {id:"ostraka",kind:"source",lesson:"L5",title:"190 ostraka in a well",
    text:"In 1937 archaeologists found 190 ostraka (pottery votes) naming Themistocles. They were written in only 14 handwritings.",
    cite:"Broneer's 1938 report on the find."},
   {id:"seventh",kind:"interpretation",lesson:"L5",title:"About one person in seven",
    text:"A common estimate is that citizens were roughly one person in seven. Estimates vary.",
    cite:"A modern estimate, not an ancient count."}
  ],
  sort:[
   {id:"b1",text:"190 ostraka name Themistocles.",bin:"shows",why:"The name is written on the pottery itself."},
   {id:"b2",text:"A small group prepared the ostraka ahead of time.",bin:"infer",why:"Only 14 handwritings on 190 ostraka points that way, but the pottery does not say who made them."},
   {id:"b3",text:"Why those writers wanted Themistocles gone.",bin:"unknown",why:"Shared handwriting raises questions. It does not establish a motive."},
   {id:"b4",text:"Citizens were roughly one person in seven.",bin:"infer",why:"It is an estimate, and estimates vary."}
  ]},
 {id:"household",n:3,title:"A household and a grave",short:"Household and grave",lesson:"L10",x:500,y:132,needs:["acropolis"],
  intro:"Citizen women generally lacked political rights. Most surviving Athenian writing came from literate male citizens, so historians turn to objects.",
  items:[
   /* TODO(teacher): add a one-line description of the stele's scene from the L10 slide; the brief gave only the standing figure. */
   {id:"hegeso",kind:"source",lesson:"L10",title:"The grave stele of Hegeso",
    text:"A gravestone. Gravestones can show names, images and what a family valued. One figure on this stele is standing.",
    cite:"Grave stele of Hegeso."},
   {id:"attendant",kind:"interpretation",lesson:"L10",title:"Reading the standing figure",
    text:"The standing figure is usually read as an enslaved attendant. That is the common reading, not a certainty.",
    cite:"How historians usually read the stele."},
   {id:"flask",kind:"source",lesson:"L10",title:"The Amasis Painter oil flask",
    text:"An oil flask painted with a scene of wool-working, made about 550 to 530 BCE. That is over a century before Pericles.",
    cite:"Oil flask by the Amasis Painter, about 550 to 530 BCE."},
   {id:"women-voice",kind:"interpretation",lesson:"L10",empty:true,title:"Women in this evidence",
    text:EMPTY_VOICE,
    cite:"A note about the evidence in this activity."}
  ],
  sort:[
   {id:"c1",text:"The oil flask shows wool-working.",bin:"shows",why:"The scene is painted on the flask."},
   {id:"c2",text:"The standing figure on the stele is an enslaved attendant.",bin:"infer",why:"That is the common reading, not a certainty."},
   {id:"c3",text:"Households in Pericles' time worked wool the way the flask shows.",bin:"infer",why:"The flask is over a century older than Pericles. Using it for his time is an inference."},
   {id:"c4",text:"What the women connected to these objects thought about their lives.",bin:"unknown",why:EMPTY_VOICE}
  ]},
 {id:"workshop",n:4,title:"A metic's workshop",short:"Metic's workshop",lesson:"L10",x:720,y:230,needs:["acropolis"],
  intro:"Metics were free foreign residents. They could trade and they paid taxes, but they had no citizen vote. Wealth alone did not change that.",
  items:[
   {id:"lysias",kind:"paraphrase",lesson:"L10",title:"Lysias, Against Eratosthenes",
    text:"About 403 BCE. Ten metics were arrested for their property. A workshop with 120 enslaved workers was seized. Lysias escaped. His brother was executed without trial.",
    cite:"Short paraphrase of a court speech by Lysias, about 403 BCE."},
   {id:"speaker",kind:"interpretation",lesson:"L10",title:"Who is speaking",
    text:"Lysias was a metic arguing a court case. He wanted to win it, so read his speech as one side's argument.",
    cite:"A caution about the source."},
   {id:"metic",kind:"paraphrase",lesson:"L10",title:"What a metic was",
    text:"A free foreign resident of Athens without voting rights. Metics could trade and paid taxes.",
    cite:"Paraphrased from the Lesson 10 notes."}
  ],
  sort:[
   {id:"d1",text:"Lysias says his brother was executed without trial.",bin:"shows",why:"That claim is in the speech."},
   {id:"d2",text:"Being wealthy did not keep a metic safe.",bin:"infer",why:"It fits what the speech describes, but it is a conclusion drawn from one case."},
   {id:"d3",text:"Whether the other side would agree with Lysias' version.",bin:"unknown",why:"Only his speech is used here, and he was arguing a case."},
   {id:"d4",text:"What the 120 enslaved workers thought when the workshop was seized.",bin:"unknown",why:"The paraphrase gives them only as a number."}
  ]},
 {id:"laurion",n:5,title:"The Laurion silver mines",short:"Laurion mines",lesson:"L10",x:880,y:500,needs:["assembly","household","workshop"],
  intro:"The walk ends away from the city, at the mines.",
  items:[
   {id:"silver",kind:"paraphrase",lesson:"L10",title:"Silver and the navy",
    text:"Enslaved miners dug the silver at Laurion. That silver helped pay for the navy.",
    cite:"Paraphrased from the Lesson 10 notes."},
   {id:"third",kind:"interpretation",lesson:"L10",title:"How many people were enslaved?",
    text:"Estimates of Athens' enslaved population vary widely, roughly 20 to 40 percent. “Perhaps one in three” is a middle figure.",
    cite:"Modern estimates, not an ancient count."},
   {id:"miners-voice",kind:"interpretation",lesson:"L10",empty:true,title:"Miners in this evidence",
    text:EMPTY_VOICE,
    cite:"A note about the evidence in this activity."}
  ],
  /* TODO(teacher): no object or text was given for the mines, so nothing here sorts into "The source shows". Add one from the L10 guide if it names a source. */
  sort:[
   {id:"e1",text:"About one in three people in Athens were enslaved.",bin:"infer",why:"It is a middle figure. Estimates run from roughly 20 to 40 percent."},
   {id:"e2",text:"The navy depended partly on the work of enslaved miners.",bin:"infer",why:"Miners dug the silver and the silver helped pay for the navy. Joining the two is a conclusion."},
   {id:"e3",text:"What a day in the mines was like, in a miner's own words.",bin:"unknown",why:EMPTY_VOICE}
  ]}
];
const STARTERS=[
 "I think the golden age belonged mostly to ",
 "For this group, the period meant ",
 "For another group it was different: ",
 "One source that supports this is ",
 "Someone could fairly argue the other side: ",
 "This evidence can't tell us "
];
const CHECKLIST=["Take a position.","Write about at least two groups of people.","Use at least one source from your cards.","Treat the other side fairly."];

function byId(id){const p=PLACES.find(x=>x.id===id);if(!p)throw new Error("Unknown place: "+id);return p;}
function makeState(){return {sorted:{},pins:{},pos:{x:MAP.start.x,y:MAP.start.y}};}
function sortedCount(state,id){return Object.keys(state.sorted[id]||{}).length;}
function isComplete(state,id){const p=byId(id);return sortedCount(state,id)===p.sort.length&&!!state.pins[id];}
function isUnlocked(state,id){return byId(id).needs.every(n=>isComplete(state,n));}
function lockReason(state,id){
 const missing=byId(id).needs.filter(n=>!isComplete(state,n)).map(n=>byId(n).title);
 return missing.length?"Locked. Finish first: "+missing.join(", ")+".":"";
}
function sortAnswer(state,placeId,stmtId,binId){
 const p=byId(placeId);
 if(!isUnlocked(state,placeId))throw new Error("Place is locked: "+placeId);
 const s=p.sort.find(x=>x.id===stmtId);if(!s)throw new Error("Unknown statement: "+stmtId);
 const bin=BINS.find(b=>b.id===binId);if(!bin)throw new Error("Unknown bin: "+binId);
 const correct=s.bin===binId;
 if(correct)(state.sorted[placeId]=state.sorted[placeId]||{})[stmtId]=true;
 return {correct,why:s.why,bin:BINS.find(b=>b.id===s.bin).title,complete:isComplete(state,placeId)};
}
function pin(state,placeId,itemId){
 const p=byId(placeId);
 if(!isUnlocked(state,placeId))throw new Error("Place is locked: "+placeId);
 if(!p.items.some(i=>i.id===itemId))throw new Error("Unknown card: "+itemId);
 state.pins[placeId]=itemId;
 return {complete:isComplete(state,placeId)};
}
function pinned(state){
 return PLACES.filter(p=>state.pins[p.id]).map(p=>({place:p,item:p.items.find(i=>i.id===state.pins[p.id])}));
}
function doneCount(state){return PLACES.filter(p=>isComplete(state,p.id)).length;}
function canWrite(state){return doneCount(state)===PLACES.length;}
function move(pos,dx,dy){
 return {x:Math.min(MAP.w-30,Math.max(30,pos.x+dx)),y:Math.min(MAP.h-30,Math.max(40,pos.y+dy))};
}
function nearest(pos){
 let best=null,d=Infinity;
 for(const p of PLACES){const q=Math.hypot(p.x-pos.x,p.y-pos.y);if(q<d){d=q;best=p;}}
 return d<=MAP.range?best:null;
}
function buildReport(state,name,text){
 const lines=["Whose Golden Age? A Walk Through Athens","Name: "+String(name||"").trim(),"Question: "+QUESTION,"","My evidence cards"];
 for(const x of pinned(state))lines.push(x.place.n+". "+x.place.title+": "+x.item.title+" ["+LABELS[x.item.kind]+", Lesson "+x.item.lesson.slice(1)+"] "+x.item.text);
 lines.push("","My answer",String(text||"").trim(),"");
 return lines.join("\n");
}
global.GoldenAgeCore={QUESTION,EMPTY_VOICE,LABELS,BINS,MAP,PLACES,STARTERS,CHECKLIST,byId,makeState,isComplete,isUnlocked,lockReason,sortAnswer,pin,pinned,doneCount,canWrite,move,nearest,buildReport};
})(window);
