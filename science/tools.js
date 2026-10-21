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
  function explorer(el){
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
        .seg-on{background:var(--btn)!important;color:var(--on-btn)!important;border-color:var(--btn)!important}
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
