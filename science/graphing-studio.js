/* Grade 8 Science Skills · Data & Graphing: interactive editable chart.
   Illustrative practice data, not class experiment measurements. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const DATA=[
 {key:"spruce",title:"Black spruce height over time",x:"Time (years)",y:"Height (cm)",kind:"line",xValues:[0,1,2,3,4],yValues:[9,18,29,41,54],context:"One tree measured repeatedly at five times."},
 {key:"liquids",title:"Flow time of different liquids",x:"Liquid",y:"Flow time (s)",kind:"bar",xValues:["Water","Oil","Syrup","Soap"],yValues:[4,10,23,14],context:"Four separate types of liquid on the same imaginary ramp."},
 {key:"temperature",title:"Sugar dissolving at different temperatures",x:"Temperature (°C)",y:"Time to dissolve (s)",kind:"line",xValues:[10,20,30,40,50],yValues:[82,64,48,36,27],context:"A continuous temperature variable changed in a fair test."}
];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".glab{color:var(--ink);line-height:1.5;min-width:0}.glab *{box-sizing:border-box}.glab h2{font:700 clamp(24px,3vw,31px) var(--f-title,system-ui);margin:0 0 6px}.glab h3{font-size:1.05rem;margin:0 0 8px}",
".glab .note{color:var(--muted);font-size:.87rem;max-width:72ch}.glab .columns{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(245px,1fr);gap:17px;align-items:start}",
".glab .chart{border:1px solid var(--rule);border-radius:var(--radius,12px);background:var(--soft);padding:9px;min-width:0}",
".glab svg{display:block;width:100%;height:auto}.glab svg text{fill:var(--ink);font:500 13px var(--f-body,system-ui)}.glab svg .gridline{stroke:var(--rule);stroke-width:1}",
".glab svg .axis{stroke:var(--ink);stroke-width:2}.glab svg .plotline{stroke:var(--accent);stroke-width:3;fill:none;stroke-linejoin:round}",
".glab svg .point{fill:var(--accent);stroke:var(--paper);stroke-width:2}",
".glab label{display:block;font-weight:700;font-size:.88rem;margin:8px 0 6px}",
".glab button,.glab select,.glab input{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:8px 10px;min-height:38px}",
".glab button{cursor:pointer}.glab button[aria-pressed=true]{background:var(--btn);color:var(--on-btn);border-color:var(--btn)}",
".glab button:focus-visible,.glab select:focus-visible,.glab input:focus-visible,.glab textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".glab .switch{display:flex;gap:7px;flex-wrap:wrap;margin:9px 0}.glab select{width:100%;max-width:100%}.glab .switch button{flex:1 1 100px}",
".glab .tablewrap{overflow-x:auto;max-width:100%;margin:13px 0}.glab table{border-collapse:collapse;width:100%;font-size:.84rem}.glab td,.glab th{border-bottom:1px solid var(--rule);padding:6px;text-align:left}",
".glab td input{width:95px;max-width:100%;font-size:.85rem;min-height:34px;padding:5px}.glab .feedback{background:var(--soft);border-radius:8px;padding:10px;min-height:52px;margin:12px 0}",
".glab .actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.glab textarea{box-sizing:border-box;width:100%;min-height:84px;font:inherit;resize:vertical;border:1px solid var(--rule);background:var(--paper);color:var(--ink);padding:10px;border-radius:8px}",
"@media(max-width:780px){.glab .columns{grid-template-columns:1fr}}"
].join("\n");
function niceMaximum(max){
 const value=Math.max(1,max),mag=Math.pow(10,Math.floor(Math.log10(value))),steps=[1,2,2.5,5,10];
 for(const step of steps){const n=step*mag;if(n>=value)return n;}
 return 10*mag;
}
function model(source,values,kind){
 if(!DATA.some(d=>d.key===source))throw Error("Unknown dataset");
 const dataset=DATA.find(d=>d.key===source);
 if(!["bar","line"].includes(kind)||values.length!==dataset.xValues.length||!values.every(v=>Number.isFinite(v)&&v>=0&&v<=1000))throw Error("Invalid graph data");
 const top=niceMaximum(Math.max(...values,1)),axis=Array.from({length:5},(_,i)=>top*i/4);
 return {dataset,values,kind,top,axis,correctType:kind===dataset.kind};
}
function svgGraph(m,title,xLabel,yLabel){
 const W=680,H=398,x0=100,x1=628,y0=58,y1=312,plotW=x1-x0,plotH=y1-y0;
 const x=m.dataset.xValues,n=x.length;
 const xAt=i=>m.kind==="line"?x0+(n===1?plotW/2:plotW*i/(n-1)):x0+plotW*(i+.5)/n;
 const yAt=v=>y1-plotH*v/m.top;
 const tickLabel=v=>Number(v.toFixed(2)).toString();
 const grid=m.axis.map(v=>{const y=yAt(v);return '<path class="gridline" d="M'+x0+' '+y+'H'+x1+'"/><text x="'+(x0-10)+'" y="'+(y+4)+'" text-anchor="end">'+tickLabel(v)+'</text>';}).join("");
 const labels=x.map((value,i)=>'<text x="'+xAt(i).toFixed(1)+'" y="335" font-size="12" text-anchor="middle">'+esc(value)+'</text>').join("");
 const bars=m.kind==="bar"?m.values.map((v,i)=>{const width=plotW/n*.57,at=xAt(i)-width/2,y=yAt(v);return '<rect x="'+at.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+width.toFixed(1)+'" height="'+Math.max(0,y1-y).toFixed(1)+'" fill="var(--accent)" opacity=".78" rx="2"/>';}).join(""):"";
 const points=m.kind==="line"?'<path class="plotline" d="'+m.values.map((v,i)=>(i?"L":"M")+xAt(i).toFixed(1)+" "+yAt(v).toFixed(1)).join(" ")+'"/>'+m.values.map((v,i)=>'<circle class="point" cx="'+xAt(i).toFixed(1)+'" cy="'+yAt(v).toFixed(1)+'" r="6"/>').join(""):"";
 return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Graph: '+esc(title)+'. '+esc(xLabel)+' on the horizontal axis, '+esc(yLabel)+' on the vertical axis.">'+
 '<text x="340" y="30" text-anchor="middle" font-size="17" font-weight="700">'+esc(title)+'</text>'+
 grid+'<path class="axis" d="M'+x0+' '+y0+'V'+y1+'H'+x1+'"/>'+bars+points+labels+
 '<text x="362" y="386" text-anchor="middle">'+esc(xLabel)+'</text>'+
 '<text transform="translate(24 205) rotate(-90)" text-anchor="middle">'+esc(yLabel)+'</text></svg>';
}
function render(el){
 let selected="spruce",kind="line",vals=DATA[0].yValues.slice(),xTitle=DATA[0].x,yTitle=DATA[0].y,graphTitle=DATA[0].title;
 const $=q=>el.querySelector(q);
 el.innerHTML='<section class="glab"><style>'+css+'</style><h2>Data & Graphing Studio</h2>'+
 '<p class="note">Choose a practice dataset, edit the measurements, and choose the graph type. A good graph has a title, labelled axes with units, and an even scale.</p>'+
 '<div class="columns"><div class="chart" id="glab-chart" aria-live="polite"></div>'+
 '<div><label for="glab-data">Choose a dataset</label><select id="glab-data">'+DATA.map(d=>'<option value="'+d.key+'">'+esc(d.title)+'</option>').join("")+'</select>'+
 '<p class="note" id="glab-context"></p><h3>Choose a graph</h3><div class="switch"><button type="button" data-graph="line" aria-pressed="true">Line graph</button>'+
 '<button type="button" data-graph="bar" aria-pressed="false">Bar graph</button></div>'+
 '<label for="glab-title">Title</label><input id="glab-title" style="width:100%" value="'+esc(graphTitle)+'">'+
 '<label for="glab-x">x-axis (independent variable)</label><input id="glab-x" style="width:100%" value="'+esc(xTitle)+'">'+
 '<label for="glab-y">y-axis (dependent variable)</label><input id="glab-y" style="width:100%" value="'+esc(yTitle)+'">'+
 '<div class="feedback" id="glab-feedback" role="status"></div><button type="button" id="glab-check">Check my graph</button></div></div>'+
 '<h3>Edit the measurements</h3><div class="tablewrap"><table><thead><tr><th id="glab-th-x">Independent variable</th><th id="glab-th-y">Measured result</th></tr></thead>'+
 '<tbody id="glab-rows"></tbody></table></div>'+
 '<label for="glab-explain"><b>Describe the pattern. Does your graph show a trend or compare categories?</b></label>'+
 '<textarea id="glab-explain" placeholder="As the independent variable changes, I notice..."></textarea>'+
 '<div class="actions"><button type="button" id="glab-reset">Reset example</button><button type="button" id="glab-download">Download graph investigation</button></div>'+
 '<p class="note" id="glab-status" role="status"></p><p class="note">All numbers are invented for graphing practice; they are not measurements from your class or a source dataset.</p></section>';
 function drawGraph(){const m=model(selected,vals,kind);$("#glab-chart").innerHTML=svgGraph(m,graphTitle,xTitle,yTitle);rootFeedback(false);}
 function rootFeedback(checked){
  const m=model(selected,vals,kind),labels=xTitle.trim()===m.dataset.x&&yTitle.trim()===m.dataset.y,titleGood=graphTitle.trim().length>6&&/./.test(graphTitle);
  $("#glab-feedback").textContent=checked?(m.correctType?"✓ Suitable graph type. ":"Try another graph type for these data. ")+(labels?"✓ Variables and units labelled. ":"Check the variable names and units on your axes. ")+(titleGood?"✓ Title included.":"Add a descriptive title.") :
   "Tip: use a line graph for a change across continuous measurements, and a bar graph for separate categories.";
  return m.correctType&&labels&&titleGood;
 }
 function buildRows(){
  const d=DATA.find(d=>d.key===selected);
  $("#glab-th-x").textContent=d.x;$("#glab-th-y").textContent=d.y;
  $("#glab-rows").innerHTML=d.xValues.map((x,i)=>'<tr><td>'+esc(x)+'</td><td><input type="number" min="0" max="1000" step="1" data-measure="'+i+'" value="'+vals[i]+'" aria-label="Result for '+esc(x)+'"></td></tr>').join("");
 }
 function setData(key){
  const d=DATA.find(x=>x.key===key);if(!d)return;
  selected=key;kind=d.kind;vals=d.yValues.slice();graphTitle=d.title;xTitle=d.x;yTitle=d.y;
  $("#glab-data").value=key;$("#glab-title").value=graphTitle;$("#glab-x").value=xTitle;$("#glab-y").value=yTitle;
  $("#glab-context").textContent=d.context;
  el.querySelectorAll("[data-graph]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.graph===kind)));
  buildRows();drawGraph();
 }
 el.addEventListener("change",event=>{
  if(event.target.id==="glab-data")setData(event.target.value);
  const i=event.target.dataset.measure;
  if(i!==undefined){const n=Number(event.target.value);if(Number.isFinite(n)&&n>=0&&n<=1000){vals[Number(i)]=n;drawGraph();}}
 });
 el.addEventListener("input",event=>{
  if(event.target.id==="glab-title")graphTitle=event.target.value;
  else if(event.target.id==="glab-x")xTitle=event.target.value;
  else if(event.target.id==="glab-y")yTitle=event.target.value;
  else return;
  drawGraph();
 });
 el.addEventListener("click",event=>{
  const b=event.target.closest("[data-graph]");if(!b||!el.contains(b))return;
  kind=b.dataset.graph;el.querySelectorAll("[data-graph]").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.graph===kind)));drawGraph();
 });
 $("#glab-check").onclick=()=>rootFeedback(true);
 $("#glab-reset").onclick=()=>setData(selected);
 $("#glab-download").onclick=()=>{
  const d=DATA.find(d=>d.key===selected);
  const lines=["Science 8 Data & Graphing Studio","Graph: "+graphTitle,"Graph type: "+kind,"x-axis: "+xTitle,"y-axis: "+yTitle,
   "Practice data:",...d.xValues.map((x,i)=>x+"; "+vals[i]),"My pattern explanation:",$("#glab-explain").value.trim(),"Practice values were invented, not measured."];
  const url=URL.createObjectURL(new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");
  a.href=url;a.download="graphing-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#glab-status").textContent="Data and explanation downloaded.";
 };
 setData(selected);
 el.graphLab={get kind(){return kind},get dataset(){return selected},get values(){return vals.slice()},setDataset:setData};
}
H.graphingCore={datasets:DATA,niceMaximum,model,svgGraph};
H.lessonTools=H.lessonTools||{};
const prior=H.lessonTools["skills/graph"];
H.lessonTools["skills/graph"]=function(root){const el=document.createElement("div");root.appendChild(el);render(el);if(prior){const other=document.createElement("div");root.appendChild(other);prior(other);}};
})();