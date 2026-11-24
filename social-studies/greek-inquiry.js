(function(){
"use strict";
const $=s=>document.querySelector(s);
const activities=["found","citizens","lot","ostracism"];
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
const siteNeeds=["Harbour","Food","Fresh water","Defence","Trade"];
const disruptions={
 A:{news:"A grain ship due at the island’s harbour is delayed. Nearby households already use the fields and spring.",keep:"Waiting keeps both harbours available. Food stores must now last longer.",adapt:"A smaller shipment or a locally agreed exchange could bridge the delay. The nearby fields are already in use."},
 B:{news:"A river cargo is delayed. The sheltered inlet still has access to sea traffic, but the expected metal for exchange has not arrived.",keep:"Waiting preserves the river trading plan. The missing cargo leaves less to exchange for supplies.",adapt:"Trading a different good may keep supplies moving. Ask the growers who rely on the vines and olives what they can spare."},
 C:{news:"Strong currents at the strait delay supply boats. Nearby fishing crews already rely on the sheltered landing space.",keep:"Waiting leaves the strait open as a future trade route. The settlement still needs food while boats are delayed.",adapt:"Relying more on fish could reduce the need for cargo. More boats would share the landing and fishing grounds."},
 D:{news:"A cart breaks on the route from the port. Supplies reach the coast, but the final journey to the plateau is delayed.",keep:"Waiting keeps the farmland and spring within reach. The supplies at the port still need an overland journey.",adapt:"Changing the load or arranging more carriers could shorten the delay. Nearby households also need carriers and paths."}
};
const councilActions={keep:"Keep the original plan",adapt:"Change the supply plan",move:"Move to another site"};
const peerCriteria=[
 "The explanation uses a detail from a scout’s report to explain a consequence.",
 "It identifies people affected and explains what the council would ask or negotiate.",
 "It weighs a gain against a cost and explains why this choice fits the new problem."
];
let originalPlan=null,decision=null,peerMarks=null;
const peerDraft=peerCriteria.map(()=>false);
const councilDraft={action:"",destination:"",reason:"",people:""};
function city(id){return cities.find(row=>row[0]===id);}
function paragraph(parent,text){const p=document.createElement("p");p.textContent=text;parent.append(p);return p;}
function heading(parent,level,text){const h=document.createElement(level);h.textContent=text;parent.append(h);return h;}
function councilSelect(labelText,id,options,value,onChange){
 const label=document.createElement("label");label.className="write";label.textContent=labelText+" ";
 const select=document.createElement("select");select.id=id;
 for(const [v,t] of options){const o=document.createElement("option");o.value=v;o.textContent=t;select.append(o);}
 select.value=value;select.onchange=()=>onChange(select.value);label.append(select);return label;
}
function showCouncil(root){
 intro("01","Found a City","Reopen the scouts’ reports and put your original decision to a second vote.");
 const source=city(originalPlan.site),event=disruptions[source[0]];
 const record=heading(root,"h3","Your original decision");
 record.id="first-decision";
 paragraph(root,"You chose Site "+source[0]+" · "+source[2]+".");
 paragraph(root,originalPlan.why);
 if(originalPlan.risk)paragraph(root,"Original risk and plan: "+originalPlan.risk);
 const reports=document.createElement("details"),summary=document.createElement("summary");
 summary.textContent="Reopen all four scout reports and your ratings";reports.append(summary);
 for(const [id,detail,name] of cities){
  const p=paragraph(reports,"Site "+id+" · "+name+". "+detail);
  p.append(document.createElement("br"),siteNeeds.map(need=>need+" "+originalPlan.scores[id+":"+need]+"/3").join(" · "));
 }
 root.append(reports);
 const council=document.createElement("section");council.id="second-council";root.append(council);
 const h=heading(council,"h3","A second council meeting");h.tabIndex=-1;
 paragraph(council,"Fictional scenario · "+event.news);
 paragraph(council,"Your original scout reported: “"+source[1]+"”");
 const choices=[["","Choose a response"],...Object.entries(councilActions)];
 const controls=document.createElement("div"),detail=document.createElement("div");detail.id="decision-detail";council.append(controls,detail);
 controls.append(councilSelect("Council response","council-action",choices,councilDraft.action,value=>{
  councilDraft.action=value;councilDraft.destination="";drawDetail();
 }));
 function drawDetail(){
  detail.replaceChildren();const action=councilDraft.action;
  if(!action)return;
  if(action==="move"){
   detail.append(councilSelect("Proposed new site","council-destination",[["","Choose a different site"],...cities.filter(c=>c[0]!==source[0]).map(c=>[c[0],"Site "+c[0]+" · "+c[2]])],councilDraft.destination,value=>{
    councilDraft.destination=value;drawDetail();document.getElementById("council-destination").focus();
   }));
   if(!councilDraft.destination)return;
   const dest=city(councilDraft.destination);
   paragraph(detail,"Destination scout: “"+dest[1]+"”");
   paragraph(detail,"Moving means transporting 200 people again. Weigh what you leave at "+source[2]+" against what the new site offers. Who already depends on the new site?");
  }else paragraph(detail,event[action]);
  for(const [key,title] of [["reason","Which geographic detail supports your response? Explain what you gain and what you give up."],["people","Who else uses this land, water or trade route? What would you ask them before acting?"]]){
   const label=document.createElement("label");label.className="write";label.textContent=title;
   const field=document.createElement("textarea");field.id="council-"+key;field.value=councilDraft[key];field.readOnly=Boolean(decision);
   field.oninput=()=>{councilDraft[key]=field.value;};label.append(field);detail.append(label);
  }
  const feedback=document.createElement("p");feedback.setAttribute("role","status");
  if(!decision){
   detail.append(button("Record council decision",()=>{
    if(!councilDraft.reason.trim()||!councilDraft.people.trim()){feedback.textContent="Record your geographic trade-off and your plan for the people affected.";return;}
    decision={...councilDraft};showResult();
    document.getElementById("council-verdict").focus();
   }),feedback);
  }
 }
 function showResult(){
  controls.querySelector("select").disabled=true;drawDetail();
  const dest=detail.querySelector("select");if(dest)dest.disabled=true;
  const result=document.createElement("section");detail.append(result);
  const title=heading(result,"h3","Council decision recorded");title.id="council-verdict";title.tabIndex=-1;
  const last=decision.destination?city(decision.destination):source;
  paragraph(result,councilActions[decision.action]+". Final site: "+last[2]+".");
  paragraph(result,"Partner review: use the written decision to award one point for each criterion you can show. Any of the three responses can earn full marks.");
  const fieldset=document.createElement("fieldset");const legend=document.createElement("legend");legend.textContent="Evidence in the council decision";fieldset.append(legend);
  const boxes=peerCriteria.map((criterion,i)=>{
   const label=document.createElement("label"),box=document.createElement("input");label.className="peer-mark";box.type="checkbox";
   box.checked=peerDraft[i];label.append(box,criterion);fieldset.append(label);return box;
  });
  const feedback=paragraph(result,"");feedback.id="council-score";feedback.setAttribute("role","status");
  function showScore(){feedback.textContent=peerMarks?"Peer score: "+peerMarks.filter(Boolean).length+" of 3.":"";}
  boxes.forEach((box,i)=>box.onchange=()=>{peerDraft[i]=box.checked;peerMarks=null;showScore();});
  result.append(fieldset,button("Save peer score",()=>{peerMarks=boxes.map(box=>box.checked);showScore();}),feedback);showScore();
 }
 if(decision)showResult();else drawDetail();
}
function councilReport(){
 const source=city(originalPlan.site);
 const lines=["FOUND A CITY","Original site: "+source[2],"Original reasons: "+originalPlan.why,"Original risk and plan: "+(originalPlan.risk||"No entry"),
 ...cities.map(c=>"Site "+c[0]+": "+c[1]+" "+siteNeeds.map(n=>n+" "+originalPlan.scores[c[0]+":"+n]+"/3").join(", ")),
 "Fictional complication: "+disruptions[source[0]].news];
 const d=decision||councilDraft;
 if(d.action)lines.push((decision?"Recorded response: ":"Draft response: ")+councilActions[d.action]);
 if(d.destination)lines.push("Destination: "+city(d.destination)[2]);
 if(d.reason)lines.push("Geographic trade-off: "+d.reason);
 if(d.people)lines.push("People affected and consultation: "+d.people);
 if(peerMarks)lines.push("Peer score: "+peerMarks.filter(Boolean).length+"/3",...peerCriteria.map((criterion,i)=>(peerMarks[i]?"1/1 ":"0/1 ")+criterion));
 return lines.join("\n\n");
}
function siteGame(){
 if(originalPlan){showCouncil(container());return;}
 intro("01","Found a City","Around 650 BCE, you lead 200 Greek settlers. Read four scouts' reports, score each need 1–3, and defend one choice. These are fictional reports about real places.");
 const root=container(),grid=document.createElement("div");grid.className="grid";root.append(grid);
 for(const c of cities){
  const node=card("Site "+c[0],c[1]);
  for(const need of siteNeeds){
   const label=document.createElement("label");label.textContent=need;
   const sel=document.createElement("select");
   for(const [v,t] of [["","Rate 1–3"],["1","1 · Problem"],["2","2 · Fine"],["3","3 · Excellent"]]){
    const o=document.createElement("option");o.value=v;o.textContent=t;sel.append(o);
   }
   const key=c[0]+":"+need;sel.dataset.rating=key;sel.value=scores[key]||"";
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
 const result=document.createElement("p");result.className="hint";result.setAttribute("role","status");
 root.append(button("Reveal the historical cities",()=>{
  const ready=cities.every(c=>siteNeeds.every(n=>scores[c[0]+":"+n]));
  if(!ready||(memory["found-why"]||"").trim().length<20){result.textContent="Score all four sites and write two reasons before the reveal.";return;}
  originalPlan={site:selected,why:memory["found-why"],risk:memory["found-risk"]||"",scores:{...scores}};
  siteGame();document.querySelector("#second-council h3").focus();
 }),result);
}
function citizenGame(){
 intro("05","Citizen for a Day","Athens, 440 BCE. All eight residents are invented, but the citizenship rules reflect the student task. Ask who could participate in the Assembly.");
 const root=container();
 voters.forEach((p,i)=>{
  const el=card(p[0],"Would this resident be allowed to vote?");
  const feedback=document.createElement("p");feedback.className="status";
  function respond(yes){
   votes[i]=yes;feedback.textContent=(yes===p[1]?"Supported. ":"Reconsider. ")+p[2];
   count.textContent=Object.keys(votes).length+" of 8 assessed; "+voters.filter((v,j)=>votes[j]===v[1]).length+" match the rule.";
  }
  const yes=button("Could vote",()=>respond(true)),no=button("Could not vote",()=>respond(false));yes.dataset.person=String(i);no.dataset.person=String(i);el.append(yes,no,feedback);root.append(el);
 });
 const count=document.createElement("p");count.className="status";count.textContent="0 of 8 assessed";root.append(count);
 root.append(card("The Themistocles ostraka","In a well, excavators found 190 pottery votes with the same name, written by only 14 hands. What could explain the pattern? What cannot it prove?"));
 root.append(textArea("citizen-ostraka","What does the pottery evidence suggest?"));
 root.append(textArea("citizen-judgement","Compare democracy in ancient Athens and modern Canada."));
}
function lotGame(){
 intro("06","Draw Your Lot","One identity, two different lives. Whose perspective changes our judgement of Athens and Sparta? Profiles are fictional summaries.");
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
function ostracismGame(){
 intro("05","Mystery in the Well","Athens, around 480 BCE. Investigate a puzzling group of pottery ballots naming Themistocles. Separate what excavators observed from what those clues might mean.");
 const root=container();
 const evidence=card("Evidence from the excavation","The class source reports 190 pottery pieces naming Themistocles, found together in a well. Handwriting comparison suggested they were written by only 14 different people. The pieces seemed unused.");
 root.append(evidence);
 const note=document.createElement("p");note.className="hint";note.textContent="Start with the observations. A shared handwriting pattern raises questions about how the ballots were prepared; by itself, it does not reveal who arranged them or why.";root.append(note);
 const check=card("Quick check · observation or inference?","Which statement repeats an observation from the evidence?");
 const select=document.createElement("select");select.setAttribute("aria-label","Choose the statement that is an observation");
 [["","Choose one"],["obs","190 pieces named Themistocles and were written by about 14 hands."],["inf","One powerful politician organized the ballots to control the vote."],["inf2","Every voter agreed that Themistocles should be exiled."]].forEach(([v,t])=>{const o=document.createElement("option");o.value=v;o.textContent=t;select.append(o);});
 select.value=memory["well-observation-choice"]||"";
 const feedback=document.createElement("p");feedback.className="status";feedback.setAttribute("aria-live","polite");
 select.onchange=()=>{memory["well-observation-choice"]=select.value;feedback.textContent=select.value==="obs"?"Yes. That statement describes the reported clues. The other statements add explanations that the clues do not prove.":select.value?"That goes beyond the reported observations. Look for a statement that simply describes the pieces and handwriting.":"";};
 check.append(select,feedback);root.append(check);
 const check2=card("Quick check · what can the evidence establish?","Choose the most careful conclusion based on these clues.");
 const select2=document.createElement("select");select2.setAttribute("aria-label","Choose the conclusion best supported by the evidence");
 [["","Choose one"],["careful","The group is unusual and worth investigating, but the clues alone do not show who prepared the ballots or why."],["over","The evidence proves Themistocles' opponents secretly planned the vote."],["over2","The evidence proves all 190 pieces were written by one person."]].forEach(([v,t])=>{const o=document.createElement("option");o.value=v;o.textContent=t;select2.append(o);});
 select2.value=memory["well-conclusion-choice"]||"";
 const feedback2=document.createElement("p");feedback2.className="status";feedback2.setAttribute("aria-live","polite");
 select2.onchange=()=>{memory["well-conclusion-choice"]=select2.value;feedback2.textContent=select2.value==="careful"?"Supported: the pattern invites questions, while motive and organizer remain uncertain.":select2.value?"That claim says more than the reported clues can establish. Try a conclusion that keeps the unanswered questions open.":"";};
 check2.append(select2,feedback2);root.append(check2);
 const possible=card("Build two explanations","The next ideas are hypotheses, not facts. Choose one possibility to test, then create a different explanation of your own.");
 const hypothesis=document.createElement("select");hypothesis.setAttribute("aria-label","Select a possible hypothesis");
 [["","Select a possible hypothesis"],["shared","Some ballots may have been prepared together before the gathering."],["helped","Some voters may have received help writing their names."],["other","I have a different explanation."]].forEach(([v,t])=>{const o=document.createElement("option");o.value=v;o.textContent=t;hypothesis.append(o);});
 hypothesis.value=memory["well-hypothesis-choice"]||"";
 hypothesis.onchange=()=>memory["well-hypothesis-choice"]=hypothesis.value;
 possible.append(hypothesis);root.append(possible);
 root.append(textArea("well-observations","List two observations from the excavation report"),textArea("well-hypothesis","Explain your selected hypothesis. Which clue fits it, and what remains uncertain?"),textArea("well-alternative","Offer a different explanation. What clue might fit it?"));
 const evidenceNeed=document.createElement("label");evidenceNeed.className="write";evidenceNeed.textContent="How strongly do the current clues support your selected hypothesis?";
 const strength=document.createElement("select");strength.setAttribute("aria-label","Rate how strongly the evidence supports the hypothesis");
 [["","Choose a rating"],["limited","Limited: it is possible, but the clues do not distinguish it from alternatives."],["some","Some: at least one clue fits, though other explanations remain."],["strong","Strong: several clues fit and important alternatives have been ruled out."]].forEach(([v,t])=>{const o=document.createElement("option");o.value=v;o.textContent=t;strength.append(o);});
 strength.value=memory["well-strength"]||"";strength.onchange=()=>memory["well-strength"]=strength.value;evidenceNeed.append(strength);root.append(evidenceNeed);
 root.append(textArea("well-next-evidence","What additional evidence would help distinguish the explanations?"),textArea("well-conclusion","Write a careful conclusion. Use an observation, explain what it may suggest, and name one limit."));
 const caution=document.createElement("p");caution.className="hint";caution.textContent="Historical interpretation: the pottery clues do not identify the people who prepared the pieces or establish their motive. Treat each explanation as a hypothesis until more evidence is available.";root.append(caution);
}
function report(){
 return ["GRADE 8 ANCIENT GREECE — INQUIRY RESPONSE","Activity: "+tab,"Selected colony: "+selected,"Role: "+lives[role][0],
 "Scoring: "+JSON.stringify(scores),"Voting: "+JSON.stringify(votes),
 ...(originalPlan?[councilReport()]:[]),
 ...Object.entries(memory).map(([k,v])=>k+"\n"+v),
 (tab==="ostracism"?"Historical clues are observations; proposed explanations are student hypotheses.":"Fictional examples are teaching simulations.")].join("\n\n");
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
 if(tab==="found")siteGame();else if(tab==="citizens")citizenGame();else if(tab==="lot")lotGame();else ostracismGame();
}
document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{tab=b.dataset.tab;location.hash=tab;render();}));
window.addEventListener("hashchange",()=>{const value=location.hash.slice(1);if(activities.includes(value)&&tab!==value){tab=value;render();}});
render();
})();