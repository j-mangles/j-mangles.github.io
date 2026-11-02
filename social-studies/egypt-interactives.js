/* Interactive Egypt diagrams for the atlas lesson sheet.
   Each entry is a function(el) that draws into a figure. The lesson sheet re-renders when a student answers
   a question, so each interactive keeps its own state here and picks up where it left off. */
(function(){
"use strict";
const NS="http://www.w3.org/2000/svg";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const F='font-family="Inter, system-ui, sans-serif"';
const T=(x,y,s,o={})=>`<text x="${x}" y="${y}" ${F} font-size="${o.size||12}" ${o.w?`font-weight="${o.w}"`:""} fill="${o.fill||"var(--ink)"}" text-anchor="${o.a||"start"}"${o.id?` id="${o.id}"`:""}>${esc(s)}</text>`;

/* ---------------- The Nile's year ---------------- */
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const SEASON=m=>m>=6&&m<=9?["Akhet","flood season","var(--river)"]:(m>=10||m<=1)?["Peret","growing season","var(--farm)"]:["Shemu","harvest season","var(--accent)"];
// Share of the year's rise, by month (Jan..Dec): first rise in June, fastest in July, levels off in September, peaks in October.
const RISE=[.06,.04,.02,0,0,.06,.4,.7,.82,1,.55,.18];
const FLOODS={normal:{peak:16,label:"Normal flood"},high:{peak:21,label:"Too high"},low:{peak:12,label:"Too low"}};
const BASE=2;                         // dry-season depth in cubits
const yOf=c=>186-2*c;                 // water surface height on screen for a level in cubits
const FIELD_LO=8, FIELD_HI=15, VILLAGE=18;   // levels where the floodplain starts / is fully covered, and where the village floods
const TEXT=[
 "Peret, the growing season. Wheat and barley grow in the black silt. Farmers lift water from canals with a shaduf to keep the fields wet.",
 "The crops keep growing. Farmers weed, chase off birds and keep the canals clear.",
 "Shemu, the harvest season, begins. The grain ripens and turns gold.",
 "Harvest. Farmers cut the grain with sickles and thresh it. Scribes measure the crop and take a share as tax.",
 "The last grain goes into the granaries. The empty fields dry out and crack in the heat.",
 "Far to the south, the river starts rising at Aswan. Farmers repair canals and banks before the water arrives.",
 "Akhet, the flood season. The Nile rises fastest now and spills over its banks.",
 "The fields are underwater. With no farm work to do, many farmers worked on the pharaoh's building projects.",
 "The water levels off and stays high for about three weeks.",
 "The flood peaks. Officials read the Nilometer to judge how big the harvest will be and set the taxes.",
 "The water drains back into the river and leaves a layer of black silt behind. Farmers plant right away.",
 "Seedlings sprout in the wet, rich soil."
];
const state={t:5,flood:"normal",playing:false};

function level(t,flood){
  t=(t+11.5)%12;   // each month's value applies at mid-month
  const i=Math.floor(t)%12,j=(i+1)%12,f=t-Math.floor(t),r=RISE[i]+(RISE[j]-RISE[i])*f;
  return BASE+r*(FLOODS[flood].peak-BASE);
}
// Ground profile, left half; mirrored for the right bank. Floodplain rises gently away from the river.
const GL=[[0,100],[90,146],[155,150],[160,156],[310,170],[318,200]];
const ground=x=>{const g=x>360?720-x:x;for(let k=1;k<GL.length;k++){const[a,b]=GL[k-1],[c,d]=GL[k];if(g<=c)return b+(d-b)*(g-a)/(c-a);}return 200;};
const fieldXs=[];for(let x=166;x<=304;x+=9){fieldXs.push(x);fieldXs.push(720-x);}

function cropAt(t,silted){
  if(!silted)return null; const m=t%12;
  if(m>=6&&m<10)return null;                              // underwater or waiting for the flood
  if(m>=10&&m<10.6)return {h:0};                          // bare black silt, just planted
  const grow=m>=10?m-10.6:m+1.4;                          // months since planting
  if(grow<4.2)return {h:3+grow*3,c:"var(--farm)"};        // Nov-Feb: green and growing
  if(grow<5.6)return {h:15,c:"color-mix(in srgb, #d9a62b 75%, var(--farm))"};   // March-April: ripening gold
  if(grow<6.4)return {h:3,c:"color-mix(in srgb, #c9a46a 80%, var(--panel))"};    // May: stubble after harvest
  return null;                                            // June: dry and cracked
}

function nileYear(el){
  el.innerHTML=`<div class="ix-nile">
   <div style="overflow-x:auto"><svg viewBox="0 0 820 300" role="img" aria-label="Animated cross-section of the Nile Valley through one year" style="display:block;width:100%;height:auto;min-width:600px;touch-action:none">
    <rect x="0" y="0" width="720" height="250" fill="color-mix(in srgb, var(--river) 8%, var(--panel))"/>
    <g id="nx-water"></g><g id="nx-ground"></g><g id="nx-crops"></g><g id="nx-village"></g><g id="nx-labels"></g>
    <g id="nx-gauge"></g><g id="nx-time"></g>
   </svg></div>
   <div class="ix-row" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px">
    <button class="btn" type="button" id="nx-play" style="min-width:84px">Play</button>
    <input id="nx-slider" type="range" min="0" max="11.95" step="0.05" aria-label="Month" style="flex:1;min-width:180px">
    <span class="fine" style="margin:0">Flood:</span>
    ${Object.entries(FLOODS).map(([k,v])=>`<button class="btn ghost" type="button" data-flood="${k}" aria-pressed="false">${v.label}</button>`).join("")}
   </div>
   <p id="nx-text" aria-live="polite" style="margin:10px 0 0;min-height:3em"></p>
  </div>`;
  const $=s=>el.querySelector(s),svg=$("svg");
  // static ground
  const pts=[];for(let x=0;x<=720;x+=5)pts.push([x,ground(x)]);
  $("#nx-ground").innerHTML=`<path d="M0,250 L${pts.map(p=>p.join(",")).join(" L")} L720,250 Z" fill="color-mix(in srgb, var(--accent) 24%, var(--panel))"/>`;
  $("#nx-village").innerHTML=[96,112,128,142].map((x,i)=>`<rect x="${x}" y="${133+(i%2)*2}" width="12" height="${14-(i%2)*2}" fill="color-mix(in srgb, var(--accent) 55%, var(--panel))" stroke="var(--muted)" stroke-width=".8"/>`).join("")+`<path d="M92,147 L156,150" stroke="var(--muted)"/>`+`<g id="nx-vwater"></g>`;
  $("#nx-labels").innerHTML=T(48,90,"DESHRET",{w:700,fill:"var(--accent)",a:"middle"})+T(48,104,"desert",{size:11,fill:"var(--muted)",a:"middle"})+T(672,90,"DESHRET",{w:700,fill:"var(--accent)",a:"middle"})+T(672,104,"desert",{size:11,fill:"var(--muted)",a:"middle"})+T(124,126,"village",{size:11,fill:"var(--muted)",a:"middle"})+T(235,232,"KEMET: fields",{w:700,fill:"var(--farm)",a:"middle",size:11.5})+T(485,232,"KEMET: fields",{w:700,fill:"var(--farm)",a:"middle",size:11.5})+T(360,246,"the Nile",{size:11,fill:"var(--river)",a:"middle",w:600});
  // gauge frame
  const GY=c=>250-c*9.5;let g=`<rect x="748" y="${GY(22)}" width="34" height="${22*9.5}" rx="3" fill="var(--panel)" stroke="var(--muted)"/>`;
  g+=`<rect x="749" y="${GY(16)}" width="32" height="${(16-14)*9.5}" fill="var(--good)" opacity=".18"/><rect x="749" y="${GY(22)}" width="32" height="${(22-18)*9.5}" fill="var(--bad)" opacity=".15"/><rect x="749" y="${GY(13)}" width="32" height="${13*9.5-1}" fill="var(--bad)" opacity=".07"/>`;
  [4,8,12,16,20].forEach(c=>g+=`<line x1="782" y1="${GY(c)}" x2="788" y2="${GY(c)}" stroke="var(--muted)"/>`+T(791,GY(c)+4,c,{size:10,fill:"var(--muted)"}));
  g+=T(765,18,"Nilometer",{a:"middle",size:11,w:700})+T(765,32,"cubits",{a:"middle",size:10,fill:"var(--muted)"})+`<rect id="nx-gfill" x="750" width="30" fill="var(--river)" opacity=".75"/>`+T(745,GY(16)+4,"plenty",{a:"end",size:10,fill:"var(--good)",w:600})+T(745,GY(12)+4,"hunger",{a:"end",size:10,fill:"var(--bad)",w:600})+T(745,GY(20)+4,"danger",{a:"end",size:10,fill:"var(--bad)",w:600});
  $("#nx-gauge").innerHTML=g;
  // season band + month ticks
  const X=m=>20+m*(680/12);let tb="";
  [[6,10,"Akhet · flood","var(--river)"],[10,14,"Peret · growing","var(--farm)"],[2,6,"Shemu · harvest","var(--accent)"]].forEach(([a,z,n,c])=>{
    const seg=z>12?[[a,12],[0,z-12]]:[[a,z]];seg.forEach(([s,e],k)=>{tb+=`<rect x="${X(s)+1}" y="262" width="${X(e)-X(s)-2}" height="8" rx="3" fill="${c}" opacity=".8"/>`;if(k===0)tb+=T(X(s)+4,293,n,{size:11,fill:"var(--muted)"});});});
  MONTHS.forEach((m,i)=>tb+=T(X(i)+680/24,282,m.slice(0,3),{a:"middle",size:10,fill:"var(--muted)"}));
  tb+=`<rect x="20" y="255" width="680" height="45" fill="transparent" id="nx-hit" style="cursor:pointer"/><path id="nx-head" d="M0,0 l-6,-8 l12,0 Z" fill="var(--ink)"/>`;
  $("#nx-time").innerHTML=tb;

  const slider=$("#nx-slider"),play=$("#nx-play");
  function draw(){
    const t=state.t,m=Math.floor(t)%12,c=level(t,state.flood),pk=FLOODS[state.flood].peak,y=yOf(c),sy=yOf(pk);
    $("#nx-water").innerHTML=`<rect x="0" y="${y}" width="720" height="${250-y}" fill="var(--river)" opacity=".85"/>`;
    // silt where the season's peak reached; crops on silt
    let cr="";fieldXs.forEach(x=>{const gy=ground(x),silted=gy>sy+.5,under=gy>y;
      if(under)return;
      const col=silted&&!(m===5)?"color-mix(in srgb, var(--ink) 70%, var(--farm))":"color-mix(in srgb, var(--accent) 35%, var(--panel))";
      cr+=`<rect x="${x-4.5}" y="${gy-1.5}" width="9" height="4" fill="${col}"/>`;
      const k=cropAt(t,silted);if(k&&k.h)cr+=`<line x1="${x}" y1="${gy-1}" x2="${x}" y2="${gy-1-k.h}" stroke="${k.c}" stroke-width="3" stroke-linecap="round"/><line x1="${x}" y1="${gy-1-k.h*.6}" x2="${x+3}" y2="${gy-3-k.h*.8}" stroke="${k.c}" stroke-width="1.6"/>`;
      if(!silted&&(m>=10||m<=4))cr+=`<path d="M${x-3},${gy+1} l2,2 l2,-2 l2,2" stroke="var(--muted)" fill="none" stroke-width=".8"/>`;
    });
    $("#nx-crops").innerHTML=cr;
    $("#nx-vwater").innerHTML=c>VILLAGE?`<rect x="88" y="${y}" width="72" height="${150-y}" fill="var(--river)" opacity=".85"/>`:"";
    const GY=v=>250-v*9.5;const gf=$("#nx-gfill");gf.setAttribute("y",GY(c));gf.setAttribute("height",c*9.5-1);
    $("#nx-head").setAttribute("transform",`translate(${20+t*(680/12)},262)`);
    slider.value=t;
    const [sn,se]=SEASON(m);let txt=`<b>${MONTHS[m]} · ${sn} (${se})</b> · Nilometer: about ${Math.round(c)} cubits. ${esc(TEXT[m])}`;
    if(state.flood==="high"&&c>VILLAGE)txt+=` <b style="color:var(--bad)">Too high: the water reaches the village. Mudbrick houses collapse and stored grain is ruined.</b>`;
    if(state.flood==="low"&&(m>=10||m<=4))txt+=` <b style="color:var(--bad)">Too low: the outer fields never got water or silt, so nothing grows there. Less grain means hunger.</b>`;
    if(state.flood==="high"&&(m>=10||m<=4))txt+=` The fields that survived got plenty of silt, but the village has to rebuild.`;
    $("#nx-text").innerHTML=txt;
    el.querySelectorAll("[data-flood]").forEach(b=>{const on=b.dataset.flood===state.flood;b.setAttribute("aria-pressed",on);b.className=on?"btn":"btn ghost";});
    play.textContent=state.playing?"Pause":"Play";
  }
  let last=0;
  function tick(ts){
    if(!el.isConnected){state.playing=false;return;}
    if(!state.playing)return;
    if(last)state.t=(state.t+(ts-last)/1000*0.9)%12;   // about 13 seconds per year
    last=ts;draw();requestAnimationFrame(tick);
  }
  play.onclick=()=>{state.playing=!state.playing;last=0;draw();if(state.playing)requestAnimationFrame(tick);};
  slider.oninput=()=>{state.t=+slider.value;draw();};
  el.querySelectorAll("[data-flood]").forEach(b=>b.onclick=()=>{state.flood=b.dataset.flood;draw();});
  const hit=$("#nx-hit");
  const seek=e=>{const r=svg.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*820;state.t=Math.min(11.95,Math.max(0,(x-20)/(680/12)));draw();};
  hit.addEventListener("pointerdown",e=>{seek(e);hit.setPointerCapture(e.pointerId);hit.onpointermove=seek;});
  hit.addEventListener("pointerup",()=>{hit.onpointermove=null;});
  draw();
  if(state.playing){last=0;requestAnimationFrame(tick);}
}

window.EgyptInteractives={nileYear:{mount:nileYear,cap:"Press Play or drag through the months. Then try a flood that's too high or too low. The timing came every year; the height was the gamble."}};
})();
