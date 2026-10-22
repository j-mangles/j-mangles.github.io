/* Science tools: Cells unit panel (Cell Explorer diagram, Part & Role matching, Organelle Rush game),
   Membrane Lab live models on the transport lesson,
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
    golgi:{name:"Golgi apparatus",job:"The post office. Packs and ships materials. Unlike the ER, it sits on its own."},
    /* extra parts from the plant and animal cell labelling worksheets (diagram only) */
    nucenv:{name:"Nuclear membrane",alt:"nuclear envelope",ws:true},
    nucleolus:{name:"Nucleolus",ws:true},
    rer:{name:"Rough endoplasmic reticulum",short:"Rough ER",ws:true},
    ser:{name:"Smooth endoplasmic reticulum",short:"Smooth ER",ws:true},
    ribo:{name:"Ribosomes",ws:true},
    cytoskeleton:{name:"Cytoskeleton",ws:true},
    centrosome:{name:"Centrosome",ws:true},
    lysosome:{name:"Lysosome",ws:true}
  };
  /* Booklet set (9 plant / 7 animal) drives Part & Role and the game; the diagram shows every part on the labelling worksheets. */
  const BOOK = ["wall","membrane","cytoplasm","nucleus","mito","chloro","vacuole","er","golgi"];
  const SHEET = {
    plant:["wall","membrane","cytoplasm","nucleus","nucenv","nucleolus","rer","ser","ribo","golgi","mito","vacuole","chloro","cytoskeleton"],
    animal:["membrane","cytoplasm","nucleus","nucenv","nucleolus","rer","ser","ribo","golgi","mito","vacuole","centrosome","lysosome"]
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
    const ring=`M${x-rx} ${y} a${rx} ${ry} 0 1 0 ${2*rx} 0 a${rx} ${ry} 0 1 0 ${-2*rx} 0 Z M${x-rx+5} ${y} a${rx-5} ${ry-5} 0 1 0 ${2*rx-10} 0 a${rx-5} ${ry-5} 0 1 0 ${-2*rx+10} 0 Z`;
    return `<g filter="url(#${p}soft)"><g data-o="nucleus" class="org">
      <ellipse cx="${x}" cy="${y}" rx="${rx-5}" ry="${ry-5}" fill="url(#${p}nuc)" stroke="#6B4F9E" stroke-width="1.3"/>
      <g fill="none" stroke="#9479BF" stroke-width="2" stroke-linecap="round" opacity=".75">${chrom}</g></g>
      <g data-o="nucenv" class="org"><ellipse cx="${x}" cy="${y}" rx="${rx-2.5}" ry="${ry-2.5}" fill="none" stroke="transparent" stroke-width="14"/><path d="${ring}" fill="#9677C3" fill-rule="evenodd" stroke="#563A88" stroke-width="2"/>${pores}</g>
      <g data-o="nucleolus" class="org"><ellipse cx="${f1(x+rx*0.16)}" cy="${f1(y-ry*0.12)}" rx="${f1(rx*0.29)}" ry="${f1(ry*0.26)}" fill="url(#${p}nucl)"/>
      <ellipse cx="${f1(x+rx*0.1)}" cy="${f1(y-ry*0.2)}" rx="${f1(rx*0.09)}" ry="${f1(ry*0.06)}" fill="#fff" opacity=".35"/></g></g>`;
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
    let sm="", smHit=""; (smooth||[]).forEach(d=>{ sm+=`<path d="${d}" stroke="#AD5D88" stroke-width="9"/><path d="${d}" stroke="#F5C9DF" stroke-width="5.6"/>`; smHit+=`<path d="${d}" stroke="transparent" stroke-width="18"/>`; });
    return `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><g data-o="rer" class="org">${hit}${con}${sacs}<g fill="#76385F" stroke="none">${ribo}</g></g><g data-o="ser" class="org">${smHit}${sm}</g></g>`;
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

  function riboClusters(pts){ return `<g data-o="ribo" class="org">${pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="15" fill="transparent"/>`+[[0,0],[7,-4],[4,7],[-6,5],[12,4],[-3,-7]].map(([dx,dy])=>`<circle cx="${x+dx}" cy="${y+dy}" r="2.7" fill="#3A2B52"/>`).join("")).join("")}</g>`; }
  function cytoskeleton(paths){ return `<g data-o="cytoskeleton" class="org" fill="none" stroke-linecap="round">${paths.map(d=>`<path d="${d}" stroke="transparent" stroke-width="14"/><path d="${d}" stroke="#7E8DA6" stroke-width="1.6" opacity=".8"/>`).join("")}</g>`; }
  function centrosome(x,y){ return `<g data-o="centrosome" class="org" transform="translate(${x} ${y})"><circle r="24" fill="#E4EEF6" opacity=".7"/><g fill="#3E86A8" stroke="#235F7C" stroke-width="1.2"><rect x="-16" y="-5.5" width="32" height="11" rx="3"/><rect x="-5.5" y="-16" width="11" height="32" rx="3" opacity=".9"/></g><g stroke="#235F7C" stroke-width="1" opacity=".6">${[-10,-4,2,8].map(v=>`<path d="M${v} -5.5v11"/>`).join("")}</g></g>`; }
  function lysosomes(p,pts){ return `<g data-o="lysosome" class="org" filter="url(#${p}soft)">${pts.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#B58BE0" stroke="#6E46A0" stroke-width="2"/><circle cx="${x-r*0.3}" cy="${y-r*0.3}" r="${r*0.3}" fill="#fff" opacity=".45"/>`).join("")}</g>`; }

  function dots(R,n,inside){ let s=""; for(let i=0;i<n;){ const x=40+R()*720, y=30+R()*500; if(!inside(x,y)) continue; s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.5"/>`; i++; } return s; }

  const PINS = {
    plant:{wall:[33,300],membrane:[750,302],cytoplasm:[318,82],vacuole:[520,280],nucleus:[140,312],nucenv:[117,241],nucleolus:[183,281],rer:[287,292],ser:[242,437],ribo:[300,198],golgi:[110,447],mito:[100,120],chloro:[420,78],cytoskeleton:[294,152]},
    animal:{membrane:[54,330],cytoplasm:[612,186],nucleus:[365,292],nucenv:[332,333],nucleolus:[410,265],rer:[395,162],ser:[298,404],ribo:[578,214],golgi:[630,343],mito:[165,175],vacuole:[110,290],centrosome:[255,272],lysosome:[540,418]}
  };
  /* worksheet parts in reading order (top to bottom), so the numbers don't give anything away */
  const order = type => SHEET[type].slice().sort((a,b)=>{ const A=PINS[type][a],B=PINS[type][b]; return Math.round(A[1]/40)-Math.round(B[1]/40)||A[0]-B[0]; });
  function pins(type,sc,marks){ sc=sc||1; const ord=order(type);
    if(marks) return `<g class="pins">${ord.map((k,i)=>{ const [x,y]=PINS[type][k], m=marks[i+1]||{}; return `<g data-n="${i+1}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="${f1(14*sc)}" fill="${m.fill||"#202126"}" stroke="${m.ring||"#fff"}" stroke-width="${m.ring?4:2.5}"/><text x="${x}" y="${f1(y+5*sc)}" text-anchor="middle" font-size="${f1(14*sc)}" font-weight="700" fill="#fff" font-family="Inter,system-ui,sans-serif" pointer-events="none">${i+1}</text></g>`; }).join("")}</g>`;
    const order_=ord;
    return `<g class="pins" pointer-events="none">${order_.map((k,i)=>{ const [x,y]=PINS[type][k]; return `<g><circle cx="${x}" cy="${y}" r="${f1(13*sc)}" fill="#202126" stroke="#fff" stroke-width="2.5"/><text x="${x}" y="${f1(y+5*sc)}" text-anchor="middle" font-size="${f1(14*sc)}" font-weight="700" fill="#fff" font-family="Inter,system-ui,sans-serif">${i+1}</text></g>`; }).join("")}</g>`; }

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
    s+=cytoskeleton(["M262 150 C 290 140, 318 152, 344 140","M276 128 L 312 176","M300 135 L 290 168","M120 500 C 180 470, 240 505, 300 470","M700 430 L 742 470","M560 470 C 590 455, 620 470, 650 455"]);
    s+=`<g data-o="vacuole" class="org" filter="url(#${p}soft)"><path d="${vac}" fill="url(#${p}vac)" stroke="#5E9CC2" stroke-width="3"/><ellipse cx="450" cy="168" rx="78" ry="24" transform="rotate(-8 450 168)" fill="#fff" opacity=".5"/><ellipse cx="610" cy="400" rx="30" ry="9" transform="rotate(-30 610 400)" fill="#fff" opacity=".35"/></g>`;
    s+=er(170,290,78,72,-1.25,1.25,["M214 440 C 232 424, 250 452, 268 436 S 300 450, 296 470","M222 470 C 240 458, 258 486, 278 474","M200 418 C 214 404, 236 410, 244 398"]);
    s+=nucleus(p,170,290,78,72,R);
    s+=golgi(p,112,456,0);
    s+=mito(p,100,120,25)+mito(p,255,104,-15)+mito(p,330,488,5)+mito(p,690,490,-4)+mito(p,726,276,90);
    s+=chloro(p,180,80,0)+chloro(p,420,78,0)+chloro(p,590,75,4)+chloro(p,728,190,88)+chloro(p,728,362,92)+chloro(p,480,487,0)+chloro(p,606,488,-3);
    s+=riboClusters([[300,198],[404,500],[690,108],[310,330]]);
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
    s+=centrosome(255,272)+lysosomes(p,[[212,232,10],[540,418,11],[318,96,9]]);
    s+=riboClusters([[578,214],[192,318],[420,505]]);
    return s;
  }
  function cellSVG(type,showPins,k,marks){ return (type==="plant"?plantSVG():animalSVG())+(showPins||marks?pins(type,k,marks):"")+`</svg>`; }

  const NICK = {nucleus:"the “brain” of the cell", mito:"the “powerhouse of the cell”", golgi:"the “post office” of the cell", vacuole:"the “storage unit” of the cell"};

  window.HUB.tools = window.HUB.tools || {};
  function explorer(el){
    let type="plant", mode="explore", labels=false, sel=null, target=null, score=0, tries=0, lab=null;
    el.innerHTML = `<div class="eyebrow">Interactive diagram</div><h2>Cell Explorer</h2>
      <div class="cx-row" id="cellctl" style="margin:10px 0 12px">
        <span class="cx-seg"><button id="t-plant">Plant cell</button><button id="t-animal">Animal cell</button></span>
        <span class="cx-seg"><button id="m-explore">Explore</button><button id="m-quiz">Quiz</button><button id="m-label">Label it</button></span>
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
        .lb-rows{list-style:none;margin:12px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px}
        .lb-row{display:flex;gap:9px;align-items:center;width:100%;text-align:left;background:var(--paper);border:1.5px solid var(--rule);border-radius:8px;padding:6px 9px;font-size:15px;cursor:pointer;min-height:38px;color:var(--ink)}
        .lb-row b{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#202126;color:#fff;font-size:12px;flex:none}
        .lb-row.act{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent)}.lb-row.ok{border-color:var(--good)}.lb-row.ok b{background:var(--good)}.lb-row.no{border-color:var(--bad)}.lb-row.no b{background:var(--bad)}
        .lb-bank{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.lb-bank .opt{font-size:14.5px;padding:6px 11px}.lb-bank .opt.used{opacity:.35}
        @media (prefers-reduced-motion:reduce){#cellbox .org{transition:none}}
      </style>`;
    const box=el.querySelector("#cellbox"), info=el.querySelector("#cellinfo"), legend=el.querySelector("#legend");
    const present=()=>order(type);
    function newTarget(){ const list=present().filter(k=>k!==target); target=list[Math.floor(Math.random()*list.length)]; }
    function draw(){
      const w=box.clientWidth||480, k=Math.max(1,Math.min(1.7,(800/w)*0.55));
      let marks=null;
      if(mode==="label"){ if(!lab) lab={filled:{},active:1,checked:false}; marks={};
        present().forEach((key,i)=>{ const n=i+1, f=lab.filled[n]; marks[n]={fill:lab.checked&&f?(f===key?"var(--good)":"var(--bad)"):(f?"#5A5D72":"#202126"),ring:lab.active===n?"var(--accent)":null}; }); }
      box.innerHTML=cellSVG(type, mode==="explore"&&labels, k, marks);
      const svg=box.querySelector("svg");
      ["plant","animal"].forEach(t=>el.querySelector("#t-"+t).classList.toggle("seg-on",type===t));
      el.querySelector("#m-explore").classList.toggle("seg-on",mode==="explore");
      el.querySelector("#m-quiz").classList.toggle("seg-on",mode==="quiz");
      el.querySelector("#m-label").classList.toggle("seg-on",mode==="label");
      const lb=el.querySelector("#m-labels"); lb.hidden=mode!=="explore"; lb.setAttribute("aria-pressed",String(labels));
      box.querySelectorAll(".pins [data-n]").forEach(g=>g.addEventListener("click",ev=>{ev.stopPropagation(); lab.active=+g.dataset.n; lab.checked=false; draw();}));
      box.querySelectorAll(".org").forEach(g=>{
        g.addEventListener("click",ev=>{ev.stopPropagation(); if(mode==="label") return; pick(g.dataset.o);});
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
    function labelInfo(){
      const keys=present(), used=new Set(Object.values(lab.filled)), n=keys.length;
      const right=lab.checked?keys.filter((k,i)=>lab.filled[i+1]===k).length:0;
      const bank=keys.slice().sort((a,b)=>ORG[a].name.localeCompare(ORG[b].name));
      info.innerHTML=`<p class="note" style="margin:0">Just like the labelling worksheet: pick a number, then pick the part it points to. Tap a number on the diagram or in the list.</p>
        <ol class="lb-rows">${keys.map((k,i)=>{const f=lab.filled[i+1], st=lab.checked&&f?(f===k?" ok":" no"):""; return `<li><button class="lb-row${st}${lab.active===i+1?" act":""}" data-n="${i+1}"><b>${i+1}</b><span>${f?esc(ORG[f].short||ORG[f].name):""}</span></button></li>`;}).join("")}</ol>
        <p class="note" style="margin:12px 0 0">${lab.active?`Label for number <b>${lab.active}</b>:`:"Pick a number first."}</p>
        <div class="lb-bank">${bank.map(k=>`<button class="opt${used.has(k)?" used":""}" data-k="${k}">${esc(ORG[k].name)}</button>`).join("")}</div>
        <div class="cx-row" style="margin-top:12px"><button class="btn" id="lb-check">Check my labels</button><button class="btn ghost" id="lb-show">Show answers</button><button class="btn ghost" id="lb-clear">Start over</button></div>
        ${lab.checked?`<p style="margin:10px 0 0;font-weight:700">${right} of ${n} correct${right===n?". Perfect!":". Red ones need another look."}</p>`:""}`;
      info.querySelectorAll(".lb-row").forEach(b=>b.onclick=()=>{lab.active=+b.dataset.n;lab.checked=false;draw();});
      info.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{
        if(!lab.active) return; const k=b.dataset.k;
        for(const m in lab.filled) if(lab.filled[m]===k) delete lab.filled[m];
        lab.filled[lab.active]=k; lab.checked=false;
        let nx=null; for(let i=1;i<=n;i++){ const j=(lab.active+i-1)%n+1; if(!lab.filled[j]){nx=j;break;} } lab.active=nx; draw(); });
      info.querySelector("#lb-check").onclick=()=>{lab.checked=true;lab.active=null;draw();};
      info.querySelector("#lb-show").onclick=()=>{keys.forEach((k,i)=>lab.filled[i+1]=k);lab.checked=true;lab.active=null;draw();};
      info.querySelector("#lb-clear").onclick=()=>{lab=null;draw();};
    }
    function showInfo(){
      if(mode==="label"){ labelInfo(); return; }
      if(mode==="quiz"){ if(!target||!present().includes(target)) newTarget();
        info.innerHTML=`<p style="margin:0" class="note">Click the part of the ${type} cell that is the…</p><p style="margin:2px 0 0;font-family:var(--f-title);font-size:26px;font-weight:700">${esc(ORG[target].name)}</p><p class="note" style="margin:6px 0 0">Score ${score} of ${tries}</p>`; return; }
      if(!sel){ info.innerHTML=`<p class="note" style="margin:0">Click any part of the cell to see what it is and what it does. This ${type} cell shows all ${present().length} parts from the labelling worksheet.${labels?"":" Turn on Labels to number them."}</p>`; return; }
      info.innerHTML=`<p style="margin:0;font-family:var(--f-title);font-size:24px;font-weight:700">${esc(ORG[sel].name)}</p>${ORG[sel].alt?`<p class="note" style="margin:0">Also called the ${esc(ORG[sel].alt)}.</p>`:""}<p style="margin:4px 0 0">${esc(JOB[sel])}</p>${NICK[sel]?`<p class="note" style="margin:6px 0 0">Nickname: ${esc(NICK[sel])}.</p>`:""}${ORG[sel].plant?`<p class="note" style="margin:6px 0 0">Found in plant cells, not animal cells.</p>`:""}`;
    }
    el.querySelector("#t-plant").onclick=()=>{type="plant";sel=null;lab=null;draw();};
    el.querySelector("#t-animal").onclick=()=>{type="animal";sel=null;lab=null;if(target&&!SHEET.animal.includes(target))target=null;draw();};
    el.querySelector("#m-label").onclick=()=>{mode="label";sel=null;lab=null;draw();};
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
    golgi:"Packs and transports materials around the cell.",
    nucenv:"Double membrane around the nucleus. Its pores let messages and materials in and out.",
    nucleolus:"Dense spot inside the nucleus that makes ribosomes.",
    rer:"ER covered in ribosomes (that's why it's “rough”). Builds proteins and moves them through the cell.",
    ser:"ER with no ribosomes. Makes fats (lipids) and helps break down harmful substances.",
    ribo:"Tiny dots that build proteins. Some float free in the cytoplasm; others sit on the rough ER.",
    cytoskeleton:"Network of protein fibres that gives the cell its shape and helps move things around inside it.",
    centrosome:"Holds two centrioles that help pull chromosomes apart when an animal cell divides.",
    lysosome:"Small sac of enzymes that breaks down wastes and worn-out cell parts. The cell's clean-up crew."
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
      const keys=BOOK.filter(k=>type==="plant"||!ORG[k].plant);
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

  /* ---------- Membrane Lab: live particle models for the transport lesson (booklet Topic 2) ---------- */
  function membraneLab(el){
    const W=600, H=330, MX=300, MT=18, TOP=34;          // canvas units; membrane centre x and thickness; space for labels
    const KIND={
      water:{r:3,c:"#3B8ED8",name:"Water",v:85},
      oxygen:{r:4.2,c:"#E0533F",name:"Oxygen",v:75},
      grounds:{r:9,c:"#7A5232",name:"Large particles",v:40},
      glucose:{r:6.5,c:"#F0A230",name:"Glucose (sugar)",v:58},
      solute:{r:7.5,c:"#8E63C7",name:"Solute (dissolved salt)",v:42},
      ion:{r:5.5,c:"#D9447A",name:"Particles",v:60}
    };
    const TABS=[["perm","Permeability"],["diff","Simple diffusion"],["fac","Facilitated diffusion"],["osmo","Osmosis"],["active","Active transport"]];
    let tab="perm", P=[], running=true, raf=0, last=0, cfg={}, fx=[], atp=0, pump=null, lvl={L:0,R:0}, hist=[], readT=0;

    el.innerHTML=`<div class="eyebrow">Live models</div><h2>Membrane Lab</h2>
      <p class="note" style="margin:4px 0 12px">Every dot is a particle moving around at random, like real molecules. Nothing is scripted: watch what happens at the membrane.</p>
      <div class="ml-tabs" role="tablist" aria-label="Models">${TABS.map(([k,t])=>`<button role="tab" data-tab="${k}">${t}</button>`).join("")}</div>
      <div class="ml-ctl" id="ml-ctl"></div>
      <div class="ml-stage"><canvas id="ml-cv" aria-label="Particle model"></canvas></div>
      <div class="ml-read" id="ml-read" aria-live="off"></div>
      <div class="ml-txt" id="ml-txt"></div>
      <style>
        .ml-tabs{display:flex;flex-wrap:wrap;gap:4px;padding:4px;background:var(--soft);border-radius:16px}
        .ml-tabs button{border:0;background:none;padding:7px 12px;border-radius:12px;cursor:pointer;font-size:14.5px;font-weight:600;color:var(--muted)}
        .ml-tabs button[aria-selected="true"]{background:var(--paper);color:var(--ink);box-shadow:0 1px 3px rgba(20,20,40,.14)}
        .ml-ctl{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0 10px}
        .ml-ctl .btn{padding:7px 14px;font-size:14.5px}
        .ml-ctl .seg{display:inline-flex;padding:3px;background:var(--soft);border-radius:980px;flex-wrap:wrap}
        .ml-ctl .seg button{border:0;background:none;padding:6px 12px;border-radius:980px;font-size:14px;font-weight:600;color:var(--muted);cursor:pointer}
        .ml-ctl .seg button.on{background:var(--paper);color:var(--ink);box-shadow:0 1px 3px rgba(20,20,40,.14)}
        .ml-ctl label{font-size:14.5px;color:var(--muted);display:inline-flex;align-items:center;gap:8px}
        .ml-ctl input[type=range]{accent-color:var(--accent);width:120px}
        .ml-stage{border:1px solid var(--rule);border-radius:12px;overflow:hidden;background:#fff;line-height:0}
        .ml-stage canvas{display:block;width:100%}
        .ml-read{display:grid;gap:6px;margin-top:10px;font-size:14.5px}
        .ml-bar{display:grid;grid-template-columns:minmax(92px,auto) 1fr;gap:10px;align-items:center}
        .ml-bar .tr{display:flex;height:22px;border-radius:6px;overflow:hidden;background:var(--soft);font-size:12.5px;font-weight:700;color:#fff;font-variant-numeric:tabular-nums}
        .ml-bar .tr span{display:flex;align-items:center;padding:0 7px;white-space:nowrap;transition:flex-grow .35s}
        .ml-key{display:inline-flex;align-items:center;gap:6px}
        .ml-key i{width:11px;height:11px;border-radius:50%;display:inline-block}
        .ml-txt{margin-top:12px;font-size:16px;line-height:1.5}
        .ml-txt .def{background:var(--task,var(--accent-soft));border-radius:10px;padding:10px 14px;margin:0 0 8px}
        .ml-txt p{margin:6px 0 0}
      </style>`;
    const cv=el.querySelector("#ml-cv"), ctx=cv.getContext("2d"), ctl=el.querySelector("#ml-ctl"), read=el.querySelector("#ml-read"), txt=el.querySelector("#ml-txt");
    let scale=1;
    function fit(){ const w=cv.parentElement.clientWidth||560, dpr=window.devicePixelRatio||1; scale=w/W; cv.width=Math.round(w*dpr); cv.height=Math.round(H*scale*dpr); cv.style.height=(H*scale)+"px"; ctx.setTransform(scale*dpr,0,0,scale*dpr,0,0); }

    const rnd=(a,b)=>a+Math.random()*(b-a);
    const top=side=> tab==="osmo" ? H-lvl[side<0?"L":"R"] : TOP;
    function add(kind,side,n){ const k=KIND[kind]; for(let i=0;i<n;i++){ const a=rnd(0,6.283);
      const x0=side<0?k.r+4:MX+MT/2+k.r+3, x1=side<0?MX-MT/2-k.r-3:W-k.r-4;
      P.push({kind,r:k.r,x:rnd(x0,x1),y:rnd(top(side)+k.r+2,H-k.r-3),vx:Math.cos(a)*k.v,vy:Math.sin(a)*k.v,side,pass:0,v:k.v}); } }
    const count=(kind,side)=>P.filter(p=>p.kind===kind&&p.side===side&&!p.pass&&!p.held).length;

    /* channels: list of [centreY, halfOpening] where the membrane is open for this tab */
    function channels(){
      if(tab==="fac"){ const n=cfg.prot; const out=[]; for(let i=0;i<n;i++) out.push([TOP+(H-TOP)*(i+0.5)/n, 11]); return out; }
      if(tab==="perm"&&cfg.mode==="perm"){ const out=[]; for(let y=TOP+22;y<H-10;y+=46) out.push([y,15]); return out; }
      return [];
    }
    function canCross(p,dir){
      if(tab==="perm") return cfg.mode==="perm" ? inChannel(p) : cfg.mode==="sel" ? p.kind==="water" : false;
      if(tab==="diff") return true;
      if(tab==="fac") return inChannel(p);
      if(tab==="osmo"){ if(p.kind!=="water") return false;
        const s=p.side<0?"L":"R", w=count("water",p.side)+1, sol=count("solute",p.side); return Math.random() < w/(w+5*sol); }
      return false; // active transport: only the pump moves particles
    }
    function inChannel(p){ return channels().some(([y,h])=>Math.abs(p.y-y)<=h-p.r*0.6); }

    function setup(){
      P=[]; fx=[]; hist=[]; pump=null; cfg=cfg||{};
      if(tab==="perm"){ cfg.mode=cfg.mode||"sel"; add("water",-1,46); add("grounds",-1,14); }
      if(tab==="diff"){ add("oxygen",-1,70); }
      if(tab==="fac"){ cfg.prot=cfg.prot==null?2:cfg.prot; add("glucose",-1,44); }
      if(tab==="osmo"){ cfg.solL=cfg.solL==null?0:cfg.solL; cfg.solR=cfg.solR==null?12:cfg.solR; lvl={L:168,R:168}; add("water",-1,60); add("water",1,60); add("solute",-1,cfg.solL); add("solute",1,cfg.solR); }
      if(tab==="active"){ atp=10; add("ion",-1,24); add("ion",1,36); }
      controls(); words(); readout(true);
    }

    function step(dt){
      if(tab==="osmo"){ ["L","R"].forEach(s=>{ const side=s==="L"?-1:1, target=30+2.3*count("water",side)+0.6*count("solute",side); lvl[s]+= (target-lvl[s])*Math.min(1,dt*0.7); }); }
      for(const p of P){
        if(p.held) continue;
        p.vx+=rnd(-1,1)*p.v*6*dt; p.vy+=rnd(-1,1)*p.v*6*dt;
        const sp=Math.hypot(p.vx,p.vy), m=p.v*1.25; if(sp>m){p.vx*=m/sp;p.vy*=m/sp;} if(sp<p.v*0.45){p.vx*=1.15;p.vy*=1.15;}
        let nx=p.x+p.vx*dt, ny=p.y+p.vy*dt;
        const t=top(p.pass||p.side);
        if(ny<t+p.r){ny=t+p.r;p.vy=Math.abs(p.vy);} if(ny>H-p.r-1){ny=H-p.r-1;p.vy=-Math.abs(p.vy);}
        if(nx<p.r+1){nx=p.r+1;p.vx=Math.abs(p.vx);} if(nx>W-p.r-1){nx=W-p.r-1;p.vx=-Math.abs(p.vx);}
        const L=MX-MT/2, R=MX+MT/2;
        if(p.pass){ // inside the membrane on the way across
          if(p.pass>0&&nx-p.r>R){p.side=1;p.pass=0;} else if(p.pass<0&&nx+p.r<L){p.side=-1;p.pass=0;}
          else if(p.pass>0&&nx+p.r<L){p.side=-1;p.pass=0;} else if(p.pass<0&&nx-p.r>R){p.side=1;p.pass=0;}
          else if(tab==="fac"||tab==="perm"){ const ch=channels().find(([y,h])=>Math.abs(p.y-y)<=h+2); if(ch){ ny=Math.max(ch[0]-ch[1]+p.r,Math.min(ch[0]+ch[1]-p.r,ny)); } }
        } else if(p.side<0&&nx+p.r>L){ if(canCross(p,1)) p.pass=1; else {nx=L-p.r;p.vx=-Math.abs(p.vx);} }
        else if(p.side>0&&nx-p.r<R){ if(canCross(p,-1)) p.pass=-1; else {nx=R+p.r;p.vx=Math.abs(p.vx);} }
        p.x=nx; p.y=ny;
      }
      if(tab==="active") pumpStep(dt);
      fx=fx.filter(f=>(f.t+=dt)<f.d);
    }

    /* the pump: a carrier protein that grabs a particle on the outside and, using one ATP, pushes it inside */
    const PY=H/2+14, PH=34;
    function pumpStep(dt){
      if(pump){ pump.t+=dt; const k=Math.min(1,pump.t/0.7), p=pump.p;
        p.x=pump.x0+(MX+MT/2+p.r+6-pump.x0)*k; p.y=pump.y0+(PY-pump.y0)*Math.min(1,k*2);
        if(k>=1){ p.held=false; p.side=1; p.vx=p.v; p.vy=rnd(-30,30); pump=null; } return; }
      if(atp<=0||!running) return;
      const L=MX-MT/2, p=P.find(q=>q.side<0&&!q.held&&!q.pass&&q.x>L-q.r-16&&Math.abs(q.y-PY)<PH-4);
      if(p){ p.held=true; atp--; pump={p,t:0,x0:p.x,y0:p.y}; fx.push({x:MX,y:PY,t:0,d:0.6}); readout(true); }
    }

    /* ---------- drawing ---------- */
    function draw(){
      ctx.clearRect(0,0,W,H);
      const outside=tab==="perm"?"Side A":"Outside the cell", inside=tab==="perm"?"Side B":"Inside the cell";
      if(tab==="osmo"){ ctx.fillStyle="#E6F2FB"; ctx.fillRect(0,H-lvl.L,MX,lvl.L); ctx.fillRect(MX,H-lvl.R,W-MX,lvl.R);
        ctx.strokeStyle="#8DBCE0"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,H-lvl.L); ctx.lineTo(MX-MT/2,H-lvl.L); ctx.moveTo(MX+MT/2,H-lvl.R); ctx.lineTo(W,H-lvl.R); ctx.stroke(); }
      else { ctx.fillStyle=tab==="perm"?"#F7F8FB":"#FBF6F0"; ctx.fillRect(0,0,MX,H); ctx.fillStyle=tab==="perm"?"#F7F8FB":"#F3F8EE"; ctx.fillRect(MX,0,W-MX,H); }
      ctx.font="600 13px Inter,system-ui,sans-serif"; ctx.fillStyle="#6B6E79"; ctx.textBaseline="middle";
      ctx.textAlign="left"; ctx.fillText(outside.toUpperCase(),12,17); ctx.textAlign="right"; ctx.fillText(inside.toUpperCase(),W-12,17);
      drawBarrier();
      for(const f of fx){ const k=f.t/f.d, R=10+22*k; ctx.save(); ctx.globalAlpha=1-k; ctx.fillStyle="#FFC531"; ctx.strokeStyle="#E08A00"; ctx.lineWidth=1.5; star(f.x-MT-6,f.y-26,R*0.55,R,8); ctx.fill(); ctx.stroke();
        ctx.globalAlpha=(1-k); ctx.fillStyle="#8A5A00"; ctx.font="700 11px Inter,system-ui,sans-serif"; ctx.textAlign="center"; ctx.fillText("ATP",f.x-MT-6,f.y-26); ctx.restore(); }
      for(const p of P){ const k=KIND[p.kind]; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.283); ctx.fillStyle=k.c; ctx.fill();
        if(p.r>4){ ctx.fillStyle="rgba(255,255,255,.45)"; ctx.beginPath(); ctx.arc(p.x-p.r*0.3,p.y-p.r*0.3,p.r*0.35,0,6.283); ctx.fill(); } }
      if(tab==="osmo"){ ctx.font="700 13px Inter,system-ui,sans-serif"; ctx.fillStyle="#2E6FA6"; ctx.textAlign="center";
        ctx.fillText("water level",MX/2,H-lvl.L-10); ctx.fillText("water level",MX+(W-MX)/2,H-lvl.R-10); }
      if(!running){ ctx.fillStyle="rgba(255,255,255,.55)"; ctx.fillRect(0,0,W,H); ctx.fillStyle="#202126"; ctx.font="700 18px Inter,system-ui,sans-serif"; ctx.textAlign="center"; ctx.fillText("Paused",W/2,H/2); }
    }
    function star(x,y,r1,r2,n){ ctx.beginPath(); for(let i=0;i<n*2;i++){ const a=i*Math.PI/n-Math.PI/2, r=i%2?r1:r2; ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);} ctx.closePath(); }
    function bilayer(y0,y1){ const L=MX-MT/2+3, R=MX+MT/2-3;
      ctx.strokeStyle="#D7B66A"; ctx.lineWidth=1.3; for(let y=y0+3;y<y1-2;y+=6.5){ ctx.beginPath(); ctx.moveTo(L+2,y); ctx.lineTo(MX-1.5,y+1.5); ctx.moveTo(R-2,y); ctx.lineTo(MX+1.5,y+1.5); ctx.stroke(); }
      ctx.fillStyle="#3E8E5A"; for(let y=y0+3;y<y1-2;y+=6.5){ ctx.beginPath(); ctx.arc(L,y,2.8,0,6.283); ctx.arc(R,y,2.8,0,6.283); ctx.fill(); } }
    function drawBarrier(){
      const L=MX-MT/2, y0=tab==="osmo"?H-Math.max(lvl.L,lvl.R)-14:TOP-4;
      if(tab==="perm"){ ctx.fillStyle=cfg.mode==="imp"?"#7D8597":"#9AA3B5";
        if(cfg.mode==="imp"){ ctx.fillRect(L,y0,MT,H-y0); }
        else if(cfg.mode==="perm"){ let y=y0; channels().forEach(([cy,h])=>{ ctx.fillRect(L,y,MT,cy-h-y); y=cy+h; }); ctx.fillRect(L,y,MT,H-y); }
        else { for(let y=y0;y<H;y+=7){ ctx.fillRect(L,y,MT,4.4); } }
        return; }
      const ch=tab==="fac"?channels():[];
      let y=y0; const segs=[];
      ch.forEach(([cy,h])=>{ segs.push([y,cy-h-19]); y=cy+h+19; }); segs.push([y,H]);
      if(tab==="active") { segs.length=0; segs.push([y0,PY-PH-4],[PY+PH+4,H]); }
      segs.forEach(([a,b])=>{ if(b>a) bilayer(a,b); });
      ch.forEach(([cy,h])=>protein(cy,h));
      if(tab==="active") pumpDraw();
    }
    function protein(cy,h){ const w=MT+22, x=MX-w/2, cap=17;
      ctx.fillStyle="rgba(124,92,196,.16)"; ctx.fillRect(x+3,cy-h,w-6,2*h);
      ctx.fillStyle="#7C5CC4"; ctx.strokeStyle="#4E3391"; ctx.lineWidth=1.6;
      rr(x,cy-h-cap,w,cap+3,7); ctx.fill(); ctx.stroke(); rr(x,cy+h-3,w,cap+3,7); ctx.fill(); ctx.stroke();
      ctx.fillStyle="rgba(255,255,255,.28)"; rr(x+4,cy-h-cap+3,w-8,4,2); ctx.fill(); rr(x+4,cy+h+1,w-8,4,2); ctx.fill(); }
    function pumpDraw(){ const w=MT+20, x=MX-w/2, busy=!!pump;
      ctx.fillStyle=busy?"#1F9E8E":"#23B3A0"; ctx.strokeStyle="#147567"; ctx.lineWidth=1.6;
      rr(x,PY-PH-4,w,PH*2+8,8); ctx.fill(); ctx.stroke();
      ctx.fillStyle="#E8F7F4"; rr(x+5,PY-9,w-10,18,6); ctx.fill();
      ctx.fillStyle="#147567"; ctx.font="700 10px Inter,system-ui,sans-serif"; ctx.textAlign="center"; ctx.fillText("PUMP",MX,PY-PH+8); }
    function rr(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }

    /* ---------- controls, readout and words ---------- */
    function controls(){
      let h=`<button class="btn" id="ml-play">${running?"Pause":"Play"}</button><button class="btn ghost" id="ml-reset">Reset</button>`;
      if(tab==="perm") h+=`<span class="seg">${[["perm","Permeable"],["imp","Impermeable"],["sel","Selectively permeable"]].map(([k,t])=>`<button data-mode="${k}" class="${cfg.mode===k?"on":""}">${t}</button>`).join("")}</span>`;
      if(tab==="diff") h+=`<button class="btn ghost" id="ml-addL">+ particles outside</button><button class="btn ghost" id="ml-addR">+ particles inside</button>`;
      if(tab==="fac") h+=`<label>Transport proteins <input type="range" min="0" max="4" step="1" value="${cfg.prot}" id="ml-prot"> <b id="ml-protn">${cfg.prot}</b></label>`;
      if(tab==="osmo") h+=`<label>Solute outside <input type="range" min="0" max="16" step="2" value="${cfg.solL}" id="ml-solL"> <b>${cfg.solL}</b></label><label>Solute inside <input type="range" min="0" max="16" step="2" value="${cfg.solR}" id="ml-solR"> <b>${cfg.solR}</b></label>`;
      if(tab==="active") h+=`<button class="btn ghost" id="ml-atp">+10 ATP from mitochondria</button>`;
      ctl.innerHTML=h;
      ctl.querySelector("#ml-play").onclick=()=>{ running=!running; ctl.querySelector("#ml-play").textContent=running?"Pause":"Play"; if(running){last=0;} draw(); };
      ctl.querySelector("#ml-reset").onclick=()=>{ setup(); };
      ctl.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{ cfg.mode=b.dataset.mode; setup(); });
      const on=(id,f)=>{ const e=ctl.querySelector(id); if(e) e.addEventListener("input",f); };
      on("#ml-prot",e=>{ cfg.prot=+e.target.value; ctl.querySelector("#ml-protn").textContent=cfg.prot; words(); });
      on("#ml-solL",e=>{ cfg.solL=+e.target.value; setup(); });
      on("#ml-solR",e=>{ cfg.solR=+e.target.value; setup(); });
      const a=ctl.querySelector("#ml-addL"); if(a) a.onclick=()=>{ add("oxygen",-1,25); };
      const b=ctl.querySelector("#ml-addR"); if(b) b.onclick=()=>{ add("oxygen",1,25); };
      const t=ctl.querySelector("#ml-atp"); if(t) t.onclick=()=>{ atp+=10; readout(true); };
    }
    function bar(label,kind,colorA,colorB){
      const a=count(kind,-1), b=count(kind,1), n=a+b||1;
      return `<div class="ml-bar"><span class="ml-key"><i style="background:${KIND[kind].c}"></i>${label}</span><div class="tr"><span style="flex:${a/n} 1 0;background:${colorA};padding:${a?"0 7px":"0"}">${a?`outside ${a}`:""}</span><span style="flex:${b/n} 1 0;background:${colorB};justify-content:flex-end;padding:${b?"0 7px":"0"}">${b?`inside ${b}`:""}</span></div></div>`;
    }
    function readout(force){
      if(!force&&performance.now()-readT<300) return; readT=performance.now();
      const A="#8A93A8", B="#5968E8";
      let h="";
      if(tab==="perm"){ h=bar("Water","water",A,B).replace(/outside/g,"A").replace(/inside/g,"B")+bar("Large particles","grounds",A,B).replace(/outside/g,"A").replace(/inside/g,"B"); }
      if(tab==="diff") h=bar("Oxygen","oxygen",A,B);
      if(tab==="fac") h=bar("Glucose","glucose",A,B);
      if(tab==="osmo") h=bar("Water","water",A,B)+bar("Solute","solute",A,B)+`<div class="note">Water level: outside ${Math.round(lvl.L)} · inside ${Math.round(lvl.R)}</div>`;
      if(tab==="active") h=bar("Particles","ion",A,B)+`<div class="note">ATP left: <b>${atp}</b>${atp===0?" · the pump has stopped. Add ATP to restart it.":""}</div>`;
      read.innerHTML=h;
    }
    function words(){
      const D={
        perm:`<div class="def"><b>Permeable</b> lets ANYTHING through. <b>Impermeable</b> lets NOTHING through. <b>Selectively permeable</b> (also known as semipermeable) lets ONLY SOME THINGS through.</div>
          <p>${cfg.mode==="perm"?"Like a window screen: the openings are big, so the water and the large particles both get through.":cfg.mode==="imp"?"Like plastic wrap: nothing gets through, no matter how long you wait.":"Like a coffee filter: the tiny water particles slip through, but the large particles stay behind. The cell membrane works this way."}</p>`,
        diff:`<div class="def"><b>Simple diffusion</b> – movement of molecules from an area of <b>high</b> concentration to an area of <b>low</b> concentration.</div>
          <p>Oxygen is small enough to slip straight through the phospholipids. Nobody pushes the particles: random movement alone spreads them out. Once both sides are about even, particles keep crossing both ways, but the numbers stay balanced. No energy is used, so this is passive transport.</p>`,
        fac:`<div class="def"><b>Facilitated diffusion</b> – movement of certain molecules through the cell membrane by a specialized <b>transport protein</b>.</div>
          <p>Glucose is too big to get through the phospholipids, so it can only cross through the purple transport proteins. It still goes from high to low concentration, and it still needs no energy. ${cfg.prot===0?"<b>With 0 proteins, nothing crosses at all.</b>":"Try 0 proteins, then 4. More proteins means faster crossing."}</p>`,
        osmo:`<div class="def"><b>Osmosis</b> – movement of <b>water</b> molecules from an area of <b>low</b> solute concentration to an area of <b>high</b> solute concentration.</div>
          <p>The purple solute particles can't cross the membrane, but the blue water can. Watch the water level rise on the side with more solute. Notice that it is the water moving across the membrane, not the solute particles! ${cfg.solL===cfg.solR?"<b>Both sides have the same solute, so there's no net flow and the water levels stay about even.</b> They wobble a little because the particles move at random.":"Try making the solute the same on both sides."}</p>`,
        active:`<div class="def"><b>Active transport</b> – moving substances across the cell membrane from areas of <b>low</b> concentration to <b>high</b> concentration, using energy.</div>
          <p>There are already more particles inside than outside, so diffusion would never move them in. The pump (a carrier protein) uses one ATP each time it pushes a particle in, even against the concentration gradient. When the ATP runs out, the pump stops. Recall: the mitochondria make ATP from sugar.</p>`
      };
      txt.innerHTML=D[tab];
    }

    function show(k){ tab=k; cfg={}; running=true;
      el.querySelectorAll("[data-tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===k))); fit(); setup(); }
    el.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>show(b.dataset.tab));

    function loop(ts){
      if(!document.body.contains(cv)){ cancelAnimationFrame(raf); window.removeEventListener("resize",fit); return; }
      const dt=last?Math.min(0.05,(ts-last)/1000):0; last=ts;
      if(running&&!document.hidden){ step(dt); readout(false); }
      draw(); raf=requestAnimationFrame(loop);
    }
    window.addEventListener("resize",fit);
    show("perm"); raf=requestAnimationFrame(loop);
    el.membraneLab={get P(){return P;},get tab(){return tab;},get lvl(){return lvl;},get atp(){return atp;},step,count};
  }
  window.HUB.lessonTools = Object.assign(window.HUB.lessonTools||{}, {"cells/transport": membraneLab});

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
