/* Grade 8 Science Unit 2 (Matter, Density and Fluids): pictures for the lesson pages.
   Numbers follow the Sci8_MDF student booklet. Colours use the site CSS variables. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const F='font-family="var(--f-body), system-ui, sans-serif"';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const T=(x,y,s,o={})=>`<text x="${x}" y="${y}" ${F} font-size="${o.size||14}" ${o.w?`font-weight="${o.w}"`:""} fill="${o.fill||"var(--ink)"}" text-anchor="${o.a||"start"}">${esc(s)}</text>`;
const A="var(--accent)",S="var(--muted)",W="color-mix(in srgb, #3b82c4 55%, var(--paper))";
const AR=`<defs><marker id="mv-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${S}"/></marker></defs>`;
const svg=(w,h,label,body)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" style="display:block;width:100%;height:auto;min-width:520px">${AR}${body}</svg>`;
const wrap=(title,s,note)=>`<div class="eyebrow">${esc(title)}</div><div style="overflow-x:auto;margin-top:10px">${s}</div>${note?`<p class="note" style="margin-top:8px">${esc(note)}</p>`:""}`;
const arrow=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${S}" stroke-width="1.4" marker-end="url(#mv-ar)"/>`;

function states(el){
  let b="";const box=(x,name,sub)=>`<rect x="${x}" y="20" width="200" height="170" rx="6" fill="var(--paper)" stroke="${S}"/>`+T(x+100,214,name,{a:"middle",w:700})+T(x+100,232,sub,{a:"middle",size:12,fill:S});
  b+=box(20,"Solid","packed in a pattern, vibrate in place")+box(260,"Liquid","close together, slide past each other")+box(500,"Gas","far apart, fast, every direction");
  for(let r=0;r<6;r++)for(let c=0;c<7;c++)b+=`<circle cx="${43+c*26}" cy="${45+r*27}" r="11" fill="${A}" stroke="var(--paper)"/>`;
  [[290,150],[312,160],[336,152],[360,162],[384,150],[408,160],[432,155],[300,172],[324,176],[348,174],[372,177],[396,173],[420,176],[444,174],[290,128],[316,136],[342,130],[368,138],[394,128],[420,134],[444,130],[302,108],[330,112],[358,104],[386,110]].forEach(([x,y])=>b+=`<circle cx="${x}" cy="${y}" r="11" fill="${A}" stroke="var(--paper)"/>`);
  b+=`<line x1="262" y1="96" x2="458" y2="96" stroke="${S}" stroke-dasharray="4 3"/>`;
  [[530,50,30,-14],[610,70,-26,10],[670,46,-20,22],[560,120,28,18],[650,140,24,-20],[590,168,-28,-8],[680,110,14,26],[540,170,24,-16]].forEach(([x,y,dx,dy])=>b+=`<circle cx="${x}" cy="${y}" r="11" fill="${A}"/>`+arrow(x+dx*.45,y+dy*.45,x+dx*1.25,y+dy*1.25));
  el.innerHTML=wrap("See it",svg(720,244,"Particle models of a solid, a liquid and a gas",b),"Same particles, different energy. Adding energy moves you from left to right: solid to liquid to gas. Circles are enlarged and not to scale.");
}

function density(el){
  const M=[["cork",0.24],["ice",0.92],["water",1.00],["maple syrup",1.32],["aluminum",2.70],["iron",7.87],["lead",11.3],["gold",19.3]];
  const x0=130,x1=560,X=v=>x0+v/20*(x1-x0);let b=T(20,22,"Mass of 1 cm³ of each substance (g)",{w:700});
  M.forEach(([n,d],i)=>{const y=40+i*26,fl=d<1,wat=d===1;b+=T(x0-10,y+14,n,{a:"end",size:13})+`<rect x="${x0}" y="${y}" width="${Math.max(X(d)-x0,2)}" height="18" rx="2" fill="${wat?W:fl?"color-mix(in srgb, var(--accent) 35%, var(--paper))":A}"/>`+T(Math.max(X(d),X(1)+2)+6,y+14,d.toFixed(d<1?2:d<10?2:1),{size:12,fill:S});});
  b+=`<line x1="${X(1)}" y1="34" x2="${X(1)}" y2="252" stroke="${W}" stroke-width="2" stroke-dasharray="4 3"/>`+T(X(1)+6,264,"water = 1.00: left of the line floats, right sinks",{size:12,fill:S});
  const cx=650,ty=60;b+=`<path d="M${cx},${ty} L${cx+64},${ty+120} L${cx-64},${ty+120} Z" fill="var(--paper)" stroke="${A}" stroke-width="2"/>`+`<line x1="${cx-40}" y1="${ty+76}" x2="${cx+40}" y2="${ty+76}" stroke="${A}" stroke-width="2"/><line x1="${cx}" y1="${ty+76}" x2="${cx}" y2="${ty+120}" stroke="${A}" stroke-width="2"/>`;
  b+=T(cx,ty+60,"m",{a:"middle",w:700,size:22})+T(cx-24,ty+106,"d",{a:"middle",w:700,size:20})+T(cx+24,ty+106,"v",{a:"middle",w:700,size:20})+T(cx,ty+146,"d = m ÷ v",{a:"middle",size:12})+T(cx,ty+162,"m = d × v",{a:"middle",size:12})+T(cx,ty+178,"v = m ÷ d",{a:"middle",size:12});
  el.innerHTML=wrap("See it",svg(720,276,"Bar chart of densities compared with water, and the density formula triangle",b),"Every bar is the same size cube, 1 cm³. Only the mass packed inside changes. Cover a letter on the triangle to see the formula for it.");
}

function displacement(el){
  const cyl=(x,level,label,obj)=>{let b=`<rect x="${x}" y="40" width="80" height="200" rx="4" fill="var(--paper)" stroke="${S}" stroke-width="1.5"/>`;
    const Y=v=>240-v/100*200;b+=`<rect x="${x+2}" y="${Y(level)}" width="76" height="${240-Y(level)-2}" fill="${W}" opacity=".6"/>`;
    for(let v=10;v<=90;v+=10)b+=`<line x1="${x+80}" y1="${Y(v)}" x2="${x+68}" y2="${Y(v)}" stroke="${S}"/>`+(v%20===0||v===50?T(x+86,Y(v)+4,v,{size:11,fill:S}):"");
    if(obj)b+=`<rect x="${x+24}" y="176" width="32" height="12" rx="2" fill="${A}"/><rect x="${x+34}" y="188" width="12" height="48" fill="${A}"/>`+[0,1,2,3,4].map(i=>`<line x1="${x+34}" y1="${196+i*8}" x2="${x+46}" y2="${200+i*8}" stroke="var(--paper)" stroke-width="1.2"/>`).join("");
    b+=T(x+40,262,label,{a:"middle",w:700,size:13});return b;};
  let b=T(20,22,"Finding the volume of a steel bolt",{w:700})+cyl(60,50,"Before: 50 mL",0)+cyl(260,56,"After: 56 mL",1);
  b+=`<line x1="250" y1="140" x2="360" y2="128" stroke="${S}" stroke-dasharray="3 3"/>`;
  b+=T(430,90,"Volume = 56 − 50 = 6 mL = 6 cm³",{w:700})+T(430,122,"Mass (weighed dry) = 47.2 g",{})+T(430,154,"Density = 47.2 ÷ 6 = 7.87 g/cm³",{w:700,fill:A})+T(430,186,"Matches iron, so it sinks.",{fill:S,size:13});
  b+=T(430,226,"Read the bottom of the curve",{size:12,fill:S})+T(430,242,"(the meniscus) at eye level.",{size:12,fill:S});
  el.innerHTML=wrap("See it",svg(720,276,"Graduated cylinder before and after adding a bolt, showing water displacement",b),"Tilt the cylinder and slide the object in. Dropping it can crack the glass.");
}

function heating(el){
  const x0=70,x1=690,y0=250,y1=30,Y=t=>y0-(t+40)/180*(y0-y1);
  let b=`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${S}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" stroke="${S}"/>`;
  [-20,0,50,100,120].forEach(t=>b+=`<line x1="${x0-4}" y1="${Y(t)}" x2="${x0}" y2="${Y(t)}" stroke="${S}"/>`+T(x0-8,Y(t)+4,t+"°C",{a:"end",size:11,fill:S}));
  const P=[[x0,Y(-20)],[150,Y(0)],[260,Y(0)],[420,Y(100)],[600,Y(100)],[670,Y(125)]];
  b+=`<polyline points="${P.map(p=>p.join(",")).join(" ")}" fill="none" stroke="${A}" stroke-width="3" stroke-linejoin="round"/>`;
  const lab=(x,y,t,sub)=>T(x,y,t,{a:"middle",w:700,size:13})+(sub?T(x,y+15,sub,{a:"middle",size:11,fill:S}):"");
  b+=T(96,Y(-10)-16,"ice warms",{w:700,size:13})+lab(205,Y(0)+26,"melting","flat: particles pulling apart")+T(330,Y(60),"water warms",{w:700,size:13,a:"end"})+lab(510,Y(100)-30,"boiling","flat again")+T(640,Y(100)+26,"steam warms",{w:700,size:13,a:"middle"});
  b+=`<rect x="150" y="${Y(0)-6}" width="110" height="12" fill="${A}" opacity=".15"/><rect x="420" y="${Y(100)-6}" width="180" height="12" fill="${A}" opacity=".15"/>`;
  b+=T((x0+x1)/2,y0+24,"Energy added over time →",{a:"middle",size:12,fill:S});
  el.innerHTML=wrap("See it",svg(720,284,"Heating curve for water from ice to steam with flat sections at melting and boiling",b),"Boiling takes much longer than melting because pulling particles all the way apart into a gas takes far more energy. This schematic is for pure water at standard atmospheric pressure; plateau widths are illustrative, not measured time.");
}


function compressibility(el){
  const media={
    gas:{label:"Gas · air in a sealed syringe",factor:0.65,color:"#477bb5",note:"The same gas particles now share a smaller space. At constant temperature and particle count, they hit the walls more often, so pressure rises."},
    liquid:{label:"Liquid · water in a syringe",factor:0.02,color:"#3e9bbb",note:"The plunger barely moves because liquid particles are already close together. Liquids hardly compress, and a push is transmitted through the liquid."},
    solid:{label:"Solid · a solid block",factor:0.01,color:"#b17a46",note:"The block changes volume very little under this everyday squeeze. Its particles are closely arranged and vibrate in place."}
  };
  const gasPoints=[[.08,.18],[.22,.72],[.34,.35],[.47,.86],[.58,.22],[.69,.62],[.83,.38],[.16,.48],[.29,.92],[.42,.12],[.54,.55],[.66,.9],[.77,.18],[.9,.72],[.12,.88],[.37,.61]];
  const closePoints=[];
  for(let y=0;y<4;y++)for(let x=0;x<4;x++)closePoints.push([.08+x*.27,.13+y*.23]);
  let medium="gas",push=60,trials=[];
  el.innerHTML='<style>.mclab{padding:18px;background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius)}.mclab h3{margin:0 0 7px}.mclab p{margin:7px 0}.mclab .mlab-intro,.mclab .mlab-note{color:var(--muted)}.mlab-controls{display:grid;grid-template-columns:minmax(180px,1fr) minmax(220px,2fr);gap:14px;margin:15px 0}.mlab-controls label,.mlab-prediction label,.mlab-conclusion label{display:block;font-weight:700;margin-bottom:6px}.mlab-controls select{width:100%;min-height:42px;padding:8px;border:1px solid var(--rule);border-radius:9px;background:var(--paper);color:var(--ink);font:inherit}.mlab-controls input{width:100%;accent-color:var(--accent)}.mlab-model{overflow:auto}.mlab-model svg{display:block;width:100%;min-width:480px;height:auto;background:var(--soft);border-radius:10px}.mlab-output{display:grid;grid-template-columns:1fr 2fr;gap:12px;margin:13px 0}.mlab-metric,.mlab-observation{padding:12px;border-radius:10px;background:var(--soft)}.mlab-metric strong{font-size:22px}.mlab-observation{color:var(--ink)}.mlab-prediction,.mlab-conclusion{margin-top:15px}.mlab-model-check{margin-top:15px;padding:13px;border:1px solid var(--rule);border-radius:10px}.mlab-model-check label{display:block;font-weight:700;margin-bottom:6px}.mlab-model-check select{width:100%;min-height:42px;padding:8px;border:1px solid var(--rule);border-radius:9px;background:var(--paper);color:var(--ink);font:inherit}.mlab-model-feedback{min-height:1.4em;color:var(--muted)}.mclab textarea{display:block;width:100%;min-height:82px;padding:10px 12px;border:1px solid var(--rule);border-radius:9px;background:var(--paper);color:var(--ink);font:inherit;resize:vertical}.mlab-actions{display:flex;gap:9px;flex-wrap:wrap;margin:13px 0}.mlab-actions button{min-height:42px;padding:0 15px;border:0;border-radius:var(--btn-radius);background:var(--btn);color:var(--on-btn);font:inherit;font-weight:700;cursor:pointer}.mlab-actions .mlab-secondary{border:1px solid var(--rule);background:var(--paper);color:var(--ink)}.mclab button:focus-visible,.mclab select:focus-visible,.mclab input:focus-visible,.mclab textarea:focus-visible{outline:3px solid color-mix(in srgb,var(--accent) 42%,transparent);outline-offset:2px}.mlab-history{overflow-x:auto}.mlab-history table{width:100%;border-collapse:collapse}.mlab-history th,.mlab-history td{padding:8px;border-bottom:1px solid var(--rule);text-align:left}.mlab-history th{font-size:13px}.mlab-status{min-height:1.4em;color:var(--muted)}@media(max-width:650px){.mlab-controls,.mlab-output{grid-template-columns:1fr}.mclab{padding:14px}}</style><section class="mclab" aria-label="Pressure and compressibility virtual lab"><div class="eyebrow">Virtual lab · Investigation</div><h3>How Compressible Is It?</h3><p class="mlab-intro">Test the same squeeze on a gas, a liquid and a solid. Keep the particle count and temperature fixed. Predict first, then record the model response.</p><div class="mlab-prediction"><label for="mlab-prediction">Prediction: Which material will change volume most under the same squeeze? Why?</label><textarea id="mlab-prediction" placeholder="I predict… because…"></textarea></div><div class="mlab-controls"><div><label for="mlab-medium">Material in the syringe</label><select id="mlab-medium"><option value="gas">Gas (air)</option><option value="liquid">Liquid (water)</option><option value="solid">Solid (block)</option></select></div><div><label for="mlab-push">Squeeze effort · relative model setting: <span id="mlab-push-value">60</span></label><input id="mlab-push" type="range" min="0" max="100" value="60"><p class="mlab-note">Use the same setting when you compare materials.</p></div></div><div class="mlab-model" id="mlab-model"></div><div class="mlab-output"><div class="mlab-metric"><span>Illustrative relative volume</span><br><strong id="mlab-volume">—</strong></div><div class="mlab-observation" id="mlab-observation" aria-live="polite"></div></div><div class="mlab-actions"><button type="button" id="mlab-record">Record this trial</button><button type="button" class="mlab-secondary" id="mlab-clear">Clear trial history</button><button type="button" class="mlab-secondary" id="mlab-download">Download my lab notes</button></div><p class="mlab-status" id="mlab-status" role="status"></p><div class="mlab-history" id="mlab-history"></div><div class="mlab-conclusion"><label for="mlab-conclusion">Conclusion: Compare at least two materials. What changed, and what did the same squeeze keep constant?</label><textarea id="mlab-conclusion" placeholder="The gas changed volume more than… The model kept … constant."></textarea></div><div class="mlab-model-check"><label for="mlab-model-check">Model check: What best describes the particle model and this picture?</label><select id="mlab-model-check"><option value="">Choose one</option><option value="established">Particle theory is an established model; this syringe drawing and its volume percentages are simplified representations, not direct images or measurements.</option><option value="photo">Each dot is a photographically accurate particle and the volume percentage is a measured result.</option><option value="proof">The picture proves all materials compress by the same amount.</option></select><p class="mlab-model-feedback" id="mlab-model-feedback" role="status" aria-live="polite"></p><label for="mlab-model-reflection">What does the model help you explain? What does it simplify or leave out?</label><textarea id="mlab-model-reflection" placeholder="The model helps me see… It simplifies…"></textarea></div><p class="mlab-note">The volume percentages are illustrative model values, not measurements of real materials. The pressure explanation is qualitative; the model does not calculate pressure units. Your notes stay on this page unless you download them.</p></section>';
  const root=el.querySelector(".mclab"),select=root.querySelector("#mlab-medium"),slider=root.querySelector("#mlab-push");
  const relative=()=>Math.round((1-media[medium].factor*Number(slider.value)/100)*100);
  function draw(){
    const m=media[medium],pct=relative(),x0=90,y0=58,barrelW=365,barrelH=156,innerX=x0+18,innerY=y0+12,innerW=barrelW-38,innerH=barrelH-24,pistonX=innerX+innerW*pct/100;
    const pts=medium==="gas"?gasPoints:closePoints;
    let body='<rect x="'+x0+'" y="'+y0+'" width="'+barrelW+'" height="'+barrelH+'" rx="13" fill="var(--paper)" stroke="var(--muted)" stroke-width="3"/>';
    body+='<rect x="'+innerX+'" y="'+(y0+barrelH+7)+'" width="'+innerW+'" height="12" rx="5" fill="var(--muted)" opacity=".25"/>';
    body+='<rect x="'+(pistonX-7)+'" y="'+(y0-5)+'" width="14" height="'+(barrelH+10)+'" rx="4" fill="var(--accent)"/>';
    body+='<line x1="'+(pistonX+8)+'" y1="'+(y0+barrelH/2)+'" x2="'+(pistonX+58)+'" y2="'+(y0+barrelH/2)+'" stroke="var(--muted)" stroke-width="9" stroke-linecap="round"/>';
    body+='<line x1="'+(pistonX+58)+'" y1="'+(y0+barrelH/2-25)+'" x2="'+(pistonX+58)+'" y2="'+(y0+barrelH/2+25)+'" stroke="var(--accent)" stroke-width="8" stroke-linecap="round"/>';
    for(let i=0;i<pts.length;i++){const px=innerX+7+pts[i][0]*Math.max(12,pistonX-innerX-17),py=innerY+7+pts[i][1]*(innerH-14);body+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="'+(medium==="gas"?6:5.5)+'" fill="'+m.color+'" opacity=".92"/>';}
    body+='<text x="'+(x0+barrelW/2)+'" y="258" text-anchor="middle" fill="var(--ink)" font-size="15">'+(medium==="gas"?"Gas particles spread through the space":"Particles stay close together")+'</text>';
    root.querySelector("#mlab-model").innerHTML='<svg viewBox="0 0 540 278" role="img" aria-label="'+m.label+" particle model; same particle count"+'">'+body+'</svg>';
    root.querySelector("#mlab-push-value").textContent=slider.value;
    root.querySelector("#mlab-volume").textContent=pct+"% of starting volume";
    root.querySelector("#mlab-observation").textContent=m.note;
    root.querySelector("#mlab-status").textContent="";
  }
  function renderHistory(){
    const area=root.querySelector("#mlab-history");
    if(!trials.length){area.innerHTML='<p class="mlab-note">No trials recorded yet.</p>';return;}
    area.innerHTML='<table><caption class="visually-hidden">Recorded compressibility model trials</caption><thead><tr><th>Material</th><th>Squeeze setting</th><th>Relative volume</th></tr></thead><tbody>'+trials.map(t=>'<tr><td>'+t.material+'</td><td>'+t.push+'</td><td>'+t.volume+'%</td></tr>').join("")+'</tbody></table>';
  }
  select.addEventListener("change",()=>{medium=select.value;draw();});
  const modelCheck=root.querySelector("#mlab-model-check"),modelFeedback=root.querySelector("#mlab-model-feedback");
  modelCheck.addEventListener("change",()=>{modelFeedback.textContent=modelCheck.value==="established"?"Correct. Particle theory is an established explanatory model; this drawing and its percentages simplify it for learning.":modelCheck.value?"That claim treats the representation as more literal than it is. Look for an option that distinguishes the established particle model from this simplified diagram.":"";});
  slider.addEventListener("input",draw);
  root.querySelector("#mlab-record").addEventListener("click",()=>{trials.push({material:media[medium].label,push:slider.value,volume:relative()});renderHistory();root.querySelector("#mlab-status").textContent="Trial recorded. Keep the squeeze setting the same when comparing materials.";});
  root.querySelector("#mlab-clear").addEventListener("click",()=>{trials=[];renderHistory();root.querySelector("#mlab-status").textContent="Trial history cleared.";});
  root.querySelector("#mlab-download").addEventListener("click",()=>{
    const escCsv=s=>'"'+String(s).replace(/"/g,'""')+'"';
    const rows=['Material,Squeeze setting,Illustrative relative volume',...trials.map(t=>[escCsv(t.material),t.push,t.volume+"%"].join(",")),"","Prediction,"+escCsv(root.querySelector("#mlab-prediction").value),"Conclusion,"+escCsv(root.querySelector("#mlab-conclusion").value),"Model check,"+escCsv(root.querySelector("#mlab-model-check").value),"Model reflection,"+escCsv(root.querySelector("#mlab-model-reflection").value)].join("\n");
    const a=document.createElement("a"),url=URL.createObjectURL(new Blob([rows],{type:"text/csv;charset=utf-8"}));a.href=url;a.download="compressibility-virtual-lab.csv";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);root.querySelector("#mlab-status").textContent="Lab notes downloaded.";
  });
  renderHistory();draw();
}
function viscosity(el){
  let b="";
  b+="<rect x='20' y='26' width='320' height='220' rx='12' fill='var(--paper)' stroke='var(--rule)'/>";
  b+="<rect x='380' y='26' width='320' height='220' rx='12' fill='var(--paper)' stroke='var(--rule)'/>";
  b+=T(180,53,"WATER · LOWER VISCOSITY",{a:"middle",w:700,size:15})+T(180,76,"farther in the same short time",{a:"middle",size:12,fill:S});
  b+=T(540,53,"SYRUP · HIGHER VISCOSITY",{a:"middle",w:700,size:15})+T(540,76,"less distance in the same short time",{a:"middle",size:12,fill:S});
  b+="<line x1='60' y1='194' x2='300' y2='116' stroke='"+S+"' stroke-width='5' stroke-linecap='round'/>";
  b+="<line x1='420' y1='194' x2='660' y2='116' stroke='"+S+"' stroke-width='5' stroke-linecap='round'/>";
  b+=arrow(75,188,291,119)+arrow(435,188,482,173);
  b+="<path d='M270 132 C280 119 294 119 302 132 C302 143 293 151 286 151 C278 151 270 143 270 132Z' fill='"+W+"' stroke='"+A+"'/>";
  b+="<path d='M458 174 C466 162 480 162 488 174 C488 185 480 192 473 192 C465 192 458 185 458 174Z' fill='color-mix(in srgb, var(--accent) 35%, var(--paper))' stroke='"+A+"'/>";
  b+=T(180,222,"Flow direction",{a:"middle",size:12,fill:S})+T(540,222,"Flow direction",{a:"middle",size:12,fill:S});
  el.innerHTML=wrap("See it",svg(720,270,"Qualitative comparison: water flows farther than syrup on identical ramps in the same time",b),"Viscosity is resistance to flow. Same ramp angle, surface, sample amount, temperature and time; only the fluid changes. This is a conceptual comparison, not measured data.");
}

function temperatureDensity(el){
  let b="";
  b+=T(360,22,"SAME SAMPLE · SAME MASS",{a:"middle",w:700,size:15});
  b+="<rect x='28' y='46' width='260' height='152' rx='8' fill='var(--paper)' stroke='"+S+"' stroke-width='1.5'/>";
  b+="<rect x='432' y='34' width='260' height='176' rx='8' fill='var(--paper)' stroke='"+S+"' stroke-width='1.5'/>";
  b+=T(158,69,"COOL GAS",{a:"middle",w:700,size:15})+T(562,58,"WARM GAS",{a:"middle",w:700,size:15});
  const cool=[[82,104],[122,104],[162,104],[202,104],[242,104],[82,146],[122,146],[162,146],[202,146],[242,146]];
  const warm=[[474,93],[520,94],[566,91],[612,94],[658,92],[474,151],[520,151],[566,151],[612,151],[658,151]];
  cool.forEach(([x,y])=>b+="<circle cx='"+x+"' cy='"+y+"' r='9' fill='"+A+"'/>");
  warm.forEach(([x,y],i)=>b+="<circle cx='"+x+"' cy='"+y+"' r='9' fill='"+A+"'/>"+(i%2===0?arrow(x+2,y-11,x+10,y-18):""));
  b+=T(158,221,"particles closer together",{a:"middle",size:12,fill:S})+T(562,233,"particles spread farther apart",{a:"middle",size:12,fill:S});
  b+=arrow(305,120,413,120)+T(359,105,"add heat",{a:"middle",size:12,fill:S});
  b+="<rect x='36' y='246' width='648' height='36' rx='9' fill='var(--soft)'/>";
  b+=T(360,269,"Mass stays the same  ÷  volume increases  →  density decreases",{a:"middle",w:700,size:14});
  b+=T(360,309,"Warm air rises when surrounded by cooler, denser air.",{a:"middle",size:13,fill:S});
  el.innerHTML=wrap("See it",svg(720,324,"Same sample of gas before and after warming: particles move faster and spread through a larger volume, lowering density",b),"Blue circles represent gas particles. The arrows show particle motion; warmed particles move faster. Spacing and motion are simplified and not to scale. Warm air rises in cooler surroundings because it is less dense.");
}

function waterProperties(el){
  let b="";
  b+="<rect x='18' y='26' width='326' height='278' rx='12' fill='var(--paper)' stroke='var(--rule)'/>";
  b+="<rect x='366' y='26' width='336' height='278' rx='12' fill='var(--paper)' stroke='var(--rule)'/>";
  b+=T(181,52,"WHY ICE FLOATS",{a:"middle",w:700,size:15})+T(534,52,"FRESHWATER LAKE IN WINTER",{a:"middle",w:700,size:14});
  b+=T(92,82,"ICE",{a:"middle",w:700,size:14})+T(250,82,"LIQUID WATER",{a:"middle",w:700,size:14});
  const ice=[[62,116],[100,116],[81,148],[119,148],[62,180],[100,180],[81,212],[119,212]];
  const liquid=[[206,116],[234,116],[262,116],[290,116],[206,145],[234,145],[262,145],[290,145]];
  ice.forEach(([x,y])=>b+="<circle cx='"+x+"' cy='"+y+"' r='10' fill='"+A+"'/>");
  liquid.forEach(([x,y])=>b+="<circle cx='"+x+"' cy='"+y+"' r='8' fill='"+A+"'/>");
  b+=T(92,242,"open particle arrangement",{a:"middle",size:11,fill:S})+T(250,242,"closer-packed liquid",{a:"middle",size:11,fill:S});
  b+=T(92,270,"Ice: 0.92 g/cm³",{a:"middle",w:700,size:13})+T(250,270,"Water: about 1.00 g/cm³",{a:"middle",w:700,size:12});
  b+=T(181,291,"same amount of water · ice occupies more volume",{a:"middle",size:10,fill:S});
  b+="<rect x='386' y='72' width='296' height='198' rx='6' fill='"+W+"' stroke='"+S+"'/>";
  b+="<rect x='387' y='73' width='294' height='34' fill='color-mix(in srgb, #9cc9ed 48%, var(--paper))' stroke='"+S+"'/>";
  b+=T(534,96,"floating ice insulates water below",{a:"middle",w:700,size:12});
  b+="<line x1='388' y1='159' x2='680' y2='159' stroke='"+S+"' stroke-dasharray='4 4'/>";
  b+=T(534,137,"cooler liquid water",{a:"middle",size:12})+T(534,192,"water near 4°C · densest",{a:"middle",w:700,size:13})+T(534,218,"sinks below colder water",{a:"middle",size:12});
  b+=arrow(650,174,650,202);
  b+=T(534,248,"deeper water stays liquid beneath the ice",{a:"middle",size:11,fill:S});
  b+=T(534,291,"simplified lake layers · not to scale",{a:"middle",size:11,fill:S});
  el.innerHTML=wrap("See it",svg(720,320,"Water compared as ice and liquid, plus simplified winter lake layering showing surface ice and denser four-degree water near the bottom",b),"The circles show a simplified particle model, not actual water molecules. In freshwater, liquid water is densest near 4°C; real lakes vary with depth, weather and mixing.");
}

H.lessonTools=Object.assign(H.lessonTools||{},{"matter/states":states,"matter/density":density,"matter/lab":displacement,"matter/viscosity":viscosity,"matter/temperature":temperatureDensity,"matter/phase":heating,"matter/pressure":compressibility,"matter/water":waterProperties});
})();
