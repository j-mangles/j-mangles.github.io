/* Computer Class · five complete, self-contained assignments grounded in current subject lessons.
   Descriptive examples and story text are original classroom materials. */
(function(g){
"use strict";
const activities=[
{
 id:"science-membranes",subject:"sci",subjectName:"Science",grade:"Grade 8",title:"The Cell Membrane Investigation",time:"30–35 min",
 summary:"Predict osmosis, identify transport types, and explain how cells respond when the solution changes.",
 lesson:"../science/#cells/transport",lessonText:"Review membrane transport",focus:"Cells & Systems · Selectively permeable membranes",
 reading:[
  "A cell membrane is selectively permeable: some substances can pass through more easily than others. Water moves across cell membranes by osmosis. In a simplified model, net water movement is toward the side with the higher dissolved-solute concentration.",
  "Two model cells are placed in different solutions. Cell A has 25 units of dissolved solute inside and 65 units outside. Cell B has 65 inside and 25 outside. The numbers are relative concentrations, not actual measurements. Imagine water can cross the membrane but the solute cannot.",
  "Animal cells have flexible membranes without rigid cell walls. Plant cells have rigid cell walls, so their response to water entering the cell is different."
 ],
 sections:[
  {title:"Predict",intro:"Use the model values above to make predictions before checking any answers.",questions:[
   {id:"sc1",type:"choice",prompt:"For Cell A, where will water move overall?",options:["Into the cell","Out of the cell","No overall movement"],correct:1,why:"More dissolved solute is outside Cell A, so the net movement of water is outward."},
   {id:"sc2",type:"choice",prompt:"For Cell B, where will water move overall?",options:["Out of the cell","No overall movement","Into the cell"],correct:2,why:"Cell B has the higher dissolved-solute concentration inside, so water enters overall."},
   {id:"sc3",type:"text",prompt:"Explain your prediction for Cell A using the words water, solute and membrane.",placeholder:"Water moves ... because ...",minWords:12}
  ]},
  {title:"Interpret",intro:"Now connect movement across the membrane to what happens inside a living cell.",questions:[
   {id:"sc4",type:"choice",prompt:"Which process moves a substance from low concentration to high concentration using ATP?",options:["Simple diffusion","Active transport","Osmosis"],correct:1,why:"Active transport uses energy to move against a concentration gradient."},
   {id:"sc5",type:"order",prompt:"Put the events in a sensible order when a plant cell is placed in a solution with less solute outside than inside.",items:["Water enters across the membrane","The central vacuole becomes fuller","Cell contents press against the cell wall","The cell becomes firm (turgid)"],correct:[0,1,2,3],why:"Water enters, increases pressure inside the cell, and the wall resists further expansion."},
   {id:"sc6",type:"text",prompt:"Why can a plant cell become firm as water enters while an animal cell may swell differently?",placeholder:"A plant cell has ... An animal cell ...",minWords:16}
  ]},
  {title:"Explain the evidence",intro:"A strong explanation includes a claim, an observation from the model and scientific reasoning.",questions:[
   {id:"sc7",type:"text",prompt:"Write a short Claim–Evidence–Reasoning conclusion about what solute concentration can tell you about osmosis.",placeholder:"Claim: ... Evidence: ... Reasoning: ...",minWords:30},
   {id:"sc8",type:"choice",prompt:"Which is a limitation of this model?",options:["Real membranes always block water","It shows net direction but not actual transport rates or proteins","All cells have a cell wall"],correct:1,why:"The model simplifies transport; real cells also have proteins and complex regulation."}
  ]}
 ]
},
{
 id:"social-mesopotamia",subject:"ss",subjectName:"Social Studies",grade:"Grade 8",title:"Mesopotamia: Building a River Civilization",time:"35–40 min",
 summary:"Investigate geography, irrigation, leadership and laws using a classroom source scenario.",
 lesson:"../social-studies/",lessonText:"Open the Social Studies atlas",focus:"Ancient Societies · Mesopotamia · GRAPES",
 reading:[
  "Mesopotamia developed between the Tigris and Euphrates rivers. River water and fertile soil supported farming, but floods could be unpredictable. Communities built canals and other irrigation works to bring water to crops.",
  "Classroom scenario (fictional reconstruction, not an ancient document): A settlement beside a river has one canal that supplies three farming areas. After a dry month, farmers disagree about who should use the water first. A group of workers proposes repairing the canal. A leader asks families to contribute grain to support the workers, while another resident argues that the plan is unfair to families with poor harvests.",
  "Mesopotamian societies developed different city-states and written laws. Hammurabi was a Babylonian king associated with a famous written collection of laws. A written law could communicate rules, but that did not mean every person was treated equally."
 ],
 sections:[
  {title:"Use geography",intro:"Read the facts about the rivers and the settlement before deciding.",questions:[
   {id:"ss1",type:"choice",prompt:"Which GRAPES category best fits the effect of the Tigris and Euphrates on farming?",options:["Religion","Geography","Social structure"],correct:1,why:"The location and physical environment of the rivers shaped settlement and agriculture."},
   {id:"ss2",type:"choice",prompt:"Why were irrigation canals important?",options:["They guaranteed that rivers never flooded","They could direct water toward fields when needed","They stopped people from trading"],correct:1,why:"Irrigation helped communities manage access to water for crops."},
   {id:"ss3",type:"text",prompt:"Identify one advantage and one challenge of settling near these rivers.",placeholder:"Advantage: ... Challenge: ...",minWords:18}
  ]},
  {title:"Make a decision",intro:"The scenario is invented so you can practise using evidence, not memorize a historical answer.",questions:[
   {id:"ss4",type:"order",prompt:"Place these developments in a logical possible sequence (not a claim that every city followed this exact order).",items:["People settle near a river","Farmers organize irrigation","Some people specialize in non-farming jobs","Leaders develop rules for shared resources"],correct:[0,1,2,3],why:"Reliable food production can support specialization and increasingly organized leadership."},
   {id:"ss5",type:"choice",prompt:"Which GRAPES category focuses most directly on the settlement leader's decision about grain contributions?",options:["Politics","Arts","Science"],correct:0,why:"Politics includes leadership, rules, power and decisions about shared resources."},
   {id:"ss6",type:"text",prompt:"Propose a fair canal-repair plan. Explain whose needs your plan considers and one possible downside.",placeholder:"I would ... This considers ... A challenge might be ...",minWords:30}
  ]},
  {title:"Think like a historian",intro:"A rule can establish order and still be open to criticism.",questions:[
   {id:"ss7",type:"choice",prompt:"What is the strongest cautious conclusion about Hammurabi's written laws?",options:["Written rules meant everyone had equal rights","The laws show how rulers tried to organize society, but treatment could differ by social position","The laws prove every person obeyed"],correct:1,why:"Written laws reveal values and systems of authority, not necessarily equal treatment or universal obedience."},
   {id:"ss8",type:"text",prompt:"Explain how geography and government worked together in the classroom river-settlement scenario. Use at least two specific details.",placeholder:"Because the river ... the community needed ... The leader ...",minWords:30},
   {id:"ss9",type:"text",prompt:"What is one question you would ask if you were studying a real ancient law collection as a historical source?",placeholder:"I would ask ... because ...",minWords:12}
  ]}
 ]
},
{
 id:"math-store",subject:"math",subjectName:"Math 7",grade:"Grade 7",title:"School Store: Percent Challenge",time:"30–35 min",
 summary:"Use discounts, tax and comparison strategies to make a realistic purchase decision.",
 lesson:"../math/#fdp/l16",lessonText:"Review fractions, decimals and percents",focus:"Fractions, Decimals & Percents · Discounts and tax",
 reading:[
  "The school store has a hoodie priced at $72.00. Today it is 25% off. For this practice activity, use a combined sales tax of 12% on the discounted price. You have $80.00 to spend.",
  "Two other offers are available for the same $60.00 backpack: Offer A takes 15% off the original price. Offer B takes a flat $10.00 off. Ignore taxes for the backpack comparison.",
  "Write money answers in dollars and round to the nearest cent when necessary. The practice amounts have been chosen for this activity."
 ],
 sections:[
  {title:"Work out the hoodie",intro:"Show your calculation in the final explanation rather than guessing each amount.",questions:[
   {id:"ma1",type:"number",prompt:"What is 25% of $72.00? (Dollar amount of the discount.)",answer:18,tolerance:.005,unit:"$",why:"0.25 × 72 = 18. The discount is $18."},
   {id:"ma2",type:"number",prompt:"What is the price of the hoodie after the discount, before tax?",answer:54,tolerance:.005,unit:"$",why:"$72 − $18 = $54."},
   {id:"ma3",type:"number",prompt:"What is the tax on the discounted hoodie at the exercise rate of 12%?",answer:6.48,tolerance:.005,unit:"$",why:"0.12 × 54 = $6.48."},
   {id:"ma4",type:"number",prompt:"What is the hoodie total after discount and tax?",answer:60.48,tolerance:.005,unit:"$",why:"$54 + $6.48 = $60.48."},
   {id:"ma5",type:"number",prompt:"How much of the $80 budget remains after buying the hoodie?",answer:19.52,tolerance:.005,unit:"$",why:"$80 − $60.48 = $19.52."}
  ]},
  {title:"Compare two deals",intro:"The backpack has the same original price in both offers.",questions:[
   {id:"ma6",type:"number",prompt:"Backpack Offer A: what is the final price after 15% off $60?",answer:51,tolerance:.005,unit:"$",why:"15% of $60 is $9. $60 − $9 = $51."},
   {id:"ma7",type:"choice",prompt:"Which backpack offer saves more money?",options:["Offer A: 15% off","Offer B: $10 off","Both are equal"],correct:1,why:"Offer A saves $9. Offer B saves $10, so Offer B is better by $1."},
   {id:"ma8",type:"choice",prompt:"Why should the hoodie tax be calculated on the discounted price in this problem?",options:["The instructions use the amount actually being charged before tax","Tax always increases the discount","25% and 12% can just be added together"],correct:0,why:"First calculate the discount, then apply tax to the sale price."}
  ]},
  {title:"Explain your reasoning",intro:"Use clear steps; a correct answer is stronger when you can explain how it was found.",questions:[
   {id:"ma9",type:"text",prompt:"Show at least two steps in your hoodie calculation, including the discount and the tax.",placeholder:"Discount = ... Tax = ... Total = ...",minWords:18},
   {id:"ma10",type:"text",prompt:"Write one tip to help someone avoid mistakes when using percentages in a store.",placeholder:"One thing to remember is ...",minWords:12}
  ]}
 ]
},
{
 id:"ela-slides",subject:"ela",subjectName:"English Language Arts",grade:"Grade 8",title:"After the Bell: Plot & Evidence",time:"35–40 min",
 summary:"Read an original story, map its plot, and write an answer supported by evidence.",
 lesson:"../ela/#stories/plot",lessonText:"Review the plot diagram",focus:"Short Stories · Plot & Answer–Evidence–Explain",
 reading:[
  "After the Bell — an original classroom short story",
  "The presentation was due at the end of the period. Eva, Nia and Sam had spent two afternoons making slides about the history of their town. Nia had found the photographs, Sam had organized the information, and Eva had promised to check everything before class.",
  "With five minutes left, Sam opened the slideshow and frowned. “Where did the photo credits go?” The final slide was blank. Nia stared at the screen. “I added them yesterday. I remember.”",
  "Eva felt her stomach tighten. During lunch, she had deleted a slide she thought was a duplicate. She could still picture the small confirmation box she had clicked without reading.",
  "Sam glanced at Nia. “Did you forget to save it?” Nia's face went red. “No. I did my part.” The room grew quiet except for the hum of the projector.",
  "Eva looked at the clock. She could keep quiet and let Nia take the blame. Instead, she moved her chair closer. “It was me,” she said. “I deleted the slide. I'm sorry. I think we can rebuild it from the notes.”",
  "For a moment, nobody spoke. Then Nia pulled up the research document, Sam opened a new slide, and Eva copied the source details into place. When the bell rang, their presentation still wasn't perfect, but the credits were back. As they packed up, Nia slid her notebook toward Eva. “Next time,” she said, “just tell us sooner.”"
 ],
 sections:[
  {title:"Understand the conflict",intro:"Think about the choice Eva faces, not just the missing slide.",questions:[
   {id:"el1",type:"choice",prompt:"What is Eva's main internal conflict?",options:["She cannot open the presentation file","She must choose between admitting her mistake and avoiding blame","She does not like history"],correct:1,why:"Eva knows what happened and has to decide whether to tell the truth."},
   {id:"el2",type:"text",prompt:"Identify one detail from the text that shows Eva feels guilty or uncertain.",placeholder:"The story says ...",minWords:10},
   {id:"el3",type:"choice",prompt:"Which moment is the story's climax?",options:["The team begins working two afternoons earlier","Eva admits she deleted the photo-credit slide","Nia finds the photographs"],correct:1,why:"Eva's decision to speak up resolves the central choice she has been struggling with."}
  ]},
  {title:"Map the plot",intro:"Place four events in a logical plot sequence.",questions:[
   {id:"el4",type:"order",prompt:"Put these major events in the order they occur in the story.",items:["Sam discovers the blank credit slide","Eva remembers deleting a slide","Eva admits her mistake","The group rebuilds the credits"],correct:[0,1,2,3],why:"The missing slide creates the problem, Eva recognizes the mistake, she makes a decision, and the group responds."},
   {id:"el5",type:"text",prompt:"In 2–3 sentences, explain how the ending changes the relationship between Eva and Nia.",placeholder:"At first ... By the end ...",minWords:22}
  ]},
  {title:"Answer, Evidence, Explain",intro:"A strong paragraph makes a point and proves it with a specific detail.",questions:[
   {id:"el6",type:"text",prompt:"Question: Does Eva show courage? Write one paragraph with Answer, Evidence and Explain.",placeholder:"Eva shows courage because ... When she says ... This detail shows ...",minWords:45},
   {id:"el7",type:"choice",prompt:"Which is the strongest piece of evidence that Eva accepts responsibility?",options:["“The room grew quiet”","“The presentation was due”","“It was me,” she said. “I deleted the slide.”"],correct:2,why:"Eva directly admits the action, supporting the claim about responsibility."},
   {id:"el8",type:"text",prompt:"Revise one sentence from your paragraph to be more precise. Write the original and improved sentence.",placeholder:"Original: ...\nImproved: ...",minWords:18}
  ]}
 ]
},
{
 id:"thinking-case",subject:"ct",subjectName:"Critical Thinking",grade:"Grade 7/8",title:"Case File: The Cracked Trophy Case",time:"30–35 min",
 summary:"Sort observations from inferences and update a theory after new evidence appears.",
 lesson:"../critical-thinking/#lab/l2",lessonText:"Review observation vs. inference",focus:"Think Lab · Evidence, Inference & Revision",
 reading:[
  "Investigation briefing — classroom case file",
  "At 3:20 p.m., a basketball is found on the floor near the trophy case. At 3:22, a teacher hears a bang in the hallway. At 3:25, someone notices a crack in the trophy case glass. Nobody reports seeing the glass break.",
  "Some students suggest the basketball caused the crack. But a ball beside the case does not show how or when the glass cracked.",
  "New evidence: A photograph taken at 3:10 p.m. already shows the crack in the glass. That new observation changes which theories are possible."
 ],
 sections:[
  {title:"Separate facts and guesses",intro:"Treat an observation as something directly confirmed; an inference is an explanation added to the facts.",questions:[
   {id:"ct1",type:"choice",prompt:"Which statement is a directly reported observation?",options:["The basketball broke the case","A basketball was found near the case at 3:20","A student was careless"],correct:1,why:"The ball's location and time were reported. Its role in causing the crack was not."},
   {id:"ct2",type:"choice",prompt:"What kind of statement is “The basketball probably cracked the glass”?",options:["A proven fact","An inference","A direct measurement"],correct:1,why:"It is an explanation of the situation, but there is no observation confirming it."},
   {id:"ct3",type:"order",prompt:"Put these reported events in time order.",items:["Photograph shows the crack at 3:10","Basketball found at 3:20","A bang is heard at 3:22","Crack noticed at 3:25"],correct:[0,1,2,3],why:"The photograph is earlier than all three other observations."}
  ]},
  {title:"Revise the theory",intro:"Good investigators change their conclusions when the evidence changes.",questions:[
   {id:"ct4",type:"choice",prompt:"What does the 3:10 photograph rule out?",options:["The crack was first created by the 3:22 bang","Anyone entering the hallway that day","The possibility that the glass had a crack earlier"],correct:0,why:"The photograph confirms the crack existed before the 3:22 noise."},
   {id:"ct5",type:"text",prompt:"Write a revised theory that fits all the observations and explains what is still unknown.",placeholder:"The photograph shows ... We cannot yet conclude ...",minWords:32},
   {id:"ct6",type:"choice",prompt:"Which additional evidence would be most useful for learning when the glass first cracked?",options:["A time-stamped earlier photograph of the case","A vote on who students suspect","A guess based on the sound of the bang"],correct:0,why:"An earlier dated image could narrow the time window directly."}
  ]},
  {title:"Make an evidence-based conclusion",intro:"Distinguish what you know, what you think, and what you still need.",questions:[
   {id:"ct7",type:"text",prompt:"Write a three-part report: two confirmed observations, one reasonable inference, and one remaining uncertainty.",placeholder:"Observations: ...\nInference: ...\nUncertainty: ...",minWords:40},
   {id:"ct8",type:"text",prompt:"Explain why changing your theory after new evidence is a strength rather than a weakness.",placeholder:"A strong thinker ...",minWords:20}
  ]}
 ]
}
];
g.ComputerClassData={version:1,activities};
})(window);