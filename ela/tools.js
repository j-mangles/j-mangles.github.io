/* ELA tools: Grammar Quick-Fire (Grammar unit) and Plot Arc (Short Stories unit). */
(function(){
  const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  window.HUB.tools = window.HUB.tools || {};

  // [sentence with ___, options, correct index, reason]
  const BANK = [
    ["___ been raining since Tuesday.",["Its","It's"],1,"It has been raining."],
    ["The team lost ___ first game.",["its","it's"],0,"Belonging to it: no apostrophe."],
    ["I think ___ too late to sign up.",["its","it's"],1,"It is too late."],
    ["The cat knocked over ___ water dish.",["its","it's"],0,"The dish belongs to the cat."],
    ["___ going to love your new locker.",["Your","You're"],1,"You are going to love it."],
    ["Is this ___ jacket?",["your","you're"],0,"Belonging to you."],
    ["___ not supposed to be in here.",["Your","You're"],1,"You are not supposed to."],
    ["Put the bins over ___.",["their","there","they're"],1,"A place."],
    ["___ meeting us after practice.",["Their","There","They're"],2,"They are meeting us."],
    ["The players forgot ___ water bottles.",["their","there","they're"],0,"Belonging to them."],
    ["___ are frozen lakes up north.",["Their","There","They're"],1,"\"There are\"."],
    ["___ turn is it?",["Whose","Who's"],0,"\"Who is turn\" doesn't work."],
    ["___ driving us to the game?",["Whose","Who's"],1,"Who is driving."],
    ["I don't know ___ backpack this is.",["whose","who's"],0,"Belonging to someone."],
    ["___ ready to start?",["Whose","Who's"],1,"Who is ready."],
    ["My ___ live in Brandon.",["cousins","cousin's","cousins'"],0,"Just plural, nobody owns anything."],
    ["___ phone died during the movie.",["Jordans","Jordan's"],1,"The phone belongs to Jordan."],
    ["The ___ uniforms were muddy.",["players","player's","players'"],2,"Many players own the uniforms."],
    ["The ___ lunches were on the table.",["childrens","children's","childrens'"],1,"Children is plural without s, so add 's."],
    ["The ___ whistle echoed down the hall.",["coachs","coach's","coaches'"],1,"One coach owns the whistle."],
    ["Two ___ were talking in the hallway.",["teachers","teacher's","teachers'"],0,"Just plural."],
    ["We ___ have waited so long.",["shouldnt","shouldn't","should'nt"],1,"Should not: the apostrophe replaces the o."],
    ["The bus leaves at four ___.",["oclock","o'clock","oclock'"],1,"Short for \"of the clock\"."],
    ["The ___ change room is being painted.",["girls","girl's","girls'"],2,"The room belongs to the girls."],
    ["___ the best meet of the year.",["Its","It's"],1,"It is the best meet."],
    ["They're leaving ___ bikes over there.",["their","there","they're"],0,"Belonging to them."]
  ];
  window.HUB.tools.grammar = function(el){
    let order=[], i=0, score=0, tries=0, answered=null;
    const shuffle=a=>{a=a.slice();for(let k=a.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[a[k],a[j]]=[a[j],a[k]];}return a;};
    function start(){ order=shuffle(BANK).slice(0,10); i=0; score=0; tries=0; answered=null; render(); }
    function render(){
      if(i>=order.length){
        el.innerHTML=`<div class="eyebrow">Practice</div><h2>Grammar Quick-Fire</h2>
          <p style="font-family:var(--f-title);font-size:44px;font-weight:700;margin:14px 0 0">${score} / ${order.length}</p>
          <p class="note">${score>=9?"Excellent.":score>=7?"Solid. Try another round.":"Look back at the Apostrophes and Your/Their/Whose lessons, then try again."}</p>
          <button class="btn" id="again">New round</button>`;
        el.querySelector("#again").onclick=start; return;
      }
      const q=order[i];
      const parts=q[0].split("___");
      const filled = answered===null ? `<span style="border-bottom:2px solid var(--accent);padding:0 18px">&nbsp;</span>` : `<b style="color:${answered===q[2]?"var(--good)":"var(--bad)"}">${esc(q[1][q[2]])}</b>`;
      el.innerHTML=`<div class="eyebrow">Practice · question ${i+1} of ${order.length}</div><h2>Grammar Quick-Fire</h2>
        <p style="font-size:24px;margin:16px 0 14px;line-height:1.4">${esc(parts[0])}${filled}${esc(parts[1]||"")}</p>
        <div class="opts">${q[1].map((o,k)=>{let c="opt";if(answered!==null){if(k===q[2])c+=" right";else if(k===answered)c+=" wrong";}return `<button class="${c}" data-k="${k}" ${answered!==null?"disabled":""} style="font-size:18px">${esc(o)}</button>`;}).join("")}</div>
        <div style="min-height:70px;margin-top:12px">${answered!==null?`<p class="why" style="margin:0">${answered===q[2]?"Right. ":"Not quite. "}${esc(q[3])}</p><button class="btn ghost" id="nx" style="margin-top:10px">${i+1<order.length?"Next":"See score"}</button>`:""}</div>
        <p class="note">Score ${score} of ${tries}</p>`;
      el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{answered=+b.dataset.k;tries++;if(answered===q[2])score++;render();});
      const nx=el.querySelector("#nx"); if(nx) nx.onclick=()=>{i++;answered=null;render();};
    }
    start();
  };

  const STAGES = [
    ["Exposition","The setup: who the story is about, where, and what normal looks like, so we can tell when it breaks.","Finding Nemo: Marlin raising Nemo alone on the reef."],
    ["Inciting incident","The one event that starts the actual story. Take it out and there's no story.","Thank You, Ma'am: Roger tries to snatch Mrs. Jones's purse."],
    ["Rising action","Complications stack up and the stakes rise. Usually most of the story.","The Landlady: clue after clue at the boarding house."],
    ["Climax","The turning point the whole story was aiming at, usually a decision.","Upswing: A.J. refuses to perform and just plays his game."],
    ["Falling action","The consequences once the outcome is decided. Often very short.","The Monkey's Paw: the knocking stops and the door opens on an empty road."],
    ["Resolution","The new normal, or an ending that refuses to give us one.","All Summer in a Day: Bradbury stops as the closet door opens."]
  ];
  window.HUB.tools.stories = function(el){
    let sel=3;
    // points along the arc
    const P=[[30,190],[110,190],[205,120],[300,40],[360,130],[430,175]];
    function draw(){
      const path="M10 190 L110 190 C 170 170, 250 90, 300 40 C 330 80, 350 120, 380 150 L 470 175";
      el.innerHTML=`<div class="eyebrow">Interactive diagram</div><h2>The Plot Arc</h2>
        <p class="note" style="margin:4px 0 8px">Notice how much wider the way up is than the way down.</p>
        <svg viewBox="0 0 480 220" style="width:100%;height:auto;display:block" role="img" aria-label="Plot arc with six stages">
          <path d="${path}" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
          ${P.map((p,k)=>`<g data-s="${k}" style="cursor:pointer" tabindex="0" role="button" aria-label="${STAGES[k][0]}">
            <circle cx="${p[0]}" cy="${p[1]}" r="${k===sel?11:8}" fill="${k===sel?"var(--accent)":"var(--paper)"}" stroke="var(--accent)" stroke-width="3"/>
            <text x="${p[0]}" y="${k===3?p[1]-18:p[1]+28}" text-anchor="middle" font-size="12.5" font-weight="700" fill="${k===sel?"var(--accent)":"var(--muted)"}" font-family="Inter, sans-serif">${k+1}</text></g>`).join("")}
        </svg>
        <div style="margin-top:6px"><p style="margin:0;font-family:var(--f-title);font-size:26px;font-weight:700">${sel+1}. ${esc(STAGES[sel][0])}</p>
        <p style="margin:4px 0 0">${esc(STAGES[sel][1])}</p>
        <p class="note" style="margin:8px 0 0">Example · ${esc(STAGES[sel][2])}</p></div>
        <div style="display:flex;gap:8px;margin-top:14px"><button class="btn ghost" id="pv" ${sel===0?"disabled":""}>&larr; Back</button><button class="btn ghost" id="nx" ${sel===5?"disabled":""}>Next &rarr;</button></div>`;
      el.querySelectorAll("[data-s]").forEach(g=>{g.onclick=()=>{sel=+g.dataset.s;draw();};g.onkeydown=e=>{if(e.key==="Enter"){sel=+g.dataset.s;draw();}};});
      el.querySelector("#pv").onclick=()=>{if(sel>0){sel--;draw();}};
      el.querySelector("#nx").onclick=()=>{if(sel<5){sel++;draw();}};
    }
    draw();
  };
})();
