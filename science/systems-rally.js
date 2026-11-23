(() => {
  const byId = id => document.getElementById(id);
  const rounds = [...document.querySelectorAll("[data-round]")];
  const key = "body-systems-rally-v1";
  const fresh = () => ({pairs:13, step:-1, seen:[false,false,false,false], scores:[], minute:0});
  let game = fresh();
  try {
    const s = JSON.parse(sessionStorage.getItem(key));
    if (s && Number.isInteger(s.pairs) && s.pairs >= 1 && s.pairs <= 13 &&
        Number.isInteger(s.step) && s.step >= 0 && s.step <= rounds.length &&
        Array.isArray(s.seen) && s.seen.length === rounds.length && s.seen.every(v=>typeof v==="boolean") &&
        Array.isArray(s.scores) && s.scores.length === rounds.length &&
        s.scores.every(r=>Array.isArray(r) && r.length===s.pairs && r.every(n=>[null,0,1,2].includes(n)))) game = s;
  } catch {}
  function save(){try { sessionStorage.setItem(key,JSON.stringify(game)); } catch {}}
  const select = byId("pairs");
  for (let n=1;n<=13;n++) select.add(new Option(String(n),String(n)));
  select.value=String(game.pairs);
  const minutes=[...rounds[2].querySelectorAll("tbody tr")].map(tr=>Number(tr.cells[1].textContent));
  function readMinute(){
    const slider=byId("rally-minute"), minute=Number(slider.value);
    byId("rally-reading").textContent="Minute "+minute+" · "+minutes[minute]+" beats/min";
    slider.setAttribute("aria-valuetext",byId("rally-reading").textContent);
  }
  function draw(focus=false){
    const i=game.step, playing=i>=0&&i<rounds.length;
    byId("setup").hidden=i!==-1;byId("play").hidden=!playing;byId("results").hidden=i!==rounds.length;byId("reset").hidden=i<0;
    rounds.forEach((round,n)=>{round.hidden=n!==i;round.querySelector("[data-key]").hidden=!game.seen[n];});
    if(playing){
      byId("round-count").textContent="Round "+(i+1)+" of "+rounds.length;
      byId("reveal").hidden=game.seen[i];byId("marking").hidden=!game.seen[i];
      byId("back").disabled=i===0;byId("next").disabled=!game.seen[i];byId("next").textContent=i===3?"See results":"Next round";
      byId("marks").replaceChildren();
      game.scores[i].forEach((score,p)=>{
        const b=document.createElement("button");b.type="button";
        function paint(){const s=game.scores[i][p];b.dataset.marked=String(s!==null);b.textContent="Pair "+(p+1)+" · "+(s===null?"—":s+"/2");b.setAttribute("aria-label","Pair "+(p+1)+", "+(s===null?"unmarked":s+" of 2 points"));}
        b.onclick=()=>{const s=game.scores[i][p];game.scores[i][p]=s===null?0:(s+1)%3;paint();save();};paint();byId("marks").append(b);
      });
      byId("rally-minute").value=String(game.minute||0);readMinute();
      if(focus)rounds[i].querySelector("h2").focus();
    }else if(i===rounds.length){
      const ranking=Array.from({length:game.pairs},(_,p)=>{
        const marks=game.scores.map(r=>r[p]);return {pair:p+1,total:marks.reduce((n,s)=>n+(s??0),0),open:marks.filter(s=>s===null).length};
      });
      const incomplete=ranking.some(r=>r.open);
      byId("score-note").textContent=incomplete?"Some rounds still need marks. Pairs are listed in number order.":"All four rounds are marked. Equal scores share the same total.";
      if(!incomplete)ranking.sort((a,b)=>b.total-a.total||a.pair-b.pair);
      byId("rankings").replaceChildren(...ranking.map(r=>{const li=document.createElement("li");li.textContent="Pair "+r.pair+" · "+r.total+"/8"+(r.open?" · "+r.open+" unmarked":"");return li;}));
      if(focus)byId("results").querySelector("h2").focus();
    }
  }
  byId("rally-minute").oninput=e=>{game.minute=Number(e.target.value);readMinute();save();};
  byId("start").onclick=()=>{game=fresh();game.pairs=Number(select.value);game.scores=rounds.map(()=>Array(game.pairs).fill(null));game.step=0;save();draw(true);};
  byId("reveal").onclick=()=>{game.seen[game.step]=true;save();draw();const title=rounds[game.step].querySelector("[data-key] h3");title.tabIndex=-1;title.focus();};
  byId("full-points").onclick=()=>{game.scores[game.step]=game.scores[game.step].map(v=>v??2);save();draw();};
  byId("next").onclick=()=>{game.step++;save();draw(true);};byId("back").onclick=()=>{game.step--;save();draw(true);};
  byId("edit").onclick=()=>{game.step=3;save();draw(true);};
  byId("restart").onclick=()=>{game=fresh();select.value=String(game.pairs);byId("reset").open=false;save();draw();select.focus();};
  draw();
})();
