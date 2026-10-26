/* Think Lab · Payoff Matrix and Repeated-Game Explorer
   Source: teacher's GameTheory_Student_Booklet (CC 3/3, BB 1/1, BC 5/0, CB 0/5).
   An original practice model with deterministic hypothetical strategies.
   Student data is not saved or submitted. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const SCORES={CC:[3,3],CB:[0,5],BC:[5,0],BB:[1,1]};
const STRATEGIES=[
 {id:"alwaysC",label:"Always Cooperate",desc:"Choose cooperate every round."},
 {id:"alwaysB",label:"Always Betray",desc:"Choose betray every round."},
 {id:"tit",label:"Tit for Tat",desc:"Cooperate first, then copy the other player's previous move."},
 {id:"grudger",label:"Grudger",desc:"Cooperate until the other player betrays; then betray in later rounds."}
];
const fmt=n=>n===1?"point":"points";
function move(id,own,other){
 if(!STRATEGIES.some(s=>s.id===id))throw Error("Unknown strategy");
 if(id==="alwaysC")return "C";
 if(id==="alwaysB")return "B";
 if(id==="tit")return other.length?other[other.length-1]:"C";
 return other.includes("B")?"B":"C";
}
function play(a,b,rounds=10){
 if(!Number.isInteger(rounds)||rounds<1||rounds>20)throw Error("Invalid round count");
 const mine=[],theirs=[],rows=[];let totalA=0,totalB=0;
 for(let i=0;i<rounds;i++){
  const choiceA=move(a,mine,theirs),choiceB=move(b,theirs,mine);
  const [payA,payB]=SCORES[choiceA+choiceB];
  totalA+=payA;totalB+=payB;
  rows.push({round:i+1,choiceA,choiceB,payA,payB,totalA,totalB});
  mine.push(choiceA);theirs.push(choiceB);
 }
 return {rows,totalA,totalB,combined:totalA+totalB};
}
function comparePayoffs(otherChoice){
 if(!["C","B"].includes(otherChoice))throw Error("Invalid opposing choice");
 const c=SCORES["C"+otherChoice][0],b=SCORES["B"+otherChoice][0];
 return {cooperate:c,betray:b,better:b>c?"B":c>b?"C":"equal"};
}
function chart(result){
 const W=740,H=302,px=64,py=35,pw=620,ph=216,top=Math.max(35,Math.ceil(Math.max(result.totalA,result.totalB)/5)*5);
 const x=i=>px+(i/result.rows.length)*pw;
 const y=v=>py+ph-(v/top)*ph;
 let s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Cumulative points after '+result.rows.length+
 ' rounds: Player A '+result.totalA+', Player B '+result.totalB+
 '. Horizontal axis is rounds; vertical axis is total points." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:740px">';
 s+='<rect width="'+W+'" height="'+H+'" rx="10" fill="#181F28"/>';
 for(let j=0;j<=5;j++){
  const n=Math.round(top*j/5),yy=y(n);
  s+='<line x1="'+px+'" y1="'+yy+'" x2="'+(px+pw)+'" y2="'+yy+'" stroke="#56606C" stroke-dasharray="3 5"/>'+
    '<text x="'+(px-12)+'" y="'+(yy+4)+'" fill="#DEE5EC" font-size="12" text-anchor="end">'+n+'</text>';
 }
 for(let i=0;i<=result.rows.length;i++){
  const xx=x(i);
  s+='<text x="'+xx+'" y="'+(py+ph+20)+'" fill="#DEE5EC" font-size="11" text-anchor="middle">'+i+'</text>';
 }
 const line=key=>[[x(0),y(0)],...result.rows.map((r,i)=>[x(i+1),y(r[key])])].map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ");
 s+='<polyline points="'+line("totalA")+'" fill="none" stroke="#51E5B5" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
 s+='<polyline points="'+line("totalB")+'" fill="none" stroke="#C0A6FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
 s+='<text x="63" y="19" fill="#51E5B5" font-weight="700" font-size="13">A · '+result.totalA+'</text>'+
 '<text x="170" y="19" fill="#C0A6FF" font-weight="700" font-size="13">B · '+result.totalB+'</text>'+
 '<text x="'+(px+pw/2)+'" y="294" fill="#DEE5EC" font-size="12" text-anchor="middle">Round</text></svg>';
 return s;
}
function render(el){
 let a="tit",b="alwaysB",selected="CC",answer="",started=false,reflection="";
 const $=id=>el.querySelector(id);
 el.innerHTML='<section class="payoff-lab"><style>'+
 '.payoff-lab{color:var(--ink);font-family:var(--f-body);line-height:1.5}'+
 '.payoff-lab button:focus-visible,.payoff-lab select:focus-visible,.payoff-lab textarea:focus-visible{outline:3px solid var(--accent);outline-offset:3px}'+
 '.payoff-lab .pl-matrix{border-collapse:collapse;width:100%;max-width:660px;table-layout:fixed}'+
 '.payoff-lab .pl-matrix td,.payoff-lab .pl-matrix th{border:1px solid var(--rule);padding:9px 10px;font-size:14px;text-align:center}'+
 '.payoff-lab .pl-matrix th{background:var(--soft)}'+
 '.payoff-lab .pl-matrix button{font:inherit;width:100%;color:var(--ink);background:var(--paper);padding:12px 8px;border:2px solid transparent;border-radius:6px;cursor:pointer;min-height:64px}'+
 '.payoff-lab .pl-matrix button[aria-pressed=true]{border-color:var(--accent);background:var(--accent-soft)}'+
 '.payoff-lab .pl-controls{display:flex;flex-wrap:wrap;align-items:end;gap:12px;margin:17px 0}'+
 '.payoff-lab label{display:grid;gap:6px;font-size:13px;font-weight:700}'+
 '.payoff-lab select{font:inherit;background:var(--paper);color:var(--ink);padding:10px 11px;min-height:44px;border:1px solid var(--rule);border-radius:7px;max-width:100%}'+
 '.payoff-lab .pl-panel{background:var(--paper);border:1px solid var(--rule);border-radius:9px;padding:16px 17px;margin:13px 0}'+
 '.payoff-lab .pl-panel h3{margin:0 0 10px;font-size:19px;padding:0;border:0;color:var(--ink)}'+
 '.payoff-lab .pl-chart{overflow-x:auto;border-radius:9px;margin:15px 0;background:#181F28}'+
 '.payoff-lab .pl-table-wrap{overflow-x:auto}'+
 '.payoff-lab .pl-results{width:100%;border-collapse:collapse;font-size:13px;min-width:440px}'+
 '.payoff-lab .pl-results th,.payoff-lab .pl-results td{padding:7px;border-bottom:1px solid var(--rule);text-align:center}'+
 '.payoff-lab .pl-results th{background:var(--soft)}'+
 '.payoff-lab textarea{width:100%;min-height:90px;font:inherit;font-size:15px;padding:10px;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:7px}'+
 '.payoff-lab .pl-feedback{font-weight:650;min-height:23px;color:var(--accent-ink)}'+
 '</style><div class="eyebrow">Think Lab · Game Theory</div><h2 style="margin:8px 0">Payoff Matrix Explorer</h2>'+
 '<p class="note">A choice can help you in one round but hurt both players over time. Investigate the exact points from our Prisoner’s Dilemma booklet.</p>'+
 '<div class="pl-panel"><h3>Part 1 · Read the payoff matrix</h3>'+
 '<p class="note">Choose a cell. Each pair is written <b>(Player A points, Player B points)</b>. Cooperate = C; Betray = B.</p>'+
 '<table class="pl-matrix"><thead><tr><th scope="col">A chooses ↓ / B chooses →</th><th scope="col">B: Cooperate</th><th scope="col">B: Betray</th></tr></thead>'+
 '<tbody><tr><th scope="row">A: Cooperate</th><td><button type="button" data-cell="CC">3, 3</button></td><td><button type="button" data-cell="CB">0, 5</button></td></tr>'+
 '<tr><th scope="row">A: Betray</th><td><button type="button" data-cell="BC">5, 0</button></td><td><button type="button" data-cell="BB">1, 1</button></td></tr></tbody></table>'+
 '<p id="pl-explain" class="pl-panel" aria-live="polite"></p>'+
 '<p><strong>Think:</strong> Which decision gives Player A more points if B cooperates? What if B betrays?</p>'+
 '<div class="pl-controls"><button type="button" class="btn ghost" id="pl-check">Show the one-round incentive</button></div>'+
 '<p id="pl-incentive" class="pl-feedback" aria-live="polite"></p></div>'+
 '<div class="pl-panel"><h3>Part 2 · Simulate 10 repeated rounds</h3>'+
 '<p class="note">Choose one strategy for each player. Strategies use the previous rounds, not secret information about the next move.</p>'+
 '<div class="pl-controls"><label>Player A strategy<select id="pl-a"></select></label>'+
 '<label>Player B strategy<select id="pl-b"></select></label>'+
 '<button type="button" class="btn" id="pl-run">Run 10 rounds</button></div>'+
 '<div id="pl-output" aria-live="polite"></div></div>'+
 '<div class="pl-panel"><h3>Part 3 · Explain the result</h3><p>When is the best one-round choice different from what helps both players over time? Use numbers from the table or graph.</p>'+
 '<textarea id="pl-reflection" aria-label="Explain your game theory conclusion" placeholder="I noticed… because…"></textarea>'+
 '<div class="pl-controls"><button class="btn ghost" id="pl-copy" type="button">Copy my explanation</button></div>'+
 '<p class="pl-feedback" id="pl-copy-status" role="status" aria-live="polite"></p></div>'+
 '<p class="note">This simulation shows hypothetical strategies and points, not guaranteed real-world behaviour. Nothing is saved, graded or submitted automatically.</p></section>';
 const options=STRATEGIES.map(x=>'<option value="'+x.id+'">'+x.label+'</option>').join("");
 $("#pl-a").innerHTML=options;$("#pl-b").innerHTML=options;$("#pl-a").value=a;$("#pl-b").value=b;
 function showMatrix(){
  el.querySelectorAll("[data-cell]").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.cell===selected)));
  const m=SCORES[selected],label=x=>x==="C"?"cooperates":"betrays";
  $("#pl-explain").textContent="A "+label(selected[0])+"; B "+label(selected[1])+
   ". Player A receives "+m[0]+" "+(m[0]===1?"point":"points")+" and B receives "+m[1]+" "+fmt(m[1])+".";
 }
 el.querySelectorAll("[data-cell]").forEach(btn=>btn.onclick=()=>{selected=btn.dataset.cell;showMatrix();});
 $("#pl-check").onclick=()=>{
  const coop=comparePayoffs("C"),betray=comparePayoffs("B");
  $("#pl-incentive").textContent="If B cooperates, A gets "+coop.cooperate+" by cooperating and "+coop.betray+
   " by betraying. If B betrays, A gets "+betray.cooperate+" by cooperating and "+
   betray.betray+" by betraying. In both cases, betraying gives A more points in this one-round matrix.";
 };
 $("#pl-run").onclick=()=>{
  a=$("#pl-a").value;b=$("#pl-b").value;
  const result=play(a,b),items=result.rows;
  $("#pl-output").innerHTML='<p><b>Final totals:</b> Player A '+result.totalA+' · Player B '+result.totalB+
  ' · Combined '+result.combined+' points out of a possible 60 combined points if both always cooperate.</p>'+
  '<div class="pl-chart">'+chart(result)+'</div>'+
  '<div class="pl-table-wrap"><table class="pl-results"><thead><tr><th>Round</th><th>A</th><th>B</th><th>A points</th><th>B points</th><th>A total</th><th>B total</th></tr></thead><tbody>'+
  items.map(r=>'<tr><td>'+r.round+'</td><td>'+r.choiceA+'</td><td>'+r.choiceB+'</td><td>'+r.payA+'</td><td>'+r.payB+
  '</td><td>'+r.totalA+'</td><td>'+r.totalB+'</td></tr>').join("")+'</tbody></table></div>'+
  '<p class="note">A strategy that earns more personally need not maximize the combined score. Compare other pairs and use the graph to explain.</p>';
 };
 $("#pl-copy").onclick=()=>{
  const content=$("#pl-reflection").value.trim(),status=$("#pl-copy-status");
  if(!content){status.textContent="Write an explanation before copying.";return;}
  if(navigator.clipboard?.writeText)navigator.clipboard.writeText(content).then(()=>status.textContent="Explanation copied.").catch(()=>status.textContent="Select your response and copy it manually.");
  else{$("#pl-reflection").select();status.textContent="Select your response and copy it manually.";}
 };
 showMatrix();$("#pl-run").click();
}
H.lessonTools=H.lessonTools||{};H.lessonTools["games/g1"]=render;
window.PayoffMatrixCore={SCORES,STRATEGIES,move,play,comparePayoffs,chart};
})();
