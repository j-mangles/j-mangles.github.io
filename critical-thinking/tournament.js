/* Think Lab · Strategy Tournament (Lesson 8, Cooperate or Betray).
   Scoring comes from the lesson: both cooperate 3/3, both betray 1/1, one betrays 5/0.
   Students write a strategy as a short set of rules. Every strategy in the field plays every other one,
   and the points from all of its matches are added up.
   Strategies added on a device stay in that browser only (localStorage) until they are cleared. Nothing is submitted. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const PAY={CC:[3,3],CB:[0,5],BC:[5,0],BB:[1,1]};
const KEY="ct-tournament-roster",MAX=30,NAME_MAX=18;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- core (no DOM) ---------- */
// A small seeded generator, so a tournament with chance in it can be replayed and tested.
function rng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

// A rule set as six characters: first move, reply to cooperate, reply to betray, grudge (0-3), surprise (0,3,4,5), final round (R = follow my rules, B = betray).
const CODE=/^[CB]{3}[0-3][0345][RB]$/;
function parse(code){
 const s=String(code==null?"":code).toUpperCase().replace(/[^A-Z0-9]/g,"");
 return CODE.test(s)?{first:s[0],afterC:s[1],afterB:s[2],grudge:+s[3],every:+s[4],last:s[5]}:null;
}
const encode=r=>r.first+r.afterC+r.afterB+r.grudge+r.every+r.last;
// Rules lower on the student's list win: final round, then grudge, then surprise betrayal, then the three basic rules.
function ruleMove(r,own,other,round,rounds){
 if(r.last==="B"&&round===rounds-1)return "B";
 if(r.grudge&&other.filter(m=>m==="B").length>=r.grudge)return "B";
 if(r.every&&(round+1)%r.every===0)return "B";
 if(round===0)return r.first;
 return other[round-1]==="C"?r.afterC:r.afterB;
}
const CLASSICS=[
 {id:"tft",name:"Tit for Tat",desc:"Cooperates first, then copies its partner's last move.",code:"CCB00R"},
 {id:"allc",name:"Always Cooperate",desc:"Cooperates every round.",code:"CCC00R"},
 {id:"allb",name:"Always Betray",desc:"Betrays every round.",code:"BBB00R"},
 {id:"grudger",name:"Grudger",desc:"Cooperates until its partner betrays once, then betrays for the rest of the match.",code:"CCB10R"},
 {id:"ftft",name:"Forgiving Tit for Tat",desc:"Copies its partner, but lets about one betrayal in three go.",
  fn:(own,other,round,rounds,rand)=>other.length&&other[other.length-1]==="B"&&rand()>0.3?"B":"C"},
 {id:"random",name:"Random",desc:"Flips a coin every round.",fn:(own,other,round,rounds,rand)=>rand()<0.5?"C":"B"}
];
function mover(p){
 if(typeof p.fn==="function")return p.fn;
 const r=parse(p.code);if(!r)throw Error("Bad strategy code: "+p.code);
 return (own,other,round,rounds)=>ruleMove(r,own,other,round,rounds);
}
function match(a,b,rounds,seedA,seedB){
 if(!Number.isInteger(rounds)||rounds<1||rounds>50)throw Error("Invalid round count");
 const fa=mover(a),fb=mover(b),ra=rng(seedA),rb=rng(seedB),ma=[],mb=[];let pa=0,pb=0;
 for(let i=0;i<rounds;i++){
  const x=fa(ma,mb,i,rounds,ra),y=fb(mb,ma,i,rounds,rb),p=PAY[x+y];
  if(!p)throw Error("A strategy returned an invalid move");
  pa+=p[0];pb+=p[1];ma.push(x);mb.push(y);
 }
 return {a:ma,b:mb,pa,pb};
}
// "Betrayed first" means playing B in a round before the partner has ever played B (the same round counts).
const firstB=m=>{const i=m.indexOf("B");return i<0?Infinity:i;};
function tournament(players,rounds,seed){
 const n=players.length;if(n<2)throw Error("A tournament needs at least two strategies");
 const rows=players.map((p,i)=>({i,name:p.name,kind:p.kind||"class",total:0,wins:0,ties:0,losses:0,nice:true,matches:[]}));
 const s=(seed>>>0)||1;
 for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){
  const m=match(players[i],players[j],rounds,s+i*7919+j*104729,s+j*7919+i*104729+13);
  const A=rows[i],B=rows[j];
  A.total+=m.pa;B.total+=m.pb;
  if(m.pa>m.pb){A.wins++;B.losses++;}else if(m.pa<m.pb){B.wins++;A.losses++;}else{A.ties++;B.ties++;}
  const fa=firstB(m.a),fb=firstB(m.b);
  if(fa!==Infinity&&fa<=fb)A.nice=false;
  if(fb!==Infinity&&fb<=fa)B.nice=false;
  A.matches.push({opp:j,mine:m.a,theirs:m.b,pts:m.pa,oppPts:m.pb});
  B.matches.push({opp:i,mine:m.b,theirs:m.a,pts:m.pb,oppPts:m.pa});
 }
 const standings=rows.slice().sort((x,y)=>y.total-x.total||x.name.localeCompare(y.name));
 standings.forEach((r,k)=>{r.rank=k&&standings[k-1].total===r.total?standings[k-1].rank:k+1;r.perRound=r.total/((n-1)*rounds);});
 return {rows,standings,rounds,count:n,matchCount:n*(n-1)/2,max:(n-1)*rounds*5};
}
const ordinal=k=>k+(k%100>10&&k%100<14?"th":["th","st","nd","rd"][k%10]||"th");
const one=x=>(Math.round(x*10)/10).toFixed(1);
function insights(t){
 const out=[],S=t.standings,top=S.filter(r=>r.rank===1),n=t.count-1;
 const names=top.map(r=>r.name);
 out.push(top.length===1
  ?names[0]+" finished first with "+top[0].total+" points, about "+one(top[0].perRound)+" points a round."
  :names.slice(0,-1).join(", ")+" and "+names[names.length-1]+" tied for first with "+top[0].total+" points each.");
 const most=S.slice().sort((x,y)=>y.wins-x.wins||x.rank-y.rank)[0];
 if(most.wins>0&&most.rank>1&&most.wins>Math.max(...top.map(r=>r.wins)))
  out.push(most.name+" won the most matches head to head ("+most.wins+" of "+n+") but finished "+ordinal(most.rank)+". Beating your partner and scoring the most points are different goals.");
 else if(top.length===1&&top[0].wins*2<=n)
  out.push(top[0].name+" won only "+top[0].wins+" of its "+n+" matches head to head. It finished first by scoring well with almost everyone, not by beating them.");
 const nice=S.filter(r=>r.nice),mean=a=>a.reduce((s,r)=>s+r.perRound,0)/a.length;
 if(nice.length&&nice.length<S.length)
  out.push("Strategies that never betrayed first averaged "+one(mean(nice))+" points a round. The ones that did averaged "+one(mean(S.filter(r=>!r.nice)))+".");
 return out;
}
function classicFor(code){const c=CLASSICS.find(x=>x.code===code);return c?c.name:null;}
function cleanName(s){return String(s==null?"":s).replace(/\s+/g," ").trim().slice(0,NAME_MAX);}
function uniqueName(name,taken){
 if(!taken.includes(name))return name;
 for(let k=2;k<99;k++){const v=name.slice(0,NAME_MAX-String(k).length-1)+" "+k;if(!taken.includes(v))return v;}
 return name;
}

/* ---------- storage: this browser only ---------- */
function loadRoster(){
 try{const a=JSON.parse(localStorage.getItem(KEY)||"[]");
  return Array.isArray(a)?a.filter(x=>x&&cleanName(x.name)&&parse(x.code)).slice(0,MAX).map(x=>({name:cleanName(x.name),code:encode(parse(x.code))})):[];
 }catch(e){return [];}
}
function saveRoster(r){try{localStorage.setItem(KEY,JSON.stringify(r));}catch(e){/* private mode: the roster just lasts until the page closes */}}

/* ---------- page ---------- */
const RULES=[
 {k:"first",q:"On the first round, I",o:[["C","Cooperate"],["B","Betray"]]},
 {k:"afterC",q:"If my partner cooperated last round, I",o:[["C","Cooperate"],["B","Betray"]]},
 {k:"afterB",q:"If my partner betrayed last round, I",o:[["C","Cooperate"],["B","Betray"]]},
 {k:"grudge",q:"I hold a grudge and betray every round from then on",o:[[0,"Never"],[1,"After 1 betrayal"],[2,"After 2"],[3,"After 3"]]},
 {k:"every",q:"I throw in a surprise betrayal",o:[[0,"Never"],[3,"Every 3rd round"],[4,"Every 4th"],[5,"Every 5th"]]},
 {k:"last",q:"On the final round, I",o:[["R","Follow my rules"],["B","Betray"]]}
];
function render(el){
 let rule=parse("CCC00R"),roster=loadRoster(),off=new Set(),result=null,picked=null,mine=null;
 const $=s=>el.querySelector(s);
 el.innerHTML='<section class="tn"><h2>Strategy Tournament</h2>'+
 '<p class="span">Every strategy plays every other strategy</p>'+
 '<p class="tn-lede">Write your strategy as a set of rules. It plays a full match against every other strategy in the field, and its points from all of those matches are added up. Scoring is the same as in class: 3 each if you both cooperate, 1 each if you both betray, and 5 to 0 if only one of you betrays.</p>'+
 '<h3>1. Build your strategy</h3>'+
 '<label class="tn-lab" for="tn-name">Strategy name</label><input id="tn-name" class="tn-in" maxlength="'+NAME_MAX+'" autocomplete="off" spellcheck="false">'+
 '<div class="tn-rules">'+RULES.map(r=>'<fieldset class="tn-rule"><legend>'+esc(r.q)+'</legend><div class="tn-seg">'+
  r.o.map(([v,t])=>'<label><input type="radio" name="tn-'+r.k+'" value="'+v+'"><span>'+esc(t)+'</span></label>').join("")+'</div></fieldset>').join("")+'</div>'+
 '<p class="note">If two rules disagree, the one lower on the list wins.</p>'+
 '<p class="tn-read" id="tn-read"></p>'+
 '<div class="tn-actions"><button class="btn" id="tn-add" type="button">Add it to the field</button><span class="tn-msg" id="tn-msg" role="status"></span></div>'+
 '<h3>2. The field</h3>'+
 '<ul class="tn-field" id="tn-field"></ul>'+
 '<details class="tn-code"><summary>Add a classmate\'s strategy by its code</summary>'+
  '<div class="tn-coderow"><div><label class="tn-lab" for="tn-cname">Name</label><input id="tn-cname" class="tn-in" maxlength="'+NAME_MAX+'" autocomplete="off" spellcheck="false"></div>'+
  '<div><label class="tn-lab" for="tn-ccode">Code</label><input id="tn-ccode" class="tn-in tn-typed" maxlength="12" autocomplete="off" autocapitalize="characters" spellcheck="false"></div>'+
  '<button class="btn ghost" id="tn-cadd" type="button">Add</button></div><p class="tn-msg" id="tn-cmsg" role="status"></p></details>'+
 '<div class="tn-actions"><label class="tn-lab tn-inline" for="tn-rounds">Rounds in each match</label>'+
  '<select id="tn-rounds" class="tn-in tn-sel"><option value="5">5</option><option value="10" selected>10</option><option value="20">20</option></select>'+
  '<button class="btn" id="tn-run" type="button">Run the tournament</button><button class="btn ghost" id="tn-clear" type="button">Clear added strategies</button></div>'+
 '<p class="note">Strategies you add stay on this device until you clear them. Random and Forgiving Tit for Tat involve chance, so totals can shift a little from run to run.</p>'+
 '<div id="tn-out" aria-live="polite"></div></section>';

 function players(){
  return [...CLASSICS.filter(c=>!off.has(c.id)).map(c=>Object.assign({kind:"classic"},c)),...roster.map(r=>({name:r.name,code:r.code,kind:"class"}))];
 }
 function taken(){return [...CLASSICS.map(c=>c.name),...roster.map(r=>r.name)];}
 function showRule(){
  RULES.forEach(r=>el.querySelectorAll('input[name="tn-'+r.k+'"]').forEach(i=>{i.checked=String(rule[r.k])===i.value;}));
  const code=encode(rule),same=classicFor(code);
  $("#tn-read").innerHTML=(same?"These rules are the same as <b>"+esc(same)+"</b>. ":"")+'Strategy code: <b class="tn-typed">'+code+"</b>";
 }
 function showField(){
  $("#tn-field").innerHTML=CLASSICS.map(c=>'<li><label class="tn-check"><input type="checkbox" data-classic="'+c.id+'"'+(off.has(c.id)?"":" checked")+'><span><b>'+esc(c.name)+'</b> <i>classic</i><br>'+esc(c.desc)+'</span></label></li>').join("")+
   roster.map((r,k)=>'<li class="tn-added"><span><b>'+esc(r.name)+'</b><br><span class="tn-typed">'+r.code+'</span>'+(classicFor(r.code)?" · same rules as "+esc(classicFor(r.code)):"")+
   '</span><button class="tn-x" type="button" data-remove="'+k+'" aria-label="Remove '+esc(r.name)+'">Remove</button></li>').join("");
  $("#tn-clear").hidden=!roster.length;
 }
 function addEntry(name,code,msg){
  name=cleanName(name);
  if(!name){msg.textContent="Give the strategy a name first.";return null;}
  if(roster.length>=MAX){msg.textContent="The field is full ("+MAX+" added strategies). Remove one first.";return null;}
  name=uniqueName(name,taken());
  roster.push({name,code});saveRoster(roster);showField();
  msg.textContent=name+" is in the field.";
  return name;
 }
 function strip(moves,label){
  return '<div class="tn-strip" role="img" aria-label="'+esc(label)+": "+moves.map(m=>m==="C"?"cooperate":"betray").join(", ")+'" style="--n:'+moves.length+'">'+
   moves.map(m=>'<i class="'+(m==="C"?"c":"b")+'">'+m+"</i>").join("")+"</div>";
 }
 function showResult(animate){
  const out=$("#tn-out");if(!result){out.innerHTML="";return;}
  const S=result.standings,best=S[0].total||1,n=S.length;
  if(picked==null||!result.rows[picked])picked=S[0].i;
  const P=result.rows[picked];
  out.innerHTML='<h3>3. Results</h3>'+
   '<p class="tn-sum">'+result.count+" strategies played "+result.matchCount+" matches of "+result.rounds+" rounds. Pick a strategy to see its matches.</p>"+
   '<div class="tn-tablewrap"><table class="tn-table'+(animate?" tn-anim":"")+'"><thead><tr><th scope="col">Rank</th><th scope="col">Strategy</th><th scope="col" class="num">Points</th><th scope="col" class="num tn-c4">Won · tied · lost</th></tr></thead><tbody>'+
   S.map((r,k)=>'<tr style="--d:'+Math.min((n-1-k)*90,2400)+'ms"'+(r.i===picked?' class="on"':"")+'><td class="tn-rank">'+r.rank+'</td>'+
    '<td><button type="button" class="tn-pick" data-pick="'+r.i+'" aria-pressed="'+(r.i===picked)+'">'+esc(r.name)+'</button>'+(r.kind==="classic"?' <i>classic</i>':"")+
    '<span class="tn-bar"><span style="width:'+(100*r.total/best).toFixed(1)+'%"></span></span><span class="tn-wtl">won '+r.wins+" · tied "+r.ties+" · lost "+r.losses+'</span></td>'+
    '<td class="num"><b>'+r.total+'</b></td><td class="num tn-c4">'+r.wins+" · "+r.ties+" · "+r.losses+"</td></tr>").join("")+
   '</tbody></table></div>'+
   '<p class="tn-sub">What to notice</p><ul class="tn-insights">'+insights(result).map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>"+
   '<p class="tn-sub" id="tn-mhead">Matches for '+esc(P.name)+'</p><div class="tn-matches">'+
   P.matches.slice().sort((a,b)=>b.pts-a.pts).map(m=>{const o=result.rows[m.opp];
    return '<div class="tn-match"><p><b>'+esc(P.name)+" "+m.pts+"</b> · "+esc(o.name)+" "+m.oppPts+"</p>"+
     '<div class="tn-pair"><span>'+esc(P.name)+"</span>"+strip(m.mine,P.name)+"<span>"+esc(o.name)+"</span>"+strip(m.theirs,o.name)+"</div></div>";}).join("")+
   '</div><p class="note">C is cooperate and B is betray, one square for each round. Who wins depends on who else is in the field, so switch strategies off or add new ones and run it again. Try this: build a strategy that beats Tit for Tat head to head, then check where it finishes.</p>';
 }
 function run(){
  const list=players(),msg=$("#tn-msg");
  if(list.length<2){result=null;showResult();msg.textContent="Add at least two strategies to the field.";return;}
  result=tournament(list,+$("#tn-rounds").value,Math.floor(Math.random()*4294967295)+1);
  const me=mine&&result.rows.find(r=>r.name===mine&&r.kind==="class");
  picked=me?me.i:null;
  showResult(true);
 }

 el.addEventListener("change",e=>{
  const t=e.target;
  if(t.name&&t.name.indexOf("tn-")===0){const k=t.name.slice(3);rule[k]=k==="grudge"||k==="every"?+t.value:t.value;showRule();$("#tn-msg").textContent="";}
  else if(t.dataset.classic){if(t.checked)off.delete(t.dataset.classic);else off.add(t.dataset.classic);}
 });
 el.addEventListener("click",e=>{
  const t=e.target.closest("button");if(!t)return;
  if(t.id==="tn-add"){const name=addEntry($("#tn-name").value,encode(rule),$("#tn-msg"));if(name){mine=name;$("#tn-name").value="";}}
  else if(t.id==="tn-cadd"){
   const r=parse($("#tn-ccode").value),msg=$("#tn-cmsg");
   if(!r){msg.textContent="That code doesn't look right. A code is six characters, like CCB00R.";return;}
   if(addEntry($("#tn-cname").value,encode(r),msg)){$("#tn-cname").value="";$("#tn-ccode").value="";$("#tn-cname").focus();}
  }
  else if(t.id==="tn-run")run();
  else if(t.id==="tn-clear"){roster=[];mine=null;saveRoster(roster);showField();result=null;showResult();$("#tn-msg").textContent="Added strategies cleared.";}
  else if(t.dataset.remove!=null){roster.splice(+t.dataset.remove,1);saveRoster(roster);showField();}
  else if(t.dataset.pick!=null){picked=+t.dataset.pick;showResult(false);const b=el.querySelector('[data-pick="'+picked+'"]');if(b)b.focus();}
 });
 showRule();showField();
}
H.lessonTools=H.lessonTools||{};H.lessonTools["lab/l8"]=render;
window.TournamentCore={PAY,CLASSICS,parse,encode,ruleMove,match,tournament,insights,classicFor,cleanName,uniqueName,rng};
})();
