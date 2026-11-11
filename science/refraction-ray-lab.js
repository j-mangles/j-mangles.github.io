/* Science 8 Energy & Light: Snell-law ray tracer linked to booklet Topic 2. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const MEDIA={air:{name:"Air",n:1.00},water:{name:"Water",n:1.33},glass:{name:"Glass",n:1.50}};
const deg=x=>x*180/Math.PI,rad=x=>x*Math.PI/180;
function trace(from,to,angle){
 if(!MEDIA[from]||!MEDIA[to]||!Number.isFinite(angle)||angle<0||angle>89.9)throw Error("Invalid ray controls");
 const a=MEDIA[from].n,b=MEDIA[to].n,ratio=a*Math.sin(rad(angle))/b;
 const tir=ratio>1+1e-12,theta=tir?null:deg(Math.asin(Math.max(-1,Math.min(1,ratio))));
 return {incident:angle,refracted:theta,totalInternalReflection:tir,n1:a,n2:b,critical:a>b?deg(Math.asin(b/a)):null,speedRatio:a/b};
}
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".rr{color:var(--ink);line-height:1.5;padding:12px 0 22px;min-width:0}.rr *{box-sizing:border-box}",
".rr h2{font:700 clamp(24px,3vw,31px) var(--f-title,Georgia,serif);margin:0 0 7px}.rr h3{font-size:1.06rem;margin:0 0 7px}",
".rr .note{font-size:.87rem;color:var(--muted)}.rr .layout{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(245px,1fr);gap:20px;align-items:start}",
".rr .diagram{border:1px solid var(--rule);background:var(--soft);border-radius:var(--radius,12px);overflow:hidden}",
".rr svg{display:block;width:100%;height:auto}.rr svg text{font:600 14px var(--f-body,system-ui);fill:var(--ink)}",
".rr svg .boundary{stroke:var(--ink);stroke-width:2;stroke-opacity:.65}.rr svg .normal{stroke:var(--muted);stroke-width:2;stroke-dasharray:8 6}",
".rr svg .incident{stroke:var(--accent);stroke-width:5;fill:none;stroke-linecap:round}.rr svg .refracted{stroke:var(--accent);stroke-width:5;fill:none;stroke-linecap:round}",
".rr svg .reflected{stroke:var(--muted);stroke-width:3;stroke-dasharray:7 6;fill:none}.rr svg .lower{fill:color-mix(in srgb,var(--accent) 11%,var(--paper))}",
".rr .controls{display:grid;gap:10px}.rr label{font-size:.88rem;font-weight:650;display:block;margin-bottom:6px}",
".rr select,.rr textarea{width:100%;background:var(--paper);color:var(--ink);border:1px solid var(--rule);padding:9px;font:inherit;border-radius:var(--btn-radius,8px)}",
".rr input[type=range]{width:100%;accent-color:var(--accent)}.rr button{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 12px;cursor:pointer;min-height:39px}",
".rr button:focus-visible,.rr select:focus-visible,.rr textarea:focus-visible,.rr input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".rr .readout{border-top:1px solid var(--rule);margin-top:13px;padding-top:12px;min-height:138px}",
".rr .readout strong{font-variant-numeric:tabular-nums;font-size:1.2rem}.rr .status{font-weight:650;min-height:48px}",
".rr .actions{display:flex;gap:8px;flex-wrap:wrap;margin:13px 0}.rr .tablewrap{overflow-x:auto;max-width:100%}.rr table{border-collapse:collapse;width:100%;font-size:.86rem}",
".rr th,.rr td{border-bottom:1px solid var(--rule);padding:7px 8px;text-align:left}.rr th{white-space:nowrap}.rr .write{margin:20px 0 5px}",
".rr textarea{min-height:80px;resize:vertical}.rr .readout b{display:block}",
"@media(max-width:750px){.rr .layout{grid-template-columns:1fr}}"
].join("\n");
function diagram(v,result){
 const W=680,H=390,cx=340,cy=195,len=175,ang=rad(result.incident);
 const incoming=[cx-len*Math.sin(ang),cy-len*Math.cos(ang)];
 const reflecting=[cx+len*Math.sin(ang),cy-len*Math.cos(ang)];
 const passing=result.totalInternalReflection?null:[cx+len*Math.sin(rad(result.refracted)),cy+len*Math.cos(rad(result.refracted))];
 const ray=(p,q,cls,arrow)=>'<path class="'+cls+'" d="M'+p.map(n=>n.toFixed(1)).join(' ')+' L'+q.map(n=>n.toFixed(1)).join(' ')+'"'+(arrow?' marker-end="url(#rr-arr)"':'')+'/>';
 return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Light travels from '+e(MEDIA[v.from].name)+' into '+e(MEDIA[v.to].name)+'. Incident angle '+v.angle+' degrees.'+
 (result.totalInternalReflection?' No transmitted ray; total internal reflection.':' Refracted angle '+result.refracted.toFixed(1)+' degrees.')+'">'+
 '<defs><marker id="rr-arr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="var(--accent)"/></marker></defs>'+
 '<rect class="lower" x="0" y="'+cy+'" width="'+W+'" height="'+(H-cy)+'"/><path class="boundary" d="M0 '+cy+' H'+W+'"/>'+
 '<path class="normal" d="M'+cx+' 15 V'+(H-15)+'"/>'+
 '<text x="15" y="35">'+e(MEDIA[v.from].name)+' · n = '+result.n1.toFixed(2)+'</text>'+
 '<text x="15" y="'+(H-18)+'">'+e(MEDIA[v.to].name)+' · n = '+result.n2.toFixed(2)+'</text>'+
 ray(incoming,[cx,cy],"incident",true)+ray([cx,cy],reflecting,"reflected",false)+
 (passing?ray([cx,cy],passing,"refracted",true):'')+
 '<circle cx="'+cx+'" cy="'+cy+'" r="5" fill="var(--ink)"/>'+
 '<text x="'+(cx-26)+'" y="'+(cy-21)+'" text-anchor="end">'+v.angle+'°</text>'+
 (passing?'<text x="'+(cx+26)+'" y="'+(cy+31)+'" text-anchor="start">'+result.refracted.toFixed(1)+'°</text>':'<text x="'+(cx+30)+'" y="'+(cy+26)+'">No transmitted ray</text>')+
 '<text x="'+(cx+8)+'" y="25" font-size="11">Normal</text>'+
 '</svg>';
}
function build(el){
 let v={from:"air",to:"water",angle:45},records=[];
 const opts=(key)=>Object.entries(MEDIA).map(([id,item])=>'<option value="'+id+'" '+(v[key]===id?'selected':'')+'>'+item.name+'</option>').join("");
 el.innerHTML='<section class="rr"><style>'+css+'</style><h2>Refraction Ray Lab</h2><p class="note">Shine a model ray across a boundary between transparent materials. Change the angle or materials to see when the light bends toward or away from the normal.</p>'+
 '<div class="layout"><div class="diagram" id="rr-diagram"></div><div><div class="controls">'+
 '<div><label for="rr-from">From</label><select id="rr-from">'+opts("from")+'</select></div>'+
 '<div><label for="rr-to">Into</label><select id="rr-to">'+opts("to")+'</select></div>'+
 '<div><label for="rr-angle">Angle from the normal: <output id="rr-angle-out">45°</output></label><input id="rr-angle" type="range" min="0" max="85" step="5" value="45"></div></div>'+
 '<div class="readout"><h3>What happens?</h3><strong id="rr-reading">—</strong><p class="status" id="rr-explain" role="status"></p><p class="note" id="rr-critical"></p></div></div></div>'+
 '<div class="actions"><button id="rr-record" type="button">Record trial</button><button id="rr-reset" type="button">Reset ray</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>From → To</th><th>Incident</th><th>Refracted</th><th>Result</th></tr></thead><tbody id="rr-trials"><tr><td colspan="5">No trials recorded.</td></tr></tbody></table></div>'+
 '<div class="write"><label for="rr-explanation"><b>Explain your evidence:</b> What happens when light enters a material with a higher refractive index?<textarea id="rr-explanation" placeholder="My diagram shows... because..."></textarea></label></div>'+
 '<div class="actions"><button type="button" id="rr-download">Download investigation</button><button type="button" id="rr-clear">Clear trials</button></div>'+
 '<p class="note" id="rr-message" aria-live="polite"></p><p class="note">Angles are measured from the normal (the dashed line), not the surface. The ray follows a simplified geometric model using refractive indices for visible light; reflected intensity is not to scale. Never point lasers toward eyes.</p></section>';
 const $=q=>el.querySelector(q);
 function result(){return trace(v.from,v.to,v.angle);}
 function paint(){
  const r=result();
  $("#rr-angle-out").textContent=v.angle+"°";$("#rr-diagram").innerHTML=diagram(v,r);
  $("#rr-reading").textContent=r.totalInternalReflection?"Total internal reflection":r.refracted.toFixed(1)+"° refracted";
  $("#rr-explain").textContent=r.totalInternalReflection?
    "At this angle, a ray in a higher-index material cannot enter the lower-index material by refraction. It reflects back.":
    r.incident===0?"Along the normal: speed changes, but the light does not bend sideways.":
    r.n1===r.n2?"Same refractive index: the ray continues straight.":
    r.n2>r.n1?"The ray bends toward the normal in the higher-index material.":"The ray bends away from the normal in the lower-index material.";
  $("#rr-critical").textContent=r.critical===null?"This direction has no total-internal-reflection critical angle.":"Critical angle: "+r.critical.toFixed(1)+"° (greater angles give total internal reflection).";
 }
 function trials(){
  $("#rr-trials").innerHTML=records.length?records.map((t,i)=>'<tr><td>'+(i+1)+'</td><td>'+e(MEDIA[t.v.from].name)+' → '+e(MEDIA[t.v.to].name)+'</td><td>'+t.v.angle+'°</td><td>'+(t.r.refracted===null?'—':t.r.refracted.toFixed(1)+'°')+'</td><td>'+(t.r.totalInternalReflection?'Reflected':'Transmitted')+'</td></tr>').join(""):'<tr><td colspan="5">No trials recorded.</td></tr>';
 }
 $("#rr-from").onchange=ev=>{v.from=ev.target.value;paint();};
 $("#rr-to").onchange=ev=>{v.to=ev.target.value;paint();};
 $("#rr-angle").oninput=ev=>{v.angle=Number(ev.target.value);paint();};
 $("#rr-record").onclick=()=>{records.push({v:{...v},r:result()});if(records.length>8)records.shift();trials();};
 $("#rr-reset").onclick=()=>{v={from:"air",to:"water",angle:45};$("#rr-from").value=v.from;$("#rr-to").value=v.to;$("#rr-angle").value=v.angle;paint();};
 $("#rr-clear").onclick=()=>{records=[];trials();$("#rr-message").textContent="Trial table cleared.";};
 $("#rr-download").onclick=()=>{
  const txt=["Refraction Ray Lab — Science 8","Trials:",...records.map((t,i)=>(i+1)+". "+t.v.from+" to "+t.v.to+" at "+t.v.angle+"°: "+(t.r.refracted===null?"total internal reflection":t.r.refracted.toFixed(1)+"° refracted")),"Explanation:",$("#rr-explanation").value.trim()].join("\n\n");
  const url=URL.createObjectURL(new Blob([txt],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download="refraction-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);$("#rr-message").textContent="Investigation downloaded.";
 };
 paint();trials();
 el.rayLab={trace:result,set(next){v={...v,...next};paint();},get records(){return records.slice();}};
}
H.refractionCore={media:MEDIA,trace,diagram};
H.lessonTools=H.lessonTools||{};const original=H.lessonTools["light/u3t2-refraction"];
H.lessonTools["light/u3t2-refraction"]=function(root){const first=document.createElement("div");root.appendChild(first);build(first);if(original){const existing=document.createElement("div");root.appendChild(existing);original(existing);}};
})();