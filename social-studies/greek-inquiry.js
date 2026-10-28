(function(){
"use strict";
const $=s=>document.querySelector(s);
const activities=["found","citizens","lot"];
const cities=[
["A","Island with two harbours, a spring and access to farmland; people already live nearby.","Syracuse, Sicily"],
["B","Sheltered rocky inlet, vines and olives; nearby river trade in metal.","Massalia, now Marseille"],
["C","Trade strait between seas, good fishing and strong currents.","Byzantium, now Istanbul"],
["D","Fertile plateau, plentiful rain and a spring, but far from the port.","Cyrene, Libya"]
];
const voters=[
["Nikias, 35: farmer with two Athenian citizen parents",true,"Adult male citizen"],
["Melitta, 40: woman born to citizen parents",false,"Women did not vote"],
["Sosias, 28: enslaved mine worker",false,"Enslaved people were excluded"],
["Kephalos, 50: rich shield-maker from Sicily",false,"Foreign residents could not vote"],
["Lysis, 16: son of citizens",false,"Not an adult citizen"],
["Theron, 25: poor rower with two citizen parents",true,"Poor adult men could vote if citizens"],
["Aristion, 30: citizen father, mother from Thrace",false,"Both parents were required in 440 BCE"],
["Hippias, 60: citizen potter who cannot read",true,"Literacy was not required"]
];
const lives=[
["Citizen man, 35","Farm or workshop; can vote, be a juror and serve in the navy or army.","Trained citizen soldier; helots farm his land; communal army meals."],
["Citizen wife, 30","Household work; limited public rights; cannot vote.","May own and manage land; athletic training; cannot vote."],
["Citizen boy, 10","Schooling if family pays; returns home at night.","Lives with training group in the agoge."],
["Citizen girl, 14","Household preparation and often early marriage.","Athletic training; may later own property."],
["Unfree person","Enslaved worker in home, shop, farm or mine.","Helot forced to farm and surrender part of harvest."],
["Free outsider","A metic can trade but cannot vote.","A perioikos can trade and serve in army but cannot vote."]
];
const memory={},scores={},votes={};let tab=activities.includes(location.hash.slice(1))?location.hash.slice(1):"found";
let selected="A",role=0;
function textArea(key,label){
 const wrap=document.createElement("label");wrap.className="write";wrap.textContent=label;
 const ta=document.createElement("textarea");ta.dataset.key=key;ta.placeholder="Use details from the sources to explain your reasoning.";
 ta.value=memory[key]||"";ta.addEventListener("input",()=>memory[key]=ta.value);
 wrap.append(ta);return wrap;
}
function button(title,callback){
 const b=document.createElement("button");b.type="button";b.textContent=title;b.addEventListener("click",callback);return b;
}
function card(title,detail){
 const box=document.createElement("article");box.className="card";
 const h=document.createElement("h3");h.textContent=title;box.append(h);
 const p=document.createElement("p");p.textContent=detail;box.append(p);
 return box;
}
function intro(n,title,description){
 $("#intro").replaceChildren();
 const el=document.createElement("section");el.className="panel";
 const h=document.createElement("h2");h.textContent=n+" · "+title;
 const p=document.createElement("p");p.textContent=description;el.append(h,p);$("#intro").append(el);
}
function container(){
 $("#content").replaceChildren();const el=document.createElement("section");el.className="panel";$("#content").append(el);return el;
}
function siteGame(){
 intro("01","Found a City","Based on your U3L01 task: around 650 BCE, you lead 200 Greek settlers. Read four scouts' reports, score each need 1–3, and defend one choice. These are fictional reports about real places.");
 const root=container(),grid=document.createElement("div");grid.className="grid";root.append(grid);
 for(const c of cities){
  const node=card("Site "+c[0],c[1]);
  for(const need of ["Harbour","Food","Fresh water","Defence","Trade"]){
   const label=document.createElement("label");label.textContent=need;
   const sel=document.createElement("select");
   for(const [v,t] of [["","Rate 1–3"],["1","1 · Problem"],["2","2 · Fine"],["3","3 · Excellent"]]){
    const o=document.createElement("option");o.value=v;o.textContent=t;sel.append(o);
   }
   const key=c[0]+":"+need;sel.value=scores[key]||"";
   sel.setAttribute("aria-label","Site "+c[0]+" "+need);
   sel.onchange=()=>scores[key]=sel.value;
   label.append(sel);node.append(label);
  }
  grid.append(node);
 }
 const choice=document.createElement("select");
 for(const c of cities){const o=document.createElement("option");o.value=c[0];o.textContent="Site "+c[0];choice.append(o);}
 choice.value=selected;choice.onchange=()=>selected=choice.value;
 const lbl=document.createElement("label");lbl.className="write";lbl.textContent="My chosen site ";lbl.append(choice);
 root.append(lbl,textArea("found-why","My two evidence-based reasons"),textArea("found-risk","Biggest risk and plan"));
 const result=document.createElement("p");result.className="hint";
 root.append(button("Reveal the historical cities",()=>{
  const ready=cities.every(c=>["Harbour","Food","Fresh water","Defence","Trade"].every(n=>scores[c[0]+":"+n]));
  if(!ready||(memory["found-why"]||"").trim().length<20){result.textContent="Score all four sites and write two reasons before the reveal.";return;}
  result.textContent="You chose "+cities.find(c=>c[0]===selected)[2]+". The sites were A = Syracuse; B = Massalia; C = Byzantium; D = Cyrene. All four became real settlements. There is no single best choice. Consider impacts on communities already living there.";
 }),result);
}
function citizenGame(){
 intro("05","Citizen for a Day","Based on U3L05: Athens, 440 BCE. All eight residents are invented, but the citizenship rules reflect the student task. Ask who could participate in the Assembly.");
 const root=container();
 voters.forEach((p,i)=>{
  const el=card(p[0],"Would this resident be allowed to vote?");
  const feedback=document.createElement("p");feedback.className="status";
  function respond(yes){
   votes[i]=yes;feedback.textContent=(yes===p[1]?"Supported. ":"Reconsider. ")+p[2];
   count.textContent=Object.keys(votes).length+" of 8 assessed; "+voters.filter((v,j)=>votes[j]===v[1]).length+" match the rule.";
  }
  el.append(button("Could vote",()=>respond(true)),button("Could not vote",()=>respond(false)),feedback);root.append(el);
 });
 const count=document.createElement("p");count.className="status";count.textContent="0 of 8 assessed";root.append(count);
 root.append(card("The Themistocles ostraka","In a well, excavators found 190 pottery votes with the same name, written by only 14 hands. What could explain the pattern? What cannot it prove?"));
 root.append(textArea("citizen-ostraka","What does the pottery evidence suggest?"));
 root.append(textArea("citizen-judgement","Compare democracy in ancient Athens and modern Canada."));
}
function lotGame(){
 intro("06","Draw Your Lot","Based on U3L06: one identity, two different lives. Whose perspective changes our judgement of Athens and Sparta? Profiles are fictional summaries.");
 const root=container();
 const identity=document.createElement("h3"),a=card("Athens",""),s=card("Sparta","");
 function refresh(){identity.textContent="Your role: "+lives[role][0];a.querySelector("p").textContent=lives[role][1];s.querySelector("p").textContent=lives[role][2];}
 const grid=document.createElement("div");grid.className="grid";grid.append(a,s);
 root.append(identity,button("Draw a different identity",()=>{const before=role;while(role===before)role=Math.floor(Math.random()*lives.length);refresh();}),grid);
 refresh();
 root.append(textArea("lot-athens","A day in Athens as this person (4–5 sentences)"));
 root.append(textArea("lot-sparta","A day in Sparta as this person (4–5 sentences)"));
 root.append(textArea("lot-choose","Which city would you choose? Two reasons."));
 root.append(textArea("lot-perspective","Would another person choose differently? Why?"));
 const p=document.createElement("p");p.className="hint";p.textContent="Caution: The profiles simplify historical experiences. Forced labour and enslavement were systems of coercion and harm, not game roles in real life.";root.append(p);
}
function report(){
 return ["GRADE 8 ANCIENT GREECE — INQUIRY RESPONSE","Activity: "+tab,"Selected colony: "+selected,"Role: "+lives[role][0],
 "Scoring: "+JSON.stringify(scores),"Voting: "+JSON.stringify(votes),
 ...Object.entries(memory).map(([k,v])=>k+"\\n"+v),
 "Class source: U3L01 Found a City; U3L05 Citizen for a Day; U3L06 Draw Your Lot. Fictional examples are teaching simulations."].join("\n\n");
}
$("#download").onclick=()=>{
 const url=URL.createObjectURL(new Blob([report()],{type:"text/plain;charset=utf-8"}));
 const a=document.createElement("a");a.href=url;a.download="ancient-greece-inquiry.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
 $("#status").textContent="Saved. Hand in using your teacher's instructions.";
};
$("#copy").onclick=()=>{
 if(!navigator.clipboard?.writeText){$("#status").textContent="Copy unavailable. Choose Download.";return;}
 navigator.clipboard.writeText(report()).then(()=>$("#status").textContent="Copied.").catch(()=>$("#status").textContent="Clipboard unavailable. Choose Download.");
};
function render(){
 document.querySelectorAll("[data-tab]").forEach(b=>b.setAttribute("aria-current",String(b.dataset.tab===tab)));
 if(tab==="found")siteGame();else if(tab==="citizens")citizenGame();else lotGame();
}
document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{tab=b.dataset.tab;location.hash=tab;render();}));
window.addEventListener("hashchange",()=>{const value=location.hash.slice(1);if(activities.includes(value)&&tab!==value){tab=value;render();}});
render();
})();