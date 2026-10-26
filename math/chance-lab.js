/* Grade 7 Probability Lab: visual follow-up to the physical Tally Lab and Design a Spinner.
   The existing Probability Bag is intentionally left alone. No data is stored or sent. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const EXP={
 coin:{name:"Fair coin",labels:["Heads","Tails"],weights:[1,1],description:"Two equally likely sides."},
 die:{name:"Fair six-sided die",labels:["1","2","3","4","5","6"],weights:[1,1,1,1,1,1],description:"Six equally likely faces."},
 spinner:{name:"Eight-section spinner",labels:["Red","Blue","Green","Yellow"],weights:[3,2,1,2],description:"Eight equal sections: 3 red, 2 blue, 1 green and 2 yellow."}
};
const total=e=>e.weights.reduce((a,b)=>a+b,0);
function probabilities(e){const t=total(e);return e.weights.map(w=>w/t);}
function sample(e,rng=Math.random){
 const r=rng()*total(e);let n=0;
 for(let i=0;i<e.weights.length;i++){n+=e.weights[i];if(r<n)return i;}
 return e.weights.length-1;
}
function summarize(e,draws){
 const counts=e.weights.map(()=>0);
 for(const d of draws){if(!Number.isInteger(d)||d<0||d>=counts.length)throw Error("Invalid draw");counts[d]++;}
 return {counts,total:draws.length,experimental:counts.map(n=>draws.length?n/draws.length:null),theoretical:probabilities(e)};
}
H.probabilityModel={experiments:EXP,probabilities,sample,summarize};
const fmt=p=>(100*p).toFixed(1)+"%";
const COLORS=["#D61E6C","#345DB2","#16764D","#9C6400","#7952AB","#597078"];
function wheel(e){
 if(e!==EXP.spinner)return "";
 const cx=110,cy=110,r=88;let angle=-Math.PI/2;
 const pieces=[];
 const sectionColours=e.weights.flatMap((count,i)=>Array(count).fill(COLORS[i]));
 sectionColours.forEach(colour=>{
  const end=angle+2*Math.PI/sectionColours.length,x1=cx+r*Math.cos(angle),y1=cy+r*Math.sin(angle),x2=cx+r*Math.cos(end),y2=cy+r*Math.sin(end);
  pieces.push('<path d="M'+cx+' '+cy+' L'+x1.toFixed(2)+' '+y1.toFixed(2)+' A'+r+' '+r+' 0 0 1 '+x2.toFixed(2)+' '+y2.toFixed(2)+' Z" fill="'+colour+'" stroke="white" stroke-width="3"/>');
  angle=end;
 });
 return '<svg class="pl-wheel" viewBox="0 0 220 220" role="img" aria-label="Eight equal spinner sections: red three, blue two, green one, yellow two">'+pieces.join("")+'</svg>';
}
function bars(e,stats){
 const w=640,h=240,left=52,right=20,top=18,base=194,usable=w-left-right;
 const p=stats.theoretical,obs=stats.experimental;
 const ticks=[0,.25,.5,.75,1].map(v=>{
  const y=base-v*(base-top);
  return '<line x1="'+left+'" y1="'+y+'" x2="'+(w-right)+'" y2="'+y+'" stroke="var(--rule)"/><text x="43" y="'+(y+4)+'" text-anchor="end" font-size="12" fill="var(--muted)">'+Math.round(v*100)+'%</text>';
 }).join("");
 const group=usable/e.labels.length;
 const columns=e.labels.map((label,i)=>{
  const x=left+i*group+group*.17,bw=group*.29,th=p[i]*(base-top),oh=(obs[i]||0)*(base-top);
  return '<rect x="'+x.toFixed(1)+'" y="'+(base-th).toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+th.toFixed(1)+'" fill="var(--muted)" opacity=".42"/>'+
  (stats.total?'<rect x="'+(x+bw+3).toFixed(1)+'" y="'+(base-oh).toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+oh.toFixed(1)+'" fill="var(--accent-ink)"/>':"")+
  '<text x="'+(left+(i+.5)*group).toFixed(1)+'" y="218" text-anchor="middle" font-size="13" fill="var(--ink)">'+label+'</text>';
 }).join("");
 return '<svg class="pl-chart" viewBox="0 0 640 240" role="img" aria-label="Bar chart of theoretical and experimental probability by outcome. Exact values follow in the table.">'+ticks+columns+'</svg>';
}
function trend(e,draws,target){
 const theoretical=probabilities(e)[target],w=640,left=52,right=18,top=18,base=178,plotW=w-left-right,plotH=base-top;
 const y=p=>base-p*plotH;
 const guides=[0,.25,.5,.75,1].map(v=>'<line x1="'+left+'" y1="'+y(v)+'" x2="'+(w-right)+'" y2="'+y(v)+'" stroke="var(--rule)"/><text x="43" y="'+(y(v)+4)+'" text-anchor="end" font-size="12" fill="var(--muted)">'+Math.round(v*100)+'%</text>').join("");
 let hits=0;const points=[];
 for(let i=0;i<draws.length;i++){
  if(draws[i]===target)hits++;
  if(i<2||(i+1)%Math.max(1,Math.ceil(draws.length/180))===0||i===draws.length-1){
   points.push((left+(i+1)/Math.max(1,draws.length)*plotW).toFixed(1)+","+y(hits/(i+1)).toFixed(1));
  }
 }
 const theoreticalLine='<line x1="'+left+'" y1="'+y(theoretical).toFixed(1)+'" x2="'+(w-right)+'" y2="'+y(theoretical).toFixed(1)+'" stroke="var(--muted)" stroke-width="2" stroke-dasharray="7 5"/>';
 const observed=points.length?'<polyline points="'+points.join(" ")+'" fill="none" stroke="var(--accent-ink)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>':"";
 return '<svg class="pl-chart" viewBox="0 0 640 225" role="img" aria-label="Line graph showing how the selected outcome experimental percentage changes as trials accumulate; dashed line is theoretical probability.">'+guides+theoreticalLine+observed+
 '<text x="'+left+'" y="213" font-size="12" fill="var(--muted)">0 trials</text><text x="'+(w-right)+'" y="213" text-anchor="end" font-size="12" fill="var(--muted)">'+draws.length+' trials</text></svg>';
}
function lab(el){
 let mode="coin",target=0,draws=[],prediction=null,message="Predict the chance, then run a trial.";
 const get=sel=>el.querySelector(sel);
 function render(focus){
  const e=EXP[mode],s=summarize(e,draws),n=s.total,exp=s.theoretical[target],obs=s.experimental[target];
  const options=Object.entries(EXP).map(([id,x])=>'<option value="'+id+'"'+(id===mode?' selected':'')+'>'+x.name+'</option>').join("");
  const targets=e.labels.map((x,i)=>'<option value="'+i+'"'+(i===target?' selected':'')+'>'+x+'</option>').join("");
  const rows=e.labels.map((label,i)=>'<tr><th scope="row">'+label+'</th><td>'+e.weights[i]+'/'+total(e)+'</td><td>'+fmt(s.theoretical[i])+'</td><td>'+s.counts[i]+'</td><td>'+(n?fmt(s.experimental[i]):'—')+'</td></tr>').join("");
  const gap=n?'<strong>'+fmt(obs)+'</strong> observed versus <strong>'+fmt(exp)+'</strong> theoretical ('+Math.abs((obs-exp)*100).toFixed(1)+' percentage-point difference).':'No trials yet.';
  el.innerHTML=[
  '<section class="pl-lab"><style>',
  '.pl-lab{background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius);padding:18px;line-height:1.5;color:var(--ink)}',
  '.pl-lab .pl-controls{display:flex;flex-wrap:wrap;gap:12px;margin:14px 0;align-items:end}',
  '.pl-lab label{display:grid;gap:5px;font-weight:650;min-width:170px;flex:1}',
  '.pl-lab select,.pl-lab input{font:inherit;min-height:44px;padding:8px;border:1px solid var(--rule);border-radius:var(--btn-radius);background:var(--paper);color:var(--ink);max-width:100%}',
  '.pl-lab button{min-height:44px}.pl-lab button:focus-visible,.pl-lab select:focus-visible,.pl-lab input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}',
  '.pl-lab .pl-actions{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}',
  '.pl-lab .pl-visual{display:flex;flex-wrap:wrap;gap:16px;align-items:center}',
  '.pl-lab .pl-wheel{width:155px;max-width:100%;height:auto;flex-shrink:0}',
  '.pl-lab .pl-chart{width:100%;height:auto;display:block;max-width:720px}',
  '.pl-lab .pl-panel{background:var(--soft);padding:12px;border-radius:var(--radius);margin:12px 0}',
  '.pl-lab .pl-key{display:flex;gap:18px;flex-wrap:wrap;font-size:14px;margin:8px 0}',
  '.pl-lab .pl-swatch{display:inline-block;width:16px;height:10px;margin-right:5px;background:var(--muted);opacity:.5}',
  '.pl-lab .pl-swatch.actual{background:var(--accent-ink);opacity:1}',
  '.pl-lab .pl-table{overflow-x:auto}.pl-lab table{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums}',
  '.pl-lab th,.pl-lab td{border-bottom:1px solid var(--rule);padding:8px;text-align:left;white-space:nowrap}',
  '.pl-lab .pl-status{min-height:1.5em;font-weight:650}',
  '@media(max-width:600px){.pl-lab{padding:12px}.pl-lab label{min-width:125px}.pl-lab th,.pl-lab td{padding:6px}}',
  '</style><div class="eyebrow">Probability · interactive investigation</div>',
  '<h3>Chance Lab: prediction vs. results</h3>',
  '<p class="note">Model a coin, die or spinner. The grey bars show what theory predicts; the coloured bars show what the simulation actually produced. Run more trials to compare.</p>',
  '<div class="pl-controls"><label>Experiment<select id="pl-mode">'+options+'</select></label>',
  '<label>Watch this outcome<select id="pl-target">'+targets+'</select></label>',
  '<label>Predict its chance (%)<input id="pl-predict" type="number" inputmode="decimal" min="0" max="100" step="any" placeholder="e.g. 50" value="'+(prediction===null?'':prediction)+'"></label></div>',
  '<div class="pl-visual">'+wheel(e)+'<p>'+e.description+'<br><strong>'+n+'</strong> independent trial'+(n===1?'':'s')+' with replacement (each trial starts with the same chances).</p></div>',
  '<div class="pl-actions" role="group" aria-label="Run simulated trials">',
  '<button type="button" class="btn" data-pl-run="1">Run 1</button>',
  '<button type="button" class="btn ghost" data-pl-run="20">Run 20</button>',
  '<button type="button" class="btn ghost" data-pl-run="100">Run 100</button>',
  '<button type="button" class="btn ghost" data-pl-run="500">Run 500</button>',
  '<button type="button" class="btn ghost" id="pl-reset">Reset trials</button></div>',
  '<p id="pl-status" class="pl-status" aria-live="polite">'+message+'</p>',
  '<div class="pl-panel"><h4>All outcomes · theoretical versus experimental</h4>',
  '<div class="pl-key"><span><i class="pl-swatch"></i>Theoretical</span><span><i class="pl-swatch actual"></i>Experimental</span></div>',
  bars(e,s),'<div class="pl-table"><table><caption>Exact probability and frequency values</caption><thead><tr><th scope="col">Outcome</th><th scope="col">Fraction</th><th scope="col">Theoretical</th><th scope="col">Count</th><th scope="col">Experimental</th></tr></thead><tbody>',rows,'</tbody></table></div></div>',
  '<div class="pl-panel"><h4>How does the chance settle? · '+e.labels[target]+'</h4>',
  '<p>'+gap+'</p><p class="note">Dashed line: theoretical chance. Solid line: experimental chance after each trial. More trials usually bring the overall percentage closer, but not necessarily after every single draw.</p>',
  trend(e,draws,target),'</div>',
  '<p class="note">Try the physical Tally Lab first, then compare your results. This browser simulation is practice, not a submitted assessment. No responses are saved or sent.</p></section>'
  ].join("");
  get("#pl-mode").onchange=function(){mode=this.value;target=0;draws=[];prediction=null;message="New experiment. Make a prediction.";render("#pl-mode");};
  get("#pl-target").onchange=function(){target=Number(this.value);message="Outcome changed. Compare the same trials from a new perspective.";render("#pl-target");};
  get("#pl-predict").onchange=function(){const raw=this.value.trim();prediction=raw===""?null:Number(raw);if(prediction!==null&&(!Number.isFinite(prediction)||prediction<0||prediction>100)){prediction=null;message="Prediction must be between 0 and 100%.";render("#pl-predict");}};
  el.querySelectorAll("[data-pl-run]").forEach(b=>b.onclick=function(){
   const raw=get("#pl-predict").value.trim();prediction=raw===""?null:Number(raw);
   if(prediction!==null&&(!Number.isFinite(prediction)||prediction<0||prediction>100)){prediction=null;message="Enter a prediction between 0 and 100%.";render("#pl-predict");return;}
   const k=Number(this.dataset.plRun);
   for(let i=0;i<k;i++)draws.push(sample(EXP[mode]));
   const s=summarize(EXP[mode],draws);
   message="Added "+k+" trial"+(k===1?'':'s')+". "+EXP[mode].labels[target]+" occurred "+s.counts[target]+" of "+s.total+" times."+(prediction===null?"":" Your prediction was "+prediction+"%; theoretical is "+fmt(s.theoretical[target])+".");
   render('[data-pl-run="'+k+'"]');
  });
  get("#pl-reset").onclick=function(){draws=[];message="Trials cleared. Theoretical chances have not changed.";render("#pl-reset");};
  if(focus){const next=get(focus);if(next)next.focus({preventScroll:true});}
 }
 render();
}
H.lessonTools=Object.assign(H.lessonTools||{},{"prob/p2":lab});
})();