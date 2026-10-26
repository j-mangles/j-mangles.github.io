/* Science 8 Solar Spectrum & Albedo Explorer.
   Uses the renewed Manitoba Grade 8 science concepts SCI.8.E.7–9/E.13.
   All diagrams are conceptual. Surface calculations model 100 arbitrary units
   without atmospheric absorption/transmission or a full Earth energy budget. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const bands=[
 {id:"radio",name:"Radio",example:"Broadcast signals",idea:"Very long wavelengths and low frequency compared with the other groups shown.",use:"Wireless communication"},
 {id:"microwave",name:"Microwaves",example:"Microwave ovens and radar",idea:"Shorter wavelengths than radio, but longer than infrared.",use:"Cooking, radar and communication"},
 {id:"infrared",name:"Infrared",example:"Thermal imaging",idea:"Beyond visible red light; often associated with radiation from warm objects.",use:"Thermal cameras"},
 {id:"visible",name:"Visible light",example:"Sunlight that our eyes detect",idea:"The narrow portion of the electromagnetic spectrum humans see.",use:"Vision and photosynthesis"},
 {id:"ultraviolet",name:"Ultraviolet",example:"Sun exposure and UV safety",idea:"Shorter wavelength and higher frequency than visible violet light.",use:"UV lamps and sun-safety discussions"},
 {id:"xray",name:"X-rays",example:"Medical imaging",idea:"Higher frequency and photon energy than UV radiation.",use:"Radiographs"},
 {id:"gamma",name:"Gamma rays",example:"High-energy nuclear processes",idea:"Among the shortest wavelengths and highest frequencies in this schematic.",use:"Some medical treatments"}
];
const index=id=>bands.findIndex(x=>x.id===id);
function compare(a,b){
 const i=index(a),j=index(b);
 if(i<0||j<0)throw Error("Unrecognized radiation band");
 return {frequency:i===j?"same":i>j?"higher":"lower",wavelength:i===j?"same":i>j?"shorter":"longer",energy:i===j?"same":i>j?"higher":"lower"};
}
function energyBudget(percent,incoming=100){
 if(!Number.isFinite(percent)||percent<0||percent>100||!Number.isFinite(incoming)||incoming<0)throw Error("Invalid albedo");
 const reflected=Math.round(incoming*percent/100*100)/100;
 return {incoming,albedo:percent,reflected,absorbed:Math.round((incoming-reflected)*100)/100};
}
function waveSVG(id){
 const n=index(id),cycles=1+n*1.25,points=[];
 for(let i=0;i<=220;i++){
  const x=32+i*(676/220),y=70-28*Math.sin(i/220*Math.PI*2*cycles);
  points.push(x.toFixed(1)+","+y.toFixed(1));
 }
 return '<svg role="img" aria-label="Conceptual electromagnetic wave sketch for '+bands[n].name+
  '. Frequency increases and wavelength decreases from radio through gamma rays. Not to scale." viewBox="0 0 740 143" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg">'+
  '<rect x="0" y="0" width="740" height="143" rx="12" fill="#F7F8FF"/>'+
  '<line x1="30" y1="70" x2="708" y2="70" stroke="#B2B7CE" stroke-width="1" stroke-dasharray="4 4"/>'+
  '<polyline points="'+points.join(" ")+'" stroke="#5968E8" stroke-width="3" fill="none"/>'+
  '<text x="34" y="126" font-size="13" fill="#414658">Relative wave illustration — spacing only; not actual wavelengths</text></svg>';
}
function albedoSVG(percent){
 const d=energyBudget(percent),left=30,w=680;
 const reflected=w*percent/100;
 return '<svg role="img" aria-label="Out of 100 units of incoming solar radiation, '+d.reflected+
  ' units are reflected and '+d.absorbed+
  ' are absorbed in this simplified surface-only example." viewBox="0 0 740 208" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg">'+
  '<rect x="0" y="0" width="740" height="208" rx="12" fill="#F7F8FF"/>'+
  '<text x="'+left+'" y="30" font-size="16" fill="#202126" font-weight="700">100 units incoming sunlight</text>'+
  '<rect x="'+left+'" y="43" width="'+w+'" height="20" rx="5" fill="#F5C56A"/>'+
  '<text x="'+left+'" y="91" font-size="15" fill="#34374B">Where that sunlight goes in this model:</text>'+
  '<rect x="'+left+'" y="105" width="'+w+'" height="49" rx="5" fill="#E4E7F8"/>'+
  (reflected>0?'<rect x="'+left+'" y="105" width="'+reflected.toFixed(2)+'" height="49" rx="4" fill="#6D7AEC"/>':"")+
  (reflected<w?'<rect x="'+(left+reflected).toFixed(2)+'" y="105" width="'+(w-reflected).toFixed(2)+'" height="49" rx="4" fill="#F5B775"/>':"")+
  '<text x="'+left+'" y="177" font-size="13" fill="#4653BC">■ Reflected: '+d.reflected+' units</text>'+
  '<text x="'+(left+290)+'" y="177" font-size="13" fill="#8C5C20">■ Absorbed: '+d.absorbed+' units</text>'+
  '<text x="'+left+'" y="199" font-size="12" fill="#555B70">Illustrative surface model — no atmosphere or transmission shown</text></svg>';
}
function explorer(el){
 let tab="spectrum",selected="visible",reference="infrared",answer="",albedo=30;
 const $=s=>el.querySelector(s),all=s=>[...el.querySelectorAll(s)];
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&quot;"}[c]));
 el.innerHTML='<section class="solar-explorer"><style>'+
 '.solar-explorer{color:var(--ink);font-family:var(--f-body);line-height:1.5}'+
 '.solar-explorer h2{margin:8px 0 10px;font-size:26px}'+
 '.solar-explorer .se-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}'+
 '.solar-explorer button,.solar-explorer select{font:inherit}'+
 '.solar-explorer button:focus-visible,.solar-explorer select:focus-visible,.solar-explorer input:focus-visible{outline:3px solid var(--accent);outline-offset:3px}'+
 '.solar-explorer .se-tabs button,.solar-explorer .se-choices button{border:1px solid var(--rule);border-radius:10px;background:var(--paper);color:var(--ink);padding:10px 12px;cursor:pointer;min-height:44px}'+
 '.solar-explorer button[aria-pressed="true"]{background:var(--accent-soft);border-color:var(--accent);font-weight:700}'+
 '.solar-explorer .se-spectrum{display:grid;grid-template-columns:repeat(7,minmax(110px,1fr));gap:6px;min-width:815px}'+
 '.solar-explorer .se-strip{overflow-x:auto;scrollbar-width:thin;padding-bottom:6px}'+
 '.solar-explorer .se-spectrum button{font:inherit;font-size:13px;min-height:94px;white-space:normal;text-align:left;background:var(--paper);border:1px solid var(--rule);border-top:7px solid #5968E8;padding:9px;border-radius:7px;color:var(--ink);cursor:pointer}'+
 '.solar-explorer .se-spectrum button[aria-pressed="true"]{background:var(--accent-soft);border-color:var(--accent);border-top-width:7px}'+
 '.solar-explorer .se-spectrum small{font-size:10px;color:var(--muted);display:block;padding-top:7px}'+
 '.solar-explorer .se-arrows{display:flex;justify-content:space-between;gap:8px;font-size:12px;font-weight:650;color:var(--muted);margin:5px 0 17px}'+
 '.solar-explorer .se-visual{overflow-x:auto;margin:16px 0;border:1px solid var(--rule);border-radius:10px}'+
 '.solar-explorer .se-insight{padding:14px 16px;background:var(--soft);border-radius:9px;line-height:1.5}'+
 '.solar-explorer .se-compare{display:flex;align-items:end;flex-wrap:wrap;gap:11px;margin:18px 0}'+
 '.solar-explorer label{display:grid;gap:6px;font-size:13px;font-weight:650}'+
 '.solar-explorer select{padding:10px;border:1px solid var(--rule);border-radius:7px;background:var(--paper);color:var(--ink);min-height:44px}'+
 '.solar-explorer input[type=range]{width:min(420px,100%);min-height:44px;accent-color:var(--accent)}'+
 '.solar-explorer .se-status{min-height:30px;color:var(--accent-ink);font-weight:650}'+
 '.solar-explorer .se-note{font-size:13px;color:var(--muted);margin-top:20px}'+
 '</style><div class="eyebrow">Science 8 · Solar Energy and Light</div>'+
 '<h2>Solar Spectrum & Albedo Explorer</h2>'+
 '<p class="note">Explore how wavelength, frequency and energy are related, and why different surfaces reflect different proportions of sunlight.</p>'+
 '<div class="se-tabs" role="group" aria-label="Choose investigation">'+
 '<button data-tab="spectrum" type="button">Electromagnetic spectrum</button>'+
 '<button data-tab="albedo" type="button">Sunlight and albedo</button></div>'+
 '<div id="se-content"></div><p class="se-note">This is a conceptual classroom model. It is not a measurement of a real wavelength or Earth’s complete energy budget.</p></section>';
 const container=$("#se-content");
 function draw(){
  all("[data-tab]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.tab===tab)));
  if(tab==="spectrum"){
   const b=bands[index(selected)];
   container.innerHTML='<p class="note">Move right for <b>greater frequency and photon energy</b>, and <b>shorter wavelength</b>.</p>'+
    '<div class="se-strip"><div class="se-spectrum" role="group" aria-label="Spectrum from longest to shortest wavelengths">'+
    bands.map((x,i)=>'<button type="button" data-band="'+x.id+'" aria-pressed="'+(x.id===selected)+'">'+
      '<strong>'+esc(x.name)+'</strong><small>Band '+(i+1)+' of 7</small></button>').join("")+'</div></div>'+
    '<div class="se-arrows"><span>← Longer wavelength · lower frequency</span><span>Higher frequency · shorter wavelength →</span></div>'+
    '<div class="se-visual">'+waveSVG(selected)+'</div>'+
    '<div class="se-insight"><strong>'+esc(b.name)+'</strong><p>'+esc(b.idea)+'</p>'+
      '<p><b>Example:</b> '+esc(b.example)+'. <b>Application:</b> '+esc(b.use)+'.</p></div>'+
    '<div class="se-compare"><label>Compare with<select id="se-reference">'+
       bands.map(x=>'<option value="'+x.id+'"'+(x.id===reference?" selected":"")+'>'+esc(x.name)+'</option>').join("")+
      '</select></label><div><p class="note" style="margin:0 0 7px">Compared with '+esc(bands[index(reference)].name)+', the wavelength of '+esc(b.name)+' is…</p>'+
      '<div class="se-choices" role="group" aria-label="Wavelength comparison">'+
      ['shorter','longer','same'].map(v=>'<button type="button" data-relation="'+v+'">'+v+'</button>').join(" ")+'</div></div></div>'+
    '<p class="se-status" role="status" aria-live="polite" id="se-response">'+esc(answer)+'</p>';
   all("[data-band]").forEach(btn=>btn.onclick=()=>{selected=btn.dataset.band;answer="";draw();});
   $("#se-reference").onchange=e=>{reference=e.target.value;answer="";draw();};
   all("[data-relation]").forEach(btn=>btn.onclick=()=>{
     const expected=compare(selected,reference).wavelength;
     answer=btn.dataset.relation===expected?"Correct. The spectrum ordering supports that comparison.":"Try again. Frequency increases as wavelength gets shorter.";
     $("#se-response").textContent=answer;
   });
  }else{
   const vals=energyBudget(albedo);
   container.innerHTML='<p>In this simplified example, <b>albedo</b> is the percent of incoming sunlight that is reflected. The rest is shown as absorbed by the surface.</p>'+
    '<div class="se-compare"><label>Illustrative examples<select id="se-example">'+
     '<option value="custom">Choose your own percentage</option><option value="15">Low-albedo example (15%)</option>'+
     '<option value="70">High-albedo example (70%)</option></select></label>'+
     '<label>Albedo: <strong id="se-percentage">'+albedo+'%</strong>'+
     '<input id="se-slider" type="range" min="0" max="100" step="5" value="'+albedo+'"></label></div>'+
     '<div class="se-visual" id="se-albedo-chart">'+albedoSVG(albedo)+'</div>'+
     '<div class="se-insight" id="se-albedo-explain">With 100 units of incoming sunlight, '+vals.reflected+
      ' units reflect and '+vals.absorbed+' units are absorbed in this model.</div>'+
     '<p class="note">In the real Earth system, atmosphere, oceans, clouds and land also interact with sunlight. Absorbed energy does not simply disappear; Earth ultimately emits energy back to space.</p>';
   const update=v=>{
    albedo=Number(v);const d=energyBudget(albedo);
    $("#se-percentage").textContent=albedo+"%";
    $("#se-slider").value=String(albedo);
    $("#se-albedo-chart").innerHTML=albedoSVG(albedo);
    $("#se-albedo-explain").textContent="For 100 incoming units: "+d.reflected+
     " reflected, "+d.absorbed+" absorbed. Increasing albedo increases reflection and decreases absorption in this simplified model.";
   };
   $("#se-slider").oninput=e=>{$("#se-example").value="custom";update(e.target.value);};
   $("#se-example").onchange=e=>{if(e.target.value!=="custom")update(e.target.value);};
  }
 }
 all("[data-tab]").forEach(btn=>btn.onclick=()=>{tab=btn.dataset.tab;answer="";draw();});
 draw();
}
H.tools=H.tools||{};H.tools.light=explorer;
window.SolarExplorerCore={bands,index,compare,energyBudget,waveSVG,albedoSVG};
})();
