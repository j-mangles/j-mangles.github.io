/* Grade 8 ELA: six-stage student-authored Plot Evidence Board.
 * Grounded in Plot_Structure_Student_Sheet: Finding Nemo stage vocabulary;
 * Snack Attack group mapping; Thank You Ma'am independent mapping.
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
 {id:"snack",title:"Snack Attack (short film)",mode:"film",guidance:"Film evidence: identify a concrete action, expression, camera choice or sound. Don't invent dialogue."},
 {id:"thankyou",title:"Thank You, Ma’am",mode:"story",guidance:"Story evidence: accurately describe a moment or check a brief quotation against your own copy."}
];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;',"\'":"&#39;"}[c]));
const clamp=n=>Number.isFinite(n)?Math.max(0,Math.min(10,n)):0;
function initial(){
 return STAGES.map(x=>({id:x.id,moment:"",evidence:"",tension:0}));
}
function graph(rows){
 if(!Array.isArray(rows)||rows.length!==6)throw Error("Six plot stages required");
 const x=i=>65+i*110,y=t=>208-17*clamp(Number(t));
 const points=rows.map((r,i)=>x(i)+","+y(r.tension)).join(" ");
 let s='<svg role="img" aria-label="Your plot tension graph: '+
  rows.map((r,i)=>STAGES[i].name+" "+clamp(Number(r.tension))+" of 10").join(", ")+
  '." viewBox="0 0 690 282" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;min-width:335px">';
 s+='<rect width="690" height="282" rx="12" fill="#FCF9F3"/>';
 for(const t of [0,2,4,6,8,10]){
  const yy=y(t);
  s+='<line x1="50" y1="'+yy+'" x2="648" y2="'+yy+'" stroke="#DDD2C5" stroke-dasharray="4 6"/>'+
   '<text x="43" y="'+(yy+5)+'" text-anchor="end" fill="#655E67" font-size="12">'+t+'</text>';
 }
 s+='<text x="50" y="21" fill="#5E547D" font-size="13" font-weight="700">Tension · your interpretation, not a fixed answer</text>';
 s+='<polyline points="'+points+'" fill="none" stroke="#7366B2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
 for(let i=0;i<rows.length;i++){
  s+='<circle cx="'+x(i)+'" cy="'+y(rows[i].tension)+'" r="6" fill="#7366B2" stroke="#FFF" stroke-width="2"/>'+
    '<text x="'+x(i)+'" y="238" text-anchor="middle" fill="#554B67" font-size="12">'+(i+1)+'</text>';
 }
 s+='<text x="344" y="263" text-anchor="middle" fill="#655E67" font-size="12">Plot stages 1–6 (see stage labels below)</text></svg>';
 return s;
}
function report(story,rows,reflection){
 const title=TEXTS.find(x=>x.id===story)?.title||"Student story";
 return "GRADE 8 ELA · PLOT EVIDENCE BOARD\nText: "+title+"\n\n"+
 rows.map((r,i)=>(i+1)+". "+STAGES[i].name+"\nMoment: "+(r.moment.trim()||"[not filled in]")+
 "\nEvidence: "+(r.evidence.trim()||"[not filled in]")+
 "\nMy tension rating: "+clamp(Number(r.tension))+"/10").join("\n\n")+
 "\n\nWhy is your chosen climax a turning point? What does the ending do to the reader?\n"+(reflection.trim()||"[not filled in]");
}
function render(el){
 let story="snack",rows=initial(),reflection="",status="";
 const $=q=>el.querySelector(q),all=q=>[...el.querySelectorAll(q)];
 el.innerHTML='<section class="plot-board"><style>'+
 '.plot-board{font-family:var(--f-body);color:var(--ink);line-height:1.5}'+
 '.plot-board h2{font-family:var(--f-title);font-weight:var(--title-w);margin:8px 0 12px}'+
 '.plot-board .pb-field{display:grid;gap:6px;font-size:14px;font-weight:700}'+
 '.plot-board select,.plot-board textarea{font:inherit;font-size:15px;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:7px;padding:10px;max-width:100%}'+
 '.plot-board select{min-height:44px}'+
 '.plot-board textarea{width:100%;min-height:86px;resize:vertical}'+
 '.plot-board button:focus-visible,.plot-board select:focus-visible,.plot-board textarea:focus-visible,.plot-board input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}'+
 '.plot-board .pb-intro{padding:17px;background:var(--soft);border-left:4px solid var(--accent);border-radius:8px;margin:18px 0}'+
 '.plot-board .pb-chart{overflow-x:auto;border:1px solid var(--rule);border-radius:9px;margin:12px 0;background:#FCF9F3}'+
 '.plot-board .pb-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin:15px 0}'+
 '.plot-board .pb-card{border:1px solid var(--rule);border-top:3px solid var(--accent);border-radius:9px;padding:17px;background:var(--paper);min-width:0}'+
 '.plot-board .pb-card h3{font-family:var(--f-title);font-size:20px;color:var(--ink);border:0;margin:0 0 7px;padding:0;text-transform:none}'+
 '.plot-board .pb-card p{font-size:14px;color:var(--muted);margin:7px 0 14px}'+
 '.plot-board .pb-card .pb-field{margin:12px 0}'+
 '.plot-board .pb-tension{display:flex;align-items:center;flex-wrap:wrap;gap:8px;font-weight:700;font-size:14px}'+
 '.plot-board .pb-tension input{flex:1;min-width:125px;accent-color:var(--accent);min-height:40px}'+
 '.plot-board .pb-end{margin:24px 0 8px;padding:19px;border-radius:9px;background:var(--soft)}'+
 '.plot-board .pb-buttons{display:flex;gap:9px;flex-wrap:wrap;margin:13px 0}'+
 '.plot-board .pb-status{color:var(--accent-ink);font-weight:700;min-height:28px}'+
 '@media(max-width:700px){.plot-board .pb-grid{grid-template-columns:1fr}}'+
 '</style><div class="eyebrow">Grade 8 ELA · Short Stories · Plot Structure</div>'+
 '<h2>Plot Evidence Board</h2>'+
 '<p>Build your <b>own</b> six-stage plot map and visualize where you believe tension rises or falls. Each stage needs a specific moment and supporting evidence.</p>'+
 '<div class="pb-intro"><label class="pb-field">Choose the text<select id="pb-text">'+
 TEXTS.map(x=>'<option value="'+x.id+'">'+esc(x.title)+'</option>').join("")+'</select></label>'+
 '<p id="pb-guidance" class="note"></p>'+
 '<p class="note"><strong>There may be more than one defensible interpretation.</strong> Explain your choices rather than hunting for a single right graph.</p></div>'+
 '<div class="pb-chart" id="pb-graph"></div>'+
 '<div class="pb-grid" id="pb-grid"></div>'+
 '<div class="pb-end"><label class="pb-field">Reflection: Why this climax? What effect does the resolution have?'+
 '<textarea id="pb-reflection" placeholder="I chose this moment as the climax because…"></textarea></label>'+
 '<div class="pb-buttons"><button class="btn" type="button" id="pb-copy">Copy my plot analysis</button>'+
 '<button class="btn ghost" type="button" id="pb-reset">Clear this story</button></div>'+
 '<p id="pb-status" class="pb-status" aria-live="polite" role="status"></p>'+
 '<p class="note">Your writing stays in this page only. It is not saved or submitted automatically. Copy it before leaving the lesson.</p></div></section>';
 const cards=STAGES.map((st,i)=>'<section class="pb-card" data-stage="'+i+'"><h3>'+(i+1)+'. '+st.name+'</h3>'+
 '<p>'+st.cue+'</p>'+
 '<label class="pb-field">What happens here?<textarea data-moment="'+i+'" placeholder="Describe a specific moment…"></textarea></label>'+
 '<label class="pb-field">What evidence supports your choice?<textarea data-evidence="'+i+'" placeholder="Describe the action, detail or textual evidence…"></textarea></label>'+
 '<label class="pb-tension">My tension rating: <output data-output="'+i+'">0</output>/10'+
 '<input type="range" min="0" max="10" step="1" value="0" data-tension="'+i+'" aria-label="Tension for '+st.name+'"></label></section>').join("");
 $("#pb-grid").innerHTML=cards;
 function updateGraph(){ $("#pb-graph").innerHTML=graph(rows); }
 function chooseText(id){
  story=id;rows=initial();reflection="";$("#pb-text").value=id;$("#pb-guidance").textContent=TEXTS.find(x=>x.id===id).guidance;
  all("[data-moment]").forEach(x=>x.value="");all("[data-evidence]").forEach(x=>x.value="");
  all("[data-tension]").forEach(x=>x.value="0");all("[data-output]").forEach(x=>x.textContent="0");
  $("#pb-reflection").value="";status="";$("#pb-status").textContent="";
  updateGraph();
 }
 $("#pb-text").onchange=e=>chooseText(e.target.value);
 all("[data-moment]").forEach(x=>x.oninput=e=>rows[Number(e.target.dataset.moment)].moment=e.target.value);
 all("[data-evidence]").forEach(x=>x.oninput=e=>rows[Number(e.target.dataset.evidence)].evidence=e.target.value);
 all("[data-tension]").forEach(x=>x.oninput=e=>{
  const index=Number(e.target.dataset.tension),value=Number(e.target.value);
  rows[index].tension=value;el.querySelector('[data-output="'+index+'"]').textContent=String(value);updateGraph();
 });
 $("#pb-reflection").oninput=e=>reflection=e.target.value;
 $("#pb-reset").onclick=()=>chooseText(story);
 $("#pb-copy").onclick=()=>{
  const total=rows.filter(x=>x.moment.trim()&&x.evidence.trim()).length;
  if(total===0){$("#pb-status").textContent="Add at least one stage and some evidence before copying.";return;}
  const payload=report(story,rows,reflection);
  if(navigator.clipboard?.writeText)navigator.clipboard.writeText(payload).then(()=>$("#pb-status").textContent="Copied. Paste into your class document.").catch(()=>$("#pb-status").textContent="Clipboard unavailable—select and copy your responses manually.");
  else $("#pb-status").textContent="Clipboard unavailable—select and copy your responses manually.";
 };
 chooseText(story);
}
H.lessonTools=H.lessonTools||{};H.lessonTools["stories/plot"]=render;
window.PlotEvidenceCore={STAGES,TEXTS,initial,graph,report};
})();
