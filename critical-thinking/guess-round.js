/* Game Theory · Run a Round (Lesson 2, Guess 2/3 of the Average).
   Rules from the lesson: everyone picks 0 to 100, the target is 2/3 of the group's average, closest wins.
   The teacher (or a student trying ideas) types in a set of guesses and sees the spread, the average, the target and the closest guess.
   Rounds are kept on the page only while it is open. Nothing is saved or submitted. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const MAX=60,CEILING=200/3;
const one=x=>(Math.round(x*10)/10).toFixed(1).replace(/\.0$/,"");

/* ---------- core (no DOM) ---------- */
const isNum=t=>/^\d{1,3}(\.\d+)?$/.test(t);
// Entries are separated by commas or new lines. An entry is either numbers only ("50 33 22") or a name then a number ("Sam 33").
function parseGuesses(text){
 const guesses=[],rejected=[];
 for(const chunk of String(text==null?"":text).split(/[,;\n]+/)){
  const tokens=chunk.trim().split(/\s+/).filter(Boolean);if(!tokens.length)continue;
  const add=(name,t)=>{const v=Number(t);if(isNum(t)&&v>=0&&v<=100)guesses.push({name,value:v});else rejected.push((name?name+" ":"")+t);};
  const digits=t=>/^\d+(\.\d+)?$/.test(t);
  // Two or more numbers in one entry means a plain list, so anything that is not a number is left out on its own.
  if(tokens.every(digits)||tokens.filter(digits).length>1)tokens.forEach(t=>add("",t));
  else{const last=tokens[tokens.length-1],name=tokens.slice(0,-1).join(" ").replace(/[:=-]+$/,"").trim().slice(0,18);
   if(isNum(last))add(name,last);else rejected.push(tokens.join(" "));}
 }
 return {guesses:guesses.slice(0,MAX),rejected,over:Math.max(0,guesses.length-MAX)};
}
function score(guesses){
 const n=guesses.length;if(!n)throw Error("No guesses");
 const average=guesses.reduce((s,g)=>s+g.value,0)/n,target=average*2/3;
 const best=Math.min(...guesses.map(g=>Math.abs(g.value-target)));
 const winners=guesses.map((g,i)=>i).filter(i=>Math.abs(guesses[i].value-target)-best<1e-9);
 return {n,average,target,best,winners,tooHigh:guesses.filter(g=>g.value>CEILING).length};
}
// Level 0 is 50, and each level deeper takes 2/3 of the one before.
const level=k=>50*Math.pow(2/3,k);
function nearestLevel(target){let k=0;for(let i=1;i<=8;i++)if(Math.abs(level(i)-target)<Math.abs(level(k)-target))k=i;return k;}
const who=g=>g.name?g.name+" ("+one(g.value)+")":"the guess of "+one(g.value);
function insights(guesses,s){
 const out=["The average was "+one(s.average)+", so the target was "+one(s.target)+"."];
 const names=[...new Set(s.winners.map(i=>who(guesses[i])))];
 out.push("Closest: "+(names.length>1?names.slice(0,-1).join(", ")+" and "+names[names.length-1]:names[0])+", off by "+one(s.best)+".");
 if(s.n>1){const k=nearestLevel(s.target);
  out.push(s.target<2?"The target is almost at 0, which is where the thinking ends up if everyone keeps going."
   :"The target landed closest to Level "+k+" thinking ("+one(level(k))+").");}
 if(s.tooHigh)out.push(s.tooHigh+(s.tooHigh===1?" guess was":" guesses were")+" above 67. The target can never be higher than that, because 2/3 of 100 is about 67.");
 return out;
}
function withExtra(guesses,value){return score([...guesses,{name:"",value}]).target;}

/* ---------- chart ---------- */
// width is the space available on the page, so the labels stay readable on a phone.
function plot(guesses,s,width){
 const W=Math.round(Math.max(300,Math.min(720,width||720))),px=W<480?16:28,pw=W-2*px,x=v=>px+v/100*pw,bins={};
 guesses.forEach((g,i)=>{const b=Math.round(g.value);(bins[b]=bins[b]||[]).push(i);});
 const tall=Math.max(...Object.values(bins).map(a=>a.length)),r=6,step=Math.min(15,Math.max(5,150/tall)),top=44,base=top+Math.max(60,tall*step+10),Hh=base+46;
 const win=new Set(s.winners),side=v=>x(v)>W-120?["end",-6]:["start",6];
 let g='<svg viewBox="0 0 '+W+" "+Hh+'" role="img" aria-label="Dot plot of '+s.n+" guesses from 0 to 100. Average "+one(s.average)+", target "+one(s.target)+
  '." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">';
 g+='<line x1="'+px+'" y1="'+base+'" x2="'+(px+pw)+'" y2="'+base+'" stroke="var(--muted)"/>';
 for(let v=0;v<=100;v+=10)g+='<line x1="'+x(v)+'" y1="'+base+'" x2="'+x(v)+'" y2="'+(base+5)+'" stroke="var(--muted)"/><text x="'+x(v)+'" y="'+(base+19)+'" text-anchor="middle" font-size="12" fill="var(--muted)">'+v+"</text>";
 [0,1,2,3].forEach(k=>{g+='<text x="'+x(level(k))+'" y="'+(base+38)+'" text-anchor="middle" font-size="11.5" style="font-family:var(--f-typed)" fill="var(--muted)">L'+k+"</text>";});
 const mark=(v,label,colour,y,dash)=>{const [a,d]=side(v);
  return '<line x1="'+x(v)+'" y1="'+(y+4)+'" x2="'+x(v)+'" y2="'+base+'" stroke="'+colour+'" stroke-width="2"'+(dash?' stroke-dasharray="5 4"':"")+'/>'+
   '<text x="'+(x(v)+d)+'" y="'+y+'" text-anchor="'+a+'" font-size="13.5" font-weight="700" fill="'+colour+'">'+label+"</text>";};
 g+=mark(s.average,"Average "+one(s.average),"var(--violet)",30,true)+mark(s.target,"Target "+one(s.target),"var(--accent)",14,false);
 Object.keys(bins).forEach(b=>bins[b].forEach((i,k)=>{
  g+='<circle cx="'+x(+b)+'" cy="'+(base-r-2-k*step)+'" r="'+r+'" fill="'+(win.has(i)?"var(--accent)":"var(--ink)")+'"'+(win.has(i)?' stroke="var(--ink)" stroke-width="2"':' fill-opacity=".72"')+"/>";}));
 return g+"</svg>";
}

/* ---------- page ---------- */
function render(el){
 let current=null,history=[];
 const $=s=>el.querySelector(s);
 el.innerHTML='<section class="tn gr"><h2>Run a Round</h2>'+
 '<p class="span">Guess 2/3 of the average</p>'+
 '<p class="tn-lede">Type in every guess from 0 to 100 and see where the group landed. The target is 2/3 of the average, and the closest guess wins.</p>'+
 '<label class="tn-lab" for="gr-in">The guesses</label>'+
 '<textarea id="gr-in" class="tn-in gr-in" rows="4" spellcheck="false" autocomplete="off"></textarea>'+
 '<p class="note">Separate guesses with spaces, commas or new lines. To show a name, put it in front of the number and use a comma or a new line between people, like Sam 33, Ava 22.</p>'+
 '<div class="tn-actions"><button class="btn" id="gr-go" type="button">Find the target</button><button class="btn ghost" id="gr-clear" type="button">Clear the guesses</button><span class="tn-msg" id="gr-msg" role="status"></span></div>'+
 '<div id="gr-out" aria-live="polite"></div><div id="gr-hist"></div></section>';

 function showHistory(){
  if(!history.length){$("#gr-hist").innerHTML="";return;}
  const first=history[0].s.target,last=history[history.length-1].s.target;
  $("#gr-hist").innerHTML='<p class="tn-sub">Rounds so far</p><div class="tn-tablewrap"><table class="tn-table"><thead><tr><th scope="col">Round</th><th scope="col" class="num">Guesses</th><th scope="col" class="num">Average</th><th scope="col" class="num">Target</th><th scope="col">Closest</th></tr></thead><tbody>'+
   history.map((h,k)=>'<tr><td class="tn-rank">'+(k+1)+'</td><td class="num">'+h.s.n+'</td><td class="num">'+one(h.s.average)+'</td><td class="num"><b>'+one(h.s.target)+'</b></td><td>'+
    esc([...new Set(h.s.winners.map(i=>h.g[i].name||one(h.g[i].value)))].join(", "))+"</td></tr>").join("")+"</tbody></table></div>"+
   (history.length>1?'<p class="tn-sum">The target went from '+one(first)+" in Round 1 to "+one(last)+" in Round "+history.length+".</p>":"")+
   '<div class="tn-actions"><button class="btn ghost" id="gr-reset" type="button">Clear the rounds</button></div>';
 }
 function showRound(){
  const out=$("#gr-out");if(!current){out.innerHTML="";return;}
  const {g,s}=current;
  out.innerHTML='<p class="tn-sub">Round '+(history.length+1)+": "+s.n+(s.n===1?" guess":" guesses")+'</p><div class="gr-plot">'+plot(g,s,$("#gr-out").clientWidth)+"</div>"+
   '<p class="note">Each dot is one guess. The outlined dot is the closest. L0 to L3 mark the levels of thinking from the lesson: 50, 33, 22 and 15.</p>'+
   '<ul class="tn-insights">'+insights(g,s).map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>"+
   '<div class="tn-actions"><button class="btn" id="gr-keep" type="button">Keep this round and start the next</button><button class="btn ghost" id="gr-100" type="button">What if one more player picked 100?</button></div>'+
   '<p class="tn-msg" id="gr-what" role="status"></p>';
 }
 el.addEventListener("click",e=>{
  const t=e.target.closest("button");if(!t)return;
  const msg=$("#gr-msg");
  if(t.id==="gr-go"){
   const p=parseGuesses($("#gr-in").value);
   if(!p.guesses.length){current=null;showRound();msg.textContent="Type at least one guess from 0 to 100.";return;}
   current={g:p.guesses,s:score(p.guesses)};showRound();
   msg.textContent=(p.rejected.length?"Left out (not a number from 0 to 100): "+p.rejected.slice(0,6).join(", ")+(p.rejected.length>6?" and more":"")+". ":"")+(p.over?"Only the first "+MAX+" guesses were used.":"");
  }
  else if(t.id==="gr-clear"){$("#gr-in").value="";current=null;showRound();msg.textContent="";$("#gr-in").focus();}
  else if(t.id==="gr-keep"&&current){history.push(current);if(history.length>8)history.shift();current=null;$("#gr-in").value="";showRound();showHistory();msg.textContent="Round kept. Type the next round's guesses.";$("#gr-in").focus();}
  else if(t.id==="gr-100"&&current){const nt=withExtra(current.g,100);
   $("#gr-what").textContent="With one more guess of 100, the target moves from "+one(current.s.target)+" to "+one(nt)+". The smaller the group, the more one guess can move it.";}
  else if(t.id==="gr-reset"){history=[];showHistory();showRound();}
 });
}
H.lessonTools=H.lessonTools||{};H.lessonTools["games/g2"]=render;
window.GuessRoundCore={parseGuesses,score,level,nearestLevel,insights,withExtra,plot};
})();
