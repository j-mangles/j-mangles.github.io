/* Grade 7 Math · Circle Graph Construction Lab · Manitoba 7.SP.3
 * Original hypothetical survey; NOT real students' answers.
 * Original Unit 9 resource folders: Interpreting/Constructing Circle Graphs.
 * All data ephemeral. Diagram fractions/percentages/angles derived from counts.
 */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const COLORS=["#A44475","#637FC3","#CE9D52","#719A83","#B17A9F"];
const EXAMPLE=[
 {label:"Playing sports",count:12},
 {label:"Making art",count:9},
 {label:"Reading",count:6},
 {label:"Gaming",count:3}
];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=n=>Number(n.toFixed(1));
function calculate(rows){
 if(!Array.isArray(rows)||rows.length<2||rows.length>5)throw Error("Use 2–5 categories");
 const data=rows.map((r,i)=>{
  const count=Number(r.count),label=String(r.label||"").trim().slice(0,45);
  if(!Number.isSafeInteger(count)||count<0||count>1000||!label)throw Error("Invalid survey entry "+i);
  return {label,count};
 });
 const total=data.reduce((a,r)=>a+r.count,0);
 if(total===0)throw Error("Survey must include at least one response");
 return {total,rows:data.map((r,i)=>({...r,ratio:r.count/total,percent:r.count/total*100,angle:r.count/total*360,color:COLORS[i]}))};
}
function chart(data){
 const result=calculate(data),cx=188,cy=170,rad=125;
 let svg='<svg role="img" aria-label="Circle graph with '+result.total+
  ' responses: '+result.rows.map(r=>esc(r.label)+' '+num(r.percent)+' percent').join(", ")+
  '" viewBox="0 0 780 350" style="display:block;width:100%;height:auto;max-width:780px" xmlns="http://www.w3.org/2000/svg">';
 svg+='<rect width="780" height="350" rx="10" fill="#FBF6EE"/>';
 let a=-Math.PI/2;
 for(const r of result.rows){
  if(!r.count)continue;
  if(r.count===result.total){
   svg+='<circle cx="'+cx+'" cy="'+cy+'" r="'+rad+'" fill="'+r.color+'" stroke="#FBF6EE" stroke-width="2"/>';
  }else{
   const angle=r.ratio*2*Math.PI,end=a+angle;
   const x1=cx+rad*Math.cos(a),y1=cy+rad*Math.sin(a);
   const x2=cx+rad*Math.cos(end),y2=cy+rad*Math.sin(end);
   svg+='<path d="M '+cx+' '+cy+' L '+x1.toFixed(3)+' '+y1.toFixed(3)+' A '+rad+' '+rad+' 0 '+
    (angle>Math.PI?1:0)+' 1 '+x2.toFixed(3)+' '+y2.toFixed(3)+
    ' Z" fill="'+r.color+'" stroke="#FBF6EE" stroke-width="2"/>';
   a=end;
  }
 }
 svg+='<text x="188" y="330" text-anchor="middle" font-size="13" fill="#62585B">One circle = 100% of responses</text>';
 result.rows.forEach((r,i)=>{
  const y=68+i*55;
  svg+='<rect x="400" y="'+(y-19)+'" width="18" height="18" rx="3" fill="'+r.color+'"/>';
  svg+='<text x="431" y="'+(y-5)+'" font-size="16" fill="#2E2732" font-weight="650">'+esc(r.label)+'</text>';
  svg+='<text x="431" y="'+(y+16)+'" font-size="13" fill="#645A62">'+r.count+' responses · '+num(r.percent)+'% · '+num(r.angle)+'°</text>';
 });
 svg+='</svg>';
 return svg;
}
function report(data,reason){
 const r=calculate(data);
 return "GRADE 7 MATH · CIRCLE GRAPH INVESTIGATION · 7.SP.3\n"+
  "Hypothetical or self-collected data (identify source honestly).\nTotal responses: "+r.total+"\n\n"+
  r.rows.map(x=>x.label+": "+x.count+" responses | "+num(x.percent)+"% | central angle "+num(x.angle)+"°").join("\n")+
  "\n\nMy interpretation:\n"+(reason.trim()||"[write a conclusion]");
}
function render(el){
 const $=s=>el.querySelector(s),all=s=>[...el.querySelectorAll(s)];
 let rows=EXAMPLE.map(r=>({...r})),reflection="";
 el.innerHTML='<section class="circle-graph-lab"><style>'+
 '.circle-graph-lab{color:var(--ink);font:inherit;line-height:1.55}'+
 '.circle-graph-lab button:focus-visible,.circle-graph-lab input:focus-visible,.circle-graph-lab textarea:focus-visible{outline:3px solid var(--accent);outline-offset:3px}'+
 '.circle-graph-lab .cg-banner{padding:15px;background:var(--soft);border-left:4px solid var(--accent);margin:16px 0;border-radius:8px}'+
 '.circle-graph-lab .cg-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:16px 0}'+
 '.circle-graph-lab .cg-grid label{display:grid;gap:5px;font-size:13px;font-weight:700}'+
 '.circle-graph-lab input,.circle-graph-lab textarea{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:6px;padding:10px;max-width:100%}'+
 '.circle-graph-lab .cg-grid input{width:100%;min-height:44px}'+
 '.circle-graph-lab .cg-figure{background:#FBF6EE;border:1px solid var(--rule);overflow-x:auto;border-radius:9px;margin:17px 0}'+
 '.circle-graph-lab .cg-table{border-collapse:collapse;width:100%;max-width:760px;margin:14px 0;font-size:14px}'+
 '.circle-graph-lab .cg-table th,.circle-graph-lab .cg-table td{padding:9px;border-bottom:1px solid var(--rule);text-align:right}'+
 '.circle-graph-lab .cg-table th:first-child,.circle-graph-lab .cg-table td:first-child{text-align:left}'+
 '.circle-graph-lab .cg-table th{background:var(--soft)}'+
 '.circle-graph-lab .cg-table-wrap{overflow-x:auto}'+
 '.circle-graph-lab textarea{width:100%;min-height:100px}'+
 '.circle-graph-lab .cg-actions{display:flex;flex-wrap:wrap;gap:9px;margin:13px 0}'+
 '.circle-graph-lab .cg-status{color:var(--accent-ink);font-weight:700;min-height:26px}'+
 '@media(max-width:640px){.circle-graph-lab .cg-grid{grid-template-columns:1fr}}'+
 '</style><div class="eyebrow">Grade 7 · Unit 9 · 7.SP.3</div>'+
 '<h2>Circle Graph Construction Lab</h2>'+
 '<p>Turn category counts into fractions, percentages, central angles and a labelled circle graph. Experiment with the counts and notice how the size of each slice changes.</p>'+
 '<div class="cg-banner"><strong>Fictional survey:</strong> An imaginary group of 30 students chooses a favourite free-time activity. These are sample numbers, not your class results. You can edit the labels and counts to enter your own data.</div>'+
 '<div class="cg-grid" id="cg-inputs"></div><p id="cg-error" class="cg-status" role="status" aria-live="polite"></p>'+
 '<div class="cg-figure" id="cg-picture"></div>'+
 '<div class="cg-table-wrap" id="cg-table-wrap"></div>'+
 '<p id="cg-method" class="cg-banner" aria-live="polite"></p>'+
 '<h3>Interpret the graph</h3><p>Which category is largest? What fraction and percent does it represent? If you change one count, explain why <em>every</em> percentage may change.</p>'+
 '<label for="cg-reason">My explanation</label><textarea id="cg-reason" placeholder="The largest category is… That represents … out of … The angle is … degrees because…"></textarea>'+
 '<div class="cg-actions"><button type="button" class="btn" id="cg-copy">Copy my graph data and explanation</button>'+
 '<button type="button" class="btn ghost" id="cg-reset">Restore the sample survey</button></div>'+
 '<p id="cg-status" class="cg-status" role="status" aria-live="polite"></p>'+
 '<p class="note">This is a mathematical model, not a class survey or a gradebook. Changes and writing stay in the page until you leave. Percentages and angles shown in the table are rounded to one decimal place.</p></section>';
 function inputs(){
  $("#cg-inputs").innerHTML=rows.map((r,i)=>
   '<div class="cg-category"><label>Category '+(i+1)+'<input type="text" maxlength="45" data-label="'+i+'" aria-label="Category '+(i+1)+' name"></label>'+
   '<label>Number of responses<input type="number" min="0" max="1000" step="1" data-count="'+i+'" aria-label="Category '+(i+1)+' count"></label></div>').join("");
  all("[data-label]").forEach(x=>x.value=rows[Number(x.dataset.label)].label);
  all("[data-count]").forEach(x=>x.value=rows[Number(x.dataset.count)].count);
  all("[data-label]").forEach(x=>x.oninput=e=>{rows[Number(e.target.dataset.label)].label=e.target.value;draw();});
  all("[data-count]").forEach(x=>x.oninput=e=>{
   const raw=e.target.value;rows[Number(e.target.dataset.count)].count=raw===""?NaN:Number(raw);draw();
  });
 }
 function draw(){
  let result;try{result=calculate(rows);}catch(e){
   $("#cg-error").textContent="Enter 0–1000 whole-number responses in each category, use nonempty names, and have at least one response.";
   $("#cg-picture").innerHTML="";$("#cg-table-wrap").innerHTML="";$("#cg-method").textContent="The graph needs valid counts.";
   return;
  }
  $("#cg-error").textContent="";
  $("#cg-picture").innerHTML=chart(rows);
  $("#cg-table-wrap").innerHTML='<table class="cg-table"><thead><tr><th>Category</th><th>Count</th><th>Fraction</th><th>Percent</th><th>Central angle</th></tr></thead><tbody>'+
   result.rows.map(x=>'<tr><td>'+esc(x.label)+'</td><td>'+x.count+'</td><td>'+x.count+' / '+result.total+'</td><td>'+num(x.percent)+'%</td><td>'+num(x.angle)+'°</td></tr>').join("")+
   '</tbody><tfoot><tr><th>Total</th><th>'+result.total+'</th><th>'+result.total+' / '+result.total+'</th><th>100%</th><th>360°</th></tr></tfoot></table>';
  $("#cg-method").textContent="To calculate each central angle: category count ÷ "+result.total+
    " × 360°. For example, "+result.rows[0].count+" ÷ "+result.total+" × 360° = "+num(result.rows[0].angle)+"°.";
 }
 $("#cg-reason").oninput=e=>reflection=e.target.value;
 $("#cg-copy").onclick=()=>{
  const status=$("#cg-status");let out;try{out=report(rows,reflection);}catch(e){status.textContent="Fix the survey counts first.";return;}
  if(navigator.clipboard?.writeText)navigator.clipboard.writeText(out).then(()=>status.textContent="Copied. Paste into your work document.").catch(()=>status.textContent="Clipboard unavailable; manually copy your table and writing.");
  else status.textContent="Clipboard unavailable; manually copy your table and writing.";
 };
 $("#cg-reset").onclick=()=>{rows=EXAMPLE.map(x=>({...x}));reflection="";$("#cg-reason").value="";$("#cg-status").textContent="Sample restored.";inputs();draw();};
 inputs();draw();
}
H.tools=H.tools||{};H.tools.area=render;
window.CircleGraphCore={EXAMPLE,calculate,chart,report};
})();
