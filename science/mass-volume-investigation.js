/* Science 8 · Mass versus Volume Investigation.
   Idealized data: uniform rigid solids, constant density, error-free virtual measurements.
   The graph records actual trial choices; the density estimate is a fit through the origin. */
(function(g){
"use strict";
const H=g.HUB;if(!H)return;
const samples={
 wood:{name:"Sample A · light wood",density:0.7,tone:"#386d57"},
 plastic:{name:"Sample B · dense plastic",density:1.2,tone:"#a66e36"},
 metal:{name:"Sample C · aluminium",density:2.7,tone:"#3e6d9e"}
};
const volumes=[20,40,60,80,100,120];
const esc=x=>String(x==null?"":x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=x=>Number(x.toFixed(2)).toString();
const core={
 samples,volumes,
 measure(id,volume){
  if(!samples[id]||!volumes.includes(volume))throw Error("Unknown material or invalid volume");
  return {id,volume,mass:Number((samples[id].density*volume).toFixed(2))};
 },
 slope(points){
  if(!Array.isArray(points)||!points.length)throw Error("Two or more measured volumes are required");
  if(points.some(p=>!p||!Number.isFinite(p.volume)||p.volume<=0||!Number.isFinite(p.mass)||p.mass<0))
   throw Error("Invalid mass-volume trial");
  const sumXY=points.reduce((a,p)=>a+p.volume*p.mass,0);
  const sumX2=points.reduce((a,p)=>a+p.volume*p.volume,0);
  return sumXY/sumX2;
 },
 classify(density,water=1){
  if(!Number.isFinite(density)||density<=0||!Number.isFinite(water)||water<=0)throw Error("Invalid density");
  return Math.abs(density-water)<.000001?"neutral":density<water?"float":"sink";
 },
 observations(records,id){
  return records.filter(t=>t.id===id).slice().sort((a,b)=>a.volume-b.volume);
 },
 complete(records){return Object.keys(samples).every(id=>new Set(this.observations(records,id).map(r=>r.volume)).size>=2);}
};
const css=[
".mvg{border:1px solid var(--rule);border-radius:12px;background:var(--paper);padding:20px;margin:22px 0;line-height:1.55;color:var(--ink)}",
".mvg *{box-sizing:border-box}.mvg h3{margin:0 0 5px;font-size:1.3rem}.mvg h4{font-size:1rem;margin:12px 0 8px}",
".mvg p{margin:8px 0;color:var(--muted)}.mvg .small{font-size:.8rem}.mvg .columns{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(220px,1fr);gap:20px;align-items:start;margin:18px 0}",
".mvg .chart{padding:12px;background:var(--soft);border:1px solid var(--rule);border-radius:10px;min-width:0}.mvg svg{display:block;width:100%;height:auto}",
".mvg svg text{font:12px var(--f-body,system-ui);fill:var(--ink)}.mvg svg .axis{stroke:var(--ink);stroke-width:2}.mvg svg .grid{stroke:var(--rule);stroke-width:1}",
".mvg .controls{display:grid;gap:14px;align-content:start}.mvg label{font-size:.83rem;font-weight:700;display:grid;gap:5px}",
".mvg select,.mvg textarea{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:7px;padding:10px;min-height:43px;width:100%}",
".mvg textarea{min-height:80px;resize:vertical}.mvg button{font:inherit;cursor:pointer;min-height:42px;padding:9px 13px;border:1px solid var(--rule);background:var(--paper);color:var(--ink);border-radius:7px;font-weight:700}",
".mvg button.primary{color:var(--on-btn);background:var(--btn);border-color:var(--btn)}.mvg button:focus-visible,.mvg select:focus-visible,.mvg textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".mvg .stat{padding:11px 12px;background:var(--soft);border-radius:8px;font-size:.84rem}.mvg .stat strong{display:block;font-size:1.35rem;font-variant-numeric:tabular-nums}",
".mvg .legend{display:flex;gap:12px;flex-wrap:wrap;margin-top:10px;font-size:.79rem}.mvg .key{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:5px;vertical-align:middle}",
".mvg .feedback{font-size:.84rem;min-height:1.5em;color:var(--accent-ink);font-weight:650}.mvg .tablewrap{overflow:auto;max-width:100%}.mvg table{border-collapse:collapse;width:100%;min-width:540px;font-size:.82rem}",
".mvg th,.mvg td{border-bottom:1px solid var(--rule);padding:9px 8px;text-align:left;font-variant-numeric:tabular-nums}.mvg th{color:var(--muted)}",
".mvg .section{margin-top:18px;border-top:1px solid var(--rule);padding-top:15px}.mvg .actions{display:flex;gap:9px;flex-wrap:wrap;margin:13px 0}",
".mvg .slope-table{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.mvg .slope-table>div{padding:12px;background:var(--soft);border-radius:7px;font-size:.8rem;min-width:0}.mvg .slope-table strong{display:block;font-size:1.2rem}",
"@media(max-width:830px){.mvg .columns{grid-template-columns:1fr}}@media(max-width:500px){.mvg{padding:12px}.mvg .slope-table{grid-template-columns:1fr}}"
].join("\n");
function plot(records){
 const w=700,h=430,x0=78,y0=340,plotW=552,plotH=287,maxVolume=120,maxMass=360;
 const x=v=>x0+plotW*v/maxVolume,y=m=>y0-plotH*m/maxMass;
 let out='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Mass versus volume graph with '+records.length+' observations. Volume on horizontal axis in cubic centimetres; mass on vertical axis in grams.">';
 out+='<text x="350" y="25" text-anchor="middle" font-size="18" font-weight="700">Mass against volume</text>';
 for(let i=0;i<=6;i++){
  const v=i*20,xx=x(v),m=i*60,yy=y(m);
  out+='<path class="grid" d="M'+fmt(xx)+' 53V'+y0+'"/><text x="'+fmt(xx)+'" y="360" text-anchor="middle">'+v+'</text>';
  out+='<path class="grid" d="M'+x0+' '+fmt(yy)+'H630"/><text x="64" y="'+fmt(yy+4)+'" text-anchor="end">'+m+'</text>';
 }
 out+='<path class="axis" d="M78 53V340H630"/><text x="355" y="400" text-anchor="middle">Volume (cm³)</text>';
 out+='<text transform="translate(22 194) rotate(-90)" text-anchor="middle">Mass (g)</text>';
 for(const [id,s] of Object.entries(samples)){
  const points=core.observations(records,id);
  if(points.length>=2){
   const density=core.slope(points),last=points[points.length-1].volume;
   out+='<path d="M'+x0+' '+y0+' L'+fmt(x(last))+' '+fmt(y(density*last))+'" fill="none" stroke="'+s.tone+'" stroke-width="3" stroke-dasharray="7 4"/>';
  }
  for(const t of points){
   out+='<circle cx="'+fmt(x(t.volume))+'" cy="'+fmt(y(t.mass))+'" r="6" fill="'+s.tone+'" stroke="var(--paper)" stroke-width="2"/>';
  }
 }
 out+='</svg>';
 return out;
}
function mount(root){
 let selected="wood",vol=20,records=[];
 root.innerHTML='<section class="mvg"><style>'+css+'</style><h3>Mass–Volume Graphing Investigation</h3>'+
 '<p>Collect mass and volume measurements from three uniform solids. Graph your data, compare the slopes, and work out what each slope means. Change the volume while keeping the material the same for a fair comparison.</p>'+
 '<div class="columns"><div class="chart"><div id="mvg-chart"></div>'+
 '<div class="legend">'+Object.entries(samples).map(([id,s])=>'<span><i class="key" style="background:'+s.tone+'"></i>'+esc(s.name)+'</span>').join("")+'</div></div>'+
 '<div class="controls"><label>Choose a material<select id="mvg-material">'+Object.entries(samples).map(([id,s])=>'<option value="'+id+'">'+esc(s.name)+'</option>').join("")+'</select></label>'+
 '<label>Set block volume (cm³)<select id="mvg-volume">'+volumes.map(v=>'<option value="'+v+'">'+v+' cm³</option>').join("")+'</select></label>'+
 '<button class="primary" type="button" id="mvg-measure">Measure and plot this block</button>'+
 '<div class="stat">Last measurement<strong id="mvg-last">No trials yet</strong><span id="mvg-last-formula">Mass ÷ volume = density</span></div>'+
 '<p class="small">These are ideal virtual measurements: each material has constant density and the balance has no measurement error.</p>'+
 '<p class="feedback" id="mvg-status" role="status"></p></div></div>'+
 '<section class="section"><h4>1 · Measurements</h4><p class="small">Record at least two different volumes for each material. You can remove a trial and repeat it.</p>'+
 '<div class="tablewrap"><table><thead><tr><th>Material</th><th>Volume (cm³)</th><th>Mass (g)</th><th>Density (g/cm³)</th><th>Action</th></tr></thead><tbody id="mvg-records"></tbody></table></div>'+
 '<p id="mvg-progress" class="feedback" role="status"></p></section>'+
 '<section class="section"><h4>2 · Interpret the slopes</h4><p class="small">A mass-versus-volume graph of a uniform material has slope = rise ÷ run = mass ÷ volume, so the slope gives density (g/cm³). The dashed lines assume a zero mass at zero volume.</p>'+
 '<div class="slope-table" id="mvg-slopes"></div>'+
 '<div class="columns"><div><label for="mvg-predict">Which sample has the steepest line?</label>'+
 '<select id="mvg-predict"><option value="">Predict the steepest</option>'+Object.entries(samples).map(([id,s])=>'<option value="'+id+'">'+esc(s.name)+'</option>').join("")+'</select></div>'+
 '<div><button id="mvg-check" type="button">Check prediction</button><p id="mvg-check-status" class="feedback" role="status"></p></div></div></section>'+
 '<section class="section"><h4>3 · Explain with evidence</h4>'+
 '<label>Claim<textarea id="mvg-claim" placeholder="The material with the steepest mass–volume line…"></textarea></label>'+
 '<label>Evidence<textarea id="mvg-evidence" placeholder="At the same volume, Sample A has…"></textarea></label>'+
 '<label>Reasoning<textarea id="mvg-reason" placeholder="For a uniform material, density equals…"></textarea></label>'+
 '<div class="actions"><button type="button" class="primary" id="mvg-export">Download investigation (.txt)</button><button type="button" id="mvg-clear">Clear measurements</button></div>'+
 '<p class="feedback" id="mvg-export-status" role="status"></p>'+
 '<p class="small">Idealized uniform solids, 20–120 cm³ and no measuring error. For an independent assignment, keep your observations and include a fair-test explanation. Work stays in this tab until downloaded; nothing is submitted automatically.</p>'+
 '</section></section>';
 const $=id=>root.querySelector(id);
 function redraw(){
  $("#mvg-chart").innerHTML=plot(records);
  $("#mvg-records").innerHTML=records.length?records.map((t,i)=>'<tr><td>'+esc(samples[t.id].name)+'</td><td>'+t.volume+'</td><td>'+fmt(t.mass)+'</td><td>'+fmt(t.mass/t.volume)+'</td><td><button type="button" data-remove="'+i+'" aria-label="Remove observation '+(i+1)+'">Remove</button></td></tr>').join(""):'<tr><td colspan="5">No observations yet. Choose a sample and volume to measure.</td></tr>';
  const distinct=Object.keys(samples).filter(id=>core.observations(records,id).length>=2).length;
  $("#mvg-progress").textContent=records.length+' measurements · '+distinct+'/3 materials have two distinct volumes.';
  $("#mvg-slopes").innerHTML=Object.entries(samples).map(([id,s])=>{
   const pts=core.observations(records,id);const enough=pts.length>=2;
   const slope=enough?core.slope(pts):null;
   return '<div><span>'+esc(s.name)+'</span><strong>'+(enough?fmt(slope)+' g/cm³':'Need 2 trials')+'</strong>'+
    (enough?'<span>Predicted in freshwater: '+core.classify(slope)+'</span>':'<span>Measure two volumes to reveal slope.</span>')+'</div>';
  }).join("");
 }
 function add(){
  if(records.some(t=>t.id===selected&&t.volume===vol)){
   $("#mvg-status").textContent="You already measured that material at this volume. Choose another combination.";return;
  }
  const t=core.measure(selected,vol);records.push(t);
  $("#mvg-last").textContent=fmt(t.mass)+' g at '+t.volume+' cm³';
  $("#mvg-last-formula").textContent=fmt(t.mass)+' ÷ '+t.volume+' = '+fmt(t.mass/t.volume)+' g/cm³';
  $("#mvg-status").textContent='Measurement '+records.length+' plotted. Keep material constant and change volume to compare the slope.';
  redraw();
 }
 $("#mvg-material").addEventListener("change",e=>{selected=e.target.value;$("#mvg-status").textContent="";});
 $("#mvg-volume").addEventListener("change",e=>{vol=Number(e.target.value);$("#mvg-status").textContent="";});
 $("#mvg-measure").addEventListener("click",add);
 $("#mvg-records").addEventListener("click",e=>{
  const btn=e.target.closest("[data-remove]");if(!btn)return;
  const idx=Number(btn.dataset.remove);if(!Number.isInteger(idx)||idx<0||idx>=records.length)return;
  records.splice(idx,1);$("#mvg-status").textContent="Observation removed.";redraw();
 });
 $("#mvg-check").addEventListener("click",()=>{
  const answer=$("#mvg-predict").value;
  $("#mvg-check-status").textContent=!answer?"Choose a material first.":!core.complete(records)?"Measure at least two volumes of all three materials before checking.":
   answer==="metal"?"Correct. Aluminium produces the steepest mass–volume line because it has the greatest density.":
   "Try again. The steepest line gains the most mass per cubic centimetre of added volume.";
 });
 $("#mvg-export").addEventListener("click",()=>{
  if(!core.complete(records)){$("#mvg-export-status").textContent="Collect two different volumes for every sample before exporting.";return;}
  const writing=["#mvg-claim","#mvg-evidence","#mvg-reason"].map(k=>$(k).value.trim());
  if(writing.some(t=>t.split(/\s+/).filter(Boolean).length<6)){
   $("#mvg-export-status").textContent="Write at least six words in your claim, evidence and reasoning.";return;
  }
  const report=["Mass–Volume Graphing Investigation","Grade 8 Science · Matter and Density",
   "Idealized simulated solids; no measuring error.","",
   ...records.map((t,i)=>"Trial "+(i+1)+": "+samples[t.id].name+" — "+t.volume+" cm³, "+fmt(t.mass)+" g"),
   "",...Object.entries(samples).map(([id,s])=>"Slope "+s.name+": "+fmt(core.slope(core.observations(records,id)))+" g/cm³"),
   "","CLAIM:",writing[0],"","EVIDENCE:",writing[1],"","REASONING:",writing[2],
   "","LIMITATIONS: Uniform samples, exact values and a fit through the origin."].join("\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="mass-volume-investigation.txt";document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#mvg-export-status").textContent="Report downloaded; submit it using your teacher's instructions.";
 });
 $("#mvg-clear").addEventListener("click",()=>{
  if(!g.confirm("Clear all measured trials and written explanations? Download your work first if you need a copy."))return;
  records=[];["#mvg-claim","#mvg-evidence","#mvg-reason"].forEach(k=>$(k).value="");redraw();
  $("#mvg-status").textContent="Measurements cleared.";
 });
 redraw();
 root.massVolumeLab={get records(){return records.slice();},measure:core.measure};
}
H.lessonTools=H.lessonTools||{};
const prior=H.lessonTools["matter/density"];
H.lessonTools["matter/density"]=root=>{
 if(prior){const existing=document.createElement("div");root.appendChild(existing);prior(existing);}
 const extra=document.createElement("div");root.appendChild(extra);mount(extra);
};
g.MassVolumeCore=core;
})(window);