/* Grade 8 virtual microscope: vector illustration, not an actual photomicrograph. */
(function(g){
"use strict";
const H=g.HUB;if(!H)return;
const specimens={
 onion:{label:"Onion epidermis",size:110,kind:"rect",note:"Illustrated plant cells have cell walls. Bulb epidermis usually has no visible chloroplasts."},
 cheek:{label:"Cheek epithelial cells",size:65,kind:"oval",note:"Illustrated animal cells have flexible membranes and nuclei. Cells vary in size."},
 algae:{label:"Green pond alga",size:48,kind:"green",note:"One illustrative green alga; real pond water contains many differently sized organisms."}
};
const core={specimens,objectives:[4,10,40],ocular:10,
 fieldUm:n=>18000/n,total:n=>n*10,
 estimate:(field,count)=>count>0?field/count:NaN,
 countAcross:(name,n)=>18000/n/specimens[name].size
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const rnd=x=>Math.round(x*10)/10;
function mount(el){
 let name="onion",obj=4,focus=100,panX=0,panY=0,records=[];
 el.innerHTML='<section class="vm"><h3>Virtual Microscope Investigation</h3>'+
 '<p>Focus a specimen, change magnification, record measurements, and use your evidence to explain how field of view changes.</p>'+
 '<div class="vm-grid"><div class="vm-view"><svg id="vm-picture" viewBox="0 0 420 420" role="img" aria-label="Stylized microscope specimen"></svg><p id="vm-scale" class="vm-canvas-label"></p></div>'+
 '<div class="vm-controls">'+
 '<label>Slide<select id="vm-slide">'+Object.entries(specimens).map(([k,v])=>'<option value="'+k+'">'+esc(v.label)+'</option>').join("")+'</select></label>'+
 '<label>Objective<select id="vm-objective">'+core.objectives.map(n=>'<option value="'+n+'">'+n+'× objective · '+core.total(n)+'× total</option>').join("")+'</select></label>'+
 '<label>Focus <output id="vm-focus-status">Sharp</output><input id="vm-focus" type="range" min="0" max="100" value="100"></label>'+
 '<label>Slide position · horizontal<input id="vm-x" type="range" min="-100" max="100" value="0"></label>'+
 '<label>Slide position · vertical<input id="vm-y" type="range" min="-100" max="100" value="0"></label>'+
 '<div class="vm-metrics"><span><b id="vm-total">40×</b> total</span><span><b id="vm-field">4500 µm</b> field</span></div></div></div>'+
 '<p id="vm-specimen-note"></p>'+
 '<section class="vm-section"><h4>1 · Prediction and measurement</h4>'+
 '<div class="vm-response"><label>When magnification increases, how many cells fit across the field?'+
 '<select id="vm-predict"><option value="">Choose an answer</option><option value="more">More cells</option><option value="fewer">Fewer cells</option><option value="same">The same number</option></select></label>'+
 '<button type="button" id="vm-check">Check prediction</button></div><p id="vm-feedback" class="vm-notice" role="status"></p>'+
 '<div class="vm-response"><label>Estimated cell widths across the circular field'+
 '<input id="vm-count" type="number" min="0.1" max="200" step="0.1" inputmode="decimal" placeholder="Example: 15"></label>'+
 '<button id="vm-record" type="button" class="primary">Record trial</button></div><p id="vm-record-status" class="vm-notice" role="status"></p></section>'+
 '<section class="vm-section"><h4>2 · Your evidence</h4>'+
 '<p class="vm-small">Estimated cell size = field diameter ÷ cell widths across. Try three different specimen/objective combinations.</p>'+
 '<div class="vm-table-wrap"><table><thead><tr><th>Slide</th><th>Objective</th><th>Field (µm)</th><th>Count</th><th>Size (µm)</th><th>Action</th></tr></thead><tbody id="vm-rows"></tbody></table></div>'+
 '<p class="vm-small" id="vm-trials">0 trials recorded.</p></section>'+
 '<section class="vm-section"><h4>3 · Claim, evidence and reasoning</h4>'+
 '<label>Claim<textarea id="vm-claim" placeholder="I think…"></textarea></label>'+
 '<label>Evidence<textarea id="vm-evidence" placeholder="My recorded observations show…"></textarea></label>'+
 '<label>Reasoning<textarea id="vm-reasoning" placeholder="This happens because…"></textarea></label>'+
 '<div class="vm-actions"><button class="primary" id="vm-export" type="button">Download investigation</button><button id="vm-clear" type="button">Clear work</button></div>'+
 '<p id="vm-export-status" role="status" class="vm-notice"></p>'+
 '<p class="vm-small">This is a schematic model, not a real microscope image. Measurements are approximate. Work stays only in this tab until exported.</p></section></section>';
 const $=id=>el.querySelector(id);
 function draw(){
  const field=core.fieldUm(obj),step=Math.max(4,366*specimens[name].size/field);
  const cols=Math.min(44,Math.ceil(390/step)+2),rows=Math.min(44,Math.ceil(390/step)+2);
  let shapes="";
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
   const a=210-cols*step/2+x*step+panX*.45,b=210-rows*step/2+y*step+panY*.45;
   if(Math.hypot(a-210,b-210)>184+step)continue;
   if(specimens[name].kind==="rect"){
    shapes+='<rect x="'+rnd(a)+'" y="'+rnd(b)+'" width="'+rnd(step*.93)+'" height="'+rnd(step*.74)+'" rx="2" fill="#ead7ad" stroke="#7f7154" stroke-width="1"/>';
    if(step>10)shapes+='<ellipse cx="'+rnd(a+step*.56)+'" cy="'+rnd(b+step*.4)+'" rx="'+rnd(step*.08)+'" ry="'+rnd(step*.09)+'" fill="#a8897c"/>';
   }else{
    const green=specimens[name].kind==="green",cy=b+step*.38,cx=a+step*.46;
    shapes+='<ellipse cx="'+rnd(cx)+'" cy="'+rnd(cy)+'" rx="'+rnd(step*.44)+'" ry="'+rnd(step*.33)+'" fill="'+(green?"#9acb91":"#ddcdd6")+'" stroke="'+(green?"#3b7c4e":"#977a89")+'" stroke-width="1"/>';
    if(step>10)shapes+='<circle cx="'+rnd(cx)+'" cy="'+rnd(cy)+'" r="'+rnd(step*.09)+'" fill="'+(green?"#4a874e":"#8e748d")+'"/>';
   }
  }
  const bar=field>=1000?500:field>=500?100:50;
  $("#vm-picture").innerHTML='<defs><clipPath id="vm-clip"><circle cx="210" cy="210" r="183"/></clipPath>'+
   '<filter id="vm-soft"><feGaussianBlur stdDeviation="'+rnd((100-focus)/22)+'"/></filter></defs>'+
   '<circle cx="210" cy="210" r="185" fill="#eef2ea" stroke="#263e31" stroke-width="4"/>'+
   '<g clip-path="url(#vm-clip)"><g filter="url(#vm-soft)">'+shapes+'</g>'+
   '<line x1="50" y1="348" x2="'+rnd(50+366*bar/field)+'" y2="348" stroke="#153b29" stroke-width="4"/>'+
   '<text x="50" y="369" font-size="12" fill="#153b29">'+bar+' µm</text></g>';
  $("#vm-picture").setAttribute("aria-label",specimens[name].label+" at "+core.total(obj)+" times total magnification. Model field "+field+" micrometres.");
  $("#vm-scale").textContent="Approx. "+rnd(core.countAcross(name,obj))+" cells across · "+bar+" µm scale bar";
  $("#vm-total").textContent=core.total(obj)+"×";$("#vm-field").textContent=field+" µm";
  $("#vm-focus-status").textContent=focus>=95?"Sharp":focus>=85?"Nearly sharp":"Blurred";
  $("#vm-specimen-note").textContent=specimens[name].note;
 }
 function drawTable(){
  $("#vm-rows").innerHTML=records.length?records.map((t,i)=>'<tr><td>'+esc(specimens[t.specimen].label)+'</td><td>'+t.objective+'×</td><td>'+t.field+
   '</td><td>'+t.count+'</td><td>'+rnd(t.size)+'</td><td><button type="button" data-remove="'+i+'">Remove</button></td></tr>').join(""):
   '<tr><td colspan="6">No recorded observations yet.</td></tr>';
  $("#vm-trials").textContent=records.length+" distinct trial(s) recorded.";
 }
 $("#vm-slide").addEventListener("change",e=>{name=e.target.value;draw();});
 $("#vm-objective").addEventListener("change",e=>{obj=Number(e.target.value);draw();});
 $("#vm-focus").addEventListener("input",e=>{focus=Number(e.target.value);draw();});
 $("#vm-x").addEventListener("input",e=>{panX=Number(e.target.value);draw();});
 $("#vm-y").addEventListener("input",e=>{panY=Number(e.target.value);draw();});
 $("#vm-check").addEventListener("click",()=>{
  const v=$("#vm-predict").value;
  $("#vm-feedback").textContent=!v?"Choose a prediction first.":v==="fewer"?
   "Correct: higher magnification means a smaller field of view and fewer cells across.":
   "Try again. Higher magnification shows a smaller area of the specimen.";
 });
 $("#vm-record").addEventListener("click",()=>{
  const raw=$("#vm-count").value,count=Number(raw),field=core.fieldUm(obj);
  if(!raw||!Number.isFinite(count)||count<=0||count>200){$("#vm-record-status").textContent="Enter a positive count from 0.1 to 200.";return;}
  if(focus<85){$("#vm-record-status").textContent="Focus to at least 85 before recording.";return;}
  if(records.some(x=>x.specimen===name&&x.objective===obj)){$("#vm-record-status").textContent="Already recorded. Choose another specimen or objective.";return;}
  records.push({specimen:name,objective:obj,field,count,size:core.estimate(field,count)});
  drawTable();$("#vm-record-status").textContent="Recorded trial "+records.length+".";
 });
 $("#vm-rows").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(b){records.splice(Number(b.dataset.remove),1);drawTable();}});
 $("#vm-export").addEventListener("click",()=>{
  if(records.length<3){$("#vm-export-status").textContent="Record three different trials first.";return;}
  const texts=["#vm-claim","#vm-evidence","#vm-reasoning"].map(k=>$(k).value.trim());
  if(texts.some(t=>t.split(/\s+/).filter(Boolean).length<6)){$("#vm-export-status").textContent="Write at least six words for claim, evidence and reasoning.";return;}
  const report=["Virtual Microscope Investigation","Grade 8 Science · Cells & Systems","Illustrative model (not a real micrograph)","",
   ...records.flatMap((t,i)=>["Trial "+(i+1)+": "+specimens[t.specimen].label+"; objective "+t.objective+"×; total "+core.total(t.objective)+"×",
     "Field "+t.field+" µm; cell widths across "+t.count+"; size estimate "+rnd(t.size)+" µm",""]),
   "CLAIM:",texts[0],"EVIDENCE:",texts[1],"REASONING:",texts[2],"Model limitations: schematic specimen dimensions vary from real cells."].join("\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="virtual-microscope-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#vm-export-status").textContent="Downloaded; submit your work using your teacher's instructions.";
 });
 $("#vm-clear").addEventListener("click",()=>{
  if(!g.confirm("Clear recorded observations and written responses?"))return;
  records=[];["#vm-claim","#vm-evidence","#vm-reasoning"].forEach(k=>$(k).value="");drawTable();
 });
 drawTable();draw();
 el.microscopeInvestigation={get trials(){return records.slice();},select(n,o){if(specimens[n]){$("#vm-slide").value=n;name=n;}if(core.objectives.includes(o)){$("#vm-objective").value=o;obj=o;}draw();}};
}
H.lessonTools=H.lessonTools||{};
const previous=H.lessonTools["cells/theory"];
H.lessonTools["cells/theory"]=root=>{
 const pane=document.createElement("div");root.appendChild(pane);mount(pane);
 if(previous){const old=document.createElement("div");root.appendChild(old);previous(old);}
};
g.VirtualMicroscopeCore=core;
})(window);