/* Grade 8 ELA: six-stage student-authored Plot Evidence Board.
 * The class handout maps The Present and The Landlady. Earlier story options remain available.
 * No story text, fixed answers, teacher keys, student names or persistent data.
 */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const STAGES=[
 {id:"exposition",name:"Exposition",cue:"Who is involved? Where and when are we? What is normal at first?"},
 {id:"inciting",name:"Inciting incident",cue:"Which specific event starts the central conflict?"},
 {id:"rising",name:"Rising action",cue:"Which complication makes the situation harder or raises the stakes?"},
 {id:"climax",name:"Climax",cue:"What choice or turning point changes how the conflict will end?"},
 {id:"falling",name:"Falling action",cue:"What consequences follow from the turning point?"},
 {id:"resolution",name:"Resolution",cue:"What is the new normal—or what does the ending leave unresolved?"}
];
const TEXTS=[
 {id:"present",title:"The Present (short film)",mode:"film",guidance:"Track what the camera lets you see. Which action changes your reading of an earlier moment?"},
 {id:"landlady",title:"The Landlady",mode:"story",guidance:"Where does Dahl leave Billy? Decide which stages the text actually shows. Support your stopping point with a detail."},
 {id:"snack",title:"Snack Attack (short film)",mode:"film",guidance:"Film evidence: identify a concrete action, expression, camera choice or sound. Don't invent dialogue."},
 {id:"thankyou",title:"Thank You, Ma’am",mode:"story",guidance:"Story evidence: accurately describe a moment or check a brief quotation against your own copy."}
];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clamp=n=>Number.isFinite(n)?Math.max(0,Math.min(10,n)):0;
function initial(){
 return STAGES.map(x=>({id:x.id,moment:"",evidence:"",tension:0}));
}
function graph(rows, end=6, first=null){
 if(!Array.isArray(rows)||rows.length!==6)throw Error("Six plot stages required");
 const x=i=>65+i*110,y=t=>208-17*clamp(Number(t));
 const points=(values,last)=>values.slice(0,last).map((r,i)=>x(i)+","+y(r.tension)).join(" ");
 const description=rows.slice(0,end).map((r,i)=>STAGES[i].name+" "+clamp(Number(r.tension))+" of 10").join(", ");
 const firstDescription=first ? " First reading: "+first.rows.slice(0,first.end).map((r,i)=>STAGES[i].name+" "+clamp(Number(r.tension))+" of 10").join(", ")+".":"";

 let s='<svg role="img" aria-label="Your plot tension graph: '+
  description+". Last stage shown: "+STAGES[end-1].name+"."+firstDescription+
  '" viewBox="0 0 690 282" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">';
 s+='<rect width="690" height="282" rx="12" fill="var(--paper)"/>';
 for(const t of [0,2,4,6,8,10]){
  const yy=y(t);
  s+='<line x1="50" y1="'+yy+'" x2="648" y2="'+yy+'" stroke="var(--rule)" stroke-dasharray="4 6"/>'+
   '<text x="43" y="'+(yy+5)+'" text-anchor="end" fill="var(--muted)" font-size="12">'+t+'</text>';
 }
 s+='<text x="50" y="21" fill="var(--ink)" font-size="13" font-weight="700">Tension · your interpretation, not a fixed answer</text>';
 if(first) s+='<polyline points="'+points(first.rows,first.end)+'" fill="none" stroke="var(--muted)" stroke-width="6" stroke-dasharray="8 7" stroke-linecap="round"/>';
 s+='<polyline points="'+points(rows,end)+'" fill="none" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
 for(let i=0;i<rows.length;i++){
  if(i<end) s+='<circle cx="'+x(i)+'" cy="'+y(rows[i].tension)+'" r="6" fill="var(--accent)" stroke="var(--paper)" stroke-width="2"/>';
  s+='<text x="'+x(i)+'" y="238" text-anchor="middle" fill="var(--muted)" font-size="12">'+(i+1)+'</text>';
 }
 s+='<text x="344" y="263" text-anchor="middle" fill="var(--muted)" font-size="12">Plot stages 1–6 (see stage labels below)</text></svg>';
 return s;
}
function report(story,rows,reflection,end=6,first=null){
 const title=TEXTS.find(x=>x.id===story)?.title||"Student story";
 return "GRADE 8 ELA · PLOT EVIDENCE BOARD\nText: "+title+"\n\n"+
 rows.map((r,i)=>i>=end ? (i+1)+". "+STAGES[i].name+" · Left open by the ending" : (i+1)+". "+STAGES[i].name+"\nMoment: "+(r.moment.trim()||"[not filled in]")+
 "\nEvidence: "+(r.evidence.trim()||"[not filled in]")+
 "\nMy tension rating: "+clamp(Number(r.tension))+"/10").join("\n\n")+
 (first ? "\n\nFirst reading · "+first.rows.slice(0,first.end).map((r,i)=>STAGES[i].name+" "+r.tension+"/10").join(", ")+". Last stage shown: "+STAGES[first.end-1].name+"." : "")+
 "\n\nWhy is your chosen climax a turning point? What effect does the ending have?\n"+(reflection.trim()||"[not filled in]");
}
function render(el){
 let story, draft;
 const drafts=new Map();
 const $=q=>el.querySelector(q),all=q=>[...el.querySelectorAll(q)];
 el.innerHTML='<section class="plot-board"><style>'+
 '.plot-board{font-family:var(--f-body);color:var(--ink);line-height:1.5}'+
 '.plot-board h2{font-family:var(--f-title);font-weight:var(--title-w);margin:8px 0 12px}'+
 '.plot-board .pb-field{display:grid;gap:6px;font-size:14px;font-weight:700}'+
 '.plot-board select,.plot-board textarea{font:inherit;font-size:15px;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:7px;padding:10px;max-width:100%}'+
 '.plot-board select{min-height:44px}'+
 '.plot-board textarea{width:100%;min-height:86px;resize:vertical}'+
 '.plot-board button:focus-visible,.plot-board select:focus-visible,.plot-board textarea:focus-visible,.plot-board input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}'+
 '.plot-board .pb-intro{padding:17px;background:var(--soft);border-radius:8px;margin:18px 0}'+
 '.plot-board .pb-chart{overflow-x:auto;border:1px solid var(--rule);border-radius:9px;margin:12px 0;background:var(--paper)}'+
 '.plot-board .pb-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin:15px 0}'+
 '.plot-board .pb-card{border:1px solid var(--rule);border-radius:9px;padding:17px;background:var(--paper);min-width:0}'+
 '.plot-board .pb-card h3{font-family:var(--f-title);font-size:20px;color:var(--ink);border:0;margin:0 0 7px;padding:0;text-transform:none}'+
 '.plot-board .pb-card p{font-size:14px;color:var(--muted);margin:7px 0 14px}'+
 '.plot-board .pb-card .pb-field{margin:12px 0}'+
 '.plot-board .pb-tension{display:flex;align-items:center;flex-wrap:wrap;gap:8px;font-weight:700;font-size:14px}'+
 '.plot-board .pb-tension input{flex:1;min-width:125px;accent-color:var(--accent);min-height:40px}'+
 '.plot-board .pb-end{margin:24px 0 8px;padding:19px;border-radius:9px;background:var(--soft)}'+
 '.plot-board .pb-buttons{display:flex;gap:9px;flex-wrap:wrap;margin:13px 0}'+
 '.plot-board .pb-status{color:var(--accent-ink);font-weight:700;min-height:28px}'+
 '.plot-board [hidden]{display:none!important}.plot-board .pb-adjust{display:flex;align-items:end;flex-wrap:wrap;gap:1rem}.pb-adjust .pb-tension{flex:1 1 12rem}.pb-adjust label{max-width:100%}'+
 '@media(max-width:700px){.plot-board .pb-grid{grid-template-columns:1fr}.plot-board svg text{font-size:22px}}'+
 '</style>'+
 '<h2>Plot Evidence Board</h2>'+
 '<p>Choose a text and plot where its tension rises or falls. Use a moment from the story or film to defend each stage you include.</p>'+
 '<div class="pb-intro"><label class="pb-field">Choose the text<select id="pb-text">'+
 TEXTS.map(x=>'<option value="'+x.id+'">'+esc(x.title)+'</option>').join("")+'</select></label>'+
 '<p id="pb-guidance" class="note"></p>'+
 '<p class="note"><strong>There may be more than one defensible interpretation.</strong> Two readers can place the turning point differently. What detail supports your reading?</p></div>'+
 '<label class="pb-field">Last stage shown in the text<select id="pb-ending"><option value="6">Resolution</option><option value="5">Falling action</option><option value="4">Climax</option></select></label>'+
 '<p class="note">If the story stops early, end the line where the text ends. Explain what that leaves the reader wondering.</p>'+
 '<div class="pb-chart" id="pb-graph"></div>'+
 '<div class="pb-adjust"><label class="pb-field">Adjust a stage<select id="pb-stage">'+STAGES.map((st,i)=>'<option value="'+i+'">'+st.name+'</option>').join("")+'</select></label>'+
 '<label class="pb-tension">Tension <output id="pb-now">0</output>/10<input type="range" id="pb-adjust-rating" min="0" max="10" step="1" aria-label="Tension for the selected stage"></label></div>'+
 '<div class="pb-buttons"><button class="btn ghost" type="button" id="pb-keep">Keep my first curve</button><button class="btn ghost" type="button" id="pb-forget" hidden>Remove first curve</button></div>'+
 '<p id="pb-compare" role="status"></p>'+
 '<div class="pb-grid" id="pb-grid"></div>'+
 '<div class="pb-end"><label class="pb-field">Why did you choose this climax? What effect does the ending have?'+
 '<textarea id="pb-reflection" placeholder="I chose this moment as the climax because…"></textarea></label>'+
 '<div class="pb-buttons"><button class="btn" type="button" id="pb-copy">Copy my plot analysis</button>'+
 '<button class="btn ghost" type="button" id="pb-download">Download my plot analysis</button>'+
 '<button class="btn ghost" type="button" id="pb-reset">Clear this story</button></div>'+
 '<p id="pb-status" class="pb-status" aria-live="polite" role="status"></p>'+
 '<p class="note">Your work stays here while this lesson is open. Download or copy it before leaving.</p></div></section>';
 const cards=STAGES.map((st,i)=>'<section class="pb-card" data-stage="'+i+'"><h3>'+(i+1)+'. '+st.name+'</h3>'+
 '<p>'+st.cue+'</p>'+
 '<label class="pb-field">What happens here?<textarea data-moment="'+i+'" placeholder="Describe a specific moment…"></textarea></label>'+
 '<label class="pb-field">What evidence supports your choice?<textarea data-evidence="'+i+'" placeholder="Describe the action, detail or textual evidence…"></textarea></label>'+
 '<label class="pb-tension">My tension rating: <output data-output="'+i+'">0</output>/10'+
 '<input type="range" min="0" max="10" step="1" value="0" data-tension="'+i+'" aria-label="Tension for '+st.name+'"></label></section>').join("");
 $("#pb-grid").innerHTML=cards;
 function updateGraph(){
  const {rows,end,first}=draft;
  const rating=rows[Number($("#pb-stage").value)].tension;
  $("#pb-now").textContent=rating;$("#pb-adjust-rating").value=rating;
  $("#pb-graph").innerHTML=graph(rows,end,first);
  $("#pb-keep").hidden=Boolean(first);
  $("#pb-forget").hidden=!first;
  if(!first){
   $("#pb-compare").textContent="Set the tension ratings below, keep your curve, then try a second reading.";
   return;
  }
  const changes=rows.slice(0,Math.min(end,first.end)).map((r,i)=>r.tension===first.rows[i].tension ? "" : STAGES[i].name+" "+first.rows[i].tension+" to "+r.tension).filter(Boolean);
  if(first.end!==end) changes.push("ending moved from "+STAGES[first.end-1].name+" to "+STAGES[end-1].name);
  $("#pb-compare").textContent="Dashed line: first reading. Solid line: current reading. "+(changes.length ? changes.join(", ")+". Which detail supports your change?" : "Both readings match.");
 }
 function updateEnding(){
  all("[data-stage]").forEach((card,i)=>card.hidden=i>=draft.end);
  Array.from($("#pb-stage").options).forEach((o,i)=>{o.disabled=i>=draft.end;o.hidden=o.disabled;});
  if(Number($("#pb-stage").value)>=draft.end) $("#pb-stage").value=draft.end-1;
  updateGraph();
 }
 function chooseText(id){
  if(!drafts.has(id)) drafts.set(id,{rows:initial(),end:6,reflection:"",first:null});
  story=id;draft=drafts.get(id);$("#pb-stage").value="0";
  $("#pb-text").value=id;$("#pb-guidance").textContent=TEXTS.find(x=>x.id===id).guidance;
  all("[data-moment]").forEach((x,i)=>x.value=draft.rows[i].moment);
  all("[data-evidence]").forEach((x,i)=>x.value=draft.rows[i].evidence);
  all("[data-tension]").forEach((x,i)=>x.value=draft.rows[i].tension);
  all("[data-output]").forEach((x,i)=>x.textContent=draft.rows[i].tension);
  $("#pb-reflection").value=draft.reflection;$("#pb-ending").value=draft.end;
  $("#pb-status").textContent="";updateEnding();
 }
 $("#pb-text").onchange=e=>chooseText(e.target.value);
 $("#pb-ending").onchange=e=>{draft.end=Number(e.target.value);updateEnding();};
 $("#pb-keep").onclick=()=>{
  draft.first={rows:draft.rows.map(r=>({tension:r.tension})),end:draft.end};updateGraph();
  $("#pb-forget").focus();
 };
 $("#pb-forget").onclick=()=>{draft.first=null;updateGraph();$("#pb-keep").focus();};
 all("[data-moment]").forEach(x=>x.oninput=e=>draft.rows[Number(e.target.dataset.moment)].moment=e.target.value);
 all("[data-evidence]").forEach(x=>x.oninput=e=>draft.rows[Number(e.target.dataset.evidence)].evidence=e.target.value);
 function changeRating(index,value){
  draft.rows[index].tension=Number(value);
  all("[data-output]")[index].textContent=value;
  all("[data-tension]")[index].value=value;
  $("#pb-stage").value=index;updateGraph();
 }
 all("[data-tension]").forEach(x=>x.oninput=()=>changeRating(Number(x.dataset.tension),x.value));
 $("#pb-stage").onchange=updateGraph;
 $("#pb-adjust-rating").oninput=e=>changeRating(Number($("#pb-stage").value),e.target.value);
 $("#pb-reflection").oninput=e=>draft.reflection=e.target.value;
 $("#pb-reset").onclick=()=>{
  if(window.confirm("Clear the writing and curves for this text?")){
   drafts.delete(story);chooseText(story);
  }
 };
 $("#pb-download").onclick=()=>{
  const payload=report(story,draft.rows,draft.reflection,draft.end,draft.first);
  const url=URL.createObjectURL(new Blob([payload],{type:"text/plain;charset=utf-8"}));
  const link=document.createElement("a");link.href=url;link.download=story+"-plot-analysis.txt";
  link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#pb-status").textContent="Plot analysis prepared for download.";
 };
 $("#pb-copy").onclick=()=>{
  const total=draft.rows.slice(0,draft.end).filter(x=>x.moment.trim()&&x.evidence.trim()).length;
  if(total===0){$("#pb-status").textContent="Add at least one stage and some evidence before copying.";return;}
  const payload=report(story,draft.rows,draft.reflection,draft.end,draft.first);
  if(navigator.clipboard?.writeText)navigator.clipboard.writeText(payload).then(()=>$("#pb-status").textContent="Copied. Paste into your class document.").catch(()=>$("#pb-status").textContent="Use Download my plot analysis to save your work.");
  else $("#pb-status").textContent="Use Download my plot analysis to save your work.";
 };
 chooseText(location.hash.includes("stories/snack") ? "snack" : "present");
}
H.lessonTools=H.lessonTools||{};H.lessonTools["stories/plot"]=render;H.lessonTools["stories/snack"]=render;
window.PlotEvidenceCore={STAGES,TEXTS,initial,graph,report};
})();
