/* Interactive line chart for lesson pages. Drag or hover across the graph to read exact values.
   spec = { title, x:{label,min,max,step,unit}, y:{label,min,max,step,unit}, series:[{name,points:[[x,y],...] | fn:(x)=>y, dash, color}],
            bands:[{from,to,label}], labels:[{x,text}], start:x, note } */
(function(){
  const NS="http://www.w3.org/2000/svg";
  const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const PALETTE=["var(--accent)","#E0703A","#17917F","#B0478A"];
  const fmt=v=>{const r=Math.round(v*10)/10;return Number.isInteger(r)?String(r):r.toFixed(1);};

  function sample(s,x){
    if(s.fn) return s.fn(x);
    const p=s.points; if(x<=p[0][0]) return p[0][1]; if(x>=p[p.length-1][0]) return p[p.length-1][1];
    for(let i=1;i<p.length;i++){ if(x<=p[i][0]){ const [x0,y0]=p[i-1],[x1,y1]=p[i]; return y0+(y1-y0)*(x-x0)/(x1-x0);} }
  }

  window.LineChart=function(el,spec){
    const W=720,H=360,m={l:62,r:18,t:20,b:58};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const X=v=>m.l+(v-spec.x.min)/(spec.x.max-spec.x.min)*iw;
    const Y=v=>m.t+ih-(v-spec.y.min)/(spec.y.max-spec.y.min)*ih;
    const series=spec.series.map((s,i)=>({...s,color:s.color||PALETTE[i%PALETTE.length],on:true}));
    let cx=spec.start!=null?spec.start:spec.x.min;

    function pathFor(s){
      let pts=[];
      if(s.fn){ for(let k=0;k<=240;k++){const x=spec.x.min+(spec.x.max-spec.x.min)*k/240; pts.push([x,s.fn(x)]);} }
      else pts=s.points;
      return pts.map((p,k)=>(k?"L":"M")+X(p[0]).toFixed(1)+" "+Y(Math.max(spec.y.min,Math.min(spec.y.max,p[1]))).toFixed(1)).join(" ");
    }
    function draw(){
      let g="";
      (spec.bands||[]).forEach(b=>{ g+=`<rect x="${X(b.from)}" y="${m.t}" width="${X(b.to)-X(b.from)}" height="${ih}" fill="var(--accent)" opacity=".09"/>`;
        if(b.label) g+=`<text x="${(X(b.from)+X(b.to))/2}" y="${m.t+16}" text-anchor="middle" class="lc-band">${esc(b.label)}</text>`; });
      for(let v=spec.y.min;v<=spec.y.max+1e-9;v+=spec.y.step){ g+=`<line x1="${m.l}" x2="${W-m.r}" y1="${Y(v)}" y2="${Y(v)}" class="lc-grid"/><text x="${m.l-10}" y="${Y(v)+4}" text-anchor="end" class="lc-tick">${fmt(v)}</text>`; }
      for(let v=spec.x.min;v<=spec.x.max+1e-9;v+=spec.x.step){ g+=`<line x1="${X(v)}" x2="${X(v)}" y1="${m.t+ih}" y2="${m.t+ih+5}" class="lc-axis"/><text x="${X(v)}" y="${m.t+ih+22}" text-anchor="middle" class="lc-tick">${fmt(v)}</text>`; }
      g+=`<line x1="${m.l}" x2="${W-m.r}" y1="${m.t+ih}" y2="${m.t+ih}" class="lc-axis"/><line x1="${m.l}" x2="${m.l}" y1="${m.t}" y2="${m.t+ih}" class="lc-axis"/>`;
      g+=`<text x="${m.l+iw/2}" y="${H-10}" text-anchor="middle" class="lc-label">${esc(spec.x.label)}</text>`;
      g+=`<text transform="translate(16 ${m.t+ih/2}) rotate(-90)" text-anchor="middle" class="lc-label">${esc(spec.y.label)}</text>`;
      (spec.labels||[]).forEach(L=>{ g+=`<text x="${X(L.x)}" y="${m.t+ih-10}" text-anchor="middle" class="lc-note">${esc(L.text)}</text>`; });
      series.forEach(s=>{ if(!s.on) return;
        g+=`<path d="${pathFor(s)}" fill="none" stroke="${s.color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" ${s.dash?`stroke-dasharray="${s.dash}"`:""}/>`;
        if(s.points) s.points.forEach(p=>{ g+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="3.6" fill="${s.color}"/>`; }); });
      // cursor
      g+=`<line x1="${X(cx)}" x2="${X(cx)}" y1="${m.t}" y2="${m.t+ih}" class="lc-cursor"/>`;
      series.forEach(s=>{ if(!s.on) return; const v=sample(s,cx); if(v<spec.y.min-1e-6||v>spec.y.max+1e-6) return;
        g+=`<circle cx="${X(cx)}" cy="${Y(v)}" r="6" fill="var(--paper)" stroke="${s.color}" stroke-width="3"/>`; });
      g+=`<rect x="${m.l}" y="${m.t}" width="${iw}" height="${ih}" fill="transparent" class="lc-hit"/>`;
      svg.innerHTML=g;
      const band=(spec.bands||[]).find(b=>cx>=b.from&&cx<=b.to);
      read.innerHTML=`<span class="lc-x">${esc(spec.x.short||spec.x.label)}: <b>${fmt(cx)}</b>${spec.x.unit?" "+esc(spec.x.unit):""}${band&&band.label?` · ${esc(band.label)}`:""}</span>`+
        series.filter(s=>s.on).map(s=>`<span><i style="background:${s.color}"></i>${esc(s.name)}: <b>${fmt(sample(s,cx))}${spec.y.unit==="%"?"%":""}</b>${spec.y.unit&&spec.y.unit!=="%"?" "+esc(spec.y.unit):""}</span>`).join("");
    }
    el.innerHTML=`<figure class="lc">${spec.title?`<figcaption class="lc-title">${esc(spec.title)}</figcaption>`:""}
      ${series.length>1?`<div class="lc-keys">${series.map((s,i)=>`<button class="lc-key" data-s="${i}" aria-pressed="true"><i style="background:${s.color}"></i>${esc(s.name)}</button>`).join("")}</div>`:""}
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.title||"Graph")}"></svg>
      <div class="lc-read" aria-live="polite"></div>
      <p class="lc-hint">${esc(spec.note||"Drag across the graph (or use the arrow keys) to read exact values.")}</p></figure>`;
    const svg=el.querySelector("svg"), read=el.querySelector(".lc-read");
    svg.setAttribute("tabindex","0");
    function fromEvent(e){ const r=svg.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width*W; const v=spec.x.min+(px-m.l)/iw*(spec.x.max-spec.x.min);
      const snap=spec.x.snap||((spec.x.max-spec.x.min)/240); cx=Math.max(spec.x.min,Math.min(spec.x.max,Math.round(v/snap)*snap)); draw(); }
    let dragging=false;
    svg.addEventListener("pointerdown",e=>{dragging=true;svg.setPointerCapture(e.pointerId);fromEvent(e);});
    svg.addEventListener("pointermove",e=>{ if(dragging||e.pointerType==="mouse") fromEvent(e); });
    svg.addEventListener("pointerup",()=>dragging=false);
    svg.addEventListener("keydown",e=>{ const st=spec.x.snap||spec.x.step/2; if(e.key==="ArrowRight"){cx=Math.min(spec.x.max,cx+st);draw();e.preventDefault();} if(e.key==="ArrowLeft"){cx=Math.max(spec.x.min,cx-st);draw();e.preventDefault();} });
    el.querySelectorAll(".lc-key").forEach(b=>b.onclick=()=>{ const s=series[+b.dataset.s]; if(series.filter(x=>x.on).length===1&&s.on) return; s.on=!s.on; b.setAttribute("aria-pressed",s.on); draw(); });
    draw();
  };

  const css=`.lc{margin:20px 0 0;background:var(--paper,var(--panel));border:1px solid var(--rule);border-radius:var(--radius,10px);padding:16px 16px 12px}
  .lc svg{display:block;width:100%;height:auto;touch-action:none;cursor:crosshair;outline:none}
  .lc-title{font-weight:600;font-size:17px;margin:0 0 8px;color:var(--ink)}
  .lc-grid{stroke:var(--rule);stroke-width:1}.lc-axis{stroke:var(--muted);stroke-width:1.2}
  .lc-tick{font-size:13px;fill:var(--muted);font-family:inherit}.lc-label{font-size:14px;fill:var(--ink);font-family:inherit}
  .lc-band{font-size:13px;fill:var(--accent-ink,var(--accent));font-style:italic;font-family:inherit}.lc-note{font-size:13px;fill:var(--muted);font-style:italic;font-family:inherit}
  .lc-cursor{stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 4;opacity:.6}
  .lc-keys{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px}
  .lc-key{display:inline-flex;align-items:center;gap:7px;background:none;border:1px solid var(--rule);border-radius:999px;padding:4px 11px;font-size:14px;cursor:pointer;color:var(--ink)}
  .lc-key[aria-pressed="false"]{opacity:.4;text-decoration:line-through}
  .lc-key i,.lc-read i{display:inline-block;width:12px;height:4px;border-radius:2px}
  .lc-read{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:15px;margin-top:6px;min-height:24px}
  .lc-read span{display:inline-flex;align-items:center;gap:6px}
  .lc-hint{font-size:13.5px;color:var(--muted);margin:6px 0 0}`;
  const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
})();
