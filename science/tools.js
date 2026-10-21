/* Science tools: Cells unit panel (Cell Explorer diagram, Part & Role matching, Organelle Rush game)
   and Metric Converter practice (Science Skills unit). */
(function(){
  const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const ORG = {
    wall:{name:"Cell wall",job:"Thick, rigid outer wall that supports the cell so the plant can stay upright. Made of cellulose.",plant:true},
    membrane:{name:"Cell membrane",job:"Thin, flexible layer that controls what moves into and out of the cell. It's selectively permeable."},
    cytoplasm:{name:"Cytoplasm",job:"Jelly-like fluid, mostly water, that fills the space between the membrane and the nucleus."},
    nucleus:{name:"Nucleus",job:"The control centre. It holds the DNA, the instructions for everything the cell does."},
    mito:{name:"Mitochondria",job:"The powerhouse. Turns sugar into usable energy (ATP) through cellular respiration."},
    chloro:{name:"Chloroplast",job:"Where photosynthesis happens: sunlight energy becomes chemical energy. Contains green chlorophyll.",plant:true},
    vacuole:{name:"Vacuole",job:"Storage for water, nutrients and wastes. Plant cells have one big one; animal cells have many small ones."},
    er:{name:"Endoplasmic reticulum",job:"Folded membranes attached to the nucleus. Builds proteins and moves materials around the cell."},
    golgi:{name:"Golgi apparatus",job:"The post office. Packs and ships materials. Unlike the ER, it sits on its own."}
  };
  /* ---------- Detailed cell diagrams, drawn in SVG so every part stays clickable ---------- */
  function rng(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
  const f1 = n => Math.round(n*10)/10;

  function defs(p, plant){ return `<defs>
    <radialGradient id="${p}cyto" cx="45%" cy="40%" r="75%"><stop offset="0" stop-color="${plant?"#F5FAEE":"#FFF7F0"}"/><stop offset="1" stop-color="${plant?"#E2EED2":"#F5DFCD"}"/></radialGradient>
    <radialGradient id="${p}nuc" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ECE3F7"/><stop offset=".7" stop-color="#CDBBE6"/><stop offset="1" stop-color="#AE94D4"/></radialGradient>
    <radialGradient id="${p}nucl" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#9A79C9"/><stop offset="1" stop-color="#5A3B8C"/></radialGradient>
    <radialGradient id="${p}vac" cx="40%" cy="30%" r="85%"><stop offset="0" stop-color="#EEF8FE"/><stop offset=".7" stop-color="#C9E5F5"/><stop offset="1" stop-color="#9ECBE6"/></radialGradient>
    <linearGradient id="${p}mito" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FCCCA6"/><stop offset="1" stop-color="#E88E58"/></linearGradient>
    <linearGradient id="${p}chl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FD585"/><stop offset="1" stop-color="#5FA84A"/></linearGradient>
    <linearGradient id="${p}gol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8E08F"/><stop offset="1" stop-color="#E0B445"/></linearGradient>
    <pattern id="${p}fib" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><rect width="12" height="12" fill="#BCDB93"/><path d="M0 3h12M0 8.5h12" stroke="#9CC371" stroke-width="1.5"/></pattern>
    <filter id="${p}soft" x="-15%" y="-15%" width="130%" height="130%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.6" flood-color="#2A2A40" flood-opacity=".22"/></filter>
  </defs>`; }

  function mito(p,x,y,r,L=62,W=28){
    const hl=L/2, hw=W/2, il=hl-4, ih=hw-4, n=6, span=2*il-1.3*ih;
    let cr=""; for(let i=0;i<n;i++){ const cx=-il+0.65*ih+(i+0.5)*span/n, s=i%2?1:-1;
      cr+=`<path d="M${f1(cx-3)} ${f1(s*ih)} L${f1(cx-3)} ${f1(-s*ih*0.2)} Q${f1(cx)} ${f1(-s*ih*0.55)} ${f1(cx+3)} ${f1(-s*ih*0.2)} L${f1(cx+3)} ${f1(s*ih)}"/>`; }
    return `<g data-o="mito" class="org" transform="translate(${x} ${y}) rotate(${r})" filter="url(#${p}soft)">
      <rect x="${-hl}" y="${-hw}" width="${L}" height="${W}" rx="${hw}" fill="url(#${p}mito)" stroke="#B05C2B" stroke-width="2"/>
      <rect x="${-il}" y="${-ih}" width="${2*il}" height="${2*ih}" rx="${ih}" fill="#FDE6D4" stroke="#C8703C" stroke-width="1.5"/>
      <g fill="#F2AE80" stroke="#C8703C" stroke-width="1.3" stroke-linejoin="round">${cr}</g></g>`;
  }

  function chloro(p,x,y,r,L=80,W=36){
    const a=L/2, b=W/2; let g="";
    [-0.55,-0.2,0.15,0.5].forEach((t,i)=>{ const gx=t*a, n=i%2?4:5, h=4, gy=-(n*h)/2+(i%2?3:-2);
      for(let k=0;k<n;k++) g+=`<rect x="${f1(gx-7)}" y="${f1(gy+k*h)}" width="14" height="3.3" rx="1.6" fill="#3E8E39" stroke="#2A6627" stroke-width=".6"/>`; });
    const lam=`<path d="M${f1(-a*0.78)} -1 C ${f1(-a*0.3)} -7, ${f1(a*0.1)} 6, ${f1(a*0.78)} 0" fill="none" stroke="#56A24C" stroke-width="1.4"/><path d="M${f1(-a*0.62)} 6 C ${f1(-a*0.2)} 2, ${f1(a*0.2)} 10, ${f1(a*0.62)} 5" fill="none" stroke="#56A24C" stroke-width="1.2"/>`;
    return `<g data-o="chloro" class="org" transform="translate(${x} ${y}) rotate(${r})" filter="url(#${p}soft)">
      <ellipse rx="${a}" ry="${b}" fill="url(#${p}chl)" stroke="#367730" stroke-width="2"/>
      <ellipse rx="${a-3.5}" ry="${b-3.5}" fill="#CDE9B6" stroke="#5E9F4E" stroke-width="1.2"/>${lam}${g}</g>`;
  }

  function nucleus(p,x,y,rx,ry,R){
    let pores=""; for(let i=0;i<16;i++){ const t=i/16*Math.PI*2+0.2; pores+=`<circle cx="${f1(x+Math.cos(t)*(rx-2.5))}" cy="${f1(y+Math.sin(t)*(ry-2.5))}" r="2.5" fill="#F1EAF9"/>`; }
    let chrom=""; for(let i=0;i<11;i++){ const t=R()*6.283, d=0.15+R()*0.5, cx=x+Math.cos(t)*rx*d, cy=y+Math.sin(t)*ry*d;
      chrom+=`<path d="M${f1(cx)} ${f1(cy)} q ${f1(R()*14-7)} ${f1(R()*14-7)} ${f1(R()*18-9)} ${f1(R()*18-9)} t ${f1(R()*18-9)} ${f1(R()*18-9)}"/>`; }
    return `<g data-o="nucleus" class="org" filter="url(#${p}soft)">
      <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#9677C3" stroke="#563A88" stroke-width="2"/>
      <ellipse cx="${x}" cy="${y}" rx="${rx-5}" ry="${ry-5}" fill="url(#${p}nuc)" stroke="#6B4F9E" stroke-width="1.3"/>${pores}
      <g fill="none" stroke="#9479BF" stroke-width="2" stroke-linecap="round" opacity=".75">${chrom}</g>
      <ellipse cx="${f1(x+rx*0.16)}" cy="${f1(y-ry*0.12)}" rx="${f1(rx*0.29)}" ry="${f1(ry*0.26)}" fill="url(#${p}nucl)"/>
      <ellipse cx="${f1(x+rx*0.1)}" cy="${f1(y-ry*0.2)}" rx="${f1(rx*0.09)}" ry="${f1(ry*0.06)}" fill="#fff" opacity=".35"/></g>`;
  }

  /* Rough ER: flattened sacs wrapped around the nucleus, studded with ribosomes, joined to the envelope.
     Smooth ER: a few bare tubes nearby. Both are the same clickable part. */
  function er(x,y,rx,ry,a0,a1,smooth){
    const N=36, pts=(d,ph)=>{ const out=[]; for(let i=0;i<=N;i++){ const t=a0+(a1-a0)*i/N, w=Math.sin(i/N*Math.PI*5+ph)*3; out.push([x+Math.cos(t)*(rx+d+w), y+Math.sin(t)*(ry+d+w), t]); } return out; };
    const line=a=>"M"+a.map(q=>f1(q[0])+" "+f1(q[1])).join(" L");
    let sacs="", ribo="", hit="";
    [14,29,44,59].forEach((d,k)=>{ const a=pts(d,k*1.3), dd=line(a);
      sacs+=`<path d="${dd}" stroke="#AD5D88" stroke-width="10"/><path d="${dd}" stroke="#F5C9DF" stroke-width="6.4"/>`;
      hit+=`<path d="${dd}" stroke="transparent" stroke-width="18"/>`;
      a.forEach((q,i)=>{ if(i%2) return; [-6.6,6.6].forEach(o=>{ ribo+=`<circle cx="${f1(q[0]+Math.cos(q[2])*o)}" cy="${f1(q[1]+Math.sin(q[2])*o)}" r="1.75"/>`; }); }); });
    let con=""; [a0+0.12,(a0+a1)/2,a1-0.12].forEach(t=>{ con+=`<path d="M${f1(x+Math.cos(t)*(rx-1))} ${f1(y+Math.sin(t)*(ry-1))} L${f1(x+Math.cos(t)*(rx+15))} ${f1(y+Math.sin(t)*(ry+15))}" stroke="#AD5D88" stroke-width="6"/>`; });
    let sm=""; (smooth||[]).forEach(d=>{ sm+=`<path d="${d}" stroke="#AD5D88" stroke-width="9"/><path d="${d}" stroke="#F5C9DF" stroke-width="5.6"/>`; hit+=`<path d="${d}" stroke="transparent" stroke-width="18"/>`; });
    return `<g data-o="er" class="org" fill="none" stroke-linecap="round" stroke-linejoin="round">${hit}${con}${sacs}${sm}<g fill="#76385F" stroke="none">${ribo}</g></g>`;
  }

  function golgi(p,x,y,r){
    let s=""; [78,72,64,56,46].forEach((w,i)=>{ const yy=i*11-22, d=`M${-w/2} ${yy} Q 0 ${yy-18} ${w/2} ${yy}`;
      s+=`<path d="${d}" stroke="#B0841A" stroke-width="9"/><path d="${d}" stroke="url(#${p}gol)" stroke-width="5.4"/>`;
      s+=`<circle cx="${f1(w/2+6)}" cy="${f1(yy+2)}" r="3.6" fill="#F4D47C" stroke="#B0841A" stroke-width="1.2"/>`;
      if(i%2===0) s+=`<circle cx="${f1(-w/2-6)}" cy="${f1(yy+2)}" r="3.2" fill="#F4D47C" stroke="#B0841A" stroke-width="1.2"/>`; });
    const ves=[[-12,36,4],[12,41,3.5],[46,30,4.2],[-46,26,3.6],[28,-38,3.4]].map(v=>`<circle cx="${v[0]}" cy="${v[1]}" r="${v[2]}" fill="#F4D47C" stroke="#B0841A" stroke-width="1.2"/>`).join("");
    return `<g data-o="golgi" class="org" transform="translate(${x} ${y}) rotate(${r})" fill="none" stroke-linecap="round" filter="url(#${p}soft)"><rect x="-56" y="-46" width="112" height="94" fill="transparent" stroke="none"/>${s}${ves}</g>`;
  }

  function smallVac(p,x,y,r){ return `<g data-o="vacuole" class="org" filter="url(#${p}soft)"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${p}vac)" stroke="#5E9CC2" stroke-width="2"/><ellipse cx="${f1(x-r*0.3)}" cy="${f1(y-r*0.35)}" rx="${f1(r*0.38)}" ry="${f1(r*0.2)}" fill="#fff" opacity=".6"/></g>`; }

  function dots(R,n,inside){ let s=""; for(let i=0;i<n;){ const x=40+R()*720, y=30+R()*500; if(!inside(x,y)) continue; s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.5"/>`; i++; } return s; }

  const PINS = {
    plant:{wall:[33,300],membrane:[750,302],cytoplasm:[318,82],vacuole:[520,280],nucleus:[140,312],er:[287,292],golgi:[110,447],mito:[100,120],chloro:[420,78]},
    animal:{membrane:[54,330],cytoplasm:[612,186],nucleus:[365,292],er:[395,150],golgi:[630,343],mito:[165,175],vacuole:[110,290]}
  };
  function pins(type,sc){ sc=sc||1; const order=Object.keys(ORG).filter(k=>type==="plant"||!ORG[k].plant);
    return `<g class="pins" pointer-events="none">${order.map((k,i)=>{ const [x,y]=PINS[type][k]; return `<g><circle cx="${x}" cy="${y}" r="${f1(13*sc)}" fill="#202126" stroke="#fff" stroke-width="2.5"/><text x="${x}" y="${f1(y+5*sc)}" text-anchor="middle" font-size="${f1(14*sc)}" font-weight="700" fill="#fff" font-family="Inter,system-ui,sans-serif">${i+1}</text></g>`; }).join("")}</g>`; }

  function plantSVG(){
    const p="pc", R=rng(11);
    const outer="M58 22 H742 Q778 22 778 58 V502 Q778 538 742 538 H58 Q22 538 22 502 V58 Q22 22 58 22 Z";
    const inner="M60 44 H740 Q756 44 756 60 V500 Q756 516 740 516 H60 Q44 516 44 500 V60 Q44 44 60 44 Z";
    const mem="M64 50 H736 Q750 50 750 64 V496 Q750 510 736 510 H64 Q50 510 50 496 V64 Q50 50 64 50 Z";
    const vac="M346 120 C 430 92, 600 96, 664 126 C 700 146, 694 250, 688 330 C 682 410, 636 452, 540 452 C 450 452, 374 446, 350 402 C 328 358, 332 300, 337 240 C 341 190, 322 140, 346 120 Z";
    let s=`<svg viewBox="0 0 800 560" role="img" aria-label="Plant cell diagram" style="width:100%;height:auto;display:block">${defs(p,true)}`;
    s+=`<g data-o="wall" class="org"><path d="${inner}" fill="#EDF5E1"/><path d="${outer} ${inner}" fill-rule="evenodd" fill="url(#${p}fib)" stroke="#7FA55A" stroke-width="1.6"/></g>`;
    s+=`<g data-o="cytoplasm" class="org"><path d="${mem}" fill="url(#${p}cyto)"/><g fill="#8DA57E" opacity=".75">${dots(R,190,(x,y)=>x>58&&x<742&&y>58&&y<502)}</g></g>`;
    s+=`<g data-o="membrane" class="org" fill="none"><path d="${mem}" stroke="transparent" stroke-width="16"/><path d="${mem}" stroke="#2F7A4C" stroke-width="4.5"/><path d="${mem}" stroke="#B8E2C6" stroke-width="1.6"/></g>`;
    s+=`<g data-o="vacuole" class="org" filter="url(#${p}soft)"><path d="${vac}" fill="url(#${p}vac)" stroke="#5E9CC2" stroke-width="3"/><ellipse cx="450" cy="168" rx="78" ry="24" transform="rotate(-8 450 168)" fill="#fff" opacity=".5"/><ellipse cx="610" cy="400" rx="30" ry="9" transform="rotate(-30 610 400)" fill="#fff" opacity=".35"/></g>`;
    s+=er(170,290,78,72,-1.25,1.25,["M214 440 C 232 424, 250 452, 268 436 S 300 450, 296 470","M222 470 C 240 458, 258 486, 278 474","M200 418 C 214 404, 236 410, 244 398"]);
    s+=nucleus(p,170,290,78,72,R);
    s+=golgi(p,112,456,0);
    s+=mito(p,100,120,25)+mito(p,255,104,-15)+mito(p,330,488,5)+mito(p,690,490,-4)+mito(p,726,276,90);
    s+=chloro(p,180,80,0)+chloro(p,420,78,0)+chloro(p,590,75,4)+chloro(p,728,190,88)+chloro(p,728,362,92)+chloro(p,480,487,0)+chloro(p,606,488,-3);
    return s;
  }

  function animalSVG(){
    const p="ac", R=rng(23);
    const mem="M120 110 C 220 30, 520 20, 650 80 C 760 130, 790 260, 740 370 C 690 480, 540 535, 380 530 C 220 525, 90 470, 50 360 C 15 260, 40 170, 120 110 Z";
    let s=`<svg viewBox="0 0 800 560" role="img" aria-label="Animal cell diagram" style="width:100%;height:auto;display:block">${defs(p,false)}`;
    s+=`<g data-o="cytoplasm" class="org"><path d="${mem}" fill="url(#${p}cyto)"/><g fill="#B39A88" opacity=".75">${dots(R,170,(x,y)=>((x-405)/325)**2+((y-282)/218)**2<1)}</g></g>`;
    s+=`<g data-o="membrane" class="org" fill="none"><path d="${mem}" stroke="transparent" stroke-width="22"/><path d="${mem}" stroke="#5EA582" stroke-width="11"/><path d="${mem}" stroke="#DDF1E5" stroke-width="4.5"/><path d="${mem}" stroke="#2F7A54" stroke-width="4.2" stroke-dasharray="0 8.5" stroke-linecap="round"/></g>`;
    s+=smallVac(p,110,290,20)+smallVac(p,712,322,16)+smallVac(p,360,482,17)+smallVac(p,480,92,13)+smallVac(p,255,150,14);
    s+=er(395,275,92,84,-2.6,0.3,["M262 410 C 280 392, 300 420, 318 402 S 350 414, 352 436","M276 440 C 296 428, 314 458, 336 448","M248 386 C 262 372, 284 380, 292 366"]);
    s+=nucleus(p,395,275,92,84,R);
    s+=golgi(p,630,345,-18);
    s+=mito(p,165,175,35)+mito(p,560,126,12)+mito(p,682,228,75)+mito(p,180,402,-25)+mito(p,478,470,5)+mito(p,600,452,-30);
    return s;
  }
  function cellSVG(type,showPins,k){ return (type==="plant"?plantSVG():animalSVG())+(showPins?pins(type,k):"")+`</svg>`; }

  const NICK = {nucleus:"the “brain” of the cell", mito:"the “powerhouse of the cell”", golgi:"the “post office” of the cell", vacuole:"the “storage unit” of the cell"};

  window.HUB.tools = window.HUB.tools || {};
  function explorer(el){
    let type="plant", mode="explore", labels=false, sel=null, target=null, score=0, tries=0;
    el.innerHTML = `<div class="eyebrow">Interactive diagram</div><h2>Cell Explorer</h2>
      <div class="cx-row" id="cellctl" style="margin:10px 0 12px">
        <span class="cx-seg"><button id="t-plant">Plant cell</button><button id="t-animal">Animal cell</button></span>
        <span class="cx-seg"><button id="m-explore">Explore</button><button id="m-quiz">Quiz</button></span>
        <button class="cx-toggle" id="m-labels" aria-pressed="false"><span></span>Labels</button>
      </div>
      <div id="cellbox"></div><div id="legend"></div><div id="cellinfo" aria-live="polite" style="min-height:96px;margin-top:12px"></div>
      <style>
        .cx-seg{display:inline-flex;padding:3px;background:var(--soft);border-radius:980px}
        .cx-seg button{border:0;background:none;padding:6px 13px;border-radius:980px;font-size:14.5px;font-weight:600;color:var(--muted);cursor:pointer;white-space:nowrap}
        #cellctl .cx-seg button.seg-on{background:var(--paper);color:var(--ink);border:0;box-shadow:0 1px 3px rgba(20,20,40,.14)}
        .cx-toggle{display:inline-flex;align-items:center;gap:7px;border:0;background:none;font-size:14.5px;font-weight:600;color:var(--muted);cursor:pointer;padding:6px 4px}
        .cx-toggle span{width:30px;height:18px;border-radius:9px;background:var(--rule);position:relative;transition:background .15s}
        .cx-toggle span::after{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:left .15s}
        .cx-toggle[aria-pressed="true"]{color:var(--ink)}
        .cx-toggle[aria-pressed="true"] span{background:var(--accent)}
        .cx-toggle[aria-pressed="true"] span::after{left:14px}
        #cellbox{border-radius:12px;overflow:hidden;background:var(--paper)}
        #cellbox .org{cursor:pointer;transition:opacity .2s,filter .15s}
        #cellbox .org:hover{filter:brightness(1.05) drop-shadow(0 0 3px rgba(89,104,232,.75))}
        #cellbox svg.has-sel .org:not(.on){opacity:.4}
        #cellbox .org.on{filter:drop-shadow(0 0 2px #fff) drop-shadow(0 0 7px var(--accent))}
        #legend ol{list-style:none;margin:10px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:4px 14px;font-size:15px}
        #legend li{display:flex;gap:8px;align-items:center}
        #legend b{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#202126;color:#fff;font-size:12px;flex:none}
        #legend button{background:none;border:0;padding:2px 0;cursor:pointer;text-align:left;font-size:15px}
        #legend button:hover{text-decoration:underline}
        @media (prefers-reduced-motion:reduce){#cellbox .org{transition:none}}
      </style>`;
    const box=el.querySelector("#cellbox"), info=el.querySelector("#cellinfo"), legend=el.querySelector("#legend");
    const present=()=>Object.keys(ORG).filter(k=>type==="plant"||!ORG[k].plant);
    function newTarget(){ const list=present().filter(k=>k!==target); target=list[Math.floor(Math.random()*list.length)]; }
    function draw(){
      const w=box.clientWidth||480, k=Math.max(1,Math.min(1.7,(800/w)*0.55));
      box.innerHTML=cellSVG(type, mode==="explore"&&labels, k);
      const svg=box.querySelector("svg");
      ["plant","animal"].forEach(t=>el.querySelector("#t-"+t).classList.toggle("seg-on",type===t));
      el.querySelector("#m-explore").classList.toggle("seg-on",mode==="explore");
      el.querySelector("#m-quiz").classList.toggle("seg-on",mode==="quiz");
      const lb=el.querySelector("#m-labels"); lb.hidden=mode!=="explore"; lb.setAttribute("aria-pressed",String(labels));
      box.querySelectorAll(".org").forEach(g=>{
        g.addEventListener("click",ev=>{ev.stopPropagation(); pick(g.dataset.o);});
        if(sel&&g.dataset.o===sel&&mode==="explore") g.classList.add("on");
      });
      svg.classList.toggle("has-sel",!!sel&&mode==="explore");
      legend.innerHTML = mode==="explore"&&labels ? `<ol>${present().map((k,i)=>`<li><b>${i+1}</b><button data-k="${k}">${esc(ORG[k].name)}</button></li>`).join("")}</ol>` : "";
      legend.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>pick(b.dataset.k));
      showInfo();
    }
    function pick(o){
      if(mode==="explore"){ sel = sel===o ? null : o; draw(); return; }
      tries++; const ok=o===target; if(ok) score++;
      info.innerHTML=`<p style="margin:0;font-weight:700;color:${ok?"var(--good)":"var(--bad)"}">${ok?"Correct!":"That's the "+esc(ORG[o].name.toLowerCase())+"."}</p>
        <p style="margin:4px 0 0"><b>${esc(ORG[target].name)}:</b> ${esc(JOB[target])}</p>
        <p class="note" style="margin:8px 0 0">Score ${score} of ${tries} · <button class="btn ghost" id="nextq" style="padding:5px 12px">Next</button></p>`;
      el.querySelector("#nextq").onclick=()=>{newTarget(); showInfo();};
    }
    function showInfo(){
      if(mode==="quiz"){ if(!target||!present().includes(target)) newTarget();
        info.innerHTML=`<p style="margin:0" class="note">Click the part of the ${type} cell that is the…</p><p style="margin:2px 0 0;font-family:var(--f-title);font-size:26px;font-weight:700">${esc(ORG[target].name)}</p><p class="note" style="margin:6px 0 0">Score ${score} of ${tries}</p>`; return; }
      if(!sel){ info.innerHTML=`<p class="note" style="margin:0">Click any part of the cell to see what it is and what it does. ${type==="plant"?"A plant":"An animal"} cell has ${present().length} major organelles.${labels?"":" Turn on Labels to number them."}</p>`; return; }
      info.innerHTML=`<p style="margin:0;font-family:var(--f-title);font-size:24px;font-weight:700">${esc(ORG[sel].name)}</p><p style="margin:4px 0 0">${esc(JOB[sel])}</p>${NICK[sel]?`<p class="note" style="margin:6px 0 0">Nickname: ${esc(NICK[sel])}.</p>`:""}${ORG[sel].plant?`<p class="note" style="margin:6px 0 0">Found in plant cells, not animal cells.</p>`:""}`;
    }
    el.querySelector("#t-plant").onclick=()=>{type="plant";sel=null;draw();};
    el.querySelector("#t-animal").onclick=()=>{type="animal";sel=null;if(ORG[target]&&ORG[target].plant)target=null;draw();};
    el.querySelector("#m-explore").onclick=()=>{mode="explore";draw();};
    el.querySelector("#m-labels").onclick=()=>{mode="explore";labels=!labels;draw();};
    el.querySelector("#m-quiz").onclick=()=>{mode="quiz";sel=null;target=null;score=0;tries=0;draw();};
    draw();
  }

  /* Wording below follows the Cells booklet, Topic 1 (Parts of a Cell). */
  const JOB = {
    wall:"Thick, rigid wall around the cell that adds structural support.",
    membrane:"Thin, flexible, protective layer that controls what moves into and out of the cell.",
    cytoplasm:"Jelly-like fluid (mostly water) between the cell membrane and the nucleus.",
    nucleus:"The control centre that directs all of the cell's activities. Holds the DNA.",
    mito:"Bean-shaped organelle that converts sugars into a usable form of energy.",
    chloro:"Structure where photosynthesis takes place.",
    vacuole:"Balloon-like storage space for water, nutrients and wastes.",
    er:"Folded membranes found near the nucleus that help build proteins.",
    golgi:"Packs and transports materials around the cell."
  };
  const CLUES = {
    wall:["Thick, rigid wall around the cell that adds structural support.","In plants it's made of cellulose. In fungi it's made of chitin.","Lets a plant stay upright against gravity, since plants can't move.","Found in plants and fungi, but never in animal cells."],
    membrane:["Controls the movement of substances into and out of the cell.","It is selectively permeable: it lets only some things through.","Made mostly of phospholipids arranged in two rows.","The thin, flexible layer every cell has around it, plant or animal."],
    cytoplasm:["Jelly-like fluid, mostly water, between the cell membrane and the nucleus.","Older diagrams sometimes call it the cytosol."],
    nucleus:["The control centre that directs all of the cell's activities.","Nicknamed the “brain” of the cell.","Contains DNA, the instructions for everything the cell does.","Has its own membrane called the nuclear envelope.","Often looks like a “cell within the cell.”"],
    mito:["Converts sugars into a usable form of energy (ATP).","Nicknamed the “powerhouse of the cell.”","Where cellular respiration happens.","A bean-shaped organelle that needs oxygen and nutrients to make energy."],
    chloro:["Where photosynthesis takes place.","Contains the green pigment chlorophyll.","Converts sunlight energy into chemical energy.","Only works well with enough light, water and carbon dioxide."],
    vacuole:["Balloon-like storage space for water, nutrients and wastes.","Nicknamed the “storage unit” of the cell.","Plant cells have one large one. Animal cells have many small ones.","In plant cells, the big one helps support the cell's shape."],
    er:["Folded membranes found near the nucleus.","Connected, or nearly connected, to the nucleus.","Helps build proteins and move materials around the cell."],
    golgi:["Packs and transports materials around the cell.","Nicknamed the “post office” of the cell.","Looks a lot like the ER in diagrams, but sits on its own."]
  };
  const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
  const store = { get(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } },
                  set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} } };
  const mmss = s => Math.floor(s/60)+":"+String(s%60).padStart(2,"0");

  /* Part & Role: tap a part, then tap its job */
  function matcher(el){
    let type="plant", pairs, jobs, picked=null, done, misses, start, timer=null, flash=null, bestMsg="";
    function reset(){
      const keys=Object.keys(ORG).filter(k=>type==="plant"||!ORG[k].plant);
      pairs=shuffle(keys); jobs=shuffle(keys); picked=null; done=new Set(); misses=0; start=Date.now(); flash=null; bestMsg="";
      clearInterval(timer); timer=setInterval(()=>{ if(!document.body.contains(el)){clearInterval(timer);return;} const t=el.querySelector("#mt-clock"); if(t&&done.size<pairs.length) t.textContent=mmss(Math.round((Date.now()-start)/1000)); },1000);
      draw();
    }
    function draw(){
      const secs=Math.round((Date.now()-start)/1000), finished=done.size===pairs.length;
      el.innerHTML=`<div class="eyebrow">Matching</div><h2>Part &amp; Role</h2>
        <p class="note" style="margin:4px 0 12px">Tap a cell part, then tap the job it does. Wording is the same as your booklet.</p>
        <div class="cx-row"><button class="btn ghost ${type==="plant"?"seg-on":""}" data-t="plant">Plant cell · 9</button><button class="btn ghost ${type==="animal"?"seg-on":""}" data-t="animal">Animal cell · 7</button>
          <span style="flex:1"></span><span class="cx-stat"><b id="mt-clock">${mmss(finished?flash:secs)}</b> · ${misses} miss${misses===1?"":"es"}</span></div>
        ${finished?`<div class="cx-done"><b>All ${pairs.length} matched in ${mmss(flash)} with ${misses} miss${misses===1?"":"es"}.</b>${bestMsg?`<span>${esc(bestMsg)}</span>`:""}<button class="btn" id="mt-again">Play again</button></div>`:""}
        <div class="cx-parts">${pairs.map(k=>`<button class="cx-part ${done.has(k)?"ok":""} ${picked===k?"pick":""}" data-p="${k}" ${done.has(k)?"disabled":""}>${esc(ORG[k].name)}</button>`).join("")}</div>
        <ol class="cx-jobs">${jobs.map(k=>`<li><button class="cx-job ${done.has(k)?"ok":""}" data-j="${k}" ${done.has(k)||!picked?"aria-disabled=\"true\"":""} ${done.has(k)?"disabled":""}>${done.has(k)?`<b>${esc(ORG[k].name)}</b> `:""}${esc(JOB[k])}</button></li>`).join("")}</ol>
        <p class="note" id="mt-msg" aria-live="polite" style="min-height:22px;margin:10px 0 0">${picked?`Now tap the job of the <b>${esc(ORG[picked].name.toLowerCase())}</b>.`:finished?"":"Pick a cell part to start."}</p>`;
      el.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{type=b.dataset.t;reset();});
      el.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{picked=picked===b.dataset.p?null:b.dataset.p;draw();});
      el.querySelectorAll("[data-j]").forEach(b=>b.onclick=()=>{
        if(!picked||done.has(b.dataset.j)) return;
        if(b.dataset.j===picked){ done.add(picked); picked=null;
          if(done.size===pairs.length){ clearInterval(timer); flash=Math.round((Date.now()-start)/1000);
            const key="cells-match-best-"+type, prev=store.get(key);
            const better=!prev||misses<prev.m||(misses===prev.m&&flash<prev.t);
            if(better) store.set(key,{t:flash,m:misses});
            bestMsg = !prev ? "" : better ? `New best for the ${type} cell!` : `Your best: ${mmss(prev.t)} with ${prev.m} miss${prev.m===1?"":"es"}.`; }
          draw();
        } else { misses++; const name=picked; draw();
          const bad=el.querySelector(`[data-j="${b.dataset.j}"]`); if(bad){bad.classList.add("no"); setTimeout(()=>bad.classList.remove("no"),500);}
          const m=el.querySelector("#mt-msg"); if(m) m.innerHTML=`Not the ${esc(ORG[name].name.toLowerCase())}. That one is the <b>${esc(ORG[b.dataset.j].name.toLowerCase())}</b>. Pick a part and try again.`;
          picked=null; el.querySelectorAll(".cx-part.pick").forEach(x=>x.classList.remove("pick")); }
      });
      const ag=el.querySelector("#mt-again"); if(ag) ag.onclick=reset;
    }
    reset();
  }

  /* Organelle Rush: 60-second clue game */
  function rush(el){
    const LEN=60, PEN=3;
    let state="intro", type="both", deck=[], q=null, score=0, streak=0, right=0, asked=0, missed=[], left=LEN, timer=null, lock=false;
    const pool=()=>Object.keys(CLUES).filter(k=>type!=="animal"||!ORG[k].plant);
    function nextQ(){
      if(!deck.length) deck=shuffle(pool().flatMap(k=>CLUES[k].map(c=>({k,c}))));
      let n=deck.pop(); if(q&&n.k===q.k&&deck.length){ deck.unshift(n); n=deck.pop(); }
      const others=shuffle(pool().filter(k=>k!==n.k)).slice(0,3);
      q={...n,opts:shuffle([n.k,...others])}; lock=false;
    }
    function startGame(){
      state="play"; deck=[]; q=null; score=0; streak=0; right=0; asked=0; missed=[]; left=LEN; nextQ();
      clearInterval(timer); timer=setInterval(()=>{ if(!document.body.contains(el)){clearInterval(timer);return;} left--; if(left<=0){left=0;end();} else upd(); },1000);
      draw();
    }
    function end(){ clearInterval(timer); state="over";
      const key="cells-rush-best-"+type, prev=store.get(key); const isBest=!prev||score>prev; if(isBest) store.set(key,score);
      draw(isBest&&prev!==null&&prev!==undefined, prev); }
    function upd(){ const t=el.querySelector("#rs-time"), bar=el.querySelector("#rs-bar"); if(t) t.textContent=left+"s"; if(bar){bar.style.width=(left/LEN*100)+"%"; bar.classList.toggle("low",left<=10);} }
    function draw(newBest, prev){
      const head=`<div class="eyebrow">Game</div><h2>Organelle Rush</h2>`;
      if(state==="intro"){
        const best=store.get("cells-rush-best-"+type);
        el.innerHTML=head+`<p style="margin:6px 0 10px">You get ${LEN} seconds. Read the clue and tap the organelle it describes. Every right answer is 10 points, plus a bonus for each one in a row. A wrong answer costs ${PEN} seconds.</p>
          <div class="cx-row"><button class="btn ghost ${type==="both"?"seg-on":""}" data-t="both">Plant + animal (all 9)</button><button class="btn ghost ${type==="animal"?"seg-on":""}" data-t="animal">Animal cell only (7)</button></div>
          ${best!=null?`<p class="note" style="margin:10px 0 0">Your best on this setting: <b>${best}</b> points</p>`:""}
          <button class="btn" id="rs-go" style="margin-top:14px">Start</button>`;
        el.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{type=b.dataset.t;draw();});
        el.querySelector("#rs-go").onclick=startGame; return;
      }
      if(state==="over"){
        const acc=asked?Math.round(right/asked*100):0;
        el.innerHTML=head+`<div class="cx-big">${score}<small> points</small></div>
          <p style="margin:2px 0 0">${right} right out of ${asked} (${acc}%).${newBest?` <b>New best!</b> (old best ${prev})`:prev!=null&&!newBest?` Your best: ${Math.max(prev,score)}.`:""}</p>
          ${missed.length?`<h3 style="margin-top:18px">Clues to look at again</h3><ul class="cx-miss">${missed.map(m=>`<li>${esc(m.c)} <b>${esc(ORG[m.k].name)}</b></li>`).join("")}</ul>`:asked?`<p class="note">No misses. Nice.</p>`:""}
          <div class="cx-row" style="margin-top:14px"><button class="btn" id="rs-go">Play again</button><button class="btn ghost" id="rs-set">Change setting</button></div>`;
        el.querySelector("#rs-go").onclick=startGame; el.querySelector("#rs-set").onclick=()=>{state="intro";draw();}; return;
      }
      el.innerHTML=head+`<div class="cx-hud"><span>Score <b id="rs-score">${score}</b></span><span>${streak>1?`<b>${streak} in a row</b>`:""}</span><span id="rs-time">${left}s</span></div>
        <div class="cx-track"><span id="rs-bar" class="${left<=10?"low":""}" style="width:${left/LEN*100}%"></span></div>
        <p class="cx-clue">${esc(q.c)}</p>
        <div class="cx-opts">${q.opts.map(k=>`<button class="cx-opt" data-k="${k}">${esc(ORG[k].name)}</button>`).join("")}</div>
        <p class="note" id="rs-fb" aria-live="polite" style="min-height:22px;margin:10px 0 0"></p>`;
      el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{
        if(lock||state!=="play") return; lock=true; asked++;
        const ok=b.dataset.k===q.k, fb=el.querySelector("#rs-fb");
        if(ok){ right++; streak++; const pts=10+Math.min(streak-1,5)*2; score+=pts; b.classList.add("ok"); fb.innerHTML=`<span style="color:var(--good);font-weight:700">+${pts}</span>`; }
        else { streak=0; left=Math.max(0,left-PEN); missed.push({k:q.k,c:q.c}); b.classList.add("no");
          const r=el.querySelector(`[data-k="${q.k}"]`); if(r) r.classList.add("ok");
          fb.innerHTML=`<span style="color:var(--bad);font-weight:700">−${PEN} seconds.</span> That's the ${esc(ORG[q.k].name.toLowerCase())}.`; upd(); }
        el.querySelectorAll("[data-k]").forEach(x=>x.disabled=true);
        setTimeout(()=>{ if(state!=="play") return; if(left<=0){ end(); return; } nextQ(); draw(); }, ok?450:1300);
      });
    }
    draw();
  }

  window.HUB.tools.cells = function(el){
    const tabs=[["diagram","Diagram"],["match","Part & Role"],["rush","Game"]];
    let cur="diagram";
    el.innerHTML=`<div class="cx-tabs" role="tablist" aria-label="Cell activities">${tabs.map(([k,t])=>`<button role="tab" data-tab="${k}">${t}</button>`).join("")}</div><div id="cx-pane"></div>
      <style>
        .cx-tabs{display:flex;gap:4px;margin:-6px 0 16px;padding:4px;background:var(--soft);border-radius:980px;width:max-content;max-width:100%}
        .cx-tabs button{border:0;background:none;padding:7px 14px;border-radius:980px;cursor:pointer;font-size:15px;color:var(--muted);font-weight:600}
        .cx-tabs button[aria-selected="true"]{background:var(--paper);color:var(--ink);box-shadow:0 1px 3px rgba(20,20,40,.12)}
        .cx-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
        #cx-pane .seg-on{background:var(--btn);color:var(--on-btn);border-color:var(--btn)}
        .cx-stat{font-size:15px;color:var(--muted);font-variant-numeric:tabular-nums}
        .cx-parts{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 12px}
        .cx-part{border:1.5px solid var(--rule);background:var(--paper);border-radius:980px;padding:7px 13px;font-size:15.5px;font-weight:600;cursor:pointer}
        .cx-part:hover:not(:disabled){border-color:var(--accent)}
        .cx-part.pick{background:var(--accent);border-color:var(--accent);color:var(--on-btn)}
        .cx-part.ok{background:none;border-style:dashed;color:var(--muted);text-decoration:line-through;cursor:default;opacity:.7}
        .cx-jobs{list-style:none;margin:0;padding:0;display:grid;gap:7px}
        .cx-job{width:100%;text-align:left;border:1px solid var(--rule);background:var(--paper);border-radius:10px;padding:9px 12px;font-size:15.5px;line-height:1.4;cursor:pointer}
        .cx-job:hover:not(:disabled){border-color:var(--accent)}
        .cx-job[aria-disabled="true"]:not(:disabled){cursor:default}
        .cx-job.ok{border-color:var(--good);background:color-mix(in srgb,var(--good) 8%,var(--paper));cursor:default}
        .cx-job.ok b{color:var(--good)}
        .cx-job.no,.cx-opt.no{border-color:var(--bad);animation:cxshake .35s}
        @keyframes cxshake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
        .cx-done{display:flex;flex-direction:column;gap:6px;align-items:flex-start;background:var(--task,var(--accent-soft));border-radius:10px;padding:12px 14px;margin-top:12px}
        .cx-done span{color:var(--muted);font-size:15px}
        .cx-hud{display:flex;justify-content:space-between;align-items:baseline;font-variant-numeric:tabular-nums;font-size:16px;margin-top:8px}
        .cx-hud span:nth-child(2){color:var(--accent-ink);font-size:14.5px}
        #rs-time{font-weight:700;font-size:20px}
        .cx-track{height:6px;background:var(--soft);border-radius:6px;overflow:hidden;margin:6px 0 14px}
        .cx-track span{display:block;height:100%;background:var(--accent);transition:width 1s linear}
        .cx-track span.low{background:var(--bad)}
        .cx-clue{font-size:21px;line-height:1.35;font-weight:600;min-height:3.6em;margin:0 0 12px;text-wrap:balance}
        .cx-opts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .cx-opt{border:1.5px solid var(--rule);background:var(--paper);border-radius:12px;padding:12px 10px;font-size:16px;font-weight:600;cursor:pointer;min-height:54px}
        .cx-opt:hover:not(:disabled){border-color:var(--accent)}
        .cx-opt:disabled{cursor:default}
        .cx-opt.ok{border-color:var(--good);color:var(--good);background:color-mix(in srgb,var(--good) 8%,var(--paper))}
        .cx-opt.no{color:var(--bad)}
        .cx-big{font-size:56px;font-weight:700;line-height:1;margin:10px 0 4px;letter-spacing:-.03em}
        .cx-big small{font-size:18px;font-weight:500;color:var(--muted);letter-spacing:0}
        .cx-miss{margin:0;padding-left:20px;display:grid;gap:6px;font-size:15.5px}
        .cx-miss b{color:var(--good);white-space:nowrap}
        @media (prefers-reduced-motion:reduce){.cx-job.no,.cx-opt.no{animation:none}.cx-track span{transition:none}}
      </style>`;
    const pane=el.querySelector("#cx-pane");
    function show(k){ cur=k;
      el.querySelectorAll("[data-tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===k)));
      const fresh=document.createElement("div"); pane.replaceChildren(fresh);
      (k==="diagram"?explorer:k==="match"?matcher:rush)(fresh);
    }
    el.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>show(b.dataset.tab));
    show(cur);
  };

  /* Metric converter practice */
  const UNITS = {
    length:[["km",1000],["m",1],["cm",0.01],["mm",0.001]],
    mass:[["kg",1000],["g",1],["mg",0.001]],
    volume:[["L",1],["mL",0.001]]
  };
  const fmt = n => { const r=Math.round(n*1e6)/1e6; return r.toLocaleString("en-CA",{maximumFractionDigits:6}).replace(/,/g," "); };
  window.HUB.tools.skills = function(el){
    let q=null, score=0, tries=0;
    function make(){
      const kinds=Object.keys(UNITS), k=kinds[Math.floor(Math.random()*kinds.length)], u=UNITS[k];
      let a=u[Math.floor(Math.random()*u.length)], b; do{ b=u[Math.floor(Math.random()*u.length)]; }while(b===a);
      const bases=[1,2,3,4,5,7,8,12,25,35,48,60,75,125,250,431,500,2463];
      let v=bases[Math.floor(Math.random()*bases.length)]; if(Math.random()<.35) v=v/10;
      return {v,a:a[0],b:b[0],ans:v*a[1]/b[1]};
    }
    function render(msg){
      el.innerHTML=`<div class="eyebrow">Practice</div><h2>Metric Converter</h2>
        <p class="note" style="margin:4px 0 14px">New question every time. Type your answer and press Check.</p>
        <p style="font-family:var(--f-title);font-size:30px;font-weight:700;margin:0">${fmt(q.v)} ${q.a} = ? ${q.b}</p>
        <form id="cf" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><input id="ca" inputmode="decimal" autocomplete="off" aria-label="Your answer" style="font:inherit;font-size:20px;padding:8px 10px;border:1px solid var(--rule);border-radius:7px;width:min(220px,100%);background:var(--paper);color:var(--ink)"><button class="btn" type="submit">Check</button><button class="btn ghost" type="button" id="cn">New question</button></form>
        <div style="min-height:52px;margin-top:10px">${msg||""}</div>
        <p class="note">Score ${score} of ${tries}. Reminder: kilo = 1000, centi = 1/100, milli = 1/1000.</p>`;
      el.querySelector("#cf").onsubmit=e=>{e.preventDefault();
        const raw=el.querySelector("#ca").value.replace(/\s/g,"").replace(/,/g,""); const n=parseFloat(raw);
        if(isNaN(n)) return render(`<p style="margin:0">Type a number first.</p>`);
        tries++; const ok=Math.abs(n-q.ans)<1e-9*Math.max(1,Math.abs(q.ans))+1e-9; if(ok) score++;
        const m = ok?`<p style="margin:0;color:var(--good);font-weight:700">Correct: ${fmt(q.v)} ${q.a} = ${fmt(q.ans)} ${q.b}</p>`:`<p style="margin:0;color:var(--bad);font-weight:700">Not quite. ${fmt(q.v)} ${q.a} = ${fmt(q.ans)} ${q.b}</p><p class="note" style="margin:2px 0 0">${q.ans>q.v?"Going to a smaller unit, so the number gets bigger.":"Going to a bigger unit, so the number gets smaller."}</p>`;
        q=make(); render(m);
      };
      el.querySelector("#cn").onclick=()=>{q=make();render();};
    }
    q=make(); render();
  };
})();
