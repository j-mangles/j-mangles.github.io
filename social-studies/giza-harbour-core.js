/* The Missing Stone Shipment — gameplay and historical context.
   Fictional investigation grounded in Fourth Dynasty transport and provisioning.
   The diary of Merer is genuine; every prop, dialogue, event and record shown
   inside THIS story is a teaching reconstruction, not a transcription.
 */
(function(g){
"use strict";
const RESEARCH=[
 {title:"AERA — Pyramid settlement research",url:"https://aeraweb.org/",note:"Excavated workers' settlement and organized provisioning"},
 {title:"Lehner (2019) — Pyramid Settlements of Giza",url:"https://doi.org/10.1111/apaa.12111",note:"Networks of labour, administration and waterways"},
 {title:"Younes et al. (2024) — Khufu's harbour",url:"https://doi.org/10.1016/j.jasrep.2023.104303",note:"Reconstruction of Giza waterways and harbour landscape"},
 {title:"Digital Giza, Harvard",url:"https://giza.fas.harvard.edu/",note:"Maps, objects, monuments and context"}
];
const EVIDENCE=[
 {id:"water",name:"North landing",short:"LOW WATER",x:-42,z:-39,range:12,kind:"site",
   observation:"The waterline sits below the upper northern slipway. The heavy wooden ramp would not safely reach a shallow boat at this spot.",
   context:"Researchers reconstruct changing waterways near Giza. This particular shallow landing and day's water level are fictional.",
   question:"What kind of problem could a shallow approach create?",lead:"A heavily loaded boat may need to unload somewhere else."},
 {id:"tracks",name:"Sledge tracks",short:"FRESH GROOVES",x:-16,z:12,range:10,kind:"site",
   observation:"Paired grooves begin near the southern unloading ramp and continue up the packed-earth road. A wet patch remains on the sand.",
   context:"Stone hauling on sledges and wetting sand are attested techniques. This particular set of tracks is invented for the mystery.",
   question:"Which direction was heavy material being moved?",lead:"From the southern ramp toward the worksite."},
 {id:"manifest",name:"Scribe's delivery record",short:"REED-PAPER LOG",x:40,z:7,range:10,kind:"item",
   observation:"A fictional day record notes four fine limestone blocks received at the SOUTH BERTH, not the northern landing.",
   context:"Old Kingdom administrative records and Merer's real transport log support the broader idea of tracking deliveries; this specific wording is invented.",
   question:"Does the record support theft, loss, or a change of landing?",lead:"It supports a change of landing point."},
 {id:"limestone",name:"Unloaded limestone",short:"CUT STONE",x:39,z:58,range:13,kind:"item",
   observation:"Four pale limestone blocks rest on wooden sledges above the southern ramp. All four have matching red delivery marks.",
   context:"Fine white limestone was transported from the Tura area for Khufu's pyramid. This batch and these marks are fictional.",
   question:"What happened to the missing cargo?",lead:"It is present, accounted for, and not lost or stolen."},
 {id:"seal",name:"Cargo cord and seal",short:"KNOT & SEAL",x:60,z:41,range:12,kind:"item",
   observation:"A tied cargo cord lies on the inspection table beside a clay sealing and a wooden tally. The tally matches the recorded shipment.",
   context:"Sealings and account systems are documented in Egyptian administration. This particular seal and tally are illustrative props.",
   question:"Why might a seal and tally matter?",lead:"Officials can cross-check goods, counts, and control of supplies."}
];
const CHARACTERS=[
 {id:"scribe",name:"Ipu",title:"Storehouse scribe",x:44,z:3,role:"fictional composite",first:"My record says the shipment arrived, but the overseer is still calling it missing.",options:[
  {text:"What would you record?",reply:"Deliveries, amounts and destinations. Real Egyptian officials relied on records. Our fictional day's entry says SOUTH BERTH.",unlocks:"manifest"},
  {text:"Could this document be wrong?",reply:"Of course. Records tell you what someone reported, not necessarily what happened. Compare it with physical evidence.",unlocks:"manifest"},
  {text:"How certain can historians be?",reply:"We are fictional people in a recreated situation. Archaeologists learn from ancient records and material remains, and interpret both critically."}]},
 {id:"boatman",name:"Paheri",title:"River boat crew",x:-40,z:-24,role:"fictional composite",first:"The shallow approach made unloading here difficult. Ask where the water was deep enough.",options:[
  {text:"Why not use the north landing?",reply:"In our imagined case the water was too low at that bank. The boat went to the deeper southern landing.",unlocks:"water"},
  {text:"How could stone reach Giza?",reply:"Stone could be carried by river craft and moved over land. Harbours and waterways near Giza have been investigated by researchers."},
  {text:"Are you a real named boatman?",reply:"No. My name and words were made for this activity, inspired by documented transport crews."}]},
 {id:"hauler",name:"Nefru",title:"Stone-hauling worker",x:-10,z:18,role:"fictional composite",first:"Look down. Tracks can tell you more than a rumour.",options:[
  {text:"How did people pull blocks?",reply:"Heavy stone could be hauled on wooden sledges by teams. Wetting sand can reduce resistance.",unlocks:"tracks"},
  {text:"Were all workers enslaved?",reply:"No single story fits every person. Settlements, burials and ration evidence reveal organized crews; social conditions varied."},
  {text:"How do we know about life here?",reply:"Archaeologists study bones, houses, tools, workshops and records—not just royal monuments."}]}
];
const VERDICTS=[
 {id:"stolen",label:"The blocks were stolen after leaving the quarry",isCorrect:false,feedback:"That explanation does not fit the matching blocks and recorded arrival. Look for physical evidence at the southern ramp."},
 {id:"lost",label:"The boat and blocks were lost on the river",isCorrect:false,feedback:"The shipment appears on land with a matching count. The river danger is possible in general, but not supported by this case."},
 {id:"diverted",label:"The boat unloaded at the southern berth because the northern approach was shallow",isCorrect:true,feedback:"This best fits the waterline, transport traces, recorded destination and recovered stones. You have an evidence-based explanation."}
];
const start=()=>({found:[],interviews:[],selected:[],verdict:null,reason:"",stage:"explore",startedAt:0});
const find=(id)=>EVIDENCE.find(x=>x.id===id);
const person=(id)=>CHARACTERS.find(x=>x.id===id);
function inspect(state,id){
 if(!find(id))throw Error("Unknown evidence");
 if(!state.found.includes(id))state.found.push(id);
 return {newCount:state.found.length,available:canConclude(state)};
}
function interview(state,id){
 if(!person(id))throw Error("Unknown person");
 if(!state.interviews.includes(id))state.interviews.push(id);
 return {count:state.interviews.length,available:canConclude(state)};
}
function canConclude(state){
 return state.found.length>=3&&state.interviews.length>=2;
}
function conclude(state,verdict,evidenceIds,reason){
 const v=VERDICTS.find(x=>x.id===verdict);
 if(!v)throw Error("Unknown verdict");
 if(!canConclude(state))return{ok:false,message:"Inspect at least three clues and talk with at least two people before presenting a conclusion."};
 const unique=[...new Set(evidenceIds)];
 if(unique.length<2||unique.some(id=>!state.found.includes(id)))return{ok:false,message:"Select two different clues that you actually inspected."};
 if(!String(reason||"").trim()||String(reason||"").trim().length<24)return{ok:false,message:"Explain your reasoning in at least one complete sentence (24+ characters)."};
 state.verdict=v.id;state.selected=unique;state.reason=String(reason).trim();
 const success=v.isCorrect&&unique.some(x=>x==="water")&&unique.some(x=>["manifest","limestone","tracks"].includes(x));
 state.stage=success?"complete":"rethink";
 return{ok:success,needsRevision:!success,message:success?"Case solved! Your claim matches the evidence and accounts for the waterway problem.":v.isCorrect?"Your explanation fits, but include the low-water observation AND a second supporting clue.":v.feedback};
}
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const boundaries={left:-106,right:110,north:-95,south:95};
const obstacles=[
 {x:-90,z:13,r:10},{x:83,z:-8,r:15},{x:77,z:51,r:10},
 {x:14,z:-30,r:9},{x:39,z:7,r:3}
];
function safeMove(p,dx,dz){
 let x=Math.max(boundaries.left,Math.min(boundaries.right,p.x+dx));
 let z=Math.max(boundaries.north,Math.min(boundaries.south,p.z+dz));
 // The Nile's eastern edge: x < -58 is impassable apart from dock protrusions.
 x=Math.max(-57,x);
 for(const o of obstacles){
  const d=Math.hypot(x-o.x,z-o.z),minimum=o.r+1.4;
  if(d<minimum){const a=Math.atan2(z-o.z,x-o.x);x=o.x+Math.cos(a)*minimum;z=o.z+Math.sin(a)*minimum;}
 }
 return{x,z};
}
/* Simplified sledge experiment. Relative progress is pedagogical, not a
   measurement of ancient forces. Dampening can decrease resistance;
   too much water loses some of the advantage (Fall et al., PRL 2014).
 */
const newHaul=()=>({progress:0,pulls:0,lastMoisture:0});
function haul(s,moisture){
 const m=Number(moisture);
 if(!Number.isFinite(m)||m<0||m>100)throw Error("Water input must be 0–100");
 const deviation=Math.abs(m-43);
 const progress=Math.round(25-Math.min(19,deviation*.45));
 s.lastMoisture=m;s.pulls++;s.progress=Math.min(100,s.progress+progress);
 const result={advanced:progress,progress:s.progress,done:s.progress>=100,
  note:m<18?"The dry sand resists the sled. Try adding some water.":m<=62?"The damp sand supports the load. Pulling is easier in this model.":"The very wet sand is less helpful. Try a smaller amount of water."};
 return result;
}

g.HarbourQuest={RESEARCH,EVIDENCE,CHARACTERS,VERDICTS,start,find,person,inspect,interview,canConclude,conclude,distance,safeMove,newHaul,haul};
})(window);
