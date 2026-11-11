/* Science 8 Solar Energy and Light · colour, prisms and reflected light.
   Based on Topic 3: white light, spectrum and object colour. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const spectrum=[
 {name:"Red",colour:"#df3b4c",order:0},
 {name:"Orange",colour:"#e87d3b",order:1},
 {name:"Yellow",colour:"#dbad2a",order:2},
 {name:"Green",colour:"#38a86b",order:3},
 {name:"Blue",colour:"#367cd3",order:4},
 {name:"Violet",colour:"#8859c8",order:5}
];
const lamps={white:["r","g","b"],red:["r"],green:["g"],blue:["b"]};
const surfaces={white:["r","g","b"],red:["r"],green:["g"],blue:["b"],yellow:["r","g"]};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function observed(lamp,surface){
 if(!lamps[lamp]||!surfaces[surface])throw Error("Unknown lamp or surface");
 const passes=lamps[lamp].filter(x=>surfaces[surface].includes(x));
 const label={r:"red",g:"green",b:"blue",rg:"yellow",rb:"magenta",gb:"cyan",rgb:"white"}[passes.sort().join("")]||"dark";
 // Dark objects are not perfectly black in real life.
 const colours={red:"#d9444e",green:"#32a967",blue:"#427ce0",yellow:"#f0c54c",magenta:"#b24acc",cyan:"#43b9cc",white:"#f4f4f2",dark:"#30343b"};
 return {label,colour:colours[label],channels:passes};
}
const css=[
".pc{color:var(--ink);line-height:1.5;min-width:0}.pc *{box-sizing:border-box}.pc h2{font:700 clamp(24px,3vw,31px) var(--f-title,system-ui);margin:0 0 7px}.pc h3{font-size:1.05rem;margin:0 0 8px}",
".pc .hint{font-size:.88rem;color:var(--muted);max-width:72ch}.pc .tabs,.pc .choices,.pc .actions{display:flex;gap:8px;flex-wrap:wrap;margin:13px 0}",
".pc button{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 12px;cursor:pointer;min-height:39px}",
".pc button[aria-pressed=true]{color:var(--on-btn);background:var(--btn);border-color:var(--btn)}",
".pc button:focus-visible,.pc input:focus-visible,.pc select:focus-visible,.pc textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".pc .layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:18px;align-items:start}.pc .diagram{border:1px solid var(--rule);background:var(--soft);border-radius:var(--radius,14px);padding:12px}",
".pc svg{width:100%;height:auto;display:block}.pc svg text{font:600 13px var(--f-body,system-ui);fill:var(--ink)}",
".pc .spectrum button{font-size:.84rem;flex:1 1 110px}.pc .spectrum{display:flex;gap:7px;flex-wrap:wrap}",
".pc .controls{display:grid;gap:14px}.pc label{font-size:.88rem;font-weight:650;display:block}.pc input[type=range]{width:100%;accent-color:var(--accent);margin-top:12px}",
".pc select{display:block;width:100%;font:inherit;padding:10px;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);margin-top:7px}",
".pc .readout{background:var(--soft);padding:13px;border-radius:var(--radius,14px);min-height:102px}.pc .readout p{margin:6px 0 10px}",
".pc .tablewrap{overflow-x:auto}.pc table{border-collapse:collapse;width:100%;font-size:.85rem}.pc td,.pc th{padding:8px;border-bottom:1px solid var(--rule);text-align:left}.pc th{white-space:nowrap}",
".pc textarea{min-height:87px;width:100%;padding:10px;font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:8px;resize:vertical}",
".pc .question{margin:15px 0}.pc .result{min-height:35px;font-weight:650}.pc .buttons{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0}",
"@media(max-width:745px){.pc .layout{grid-template-columns:1fr}}"
].join("\n");
function prismSvg(separation,chosen){
 const lines=spectrum.map((s,i)=>{
  const y=156+(i-2.5)*separation;
  return '<path d="M250 150 L465 '+y.toFixed(1)+'" stroke="'+s.colour+'" stroke-width="'+(chosen===s.name?7:4)+'" stroke-linecap="round"/>';
 }).join("");
 return '<svg viewBox="0 0 520 315" role="img" aria-label="A conceptual prism diagram: white light enters and red through violet rays separate to form a spectrum">'+
 '<path d="M30 150 H185" stroke="var(--ink)" stroke-width="8" stroke-linecap="round"/>'+
 '<path d="M188 150 L248 150" stroke="var(--ink)" stroke-width="8" stroke-linecap="round" opacity=".45"/>'+
 '<path d="M220 62 L135 240 L308 240 Z" fill="color-mix(in srgb,var(--accent) 19%,var(--paper))" stroke="var(--accent)" stroke-width="4"/>'+
 lines+
 '<text x="45" y="128">White light</text><text x="218" y="43" text-anchor="middle">Prism</text>'+
 spectrum.map((s,i)=>{
  const y=156+(i-2.5)*separation;
  return '<text x="478" y="'+(y+5).toFixed(1)+'" fill="'+s.colour+'">'+s.name.slice(0,1)+'</text>';
 }).join("")+
 '<text x="260" y="292" text-anchor="middle" font-size="12">Conceptual dispersion · angles not to scale</text></svg>';
}
function objectSvg(lamp,surface){
 const result=observed(lamp,surface);
 const lampColour={white:"#f4f4f2",red:"#df3b4c",green:"#38a86b",blue:"#427ce0"}[lamp];
 return '<svg viewBox="0 0 520 315" role="img" aria-label="Model lamp '+lamp+' illuminating a '+surface+' object, appearing '+result.label+'">'+
 '<rect x="26" y="23" width="468" height="265" rx="14" fill="#202634"/>'+
 '<path d="M81 57 L115 111 L170 81 L135 29Z" fill="'+lampColour+'" opacity=".37"/>'+
 '<path d="M142 50 L232 177 M142 50 L294 177 M142 50 L365 177" stroke="'+lampColour+'" stroke-width="4" stroke-opacity=".7" stroke-dasharray="9 8"/>'+
 '<path d="M87 21 L178 21 L166 55 L99 55Z" fill="var(--paper)" stroke="var(--rule)" stroke-width="3"/>'+
 '<ellipse cx="276" cy="227" rx="95" ry="50" fill="'+result.colour+'" stroke="#fff" stroke-opacity=".55" stroke-width="3"/>'+
 '<text x="270" y="273" text-anchor="middle" fill="#fff">Object</text>'+
 '<text x="258" y="309" text-anchor="middle" fill="var(--ink)">The model predicts: '+result.label+'</text></svg>';
}
function render(root){
 let tab="prism",separation=17,highlight="Green",lamp="white",surface="red",predicted="",records=[];
 const $=q=>root.querySelector(q);
 root.innerHTML='<section class="pc"><style>'+css+'</style><h2>Prism & Colour Lab</h2>'+
 '<p class="hint">Investigate what happens when white light passes through a prism, then test why objects can look different under different lighting.</p>'+
 '<div class="tabs" role="group" aria-label="Choose light model"><button data-mode="prism" type="button" aria-pressed="true">White light and prisms</button>'+
 '<button data-mode="object" type="button" aria-pressed="false">Objects under coloured light</button></div>'+
 '<div id="pc-model"></div><div class="actions"><button id="pc-record" type="button">Record observation</button>'+
 '<button id="pc-clear" type="button">Clear observations</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Entry</th><th>Situation</th><th>Result</th></tr></thead>'+
 '<tbody id="pc-rows"><tr><td colspan="3">No observations recorded.</td></tr></tbody></table></div>'+
 '<label class="question" for="pc-explain">Explain how light, reflection and absorption affect colour.<textarea id="pc-explain" placeholder="White light... The object reflects..."></textarea></label>'+
 '<div class="actions"><button id="pc-download" type="button">Download investigation</button></div>'+
 '<p id="pc-notice" role="status" class="hint"></p></section>';
 function drawMode(){
  root.querySelectorAll("[data-mode]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mode===tab)));
  if(tab==="prism"){
   $("#pc-model").innerHTML='<div class="layout"><div class="diagram" id="pc-picture"></div><div class="controls">'+
    '<div><label for="pc-separation">Show the rays more clearly: <output id="pc-separation-out">'+separation+'</output></label>'+
    '<input type="range" id="pc-separation" min="8" max="24" step="2" value="'+separation+'"></div>'+
    '<div><label>Explore a wavelength</label><div class="spectrum" id="pc-spectrum"></div></div>'+
    '<div class="readout" id="pc-reading" aria-live="polite"></div></div></div>'+
    '<p class="hint">The slider spreads the rays apart for viewing. It does not calculate physical prism angles. In a typical glass prism, violet bends more than red, and the colours were already present in white light.</p>';
   paintPrism();
  }else{
   const opts=(name,data)=>Object.keys(data).map(k=>'<option value="'+k+'" '+(name===k?'selected':'')+'>'+k[0].toUpperCase()+k.slice(1)+'</option>').join("");
   $("#pc-model").innerHTML='<div class="layout"><div class="diagram" id="pc-picture"></div><div class="controls">'+
    '<div><label for="pc-lamp">Light shining on object</label><select id="pc-lamp">'+opts(lamp,lamps)+'</select></div>'+
    '<div><label for="pc-surface">Object colour in white light</label><select id="pc-surface">'+opts(surface,surfaces)+'</select></div>'+
    '<div><label for="pc-predict">Predict appearance before checking</label>'+
    '<select id="pc-predict"><option value="">Make a prediction</option>'+
    ["red","green","blue","yellow","magenta","cyan","white","dark"].map(x=>'<option value="'+x+'" '+(predicted===x?'selected':'')+'>'+x[0].toUpperCase()+x.slice(1)+'</option>').join("")+'</select></div>'+
    '<div class="readout" id="pc-reading" aria-live="polite"></div></div></div>'+
    '<p class="hint">Simplified RGB reflection model: objects reflect selected red, green and blue components, and absorb others. Real spectra and human colour vision are more complex.</p>';
   paintObject();
  }
 }
 function paintPrism(){
  $("#pc-picture").innerHTML=prismSvg(separation,highlight);
  $("#pc-spectrum").innerHTML=spectrum.map(s=>'<button data-spectrum="'+s.name+'" aria-pressed="'+(s.name===highlight)+'">'+s.name+'</button>').join("");
  const item=spectrum.find(x=>x.name===highlight);
  $("#pc-reading").innerHTML='<b>'+esc(item.name)+' light</b><p>'+ (item.order===0?"Longer visible wavelength; bends less in a typical glass prism.":
    item.order===5?"Shorter visible wavelength; bends more in a typical glass prism.":"Between red and violet in the continuous visible spectrum.")+'</p>';
  $("#pc-separation-out").textContent=separation;
 }
 function paintObject(){
  const result=observed(lamp,surface);
  $("#pc-picture").innerHTML=objectSvg(lamp,surface);
  $("#pc-reading").innerHTML='<b>Predicted appearance: '+esc(result.label)+'</b><p>'+
   (predicted?(predicted===result.label?"Your prediction matches the simplified model.":"Your prediction differs from the simplified model."):
    "Choose a prediction to compare it with the model.")+'</p>';
 }
 function drawRecords(){
  $("#pc-rows").innerHTML=records.length?records.map((x,i)=>'<tr><td>'+(i+1)+'</td><td>'+esc(x.context)+'</td><td>'+esc(x.result)+'</td></tr>').join(""):
   '<tr><td colspan="3">No observations recorded.</td></tr>';
 }
 root.addEventListener("click",event=>{
  const b=event.target.closest("[data-mode],[data-spectrum]");if(!b||!root.contains(b))return;
  if(b.dataset.mode){tab=b.dataset.mode;drawMode();}
  else if(b.dataset.spectrum){highlight=b.dataset.spectrum;paintPrism();}
 });
 root.addEventListener("input",event=>{
  if(event.target.id==="pc-separation"){separation=Number(event.target.value);paintPrism();}
 });
 root.addEventListener("change",event=>{
  if(event.target.id==="pc-lamp"){lamp=event.target.value;paintObject();}
  else if(event.target.id==="pc-surface"){surface=event.target.value;paintObject();}
  else if(event.target.id==="pc-predict"){predicted=event.target.value;paintObject();}
 });
 $("#pc-record").onclick=()=>{
  if(tab==="prism"){records.push({context:"Prism: "+highlight,result:"White light separated into a spectrum; "+highlight.toLowerCase()+" wavelength highlighted"});}
  else{records.push({context:lamp+" lamp on "+surface+" object",result:observed(lamp,surface).label});}
  if(records.length>8)records.shift();drawRecords();
 };
 $("#pc-clear").onclick=()=>{records=[];drawRecords();};
 $("#pc-download").onclick=()=>{
  const report=["Prism and Colour Lab — Grade 8","Observations:",...records.map((x,i)=>(i+1)+". "+x.context+" → "+x.result),"Explanation:",$("#pc-explain").value.trim(),"The models simplify real dispersion, reflection and human vision."].join("\n\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");
  a.href=url;a.download="prism-colour-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
  $("#pc-notice").textContent="Investigation downloaded.";
 };
 drawMode();drawRecords();
 root.prismLab={get mode(){return tab},get records(){return records.slice()},setObject(next){lamp=next.lamp||lamp;surface=next.surface||surface;tab="object";drawMode();}};
}
H.prismColourCore={spectrum,lamps,surfaces,observed,prismSvg,objectSvg};
H.lessonTools=H.lessonTools||{};const prior=H.lessonTools["light/u3t3-colour"];
H.lessonTools["light/u3t3-colour"]=function(el){
 const fresh=document.createElement("div");el.appendChild(fresh);render(fresh);
 if(prior){const old=document.createElement("div");el.appendChild(old);prior(old);}
};
})();