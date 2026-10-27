/* Giza Field Expedition: historical model, pedagogy, and testable quest logic.
 * Evidence: Egyptian Ministry of Tourism and Antiquities, Digital Giza (Harvard),
 * and the teacher's U2L3, U2L6, U2L7 Egypt slides and MB Cluster 2.
 * Fourth Dynasty composite, c. 2550–2500 BCE. NOT to scale or a single-year view.
 * Characters are fictional representatives of historically attested roles.
 */
(function(global){
"use strict";
const SOURCES={
 plateau:{name:"Egyptian Ministry — Giza Plateau",url:"https://egymonuments.gov.eg/archaeological-sites/giza-plateau/"},
 sphinx:{name:"Egyptian Ministry — Great Sphinx",url:"https://egymonuments.gov.eg/en/monuments/the-great-sphinx/"},
 workers:{name:"Egyptian Ministry — Workers’ Town and Cemetery",url:"https://egymonuments.gov.eg/monuments/workers-town-and-cemetery/"},
 harvard:{name:"Digital Giza (Harvard) — Royal Pyramid Complexes",url:"https://giza.fas.harvard.edu/lessons/royal-pyramid-complexes/"},
 faq:{name:"Digital Giza — Pyramid Complex FAQ",url:"https://giza.fas.harvard.edu/faq/"}
};
const MISSIONS=[
 {id:"sphinx",title:"The Great Sphinx",short:"Sphinx",x:44,z:33,range:17,tag:"Monument",outcomes:["8-KI-014","8-KH-029"],source:"sphinx",
 fact:"The Great Sphinx was carved from bedrock in the Fourth Dynasty. Evidence links it to Khafre's pyramid complex, but the exact commission is not documented with certainty.",
 inference:"A royal lion-bodied statue represented kingship and power. Exactly what a person standing here felt cannot be recovered from stone alone.",
 question:"Which is the most careful historical claim about the Sphinx?",options:["We know the sculptor's name and exact date.","Evidence associates it with Khafre's complex, but details remain uncertain.","It was built by Ramesses II during the New Kingdom."],correct:1,why:"The Egyptian antiquities authority describes the evidence for a Khafre-era association, not absolute certainty."},
 {id:"causeway",title:"Khafre's Causeway & Valley Temple",short:"Causeway",x:53,z:54,range:19,tag:"Sacred architecture",outcomes:["8-KI-014","8-KP-045"],source:"harvard",
 fact:"A royal pyramid complex included a valley temple, a causeway and a mortuary temple beside the pyramid. The causeway connected places used in royal funerary ceremonies and later offerings.",
 inference:"The route made royal ritual visible in stone. This scene simplifies the temple layout; restricted interior activities are not simulated.",
 question:"What did the causeway link in a royal pyramid complex?",options:["The valley temple and the mortuary temple near the pyramid.","Giza and the city of Rome.","Two unrelated marketplaces for tourists."],correct:0,why:"The causeway connected the valley temple with the mortuary or pyramid temple."},
 {id:"khufu",title:"The Great Pyramid of Khufu",short:"Khufu",x:15,z:-89,range:65,tag:"Architecture & state power",outcomes:["8-KI-014","8-KE-054","8-KP-045"],source:"plateau",
 fact:"Khufu commissioned the largest pyramid at Giza. Its construction required quarrying stone, transporting materials, feeding crews, and maintaining complex administration.",
 inference:"Archaeologists have evidence for organized labour, but the exact method of lifting blocks to every level remains debated. The model's smooth faces are an approximation of original casing.",
 question:"What does the Great Pyramid reveal about the Old Kingdom state?",options:["It could coordinate materials, labour and food at a very large scale.","Its builders had electric cranes.","No administration or skilled planning was needed."],correct:0,why:"Large building projects required extensive planning, resources, workers and records."},
 {id:"scribe",title:"Meet the Record-Keeper",short:"Scribe",x:85,z:83,range:18,tag:"Everyday life & writing",outcomes:["8-KH-030","8-KI-013"],source:"workers",
 fact:"Administration was central to large royal construction projects. Egyptian scribes used writing to keep accounts of supplies, deliveries and labour.",
 inference:"The person you meet is a fictional composite, not a historically recorded individual. The exact conversation is invented for learning.",
 question:"Why would a scribe matter on a royal construction project?",options:["To record supplies and labour so the project could be organized.","Because writing was used only for spells.","To operate modern computers."],correct:0,why:"Writing helped administrators manage food, people and materials."},
 {id:"village",title:"Workers' Settlement",short:"Workers",x:112,z:117,range:23,tag:"Archaeology & social class",outcomes:["8-KI-013","8-KE-054"],source:"workers",
 fact:"Archaeologists excavated the Heit el-Ghurab settlement southeast of the Giza pyramids. Evidence includes galleries, houses, administrative structures and animal bones suggesting organized provisioning. The best documented settlement phases relate to Khafre and Menkaure.",
 inference:"This reconstruction shows a few simplified buildings, not an exact map of the excavated town. Workers had varied roles and experiences; sweeping claims that every builder was a slave or that all were equally treated are not supported.",
 question:"Which discovery helps historians learn how pyramid workers lived?",options:["The settlement's buildings, food remains and worker burials.","A photograph taken in 2500 BCE.","Only later legends about giant pyramids."],correct:0,why:"Archaeologists examine settlement remains, food debris, burials and injuries as evidence."},
 {id:"menkaure",title:"Pyramid of Menkaure",short:"Menkaure",x:-120,z:78,range:42,tag:"Chronology & comparison",outcomes:["8-KH-029","8-KI-014"],source:"plateau",
 fact:"The three principal Giza pyramids were built for Khufu, Khafre and Menkaure during the Fourth Dynasty. Menkaure's pyramid is smaller than the first two, and the kings ruled at different times.",
 inference:"All three monuments appear together in this educational landscape, but they were not all being built at exactly the same moment.",
 question:"Why is this game labelled a 'Fourth Dynasty composite'?",options:["All three pyramids were built on the same day.","It combines evidence from successive reigns rather than reproducing one exact year.","The Sphinx was constructed by Roman emperors."],correct:1,why:"The monuments belong to successive kings across decades, not a single construction moment."}
];
const PEOPLE=[
 {id:"guide",name:"Nebu",role:"Scribe · fictional",x:84,z:86,lines:["I am a fictional scribe inspired by ancient administrative roles. I could use writing to record rations, deliveries and assignments.","Look beyond the pyramid: a project needs grain, planning and many skills. Who kept track?","Ask yourself: whose lives are easiest to recover from written sources?"]},
 {id:"craft",name:"Henut",role:"Stoneworker · fictional",x:105,z:124,lines:["My character represents skilled craft workers. Archaeological evidence includes settlement buildings, food remains and workers' burials.","Do not assume all workers had the same status or experience. The evidence gives us clues, not everyone's personal story.","What might evidence of healed injuries tell us about some workers' care?"]},
 {id:"priest",name:"Kha",role:"Temple attendant · fictional",x:49,z:61,lines:["I represent a temple worker, not a named person from a surviving text.","A pyramid was part of a complex with temples and a causeway. Rituals and offerings continued after the royal funeral.","Why might a ruler spend resources on buildings meant for life after death?"]}
];
function distance(a,b){return Math.hypot(a.x-b.x,a.z-b.z);}
function byId(id){return MISSIONS.find(x=>x.id===id);}
function makeJournal(){return {done:[],attempts:{},seenPeople:[],notes:""};}
function answer(journal,id,choice){
 const mission=byId(id);if(!mission)throw Error("Unknown site");
 if(!Number.isInteger(choice)||choice<0||choice>=mission.options.length)throw Error("Unknown answer");
 journal.attempts[id]=(journal.attempts[id]||0)+1;
 const correct=mission.correct===choice;
 if(correct&&!journal.done.includes(id))journal.done.push(id);
 return {correct,why:correct?mission.why:"Revisit the evidence, then try a different interpretation.",done:journal.done.length,total:MISSIONS.length};
}
function nearest(position,maxDistance=24){
 return MISSIONS.map(m=>({item:m,d:distance(position,m)})).filter(x=>x.d<=Math.max(x.item.range,maxDistance)).sort((a,b)=>a.d-b.d)[0]?.item||null;
}
function safeMove(player,dx,dz){
 let x=Math.min(174,Math.max(-173,player.x+dx));
 let z=Math.min(157,Math.max(-155,player.z+dz));
 const rocks=[{x:15,z:-89,r:40},{x:-58,z:-10,r:35},{x:-120,z:78,r:25}];
 for(const rock of rocks){const d=Math.hypot(x-rock.x,z-rock.z),min=rock.r+2.6;if(d<min){const a=d>0.001?Math.atan2(z-rock.z,x-rock.x):0;x=rock.x+Math.cos(a)*min;z=rock.z+Math.sin(a)*min;}}
 return {x,z};
}
global.GizaExpeditionCore={MISSIONS,PEOPLE,SOURCES,byId,distance,nearest,safeMove,makeJournal,answer};
})(window);
