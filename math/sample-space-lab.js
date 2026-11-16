/* Grade 7 Probability · Sample Space Lab (Lesson 4, Two Independent Events and Sample Spaces).
   Students see every ordered outcome of two events as a table, mark the outcomes that count for a question,
   check their marking, read the probability as a fraction and a percent, then run trials to compare (Lesson 5).
   The Chance Lab (one event) and the Probability Investigation (a bag, drawn twice) are left alone.
   Everything runs in the browser. Nothing is saved or sent. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const COIN=["H","T"],DIE=[1,2,3,4,5,6],MAX_TRIALS=5000;
const isH=x=>x==="H",isT=x=>x==="T";

/* ---------- core (no DOM) ---------- */
const SETUPS={
 coins:{name:"Two coins",first:{label:"First flip",out:COIN},second:{label:"Second flip",out:COIN},
  events:[
   {id:"hh",q:"two heads",test:(a,b)=>isH(a)&&isH(b)},
   {id:"one",q:"exactly one head",test:(a,b)=>isH(a)!==isH(b)},
   {id:"tail",q:"at least one tail",test:(a,b)=>isT(a)||isT(b)},
   {id:"same",q:"both flips the same",test:(a,b)=>a===b}]},
 coindie:{name:"A coin and a die",first:{label:"Coin",out:COIN},second:{label:"Die",out:DIE},
  events:[
   {id:"h6",q:"heads and a 6",test:(a,b)=>isH(a)&&b===6},
   {id:"teven",q:"tails and an even number",test:(a,b)=>isT(a)&&b%2===0},
   {id:"hbig",q:"heads and a number greater than 4",test:(a,b)=>isH(a)&&b>4},
   {id:"odd",q:"an odd number (with either side of the coin)",test:(a,b)=>b%2===1}]},
 dice:{name:"Two dice",first:{label:"First die",out:DIE},second:{label:"Second die",out:DIE},
  events:[
   {id:"s7",q:"a sum of 7",test:(a,b)=>a+b===7},
   {id:"dbl",q:"doubles (both dice the same)",test:(a,b)=>a===b},
   {id:"s10",q:"a sum of 10 or more",test:(a,b)=>a+b>=10},
   {id:"six",q:"at least one 6",test:(a,b)=>a===6||b===6},
   {id:"s2",q:"a sum of 2",test:(a,b)=>a+b===2}]}
};
function space(setup){const out=[];setup.first.out.forEach((a,i)=>setup.second.out.forEach((b,j)=>out.push({a,b,i,j})));return out;}
function favourable(setup,eventId){const e=setup.events.find(x=>x.id===eventId);if(!e)throw Error("Unknown event");return space(setup).map((c,k)=>e.test(c.a,c.b)?k:-1).filter(k=>k>=0);}
const gcd=(a,b)=>b?gcd(b,a%b):a;
function fraction(n,d){if(!d)return "0";if(n===0)return "0";if(n===d)return "1";const g=gcd(n,d);return (n/g)+"/"+(d/g);}
// 1/4 is exactly 25%. 1/6 is "about 17%", the rounding the unit teaches. Small chances keep one decimal.
function percent(n,d){
 const p=100*n/d;
 if(Math.abs(p*10-Math.round(p*10))<1e-9)return String(Math.round(p*10)/10)+"%";
 return "about "+(p>=10?Math.round(p):(Math.round(p*10)/10).toFixed(1))+"%";
}
function probability(n,d){const s=fraction(n,d),u=n+"/"+d,p=percent(n,d);return (s===u?u:u+" = "+s)+(p.indexOf("about ")===0?" ≈ "+p.slice(6):" = "+p);}
// Each trial picks the first and second results separately, which is what makes the two events independent.
function simulate(setup,n,rng){
 if(!Number.isInteger(n)||n<1||n>MAX_TRIALS)throw Error("Invalid number of trials");
 const r=rng||Math.random,A=setup.first.out.length,B=setup.second.out.length,counts=new Array(A*B).fill(0);
 for(let k=0;k<n;k++)counts[Math.floor(r()*A)*B+Math.floor(r()*B)]++;
 return counts;
}
function compare(marked,size){
 // marked and the answer are arrays of cell indexes
 return function(answer){const m=new Set(marked),a=new Set(answer);let extra=0,missing=0;m.forEach(k=>{if(!a.has(k))extra++;});a.forEach(k=>{if(!m.has(k))missing++;});return {extra,missing,right:extra===0&&missing===0,size};};
}

/* ---------- page ---------- */
function lab(el){
 let key="coins",eventId=SETUPS.coins.events[0].id,marked=new Set(),counts=null,trials=0,sums=false,solved=false,msg="",last="";
 const $=s=>el.querySelector(s);
 function setup(){return SETUPS[key];}
 function label(c){return key==="dice"?(sums?String(c.a+c.b):c.a+", "+c.b):c.a+", "+c.b;}
 function say(c){return setup().first.label+" "+(c.a==="H"?"heads":c.a==="T"?"tails":c.a)+", "+setup().second.label.toLowerCase()+" "+(c.b==="H"?"heads":c.b==="T"?"tails":c.b);}
 function render(focus){
  const S=setup(),cells=space(S),N=cells.length,A=S.first.out.length,B=S.second.out.length,own=eventId==="own";
  const ev=own?null:S.events.find(e=>e.id===eventId),k=marked.size,peak=counts?Math.max(1,...counts):1;
  const hits=counts?[...marked].reduce((t,i)=>t+counts[i],0):0;
  const head='<tr><td class="ss-corner"></td>'+S.second.out.map(b=>'<th scope="col">'+b+'</th>').join("")+'</tr>';
  const rows=S.first.out.map((a,i)=>'<tr><th scope="row">'+a+'</th>'+S.second.out.map((b,j)=>{const idx=i*B+j,c=cells[idx],on=marked.has(idx);
   return '<td><button type="button" class="ss-cell" data-cell="'+idx+'" aria-pressed="'+on+'" aria-label="'+esc(say(c))+(counts?", came up "+counts[idx]+" times":"")+'"><b>'+esc(label(c))+'</b>'+
    (counts?'<i>'+counts[idx]+'</i><u style="width:'+(100*counts[idx]/peak).toFixed(0)+'%"></u>':"")+'</button></td>';}).join("")+'</tr>').join("");
  const prob=own?(k?'P(your event) = '+probability(k,N):'Mark some outcomes to see their probability.')
   :solved?'P('+esc(ev.q)+') = '+probability(k,N):'You have marked '+k+' of '+N+' outcomes.';
  el.innerHTML='<section class="ss-lab"><h2>Sample Space Lab</h2>'+
  '<p class="note">Two events, one after the other. The table shows every ordered outcome, so nothing gets missed. Mark the outcomes that count, then test your answer with trials.</p>'+
  '<fieldset class="ss-set"><legend>1. Choose the two events</legend><div class="ss-seg">'+Object.keys(SETUPS).map(id=>'<label><input type="radio" name="ss-setup" value="'+id+'"'+(id===key?" checked":"")+'><span>'+esc(SETUPS[id].name)+'</span></label>').join("")+'</div></fieldset>'+
  '<p class="ss-count">'+esc(S.first.label)+': '+A+' outcomes. '+esc(S.second.label)+': '+B+' outcomes. <b>'+A+' × '+B+' = '+N+' ordered outcomes</b>, all equally likely.</p>'+
  '<label class="ss-lab-l" for="ss-event">2. What are you looking for?</label>'+
  '<select id="ss-event" class="ss-in">'+S.events.map(e=>'<option value="'+e.id+'"'+(e.id===eventId?" selected":"")+'>'+esc(e.q.charAt(0).toUpperCase()+e.q.slice(1))+'</option>').join("")+'<option value="own"'+(own?" selected":"")+'>My own event (no checking)</option></select>'+
  '<p class="ss-lab-l" id="ss-step3">3. Tap every outcome that counts</p>'+
  (key==="dice"?'<label class="ss-toggle"><input type="checkbox" id="ss-sums"'+(sums?" checked":"")+'> Show the sum of the two dice in each box</label>':"")+
  '<p class="ss-axes">Rows: '+esc(S.first.label.toLowerCase())+'. Columns: '+esc(S.second.label.toLowerCase())+'.</p><div class="ss-scroll"><table class="ss-grid ss-n'+B+'" aria-labelledby="ss-step3"><thead>'+head+'</thead><tbody>'+rows+'</tbody></table></div>'+
  '<p class="ss-prob" id="ss-prob">'+prob+'</p>'+
  '<div class="ss-actions">'+(own?"":'<button type="button" class="btn" id="ss-check">Check my marking</button><button type="button" class="btn ghost" id="ss-show">Show the answer</button>')+'<button type="button" class="btn ghost" id="ss-clear">Clear marks</button></div>'+
  '<p class="ss-msg" id="ss-msg" role="status">'+esc(msg)+'</p>'+
  '<p class="ss-lab-l">4. Test it</p>'+
  '<p class="note">Each trial does both events once. The small number in a box is how many times that outcome came up.</p>'+
  '<div class="ss-actions"><button type="button" class="btn" data-run="10">Run 10 trials</button><button type="button" class="btn ghost" data-run="100">Run 100</button><button type="button" class="btn ghost" data-run="1000">Run 1000</button><button type="button" class="btn ghost" id="ss-reset">Reset trials</button></div>'+
  '<p class="ss-result" id="ss-result" aria-live="polite">'+(trials?(k?'In '+trials+' trials, your marked outcomes came up <b>'+hits+'</b> times: <b>'+percent(hits,trials).replace(/^about /,"")+'</b>. The sample space predicts '+percent(k,N)+'.':'After '+trials+' trials. Mark some outcomes to compare them with the prediction.')+' '+esc(last):"No trials yet.")+'</p>'+
  '<p class="note">Results are random, so they change every time. More trials usually land closer to the prediction, but never exactly on it every time.</p></section>';
  if(focus){const f=$(focus);if(f)f.focus({preventScroll:true});}
 }
 function fresh(){marked=new Set();counts=null;trials=0;solved=false;msg="";last="";}
 el.addEventListener("change",e=>{const t=e.target;
  if(t.name==="ss-setup"){key=t.value;eventId=SETUPS[key].events[0].id;sums=false;fresh();render('input[name="ss-setup"]:checked');}
  else if(t.id==="ss-event"){eventId=t.value;marked=new Set();solved=false;msg="";render("#ss-event");}
  else if(t.id==="ss-sums"){sums=t.checked;render("#ss-sums");}
 });
 el.addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;
  const S=setup(),N=space(S).length;
  if(t.dataset.cell!=null){const i=+t.dataset.cell;if(marked.has(i))marked.delete(i);else marked.add(i);solved=false;msg="";render('[data-cell="'+i+'"]');}
  else if(t.id==="ss-check"){const r=compare([...marked],N)(favourable(S,eventId));solved=r.right;
   msg=r.right?"That's all of them, and nothing extra.":(!marked.size?"Nothing is marked yet. Tap the outcomes that count.":
    (r.extra?r.extra+(r.extra===1?" marked outcome doesn't":" marked outcomes don't")+" belong. ":"")+(r.missing?r.missing+(r.missing===1?" outcome is":" outcomes are")+" still missing.":"")+" Go through the table one row at a time.");
   render("#ss-check");}
  else if(t.id==="ss-show"){marked=new Set(favourable(S,eventId));solved=true;msg="These are the outcomes that count. Check each one against the question.";render("#ss-show");}
  else if(t.id==="ss-clear"){marked=new Set();solved=false;msg="";render("#ss-clear");}
  else if(t.id==="ss-reset"){counts=null;trials=0;last="Trials cleared. The sample space has not changed.";render("#ss-reset");last="";}
  else if(t.dataset.run){const n=+t.dataset.run;
   if(trials+n>MAX_TRIALS){last="This lab stops at "+MAX_TRIALS+" trials. Reset to start again.";render('[data-run="'+n+'"]');last="";return;}
   const add=simulate(S,n);counts=counts?counts.map((c,i)=>c+add[i]):add;trials+=n;last="";render('[data-run="'+n+'"]');}
 });
 render();
}
H.lessonTools=Object.assign(H.lessonTools||{},{"prob/p4":lab});
H.sampleSpaceModel={SETUPS,space,favourable,fraction,percent,probability,simulate,compare,MAX_TRIALS};
})();
