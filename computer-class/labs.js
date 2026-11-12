/* Interactive investigations embedded in Computer Class assignments.
   Student-entered trials are local only; all model quantities are explicitly illustrative. */
(function(g){
"use strict";
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));
function calculate(tool,s){
 if(tool==="osmosis"){
  const d=s.outside-s.inside,direction=d>0?"out":d<0?"in":"balanced";
  return {cell:s.cell,inside:s.inside,outside:s.outside,direction,
   effect:s.cell==="plant"?(direction==="in"?"turgid":direction==="out"?"plasmolysed":"flaccid"):(direction==="in"?"swollen":direction==="out"?"shrunken":"stable")};
 }
 if(tool==="oxygen"){
  const lung=Math.round(30+s.breathing*.7),circulation=Math.round(30+s.circulation*.7),need=Math.round(30+s.activity*.65);
  const delivered=Math.min(lung,circulation);
  return {breathing:s.breathing,circulation:s.circulation,activity:s.activity,delivered,need,
   limitedBy:lung<circulation?"breathing":lung>circulation?"circulation":"both",meetsDemand:delivered>=need};
 }
 if(tool==="recipe"){
  const factor=s.servings/4;
  return {servings:s.servings,factor,flour:1.5*factor,milk:.75*factor,sugar:.5*factor,eggs:2*factor};
 }
 if(tool==="canal"){
  const north=clamp(s.north,0,100),centre=clamp(s.centre,0,100-north),south=100-north-centre;
  const need=[40,35,25],alloc=[north,centre,south];
  const supported=alloc.map((x,i)=>Math.min(100,Math.round(x/need[i]*100)));
  return {north,centre,south,needs:need,coverage:supported,fullySupported:supported.filter(x=>x>=100).length};
 }
 if(tool==="plot"){
  const peak=s.turning>Math.max(s.beginning,s.ending)+15;
  return {beginning:s.beginning,turning:s.turning,ending:s.ending,shape:peak?"clear turning-point peak":"flat or unusual tension pattern"};
 }
 if(tool==="sources"){
  const named=s.named?1:0,dated=s.dated?1:0,direct=s.direct?1:0;
  return {named,dated,direct,checks:named+dated+direct,limits:"This score does not establish whether a claim is true."};
 }
 throw Error("Unknown Computer Class model "+tool);
}
const CONFIG={
 osmosis:{
  title:"Osmosis Investigator",
  note:"Relative solute amounts. Water moves overall toward the higher-solute side. These are not real cell measurements.",
  initial:{cell:"plant",inside:30,outside:60},
  fields:[
   {key:"cell",type:"select",label:"Type of cell",options:[["plant","Plant cell"],["animal","Animal cell"]]},
   {key:"inside",label:"Solute inside",min:0,max:100,step:10},
   {key:"outside",label:"Solute outside",min:0,max:100,step:10}
  ],
  headings:["Cell","Inside","Outside","Water","Result"],
  cells:r=>[r.cell,r.inside,r.outside,r.direction,r.effect],
  summary:r=>"Water moves "+(r.direction==="balanced"?"both ways with no overall net movement":r.direction==="in"?"into the cell":"out of the cell")+
   ". Predicted response: "+r.effect+"."
 },
 oxygen:{
  title:"Oxygen Delivery Model",
  note:"Illustrative capacity and demand indexes, not oxygen saturation, breathing rates or actual physiology.",
  initial:{breathing:60,circulation:60,activity:30},
  fields:[
   {key:"breathing",label:"Breathing effectiveness",min:0,max:100,step:10},
   {key:"circulation",label:"Circulation effectiveness",min:0,max:100,step:10},
   {key:"activity",label:"Muscle activity",min:0,max:100,step:10}
  ],
  headings:["Breathing","Flow","Activity","Delivery","Demand","Limit"],
  cells:r=>[r.breathing,r.circulation,r.activity,r.delivered,r.need,r.limitedBy],
  summary:r=>"Delivered "+r.delivered+" / demand "+r.need+". "+(r.meetsDemand?"Demand is met.":"Demand exceeds supply.")+" Limiting supply: "+r.limitedBy+"."
 },
 recipe:{
  title:"Recipe Scaling Tool",
  note:"Original recipe: 4 servings, 1½ cups flour, ¾ cup milk, ½ cup sugar and 2 eggs. Fractional eggs are allowed for this mathematical model.",
  initial:{servings:4},
  fields:[{key:"servings",label:"New servings",min:2,max:12,step:1}],
  headings:["Servings","Factor","Flour (cups)","Milk (cups)","Sugar (cups)","Eggs"],
  cells:r=>[r.servings,r.factor,r.flour,r.milk,r.sugar,r.eggs],
  summary:r=>r.servings+" servings = ×"+r.factor.toFixed(2)+" original recipe. Flour "+r.flour.toFixed(3)+" c · Milk "+r.milk.toFixed(3)+" c · Sugar "+r.sugar.toFixed(3)+" c · Eggs "+r.eggs.toFixed(2)+"."
 },
 canal:{
  title:"Irrigation Allocation Model",
  note:"Fictional farms share 100 water units. Model requirements: North 40, Central 35, South 25 units. This illustrates resource trade-offs, not historical crop yields.",
  initial:{north:35,centre:35},
  fields:[
   {key:"north",label:"North water allocation",min:0,max:100,step:5},
   {key:"centre",label:"Central water allocation",min:0,max:100,step:5}
  ],
  headings:["North","Central","South","North needs","Central needs","South needs"],
  cells:r=>[r.north,r.centre,r.south,r.coverage[0]+"%",r.coverage[1]+"%",r.coverage[2]+"%"],
  summary:r=>"North "+r.north+" / 40 needed · Central "+r.centre+" / 35 · South "+r.south+" / 25. "+r.fullySupported+" of 3 farm areas meet their target."
 },
 plot:{
  title:"Plot Tension Mapper",
  note:"Compare the tension at the beginning, turning point and ending of a story. Choose an illustrative tension index; this is a reading interpretation, not a measurement.",
  initial:{beginning:30,turning:90,ending:25},
  fields:[
   {key:"beginning",label:"Beginning tension",min:0,max:100,step:10},
   {key:"turning",label:"Turning-point tension",min:0,max:100,step:10},
   {key:"ending",label:"Ending tension",min:0,max:100,step:10}
  ],
  headings:["Beginning","Turning point","Ending","Shape"],
  cells:r=>[r.beginning,r.turning,r.ending,r.shape],
  summary:r=>"Beginning "+r.beginning+" · turning point "+r.turning+" · ending "+r.ending+". This is a "+r.shape+". Does it fit your story evidence?"
 },
 sources:{
  title:"Source Verification Board",
  note:"Test three source-check criteria. A named source, clear date and direct evidence can make a claim easier to verify. These checks are not a truth percentage.",
  initial:{named:0,dated:0,direct:0},
  fields:[
   {key:"named",label:"Named, accountable source",min:0,max:1,step:1},
   {key:"dated",label:"Date and context clear",min:0,max:1,step:1},
   {key:"direct",label:"Direct supporting evidence",min:0,max:1,step:1}
  ],
  headings:["Named","Dated","Direct","Checks met"],
  cells:r=>[r.named?"Yes":"No",r.dated?"Yes":"No",r.direct?"Yes":"No",r.checks+"/3"],
  summary:r=>r.checks+" of 3 verification checks met. This helps plan further verification but cannot prove that the claim is true."
 }
};
function snapshot(tool,s){return calculate(tool,{...s});}
function trialSummary(tool,r){
 const cfg=CONFIG[tool];return cfg.headings.map((h,i)=>h+": "+cfg.cells(r)[i]).join("; ");
}
function mount(root,q,original,onSave){
 const cfg=CONFIG[q.lab];if(!cfg){root.textContent="This investigation is unavailable.";return;}
 let state={...cfg.initial};
 let trials=Array.isArray(original)?original.slice(0,12):[];
 root.innerHTML='<div class="cc-lab-panel"><div class="cc-lab-heading"><h4>'+e(cfg.title)+'</h4>'+
 '<span class="cc-lab-hint">Record '+q.minTrials+' different trials</span></div>'+
 '<p class="cc-lab-note">'+e(cfg.note)+'</p>'+
 '<div class="cc-lab-controls">'+cfg.fields.map(f=>'<label><span>'+e(f.label)+'</span>'+
 (f.type==="select"?'<select data-field="'+f.key+'">'+f.options.map(x=>'<option value="'+e(x[0])+'" '+(state[f.key]===x[0]?"selected":"")+'>'+e(x[1])+'</option>').join("")+'</select>':
 '<div class="cc-lab-range"><input data-field="'+f.key+'" type="range" min="'+f.min+'" max="'+f.max+'" step="'+f.step+'" value="'+state[f.key]+'"><output data-output="'+f.key+'">'+state[f.key]+'</output></div>')+
 '</label>').join("")+'</div>'+
 '<div class="cc-lab-visual"><div class="cc-lab-visual-label">LIVE MODEL</div><div class="cc-lab-bars" aria-hidden="true"></div>'+
 '<p class="cc-lab-result" role="status"></p></div>'+
 '<div class="cc-lab-actions"><button type="button" data-record>Record this trial</button><span data-record-state aria-live="polite"></span></div>'+
 '<div class="cc-lab-trials"><h5>Recorded evidence</h5><div class="cc-lab-table-wrap"><table>'+
 '<thead><tr><th>#</th>'+cfg.headings.map(x=>'<th>'+e(x)+'</th>').join("")+'</tr></thead><tbody data-trials></tbody></table></div></div>'+
 '</div>';
 const query=s=>root.querySelector(s);
 function display(){
  const r=snapshot(q.lab,state);
  if(q.lab==="canal"){
   const centre=query('[data-field="centre"]');
   centre.max=100-state.north;
   state.centre=clamp(state.centre,0,100-state.north);
   centre.value=state.centre;
  }
  cfg.fields.forEach(f=>{const out=query('[data-output="'+f.key+'"]');if(out)out.textContent=state[f.key];});
  const fresh=snapshot(q.lab,state);
  query(".cc-lab-result").textContent=cfg.summary(fresh);
  const visual=query(".cc-lab-bars");
  let bars=[];
  if(q.lab==="osmosis")bars=[["Inside",fresh.inside],["Outside",fresh.outside]];
  else if(q.lab==="oxygen")bars=[["Delivered",fresh.delivered],["Demand",fresh.need]];
  else if(q.lab==="recipe")bars=[["Flour",Math.round(fresh.flour/5*100)],["Milk",Math.round(fresh.milk/3*100)]];
  else if(q.lab==="plot")bars=[["Opening",fresh.beginning],["Turning",fresh.turning],["Ending",fresh.ending]];
  else if(q.lab==="sources")bars=[["Named",fresh.named*100],["Dated",fresh.dated*100],["Direct",fresh.direct*100]];
  else bars=[["North",fresh.coverage[0]],["Central",fresh.coverage[1]],["South",fresh.coverage[2]]];
  visual.innerHTML=bars.map(([label,value])=>'<div class="cc-lab-bar"><span>'+e(label)+'</span><div class="cc-lab-track">'+
   '<i style="width:'+clamp(value,0,100)+'%"></i></div><b>'+value+'%</b></div>').join("");
 }
 function history(){
  const tbody=query("[data-trials]");
  tbody.innerHTML=trials.length?trials.map((r,i)=>'<tr><td>'+(i+1)+'</td>'+cfg.cells(r).map(v=>'<td>'+e(typeof v==="number"?Number(v.toFixed(3)):v)+'</td>').join("")+'</tr>').join(""):
   '<tr><td colspan="'+(cfg.headings.length+1)+'">No trials recorded. Adjust the controls, then record your result.</td></tr>';
  query("[data-record-state]").textContent=trials.length+" / "+q.minTrials+" trials";
 }
 root.addEventListener("input",event=>{
  const key=event.target.dataset.field;if(!key)return;
  const setting=cfg.fields.find(f=>f.key===key);if(!setting)return;
  state[key]=setting.type==="select"?event.target.value:Number(event.target.value);
  display();
 });
 root.addEventListener("change",event=>{
  const key=event.target.dataset.field;if(key)display();
 });
 query("[data-record]").addEventListener("click",()=>{
  const r=snapshot(q.lab,state),signature=JSON.stringify(r);
  if(trials.some(x=>JSON.stringify(x)===signature)){
   query("[data-record-state]").textContent="Change a setting before recording another trial.";return;
  }
  if(trials.length>=12)trials.shift();
  trials.push(r);
  history();onSave(trials.slice());
 });
 display();history();
 root.labController={get state(){return {...state};},get trials(){return trials.slice();},set(next){
  Object.assign(state,next);
  cfg.fields.forEach(f=>{const el=query('[data-field="'+f.key+'"]');if(el)el.value=state[f.key];});
  display();
 },record(){query("[data-record]").click();}};
}
g.ComputerClassLabs={config:CONFIG,calculate,snapshot,trialSummary,mount};
})(window);