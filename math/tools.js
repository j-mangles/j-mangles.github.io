/* Math 7 tools: Percent & Decimal Practice (Unit 1) and the Probability Bag (Unit 2). */
(function(){
  const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const R = (a,b) => a + Math.floor(Math.random()*(b-a+1));
  const pick = a => a[Math.floor(Math.random()*a.length)];
  const fmt = n => String(Math.round(n*10000)/10000);
  const money = n => "$" + (Math.round(n*100)/100).toFixed(2);
  const gcd = (a,b) => b ? gcd(b, a%b) : a;
  window.HUB.tools = window.HUB.tools || {};

  // Each generator returns {q, ans (number), unit ("" | "%" | "$"), hint, how}
  const FR = [[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,10],[3,10],[7,10],[9,10],[1,20],[3,20],[7,20],[11,20],[1,25],[9,25],[12,25],[1,8],[3,8],[5,8],[7,8],[1,50],[17,50]];
  const GEN = {
    "Fraction → %": () => { const [n,d]=pick(FR); const p=n/d*100;
      return {q:`Write ${n}/${d} as a percent.`, ans:p, unit:"%", how:`${n} ÷ ${d} = ${fmt(n/d)}, and × 100 = ${fmt(p)}%.`}; },
    "% → decimal": () => { const p=pick([R(1,9),R(11,99),R(11,99),pick([12.5,37.5,150,125,0.5])]);
      return {q:`Write ${p}% as a decimal.`, ans:p/100, unit:"", how:`Divide by 100: ${p}% = ${fmt(p/100)}.`}; },
    "Percent of": () => { const p=pick([10,20,25,30,40,50,75,5,15,35,60,1,12]); const w=pick([20,40,60,80,120,160,200,240,300,360,400,500,48,64,90]);
      return {q:`What is ${p}% of ${w}?`, ans:p*w/100, unit:"", how:`${fmt(p/100)} × ${w} = ${fmt(p*w/100)}.`}; },
    "Work backwards": () => { const p=pick([10,20,25,50,40,75,30]); const w=pick([20,40,60,80,120,200,160,240]); const part=p*w/100;
      return {q:`${p}% of a number is ${fmt(part)}. What is the number?`, ans:w, unit:"", how:`1% is ${fmt(part)} ÷ ${p} = ${fmt(part/p)}. So 100% is ${fmt(part/p)} × 100 = ${w}.`}; },
    "Sale + tax": () => { const reg=pick([20,25,30,40,48,50,60,80,90,120]); const off=pick([10,20,25,30,40,50]); const sale=reg*(1-off/100); const tot=Math.round(sale*1.12*100)/100;
      return {q:`A ${money(reg)} item is ${off}% off. What is the total with 12% tax?`, ans:tot, unit:"$", how:`Discount ${money(reg*off/100)}, sale price ${money(sale)}. Tax 12% = ${money(sale*0.12)}. Total ${money(tot)}.`}; },
    "Fraction → decimal": () => { const [n,d]=pick(FR.filter(f=>f[1]!==100));
      return {q:`Write ${n}/${d} as a decimal.`, ans:n/d, unit:"", how:`${n} ÷ ${d} = ${fmt(n/d)}.`}; }
  };
  const TYPES = Object.keys(GEN);

  window.HUB.tools.fdp = function(el){
    let type="Mixed", cur=null, score=0, tries=0, state="ask", streak=0;
    function next(){ const t = type==="Mixed" ? pick(TYPES) : type; cur = GEN[t](); cur.t=t; state="ask"; render(); }
    function check(v){
      const raw = String(v).replace(/[$,%\s]/g,"");
      if(raw===""||isNaN(+raw)) return;
      const ok = Math.abs(+raw - cur.ans) < (cur.unit==="$"?0.006:0.0006);
      tries++; if(ok){score++;streak++;} else streak=0;
      state = ok?"right":"wrong"; render();
    }
    function render(){
      el.innerHTML = `<div class="eyebrow">Practice · new questions every time</div><h2>Percent Practice</h2>
        <div class="opts" style="margin:10px 0 4px">${["Mixed",...TYPES].map(t=>`<button class="opt" data-t="${esc(t)}" style="font-size:14px;padding:5px 10px;${t===type?"border-color:var(--accent);color:var(--accent);font-weight:700":""}">${esc(t)}</button>`).join("")}</div>
        <p class="note" style="margin:10px 0 0">${esc(cur.t)}</p>
        <p style="font-size:22px;margin:4px 0 12px;line-height:1.35">${esc(cur.q)}</p>
        <form id="f" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          ${cur.unit==="$"?'<span style="font-size:20px">$</span>':""}
          <input id="in" inputmode="decimal" autocomplete="off" aria-label="Your answer" ${state!=="ask"?"disabled":""}
            style="font:inherit;font-size:20px;width:140px;padding:7px 10px;border:1px solid var(--rule);border-radius:7px;background:var(--paper);color:var(--ink)">
          ${cur.unit==="%"?'<span style="font-size:20px">%</span>':""}
          ${state==="ask"?'<button class="btn" type="submit">Check</button>':""}
        </form>
        <div style="min-height:86px;margin-top:12px">${state!=="ask"?`<p class="why" style="margin:0"><b style="color:${state==="right"?"var(--good)":"var(--bad)"}">${state==="right"?"Right.":"Not quite."}</b> ${esc(cur.how)}</p><button class="btn ghost" id="nx" style="margin-top:10px">Next question</button>`:`<button class="btn ghost" id="sk" style="font-size:14px">Skip</button>`}</div>
        <p class="note">Score ${score} of ${tries}${streak>=3?` · ${streak} in a row`:""}</p>`;
      el.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{type=b.dataset.t;next();});
      el.querySelector("#f").onsubmit=e=>{e.preventDefault();check(el.querySelector("#in").value);};
      const nx=el.querySelector("#nx"); if(nx){nx.onclick=next; nx.focus();}
      const sk=el.querySelector("#sk"); if(sk) sk.onclick=next;
      if(state==="ask") el.querySelector("#in").focus({preventScroll:true});
    }
    next();
  };

  // Probability Bag: set the counters, see theoretical P, then draw and compare.
  const COLS = [["Red","#B23B2E"],["Blue","#2E5C8A"],["Green","#2E7D4F"],["Yellow","#C9A227"]];
  window.HUB.tools.prob = function(el){
    let bag=[3,5,2,0], tally=[0,0,0,0], last=null, target=0;
    const total=()=>bag.reduce((a,b)=>a+b,0), draws=()=>tally.reduce((a,b)=>a+b,0);
    function frac(n,d){ if(!d) return "–"; const g=gcd(n,d)||1; return n===0?"0":`${n/g}/${d/g}`; }
    function draw(k){ const T=total(); if(!T) return; for(let i=0;i<k;i++){ let r=Math.random()*T, c=0; while(r>=bag[c]){ r-=bag[c]; c++; } tally[c]++; last=c; } render(); }
    function dots(){
      const out=[]; let i=0; bag.forEach((n,c)=>{ for(let k=0;k<n;k++){ const x=24+(i%10)*22, y=24+Math.floor(i/10)*22; out.push(`<circle cx="${x}" cy="${y}" r="9" fill="${COLS[c][1]}"/>`); i++; } });
      const rows=Math.max(1,Math.ceil(i/10)); return `<svg viewBox="0 0 240 ${rows*22+26}" style="width:100%;max-width:260px;height:auto;display:block" role="img" aria-label="Counters in the bag">${out.join("")}</svg>`;
    }
    function render(){
      const T=total(), D=draws();
      el.innerHTML = `<div class="eyebrow">Interactive</div><h2>The Probability Bag</h2>
        <p class="note" style="margin:4px 0 10px">Set what's in the bag. Pick a colour, then draw and see if the results match the theory.</p>
        <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start">
          ${dots()}
          <div>${COLS.map((c,i)=>`<div style="display:flex;align-items:center;gap:8px;margin:3px 0"><span style="width:12px;height:12px;border-radius:50%;background:${c[1]};display:inline-block"></span><span style="width:56px">${c[0]}</span>
            <button class="opt" data-m="${i}" style="padding:2px 10px" aria-label="Fewer ${c[0]}">−</button><b style="width:22px;text-align:center">${bag[i]}</b><button class="opt" data-p="${i}" style="padding:2px 10px" aria-label="More ${c[0]}">+</button></div>`).join("")}</div>
        </div>
        <div style="margin-top:12px">Looking for: ${COLS.map((c,i)=>`<button class="opt" data-g="${i}" style="padding:4px 10px;font-size:14px;${i===target?`border-color:${c[1]};color:${c[1]};font-weight:700`:""}">${c[0]}</button>`).join(" ")}</div>
        <div class="tablewrap" style="margin-top:10px"><table class="data"><thead><tr><th></th><th>Fraction</th><th>Decimal</th><th>Percent</th></tr></thead><tbody>
          <tr><td>Theoretical P(${COLS[target][0].toLowerCase()})</td><td>${bag[target]}/${T} ${frac(bag[target],T)!==bag[target]+"/"+T?"= "+frac(bag[target],T):""}</td><td>${T?fmt(bag[target]/T):"–"}</td><td>${T?Math.round(bag[target]/T*1000)/10+"%":"–"}</td></tr>
          <tr><td>Experimental (${D} draws)</td><td>${D?tally[target]+"/"+D:"–"}</td><td>${D?fmt(tally[target]/D):"–"}</td><td>${D?Math.round(tally[target]/D*1000)/10+"%":"–"}</td></tr>
        </tbody></table></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
          <button class="btn" data-d="1">Draw 1</button><button class="btn ghost" data-d="10">Draw 10</button><button class="btn ghost" data-d="100">Draw 100</button><button class="btn ghost" data-d="1000">Draw 1000</button><button class="btn ghost" id="rs">Reset draws</button>
        </div>
        <p class="note" style="margin-top:10px">${last!==null?`Last draw: <b style="color:${COLS[last][1]}">${COLS[last][0]}</b>. `:""}${D>=500?"With lots of draws, the experimental result usually gets close to the theoretical one.":D>0&&D<30?"Few draws can give results far from the theory. Keep going.":""}</p>`;
      el.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{ if(total()<40){bag[+b.dataset.p]++; tally=[0,0,0,0]; last=null; render();} });
      el.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{ const i=+b.dataset.m; if(bag[i]>0){bag[i]--; tally=[0,0,0,0]; last=null; render();} });
      el.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{ target=+b.dataset.g; render(); });
      el.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>draw(+b.dataset.d));
      el.querySelector("#rs").onclick=()=>{ tally=[0,0,0,0]; last=null; render(); };
    }
    render();
  };
})();
