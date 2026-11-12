/* Grade 8 Science: comparison of block buoyancy in idealized liquids.
   Runs after matter-visuals.js and composes rather than replacing its diagram.
   Illustrative constant densities in g/cm³, not laboratory measurements. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
H.lessonTools=H.lessonTools||{};
const FLUIDS={
 water:{label:"Freshwater",density:1.00,colour:"#8AC4DF"},
 salt:{label:"Saltwater",density:1.03,colour:"#64ADCF"},
 oil:{label:"Vegetable oil",density:.92,colour:"#DCC064"},
 syrup:{label:"Corn syrup",density:1.33,colour:"#C18B50"}
};
function model(mass,volume,fluid){
 const liquid=FLUIDS[fluid];
 if(!liquid||!Number.isFinite(mass)||mass<=0||!Number.isFinite(volume)||volume<=0)throw Error("Invalid density parameters");
 const density=mass/volume,ratio=density/liquid.density;
 return {mass,volume,fluid,liquid:liquid.label,liquidDensity:liquid.density,density,
  result:Math.abs(ratio-1)<1e-7?"neutral":ratio<1?"floats":"sinks",submerged:Math.min(1,ratio)};
}
const fmt=n=>Number(n.toFixed(2)).toString();
function mount(root){
 let mass=120,volume=100,fluid="water",prediction="",revealed=false,records=[];
 root.innerHTML='<style>'+
 '.bu{margin-top:24px;border-top:2px solid var(--ink);padding-top:22px;color:var(--ink)}'+
 '.bu h3{font-family:var(--f-title);font-size:clamp(21px,3vw,27px);margin:0 0 7px}.bu p{line-height:1.6}'+
 '.bu .intro,.bu .note{font-size:.88rem;color:var(--muted)}'+
 '.bu .columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(220px,.9fr);gap:22px;align-items:start}'+
 '.bu .diagram{border:1px solid var(--rule);border-radius:var(--radius);background:var(--soft);padding:10px}'+
 '.bu svg{display:block;width:100%;height:auto;max-width:420px;margin:auto}'+
 '.bu .controls{display:grid;gap:12px}.bu .controls label{font-weight:690;font-size:.85rem;display:block}'+
 '.bu .controls input{width:100%;accent-color:var(--accent)}.bu .controls select{min-height:43px;width:100%;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius);padding:9px;font:inherit}'+
 '.bu output{float:right;color:var(--accent-ink);font-variant-numeric:tabular-nums}'+
 '.bu .reading{padding:12px;background:var(--soft);margin:12px 0;font-weight:690;font-size:.89rem;border-radius:var(--btn-radius)}'+
 '.bu .predictions,.bu .actions{display:flex;flex-wrap:wrap;gap:8px;margin:11px 0}'+
 '.bu button{border:1px solid var(--rule);color:var(--ink);background:var(--paper);border-radius:var(--btn-radius);min-height:41px;font:inherit;font-size:.84rem;font-weight:700;padding:9px 12px;cursor:pointer}'+
 '.bu button[aria-pressed=true],.bu .record{background:var(--btn);border-color:var(--btn);color:var(--on-btn)}'+
 '.bu button:focus-visible,.bu select:focus-visible,.bu input:focus-visible,.bu textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}'+
 '.bu .status{min-height:25px;font-size:.87rem;font-weight:660}.bu .table-wrap{max-width:100%;overflow-x:auto}'+
 '.bu table{border-collapse:collapse;width:100%;min-width:530px;font-size:.82rem}.bu th,.bu td{padding:8px;border-bottom:1px solid var(--rule);text-align:left}.bu th{color:var(--muted)}'+
 '.bu textarea{width:100%;min-height:100px;background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius);color:var(--ink);font:inherit;padding:11px;resize:vertical}'+
 '@media(max-width:700px){.bu .columns{grid-template-columns:1fr}}'+
 '</style><section class="bu"><h3>Beyond Freshwater: Buoyancy Investigation</h3>'+
 '<p class="intro">Keep the object the same and change the liquid. Predict its behaviour, observe where the block settles, and record the result. Real saltwater, oils and syrups vary with their composition and temperature; this model uses representative values.</p>'+
 '<div class="columns"><div class="diagram"><svg viewBox="0 0 360 265" role="img" aria-label="Model tank comparing a block with the chosen liquid">'+
 '<rect id="bu-liquid" x="40" y="104" width="280" height="130" rx="2" fill="#8AC4DF" opacity=".75"/>'+
 '<path d="M40 18V233H320V18" stroke="var(--muted)" stroke-width="4" fill="none"/>'+
 '<line x1="40" y1="104" x2="320" y2="104" stroke="#39677C" stroke-width="2" stroke-dasharray="7 6"/>'+
 '<rect id="bu-block" x="145" y="49" width="70" height="55" fill="#B2804A" rx="3" stroke="#70481F" stroke-width="2"/>'+
 '<text id="bu-block-label" x="180" y="82" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">block</text>'+
 '<text id="bu-liquid-label" x="54" y="218" fill="#173E4F" font-size="13" font-weight="700">Freshwater</text>'+
 '<text x="180" y="256" text-anchor="middle" font-size="12" fill="var(--muted)">Schematic · not to scale</text></svg>'+
 '<div class="reading" id="bu-reading" aria-live="polite"></div>'+
 '<p class="note">A floating block has a submerged fraction approximately equal to its density divided by the fluid density, for this simple uniform-block model.</p></div>'+
 '<div class="controls"><div><label for="bu-mass">Block mass <output id="bu-mass-val">120 g</output></label><input id="bu-mass" type="range" min="20" max="250" step="5" value="120"></div>'+
 '<div><label for="bu-volume">Block volume <output id="bu-volume-val">100 cm³</output></label><input id="bu-volume" type="range" min="20" max="200" step="5" value="100"></div>'+
 '<div><label for="bu-fluid">Surrounding liquid</label><select id="bu-fluid"><option value="water">Freshwater · 1.00 g/cm³</option>'+
 '<option value="salt">Saltwater · 1.03 g/cm³</option><option value="oil">Vegetable oil · 0.92 g/cm³</option><option value="syrup">Corn syrup · 1.33 g/cm³</option></select></div>'+
 '<p class="note">Study a block with density 1.20 g/cm³. Does it behave the same way in every fluid?</p></div></div>'+
 '<h4>Predict before revealing</h4><div class="predictions" role="group" aria-label="Prediction for floating or sinking">'+
 '<button type="button" data-bu-guess="floats" aria-pressed="false">Floats</button>'+
 '<button type="button" data-bu-guess="neutral" aria-pressed="false">Same density</button>'+
 '<button type="button" data-bu-guess="sinks" aria-pressed="false">Sinks</button></div>'+
 '<p id="bu-status" class="status" role="status">Select a prediction to reveal the result.</p>'+
 '<div class="actions"><button id="bu-record" class="record" type="button">Record this trial</button>'+
 '<button id="bu-export" type="button">Download trials (.csv)</button>'+
 '<button id="bu-clear" type="button">Clear</button></div>'+
 '<div class="table-wrap"><table><thead><tr><th>#</th><th>Mass (g)</th><th>Volume (cm³)</th><th>Object density</th><th>Liquid density</th><th>Prediction</th><th>Outcome</th></tr></thead>'+
 '<tbody id="bu-trials"><tr><td colspan="7">No trials recorded.</td></tr></tbody></table></div>'+
 '<section class="table-wrap" aria-label="Density chart" style="margin:15px 0;border:1px solid var(--rule);padding:12px"><h4>Graph your evidence</h4><p class="note">Bars compare object and liquid densities (g/cm³) in recorded trials.</p>'+ 
 '<svg id="bu-chart" role="img" aria-label="Density bar chart for the recorded buoyancy trials" viewBox="0 0 520 260" style="display:block;width:520px;height:260px"></svg></section>'+ 
 '<label for="bu-conclusion"><strong>Explain your evidence.</strong> Record at least three liquids with the same block. Why might an object sink in freshwater but float in syrup?</label>'+
 '<textarea id="bu-conclusion" placeholder="The block density was… In freshwater… In syrup… This tells us…"></textarea>'+
 '<p class="note">Your work stays in this tab until exported. It is not automatically saved or submitted.</p></section>';
 const $=id=>root.querySelector("#"+id);
 const setGuess=choice=>{prediction=choice;revealed=true;draw();};
 function draw(){
  const r=model(mass,volume,fluid),f=FLUIDS[fluid],fraction=r.submerged;
  $("bu-mass-val").textContent=mass+" g";$("bu-volume-val").textContent=volume+" cm³";
  $("bu-reading").textContent="Block: "+fmt(r.density)+" g/cm³ · "+r.liquid+": "+fmt(r.liquidDensity)+" g/cm³.";
  $("bu-liquid").setAttribute("fill",f.colour);$("bu-liquid-label").textContent=f.label;
  $("bu-block").setAttribute("y",revealed?String(r.result==="floats"?104-55*(1-fraction):r.result==="sinks"?179:123):"49");
  const blockY=Number($("bu-block").getAttribute("y"));$("bu-block-label").setAttribute("y",String(blockY+33));
  root.querySelectorAll("[data-bu-guess]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.buGuess===prediction)));
  if(revealed){
   $("bu-status").textContent=(prediction===r.result?"Correct. ":"Not quite. ")+
    "The block "+(r.result==="neutral"?"can remain suspended":r.result)+" in "+f.label.toLowerCase()+
    ". Compare "+fmt(r.density)+" g/cm³ with "+fmt(r.liquidDensity)+" g/cm³.";
  }else $("bu-status").textContent="Predict, then record your observation.";
  return r;
 }
 function reset(){prediction="";revealed=false;draw();}
 function graph(){
  const svg=$("bu-chart"),ns="http://www.w3.org/2000/svg";
  function add(tag,attrs,label){
   const node=document.createElementNS(ns,tag);
   Object.entries(attrs||{}).forEach(([key,val])=>node.setAttribute(key,String(val)));
   if(label!==undefined)node.textContent=String(label);
   svg.appendChild(node);return node;
  }
  svg.replaceChildren();
  const width=Math.max(520,95+Math.max(3,records.length)*91),bottom=213,left=48,height=189;
  svg.setAttribute("viewBox","0 0 "+width+" 260");svg.style.width=width+"px";
  if(!records.length){add("text",{x:width/2,y:125,"text-anchor":"middle",fill:"var(--muted)","font-size":14},"Record two or more trials to compare densities.");return;}
  const max=Math.ceil(Math.max(1.5,...records.map(r=>Math.max(r.density,r.liquidDensity)))*2)/2;
  add("text",{x:left,y:13,"font-size":12,"font-weight":700,fill:"var(--ink)"},"Density (g/cm³)");
  for(let i=0;i<=4;i++){
   const value=max*i/4,y=bottom-value/max*height;
   add("line",{x1:left,x2:width-12,y1:y,y2:y,stroke:"var(--rule)","stroke-width":1});
   add("text",{x:left-6,y:y+4,"font-size":11,"text-anchor":"end",fill:"var(--muted)"},fmt(value));
  }
  records.forEach((r,i)=>{
   const x=left+18+i*91,a=r.density/max*height,b=r.liquidDensity/max*height;
   add("rect",{x,y:bottom-a,width:24,height:a,fill:"#B2804A",rx:2});
   add("rect",{x:x+29,y:bottom-b,width:24,height:b,fill:FLUIDS[r.fluid].colour,stroke:"#506D77","stroke-width":.6,rx:2});
   add("text",{x:x+26,y:bottom+18,"text-anchor":"middle","font-size":11,fill:"var(--ink)"},"Trial "+(i+1));
  });
  add("rect",{x:left,y:238,width:10,height:10,fill:"#B2804A"});
  add("text",{x:left+14,y:247,"font-size":11,fill:"var(--muted)"},"Object");
  add("rect",{x:left+98,y:238,width:10,height:10,fill:"#8AC4DF"});
  add("text",{x:left+112,y:247,"font-size":11,fill:"var(--muted)"},"Liquid");
 }
 function table(message){
  const body=$("bu-trials");body.replaceChildren();
  if(!records.length){
   const tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=7;td.textContent="No trials recorded.";tr.appendChild(td);body.appendChild(tr);
  }
  for(const [i,r] of records.entries()){
   const tr=document.createElement("tr");
   [i+1,r.mass,r.volume,fmt(r.density),fmt(r.liquidDensity),r.prediction,r.result].forEach(v=>{
    const td=document.createElement("td");td.textContent=String(v);tr.appendChild(td);
   });body.appendChild(tr);
  }
  graph();
  if(message)$("bu-status").textContent=message;
 }
 $("bu-mass").addEventListener("input",e=>{mass=Number(e.target.value);reset();});
 $("bu-volume").addEventListener("input",e=>{volume=Number(e.target.value);reset();});
 $("bu-fluid").addEventListener("change",e=>{fluid=e.target.value;reset();});
 root.querySelectorAll("[data-bu-guess]").forEach(b=>b.addEventListener("click",()=>setGuess(b.dataset.buGuess)));
 $("bu-record").addEventListener("click",()=>{
  if(!revealed){table("Make a prediction first.");return;}
  const r={...model(mass,volume,fluid),prediction};
  if(records.some(x=>x.mass===mass&&x.volume===volume&&x.fluid===fluid)){table("This combination is already in the table.");return;}
  if(records.length>=12){table("Maximum 12 trials. Export or clear your records.");return;}
  records.push(r);table(records.length+" observations · "+new Set(records.map(x=>x.fluid)).size+" different liquids compared.");
 });
 $("bu-clear").addEventListener("click",()=>{
  if(records.length&&!window.confirm("Clear these trials? Download them first if you need a copy."))return;
  records=[];table("Trials cleared. There is no saved copy.");
 });
 $("bu-export").addEventListener("click",()=>{
  const quote=v=>'"'+String(v??"").replace(/"/g,'""')+'"';
  const rows=[["Mass (g)","Volume (cm3)","Object density (g/cm3)","Liquid","Liquid density (g/cm3)","Prediction","Outcome","Explanation"]];
  records.forEach(r=>rows.push([r.mass,r.volume,fmt(r.density),r.liquid,fmt(r.liquidDensity),r.prediction,r.result,$("bu-conclusion").value]));
  const csv="\ufeff"+rows.map(row=>row.map(quote).join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"})),a=document.createElement("a");
  a.href=url;a.download="buoyancy-liquid-comparison.csv";root.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  table("CSV downloaded. This is not an automatic assignment submission.");
 });
 draw();table();root.buoyancyInvestigation={get values(){return {mass,volume,fluid};},get trials(){return records.map(x=>({...x}));}};
}
const previous=H.lessonTools["matter/density"];
H.lessonTools["matter/density"]=function(root){
 if(previous){const old=document.createElement("div");root.appendChild(old);previous(old);}
 const panel=document.createElement("div");root.appendChild(panel);mount(panel);
};
H.buoyancyModel={FLUIDS,model};
})();