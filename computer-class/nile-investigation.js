/* Uses the same flood simulator and trade map as the Egypt atlas. */
(function(g){
"use strict";
const activities=g.ComputerClassData.activities;
activities.push({
 id:"social-nile-advantage",subject:"ss",subjectName:"Social Studies",grade:"Grade 8",
 title:"Was the Nile always an advantage?",time:"30–40 min",
 summary:"Compare two October floods and trace a shipment from Nubia. Use both pieces of evidence to decide when the river helped people and when it put them at risk.",
 lesson:"../social-studies/#egypt-l1",lessonText:"Read Gift of the Nile",
 focus:"Ancient Egypt · Using geographic evidence to support a claim",
 reading:[
  "A farmer and a boat crew depend on the same river. For the farmer, the height of the flood matters. For the crew, the direction of the current and the hazards along the route matter.",
  "Your evidence comes from two places. The flood simulator shows what happens on an illustrative stretch of farmland. The trade map shows possible routes and goods exchanged with neighbouring regions.",
  "Read the model alongside the map. The eighteen field strips let you compare flood heights. They do not give a harvest total for a real settlement."
 ],
 sections:[
  {title:"Compare two floods",intro:"Keep the month at October so you compare both floods at their peak. Try any two different heights. Read the field count and check where the water reaches before recording each observation.",questions:[
   {id:"nile-trials",type:"lab",lab:"nile",minTrials:2,prompt:"What changes when the October flood reaches a different height?"},
   {id:"nile-control",type:"choice",prompt:"Why compare the two water levels in October?",options:["It lets you compare different heights at the same point in the flood season","All ancient harvests took place in October","Every Nile voyage began in October"],correct:0,why:"Keeping the month the same makes flood height the variable you are comparing."},
   {id:"nile-compare",type:"text",minWords:18,prompt:"What would the difference between your two floods mean for a farming family? Use both field counts and one detail about the village or its grain.",placeholder:"At the first height, water reached … fields. At the other height … . For a family, that could mean …"}
  ]},
  {title:"Follow a shipment",intro:"Open the trade map and select Nubia. Trace one good on its journey to Egypt. Find a detail that would help the crew and another that would make the trip harder.",
   source:{href:"../social-studies/egypt-trade-desk.html",title:"Open the Royal Trade Desk"},
   questions:[
    {id:"nile-route",type:"choice",prompt:"Which way would a boat carrying cargo from Nubia into Egypt travel?",options:["North, against the current","North, with the current","South, with the current"],correct:1,why:"The Nile flows north. A boat returning from Nubia to Egypt travels downstream."},
    {id:"nile-return",type:"choice",prompt:"The crew then travels south from Egypt toward Nubia. How does its relationship to the current change?",options:["Both journeys go downstream","It is now travelling upstream","The river changes direction at the border"],correct:1,why:"The current runs north. A southbound crew works against it."},
    {id:"nile-cargo",type:"text",minWords:18,prompt:"Name a good from Nubia. Using the map, explain one advantage of this river route and one obstacle a crew would face.",placeholder:"Our cargo is … . On the way to Egypt … would help us, but …"}
  ]},
  {title:"Make your case",intro:"A museum wants a short label to go beside its Nile display. Someone has suggested “The Nile always helped ancient Egyptians.” Decide how you would revise or defend that label.",
   questions:[
    {id:"nile-limit",type:"choice",prompt:"Which claim can the flood simulator support?",options:["Every Egyptian village had exactly 18 fields","It shows how much grain Egypt harvested in one historical year","Changing the peak height changes which land the water reaches in the model"],correct:2,why:"The field strips help you compare flood heights. They represent an example landscape."},
    {id:"nile-claim",type:"text",minWords:35,prompt:"Was the Nile always an advantage? Write your museum label. State your claim, use evidence from both the flood comparison and the Nubian shipment, and explain when the river became a risk.",placeholder:"The Nile … . In the flood model … . For a crew travelling from Nubia … . Together these details show …"}
   ]}
 ]
});

const headings=["Flood","Height","Fields under water","Village"];
function cells(row){
 return [row.level,row.cubits+" cubits",row.fields+" of "+row.total,row.villageWet?"Reached by water":"Above the water"];
}
function mount(root,question,original,onSave){
 const trials=Array.isArray(original)?original.filter(row=>row&&["Low","Typical","High"].includes(row.level)).slice(0,3):[];
 root.innerHTML='<div class="cc-nile-simulation"></div>'+
  '<p class="cc-lab-note">These field strips and water levels belong to the model.</p>'+
  '<div class="cc-lab-controls"><label>Field strips under water<input type="number" min="0" max="18" step="1" inputmode="numeric" data-nile-count></label>'+
  '<label>Where is the village?<select data-nile-village><option value="">Choose an observation</option><option value="dry">Above the water</option><option value="wet">Reached by water</option></select></label></div>'+
  '<div class="cc-lab-actions"><button type="button" data-nile-record>Record this flood</button><span role="status" data-nile-feedback></span></div>'+
  '<div class="cc-lab-trials"><div class="cc-lab-table-wrap"><table><caption>Recorded October floods</caption><thead><tr>'+headings.map(label=>'<th scope="col">'+label+'</th>').join("")+'</tr></thead><tbody></tbody></table></div></div>';
 const model=g.EgyptInteractives?.nileYear;
 const feedback=root.querySelector("[data-nile-feedback]"),count=root.querySelector("[data-nile-count]"),village=root.querySelector("[data-nile-village]");
 const record=root.querySelector("[data-nile-record]");
 function showTrials(){
  const rows=root.querySelector("tbody");
  rows.replaceChildren();
  for(const trial of trials){
   const tr=rows.insertRow();
   cells(trial).forEach(text=>{tr.insertCell().textContent=text;});
  }
  if(!trials.length){
   const cell=rows.insertRow().insertCell();cell.colSpan=headings.length;cell.textContent="Your first observation will appear here.";
  }
 }
 showTrials();
 if(!model){
  record.disabled=true;feedback.textContent="Reload to open the flood simulator.";return;
 }
 let observation;
 model.mount(root.querySelector(".cc-nile-simulation"),{},next=>{
  observation=next;count.value="";village.value="";
  record.disabled=next.month!=="October";
  feedback.textContent=record.disabled?"Return to October to record a comparable observation.":"";
 });
 record.addEventListener("click",()=>{
  if(observation.month!=="October")return;
  if(count.value===""||Number(count.value)!==observation.fields||village.value!==(observation.villageWet?"wet":"dry")){
   feedback.textContent="Read the October field count and village description, then check both entries.";return;
  }
  if(trials.some(trial=>trial.level===observation.level)){
   feedback.textContent="This height is already recorded. Choose a different flood height.";return;
  }
  trials.push({...observation});onSave(trials.slice());showTrials();
  feedback.textContent=trials.length>=question.minTrials?"Comparison ready. Use your observations in the next response.":"First flood recorded. Choose another height.";
 });
}
g.ComputerClassNile={headings,cells,mount};
})(window);
