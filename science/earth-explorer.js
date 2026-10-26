/* Science 8 · Earth Interior & Plate Boundary Explorer
 * Teacher source: Sci8_U4_EarthScience_StudentBooklet (Topics 1–3).
 * All diagrams conceptual, deliberately exaggerated and not to scale.
 * No external network, student account, persistent answers or assessment data.
 */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const layers=[
 {id:"crust",name:"Crust",state:"Solid rock",detail:"Earth's thin outer rocky layer. Oceanic crust is generally thinner and denser than continental crust.",observation:"The crust and the rigid uppermost mantle together form the lithosphere.",color:"#91B7B2"},
 {id:"mantle",name:"Mantle",state:"Mostly solid rock",detail:"Hot rock that can deform and flow extremely slowly over geological time. It is not a global ocean of liquid magma.",observation:"The soft, slowly deforming asthenosphere is part of the upper mantle beneath the rigid lithosphere.",color:"#E5A65F"},
 {id:"outer",name:"Outer core",state:"Liquid metal",detail:"A liquid iron-rich layer. Movement of electrically conducting liquid contributes to Earth's magnetic field.",observation:"Earthquake waves help scientists infer which layers are solid and liquid.",color:"#DA6557"},
 {id:"inner",name:"Inner core",state:"Solid metal",detail:"Mainly iron, extremely hot but solid under enormous pressure.",observation:"Temperature is not the only factor: very high pressure can keep material solid.",color:"#EBCB76"}
];
const boundaries=[
 {id:"divergent",name:"Divergent",motion:"Moving apart",example:"Mid-Atlantic Ridge and Iceland",question:"What typically forms where oceanic plates move apart?",options:["New crust at a spreading ridge","A collision mountain range","An inactive plate boundary"],correct:0,why:"Magma can rise and cool where plates diverge, producing new oceanic crust. This is a schematic, not a measured event.",effect:"Spreading ridges and rift zones; shallow earthquakes and often volcanic activity.",prompt:"Where might you find the youngest ocean floor? Explain why."},
 {id:"subduction",name:"Convergent · Subduction",motion:"Moving together",example:"Andes; oceanic plate beneath a continent",question:"At this boundary, what happens to the denser oceanic lithosphere?",options:["It subducts beneath the continental plate","Both plates move away","It slides sideways without sinking"],correct:0,why:"The denser oceanic plate bends and descends beneath another plate. Subduction can be associated with earthquakes, volcanoes, and mountains.",effect:"Ocean trench, earthquakes and possible volcanic mountain chain.",prompt:"Why can earthquakes occur far below the surface in a subduction zone?"},
 {id:"collision",name:"Convergent · Continent collision",motion:"Moving together",example:"India colliding with Eurasia; Himalayas",question:"When two continental plates collide, what is a common result?",options:["The crust compresses and thickens into mountains","A new ocean basin opens","The continental plates become liquid"],correct:0,why:"Continental lithosphere tends to resist deep subduction. Compression thickens and uplifts the crust over geological time.",effect:"Large folded and uplifted mountain ranges, major earthquakes; not necessarily an active volcanic arc.",prompt:"Why does continental collision build mountains rather than always forming volcanoes?"},
 {id:"transform",name:"Transform",motion:"Sliding alongside",example:"San Andreas Fault, California",question:"Which process best describes a transform plate boundary?",options:["Two plates slide horizontally past each other","One plate dives under the other","The plates separate and make new ocean floor"],correct:0,why:"At a transform fault, plates move laterally past one another; stress can build and be released in earthquakes.",effect:"Fault zones and earthquakes; crust is neither created nor destroyed overall at the boundary.",prompt:"Why could a transform boundary produce earthquakes without a volcano?"}
];
const evidence=[
 {id:"fossils",label:"Mesosaurus fossils",fact:"Fossils of the same freshwater reptile occur in parts of South America and Africa.",support:"The continents were connected in the distant past; the small freshwater animal could not easily cross a wide saltwater ocean."},
 {id:"rocks",label:"Matching rocks",fact:"Some rock layers and mountain belts line up across the Atlantic when continents are reconstructed.",support:"The landmasses were once joined and later separated."},
 {id:"glacial",label:"Glacial evidence",fact:"Ancient glacial scratches and deposits occur on now-separated southern continents.",support:"The continents once had different positions relative to one another and to ancient ice sheets."},
 {id:"seafloor",label:"Young ocean floor",fact:"Ocean crust is generally youngest near mid-ocean ridges and older farther away.",support:"New ocean crust forms at spreading ridges, supporting seafloor spreading."}
];
function escapeHTML(v){return String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function layerSVG(selected){
 const sel=layers.find(x=>x.id===selected)||layers[0];
 let svg='<svg viewBox="0 0 760 370" role="img" aria-label="Earth cross-section diagram. Four concentric layers from crust to inner core. Selected: '+escapeHTML(sel.name)+'. Not to scale." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:760px">';
 svg+='<rect width="760" height="370" rx="15" fill="#F6F6FC"/>';
 const cx=227,cy=180;
 const disks=[
  {id:"crust",r:159,color:"#91B7B2"},
  {id:"mantle",r:148,color:"#E5A65F"},
  {id:"outer",r:85,color:"#DA6557"},
  {id:"inner",r:39,color:"#EBCB76"}
 ];
 for(const disk of disks)svg+='<circle cx="'+cx+'" cy="'+cy+'" r="'+disk.r+'" fill="'+disk.color+'" stroke="#3B4158" stroke-width="'+(selected===disk.id?4:1.2)+'"/>';
 const marks=[
 {id:"crust",x:346,y:60,toX:396,toY:50},
 {id:"mantle",x:345,y:103,toX:396,toY:117},
 {id:"outer",x:292,y:171,toX:396,toY:189},
 {id:"inner",x:233,y:203,toX:396,toY:261}
 ];
 for(let i=0;i<marks.length;i++){
  const m=marks[i],l=layers[i],active=selected===m.id;
  svg+='<path d="M '+m.x+' '+m.y+' L '+m.toX+' '+m.toY+'" stroke="'+(active?"#252B64":"#757B8E")+'" fill="none" stroke-width="'+(active?2.8:1.4)+'"/>';
  svg+='<circle cx="'+m.x+'" cy="'+m.y+'" r="3.5" fill="'+(active?"#252B64":"#757B8E")+'"/>';
  svg+='<text x="410" y="'+(m.toY+5)+'" font-size="17" fill="#222836" font-weight="'+(active?750:500)+'">'+l.name+'</text>';
 }
 svg+='<text x="406" y="334" fill="#626979" font-size="13">Schematic: crust is greatly thickened for visibility.</text></svg>';
 return svg;
}
function plateSVG(id,stage){
 const b=boundaries.find(x=>x.id===id)||boundaries[0],t=Math.max(0,Math.min(100,stage))/100;
 const gap=12+92*t,travel=23+45*t,parts=[];
 const rect=(x,y,w,h,fill)=>'<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" fill="'+fill+'"/>';
 const path=(points,fill,stroke="#354052",width=1.4)=>'<polygon points="'+points+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+width+'"/>';
 let surface="";
 if(b.id==="divergent"){
  const mid=365,l=mid-gap/2,r=mid+gap/2;
  surface+=rect(25,225,715,105,"#E9A45C");
  surface+=path("35,160 "+l+",160 "+l+",219 35,219","#88B9C3");
  surface+=path(r+",160 725,160 725,219 "+r+",219","#88B9C3");
  surface+=path(l+",218 "+mid+",178 "+r+",218","#DC7055");
  surface+='<path d="M '+(l-23)+' 134 L '+(l-73)+' 134 M '+(r+23)+' 134 L '+(r+73)+' 134" stroke="#4F5CCC" stroke-width="5" stroke-linecap="round"/>';
  surface+='<path d="M '+(l-68)+' 125 l -15 9 15 9 M '+(r+68)+' 125 l 15 9 -15 9" stroke="#4F5CCC" stroke-width="4" fill="none"/>';
  surface+='<text x="302" y="83" fill="#303746" font-size="17">Spreading ridge</text>';
  surface+='<text x="300" y="283" fill="#713D25" font-size="14">Rising magma (schematic)</text>';
 }else if(b.id==="subduction"){
  const x=355-travel/4;
  surface+=rect(25,219,715,121,"#EDA86B");
  surface+=path("25,174 "+x+",174 "+(x+205)+",335 "+(x+242)+",335 "+(x+43)+",221 25,221","#81B0BF");
  surface+=path((x+17)+",166 "+(x+82)+",143 "+(x+114)+",125 "+(x+139)+",161 735,161 735,216 "+(x+45)+",216","#CBA76A");
  surface+='<path d="M '+(x-62)+' 140 l 43 0 m -13 -9 l 13 9 -13 9 M '+(x+130)+' 110 l -43 0 m 13 -9 l -13 9 13 9" stroke="#4F5CCC" stroke-width="4" fill="none"/>';
  surface+='<path d="M '+(x+139)+' 166 Q '+(x+170)+' 186 '+(x+190)+' 242" stroke="#D16043" stroke-width="4" stroke-dasharray="7 7" fill="none"/>';
  surface+='<text x="490" y="85" fill="#303746" font-size="17">Volcanic mountain chain</text>';
  surface+='<text x="474" y="300" fill="#713D25" font-size="14">Oceanic plate subducts ↓</text>';
 }else if(b.id==="collision"){
  const squeeze=14+34*t,mid=372;
  surface+=rect(25,232,715,105,"#E9A45C");
  surface+=path("35,176 "+(mid+squeeze/3)+",176 "+(mid+squeeze/2)+",231 35,231","#CBA76A");
  surface+=path((mid-squeeze/2)+",176 725,176 725,231 "+(mid-squeeze/3)+",231","#CBA76A");
  surface+=path((mid-65)+",178 "+(mid-38)+","+(159-squeeze/3)+" "+mid+","+(131-squeeze/3)+" "+(mid+34)+","+(156-squeeze/3)+" "+(mid+70)+",178","#B6A08C");
  surface+='<path d="M 230 129 L 288 129 m -14 -11 l 14 11 -14 11 M 519 129 L 461 129 m 14 -11 l -14 11 14 11" stroke="#4F5CCC" stroke-width="4" fill="none"/>';
  surface+='<text x="292" y="85" fill="#303746" font-size="17">Thickened, uplifted crust</text>';
 }else{
  const offset=travel,mid=375;
  surface+=rect(25,235,715,100,"#E9A45C");
  surface+=path("45,170 367,"+(170-offset)+" 367,"+(226-offset)+" 45,226","#82B2BB");
  surface+=path("385,"+(170+offset)+" 718,170 718,226 385,"+(226+offset),"#CBA76A");
  surface+='<path d="M 375 105 L 375 283" stroke="#D65754" stroke-width="5" stroke-dasharray="8 6"/>';
  surface+='<path d="M 315 180 L 315 126 M 303 141 l 12 -15 12 15 M 435 127 L 435 181 M 423 167 l 12 15 12 -15" stroke="#4F5CCC" stroke-width="4" fill="none"/>';
  surface+='<text x="278" y="70" fill="#303746" font-size="17">Top-down fault view</text>';
  surface+='<text x="396" y="292" fill="#303746" font-size="14">Plates slide past each other</text>';
 }
 const label='<text x="32" y="353" fill="#5B6173" font-size="12">Movement is exaggerated; diagram shows a concept, not time, actual speed or scale.</text>';
 return '<svg viewBox="0 0 760 370" role="img" aria-label="'+escapeHTML(b.name)+' boundary schematic at movement step '+stage+'. '+escapeHTML(b.motion)+'. Not to scale." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;min-width:310px">'+
 '<rect width="760" height="370" rx="15" fill="#F6F6FC"/>'+surface+label+'</svg>';
}
function rateDistance(cmYear,millionYears){
 if(!Number.isFinite(cmYear)||!Number.isFinite(millionYears)||cmYear<0||millionYears<0)throw Error("Invalid rate or time");
 return cmYear*millionYears*10; // cm/year * 1,000,000 years / 100,000 cm/km = 10 km
}
function render(el){
 const $=s=>el.querySelector(s),all=s=>[...el.querySelectorAll(s)];
 let tab="layers",selectedLayer="crust",boundary="divergent",stage=45,showResult=false,checked="",activeEvidence="fossils",claim="",reflection="";
 const names={layers:"Earth's layers",boundaries:"Plate boundaries",evidence:"Evidence and predictions"};
 el.innerHTML='<section class="earth-explorer"><style>'+
 '.earth-explorer{color:var(--ink);font-family:var(--f-body);font-size:16px;line-height:1.5}'+
 '.earth-explorer .ee-tabs,.earth-explorer .ee-options,.earth-explorer .ee-actions{display:flex;flex-wrap:wrap;gap:9px;margin:14px 0}'+
 '.earth-explorer .ee-tabs button,.earth-explorer .ee-options button{background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:10px;min-height:44px;padding:9px 13px;font:inherit;font-size:14px;cursor:pointer}'+
 '.earth-explorer button[aria-pressed="true"]{background:var(--accent-soft);border-color:var(--accent);color:var(--accent-ink);font-weight:700}'+
 '.earth-explorer button:focus-visible,.earth-explorer input:focus-visible,.earth-explorer select:focus-visible,.earth-explorer textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}'+
 '.earth-explorer .ee-figure{margin:13px 0;overflow-x:auto;background:#F6F6FC;border:1px solid var(--rule);border-radius:12px}'+
 '.earth-explorer .ee-panel{padding:17px 18px;border:1px solid var(--rule);border-radius:12px;background:var(--paper);margin:15px 0}'+
 '.earth-explorer .ee-panel h3{margin:0 0 9px;border:0;padding:0;text-transform:none;font:inherit;font-size:19px;font-weight:700;color:var(--ink)}'+
 '.earth-explorer .ee-panel p{margin:8px 0;font-size:15px}'+
 '.earth-explorer .ee-panel small{color:var(--muted);font-size:13px}'+
 '.earth-explorer .ee-slider{display:grid;gap:5px;max-width:450px;font-size:14px;font-weight:650}'+
 '.earth-explorer input[type=range]{width:100%;min-height:42px;accent-color:var(--accent)}'+
 '.earth-explorer textarea,.earth-explorer input[type=number]{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:7px;padding:8px 11px;max-width:100%}'+
 '.earth-explorer textarea{width:100%;min-height:100px}'+
 '.earth-explorer .ee-quiz{border-left:4px solid var(--accent);padding:4px 12px;margin-top:18px}'+
 '.earth-explorer .ee-response{font-weight:600;min-height:24px;color:var(--accent-ink)}'+
 '.earth-explorer .ee-micro{font-size:13px;color:var(--muted);margin:10px 0}'+
 '</style><div class="eyebrow">Science 8 · Earth Science</div>'+
 '<h2>Earth & Plate Tectonics Explorer</h2>'+
 '<p class="note">Investigate Earth’s interior, the movement of plates and evidence for continental drift. The drawings show relationships, not actual sizes or motion speeds.</p>'+
 '<div class="ee-tabs" role="group" aria-label="Choose Earth science topic">'+
 Object.keys(names).map(id=>'<button type="button" data-tab="'+id+'">'+names[id]+'</button>').join("")+'</div>'+
 '<div id="ee-content"></div><p class="ee-micro">This conceptual model runs in your browser and does not collect or submit grades or responses.</p></section>';
 function draw(){
  all("[data-tab]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.tab===tab)));
  const root=$("#ee-content");
  if(tab==="layers"){
   const d=layers.find(x=>x.id===selectedLayer);
   root.innerHTML='<div class="ee-options" role="group" aria-label="Select Earth layer">'+
    layers.map(l=>'<button type="button" data-layer="'+l.id+'" aria-pressed="'+(selectedLayer===l.id)+'">'+l.name+'</button>').join("")+'</div>'+
    '<div class="ee-figure">'+layerSVG(selectedLayer)+'</div>'+
    '<section class="ee-panel" aria-live="polite"><h3>'+d.name+' · '+d.state+'</h3><p>'+d.detail+'</p><p>'+d.observation+'</p></section>'+
    '<div class="ee-panel"><h3>Two ways to describe Earth</h3>'+
    '<p><b>Composition:</b> crust, mantle, outer core and inner core.</p>'+
    '<p><b>Mechanical behaviour:</b> the rigid <b>lithosphere</b> includes crust and uppermost mantle. Below it, the <b>asthenosphere</b> is a slowly deforming part of the solid upper mantle.</p>'+
    '<small>The thin crust is deliberately drawn thicker so you can see it.</small></div>';
   all("[data-layer]").forEach(b=>b.onclick=()=>{selectedLayer=b.dataset.layer;draw();});
  }else if(tab==="boundaries"){
   const b=boundaries.find(x=>x.id===boundary);
   root.innerHTML='<div class="ee-options" role="group" aria-label="Select plate boundary">'+
    boundaries.map(x=>'<button type="button" data-boundary="'+x.id+'" aria-pressed="'+(x.id===boundary)+'">'+x.name+'</button>').join("")+'</div>'+
    '<div class="ee-panel"><h3>'+b.name+' · '+b.motion+'</h3>'+
    '<p><b>Real-world example:</b> '+b.example+'.</p>'+
    '<label class="ee-slider">Exaggerated movement for visualization: <span id="ee-percent">'+stage+'%</span>'+
     '<input type="range" id="ee-movement" min="0" max="100" value="'+stage+'" step="5" aria-label="Exaggerated plate displacement"></label>'+
    '<div class="ee-figure" id="ee-boundary-picture">'+plateSVG(boundary,stage)+'</div>'+
    '<p>'+b.effect+'</p></div>'+
    '<div class="ee-quiz"><p><strong>Predict first:</strong> '+b.question+'</p>'+
    '<div class="ee-options" role="group" aria-label="Prediction options">'+
    b.options.map((o,i)=>'<button data-choice="'+i+'" type="button">'+escapeHTML(o)+'</button>').join("")+'</div>'+
    '<p class="ee-response" id="ee-response" role="status" aria-live="polite">'+escapeHTML(checked)+'</p>'+
    (showResult?'<p><b>Explanation:</b> '+b.why+'</p>':'')+'</div>'+
    '<div class="ee-panel"><h3>Explain your thinking</h3><p>'+b.prompt+'</p>'+
    '<textarea id="ee-reflection" aria-label="Written explanation" placeholder="Write a claim and connect it to the model.">'+escapeHTML(reflection)+'</textarea>'+
    '<div class="ee-actions"><button type="button" class="btn ghost" id="ee-copy">Copy my explanation</button></div>'+
    '<p class="ee-micro">Copy your words before leaving this page. They are not automatically saved or submitted.</p></div>'+
    '<div class="ee-panel"><h3>Motion-rate question</h3>'+
    '<p>The lesson booklet describes North America and Europe moving apart at an illustrative rate of 2.5 cm per year. How far apart would the plates move in <b>one million years</b> if that rate stayed constant?</p>'+
    '<p><button type="button" class="btn ghost" id="ee-rate">Show a model calculation</button></p>'+
    '<p id="ee-rate-out" class="ee-micro" aria-live="polite"></p></div>';
   all("[data-boundary]").forEach(btn=>btn.onclick=()=>{boundary=btn.dataset.boundary;stage=45;showResult=false;checked="";reflection="";draw();});
   $("#ee-movement").oninput=e=>{stage=Number(e.target.value);$("#ee-percent").textContent=stage+"%";$("#ee-boundary-picture").innerHTML=plateSVG(boundary,stage);};
   all("[data-choice]").forEach(btn=>btn.onclick=()=>{
    checked=Number(btn.dataset.choice)===b.correct?"Correct. Explain what physical changes the model represents.":"Not quite. Look at how the plates move and try another response.";
    showResult=Number(btn.dataset.choice)===b.correct;
    reflection=$("#ee-reflection").value;
    draw();
   });
   $("#ee-reflection").oninput=e=>{reflection=e.target.value;};
   $("#ee-copy").onclick=()=>{
    const txt=$("#ee-reflection").value.trim();
    if(!txt){$("#ee-reflection").focus();return;}
    if(navigator.clipboard?.writeText)navigator.clipboard.writeText(txt).then(()=>{checked="Explanation copied.";$("#ee-response").textContent=checked;}).catch(()=>{checked="Select your text and copy it manually.";$("#ee-response").textContent=checked;});
    else{$("#ee-reflection").select();checked="Select your text and copy it manually.";$("#ee-response").textContent=checked;}
   };
   $("#ee-rate").onclick=()=>{$("#ee-rate-out").textContent="2.5 cm/year × 1,000,000 years = 2,500,000 cm = "+rateDistance(2.5,1)+" km. This assumes a constant rate; real plate motion changes over time.";};
  }else{
   const d=evidence.find(x=>x.id===activeEvidence);
   root.innerHTML='<div class="ee-panel"><h3>How can we test continental drift?</h3>'+
    '<p>Wegener’s hypothesis was strengthened by several lines of evidence. Select a clue, then build an explanation.</p>'+
    '<div class="ee-options" role="group" aria-label="Choose scientific evidence">'+
    evidence.map(x=>'<button data-evidence="'+x.id+'" aria-pressed="'+(x.id===activeEvidence)+'" type="button">'+x.label+'</button>').join("")+'</div>'+
    '<div class="ee-panel"><h3>'+d.label+'</h3><p>'+d.fact+'</p>'+
    '<p><strong>What does this suggest?</strong></p>'+
    '<textarea id="ee-evidence-answer" aria-label="Evidence interpretation" placeholder="This evidence suggests… because…">'+escapeHTML(claim)+'</textarea>'+
    '<div class="ee-actions"><button class="btn" type="button" id="ee-reveal">Compare with a scientific interpretation</button></div>'+
    '<p id="ee-interpretation" class="ee-response" aria-live="polite"></p></div>'+
    '<p class="ee-micro">Evidence from multiple sources is stronger than a single isolated clue. New seafloor observations helped turn continental drift ideas into plate tectonics.</p></div>';
   all("[data-evidence]").forEach(btn=>btn.onclick=()=>{activeEvidence=btn.dataset.evidence;claim="";draw();});
   $("#ee-evidence-answer").oninput=e=>{claim=e.target.value;};
   $("#ee-reveal").onclick=()=>{$("#ee-interpretation").textContent=d.support;};
  }
 }
 all("[data-tab]").forEach(btn=>btn.onclick=()=>{tab=btn.dataset.tab;draw();});
 draw();
}
H.tools=H.tools||{};H.tools.earth=render;
window.EarthExplorerCore={layers,boundaries,evidence,layerSVG,plateSVG,rateDistance};
})();
