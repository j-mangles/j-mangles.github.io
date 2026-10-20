/* Science tools: Cell Explorer (Cells unit) and Metric Converter practice (Science Skills unit). */
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
  function cellSVG(type){
    const plant = type==="plant";
    const C = {
      wall:"#8DB36B", mem:"#3E7C59", cyto:plant?"#EEF6E3":"#F7EEE6", vac:"#CFE6F2", vacS:"#7FB2CF",
      nuc:"#B9A3D6", nucS:"#6D5596", nucl:"#7E62A8", mito:"#F2B48C", mitoS:"#B86A3E", chl:"#5FA35A", chlS:"#2F6B2C",
      er:"#C98FB0", golgi:"#E3C065"
    };
    let s = `<svg viewBox="0 0 420 300" role="img" aria-label="${plant?"Plant":"Animal"} cell diagram" style="width:100%;height:auto;display:block">`;
    if(plant){
      s += `<g data-o="wall" class="org"><rect x="10" y="10" width="400" height="280" rx="18" fill="${C.wall}" stroke="#5E8A43" stroke-width="2"/></g>`;
      s += `<g data-o="membrane" class="org"><rect x="24" y="24" width="372" height="252" rx="12" fill="none" stroke="${C.mem}" stroke-width="5"/></g>`;
      s += `<g data-o="cytoplasm" class="org"><rect x="27" y="27" width="366" height="246" rx="10" fill="${C.cyto}"/></g>`;
      s += `<g data-o="vacuole" class="org"><path d="M150 70 C 230 50, 330 60, 350 110 C 370 170, 330 235, 250 240 C 175 245, 140 200, 145 150 C 148 115, 120 85, 150 70 Z" fill="${C.vac}" stroke="${C.vacS}" stroke-width="2"/></g>`;
      [[60,60,0],[300,250,20],[370,150,90],[56,230,-20],[200,258,0]].forEach(([x,y,r])=>{
        s += `<g data-o="chloro" class="org" transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="20" ry="10" fill="${C.chl}" stroke="${C.chlS}" stroke-width="1.5"/><path d="M-12 -2 h24 M-12 3 h24" stroke="#2F6B2C" stroke-width="1.2"/></g>`;});
      s += nucleusAt(85,150,C) + erNear(85,150,C) + golgiAt(345,64,C) + mitoAt(110,250,30,C) + mitoAt(250,40,-10,C);
    } else {
      s += `<g data-o="membrane" class="org"><path d="M60 60 C 140 0, 300 10, 370 70 C 430 130, 400 250, 300 280 C 190 310, 70 280, 35 200 C 10 140, 25 90, 60 60 Z" fill="none" stroke="${C.mem}" stroke-width="5"/></g>`;
      s += `<g data-o="cytoplasm" class="org"><path d="M62 63 C 140 5, 298 14, 366 72 C 424 130, 396 246, 298 276 C 190 306, 72 276, 39 200 C 15 140, 30 92, 62 63 Z" fill="${C.cyto}"/></g>`;
      [[300,90,14],[330,200,10],[95,215,11],[250,240,9]].forEach(([x,y,r])=>{s += `<g data-o="vacuole" class="org"><circle cx="${x}" cy="${y}" r="${r}" fill="${C.vac}" stroke="${C.vacS}" stroke-width="1.5"/></g>`;});
      s += nucleusAt(200,150,C) + erNear(200,150,C) + golgiAt(300,145,C) + mitoAt(110,110,25,C) + mitoAt(170,250,-15,C) + mitoAt(355,135,80,C);
    }
    s += `<g id="lbl"></g></svg>`;
    return s;
  }
  function nucleusAt(x,y,C){return `<g data-o="nucleus" class="org"><circle cx="${x}" cy="${y}" r="34" fill="${C.nuc}" stroke="${C.nucS}" stroke-width="2.5"/><circle cx="${x+6}" cy="${y-4}" r="10" fill="${C.nucl}"/></g>`;}
  function erNear(x,y,C){return `<g data-o="er" class="org" fill="none" stroke="${C.er}" stroke-width="4" stroke-linecap="round"><path d="M${x+36} ${y-18} q 12 10 0 20 q -12 10 0 20"/><path d="M${x+46} ${y-26} q 14 14 0 28 q -14 14 0 28"/><path d="M${x+56} ${y-30} q 16 16 0 32 q -16 16 0 32"/><rect x="${x+30}" y="${y-36}" width="44" height="76" fill="transparent" stroke="none"/></g>`;}
  function golgiAt(x,y,C){return `<g data-o="golgi" class="org" fill="none" stroke="${C.golgi}" stroke-width="5" stroke-linecap="round"><path d="M${x-22} ${y-10} q 22 -14 44 0"/><path d="M${x-24} ${y} q 24 -14 48 0"/><path d="M${x-22} ${y+10} q 22 -14 44 0"/><path d="M${x-18} ${y+20} q 18 -12 36 0"/><rect x="${x-26}" y="${y-20}" width="52" height="44" fill="transparent" stroke="none"/></g>`;}
  function mitoAt(x,y,r,C){return `<g data-o="mito" class="org" transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="24" ry="11" fill="${C.mito}" stroke="${C.mitoS}" stroke-width="2"/><path d="M-16 0 q 4 -8 8 0 q 4 8 8 0 q 4 -8 8 0 q 4 8 8 0" fill="none" stroke="${C.mitoS}" stroke-width="1.5"/></g>`;}

  window.HUB.tools = window.HUB.tools || {};
  window.HUB.tools.cells = function(el){
    let type="plant", mode="explore", sel=null, target=null, score=0, tries=0;
    el.innerHTML = `<div class="eyebrow">Interactive diagram</div><h2>Cell Explorer</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 12px">
        <button class="btn ghost" id="t-plant">Plant cell</button><button class="btn ghost" id="t-animal">Animal cell</button>
        <span style="flex:1"></span>
        <button class="btn ghost" id="m-explore">Explore</button><button class="btn ghost" id="m-quiz">Quiz</button>
      </div>
      <div id="cellbox"></div><div id="cellinfo" style="min-height:96px;margin-top:12px"></div>
      <style>
        #cellbox .org{cursor:pointer;transition:opacity .15s}
        #cellbox svg:hover .org{opacity:.88}#cellbox svg .org:hover{opacity:1}
        #cellbox .org.on>*{filter:drop-shadow(0 0 4px var(--accent))}
        .seg-on{background:var(--navy)!important;color:var(--paper)!important;border-color:var(--navy)!important}
      </style>`;
    const box=el.querySelector("#cellbox"), info=el.querySelector("#cellinfo");
    const present=()=>Object.keys(ORG).filter(k=>type==="plant"||!ORG[k].plant);
    function newTarget(){ const list=present().filter(k=>k!==target); target=list[Math.floor(Math.random()*list.length)]; }
    function draw(){
      box.innerHTML=cellSVG(type);
      ["plant","animal"].forEach(t=>el.querySelector("#t-"+t).classList.toggle("seg-on",type===t));
      ["explore","quiz"].forEach(m=>el.querySelector("#m-"+m).classList.toggle("seg-on",mode===m));
      box.querySelectorAll(".org").forEach(g=>{
        g.addEventListener("click",ev=>{ev.stopPropagation(); pick(g.dataset.o);});
        if(sel&&g.dataset.o===sel&&mode==="explore") g.classList.add("on");
      });
      showInfo();
    }
    function pick(o){
      if(mode==="explore"){ sel=o; draw(); return; }
      tries++; const ok=o===target; if(ok) score++;
      info.innerHTML=`<p style="margin:0;font-weight:700;color:${ok?"var(--good)":"var(--bad)"}">${ok?"Correct!":"That's the "+esc(ORG[o].name)+"."}</p>
        <p style="margin:4px 0 0">${esc(ORG[target].name)}: ${esc(ORG[target].job)}</p>
        <p class="note" style="margin:8px 0 0">Score ${score} of ${tries} · <button class="btn ghost" id="nextq" style="padding:5px 10px">Next</button></p>`;
      el.querySelector("#nextq").onclick=()=>{newTarget(); showInfo();};
    }
    function showInfo(){
      if(mode==="quiz"){ if(!target||!present().includes(target)) newTarget();
        info.innerHTML=`<p style="margin:0" class="note">Click the part of the ${type} cell that is the…</p><p style="margin:2px 0 0;font-family:var(--f-title);font-size:26px;font-weight:700">${esc(ORG[target].name)}</p><p class="note" style="margin:6px 0 0">Score ${score} of ${tries}</p>`; return; }
      if(!sel){ info.innerHTML=`<p class="note" style="margin:0">Click any part of the cell to see what it is and what it does. A ${type} cell has ${present().length} major organelles.</p>`; return; }
      const d=ORG[sel];
      info.innerHTML=`<p style="margin:0;font-family:var(--f-title);font-size:24px;font-weight:700">${esc(d.name)}</p><p style="margin:4px 0 0">${esc(d.job)}</p>${d.plant?`<p class="note" style="margin:6px 0 0">Found in plant cells, not animal cells.</p>`:""}`;
    }
    el.querySelector("#t-plant").onclick=()=>{type="plant";sel=null;draw();};
    el.querySelector("#t-animal").onclick=()=>{type="animal";sel=null;if(ORG[target]&&ORG[target].plant)target=null;draw();};
    el.querySelector("#m-explore").onclick=()=>{mode="explore";draw();};
    el.querySelector("#m-quiz").onclick=()=>{mode="quiz";sel=null;target=null;score=0;tries=0;draw();};
    draw();
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
