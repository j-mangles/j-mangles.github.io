/* Grade 8 Science: interactive microscope model.
   Aligned with Cells & Systems booklet Topic 1 (cell size and magnification).
   The specimen drawings and field-of-view numbers are simplified teaching models. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
H.lessonTools=H.lessonTools||{};
const EYEPIECE=10,BASE_FOV=4500,OBJECTIVES=[4,10,40],NAMESPACE="http://www.w3.org/2000/svg";
const SPECIMENS={
 onion:{name:"Onion epidermis",size:200,description:"Plant cells form an ordered sheet. Their rigid cell walls create rectangular boundaries."},
 cheek:{name:"Cheek epithelial cells",size:65,description:"Flattened animal cells have flexible membranes and nuclei, but no cell walls."},
 blood:{name:"Human red blood cells",size:8,description:"Mature human red blood cells are small, biconcave discs without nuclei."}
};
const fov=objective=>BASE_FOV*4/objective;
const total=objective=>EYEPIECE*objective;
const round=n=>Number(n.toFixed(2));
const el=(tag,attrs,parent)=>{
 const node=document.createElementNS(NAMESPACE,tag);
 Object.entries(attrs||{}).forEach(([key,value])=>node.setAttribute(key,String(value)));
 if(parent)parent.appendChild(node);return node;
};
function drawSpecimen(group,kind){
 group.replaceChildren();
 if(kind==="onion"){
  for(let r=-18;r<=18;r++)for(let c=-13;c<=13;c++){
   let x=c*220+(r%2)*70-100,y=r*95-50;
   el("rect",{x,y,width:207,height:88,rx:9,fill:"#E6EBCF",stroke:"#65774D","stroke-width":6},group);
   if((r+c)%3===0)el("ellipse",{cx:x+95,cy:y+45,rx:18,ry:12,fill:"#86937A",opacity:.72},group);
  }
 }else{
  const n=kind==="cheek"?680:1100;
  for(let i=0;i<n;i++){
   const x=(Math.sin(i*83.31)*1350+Math.cos(i*8.19)*440)*1.65;
   const y=(Math.sin(i*17.93)*1350+Math.cos(i*51.11)*420)*1.65;
   const node=el("g",{transform:"translate("+round(x)+" "+round(y)+") rotate("+(i*41%180)+")"},group);
   if(kind==="cheek"){
    el("ellipse",{rx:47,ry:33,fill:"#F5DADB",stroke:"#C78490","stroke-width":3.5},node);
    el("ellipse",{cx:5,cy:-2,rx:11,ry:8.5,fill:"#B2687B",opacity:.85},node);
   }else{
    el("ellipse",{rx:5,ry:3.6,fill:"#D86F76",stroke:"#B44F61","stroke-width":.7},node);
    el("ellipse",{rx:2.4,ry:1.6,fill:"#F6B0B3",opacity:.9},node);
   }
  }
 }
}
function mount(root){
 let specimen="onion",objective=4,focus=55,x=0,y=0,prediction="",trials=[];
 const html=[
 '<section class="ms" aria-label="Microscope investigation">',
 '<div class="ms-top"><span class="ms-kicker">GRADE 8 SCIENCE · CELLS</span><h3>Microscope Investigation Studio</h3>',
 '<p>Use the lens, focus and stage controls to explore an illustrative specimen. Magnification changes the field of view — not the real size of the cell.</p></div>',
 '<div class="ms-columns"><div class="ms-image-panel"><svg class="ms-scope" viewBox="0 0 380 380" role="img" aria-label="Illustrative microscope field of view" aria-describedby="ms-caption">',
 '<defs><clipPath id="ms-clip"><circle cx="190" cy="185" r="152"/></clipPath>',
 '<radialGradient id="ms-light"><stop offset="0" stop-color="#F9FCF6"/><stop offset="1" stop-color="#DCE5DA"/></radialGradient></defs>',
 '<circle cx="190" cy="185" r="152" fill="url(#ms-light)" stroke="#526858" stroke-width="4"/>',
 '<g clip-path="url(#ms-clip)"><g id="ms-shift"><g id="ms-drawing"></g></g></g>',
 '<circle cx="190" cy="185" r="152" fill="none" stroke="#526858" stroke-width="4"/>',
 '<line x1="137" y1="340" x2="243" y2="340" stroke="#3E5946" stroke-width="4"/>',
 '<path d="M137 333v14 M243 333v14" stroke="#3E5946" stroke-width="2"/>',
 '<text id="ms-scale" x="190" y="363" text-anchor="middle" font-size="13" font-weight="700" fill="#3E5946"></text>',
 '</svg><p id="ms-caption" class="ms-small"></p>',
 '<div class="ms-stats"><div><strong id="ms-total">40×</strong><span>Total magnification</span></div>',
 '<div><strong id="ms-field">4.5 mm</strong><span>Field diameter</span></div>',
 '<div><strong id="ms-across">22.5</strong><span>Approximate cell lengths across</span></div></div>',
 '<div class="ms-explain"><strong id="ms-name"></strong><p id="ms-description"></p></div></div>',
 '<div class="ms-controls">',
 '<label for="ms-specimen">Specimen</label><select id="ms-specimen">',
 '<option value="onion">Onion epidermis (plant)</option><option value="cheek">Cheek epithelial cells (animal)</option>',
 '<option value="blood">Human red blood cells</option></select>',
 '<label for="ms-objective">Objective lens</label><select id="ms-objective">',
 '<option value="4">4× — scanning</option><option value="10">10× — low power</option>',
 '<option value="40">40× — high power</option></select>',
 '<p class="ms-small">A 10× eyepiece is fixed. Total magnification = eyepiece × objective.</p>',
 '<label for="ms-focus">Fine focus <output id="ms-focus-val">55</output></label>',
 '<input id="ms-focus" type="range" min="0" max="100" value="55" step="1"/>',
 '<p class="ms-small">Focus becomes more sensitive at higher magnification.</p>',
 '<label for="ms-x">Move stage horizontally <output id="ms-x-val">0 μm</output></label>',
 '<input id="ms-x" type="range" min="-500" max="500" value="0" step="25"/>',
 '<label for="ms-y">Move stage vertically <output id="ms-y-val">0 μm</output></label>',
 '<input id="ms-y" type="range" min="-500" max="500" value="0" step="25"/>',
 '<button class="ms-secondary" id="ms-reset" type="button">Re-centre and focus</button>',
 '</div></div>',
 '<section class="ms-section"><h4>Investigate · predict, observe, explain</h4>',
 '<p>Predict what happens to the field diameter when the objective changes from 4× to 40×, then test each objective and record a view.</p>',
 '<fieldset class="ms-predict"><legend>My prediction</legend>',
 '<label><input type="radio" name="ms-predict" value="larger"/> Becomes larger</label>',
 '<label><input type="radio" name="ms-predict" value="same"/> Stays the same</label>',
 '<label><input type="radio" name="ms-predict" value="smaller"/> Becomes smaller</label></fieldset>',
 '<div class="ms-actions"><button class="ms-primary" id="ms-record" type="button">Record this view</button>',
 '<button class="ms-secondary" id="ms-download" type="button">Download observations (.csv)</button>',
 '<button class="ms-secondary" id="ms-clear" type="button">Clear observations</button></div>',
 '<p class="ms-status" id="ms-status" role="status">Try all three objective powers.</p>',
 '<div class="ms-table-wrap"><table><thead><tr><th>Trial</th><th>Specimen</th><th>Objective</th><th>Total</th>',
 '<th>Field (μm)</th><th>Cell lengths across</th></tr></thead>',
 '<tbody id="ms-rows"><tr><td colspan="6">No observations yet.</td></tr></tbody></table></div></section>',
 '<section class="ms-section"><h4>Check your understanding</h4>',
 '<div class="ms-checks"><label for="ms-question-mag">10× eyepiece × 40× objective = what total magnification?',
 '<input type="number" id="ms-question-mag" placeholder="× magnification" min="1" step="1"/></label>',
 '<label for="ms-question-field">In this model, what is the field diameter at the 40× objective?',
 '<input type="number" id="ms-question-field" placeholder="Micrometres (μm)" min="1" step="1"/></label></div>',
 '<button type="button" class="ms-secondary" id="ms-check">Check answers</button>',
 '<p id="ms-feedback" class="ms-feedback" role="status"></p>',
 '<label class="ms-reflection-label" for="ms-reflection">Use two recorded trials to explain why the visible area changes when magnification increases.</label>',
 '<textarea id="ms-reflection" rows="4" placeholder="At 4× I observed… At 40× I observed… This means…"></textarea>',
 '<p class="ms-small">Model calibration: 4× objective → 4,500 μm field; 10× → 1,800 μm; 40× → 450 μm. Actual microscope fields vary by optical design. Drawings are not photographs. Work is not automatically saved or submitted; download it before leaving.</p>',
 '</section></section>'
 ];
 root.innerHTML='<style>'+
 '.ms{border:1px solid var(--rule);background:var(--paper);border-radius:var(--radius);padding:clamp(15px,3vw,24px);color:var(--ink)}'+
 '.ms *{box-sizing:border-box}.ms-top h3{font-size:clamp(20px,3vw,27px);letter-spacing:-.025em;margin:4px 0 7px}'+
 '.ms-top p,.ms-section p{line-height:1.6;margin:0 0 16px}.ms-kicker{font-size:11px;letter-spacing:.09em;font-weight:800;color:var(--accent-ink)}'+
 '.ms-columns{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(220px,.88fr);gap:20px}'+
 '.ms-image-panel{border:1px solid var(--rule);background:var(--soft);padding:10px 12px;border-radius:10px}'+
 '.ms-scope{display:block;width:min(100%,450px);height:auto;margin:auto}.ms-small{color:var(--muted);font-size:12px;line-height:1.5;margin:5px 0 12px!important}'+
 '.ms-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px 0}'+
 '.ms-stats div{border-top:1px solid var(--rule);padding-top:9px}.ms-stats strong{font-size:18px;display:block;font-variant-numeric:tabular-nums}'+
 '.ms-stats span{font-size:11px;color:var(--muted);line-height:1.35;display:block}.ms-explain{border-left:3px solid var(--accent);padding:5px 11px}'+
 '.ms-explain strong{font-size:13px}.ms-explain p{font-size:13px;color:var(--muted);margin:4px 0;line-height:1.5}'+
 '.ms-controls{display:grid;gap:9px;align-content:start}.ms-controls label{font-size:13px;font-weight:720}'+
 '.ms-controls select,.ms-controls input[type=range],.ms-checks input,.ms textarea{width:100%;min-width:0}'+
 '.ms-controls select,.ms-checks input,.ms textarea{border:1px solid var(--rule);background:var(--paper);color:var(--ink);padding:10px;border-radius:var(--btn-radius);font:inherit;font-size:14px}'+
 '.ms-controls select{min-height:43px}.ms-controls input[type=range]{accent-color:var(--accent);cursor:pointer}'+
 '.ms output{float:right;color:var(--accent-ink);font-size:12px;font-weight:700}.ms-section{border-top:1px solid var(--rule);padding-top:18px;margin-top:24px}'+
 '.ms-section h4{font-size:17px;margin:0 0 8px}.ms-predict{display:flex;flex-wrap:wrap;gap:10px 20px;border:0;padding:0;margin:15px 0}'+
 '.ms-predict legend{font-size:13px;font-weight:700;margin-bottom:7px}.ms-predict label{font-size:13px;cursor:pointer}'+
 '.ms-predict input{accent-color:var(--accent)}.ms-actions{display:flex;flex-wrap:wrap;gap:8px;margin:13px 0}'+
 '.ms-primary,.ms-secondary{min-height:40px;padding:9px 13px;border-radius:var(--btn-radius);border:1px solid var(--rule);font:inherit;font-size:13px;font-weight:700;cursor:pointer}'+
 '.ms-primary{background:var(--btn);border-color:var(--btn);color:var(--on-btn)}.ms-secondary{background:var(--paper);color:var(--ink)}'+
 '.ms-status{font-size:13px;color:var(--muted);min-height:18px}.ms-table-wrap{overflow-x:auto;max-width:100%}'+
 '.ms-table-wrap table{width:100%;min-width:530px;border-collapse:collapse;font-size:12px}.ms-table-wrap td,.ms-table-wrap th{border-bottom:1px solid var(--rule);padding:8px;text-align:left}'+
 '.ms-table-wrap th{color:var(--muted)}.ms-checks{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:12px 0}'+
 '.ms-checks label,.ms-reflection-label{display:block;font-size:13px;font-weight:720}.ms-checks input{display:block;margin-top:8px}'+
 '.ms-reflection-label{margin-top:17px;margin-bottom:7px}.ms textarea{resize:vertical;min-height:92px}.ms-feedback{font-size:13px;font-weight:700}'+
 '.ms button:focus-visible,.ms select:focus-visible,.ms input:focus-visible,.ms textarea:focus-visible{outline:3px solid var(--accent);outline-offset:3px}'+
 '@media(max-width:700px){.ms-columns,.ms-checks{grid-template-columns:1fr}}'+
 '@media(prefers-reduced-motion:reduce){.ms *{transition:none!important;animation:none!important}}'+
 '</style>'+html.join("");
 const $=id=>root.querySelector("#"+id);
 const paint=$("ms-drawing"),shift=$("ms-shift");
 drawSpecimen(paint,specimen);
 function record(){
  return {index:trials.length+1,specimen,specimenName:SPECIMENS[specimen].name,objective,
    total:total(objective),field:fov(objective),across:round(fov(objective)/SPECIMENS[specimen].size),
    focus,stageX:x,stageY:y};
 }
 function draw(){
  const scale=304/fov(objective),focusError=Math.abs(focus-55),blur=Math.max(0,(focusError-6)*(objective===40?.16:objective===10?.09:.035));
  shift.setAttribute("transform","translate("+(190-x*scale)+" "+(185-y*scale)+") scale("+scale+")");
  paint.style.filter="blur("+round(blur)+"px)";
  $("ms-total").textContent=total(objective)+"×";
  $("ms-field").textContent=fov(objective)>=1000?round(fov(objective)/1000)+" mm":round(fov(objective))+" μm";
  $("ms-across").textContent=round(fov(objective)/SPECIMENS[specimen].size);
  $("ms-scale").textContent=round(fov(objective)*106/304)+" μm scale bar";
  $("ms-name").textContent=SPECIMENS[specimen].name;
  $("ms-description").textContent=SPECIMENS[specimen].description;
  $("ms-caption").textContent="Illustrative model at "+total(objective)+"×: "+(focusError<=6?"in focus":focusError<=16?"slightly blurred":"out of focus")+".";
  $("ms-focus-val").textContent=focus;
  $("ms-x-val").textContent=x+" μm";$("ms-y-val").textContent=y+" μm";
 }
 function table(message){
  const body=$("ms-rows");body.replaceChildren();
  if(!trials.length){const tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=6;td.textContent="No observations yet.";tr.appendChild(td);body.appendChild(tr);}
  trials.forEach(t=>{
   const tr=document.createElement("tr");
   [t.index,t.specimenName,t.objective+"×",t.total+"×",t.field,t.across].forEach(value=>{
    const td=document.createElement("td");td.textContent=String(value);tr.appendChild(td);
   });body.appendChild(tr);
  });
  $("ms-status").textContent=message||trials.length+" recorded · "+new Set(trials.map(t=>t.objective)).size+"/3 objective powers tested.";
 }
 $("ms-specimen").addEventListener("change",event=>{specimen=event.target.value;drawSpecimen(paint,specimen);draw();});
 $("ms-objective").addEventListener("change",event=>{objective=Number(event.target.value);draw();});
 [["ms-focus",v=>focus=v],["ms-x",v=>x=v],["ms-y",v=>y=v]].forEach(([id,set])=>
  $(id).addEventListener("input",event=>{set(Number(event.target.value));draw();}));
 $("ms-reset").addEventListener("click",()=>{focus=55;x=0;y=0;$("ms-focus").value=55;$("ms-x").value=0;$("ms-y").value=0;draw();});
 root.querySelectorAll('input[name="ms-predict"]').forEach(node=>node.addEventListener("change",()=>prediction=node.value));
 $("ms-record").addEventListener("click",()=>{
  const r=record();
  if(trials.some(t=>t.specimen===specimen&&t.objective===objective&&t.stageX===x&&t.stageY===y)){table("This view is already recorded. Change a lens, specimen or stage position.");return;}
  if(trials.length>=12){table("12 trials recorded. Download or clear before continuing.");return;}
  trials.push(r);table("Recorded! "+new Set(trials.map(t=>t.objective)).size+"/3 objective powers tested."+(prediction?" Prediction: "+prediction+".":""));
 });
 $("ms-check").addEventListener("click",()=>{
  const mag=$("ms-question-mag"),field=$("ms-question-field");
  const ok=mag.value.trim()!==""&&Number(mag.value)===400&&field.value.trim()!==""&&Math.abs(Number(field.value)-450)<=1;
  $("ms-feedback").textContent=(ok?"Correct. ":"Check both calculations. ")+"10 × 40 = 400× total; the field decreases from 4,500 μm (4× objective) to 450 μm (40× objective).";
  $("ms-feedback").style.color=ok?"var(--good)":"var(--bad)";
 });
 $("ms-clear").addEventListener("click",()=>{if(trials.length&&window.confirm("Clear recorded trials? Export first to keep them.")){trials=[];table("Observations cleared. They were not stored on a server.");}});
 $("ms-download").addEventListener("click",()=>{
  const quote=s=>'"'+String(s??"").replace(/"/g,'""')+'"';
  const rows=[["Trial","Specimen","Objective lens","Total magnification","Field (um)","Approx cell size (um)","Cell lengths across","Focus","Stage X","Stage Y","Prediction","Reflection"]];
  trials.forEach(t=>rows.push([t.index,t.specimenName,t.objective,t.total,t.field,SPECIMENS[t.specimen].size,t.across,t.focus,t.stageX,t.stageY,prediction,$("ms-reflection").value]));
  const csv="\ufeff"+rows.map(row=>row.map(quote).join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const link=document.createElement("a");link.href=url;link.download="microscope-investigation.csv";root.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  table("CSV downloaded. Hand it in only as directed by your teacher.");
 });
 draw();table();
 root.microscopeStudio={get specimen(){return specimen;},get objective(){return objective;},
  get fov(){return fov(objective);},get focus(){return focus;},
  get trials(){return trials.map(t=>({...t}));}};
}
H.lessonTools["cells/theory"]=mount;
window.MicroscopeStudio={fov,total,SPECIMENS};
})();