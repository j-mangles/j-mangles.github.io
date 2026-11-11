/* Grade 8 Cells booklet Topic 3: cell division and control.
   Counts are an illustrative comparison, not clinical cancer growth data. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
function progression(cycle,regulated){
 if(!Number.isInteger(cycle)||cycle<0||cycle>7)throw Error("Invalid model cycle");
 let n=1;
 for(let i=1;i<=cycle;i++)if(!regulated||i%2===1)n=Math.min(128,n*2);
 return n;
}
const phases=[
 ["Growth","Cells use nutrients and energy to grow and carry out their jobs."],
 ["Copy DNA","Before dividing, a cell copies its genetic instructions."],
 ["Separate","The copied DNA is distributed as the cell divides."],
 ["Two cells","One dividing cell becomes two daughter cells. They can grow and perform cell functions."]
];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const style=[
".cd{color:var(--ink);line-height:1.5;padding:9px 0 24px;min-width:0}.cd *{box-sizing:border-box}",
".cd h2{font:700 clamp(24px,3vw,31px) var(--f-title,Georgia,serif);margin:0 0 7px}.cd h3{font-size:1.05rem;margin:0 0 8px}",
".cd p{margin:6px 0 13px}.cd .note{font-size:.86rem;color:var(--muted)}",
".cd .stages{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:12px 0}",
".cd button{background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);font:inherit;padding:9px 12px;cursor:pointer;min-height:40px}",
".cd button[aria-pressed=true]{background:var(--accent);color:var(--paper);border-color:var(--accent)}",
".cd button:focus-visible,.cd textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".cd .diagram{border:1px solid var(--rule);background:var(--soft);border-radius:var(--radius,12px);padding:10px}",
".cd .diagram svg{width:100%;max-width:680px;display:block;height:auto;margin:auto}",
".cd .phase-note{min-height:66px;margin:14px 0}.cd .actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}",
".cd .comparison{display:grid;grid-template-columns:1fr 1fr;gap:17px;margin-top:15px}",
".cd .col{min-width:0}.cd .number{font-size:2rem;font-weight:800;font-variant-numeric:tabular-nums}",
".cd .dots{display:flex;flex-wrap:wrap;gap:4px;min-height:104px;align-content:flex-start;padding:10px;border:1px solid var(--rule);border-radius:10px;background:var(--soft)}",
".cd .dots span{width:13px;height:13px;background:var(--accent);border-radius:50%;display:block}.cd .col:last-child .dots span{background:var(--muted)}",
".cd .caption{font-size:.85rem;color:var(--muted)}.cd .scoreline{font-weight:650;min-height:42px}",
".cd .questions{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin:18px 0}",
".cd textarea{width:100%;box-sizing:border-box;min-height:83px;border:1px solid var(--rule);background:var(--paper);color:var(--ink);font:inherit;padding:10px;border-radius:8px;resize:vertical}",
"@media(max-width:650px){.cd .stages,.cd .comparison,.cd .questions{grid-template-columns:repeat(2,minmax(0,1fr))}}",
"@media(max-width:450px){.cd .comparison,.cd .questions{grid-template-columns:1fr}}"
].join("\n");
function stagesSvg(phase){
 const nodes=phase===0?[[175,85,33]]:phase===1?[[175,85,39]]:phase===2?[[156,85,30],[196,85,30]]:[[119,85,30],[230,85,30]];
 return '<svg viewBox="0 0 350 178" role="img" aria-label="Cell division stage '+(phase+1)+': '+esc(phases[phase][0])+'">'+
 '<defs><radialGradient id="cd-fill"><stop stop-color="var(--paper)"/><stop offset="1" stop-color="color-mix(in srgb,var(--accent) 33%,var(--paper))"/></radialGradient></defs>'+
 nodes.map(([x,y,r],i)=>'<g><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="url(#cd-fill)" stroke="var(--accent)" stroke-width="3"/>'+
 (phase>=1?'<path d="M'+(x-9)+' '+(y-9)+' L'+(x+9)+' '+(y+9)+' M'+(x+9)+' '+(y-9)+' L'+(x-9)+' '+(y+9)+'" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>':'<circle cx="'+x+'" cy="'+y+'" r="10" fill="var(--accent)" opacity=".6"/>')+
 '</g>').join("")+
 '<text x="175" y="166" text-anchor="middle" font-size="13" fill="var(--ink)">'+esc(phases[phase][0])+'</text></svg>';
}
function build(el){
 let phase=0,cycle=0;
 el.innerHTML='<section class="cd"><style>'+style+'</style><h2>Cell Division Studio</h2>'+
 '<p class="note">Follow a simplified cell through the steps of division, then compare how cells accumulate when division is controlled and when controls fail.</p>'+
 '<h3>Follow one cell</h3><div class="stages" role="group" aria-label="Cell division stages">'+phases.map((v,i)=>'<button type="button" data-phase="'+i+'" aria-pressed="'+(i===0)+'">'+(i+1)+'. '+esc(v[0])+'</button>').join("")+'</div>'+
 '<div class="diagram" id="cd-diagram">'+stagesSvg(0)+'</div><p class="phase-note" id="cd-phase-note" aria-live="polite"></p>'+
 '<div class="actions"><button type="button" id="cd-next">Next stage</button><button type="button" id="cd-restart">Restart stages</button></div>'+
 '<h3>Compare cell counts</h3><p class="note">Each press advances one model cycle. In this illustration, normal controls allow a division only in alternate cycles when a growth signal is present. Without that control, each cycle doubles the cell count. Real cell cycles and cancer are much more complicated.</p>'+
 '<div class="comparison"><div class="col"><h3>With control</h3><div class="number" id="cd-normal-count">1</div><div class="dots" id="cd-normal-dots"></div>'+
 '<p class="caption">Divisions happen only in model cycles with a signal.</p></div><div class="col"><h3>Control fails</h3><div class="number" id="cd-free-count">1</div><div class="dots" id="cd-free-dots"></div>'+
 '<p class="caption">Without the model stop signal, cells keep dividing each cycle.</p></div></div>'+
 '<div class="actions"><button type="button" id="cd-cycle">Advance one cycle</button><button type="button" id="cd-reset-counts">Reset counts</button></div>'+
 '<p class="scoreline" id="cd-cycle-note" role="status"></p>'+
 '<div class="questions"><label>Why do healthy cells need control over division?<textarea id="cd-why" placeholder="Cells must..."></textarea></label>'+
 '<label>What is one important limitation of this model?<textarea id="cd-limitation" placeholder="Real cells are different because..."></textarea></label></div>'+
 '<p class="note">This is a conceptual learning activity. It does not describe cancer growth rates, diagnose a condition, or predict individual health.</p></section>';
 const $=q=>el.querySelector(q);
 function paintPhase(){
  $("#cd-diagram").innerHTML=stagesSvg(phase);
  el.querySelectorAll("[data-phase]").forEach(btn=>btn.setAttribute("aria-pressed",String(Number(btn.dataset.phase)===phase)));
  $("#cd-phase-note").textContent=phases[phase][1];
  $("#cd-next").textContent=phase===phases.length-1?"Start stages again":"Next stage";
 }
 function paintCounts(){
  const a=progression(cycle,true),b=progression(cycle,false);
  $("#cd-normal-count").textContent=a;$("#cd-free-count").textContent=b;
  const dots=(n)=>'<span aria-hidden="true"></span>'.repeat(Math.min(n,128));
  $("#cd-normal-dots").innerHTML=dots(a);$("#cd-free-dots").innerHTML=dots(b);
  $("#cd-cycle-note").textContent="Cycle "+cycle+" of 7 · normal-control model: "+a+" cells; failed-control model: "+b+" cells.";
  $("#cd-cycle").disabled=cycle>=7;
 }
 el.addEventListener("click",ev=>{const btn=ev.target.closest("[data-phase]");if(btn){phase=Number(btn.dataset.phase);paintPhase();}});
 $("#cd-next").onclick=()=>{phase=(phase+1)%phases.length;paintPhase();};
 $("#cd-restart").onclick=()=>{phase=0;paintPhase();};
 $("#cd-cycle").onclick=()=>{if(cycle<7)cycle++;paintCounts();};
 $("#cd-reset-counts").onclick=()=>{cycle=0;paintCounts();};
 paintPhase();paintCounts();
 el.cellDivisionLab={get phase(){return phase},get cycle(){return cycle},next(){if(cycle<7)cycle++;paintCounts();}};
}
H.cellDivisionCore={progression,phases};
H.lessonTools=H.lessonTools||{};const prior=H.lessonTools["cells/reproduction"];
H.lessonTools["cells/reproduction"]=function(root){const el=document.createElement("div");root.appendChild(el);build(el);if(prior){const old=document.createElement("div");root.appendChild(old);prior(old);}};
})();