/* Grade 8 Science homepage: one journey from the Sun down to the particles inside a cell.
   The year's units sit at four scales, biggest first. Each level opens its unit; the level the class is on is marked.
   Sizes on the scale ruler are rounded, real values. Drawings are simplified and not to scale within a scene. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const unit=id=>H.units.find(u=>u.id===id)||{};

// One level per unit, biggest scale first. "into" is how much closer the next level is.
const LEVELS=[
 {id:"light",scale:"150 000 000 km",what:"from the Sun to Earth",exp:"10¹¹ m",q:"Where does almost all of Earth's energy come from, and where does it go?",into:"about 10 000 times closer",tint:"#F2A93B"},
 {id:"earth",scale:"12 700 km",what:"across the Earth",exp:"10⁷ m",q:"Why do the ground, the mountains and the sea floor keep moving?",into:"about a trillion times closer",tint:"#D9622B"},
 {id:"cells",scale:"0.02 mm",what:"across one animal cell",exp:"10⁻⁵ m",q:"How does a body made of trillions of cells keep itself alive?",into:"about 70 000 times closer",tint:"#4FA36B"},
 {id:"matter",scale:"0.0000003 mm",what:"across one water particle",exp:"10⁻¹⁰ m",q:"Why does ice float, honey crawl and steam take up so much room?",into:"",tint:"#5BA8E0"}];

/* ---------- scenes (viewBox 1000 × 460) ---------- */
const sun=()=>`
 <defs><radialGradient id="sz-sun" cx="0" cy="50%" r="80%"><stop offset="0" stop-color="#FFF1C9"/><stop offset=".45" stop-color="#F7B23B"/><stop offset=".8" stop-color="#E06A1F"/><stop offset="1" stop-color="#E06A1F" stop-opacity="0"/></radialGradient>
 <linearGradient id="sz-spec" x1="0" x2="1"><stop offset="0" stop-color="#7B3FC4"/><stop offset=".17" stop-color="#3A5BD9"/><stop offset=".34" stop-color="#2FA6C9"/><stop offset=".5" stop-color="#4DB548"/><stop offset=".67" stop-color="#F2D23A"/><stop offset=".84" stop-color="#F28A2E"/><stop offset="1" stop-color="#D93A2B"/></linearGradient></defs>
 ${Array.from({length:70},(_,i)=>{const x=(i*137.5)%1000,y=(i*71.3)%460;return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${i%7?0.9:1.6}" fill="#fff" opacity="${i%3?.35:.7}"/>`;}).join("")}
 <circle cx="-120" cy="230" r="360" fill="url(#sz-sun)"/>
 <circle cx="-120" cy="230" r="250" fill="#FBD06A"/>
 ${[150,190,230,270,310].map((y,i)=>`<path d="M250 ${y} L 760 ${200+i*15}" stroke="#FCE3A1" stroke-width="2" stroke-dasharray="2 10" opacity=".75"/>`).join("")}
 <circle cx="830" cy="230" r="58" fill="#7FB8E6" opacity=".25"/>
 <circle cx="830" cy="230" r="48" fill="#2B6CB0"/>
 <path d="M800 200c14-8 30-6 38 4c-6 10-22 12-30 24c-10-4-14-18-8-28zM838 246c12 2 22 10 24 22c-12 6-28 2-34-8c2-6 4-12 10-14z" fill="#4E9A54"/>
 <path d="M830 182a48 48 0 0 1 0 96a62 62 0 0 0 0-96z" fill="#0B1020" opacity=".55"/>
 <rect x="808" y="208" width="10" height="10" fill="none" stroke="#fff" stroke-width="1.5"/>
 <rect x="300" y="404" width="400" height="12" fill="url(#sz-spec)"/>
 <text x="300" y="440" class="sz-cap">radio ← longer waves</text><text x="700" y="440" class="sz-cap" text-anchor="end">shorter waves → gamma</text>`;
const earth=()=>`<g transform="translate(0 -70)">
 <defs><radialGradient id="sz-core" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFE7A3"/><stop offset="1" stop-color="#F1A33A"/></radialGradient></defs>
 <circle cx="500" cy="520" r="430" fill="#2B6CB0"/>
 <path d="M140 300c60-40 140-60 200-40c40 14 80-6 120-26c70-34 150-20 210 20c40 26 120 10 190 40l40 70H100z" fill="#4E9A54" opacity=".9"/>
 <path d="M500 520 L 500 90 A 430 430 0 0 1 930 520 Z" fill="#0B1020"/>
 <path d="M500 520 L 500 90 A 430 430 0 0 1 930 520 Z" fill="#7A4A2E"/>
 <path d="M500 520 L 500 112 A 408 408 0 0 1 908 520 Z" fill="#C2552A"/>
 <path d="M500 520 L 500 290 A 230 230 0 0 1 730 520 Z" fill="#E8903A"/>
 <path d="M500 520 L 500 395 A 125 125 0 0 1 625 520 Z" fill="url(#sz-core)"/>
 ${[[640,240],[760,330],[560,200]].map(([x,y])=>`<path d="M${x} ${y} a38 38 0 1 1 30 46" fill="none" stroke="#FFD2A8" stroke-width="2.4" marker-end="url(#sz-arr)" opacity=".85"/>`).join("")}
 <defs><marker id="sz-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#FFD2A8"/></marker></defs>
 <g class="sz-lab"><text x="995" y="190" text-anchor="end">Crust</text><path d="M995 198H782"/><text x="995" y="280" text-anchor="end">Mantle</text><path d="M995 288H800"/><text x="995" y="420" text-anchor="end">Outer core</text><path d="M995 428H690"/><text x="640" y="508">Inner core</text></g>
 <rect x="232" y="252" width="10" height="10" fill="none" stroke="#fff" stroke-width="1.5"/></g>`;
const cell=()=>`
 <defs><radialGradient id="sz-cyto" cx="45%" cy="45%" r="60%"><stop offset="0" stop-color="#E4F3E1"/><stop offset="1" stop-color="#A9D6A2"/></radialGradient></defs>
 <path d="M500 40c180 0 330 70 340 190c10 120-150 200-330 200c-190 0-350-60-350-190C160 110 320 40 500 40z" fill="url(#sz-cyto)" stroke="#2E6B3A" stroke-width="5"/>
 <circle cx="470" cy="220" r="86" fill="#7A6BB8" opacity=".9"/><circle cx="470" cy="220" r="86" fill="none" stroke="#3F3473" stroke-width="3" stroke-dasharray="10 5"/><circle cx="488" cy="206" r="26" fill="#3F3473"/>
 ${[[300,150,-20],[660,140,25],[690,300,-10],[320,320,15],[580,360,40]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="40" ry="20" fill="#E58A4A" stroke="#9C4A1F" stroke-width="2.5"/><path d="M-30 0c8-12 14 12 22 0s14 12 22 0s12 10 16 0" fill="none" stroke="#9C4A1F" stroke-width="2"/></g>`).join("")}
 ${[[380,100],[600,90],[730,220],[250,240],[420,380]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="#5BA8E0" opacity=".8"/>`).join("")}
 <path d="M560 290c30 10 60 10 90-6M570 312c30 10 60 8 92-8M580 334c28 8 54 6 84-8" fill="none" stroke="#2E6B3A" stroke-width="3" opacity=".6"/>
 <g class="sz-lab"><text x="870" y="120">Cell membrane</text><path d="M865 116H828"/><text x="560" y="40">Nucleus</text><path d="M555 46L510 150"/><text x="870" y="400">Mitochondria</text><path d="M865 396L605 362"/></g>
 <rect x="826" y="232" width="10" height="10" fill="none" stroke="#fff" stroke-width="1.5"/>`;
const matter=()=>{
 const r=s=>{let t=s;return()=>{t=(t*16807)%2147483647;return t/2147483647;};},R=r(7),out=[];
 const water=(x,y,a)=>`<g transform="translate(${x} ${y}) rotate(${a})"><circle r="17" fill="#E2483A"/><circle cx="-15" cy="13" r="9.5" fill="#F1F4F8"/><circle cx="15" cy="13" r="9.5" fill="#F1F4F8"/></g>`;
 for(let i=0;i<5;i++)for(let j=0;j<4;j++){const x=110+i*70+(j%2)*35,y=110+j*80;out.push(water(x,y,(i+j)%2?180:0));}
 const placed=[];let tries=0;
 while(placed.length<16&&tries++<3000){const x=545+R()*200,y=95+R()*290;if(placed.every(([a,b])=>Math.hypot(a-x,b-y)>44)){placed.push([x,y]);out.push(water(x,y,R()*360));}}
 for(let k=0;k<4;k++){out.push(water(800+R()*150,80+R()*320,R()*360));}
 return `${out.join("")}
 <path d="M90 64H460M90 412H460" stroke="#9FD0F5" stroke-width="1.5" opacity=".6"/>
 <g class="sz-lab"><text x="275" y="448" text-anchor="middle">Solid (ice)</text><text x="645" y="448" text-anchor="middle">Liquid</text><text x="875" y="448" text-anchor="middle">Gas</text></g>
 <text x="275" y="46" class="sz-cap" text-anchor="middle">Each ball group is one water particle: one oxygen, two hydrogen</text>`;};
const SCENE={light:sun,earth,cells:cell,matter};

/* ---------- page ---------- */
function statusText(u){return u.status==="now"?"We're here now":u.status==="done"?"Finished":u.status==="next"?"Up next":u.when?("Starts "+u.when.split(" to ")[0]):"Coming up";}
function render(el,{go}){
  const now=LEVELS.find(L=>unit(L.id).status==="now"),skills=unit("skills");
  el.innerHTML=`<div class="sz">
   <header class="sz-hero"><p class="sz-kick">Mr. Mangles' Class · Grade 8 Science · 2026–27</p>
    <h1>From the Sun<br>to a single particle</h1>
    <p class="sz-lede">This year we zoom in, one unit at a time. We start out in space and end inside a drop of water. Scroll down through the year, or jump to where we are.</p>
    ${now?`<a class="sz-btn" href="#${now.id}" data-go="${now.id}">Go to ${esc(unit(now.id).name)} &rarr;</a>`:""}
    <a class="sz-btn sz-ghost" href="#overview" data-go="overview">Course map</a><a class="sz-btn sz-ghost" href="#resources" data-go="resources">Resource Library</a><a class="sz-btn sz-ghost" href="labs.html">Interactive Labs</a></header>
   <ol class="sz-levels">${LEVELS.map((L,i)=>{const u=unit(L.id),n=(u.lessons||[]).length,here=u.status==="now";
    return `<li class="sz-level s-${esc(u.status||"soon")}" style="--tint:${L.tint}" id="zoom-${L.id}">
     <div class="sz-ruler" aria-hidden="true"><b>${L.exp}</b><span>${esc(L.scale)}</span><i>${esc(L.what)}</i></div>
     <a class="sz-card" href="#${L.id}" data-go="${L.id}" aria-label="Unit ${esc(u.n)}: ${esc(u.name)}. ${esc(statusText(u))}.">
      <svg viewBox="0 0 1000 460" role="img" aria-hidden="true" focusable="false">${SCENE[L.id]()}</svg>
      <div class="sz-text">
       <p class="sz-unit">Unit ${esc(u.n)} <span class="sz-stat">${here?'<span class="sz-pin">●</span> ':""}${esc(statusText(u))}</span></p>
       <h2>${esc(u.name)}</h2><p class="sz-q">${esc(L.q)}</p>
       <p class="sz-meta">${esc(u.when||"")}${n?` · ${n} lessons`:""}</p><span class="sz-open">Open unit &rarr;</span></div></a>
     ${L.into?`<p class="sz-into" aria-hidden="true">Zoom into the small square · ${esc(L.into)}</p>`:""}</li>`;}).join("")}</ol>
   <a class="sz-skills" href="#skills" data-go="skills"><span class="sz-unit">Unit ${esc(skills.n)} · ${esc(statusText(skills))}</span><b>${esc(skills.name||"Science Skills")}</b><span>Measuring, fair tests, graphs and evidence: the tools we use at every level.</span><span class="sz-open">Open &rarr;</span></a>
   <p class="sz-note">Sizes on the ruler are rounded real values. The drawings are simplified, and the parts inside each one are not to scale.</p></div>`;
  el.querySelectorAll("[data-go]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.dataset.go);}));
}
H.home=render;
})();
