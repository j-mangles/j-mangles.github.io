/* Grade 8 Science Skills · Measurement and SI Units.
   Practice ruler and graduated-cylinder readings (not photographs of lab glassware). */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const samples={ruler:[3.4,6.7,2.8,5.5,7.3],cylinder:[17,34,42,26,38]};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function checkReading(tool,actual,value,unit){
 const expectedUnit=tool==="ruler"?"cm":"mL",tolerance=tool==="ruler"?.051:.51;
 if(!Number.isFinite(value))return {correct:false,message:"Enter a numerical reading first.",expectedUnit};
 if(unit!==expectedUnit)return {correct:false,message:"Check your unit: this tool is marked in "+expectedUnit+".",expectedUnit};
 const delta=Math.abs(value-actual);
 return {correct:delta<=tolerance,message:delta<=tolerance?"Correct: the reading is "+actual+" "+expectedUnit+".":
  "Not quite. Read from the zero mark to the object's end, or read the bottom of the curved meniscus.",expectedUnit};
}
const style=[
".msl{color:var(--ink);line-height:1.5;min-width:0}.msl *{box-sizing:border-box}.msl h2{font:700 clamp(24px,3vw,31px) var(--f-title,system-ui);margin:0 0 7px}.msl h3{font-size:1.05rem;margin:0 0 9px}",
".msl p{margin:7px 0 13px}.msl .note{font-size:.87rem;color:var(--muted);max-width:72ch}",
".msl button,.msl select,.msl input{background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 12px;font:inherit;min-height:38px}",
".msl button{cursor:pointer}.msl button[aria-pressed=true]{background:var(--btn);color:var(--on-btn);border-color:var(--btn)}",
".msl button:focus-visible,.msl select:focus-visible,.msl input:focus-visible,.msl textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".msl .tabs,.msl .actions{display:flex;flex-wrap:wrap;gap:8px;margin:13px 0}.msl .tabs button{flex:1 1 170px}",
".msl .layout{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(240px,1fr);gap:18px;align-items:start}",
".msl .diagram{border:1px solid var(--rule);border-radius:var(--radius,12px);background:var(--soft);padding:10px}",
".msl svg{width:100%;height:auto;display:block}.msl svg text{font:600 13px var(--f-body,system-ui);fill:var(--ink)}",
".msl .read{display:grid;gap:10px}.msl label{display:block;font-size:.89rem;font-weight:700}",
".msl .pair{display:grid;grid-template-columns:minmax(0,1fr) 100px;gap:8px;margin-top:7px}.msl .pair input,.msl .pair select{width:100%;min-width:0}",
".msl .feedback{background:var(--soft);padding:13px;border-radius:var(--radius,12px);min-height:82px}",
".msl .status{min-height:32px;font-weight:650}.msl .tablewrap{max-width:100%;overflow-x:auto}",
".msl table{border-collapse:collapse;width:100%;font-size:.86rem}.msl th,.msl td{padding:8px;border-bottom:1px solid var(--rule);text-align:left}.msl th{white-space:nowrap}",
".msl textarea{display:block;width:100%;min-height:85px;resize:vertical;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:8px;font:inherit;padding:10px}",
"@media(max-width:740px){.msl .layout{grid-template-columns:1fr}}"
].join("\n");
function rulerSvg(reading){
 const start=70,scale=49,stop=start+10*scale;
 const tick=Array.from({length:101},(_,i)=>{
  const x=start+i*scale/10,major=i%10===0,half=i%5===0;
  return '<path d="M'+x.toFixed(1)+' 145V'+(major?178:half?168:160)+'" stroke="var(--ink)" stroke-width="'+(major?2:1)+'"/>'+
   (major?'<text x="'+x.toFixed(1)+'" y="197" text-anchor="middle">'+i/10+'</text>':"");
 }).join("");
 const end=start+reading*scale;
 return '<svg viewBox="0 0 660 275" role="img" aria-label="Ruler marked in centimetres with small millimetre divisions, measuring a horizontal object">'+
 '<rect x="51" y="129" width="570" height="90" rx="8" fill="var(--paper)" stroke="var(--rule)" stroke-width="2"/>'+
 tick+
 '<rect x="'+start+'" y="73" width="'+(end-start).toFixed(1)+'" height="44" rx="7" fill="color-mix(in srgb,var(--accent) 62%,var(--paper))" stroke="var(--accent)" stroke-width="2"/>'+
 '<path d="M'+start+' 66V129 M'+end.toFixed(1)+' 66V129" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 3"/>'+
 '<text x="330" y="39" text-anchor="middle">What is the length of the object?</text>'+
 '<text x="330" y="248" text-anchor="middle">Ruler: centimetres (cm); each small tick = 1 mm</text></svg>';
}
function cylinderSvg(volume){
 const y=314-volume*4.8,tick=Array.from({length:51},(_,i)=>{
  const yy=314-i*4.8,major=i%10===0;
  return '<path d="M273 '+yy.toFixed(1)+'H'+(major?301:286)+'" stroke="var(--ink)" stroke-width="'+(major?2:1)+'"/>'+
   (major?'<text x="315" y="'+(yy+5).toFixed(1)+'">'+i+'</text>':"");
 }).join("");
 return '<svg viewBox="0 0 560 380" role="img" aria-label="50 millilitre graduated cylinder with a curved meniscus; read the bottom of the curve at eye level">'+
 '<text x="280" y="27" text-anchor="middle">How much liquid is in the cylinder?</text>'+
 '<path d="M199 56V314Q230 333 261 314V56" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>'+
 '<path d="M204 '+(y-10).toFixed(1)+'Q230 '+y.toFixed(1)+' 256 '+(y-10).toFixed(1)+'V312Q230 323 204 312Z" fill="color-mix(in srgb,var(--accent) 48%,var(--paper))"/>'+
 '<path d="M204 '+(y-10).toFixed(1)+'Q230 '+y.toFixed(1)+' 256 '+(y-10).toFixed(1)+'" fill="none" stroke="var(--accent)" stroke-width="3"/>'+
 tick+'<path d="M186 '+y.toFixed(1)+'H273" stroke="var(--accent)" stroke-dasharray="3 4" opacity=".6"/>'+
 '<text x="390" y="101">mL</text><text x="390" y="125" font-size="12">Read the bottom</text><text x="390" y="144" font-size="12">of the meniscus.</text>'+
 '<text x="280" y="366" text-anchor="middle">Large ticks = 10 mL; small ticks = 1 mL</text></svg>';
}
function render(el){
 let tool="ruler",indices={ruler:0,cylinder:0},attempts=[],checked=false;
 const $=q=>el.querySelector(q);
 el.innerHTML='<section class="msl"><style>'+style+'</style><h2>Measurement Challenge</h2>'+
 '<p class="note">Use the ruler and graduated cylinder as you would in a science investigation. Read the smallest divisions, choose the correct unit and check your answer.</p>'+
 '<div class="tabs" role="group" aria-label="Choose measuring tool"><button type="button" data-tool="ruler" aria-pressed="true">Ruler</button>'+
 '<button type="button" data-tool="cylinder" aria-pressed="false">Graduated cylinder</button></div>'+
 '<div class="layout"><div class="diagram" id="msl-diagram"></div><div class="read">'+
 '<h3>Read the instrument</h3><p class="note" id="msl-hint"></p>'+
 '<label for="msl-answer">What measurement do you read?</label>'+
 '<div class="pair"><input type="number" id="msl-answer" step="0.1" min="0" max="1000" inputmode="decimal" placeholder="Your reading"><select id="msl-unit" aria-label="Measurement unit"><option value="cm">cm</option><option value="mL">mL</option><option value="g">g</option><option value="s">s</option></select></div>'+
 '<div class="actions"><button type="button" id="msl-check">Check reading</button><button type="button" id="msl-next">New sample</button></div>'+
 '<div class="feedback" id="msl-feedback" role="status"></div><p class="status" id="msl-score"></p></div></div>'+
 '<h3>Your measurements</h3><div class="tablewrap"><table><thead><tr><th>Tool</th><th>Your reading</th><th>Actual reading</th><th>Result</th></tr></thead>'+
 '<tbody id="msl-results"><tr><td colspan="4">Check a reading to start.</td></tr></tbody></table></div>'+
 '<label for="msl-explain"><b>Why does choosing the correct scale and unit matter?</b></label>'+
 '<textarea id="msl-explain" placeholder="I used... and the smallest divisions show..."></textarea>'+
 '<div class="actions"><button type="button" id="msl-clear">Clear attempts</button><button type="button" id="msl-download">Download measurement record</button></div>'+
 '<p class="note" id="msl-notice" role="status"></p>'+
 '<p class="note">These are schematic instruments for reading practice. Real cylinders and rulers may have different scales; choose instruments appropriate for the measurement.</p></section>';
 function actual(){return samples[tool][indices[tool]%samples[tool].length];}
 function paint(){
  el.querySelectorAll("[data-tool]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.tool===tool)));
  $("#msl-diagram").innerHTML=tool==="ruler"?rulerSvg(actual()):cylinderSvg(actual());
  $("#msl-hint").textContent=tool==="ruler"?"Start at the zero mark and read the object's right-hand end. The small marks are millimetres.":
    "Place your eyes level with the liquid surface. Read the bottom of the curved meniscus, not its edges.";
  $("#msl-answer").value="";$("#msl-unit").value=tool==="ruler"?"cm":"mL";checked=false;
  $("#msl-feedback").textContent="Check the scale carefully before entering a reading.";
  $("#msl-score").textContent="Completed: "+attempts.length+" attempts · Correct: "+attempts.filter(x=>x.correct).length;
 }
 function history(){
  $("#msl-results").innerHTML=attempts.length?attempts.map(x=>'<tr><td>'+esc(x.tool==="ruler"?"Ruler":"Cylinder")+'</td>'+
   '<td>'+esc(x.given)+'</td><td>'+x.actual+' '+esc(x.unit)+'</td><td>'+(x.correct?"Correct":"Review")+'</td></tr>').join("") :
   '<tr><td colspan="4">Check a reading to start.</td></tr>';
 }
 el.addEventListener("click",ev=>{
  const b=ev.target.closest("[data-tool]");if(!b||!el.contains(b))return;
  tool=b.dataset.tool;paint();
 });
 $("#msl-check").onclick=()=>{
  if(checked){$("#msl-feedback").textContent="Choose New sample to try another reading.";return;}
  const raw=$("#msl-answer").value,unit=$("#msl-unit").value,n=raw.trim()===""?NaN:Number(raw),result=checkReading(tool,actual(),n,unit);
  $("#msl-feedback").textContent=result.message;
  if(!Number.isFinite(n))return;
  attempts.push({tool,given:n+" "+unit,actual:actual(),unit:result.expectedUnit,correct:result.correct});
  checked=true;history();
  $("#msl-score").textContent="Completed: "+attempts.length+" attempts · Correct: "+attempts.filter(x=>x.correct).length;
 };
 $("#msl-next").onclick=()=>{indices[tool]++;paint();};
 $("#msl-clear").onclick=()=>{attempts=[];history();paint();};
 $("#msl-download").onclick=()=>{
  const data=["Measurement Challenge — Grade 8",...attempts.map((x,i)=>(i+1)+". "+x.tool+": "+x.given+"; actual "+x.actual+" "+x.unit+"; "+(x.correct?"correct":"needs review")),
    "Why the scale and unit matter:",$("#msl-explain").value.trim()].join("\n\n");
  const url=URL.createObjectURL(new Blob([data],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");
  a.href=url;a.download="measurement-challenge.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#msl-notice").textContent="Measurement record downloaded.";
 };
 paint();history();
 el.measurementLab={get tool(){return tool},get actual(){return actual()},get attempts(){return attempts.slice()},next(){indices[tool]++;paint();}};
}
H.measurementCore={samples,checkReading,rulerSvg,cylinderSvg};
H.lessonTools=H.lessonTools||{};
const prev=H.lessonTools["skills/si"];
H.lessonTools["skills/si"]=function(root){const el=document.createElement("div");root.appendChild(el);render(el);if(prev){const old=document.createElement("div");root.appendChild(old);prev(old);}};
})();