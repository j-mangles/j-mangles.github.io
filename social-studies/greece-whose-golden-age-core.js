/* Whose Golden Age? A Walk Through Athens: evidence, unlock order and testable logic.
 * Grade 8 Social Studies, Ancient Greece. Built from the teacher's U3 lessons:
 * L5 Athens and Democracy, L8 The Golden Age of Athens, L10 Left Out.
 * Manitoba outcomes: 8-KC-001, 8-KC-002, 8-KC-003, 8-VC-001.
 * The world is a composite sketch (evidence spans about 550 to 403 BCE), not surveyed and not to scale.
 * No invented ancient people, dialogue or quotations. The one character is a labelled present-day dig supervisor. Every card carries a label and a lesson tag.
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
const TILE=32,W=64,H=40;
const T={ground:0,road:1,sea:2,hill:3,wall:4,tree:5,gate:6,plaza:7};
const START={tx:7,ty:31},GATE={tx:45,ty:28},CAMP={tx:6,ty:30};
/* The only character in the activity. Present-day and invented; no ancient person speaks anywhere. */
const SUPERVISOR={title:"The dig supervisor",label:"Invented character",role:"A present-day archaeologist. Not a real person, and not a voice from ancient Athens.",
 lines:{
  start:"Welcome to the dig. I have set out survey markers at five places. Each marker stands for one piece of evidence about Athens. Our question: whose golden age was it? Start on the Acropolis. Follow the road north-east and take the ramp on the west side of the hill.",
  acropolis:"Good work on the Acropolis. The Assembly, the household and the metic's workshop are open now. Take them in any order.",
  city:"That is one more city place done. Keep going until all three are finished.",
  gate:"All three city places are done, so the road to the Laurion mines is open. It runs south-east past the ridge. That is the last stop.",
  laurion:"That is everything. Open your notebook and answer the question.",
  closed:"The mine road stays closed until the three city places are done.",
  sort:"You found every marker here. Now sort what the evidence can and cannot tell us, and pin one card.",
  idle:"Markers you have not checked show a flag. The list beside the map tells you what is left."
 }};
const PLACES=[
 {id:"acropolis",n:1,title:"The Acropolis",short:"Acropolis",lesson:"L8",cx:32,cy:19,rx:10,ry:6,entry:{tx:23,ty:20},needs:[],
  intro:"The buildings on this hill are what most people picture when they hear “golden age”. Start with two questions: who paid, and who built?",
  items:[
   {id:"league",tx:34,ty:18,kind:"paraphrase",lesson:"L8",title:"From league to empire",
    text:"The Delian League began as an alliance against Persia. Members paid tribute in ships or money. In 454 BCE (the traditional date) Athens moved the League treasury from Delos to Athens. The league became an empire.",
    cite:"Paraphrased from the Lesson 8 notes."},
   /* TODO(teacher): the brief names the debate but not its two sides. Add each side's argument from the L8 Follow the Money task if you want it on this card. */
   {id:"debate",tx:28,ty:20,kind:"paraphrase",lesson:"L8",title:"The debate over the building fund",
    text:"Plutarch describes a debate over whether money collected from the allies should pay for building in Athens.",
    cite:"Paraphrased from Plutarch, Pericles 12. Plutarch wrote about 500 years later, so this is a reconstruction, not a transcript."},
   /* TODO(teacher): confirm from the L8 guide who is listed as receiving the equal wage and the amount; neither was in the brief, so neither is stated here. */
   {id:"accounts",tx:30,ty:18,kind:"source",lesson:"L8",title:"The Erechtheion accounts",
    text:"Building accounts from 409 to 406 BCE are the evidence that workers were paid an equal daily wage. They are the accounts for the Erechtheion, not the Parthenon. The Parthenon was built earlier, in 447 to 432 BCE.",
    cite:"Erechtheion building accounts, 409 to 406 BCE."}
  ],
  sort:[
   {id:"a1",text:"The Erechtheion accounts record an equal daily wage.",bin:"shows",why:"That is written in the accounts themselves."},
   {id:"a2",text:"Workers on the Parthenon were paid the same way.",bin:"infer",why:"The accounts are for a different building, years later. Applying them to the Parthenon is an inference."},
   {id:"a3",text:"The exact words spoken in the debate over the building fund.",bin:"unknown",why:"Plutarch wrote about 500 years later. His version is a reconstruction, not a transcript."},
   {id:"a4",text:"Plutarch's account describes a debate about spending the allies' money on building.",bin:"shows",why:"That is what his text says, whether or not the debate went exactly that way."}
  ]},
 {id:"assembly",n:2,title:"The Assembly and the ostraka well",short:"Assembly and well",lesson:"L5",cx:12,cy:12,rx:7,ry:5,entry:{tx:18,ty:13},needs:["acropolis"],
  intro:"Male citizens met in the Assembly to vote. One of those votes was ostracism: sending a man away from Athens for ten years.",
  items:[
   {id:"voters",tx:11,ty:13,kind:"paraphrase",lesson:"L5",title:"Who could vote",
    text:"Adult men with two Athenian parents could vote. Women, enslaved people, children and resident foreigners could not.",
    cite:"Paraphrased from the Lesson 5 notes."},
   /* TODO(teacher): the find is not placed at a specific spot on the map (schematic). Verify the find-spot before adding one. */
   {id:"ostraka",tx:15,ty:14,kind:"source",lesson:"L5",title:"190 ostraka in a well",
    text:"In 1937 archaeologists found 190 ostraka (pottery votes) naming Themistocles. They were written in only 14 handwritings.",
    cite:"Broneer's 1938 report on the find."},
   {id:"seventh",tx:9,ty:11,kind:"interpretation",lesson:"L5",title:"About one person in seven",
    text:"A common estimate is that citizens were roughly one person in seven. Estimates vary.",
    cite:"A modern estimate, not an ancient count."}
  ],
  sort:[
   {id:"b1",text:"190 ostraka name Themistocles.",bin:"shows",why:"The name is written on the pottery itself."},
   {id:"b2",text:"A small group prepared the ostraka ahead of time.",bin:"infer",why:"Only 14 handwritings on 190 ostraka points that way, but the pottery does not say who made them."},
   {id:"b3",text:"Why those writers wanted Themistocles gone.",bin:"unknown",why:"Shared handwriting raises questions. It does not establish a motive."},
   {id:"b4",text:"Citizens were roughly one person in seven.",bin:"infer",why:"It is an estimate, and estimates vary."}
  ]},
 {id:"household",n:3,title:"A household and a grave",short:"Household and grave",lesson:"L10",cx:32,cy:5,rx:8,ry:4,entry:{tx:30,ty:8},needs:["acropolis"],
  intro:"Citizen women generally lacked political rights. Most surviving Athenian writing came from literate male citizens, so historians turn to objects.",
  items:[
   /* TODO(teacher): add a one-line description of the stele's scene from the L10 slide; the brief gave only the standing figure. */
   {id:"hegeso",tx:35,ty:5,kind:"source",lesson:"L10",title:"The grave stele of Hegeso",
    text:"A gravestone. Gravestones can show names, images and what a family valued. One figure on this stele is standing.",
    cite:"Grave stele of Hegeso."},
   {id:"attendant",tx:37,ty:6,kind:"interpretation",lesson:"L10",title:"Reading the standing figure",
    text:"The standing figure is usually read as an enslaved attendant. That is the common reading, not a certainty.",
    cite:"How historians usually read the stele."},
   {id:"flask",tx:28,ty:7,kind:"source",lesson:"L10",title:"The Amasis Painter oil flask",
    text:"An oil flask painted with a scene of wool-working, made about 550 to 530 BCE. That is over a century before Pericles.",
    cite:"Oil flask by the Amasis Painter, about 550 to 530 BCE."},
   {id:"women-voice",tx:31,ty:7,kind:"interpretation",lesson:"L10",empty:true,title:"Women in this evidence",
    text:EMPTY_VOICE,
    cite:"A note about the evidence in this activity."}
  ],
  sort:[
   {id:"c1",text:"The oil flask shows wool-working.",bin:"shows",why:"The scene is painted on the flask."},
   {id:"c2",text:"The standing figure on the stele is an enslaved attendant.",bin:"infer",why:"That is the common reading, not a certainty."},
   {id:"c3",text:"Households in Pericles' time worked wool the way the flask shows.",bin:"infer",why:"The flask is over a century older than Pericles. Using it for his time is an inference."},
   {id:"c4",text:"What the women connected to these objects thought about their lives.",bin:"unknown",why:EMPTY_VOICE}
  ]},
 {id:"workshop",n:4,title:"A metic's workshop",short:"Metic's workshop",lesson:"L10",cx:50,cy:12,rx:6,ry:5,entry:{tx:46,ty:13},needs:["acropolis"],
  intro:"Metics were free foreign residents. They could trade and they paid taxes, but they had no citizen vote. Wealth alone did not change that.",
  items:[
   {id:"lysias",tx:49,ty:13,kind:"paraphrase",lesson:"L10",title:"Lysias, Against Eratosthenes",
    text:"About 403 BCE. Ten metics were arrested for their property. A workshop with 120 enslaved workers was seized. Lysias escaped. His brother was executed without trial.",
    cite:"Short paraphrase of a court speech by Lysias, about 403 BCE."},
   {id:"speaker",tx:52,ty:13,kind:"interpretation",lesson:"L10",title:"Who is speaking",
    text:"Lysias was a metic arguing a court case. He wanted to win it, so read his speech as one side's argument.",
    cite:"A caution about the source."},
   {id:"metic",tx:51,ty:15,kind:"paraphrase",lesson:"L10",title:"What a metic was",
    text:"A free foreign resident of Athens without voting rights. Metics could trade and paid taxes.",
    cite:"Paraphrased from the Lesson 10 notes."}
  ],
  sort:[
   {id:"d1",text:"Lysias says his brother was executed without trial.",bin:"shows",why:"That claim is in the speech."},
   {id:"d2",text:"Being wealthy did not keep a metic safe.",bin:"infer",why:"It fits what the speech describes, but it is a conclusion drawn from one case."},
   {id:"d3",text:"Whether the other side would agree with Lysias' version.",bin:"unknown",why:"Only his speech is used here, and he was arguing a case."},
   {id:"d4",text:"What the 120 enslaved workers thought when the workshop was seized.",bin:"unknown",why:"The paraphrase gives them only as a number."}
  ]},
 {id:"laurion",n:5,title:"The Laurion silver mines",short:"Laurion mines",lesson:"L10",cx:55,cy:28,rx:10,ry:8,entry:{tx:47,ty:28},needs:["assembly","household","workshop"],
  intro:"The walk ends away from the city, at the mines.",
  items:[
   {id:"silver",tx:53,ty:28,kind:"paraphrase",lesson:"L10",title:"Silver and the navy",
    text:"Enslaved miners dug the silver at Laurion. That silver helped pay for the navy.",
    cite:"Paraphrased from the Lesson 10 notes."},
   {id:"third",tx:57,ty:29,kind:"interpretation",lesson:"L10",title:"How many people were enslaved?",
    text:"Estimates of Athens' enslaved population vary widely, roughly 20 to 40 percent. “Perhaps one in three” is a middle figure.",
    cite:"Modern estimates, not an ancient count."},
   {id:"miners-voice",tx:55,ty:31,kind:"interpretation",lesson:"L10",empty:true,title:"Miners in this evidence",
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

/* ---------- world ---------- */
function buildGrid(){
 const g=[];for(let y=0;y<H;y++){g.push(new Array(W).fill(T.ground));}
 const set=(x,y,t)=>{if(x>=0&&y>=0&&x<W&&y<H)g[y][x]=t;};
 const rect=(x0,y0,x1,y1,t)=>{for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)set(x,y,t);};
 const blob=(cx,cy,rx,ry,t)=>{for(let y=cy-ry;y<=cy+ry;y++)for(let x=cx-rx;x<=cx+rx;x++)if(((x-cx)/rx)**2+((y-cy)/ry)**2<=1)set(x,y,t);};
 for(let x=0;x<W;x++)for(let y=36;y<H;y++)set(x,y,T.sea);
 for(const [x,y,rx,ry] of [[9,21,3,2],[3,6,3,3],[44,4,3,2],[58,5,4,3],[36,30,4,2],[17,30,3,2],[60,16,3,2],[20,3,3,2]])blob(x,y,rx,ry,T.hill);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const r=((x-32)/8)**2+((y-19)/4.5)**2;if(r<1)g[y][x]=r<.72?T.plaza:T.hill;}
 for(let y=21;y<=35;y++)set(45,y,T.hill);for(let x=45;x<W;x++)set(x,21,T.hill);
 for(const [x,y,rx,ry] of [[61,24,2,2],[50,33,3,2],[60,33,3,2]])blob(x,y,rx,ry,T.hill);
 rect(8,9,17,15,T.plaza);rect(33,3,38,7,T.plaza);rect(47,12,54,15,T.plaza);
 const road=(pts)=>{for(let i=1;i<pts.length;i++){let [x,y]=pts[i-1];const [x1,y1]=pts[i];set(x,y,T.road);while(x!==x1||y!==y1){if(x!==x1)x+=Math.sign(x1-x);else y+=Math.sign(y1-y);set(x,y,T.road);}}};
 road([[8,31],[8,24],[22,24],[22,19],[27,19]]);road([[22,19],[22,13],[18,13]]);road([[22,13],[22,8],[32,8]]);
 road([[22,24],[42,24],[42,13],[46,13]]);road([[42,24],[42,28],[52,28]]);
 rect(30,20,35,21,T.wall);rect(30,16,31,17,T.wall);rect(12,9,13,9,T.wall);set(16,14,T.wall);
 rect(26,3,29,5,T.wall);set(35,4,T.wall);rect(48,9,53,11,T.wall);rect(54,25,57,26,T.wall);rect(4,29,5,30,T.wall);set(CAMP.tx,CAMP.ty,T.wall);
 for(let i=0;i<70;i++){const x=(i*37+11)%W,y=(i*23+5)%36;if(g[y][x]===T.ground&&!PLACES.some(p=>Math.abs(x-p.cx)<=p.rx&&Math.abs(y-p.cy)<=p.ry)&&Math.hypot(x-START.tx,y-START.ty)>4)g[y][x]=T.tree;}
 set(GATE.tx,GATE.ty,T.gate);
 return g;
}
const GRID=buildGrid();
function walkable(tx,ty,gateOpen){
 if(tx<0||ty<0||tx>=W||ty>=H)return false;
 const t=GRID[ty][tx];
 return t===T.ground||t===T.road||t===T.plaza||(t===T.gate&&!!gateOpen);
}
function findPath(from,to,gateOpen){
 if(!walkable(to.tx,to.ty,gateOpen))return null;
 const key=(x,y)=>y*W+x,prev=new Map([[key(from.tx,from.ty),-1]]),q=[[from.tx,from.ty]];
 for(let i=0;i<q.length;i++){
  const [x,y]=q[i];
  if(x===to.tx&&y===to.ty){const out=[];let k=key(x,y);while(k!==-1){out.push({tx:k%W,ty:Math.floor(k/W)});k=prev.get(k);}return out.reverse();}
  for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,k=key(nx,ny);if(!prev.has(k)&&walkable(nx,ny,gateOpen)){prev.set(k,key(x,y));q.push([nx,ny]);}}
 }
 return null;
}
function centre(t){return {x:t.tx*TILE+TILE/2,y:t.ty*TILE+TILE/2};}
/* Slide a 20 px body through the tile grid, one axis at a time. */
function step(pos,dx,dy,gateOpen){
 const r=10,free=(x,y)=>[[-r,-r],[r,-r],[-r,r],[r,r]].every(([ox,oy])=>walkable(Math.floor((x+ox)/TILE),Math.floor((y+oy)/TILE),gateOpen));
 let x=pos.x,y=pos.y;
 if(dx&&free(x+dx,y))x+=dx;
 if(dy&&free(x,y+dy))y+=dy;
 return {x,y};
}
function nearestItem(pos,range){
 let best=null,d=range||TILE*1.6;
 for(const p of PLACES)for(const i of p.items){const c=centre(i),q=Math.hypot(c.x-pos.x,c.y-pos.y);if(q<d){d=q;best={place:p,item:i};}}
 return best;
}
function nearCamp(pos){const c=centre(CAMP);return Math.hypot(c.x-pos.x,c.y-pos.y)<TILE*2;}

/* ---------- progress ---------- */
function byId(id){const p=PLACES.find(x=>x.id===id);if(!p)throw new Error("Unknown place: "+id);return p;}
function makeState(){return {found:{},sorted:{},pins:{},briefed:false,pos:centre(START)};}
function count(o){return Object.keys(o||{}).length;}
function allFound(state,id){return count(state.found[id])===byId(id).items.length;}
function isComplete(state,id){const p=byId(id);return allFound(state,id)&&count(state.sorted[id])===p.sort.length&&!!state.pins[id];}
function isUnlocked(state,id){return byId(id).needs.every(n=>isComplete(state,n));}
function gateOpen(state){return isUnlocked(state,"laurion");}
function lockReason(state,id){
 const missing=byId(id).needs.filter(n=>!isComplete(state,n)).map(n=>byId(n).title);
 return missing.length?"Not open yet. Finish first: "+missing.join(", ")+".":"";
}
function find(state,placeId,itemId){
 const p=byId(placeId);
 if(!isUnlocked(state,placeId))throw new Error("Place is locked: "+placeId);
 if(!p.items.some(i=>i.id===itemId))throw new Error("Unknown card: "+itemId);
 (state.found[placeId]=state.found[placeId]||{})[itemId]=true;
 return {found:count(state.found[placeId]),of:p.items.length,all:allFound(state,placeId)};
}
function sortAnswer(state,placeId,stmtId,binId){
 const p=byId(placeId);
 if(!isUnlocked(state,placeId))throw new Error("Place is locked: "+placeId);
 if(!allFound(state,placeId))throw new Error("Find every marker first: "+placeId);
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
 if(!(state.found[placeId]||{})[itemId])throw new Error("Find that marker first: "+itemId);
 state.pins[placeId]=itemId;
 return {complete:isComplete(state,placeId)};
}
function pinned(state){
 return PLACES.filter(p=>state.pins[p.id]).map(p=>({place:p,item:p.items.find(i=>i.id===state.pins[p.id])}));
}
function doneCount(state){return PLACES.filter(p=>isComplete(state,p.id)).length;}
function canWrite(state){return doneCount(state)===PLACES.length;}
/* What the player should do next, as one plain sentence. */
function task(state){
 if(!state.briefed)return "Talk to the dig supervisor at the camp.";
 if(canWrite(state))return "Open your notebook and answer the question.";
 const open=PLACES.filter(p=>isUnlocked(state,p.id)&&!isComplete(state,p.id));
 const one=p=>!allFound(state,p.id)?p.title+": find the markers ("+count(state.found[p.id])+" of "+p.items.length+").":p.title+": sort the statements and pin one card.";
 return open.length===1?one(open[0]):"Any order: "+open.map(p=>p.short).join(", ")+".";
}
/* The supervisor line that follows finishing a place. */
function afterPlace(state,id){
 if(id==="acropolis")return SUPERVISOR.lines.acropolis;
 if(id==="laurion")return SUPERVISOR.lines.laurion;
 return gateOpen(state)?SUPERVISOR.lines.gate:SUPERVISOR.lines.city;
}
function buildReport(state,name,text){
 const lines=["Whose Golden Age? A Walk Through Athens","Name: "+String(name||"").trim(),"Question: "+QUESTION,"","My evidence cards"];
 for(const x of pinned(state))lines.push(x.place.n+". "+x.place.title+": "+x.item.title+" ["+LABELS[x.item.kind]+", Lesson "+x.item.lesson.slice(1)+"] "+x.item.text);
 lines.push("","My answer",String(text||"").trim(),"");
 return lines.join("\n");
}
global.GoldenAgeCore={QUESTION,EMPTY_VOICE,LABELS,BINS,TILE,W,H,T,START,GATE,CAMP,SUPERVISOR,GRID,PLACES,STARTERS,CHECKLIST,walkable,findPath,centre,step,nearestItem,nearCamp,byId,makeState,allFound,isComplete,isUnlocked,gateOpen,lockReason,find,sortAnswer,pin,pinned,doneCount,canWrite,task,afterPlace,buildReport};
})(window);
