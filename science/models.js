/* Science: live models for lesson pages (Metabolism Lab, Blood Flow).
   Each registers itself in window.HUB.lessonTools["unit/lesson"] and is drawn by hub.js under the lesson's big idea. */
(function(){
  const H0 = window.HUB; if(!H0) return;
  const esc = s => String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const rnd = (a,b) => a+Math.random()*(b-a);

  const STYLE = `<style>
    .mx-tabs{display:flex;flex-wrap:wrap;gap:4px;padding:4px;background:var(--soft);border-radius:16px}
    .mx-tabs button{border:0;background:none;padding:7px 12px;border-radius:12px;cursor:pointer;font-size:14.5px;font-weight:600;color:var(--muted)}
    .mx-tabs button[aria-selected="true"]{background:var(--paper);color:var(--ink);box-shadow:0 1px 3px rgba(20,20,40,.14)}
    .mx-ctl{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin:12px 0 10px}
    .mx-ctl .btn{padding:7px 14px;font-size:14.5px}
    .mx-seg{display:inline-flex;padding:3px;background:var(--soft);border-radius:980px;flex-wrap:wrap}
    .mx-seg button{border:0;background:none;padding:6px 12px;border-radius:980px;font-size:14px;font-weight:600;color:var(--muted);cursor:pointer}
    .mx-seg button.on{background:var(--paper);color:var(--ink);box-shadow:0 1px 3px rgba(20,20,40,.14)}
    .mx-ctl label{font-size:14.5px;color:var(--muted);display:inline-flex;align-items:center;gap:8px}
    .mx-ctl input[type=range]{accent-color:var(--accent);width:150px}
    .mx-stage{border:1px solid var(--rule);border-radius:12px;overflow:hidden;background:#fff;line-height:0}
    .mx-stage canvas{display:block;width:100%}
    .mx-read{margin-top:10px;font-size:15px;display:flex;flex-wrap:wrap;gap:6px 18px;align-items:center}
    .mx-read b{font-variant-numeric:tabular-nums}
    .mx-txt{margin-top:12px;font-size:16px;line-height:1.5}
    .mx-txt .def{background:var(--task,var(--accent-soft));border-radius:10px;padding:10px 14px;margin:0 0 8px}
    .mx-txt p{margin:6px 0 0}
    .mx-chip{display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:600;padding:3px 10px;border-radius:980px;background:var(--soft);color:var(--muted)}
    .mx-chip.on{background:#E3F4EA;color:#1E7A4B}
    .mx-eq{display:grid;gap:8px;margin-top:12px}
    .mx-eq div{border:1px solid var(--rule);border-radius:10px;padding:9px 12px;font-size:15px;line-height:1.45;transition:border-color .2s,background .2s}
    .mx-eq div.on{border-color:#1E8A5A;background:#F2FAF5}
    .mx-eq .tag{float:right;margin-left:8px}
    .mx-graph{margin-top:12px}
    .mx-graph svg{width:100%;height:auto;display:block}
  </style>`;

  function fitCanvas(cv,ctx,W,H){ const w=cv.parentElement.clientWidth||560, dpr=window.devicePixelRatio||1, s=w/W;
    cv.width=Math.round(w*dpr); cv.height=Math.round(H*s*dpr); cv.style.height=(H*s)+"px"; ctx.setTransform(s*dpr,0,0,s*dpr,0,0); return s; }
  function rr(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
  function loopOn(cv,frame){ let last=0, raf=0; function f(ts){ if(!document.body.contains(cv)){ cancelAnimationFrame(raf); return; }
      const dt=last?Math.min(0.05,(ts-last)/1000):0; last=ts; frame(document.hidden?0:dt); raf=requestAnimationFrame(f); } raf=requestAnimationFrame(f); }

  /* ======================= METABOLISM LAB ======================= */
  const ENZ = {
    pepsin:{name:"Pepsin",where:"stomach",best:2,sd:0.89,col:"#E0703A",food:"protein",foodCol:"#E58FA6"},
    amylase:{name:"Amylase",where:"saliva",best:7,sd:1.0,col:"#5968E8",food:"starch",foodCol:"#E9D9A6"},
    trypsin:{name:"Trypsin",where:"small intestine",best:8.3,sd:0.95,col:"#17917F",food:"protein",foodCol:"#E58FA6"}
  };
  const act = (e,pH) => Math.exp(-Math.pow(pH-ENZ[e].best,2)/(2*ENZ[e].sd*ENZ[e].sd));
  const PRESETS = [["Stomach",2],["Mouth",7],["Small intestine",8]];
  const EXPECT = 74;   // food molecules an enzyme team breaks down in 10 s at its best pH (calibrated); used to turn counts into % of best
  function phColour(pH){ // like universal indicator: red (acid) → green (neutral) → purple (basic)
    const stops=[[0,[231,76,60]],[3,[243,156,18]],[5,[241,196,15]],[7,[88,190,96]],[9,[52,152,219]],[12,[142,68,173]]];
    for(let i=1;i<stops.length;i++){ if(pH<=stops[i][0]){ const [a,ca]=stops[i-1],[b,cb]=stops[i], t=(pH-a)/(b-a); return ca.map((v,k)=>Math.round(v+(cb[k]-v)*t)); } }
    return stops[stops.length-1][1];
  }

  function metabolismLab(el){
    let tab="enzyme";
    el.innerHTML=`<div class="eyebrow">Live models</div><h2>Metabolism Lab</h2>
      <p class="note" style="margin:4px 0 12px">Two virtual experiments. Change one thing at a time and watch what happens.</p>
      <div class="mx-tabs" role="tablist"><button role="tab" data-tab="enzyme">Enzymes &amp; pH</button><button role="tab" data-tab="jar">The sealed jar</button></div>
      <div id="mx-body"></div>${STYLE}`;
    const body=el.querySelector("#mx-body");
    function show(k){ tab=k; el.querySelectorAll("[data-tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===k)));
      const d=document.createElement("div"); body.replaceChildren(d); (k==="enzyme"?enzymeLab:jarLab)(d); }
    el.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>show(b.dataset.tab));
    show("enzyme");
  }

  /* ---- Enzymes & pH: run 10-second trials and graph your own results ---- */
  function enzymeLab(el){
    const W=600,H=300, X0=18,X1=582,Y0=46,Y1=288;
    let enz="amylase", pH=7, food=[], bits=[], E=[], flashes=[], trial=null, results=[], showCurve=false, broken=0;
    el.innerHTML=`<div class="mx-ctl">
        <span class="mx-seg" id="ez-e">${Object.keys(ENZ).map(k=>`<button data-e="${k}">${ENZ[k].name}</button>`).join("")}</span>
        <label>pH <input type="range" id="ez-ph" min="0" max="12" step="0.5" value="${pH}"> <b id="ez-phv" style="min-width:2.5em">${pH}</b></label>
        <span class="mx-seg" id="ez-pre">${PRESETS.map(([n,v])=>`<button data-p="${v}">${n} · ${v}</button>`).join("")}</span>
      </div>
      <div class="mx-stage"><canvas id="ez-cv" aria-label="Enzymes breaking down food molecules"></canvas></div>
      <div class="mx-read"><button class="btn" id="ez-run">Run a 10-second trial</button><span id="ez-stat"></span></div>
      <div class="mx-graph" id="ez-graph"></div>
      <div class="mx-ctl" style="margin-top:6px"><button class="btn ghost" id="ez-curve">Show the booklet curves</button><button class="btn ghost" id="ez-clear">Clear my results</button></div>
      <div class="mx-txt"><div class="def">The chemical reactions of metabolism are carried out by special proteins called <b>enzymes</b>, which speed up reactions inside the cell. Most work best within a narrow range of <b>pH</b>.</div>
        <p><b>Your job:</b> pick an enzyme, set a pH, and run a trial. Each result is plotted on your graph. Test several pH values for each enzyme, then compare your graph with the booklet curves. Your points will be a bit scattered, just like real lab data.</p>
        <p id="ez-hint" class="note"></p></div>`;
    const cv=el.querySelector("#ez-cv"), ctx=cv.getContext("2d");
    fitCanvas(cv,ctx,W,H); window.addEventListener("resize",()=>{ if(document.body.contains(cv)) fitCanvas(cv,ctx,W,H); });

    function newFood(edge){ const a=rnd(0,6.28); return {x:edge?(Math.random()<.5?X0+20:X1-20):rnd(X0+30,X1-30), y:rnd(Y0+20,Y1-20), vx:Math.cos(a)*28, vy:Math.sin(a)*28, ang:rnd(0,3.14), spin:rnd(-1,1)}; }
    function reset(){ food=[]; bits=[]; flashes=[]; for(let i=0;i<20;i++) food.push(newFood(false));
      E=[]; for(let i=0;i<12;i++){ const a=rnd(0,6.28); E.push({x:rnd(X0+30,X1-30),y:rnd(Y0+30,Y1-30),vx:Math.cos(a)*90,vy:Math.sin(a)*90,cool:0,wob:rnd(0,6)}); } }
    reset();

    function step(dt){
      const a=act(enz,pH);
      for(const f of food){ f.vx+=rnd(-1,1)*60*dt; f.vy+=rnd(-1,1)*60*dt; const s=Math.hypot(f.vx,f.vy); if(s>34){f.vx*=34/s;f.vy*=34/s;}
        f.x+=f.vx*dt; f.y+=f.vy*dt; f.ang+=f.spin*dt; if(f.x<X0+22||f.x>X1-22) f.vx*=-1; if(f.y<Y0+22||f.y>Y1-22) f.vy*=-1;
        f.x=Math.max(X0+22,Math.min(X1-22,f.x)); f.y=Math.max(Y0+22,Math.min(Y1-22,f.y)); }
      for(const e of E){ e.vx+=rnd(-1,1)*500*dt; e.vy+=rnd(-1,1)*500*dt; const s=Math.hypot(e.vx,e.vy); if(s>110){e.vx*=110/s;e.vy*=110/s;} if(s<70){e.vx*=1.1;e.vy*=1.1;}
        e.x+=e.vx*dt; e.y+=e.vy*dt; e.wob+=dt*3; e.cool-=dt;
        if(e.x<X0+14){e.x=X0+14;e.vx=Math.abs(e.vx);} if(e.x>X1-14){e.x=X1-14;e.vx=-Math.abs(e.vx);} if(e.y<Y0+14){e.y=Y0+14;e.vy=Math.abs(e.vy);} if(e.y>Y1-14){e.y=Y1-14;e.vy=-Math.abs(e.vy);}
        if(e.cool>0) continue;
        for(let i=0;i<food.length;i++){ const f=food[i]; if(Math.hypot(f.x-e.x,f.y-e.y)<30){
          e.cool=0.25;
          if(Math.random()<a*0.85){ // the enzyme grabs the molecule and splits it
            for(let k=0;k<4;k++){ const off=(k-1.5)*10; bits.push({x:f.x+Math.cos(f.ang)*off,y:f.y+Math.sin(f.ang)*off,vx:Math.cos(f.ang)*off*4+rnd(-20,20),vy:Math.sin(f.ang)*off*4+rnd(-20,20),life:1.6}); }
            flashes.push({x:f.x,y:f.y,t:0}); food.splice(i,1); food.push(newFood(true)); if(trial&&trial.t<10) trial.n++; broken++;
          } else { e.vx*=-1; e.vy*=-1; }
          break; } }
      }
      bits=bits.filter(b=>{ b.x+=b.vx*dt; b.y+=b.vy*dt; b.vx*=0.97; b.vy*=0.97; return (b.life-=dt)>0; });
      flashes=flashes.filter(f=>(f.t+=dt)<0.4);
      if(trial){ trial.t+=dt; if(trial.t>=10){ const pct=Math.min(100,Math.round(trial.n/EXPECT*100)); results.push({e:enz,pH,n:trial.n,pct}); trial=null; drawGraph(); stat(`Done: ${ENZ[enz].name} at pH ${pH} broke down <b>${results[results.length-1].n}</b> food molecules in 10 s (<b>${pct}%</b> of its best). Plotted on your graph.`); el.querySelector("#ez-run").disabled=false; hint(); } else stat(`Trial running… <b>${Math.max(0,10-trial.t).toFixed(1)} s</b> left · broken down: <b>${trial.n}</b>`); }
    }
    function enzymeShape(e,a,col){
      const r=13, bad=a<0.35, dir=Math.atan2(e.vy,e.vx);
      ctx.save(); ctx.translate(e.x,e.y); ctx.rotate(dir);
      ctx.beginPath();
      if(bad){ for(let i=0;i<=24;i++){ const t=i/24*6.283, rr2=r+Math.sin(t*3+e.wob)*3+Math.sin(t*5)*1.5; ctx.lineTo(Math.cos(t)*rr2,Math.sin(t)*rr2); } }
      else { const m=0.55*Math.min(1,a+0.2); ctx.moveTo(0,0); ctx.arc(0,0,r,m,6.283-m); ctx.closePath(); }
      ctx.fillStyle=col; ctx.globalAlpha=bad?0.55:1; ctx.fill(); ctx.globalAlpha=1; ctx.lineWidth=1.5; ctx.strokeStyle="rgba(0,0,0,.25)"; ctx.stroke();
      ctx.fillStyle="rgba(255,255,255,.4)"; ctx.beginPath(); ctx.arc(-4,-5,3.5,0,6.283); ctx.fill();
      ctx.restore();
    }
    function draw(){
      ctx.clearRect(0,0,W,H);
      const c=phColour(pH); ctx.fillStyle=`rgba(${c[0]},${c[1]},${c[2]},.16)`; rr(ctx,X0,Y0,X1-X0,Y1-Y0,14); ctx.fill();
      ctx.strokeStyle=`rgba(${c[0]},${c[1]},${c[2]},.65)`; ctx.lineWidth=2; ctx.stroke();
      ctx.font="600 13px Inter,system-ui,sans-serif"; ctx.textBaseline="middle"; ctx.fillStyle="#4A4E5A"; ctx.textAlign="left";
      ctx.fillText(`${ENZ[enz].name.toUpperCase()} + ${ENZ[enz].food.toUpperCase()}`,X0,22);
      ctx.textAlign="right"; ctx.fillStyle=`rgb(${c[0]*0.75|0},${c[1]*0.75|0},${c[2]*0.75|0})`; ctx.fillText(`pH ${pH} · ${pH<6.5?"acidic":pH>7.5?"basic":"neutral"}`,X1,22);
      const fc=ENZ[enz].foodCol;
      for(const f of food){ for(let k=0;k<4;k++){ const off=(k-1.5)*10; ctx.beginPath(); ctx.arc(f.x+Math.cos(f.ang)*off,f.y+Math.sin(f.ang)*off,5.5,0,6.283); ctx.fillStyle=fc; ctx.fill(); ctx.lineWidth=1.2; ctx.strokeStyle="rgba(0,0,0,.25)"; ctx.stroke(); } }
      for(const b of bits){ ctx.globalAlpha=Math.min(1,b.life); ctx.beginPath(); ctx.arc(b.x,b.y,4,0,6.283); ctx.fillStyle=fc; ctx.fill(); } ctx.globalAlpha=1;
      for(const f of flashes){ ctx.globalAlpha=1-f.t/0.4; ctx.strokeStyle="#F2B42A"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(f.x,f.y,10+f.t*60,0,6.283); ctx.stroke(); } ctx.globalAlpha=1;
      const a=act(enz,pH); for(const e of E) enzymeShape(e,a,ENZ[enz].col);
    }
    function stat(h){ el.querySelector("#ez-stat").innerHTML=h; }
    function hint(){ const n=new Set(results.map(r=>r.e)).size, h=el.querySelector("#ez-hint");
      h.textContent = !results.length ? "Tip: start at the pH of the place where the enzyme normally works, then try a few far away from it."
        : results.length<5 ? `${results.length} trial${results.length>1?"s":""} so far. Try more pH values to see the shape of the graph.`
        : n<3 ? "Nice. Now test the other enzymes and see where each one peaks." : "Turn on the booklet curves. Do your results follow the same shapes?"; }
    function drawGraph(){
      const gw=600, gh=250, m={l:52,r:14,t:14,b:44}, iw=gw-m.l-m.r, ih=gh-m.t-m.b, X=v=>m.l+v/12*iw, Y=v=>m.t+ih-v/100*ih;
      let s=`<svg viewBox="0 0 ${gw} ${gh}" role="img" aria-label="Your enzyme results graph">`;
      for(let v=0;v<=100;v+=25) s+=`<line x1="${m.l}" x2="${gw-m.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="#E3E5EC"/><text x="${m.l-8}" y="${Y(v)+4}" text-anchor="end" font-size="12" fill="#6B6E79">${v}</text>`;
      for(let v=0;v<=12;v+=1) s+=`<text x="${X(v)}" y="${m.t+ih+18}" text-anchor="middle" font-size="12" fill="#6B6E79">${v}</text>`;
      s+=`<line x1="${m.l}" x2="${gw-m.r}" y1="${m.t+ih}" y2="${m.t+ih}" stroke="#9AA0AE"/><line x1="${m.l}" x2="${m.l}" y1="${m.t}" y2="${m.t+ih}" stroke="#9AA0AE"/>`;
      s+=`<text x="${m.l+iw/2}" y="${gh-6}" text-anchor="middle" font-size="12.5" fill="#4A4E5A" font-weight="600">pH</text><text transform="translate(14 ${m.t+ih/2}) rotate(-90)" text-anchor="middle" font-size="12.5" fill="#4A4E5A" font-weight="600">Enzyme activity (% of best)</text>`;
      if(showCurve) Object.keys(ENZ).forEach(k=>{ let d=""; for(let i=0;i<=120;i++){ const x=i/10; d+=(i?"L":"M")+X(x).toFixed(1)+" "+Y(act(k,x)*100).toFixed(1); } s+=`<path d="${d}" fill="none" stroke="${ENZ[k].col}" stroke-width="2.5" opacity=".45" stroke-dasharray="7 5"/>`; });
      results.forEach(r=>{ s+=`<circle cx="${X(r.pH).toFixed(1)}" cy="${Y(r.pct).toFixed(1)}" r="6" fill="${ENZ[r.e].col}" stroke="#fff" stroke-width="2"/>`; });
      if(!results.length) s+=`<text x="${m.l+iw/2}" y="${m.t+ih/2}" text-anchor="middle" font-size="14" fill="#9AA0AE">Run a trial to plot your first point</text>`;
      s+=`</svg><div style="display:flex;flex-wrap:wrap;gap:6px 16px;font-size:14px;margin-top:4px">${Object.keys(ENZ).map(k=>`<span style="display:inline-flex;align-items:center;gap:6px"><i style="width:11px;height:11px;border-radius:50%;background:${ENZ[k].col};display:inline-block"></i>${ENZ[k].name} (${ENZ[k].where})</span>`).join("")}</div>`;
      el.querySelector("#ez-graph").innerHTML=s;
    }
    function controls(){
      el.querySelectorAll("[data-e]").forEach(b=>b.classList.toggle("on",b.dataset.e===enz));
      el.querySelectorAll("[data-p]").forEach(b=>b.classList.toggle("on",+b.dataset.p===pH));
      el.querySelector("#ez-ph").value=pH; el.querySelector("#ez-phv").textContent=pH; }
    el.querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>{ if(trial) return; enz=b.dataset.e; controls(); reset(); });
    el.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{ if(trial) return; pH=+b.dataset.p; controls(); });
    el.querySelector("#ez-ph").addEventListener("input",e=>{ if(trial){ e.target.value=pH; return; } pH=+e.target.value; controls(); });
    el.querySelector("#ez-run").onclick=()=>{ reset(); trial={t:0,n:0}; el.querySelector("#ez-run").disabled=true; };
    el.querySelector("#ez-curve").onclick=()=>{ showCurve=!showCurve; el.querySelector("#ez-curve").textContent=showCurve?"Hide the booklet curves":"Show the booklet curves"; drawGraph(); };
    el.querySelector("#ez-clear").onclick=()=>{ results=[]; drawGraph(); hint(); };
    controls(); drawGraph(); hint(); stat("Pick an enzyme and a pH, then run a trial.");
    loopOn(cv,dt=>{ step(dt); draw(); });
    el.enzymeLab={get results(){return results;}, run(e,p){enz=e;pH=p;controls();reset();trial={t:0,n:0};}, step, get trial(){return trial;}};
  }

  /* ---- The sealed jar: a plant and a mouse sharing the same air (Priestley, 1771) ---- */
  function jarLab(el){
    const W=600,H=330, JX=40,JY=40,JW=520,JH=270, N=70;
    let plant=true, mouse=true, light=1, gas={o2:50,co2:50}, hist=[], ht=0, dots=[], movers=[], acc={p:0,r:0,m:0}, running=true, t=0;
    el.innerHTML=`<div class="mx-ctl">
        <span class="mx-seg"><button id="jr-plant">Plant</button><button id="jr-mouse">Mouse</button></span>
        <span class="mx-seg" id="jr-light">${[["Dark",0],["Dim",0.45],["Bright",1]].map(([n,v])=>`<button data-l="${v}">${n}</button>`).join("")}</span>
        <button class="btn" id="jr-play">Pause</button><button class="btn ghost" id="jr-reset">Reset the air</button>
      </div>
      <div class="mx-stage"><canvas id="jr-cv" aria-label="Sealed jar with a plant and a mouse"></canvas></div>
      <div class="mx-read" id="jr-read"></div>
      <div class="mx-stage" style="margin-top:10px"><canvas id="jr-ch" aria-label="Oxygen and carbon dioxide over time"></canvas></div>
      <div class="mx-eq"><div id="jr-ps"><span class="tag mx-chip" id="jr-ps-who"></span><b>Photosynthesis</b> (in chloroplasts): carbon dioxide + water + sunlight energy → sugar (glucose) + oxygen</div>
        <div id="jr-cr"><span class="tag mx-chip" id="jr-cr-who"></span><b>Cellular respiration</b> (in mitochondria): sugar (glucose) + oxygen → carbon dioxide + water + usable energy (ATP)</div></div>
      <div class="mx-txt"><p id="jr-msg"></p><p class="note">In 1771, scientist Joseph Priestley put a mouse in a sealed jar and found it soon ran short of air, but with a mint plant in the jar too, the air stayed good. This model lets you try his experiment safely. Click the Plant and Mouse buttons to put them in or take them out.</p></div>`;
    const cv=el.querySelector("#jr-cv"), ctx=cv.getContext("2d"), ch=el.querySelector("#jr-ch"), cx=ch.getContext("2d"), CW=600, CH=150;
    function fits(){ fitCanvas(cv,ctx,W,H); fitCanvas(ch,cx,CW,CH); } fits(); window.addEventListener("resize",()=>{ if(document.body.contains(cv)) fits(); });
    const PL={x:170,y:268}, MO={x:410,y:282};
    function reset(){ gas={o2:50,co2:50}; hist=[]; ht=0; t=0; movers=[]; acc={p:0,r:0,m:0}; dots=[];
      for(let i=0;i<N;i++){ const a=rnd(0,6.28); dots.push({x:rnd(JX+16,JX+JW-16),y:rnd(JY+16,JY+JH-60),vx:Math.cos(a)*30,vy:Math.sin(a)*30,k:i<N/2?"o2":"co2",busy:false}); } }
    reset();
    const rates=()=>{ const o=gas.o2/100, c=gas.co2/100;
      return { p: plant? 9*light*Math.min(1,c*3) : 0, r: plant? 1.2*Math.min(1,o*4) : 0, m: mouse? 4.2*Math.min(1,o*4) : 0 }; };
    function convert(from,to,org){ // one gas dot flies to the organism and comes back as the other gas
      const cand=dots.filter(d=>d.k===from&&!d.busy); if(!cand.length) return false;
      const d=cand[Math.floor(Math.random()*cand.length)]; d.busy=true; movers.push({d,org,to,t:0,x0:d.x,y0:d.y}); return true; }
    function step(dt){
      if(!running) return; t+=dt;
      const r=rates(), U=100/N;   // each dot is worth U units of gas
      gas.co2=Math.max(0,gas.co2-r.p*dt+r.r*dt+r.m*dt); gas.o2=Math.max(0,Math.min(100,100-gas.co2));
      acc.p+=r.p*dt; acc.r+=r.r*dt; acc.m+=r.m*dt;
      while(acc.p>=U){ acc.p-=U; if(!convert("co2","o2",PL)) break; }
      while(acc.r>=U){ acc.r-=U; if(!convert("o2","co2",PL)) break; }
      while(acc.m>=U){ acc.m-=U; if(!convert("o2","co2",MO)) break; }
      for(const d of dots){ if(d.busy) continue; d.vx+=rnd(-1,1)*90*dt; d.vy+=rnd(-1,1)*90*dt; const s=Math.hypot(d.vx,d.vy); if(s>45){d.vx*=45/s;d.vy*=45/s;}
        d.x+=d.vx*dt; d.y+=d.vy*dt; if(d.x<JX+10||d.x>JX+JW-10) d.vx*=-1; if(d.y<JY+12||d.y>JY+JH-12) d.vy*=-1;
        d.x=Math.max(JX+10,Math.min(JX+JW-10,d.x)); d.y=Math.max(JY+12,Math.min(JY+JH-12,d.y)); }
      movers=movers.filter(m=>{ m.t+=dt; const T=0.9; if(m.t<T/2){ const k=m.t/(T/2); m.d.x=m.x0+(m.org.x-m.x0)*k; m.d.y=m.y0+(m.org.y-40-m.y0)*k; }
        else { if(m.d.k!==m.to){ m.d.k=m.to; m.d.vx=rnd(-40,40); m.d.vy=-rnd(20,45); } const k=(m.t-T/2)/(T/2); m.d.y=m.org.y-40-k*30; }
        if(m.t>=T){ m.d.busy=false; return false; } return true; });
      ht+=dt; if(ht>=0.25){ ht=0; hist.push([gas.o2,gas.co2]); if(hist.length>240) hist.shift(); }
    }
    function drawPlant(g){ const {x,y}=PL, dim=0.45+0.55*light;
      ctx.save(); ctx.globalAlpha=1;
      ctx.fillStyle="#B5653B"; ctx.beginPath(); ctx.moveTo(x-30,y-4); ctx.lineTo(x+30,y-4); ctx.lineTo(x+22,y+30); ctx.lineTo(x-22,y+30); ctx.closePath(); ctx.fill();
      ctx.fillStyle="#8E4C2A"; ctx.fillRect(x-33,y-10,66,9);
      ctx.strokeStyle="#3F7F33"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x,y-8); ctx.quadraticCurveTo(x-6,y-60,x+2,y-110); ctx.stroke();
      const leaf=(lx,ly,a,s)=>{ ctx.save(); ctx.translate(lx,ly); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(s*20,0,22,9,0,0,6.283);
        ctx.fillStyle=`rgb(${Math.round(70*dim)},${Math.round(160*dim)},${Math.round(70*dim)})`; ctx.fill(); ctx.strokeStyle="rgba(30,80,30,.6)"; ctx.lineWidth=1.2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(s*38,0); ctx.stroke(); ctx.restore(); };
      leaf(x-3,y-40,-0.5,-1); leaf(x-2,y-58,0.45,1); leaf(x-1,y-78,-0.35,-1); leaf(x,y-96,0.5,1); leaf(x+2,y-110,-1.2,1);
      ctx.restore(); }
    function drawMouse(){ const {x,y}=MO, low=gas.o2<12;
      ctx.save(); ctx.translate(x,y);
      ctx.strokeStyle="#9C8F86"; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(-34,4); ctx.quadraticCurveTo(-62,0,-70,-18); ctx.stroke();
      ctx.fillStyle="#B9ADA4"; ctx.beginPath(); ctx.ellipse(0,0,36,20,0,0,6.283); ctx.fill();
      ctx.beginPath(); ctx.ellipse(34,-6,18,14,-0.2,0,6.283); ctx.fill();
      ctx.fillStyle="#B9ADA4"; ctx.beginPath(); ctx.arc(28,-20,9,0,6.283); ctx.fill();
      ctx.fillStyle="#E7B9B3"; ctx.beginPath(); ctx.arc(28,-20,5.5,0,6.283); ctx.fill();
      ctx.fillStyle="#4A3F3A"; if(low){ ctx.fillRect(36,-10,6,2); } else { ctx.beginPath(); ctx.arc(40,-9,2.6,0,6.283); ctx.fill(); }
      ctx.fillStyle="#E59A9A"; ctx.beginPath(); ctx.arc(51,-5,3,0,6.283); ctx.fill();
      if(low){ ctx.fillStyle="#C2373A"; ctx.font="700 12px Inter,system-ui,sans-serif"; ctx.textAlign="center"; ctx.fillText("low on oxygen!",8,-40); }
      ctx.restore(); }
    function draw(){
      ctx.clearRect(0,0,W,H);
      const tl=0.12+0.88*light, mix=(a,b)=>Math.round(a+(b-a)*tl); ctx.fillStyle=`rgb(${mix(46,250)},${mix(52,251)},${mix(70,253)})`; ctx.fillRect(0,0,W,H);
      if(light>0){ ctx.save(); ctx.globalAlpha=0.35+0.65*light; ctx.fillStyle="#FFC531"; ctx.beginPath(); ctx.arc(W-24,22,14,0,6.283); ctx.fill(); ctx.strokeStyle="#FFC531"; ctx.lineWidth=2.5;
        for(let i=0;i<8;i++){ const a=i/8*6.283; ctx.beginPath(); ctx.moveTo(W-24+Math.cos(a)*19,22+Math.sin(a)*19); ctx.lineTo(W-24+Math.cos(a)*(24+6*light),22+Math.sin(a)*(24+6*light)); ctx.stroke(); } ctx.restore(); }
      ctx.fillStyle="rgba(225,240,250,.35)"; rr(ctx,JX,JY,JW,JH,22); ctx.fill(); ctx.strokeStyle="rgba(110,150,180,.9)"; ctx.lineWidth=3; ctx.stroke();
      ctx.fillStyle="#7D8597"; rr(ctx,JX-8,JY-14,JW+16,16,5); ctx.fill();
      ctx.fillStyle="#fff"; ctx.globalAlpha=.35; rr(ctx,JX+14,JY+16,10,JH-60,5); ctx.fill(); ctx.globalAlpha=1;
      if(plant) drawPlant(); if(mouse) drawMouse();
      for(const d of dots){ ctx.beginPath(); ctx.arc(d.x,d.y,d.k==="o2"?5:5.5,0,6.283); ctx.fillStyle=d.k==="o2"?"#E0533F":"#5B6170"; ctx.fill();
        if(d.k==="co2"){ ctx.fillStyle="#9CA3B2"; ctx.beginPath(); ctx.arc(d.x-6,d.y,3,0,6.283); ctx.arc(d.x+6,d.y,3,0,6.283); ctx.fill(); } }
      if(!plant&&!mouse){ ctx.fillStyle="#4A4E5A"; ctx.font="600 15px Inter,system-ui,sans-serif"; ctx.textAlign="center"; ctx.fillText("Empty jar: nothing is using or making gases.",W/2,H/2); }
      if(!running){ ctx.fillStyle="rgba(255,255,255,.5)"; ctx.fillRect(0,0,W,H); ctx.fillStyle="#202126"; ctx.font="700 18px Inter,system-ui,sans-serif"; ctx.textAlign="center"; ctx.fillText("Paused",W/2,H/2); }
      // chart
      cx.clearRect(0,0,CW,CH); cx.fillStyle="#fff"; cx.fillRect(0,0,CW,CH);
      const L=44,R=CW-12,T=14,B=CH-26, Yc=v=>B-(v/100)*(B-T);
      cx.strokeStyle="#E3E5EC"; cx.lineWidth=1; cx.font="11px Inter,system-ui,sans-serif"; cx.fillStyle="#6B6E79"; cx.textAlign="right"; cx.textBaseline="middle";
      [0,50,100].forEach(v=>{ cx.beginPath(); cx.moveTo(L,Yc(v)); cx.lineTo(R,Yc(v)); cx.stroke(); cx.fillText(v+"%",L-6,Yc(v)); });
      cx.textAlign="left"; cx.fillText("time →",L,CH-10);
      const line=(i,col)=>{ cx.strokeStyle=col; cx.lineWidth=2.5; cx.beginPath(); hist.forEach((h,k)=>{ const xx=L+(R-L)*k/239; k?cx.lineTo(xx,Yc(h[i])):cx.moveTo(xx,Yc(h[i])); }); cx.stroke(); };
      line(0,"#E0533F"); line(1,"#5B6170");
      cx.font="600 12px Inter,system-ui,sans-serif"; cx.textAlign="right"; cx.fillStyle="#5B6170"; cx.fillText("carbon dioxide",R,CH-10); const cw=cx.measureText("carbon dioxide").width; cx.fillStyle="#E0533F"; cx.fillText("oxygen",R-cw-16,CH-10);
    }
    let rt=0;
    function readout(force){ if(!force&&performance.now()-rt<300) return; rt=performance.now();
      const r=rates();
      el.querySelector("#jr-read").innerHTML=`<span><span class="mx-chip" style="background:#FBE3DF;color:#B23A28">Oxygen <b>${Math.round(gas.o2)}%</b></span></span><span><span class="mx-chip" style="background:#E8EAF0;color:#3E4352">Carbon dioxide <b>${Math.round(gas.co2)}%</b></span></span><span class="note">of the gas in the jar (simplified)</span>`;
      const ps=el.querySelector("#jr-ps"), cr=el.querySelector("#jr-cr");
      ps.classList.toggle("on",r.p>0.01); cr.classList.toggle("on",r.r+r.m>0.01);
      el.querySelector("#jr-ps-who").textContent = r.p>0.01?"plant":"off"; el.querySelector("#jr-ps-who").className="tag mx-chip"+(r.p>0.01?" on":"");
      const who=[plant&&r.r>0.01?"plant":"",mouse&&r.m>0.01?"mouse":""].filter(Boolean).join(" + ");
      el.querySelector("#jr-cr-who").textContent = who||"off"; el.querySelector("#jr-cr-who").className="tag mx-chip"+(who?" on":"");
      let m="";
      if(!plant&&!mouse) m="Nothing living is in the jar, so the air doesn't change.";
      else if(mouse&&!plant) m= gas.o2<12 ? "<b>The mouse is running out of oxygen.</b> Its cells need oxygen for cellular respiration, and nothing in the jar is making more. Put the plant back in (with light) to fix the air."
          : "The mouse breathes in oxygen and breathes out carbon dioxide. Its cells use the oxygen for cellular respiration. Watch the oxygen line drop.";
      else if(plant&&light===0) m= "In the dark, the plant can't do photosynthesis. But it still does cellular respiration all the time, so it uses oxygen too."+(mouse?" With the mouse also breathing, the oxygen drops even faster.":"");
      else if(plant&&!mouse) m="In the light, the plant does photosynthesis faster than it does respiration, so it takes in carbon dioxide and gives off oxygen.";
      else { const bal=Math.abs(r.p-(r.r+r.m))<1.2; m= bal||gas.co2<8 ? "<b>Balanced.</b> The plant's photosynthesis makes the oxygen the mouse needs, and the mouse makes the carbon dioxide the plant needs. Notice the inputs of one process are the outputs of the other!" : "The plant and the mouse are trading gases. Give it time and see where the levels settle."; }
      el.querySelector("#jr-msg").innerHTML=m;
    }
    function controls(){ el.querySelector("#jr-plant").classList.toggle("on",plant); el.querySelector("#jr-mouse").classList.toggle("on",mouse); el.querySelector("#jr-plant").textContent="Plant: "+(plant?"in":"out"); el.querySelector("#jr-mouse").textContent="Mouse: "+(mouse?"in":"out");
      el.querySelectorAll("[data-l]").forEach(b=>b.classList.toggle("on",+b.dataset.l===light)); el.querySelector("#jr-play").textContent=running?"Pause":"Play";
      el.querySelector("#jr-plant").setAttribute("aria-pressed",String(plant)); el.querySelector("#jr-mouse").setAttribute("aria-pressed",String(mouse)); readout(true); }
    el.querySelector("#jr-plant").onclick=()=>{ plant=!plant; controls(); };
    el.querySelector("#jr-mouse").onclick=()=>{ mouse=!mouse; controls(); };
    el.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{ light=+b.dataset.l; controls(); });
    el.querySelector("#jr-play").onclick=()=>{ running=!running; controls(); };
    el.querySelector("#jr-reset").onclick=()=>{ reset(); readout(true); };
    controls();
    loopOn(cv,dt=>{ step(dt); readout(false); draw(); });
    el.jarLab={get gas(){return gas;}, set(o){ if("plant" in o) plant=o.plant; if("mouse" in o) mouse=o.mouse; if("light" in o) light=o.light; controls(); }, step, reset};
  }

  /* ======================= BLOOD FLOW ======================= */
  const OXY="#D2414B", DEOXY="#4A73C9";
  /* The loop a red blood cell travels, in order. ox: true = oxygenated, false = deoxygenated, "drop"/"pick" = changes here. */
  const ROUTE=[
    {id:"body",name:"Body capillaries",kind:"capillaries",ox:"drop",d:"M395 472 C 362 494, 336 452, 300 472 S 238 494, 205 472",
     info:"Capillaries: tiny blood vessels which exchange gases, nutrients, and wastes with cells located throughout the body. Your cell drops off its oxygen here and picks up carbon dioxide, so it becomes deoxygenated."},
    {id:"vc",name:"Vena cava",kind:"vein",ox:false,d:"M205 472 C 118 472, 104 410, 104 330 C 104 240, 140 200, 226 214",
     info:"The vena cava is a vein. It delivers deoxygenated blood from the body back to the heart."},
    {id:"ra",name:"Right atrium (heart chamber)",kind:"heart",ox:false,d:"M226 214 C 250 214, 262 232, 264 262",
     info:"Your cell enters the right side of the heart. The heart's four muscular chambers contract and relax to keep blood flowing."},
    {id:"rv",name:"Right ventricle (heart chamber)",kind:"heart",ox:false,d:"M264 262 C 262 300, 280 310, 288 290 C 292 262, 288 230, 286 186",
     info:"The right ventricle squeezes and pumps your cell out toward the lungs."},
    {id:"pa",name:"Pulmonary artery",kind:"artery",ox:false,d:"M286 186 C 284 140, 240 140, 214 108",
     info:"The pulmonary artery delivers deoxygenated blood from the heart to the lungs. It's one of the exceptions: an artery carrying deoxygenated blood. It's still an artery because it carries blood AWAY from the heart."},
    {id:"lungs",name:"Lung capillaries",kind:"capillaries",ox:"pick",d:"M214 108 C 230 62, 266 52, 300 72 S 370 62, 386 108",
     info:"In the lungs, your cell picks up oxygen and drops off carbon dioxide to be breathed out. This is where the circulatory and respiratory systems work together."},
    {id:"pv",name:"Pulmonary vein",kind:"vein",ox:true,d:"M386 108 C 404 146, 404 196, 376 218",
     info:"The pulmonary vein delivers oxygenated blood from the lungs to the heart. It's the other exception: a vein carrying oxygenated blood, because it carries blood TOWARD the heart."},
    {id:"la",name:"Left atrium (heart chamber)",kind:"heart",ox:true,d:"M376 218 C 350 220, 338 236, 336 262",
     info:"Your cell enters the left side of the heart, now full of oxygen."},
    {id:"lv",name:"Left ventricle (heart chamber)",kind:"heart",ox:true,d:"M336 262 C 338 300, 320 310, 312 290 C 308 262, 312 230, 314 186",
     info:"The left ventricle is the heart's strongest chamber. It pumps your cell out to the whole body."},
    {id:"ao",name:"Aorta",kind:"artery",ox:true,d:"M314 186 C 316 140, 360 120, 430 124 C 490 130, 500 200, 496 300 C 492 420, 450 472, 395 472",
     info:"The aorta is an artery. It moves oxygenated blood from the heart to the rest of the body."}
  ];
  const VESSELS=["vc","pa","pv","ao"];

  function bloodLab(el){
    let tab="flow";
    el.innerHTML=`<div class="eyebrow">Live models</div><h2>Blood Flow</h2>
      <p class="note" style="margin:4px 0 12px">Follow one red blood cell all the way around the body, then see how your heart responds to exercise.</p>
      <div class="mx-tabs" role="tablist"><button role="tab" data-tab="flow">Follow a blood cell</button><button role="tab" data-tab="hr">Heart rate &amp; exercise</button></div>
      <div id="mx-body"></div>${STYLE}`;
    const body=el.querySelector("#mx-body");
    function show(k){ tab=k; el.querySelectorAll("[data-tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===k)));
      const d=document.createElement("div"); body.replaceChildren(d); (k==="flow"?flowLab:heartRateLab)(d); }
    el.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>show(b.dataset.tab));
    show("flow");
  }

  function flowLab(el){
    const NS="http://www.w3.org/2000/svg";
    let mode="watch", playing=true, u=0, labels=true, quiz=null, score=0, asked=0, lastSeg=-1, beat=0;
    el.innerHTML=`<div class="mx-ctl">
        <span class="mx-seg" id="bf-mode"><button data-m="watch">Watch</button><button data-m="step">Step by step</button><button data-m="quiz">Quiz me</button></span>
        <button class="btn" id="bf-play">Pause</button><button class="btn ghost" id="bf-next" hidden>Next stop →</button>
        <button class="mx-chip" id="bf-lab" style="border:0;cursor:pointer">Labels: on</button>
      </div>
      <div class="mx-stage" style="background:#FBFBFD"><div id="bf-svg"></div></div>
      <div class="mx-txt" id="bf-cap" aria-live="polite"></div>
      <div class="mx-txt"><p class="note">Red = oxygenated blood. Blue = deoxygenated blood. In real life blood is always red: it's just darker red when it's low on oxygen. Diagrams use blue to make it easier to follow.</p></div>`;
    const vessel=(s)=>{ const col=s.ox===true?OXY:s.ox===false?DEOXY:`url(#bf-${s.id})`;
      return `<path d="${s.d}" fill="none" stroke="${col}" stroke-width="15" stroke-linecap="round" opacity=".9"/><path d="${s.d}" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".28"/>`; };
    const lab=(x,y,t,anchor="middle",cls="")=>`<text class="bf-lab ${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;
    let svg=`<svg viewBox="0 0 600 530" role="img" aria-label="Diagram of blood flow through the heart, lungs and body" style="width:100%;height:auto;display:block">
      <defs>
        <linearGradient id="bf-lungs" gradientUnits="userSpaceOnUse" x1="214" y1="0" x2="386" y2="0"><stop offset="0" stop-color="${DEOXY}"/><stop offset="1" stop-color="${OXY}"/></linearGradient>
        <linearGradient id="bf-body" gradientUnits="userSpaceOnUse" x1="395" y1="0" x2="205" y2="0"><stop offset="0" stop-color="${OXY}"/><stop offset="1" stop-color="${DEOXY}"/></linearGradient>
        <radialGradient id="bf-lung" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#FBD9DD"/><stop offset="1" stop-color="#EFAAB3"/></radialGradient>
      </defs>
      <style>.bf-lab{font:600 13.5px Inter,system-ui,sans-serif;fill:#2B2E38;paint-order:stroke;stroke:#FBFBFD;stroke-width:4px;stroke-linejoin:round}.bf-lab.small{font-size:12px;fill:#5A5E6B}.bf-hide .bf-vl{display:none}</style>
      <path d="M300 18 V 40" stroke="#C98A93" stroke-width="10" stroke-linecap="round"/>
      <ellipse cx="214" cy="88" rx="56" ry="46" fill="url(#bf-lung)" stroke="#D88893" stroke-width="2"/>
      <ellipse cx="386" cy="88" rx="56" ry="46" fill="url(#bf-lung)" stroke="#D88893" stroke-width="2"/>
      <path d="M300 38 C 290 50, 262 56, 246 74 M300 38 C 310 50, 338 56, 354 74" fill="none" stroke="#C98A93" stroke-width="6" stroke-linecap="round"/>
      <rect x="186" y="446" width="228" height="62" rx="16" fill="#F3EDE6" stroke="#D9CBBC" stroke-width="2"/>
      ${ROUTE.filter(s=>s.kind!=="heart"&&s.id!=="ao").map(vessel).join("")}
      <g id="bf-heart">
        <path d="M218 222 C 216 186, 262 178, 300 192 C 338 178, 384 186, 382 222 C 384 272, 352 316, 300 348 C 248 316, 216 272, 218 222 Z" fill="#E2A9AE" stroke="#A9464F" stroke-width="2.5"/>
        <path d="M226 230 C 226 206, 252 200, 270 204 C 286 208, 292 222, 290 238 C 278 250, 240 252, 226 230 Z" fill="#BFCCEC" stroke="#5E7BC0" stroke-width="2"/>
        <path d="M374 230 C 374 206, 348 200, 330 204 C 314 208, 308 222, 310 238 C 322 250, 360 252, 374 230 Z" fill="#F1BFC3" stroke="#BC4A55" stroke-width="2"/>
        <path d="M234 256 C 254 250, 280 252, 294 260 L 294 322 C 270 312, 240 290, 234 256 Z" fill="#A9BCE6" stroke="#5E7BC0" stroke-width="2"/>
        <path d="M366 256 C 346 250, 320 252, 306 260 L 306 322 C 330 312, 360 290, 366 256 Z" fill="#E59AA2" stroke="#BC4A55" stroke-width="2"/>
        <path d="M300 196 V 338" stroke="#8E3B44" stroke-width="3"/>
        <text class="bf-lab small" x="260" y="236" text-anchor="middle" style="font-size:10.5px">RA</text><text class="bf-lab small" x="340" y="236" text-anchor="middle" style="font-size:10.5px">LA</text>
        <text class="bf-lab small" x="266" y="300" text-anchor="middle" style="font-size:10.5px">RV</text><text class="bf-lab small" x="334" y="300" text-anchor="middle" style="font-size:10.5px">LV</text>
      </g>
      <path d="${ROUTE.find(s=>s.id==="ao").d}" fill="none" stroke="#FBFBFD" stroke-width="23" stroke-linecap="round"/>${vessel(ROUTE.find(s=>s.id==="ao"))}
      <g id="bf-hl"></g>
      <g id="bf-cells"></g>
      <g id="bf-labels">
        ${lab(214,94,"Lung")}${lab(386,94,"Lung")}${lab(300,500,"Body cells","middle","small")}${lab(300,484,"Body capillaries")}
        ${lab(300,148,"Lung capillaries","middle","small")}
        ${lab(232,368,"Right side","middle","small")}${lab(368,368,"Left side","middle","small")}${lab(300,384,"(the heart's own right and left)","middle","small")}
        <g class="bf-vl">${lab(92,330,"Vena cava","end")}${lab(236,156,"Pulmonary","end")}${lab(236,172,"artery","end")}${lab(410,180,"Pulmonary","start")}${lab(410,196,"vein","start")}${lab(508,300,"Aorta","start")}</g>
      </g>
    </svg>`;
    el.querySelector("#bf-svg").innerHTML=svg;
    const root=el.querySelector("svg"), cellsG=root.querySelector("#bf-cells"), hl=root.querySelector("#bf-hl"), heart=root.querySelector("#bf-heart");
    // measure each segment
    const segs=ROUTE.map(s=>{ const p=document.createElementNS(NS,"path"); p.setAttribute("d",s.d); return {...s,p,len:p.getTotalLength()}; });
    let total=0; segs.forEach(s=>{ s.start=total; total+=s.len; });
    const at=v=>{ v=((v%total)+total)%total; let i=segs.findIndex(s=>v<s.start+s.len); if(i<0) i=segs.length-1; const s=segs[i], k=(v-s.start)/s.len, pt=s.p.getPointAtLength(v-s.start); return {i,s,k,x:pt.x,y:pt.y}; };
    const colAt=(s,k)=> s.ox===true?OXY:s.ox===false?DEOXY: mix(s.ox==="pick"?DEOXY:OXY, s.ox==="pick"?OXY:DEOXY, Math.min(1,Math.max(0,(k-0.25)/0.5)));
    function mix(a,b,t){ const h=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16)), A=h(a),B=h(b); return "rgb("+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(",")+")"; }
    // flowing background cells + "your" cell
    const N=40, bg=[]; for(let i=0;i<N;i++){ const c=document.createElementNS(NS,"ellipse"); c.setAttribute("rx","4.6"); c.setAttribute("ry","3.6"); c.setAttribute("opacity",".85"); cellsG.appendChild(c); bg.push(c); }
    const me=document.createElementNS(NS,"g"); me.innerHTML=`<circle r="15" fill="none" stroke="#202126" stroke-width="2" stroke-dasharray="4 3"/><ellipse rx="9" ry="7" stroke="#fff" stroke-width="2.5"/><ellipse rx="3.5" ry="2.5" fill="rgba(0,0,0,.2)"/>`; cellsG.appendChild(me);
    const meBody=me.querySelector("ellipse");
    u=segs[1].start+5;   // start in the vena cava
    function speedAt(s){ return s.kind==="heart"?60:s.kind==="capillaries"?55:120; }
    let stopAt=null;
    function caption(i){ const s=segs[i]; const ox=s.ox===true?"oxygenated":s.ox===false?"deoxygenated":s.ox==="pick"?"picking up oxygen":"dropping off oxygen";
      const kind=s.kind==="heart"?"inside the heart":s.kind==="capillaries"?"capillaries":s.kind;
      el.querySelector("#bf-cap").innerHTML=`<div class="def"><span class="mx-chip" style="float:right;background:${s.ox===true?"#FBE3DF":s.ox===false?"#E1E8F7":"#EFE9F7"};color:${s.ox===true?"#A8323A":s.ox===false?"#33539A":"#5B4B86"}">${ox}</span><b>Now: ${esc(s.name)}</b> <span class="note">· ${esc(kind)}</span><p style="margin:6px 0 0">${esc(s.info)}</p></div>
        <p class="note">Stop ${i+1} of ${segs.length}${mode==="quiz"?` · Quiz score: ${score} of ${asked}`:""}</p>`; }
    function highlight(i){ hl.innerHTML=`<path d="${segs[i].d}" fill="none" stroke="#FFD34E" stroke-width="24" stroke-linecap="round" opacity=".45"/>`; }
    function askQuiz(i){ const s=segs[i]; playing=false; const opts=VESSELS.map(id=>segs.find(x=>x.id===id).name).sort(()=>Math.random()-.5);
      el.querySelector("#bf-cap").innerHTML=`<div class="def"><b>Quiz:</b> your cell is in the highlighted blood vessel. Which one is it?</div>
        <div class="opts" style="display:flex;flex-wrap:wrap;gap:8px">${opts.map(o=>`<button class="opt" data-a="${esc(o)}">${esc(o)}</button>`).join("")}</div>
        <p class="note" id="bf-fb" style="min-height:24px"></p>`;
      el.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{ asked++; const ok=b.dataset.a===s.name; if(ok) score++;
        el.querySelectorAll("[data-a]").forEach(x=>{ x.disabled=true; if(x.dataset.a===s.name) x.classList.add("right"); else if(x===b) x.classList.add("wrong"); });
        const ox=s.ox===true?"oxygenated":"deoxygenated";
        el.querySelector("#bf-fb").innerHTML=`${ok?"<b style=\"color:var(--good)\">Right!</b>":"<b style=\"color:var(--bad)\">Not quite.</b>"} It's the <b>${esc(s.name.toLowerCase())}</b>, carrying <b>${ox}</b> blood ${s.id==="vc"||s.id==="pv"?"toward":"away from"} the heart. Score: ${score} of ${asked}. <button class="btn ghost" id="bf-go" style="padding:5px 12px;margin-left:6px">Keep going</button>`;
        el.querySelector("#bf-go").onclick=()=>{ quiz=null; playing=true; u+=4; lastSeg=-1; controls(); };
      }); }
    function frame(dt){
      if(!document.body.contains(root)) return;
      beat+=dt*72/60; const ph=beat%1, sc=1+0.035*Math.max(0,Math.sin(ph*Math.PI*2))*(ph<0.5?1:0);
      heart.setAttribute("transform",`translate(300 260) scale(${sc.toFixed(3)}) translate(-300 -260)`);
      const cur=at(u);
      if(playing){ const sp=speedAt(cur.s); let nu=u+sp*dt;
        if(mode==="step"&&stopAt!=null&&nu>=stopAt){ nu=stopAt; playing=false; controls(); }
        if(mode==="quiz"){ for(const id of VESSELS){ const s=segs.find(x=>x.id===id), mid=s.start+s.len*0.5; const m=((mid%total)+total)%total, a=((u%total)+total)%total, b=a+sp*dt; if(a<m&&b>=m&&!quiz){ nu=u+(m-a); quiz=id; } } }
        u=nu; }
      const now=at(u);
      for(let i=0;i<N;i++){ const p=at(u+ (i+1)*total/(N+1)); bg[i].setAttribute("cx",p.x.toFixed(1)); bg[i].setAttribute("cy",p.y.toFixed(1)); bg[i].setAttribute("fill",colAt(p.s,p.k)); }
      me.setAttribute("transform",`translate(${now.x.toFixed(1)} ${now.y.toFixed(1)})`); meBody.setAttribute("fill",colAt(now.s,now.k));
      if(now.i!==lastSeg){ lastSeg=now.i; highlight(now.i); if(!quiz) caption(now.i); }
      if(quiz&&!el.querySelector("[data-a]")){ highlight(now.i); askQuiz(now.i); }
    }
    function controls(){
      el.querySelectorAll("[data-m]").forEach(b=>b.classList.toggle("on",b.dataset.m===mode));
      const play=el.querySelector("#bf-play"), next=el.querySelector("#bf-next");
      play.hidden=mode==="step"; next.hidden=mode!=="step"; play.textContent=playing?"Pause":"Play";
      next.disabled=playing;
      const showLabels=labels&&mode!=="quiz"; root.classList.toggle("bf-hide",!showLabels);
      const lb=el.querySelector("#bf-lab"); lb.textContent="Labels: "+(showLabels?"on":"off"); lb.hidden=mode==="quiz"; lb.classList.toggle("on",showLabels);
    }
    el.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{ mode=b.dataset.m; quiz=null; stopAt=null; lastSeg=-1;
      if(mode==="step"){ playing=false; } else playing=true; if(mode==="quiz"){ score=0; asked=0; }
      controls(); });
    el.querySelector("#bf-play").onclick=()=>{ if(quiz) return; playing=!playing; controls(); };
    el.querySelector("#bf-next").onclick=()=>{ const cur=at(u), a=((u%total)+total)%total, nx=segs[(cur.i+1)%segs.length]; let target=nx.start+nx.len*0.5; if(target<=a) target+=total; stopAt=u+(target-a); playing=true; controls(); };
    el.querySelector("#bf-lab").onclick=()=>{ labels=!labels; controls(); };
    controls();
    loopOn(root,frame);
    el.flowLab={get u(){return u;}, set u(v){u=v;}, at, segs, frame, get quiz(){return quiz;}, get mode(){return mode;}};
  }

  function heartRateLab(el){
    const REST=72, JOG=140, CW=600, CH=230, SPEED=15; // 1 real second = 15 seconds of body time
    let jogging=false, hr=REST, tmin=0, hist=[[0,REST]], beat=0, stopped=null, backAt=null, running=true;
    el.innerHTML=`<div class="mx-ctl"><button class="btn" id="hr-jog">Start jogging</button><button class="btn ghost" id="hr-play">Pause</button><button class="btn ghost" id="hr-reset">Start over</button></div>
      <div style="display:grid;grid-template-columns:minmax(120px,170px) 1fr;gap:14px;align-items:center" id="hr-grid">
        <div style="text-align:center"><svg viewBox="0 0 120 110" style="width:100%;max-width:150px" aria-hidden="true"><g id="hr-heart" transform="translate(60 56)"><path d="M0 -18 C -12 -36, -46 -32, -46 -6 C -46 18, -18 34, 0 48 C 18 34, 46 18, 46 -6 C 46 -32, 12 -36, 0 -18 Z" fill="#D2414B" stroke="#9E2F37" stroke-width="2.5"/><path d="M-30 -10 C -28 -22, -18 -24, -12 -20" stroke="#fff" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/></g></svg>
          <div style="font-size:40px;font-weight:700;line-height:1;font-variant-numeric:tabular-nums" id="hr-bpm">72</div><div class="note">beats per minute</div></div>
        <div><div class="mx-stage"><canvas id="hr-cv" aria-label="Your heart rate graph"></canvas></div></div>
      </div>
      <div class="mx-read" id="hr-read"></div>
      <div class="mx-txt" id="hr-txt"></div>`;
    const cv=el.querySelector("#hr-cv"), ctx=cv.getContext("2d");
    const fits=()=>{ fitCanvas(cv,ctx,CW,CH); el.querySelector("#hr-grid").style.gridTemplateColumns = el.clientWidth<480?"1fr":"minmax(120px,170px) 1fr"; };
    fits(); window.addEventListener("resize",()=>{ if(document.body.contains(cv)) fits(); });
    function words(){
      let m;
      if(jogging) m= hr<JOG-8 ? "<b>Jogging!</b> Your heart rate is climbing. Working muscle cells need more oxygen and nutrients, and need carbon dioxide carried away faster, so the heart pumps blood around the body faster."
                              : "Your heart rate has levelled off at about 140. The heart is now pumping fast enough to keep up with what your muscle cells need.";
      else if(stopped===null) m="Resting. Press <b>Start jogging</b> and watch the graph.";
      else { const since=tmin-stopped; if(hr<=REST+4&&backAt===null) backAt=since; m= backAt===null ? `You stopped ${since<1?"less than a minute":`${since.toFixed(1)} minutes`} ago. The extra demand is gone, so the body is bringing the heart rate back down.`
                              : `<b>Back to resting</b>, about ${Math.max(1,Math.round(backAt))} minutes after you stopped. Bringing the heart rate back to its normal, stable level is <b>homeostasis</b>: keeping conditions inside the body balanced.`; }
      el.querySelector("#hr-txt").innerHTML=`<div class="def"><b>Homeostasis</b> keeps the conditions inside your body stable and balanced, even when the world outside changes.</div><p>${m}</p>`;
      el.querySelector("#hr-read").innerHTML=`<span class="mx-chip ${jogging?"on":""}">${jogging?"jogging":"resting"}</span><span class="note">Graph time is sped up: 1 second on screen = ${SPEED} seconds in your body.</span>`;
    }
    function draw(){
      ctx.clearRect(0,0,CW,CH); ctx.fillStyle="#fff"; ctx.fillRect(0,0,CW,CH);
      const L=54,R=CW-14,T=14,B=CH-40, span=Math.max(14,Math.ceil(tmin)), X=m=>L+(R-L)*m/span, Y=b=>B-(b-60)/(160-60)*(B-T);
      ctx.font="11.5px Inter,system-ui,sans-serif"; ctx.fillStyle="#6B6E79"; ctx.strokeStyle="#E3E5EC"; ctx.lineWidth=1; ctx.textBaseline="middle";
      for(let b=60;b<=160;b+=20){ ctx.beginPath(); ctx.moveTo(L,Y(b)); ctx.lineTo(R,Y(b)); ctx.stroke(); ctx.textAlign="right"; ctx.fillText(b,L-8,Y(b)); }
      ctx.textAlign="center"; const stepM=span>20?4:2; for(let m=0;m<=span;m+=stepM) ctx.fillText(m,X(m),B+14);
      ctx.fillStyle="#4A4E5A"; ctx.font="600 12px Inter,system-ui,sans-serif"; ctx.fillText("Time (minutes)",(L+R)/2,CH-8);
      ctx.save(); ctx.translate(14,(T+B)/2); ctx.rotate(-Math.PI/2); ctx.fillText("Heart rate (bpm)",0,0); ctx.restore();
      ctx.strokeStyle="#D2414B"; ctx.lineWidth=2.8; ctx.beginPath(); hist.forEach(([m,b],i)=>{ i?ctx.lineTo(X(m),Y(b)):ctx.moveTo(X(m),Y(b)); }); ctx.stroke();
      const [lm,lb]=hist[hist.length-1]; ctx.fillStyle="#D2414B"; ctx.beginPath(); ctx.arc(X(lm),Y(lb),4.5,0,6.283); ctx.fill();
    }
    let wt=0;
    function frame(dt){
      if(!running) { draw(); return; }
      const bm=dt*SPEED/60; tmin+=bm;
      const target=jogging?JOG:REST, tau=jogging?0.9:1.8;  // minutes
      hr+= (target-hr)*(1-Math.exp(-bm/tau)) + (Math.random()-0.5)*0.4*dt*10;
      if(hist.length===0||tmin-hist[hist.length-1][0]>0.05) hist.push([tmin,hr]);
      beat+=dt*hr/60; const ph=beat%1, sc=1+0.12*Math.exp(-ph*9);
      el.querySelector("#hr-heart").setAttribute("transform",`translate(60 56) scale(${sc.toFixed(3)})`);
      el.querySelector("#hr-bpm").textContent=Math.round(hr);
      wt+=dt; if(wt>0.4){ wt=0; words(); }
      draw();
    }
    el.querySelector("#hr-jog").onclick=()=>{ jogging=!jogging; backAt=null; if(!jogging) stopped=tmin; else stopped=null; el.querySelector("#hr-jog").textContent=jogging?"Stop jogging":"Start jogging"; words(); };
    el.querySelector("#hr-play").onclick=()=>{ running=!running; el.querySelector("#hr-play").textContent=running?"Pause":"Play"; };
    el.querySelector("#hr-reset").onclick=()=>{ jogging=false; hr=REST; tmin=0; hist=[[0,REST]]; stopped=null; backAt=null; el.querySelector("#hr-jog").textContent="Start jogging"; words(); };
    words(); loopOn(cv,frame);
    el.hrLab={frame, get hr(){return hr;}, get tmin(){return tmin;}, jog(on){ if(on!==jogging) el.querySelector("#hr-jog").click(); }};
  }

  H0.lessonTools = Object.assign(H0.lessonTools||{}, {"cells/metabolism": metabolismLab, "cells/circulatory": bloodLab});
})();
