(function riverModule(global){
"use strict";
const H=global.HUB;if(!H)return;
const $=(root,s)=>root.querySelector(s);
function floodScore(rain,melt,cover,floodway){
 const raw=(Number(rain)*.64+Number(melt)*.46)*(1-Number(cover)*.0035)*(floodway?.72:1);
 return Math.max(0,Math.min(100,Math.round(raw)));
}
function flowNote(flow){return flow<35?"Lower relative flow: mostly finer sediment carried in this simplified model.":flow<70?"Moderate relative flow: both erosion and deposition can occur.":"Higher relative flow: greater potential to transport sediment.";}
function iceNote(retreat){return retreat<35?"An extensive ice sheet still covers much of the illustrative landscape.":retreat<70?"Ice retreat begins to expose abraded bedrock, mixed sediment and meltwater.":"More land is exposed; sediments and meltwater can form lakes and river systems.";}
const css=`
.wl{font-family:system-ui,sans-serif;--wa:#26718b;color:#163e45;background:linear-gradient(135deg,#eaf3f3,#fff8e8);border:1px solid #a9c2cb;border-radius:15px;padding:18px;line-height:1.55}
.wl *{box-sizing:border-box}.wl h3{font:700 23px Georgia,serif;color:#194c5b;margin:6px 0 9px}.wl h4{font:700 18px Georgia,serif;margin:8px 0}
.wl p{font-size:13px;margin:9px 0}.wl small{color:#4e696f}.wl .wl-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0}
.wl button{font:700 13px system-ui;padding:9px 12px;min-height:39px;cursor:pointer;border:1px solid #6f9dad;border-radius:7px;color:#1a5265;background:#fff}
.wl button[aria-pressed=true],.wl .wl-primary{color:#fff;background:#185e74}.wl button:focus-visible,.wl input:focus-visible,.wl textarea:focus-visible{outline:3px solid #ca8b51;outline-offset:2px}
.wl .wl-controls{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:11px;margin:12px 0}
.wl .wl-controls label{font-size:12px;font-weight:700;display:block}.wl input[type=range]{display:block;width:100%;accent-color:#1b7796;min-height:30px}
.wl .wl-figure{margin:10px 0;border:1px solid #bdd1d2;border-radius:11px;overflow:hidden;background:#eff6f4}.wl .wl-figure svg{display:block;width:100%;height:auto}
.wl .wl-result{background:#fff;border-left:4px solid #5a94a5;padding:11px 13px;margin:11px 0;border-radius:5px}
.wl textarea{width:100%;background:#fff;color:#193e49;border:1px solid #709ca8;border-radius:8px;padding:10px;min-height:105px;resize:vertical;font:14px system-ui}
.wl .wl-note{border:1px dashed #8d9e99;padding:10px;border-radius:7px;background:#fff4de;font-size:12px}
.wl .wl-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
@media(prefers-color-scheme:dark){.wl{background:linear-gradient(130deg,#1b3239,#314237);color:#f6f0e6;border-color:#50767e}.wl h3{color:#f0daa1}.wl small{color:#d1e3da}.wl .wl-result{background:#243e45}.wl .wl-note{background:#394c41}.wl textarea{background:#0d2932;color:#fff}}
`;
function diagram(mode,flow,rain,melt,cover,floodway,retreat){
 if(mode==="meander"){
  const width=37+flow*.18;
  return `<svg viewBox="0 0 520 320" role="img" aria-label="Illustration of a river meander showing outside-bank erosion and inside-bank deposition">
    <rect width="520" height="320" fill="#e5e6c8"/>
    <path d="M-30 46 C125 2 266 25 259 126 C251 223 82 156 117 245 C160 338 375 218 548 278" stroke="#afc59f" stroke-width="${width+15}" fill="none" stroke-linecap="round"/>
    <path d="M-30 46 C125 2 266 25 259 126 C251 223 82 156 117 245 C160 338 375 218 548 278" stroke="#438cab" stroke-width="${width}" fill="none" stroke-linecap="round"/>
    <path d="M-30 46 C125 2 266 25 259 126 C251 223 82 156 117 245 C160 338 375 218 548 278" stroke="#b9dce4" stroke-width="2" stroke-dasharray="12 17" fill="none"/>
    <path d="M272 103 L342 64" stroke="#a65332" stroke-width="3"/><rect x="334" y="36" width="164" height="37" rx="7" fill="#fff5e7" stroke="#b58560"/>
    <text x="343" y="50" font-size="12" fill="#6a3c29" font-weight="bold">OUTSIDE OF BEND</text><text x="343" y="64" font-size="11" fill="#6a3c29">Typically more erosion</text>
    <path d="M197 145 L73 167" stroke="#998048" stroke-width="3"/><rect x="9" y="164" width="178" height="37" rx="7" fill="#fff9db" stroke="#b9a878"/>
    <text x="18" y="179" font-size="12" fill="#5b512a" font-weight="bold">INSIDE OF BEND</text><text x="18" y="193" font-size="11" fill="#5b512a">Sediment may settle</text>
    <text x="13" y="309" font-size="11" fill="#47585a">Conceptual model · flow setting ${flow}/100 · not to scale</text></svg>`;
 }
 if(mode==="flood"){
  const score=floodScore(rain,melt,cover,floodway),level=15+score*.33;
  return `<svg viewBox="0 0 520 300" role="img" aria-label="Schematic river floodplain with adjustable simulated runoff index">
    <rect width="520" height="300" fill="#d4e8e7"/><path d="M0 206Q135 200 185 224Q258 258 328 226Q416 204 520 208V300H0Z" fill="#b9c58a"/>
    <path d="M181 223Q259 270 329 225L321 ${223-level/2}Q259 ${246-level} 188 ${225-level/2}Z" fill="#468da5" opacity=".91"/>
    <path d="M359 208Q382 235 415 208" fill="none" stroke="${floodway?"#39869b":"#809d82"}" stroke-width="${floodway?12:5}"/>
    <rect x="52" y="179" width="42" height="29" fill="#beaa8e" stroke="#776755" stroke-width="2"/><path d="M45 182L73 158L101 182Z" fill="#87614c"/>
    <rect x="442" y="177" width="35" height="30" fill="#beaa8e" stroke="#776755" stroke-width="2"/><path d="M435 178L459 158L484 178Z" fill="#87614c"/>
    <text x="14" y="25" font-size="16" fill="#18586b" font-weight="bold">RED RIVER FLOODPLAIN · SCHEMATIC</text>
    <text x="16" y="281" font-size="12" fill="#24414b">Illustrative pressure index: ${score}/100 · NOT a forecast</text>
    <text x="353" y="257" font-size="12" fill="#1e586b">Floodway ${floodway?"enabled":"off"}</text></svg>`;
 }
 return `<svg viewBox="0 0 520 290" role="img" aria-label="Conceptual glacier retreat diagram revealing ground and glacial sediments">
  <rect width="520" height="290" fill="#dce2d3"/><path d="M0 187Q100 170 182 211Q329 242 520 187V290H0Z" fill="#ada792"/>
  <path d="M0 245Q175 252 322 231Q419 224 520 241V290H0Z" fill="#c2ab7d"/>
  <path d="M${retreat*3.4} 200Q420 215 520 203V242H${retreat*3.4}Z" fill="#6eabc0" opacity=".7"/>
  <path d="M0 28H${Math.max(30,500-retreat*4.1)}Q${Math.max(28,475-retreat*4)} 95 ${Math.max(19,435-retreat*4)} 225Q120 196 0 199Z" fill="#bde3ec" stroke="#f8ffff" stroke-width="5"/>
  <g fill="#817766"><circle cx="190" cy="222" r="8"/><circle cx="303" cy="225" r="13"/><circle cx="407" cy="223" r="9"/></g>
  <text x="14" y="19" font-size="15" font-weight="bold" fill="#1a5362">ICE RETREAT AND SEDIMENT DEPOSITION</text>
  <text x="14" y="272" font-size="12" fill="#274d55">Illustrative ice retreat: ${retreat}/100 · not a map of Lake Agassiz</text></svg>`;
}
function render(root){
 let tab=root.dataset.earthTab||"meander",flow=45,rain=45,melt=35,cover=60,floodway=false,retreat=35;
 root.innerHTML='<style>'+css+'</style><div class="wl"><small>SCIENCE 8 · EARTH SCIENCE · TOPIC 4</small><h3>River & Watershed Lab</h3>'+
 '<p>Change one condition at a time, examine the diagram, and use the evidence to explain how water or ice shapes land.</p>'+
 '<div class="wl-tabs" role="group" aria-label="Choose model"><button data-tab="meander">River bend</button><button data-tab="flood">Floodplain</button><button data-tab="glacier">Ice retreat</button></div>'+
 '<div id="wl-stage"></div><div class="wl-result"><b>Make a claim using your observation</b><textarea id="wl-write" aria-label="Claim and evidence" placeholder="When I changed __, I noticed __. This supports __ because __. The model does not show __."></textarea>'+
 '<div class="wl-actions"><button id="wl-copy">Copy response</button><button id="wl-download" class="wl-primary">Download investigation</button></div><small id="wl-status" role="status">Not automatically saved or submitted.</small></div>'+
 '<p class="wl-note"><b>Model limits:</b> All drawings and numerical indices are schematic. They cannot forecast actual Red River flood levels, measure erosion in nature, or map Manitoba\'s glacial retreat. Use class maps, photographs and source evidence to check interpretations.</p></div>';
 const find=s=>$(root,s);
 const report=()=>["Science 8 — River & Watershed Lab","Model: "+tab,
   "Scenario settings: "+JSON.stringify({flow,rain,melt,cover,floodway,retreat}),
   "My claim and evidence:",find("#wl-write").value,"Model limitation: conceptual, uncalibrated, not to scale"].join("\n\n")+"\n";
 function paint(){
  root.querySelectorAll("[data-tab]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.tab===tab)));
  const pane=find("#wl-stage");
  if(tab==="meander"){
   pane.innerHTML='<div class="wl-controls"><label>Relative flow speed <output id="wl-n">'+flow+'/100</output><input id="wl-flow" type="range" min="5" max="100" value="'+flow+'"></label></div>'+
     '<div id="wl-picture" class="wl-figure">'+diagram(tab,flow,rain,melt,cover,floodway,retreat)+'</div>'+
     '<div class="wl-result"><strong id="wl-explain">'+flowNote(flow)+'</strong><p>Predict which bank tends to erode and which tends to accumulate sediment. Why does the outside of the bend generally have faster-moving water?</p></div>';
   find("#wl-flow").oninput=e=>{flow=Number(e.target.value);find("#wl-n").textContent=flow+"/100";find("#wl-picture").innerHTML=diagram(tab,flow,rain,melt,cover,floodway,retreat);find("#wl-explain").textContent=flowNote(flow);};
  }else if(tab==="flood"){
   pane.innerHTML='<div class="wl-controls">'+["rain","melt","cover"].map(id=>{
    const title={rain:"Precipitation",melt:"Spring snowmelt",cover:"Ground cover"}[id],v={rain,melt,cover}[id];
    return `<label>${title} <output id="wl-${id}-n">${v}/100</output><input id="wl-${id}" type="range" min="0" max="100" value="${v}"></label>`;
   }).join("")+'</div><label><input id="wl-divert" type="checkbox" '+(floodway?"checked":"")+'> Simulate a diversion channel</label>'+
    '<div id="wl-picture" class="wl-figure">'+diagram(tab,flow,rain,melt,cover,floodway,retreat)+'</div>'+
    '<div class="wl-result"><strong id="wl-explain">Illustrative runoff/flood-pressure index: '+floodScore(rain,melt,cover,floodway)+'/100</strong>'+
    '<p>The Red River flows north across a flat floodplain. Snowmelt, precipitation, runoff and diversion all matter. This index is an invented comparison tool—not observed water level, flood probability or Floodway capacity.</p></div>';
   function update(){find("#wl-picture").innerHTML=diagram(tab,flow,rain,melt,cover,floodway,retreat);find("#wl-explain").textContent="Illustrative runoff/flood-pressure index: "+floodScore(rain,melt,cover,floodway)+"/100";}
   for(const id of ["rain","melt","cover"])find("#wl-"+id).oninput=e=>{const v=Number(e.target.value);if(id==="rain")rain=v;if(id==="melt")melt=v;if(id==="cover")cover=v;find("#wl-"+id+"-n").textContent=v+"/100";update();};
   find("#wl-divert").onchange=e=>{floodway=e.target.checked;update();};
  }else{
   pane.innerHTML='<div class="wl-controls"><label>Illustrative ice retreat <output id="wl-n">'+retreat+'/100</output><input id="wl-retreat" type="range" min="0" max="100" value="'+retreat+'"></label></div>'+
    '<div id="wl-picture" class="wl-figure">'+diagram(tab,flow,rain,melt,cover,floodway,retreat)+'</div>'+
    '<div class="wl-result"><strong id="wl-explain">'+iceNote(retreat)+'</strong><p>How can a glacier carve the land? What happens to sediments as ice melts? Connect your explanation to the Laurentide Ice Sheet and Lake Agassiz in Manitoba.</p></div>';
   find("#wl-retreat").oninput=e=>{retreat=Number(e.target.value);find("#wl-n").textContent=retreat+"/100";find("#wl-picture").innerHTML=diagram(tab,flow,rain,melt,cover,floodway,retreat);find("#wl-explain").textContent=iceNote(retreat);};
  }
 }
 root.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;root.dataset.earthTab=tab;paint();});
 find("#wl-copy").onclick=()=>{
  if(!navigator.clipboard?.writeText){find("#wl-status").textContent="Clipboard unavailable; use Download.";return;}
  navigator.clipboard.writeText(report()).then(()=>find("#wl-status").textContent="Copied!").catch(()=>find("#wl-status").textContent="Copy blocked; use Download.");
 };
 find("#wl-download").onclick=()=>{
  const url=URL.createObjectURL(new Blob([report()],{type:"text/plain;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="earth-water-land-lab.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1400);
  find("#wl-status").textContent="Downloaded. Submit through your teacher's approved platform.";
 };
 paint();
}
H.lessonTools=Object.assign(H.lessonTools||{},{
 "earth/e13-rivers":render,"earth/e14-watersheds":render,
 "earth/e15-glaciers":render,"earth/e16-review":render
});
global.RiverWatershedCore={floodScore,flowNote,iceNote,diagram};
})(window);
