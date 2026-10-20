/* Critical Thinking tools: Spot It quick-fire (Think Lab) and the Prisoner's Dilemma vs. the computer (Game Theory). */
(function(){
  const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const shuffle = a => { a=a.slice(); for(let k=a.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[a[k],a[j]]=[a[j],a[k]];} return a; };
  window.HUB.tools = window.HUB.tools || {};

  const DECKS = {
    "Observation or inference?": { opts:["Observation","Inference"], items:[
      ["The hallway floor is wet near the water fountain.",0,"You can see it."],
      ["Someone spilled their water bottle by the fountain.",1,"A guess about why the floor is wet."],
      ["The bus arrived at 8:52.",0,"A time you can check."],
      ["The bus driver overslept.",1,"An explanation nobody confirmed."],
      ["Jordan's backpack is unzipped and his binder is on the floor.",0,"Both can be seen."],
      ["Jordan was in a rush this morning.",1,"Built on top of what you saw."],
      ["The security camera shows a person in a red hoodie at 3:10.",0,"A recorded fact."],
      ["The person in the red hoodie is a Grade 8.",1,"The video doesn't show their grade."],
      ["The class pet's food dish is empty.",0,"Directly observed."],
      ["Nobody fed the hamster this weekend.",1,"Maybe it ate fast. Still a guess."],
      ["There are three empty pizza boxes in the staff room.",0,"Countable."],
      ["The teachers had a party at lunch.",1,"A reasonable story, but a story."],
      ["The trophy case glass has a crack in the corner.",0,"You can see the crack."],
      ["A ball hit the trophy case.",1,"Possible, not confirmed."]
    ]},
    "Name the ad trick": { opts:["Bandwagon","Urgency","Emotional pitch","Star power","Sounds smart, says nothing"], items:[
      ["\"Over 3 million teens already switched. Don't get left behind.\"",0,"Everyone's doing it."],
      ["\"Only 4 left in stock. Order in the next 10 minutes!\"",1,"Act now before you think."],
      ["\"Don't let a bad hair day ruin the photo everyone will see forever.\"",2,"Aims at embarrassment."],
      ["\"Pro skater Dax Riley never rides without these wheels.\"",3,"A cool person uses it."],
      ["\"Now with Hydra-Flex technology for 40% more freshness.\"",4,"Sounds precise, checks out to nothing."],
      ["\"Everyone in your grade is already playing. What are you waiting for?\"",0,"Fear of being the only one not doing it."],
      ["\"Flash sale: ends at midnight. Never coming back.\"",1,"Time pressure."],
      ["\"Imagine the look on their faces when you show up in these.\"",2,"Aims at pride and excitement."],
      ["\"The streamer with 2 million followers drinks this every match.\"",3,"Borrowed fame."],
      ["\"Clinically inspired formula. Scientifically bold flavour.\"",4,"No claim you could actually test."]
    ]}
  };

  window.HUB.tools.lab = function(el){
    let deck="Observation or inference?", order=[], i=0, score=0, ans=null;
    function start(){ order=shuffle(DECKS[deck].items).slice(0,10); i=0; score=0; ans=null; render(); }
    function render(){
      const D=DECKS[deck];
      const tabs = Object.keys(DECKS).map(k=>`<button class="opt" data-d="${esc(k)}" style="font-size:14px;padding:5px 10px;${k===deck?"border-color:var(--accent);color:var(--accent);font-weight:700":""}">${esc(k)}</button>`).join("");
      if(i>=order.length){
        el.innerHTML=`<div class="eyebrow">Quick-fire</div><h2>Spot It</h2><div class="opts" style="margin:8px 0">${tabs}</div>
          <p style="font-family:var(--f-title);font-size:44px;font-weight:700;margin:14px 0 0">${score} / ${order.length}</p>
          <p class="note">${score>=9?"Sharp eyes.":score>=7?"Solid. Go again.":"Reread the lesson notes, then try another round."}</p><button class="btn" id="again">New round</button>`;
        el.querySelector("#again").onclick=start; bind(); return;
      }
      const q=order[i];
      el.innerHTML=`<div class="eyebrow">Quick-fire · ${i+1} of ${order.length}</div><h2>Spot It</h2>
        <div class="opts" style="margin:8px 0 12px">${tabs}</div>
        <p style="font-size:21px;line-height:1.4;margin:6px 0 12px">${esc(q[0])}</p>
        <div class="opts">${D.opts.map((o,k)=>{let c="opt";if(ans!==null){if(k===q[1])c+=" right";else if(k===ans)c+=" wrong";}return `<button class="${c}" data-k="${k}" ${ans!==null?"disabled":""}>${esc(o)}</button>`;}).join("")}</div>
        <div style="min-height:70px;margin-top:12px">${ans!==null?`<p class="why" style="margin:0">${ans===q[1]?"Right. ":"Not quite. "}${esc(q[2])}</p><button class="btn ghost" id="nx" style="margin-top:10px">${i+1<order.length?"Next":"See score"}</button>`:""}</div>
        <p class="note">Score ${score}</p>`;
      el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{ans=+b.dataset.k; if(ans===q[1]) score++; render();});
      const nx=el.querySelector("#nx"); if(nx) nx.onclick=()=>{i++;ans=null;render();};
      bind();
    }
    function bind(){ el.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{deck=b.dataset.d;start();}); }
    start();
  };

  // Prisoner's Dilemma against a hidden computer strategy.
  const PAY = {CC:[3,3], CB:[0,5], BC:[5,0], BB:[1,1]};
  const BOTS = {
    "Tit for Tat": h => h.length ? h[h.length-1].me : "C",
    "Always Betray": () => "B",
    "Always Cooperate": () => "C",
    "Grudger": h => h.some(r=>r.me==="B") ? "B" : "C",
    "Forgiving Tit for Tat": h => { if(!h.length) return "C"; return h[h.length-1].me==="B" && Math.random()>0.3 ? "B" : "C"; },
    "Random": () => Math.random()<0.5 ? "C" : "B"
  };
  const ROUNDS = 10;
  window.HUB.tools.games = function(el){
    let bot, hist, guess=null;
    function start(){ bot = Object.keys(BOTS)[Math.floor(Math.random()*6)]; hist=[]; guess=null; render(); }
    function play(m){ const b=BOTS[bot](hist); const p=PAY[m+b]; hist.push({me:m, bot:b, a:p[0], b:p[1]}); render(); }
    function render(){
      const my=hist.reduce((s,r)=>s+r.a,0), th=hist.reduce((s,r)=>s+r.b,0), over=hist.length>=ROUNDS;
      const cell = v => `<span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:5px;font-size:12px;font-weight:700;color:#fff;background:${v==="C"?"var(--good)":"var(--bad)"}">${v}</span>`;
      el.innerHTML=`<div class="eyebrow">Game · ${ROUNDS} rounds</div><h2>Beat the Bot</h2>
        <p class="note" style="margin:4px 0 10px">The computer is playing one of six strategies from class. Score as many points as you can, then guess its strategy.</p>
        <div class="tablewrap"><table class="data" style="font-size:14px"><thead><tr><th></th><th>Bot cooperates</th><th>Bot betrays</th></tr></thead>
          <tbody><tr><td>You cooperate</td><td>3 / 3</td><td>0 / 5</td></tr><tr><td>You betray</td><td>5 / 0</td><td>1 / 1</td></tr></tbody></table></div>
        <div style="margin:12px 0 4px;display:grid;grid-template-columns:44px repeat(${ROUNDS},24px);gap:4px;align-items:center;overflow-x:auto">
          <span class="note">You</span>${Array.from({length:ROUNDS},(_,k)=>hist[k]?cell(hist[k].me):'<span style="width:22px;height:22px;border:1px dashed var(--rule);border-radius:5px;display:inline-block"></span>').join("")}
          <span class="note">Bot</span>${Array.from({length:ROUNDS},(_,k)=>hist[k]?cell(hist[k].bot):'<span style="width:22px;height:22px;border:1px dashed var(--rule);border-radius:5px;display:inline-block"></span>').join("")}
        </div>
        <p style="font-size:18px;margin:8px 0">You <b>${my}</b> · Bot <b>${th}</b></p>
        ${!over?`<div style="display:flex;gap:8px"><button class="btn" data-m="C">Cooperate</button><button class="btn ghost" data-m="B">Betray</button></div>`
        : guess===null?`<p style="margin:10px 0 6px"><b>Which strategy was it?</b></p><div class="opts">${Object.keys(BOTS).map(k=>`<button class="opt" data-g="${esc(k)}">${esc(k)}</button>`).join("")}</div>`
        : `<p class="why" style="margin:10px 0 0"><b style="color:${guess===bot?"var(--good)":"var(--bad)"}">${guess===bot?"Got it.":"Not quite."}</b> It was <b>${esc(bot)}</b>. Best possible together: ${ROUNDS*6} points combined. You two made ${my+th}.</p><button class="btn" id="again" style="margin-top:10px">Play a new bot</button>`}`;
      el.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>play(b.dataset.m));
      el.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{guess=b.dataset.g;render();});
      const a=el.querySelector("#again"); if(a) a.onclick=start;
    }
    start();
  };
})();
