/* Computer Class · Pack 3: five more curriculum-aligned independent investigations. */
(function(g){
"use strict";
const store=g.ComputerClassData;if(!store)return;
const C=(id,prompt,options,correct,why)=>({id,type:"choice",prompt,options,correct,why});
const T=(id,prompt,minWords=20,placeholder="Explain your reasoning with evidence.")=>({id,type:"text",prompt,minWords,placeholder});
const N=(id,prompt,answer,why,tolerance=.005)=>({id,type:"number",prompt,answer,tolerance,unit:"",why});
const O=(id,prompt,items,correct,why)=>({id,type:"order",prompt,items,correct,why});
const L=(id,prompt,lab,minTrials=3)=>({id,type:"lab",prompt,lab,minTrials});
store.activities.push(
{
 id:"science-oxygen-systems",subject:"sci",subjectName:"Science",grade:"Grade 8",title:"Oxygen Mission: Systems Working Together",time:"50–60 min",
 summary:"Investigate how the nervous, digestive, respiratory, circulatory and integumentary systems support a body during exercise. Use the map and oxygen model to explain the connections.",
 lesson:"../science/#cells/systems",lessonText:"Open the Human Systems Explorer",focus:"Cells & Systems · Nervous, digestive, respiratory, circulatory and integumentary connections",
 reading:[
  "When you breathe, the respiratory system moves air into the lungs. Oxygen passes into the blood, and carbon dioxide passes from the blood into the lungs to be exhaled. The circulatory system then transports oxygen to body cells. Cells use oxygen in cellular respiration to release usable energy from nutrients.",
  "During exercise, the nervous system coordinates body responses. The digestive system breaks food down and nutrients are absorbed—mostly in the small intestine—then the blood can carry them to cells. A meal does not become instant fuel the moment a run starts. As the body warms, sweat evaporating from skin and changes in blood flow near the skin help with heat loss.",
  "In this activity, the digital model expresses supply and demand using illustrative indexes. The smaller of the breathing and circulation capacities limits oxygen delivery. Muscle activity controls demand. These values are NOT medical readings, oxygen saturation values or heart rates.",
  "A limitation is that real respiratory and circulatory systems are connected and adapt to exercise in more complicated ways. The oxygen model does not simulate nervous signals, digestion, skin cooling or real physiology; it helps isolate a few relationships and make predictions."
 ],
 sections:[
  {title:"Explore the body map",intro:"Open the Human Systems Explorer. Select the systems and organ labels as you answer.",questions:[
   C("om1","Which structure belongs to the integumentary system?",["Heart","Skin","Lungs"],1,"Skin is the body's protective outer layer and is part of the integumentary system."),
   O("om2","Order the path of air into the lungs.",["Bronchi","Lungs","Trachea","Air enters the airway"],[3,2,0,1],"Air enters the airway, travels down the trachea, branches through the bronchi and reaches the lungs."),
   T("om3","Select the small intestine in the map. Explain how its work connects the digestive and circulatory systems.",30,"The small intestine... The circulatory system...")
  ]},
  {title:"Predict the system connection",intro:"Think about why two different systems are necessary.",questions:[
   C("ox1","Which system moves oxygen from the lungs to body cells?",["Digestive system","Circulatory system","Integumentary system"],1,"Blood vessels and the heart move oxygen through the circulatory system."),
   C("ox2","Where does oxygen enter the blood?",["In the lungs","In the stomach","In bones"],0,"Gas exchange in the lungs allows oxygen into blood."),
   T("ox3","Explain what happens to a body cell if oxygen cannot be delivered efficiently.",25,"Cells need oxygen... Without sufficient delivery...")
  ]},
  {title:"Trace an exercise response",intro:"Imagine a student begins running. These systems respond together; the order below is a simplified path for learning, and several changes happen at the same time.",questions:[
   C("ex1","Which system coordinates signals that help the body respond when running begins?",["Nervous system","Digestive system","Integumentary system"],0,"The brain and nerves coordinate body responses and send signals to working muscles."),
   O("ex2","Order this simplified path for oxygen reaching active muscle cells.",["Blood carries oxygen to active muscles.","The brain sends signals that coordinate body responses.","Oxygen moves from lung air into blood.","Muscle cells use oxygen during cellular respiration.","Breathing brings air into the lungs."],[1,4,2,0,3],"Signals coordinate the response; breathing brings air to the lungs, oxygen enters blood, blood transports it, and cells use it."),
   T("ex3","A student ate lunch before running. Explain how the digestive and circulatory systems can help deliver nutrients to muscle cells. Include where most nutrient absorption happens and clarify whether lunch is digested instantly when running starts.",32,"Most nutrients are absorbed in... The blood... Digestion does not happen instantly because..."),
   T("ex4","During a run, the student gets warm and sweats. Explain how the integumentary system helps, and distinguish that job from oxygen delivery.",28,"The integumentary system... The circulatory system... This differs from oxygen delivery because...")
  ]},
  {title:"Run the oxygen model",intro:"Test at least three combinations, including one with low breathing capacity and one with low circulation capacity.",questions:[
   L("ox4","Use the Oxygen Delivery Model to record three different trials. Compare delivery with demand.","oxygen",3),
   C("ox5","If the breathing index is much lower than the circulation index, what limits the model?",["Breathing capacity","Circulation capacity","Muscle demand directly creates oxygen"],0,"The lower supply capacity becomes the limiting factor."),
   C("ox6","If muscle activity increases while both supply capacities stay fixed, what happens?",["Demand typically increases","Demand always becomes zero","Oxygen supply automatically doubles"],0,"Higher muscle activity raises the demand index in this model."),
   T("ox7","Describe two of your trials. Which setting was limiting delivery and what changed when you adjusted a slider?",35,"Trial 1... Trial 2... The limiting factor was...")
  ]},
  {title:"Explain and evaluate",intro:"Connect model evidence to real structures without treating the numbers as physiological measurements.",questions:[
   O("ox8","Order the main path of oxygen to a working muscle cell.",["Oxygen is transported in the bloodstream","Oxygen enters the lungs with inhaled air","Oxygen is used by body cells","Oxygen diffuses into blood at the lungs"],[1,3,0,2],"Air enters lungs, oxygen moves into blood, blood transports it, and cells use it."),
   T("ox9","Write a Claim–Evidence–Reasoning paragraph explaining why the respiratory and circulatory systems must work together. Cite one model trial and one model limitation.",52,"Claim: ... Evidence: ... Reasoning: ... Limitation: ...")
  ]}
 ]
},
{
 id:"social-trade-network",subject:"ss",subjectName:"Social Studies",grade:"Grade 8",title:"Mesopotamian Trade: City-State Decisions",time:"35–45 min",
 summary:"Investigate specialization, trade-offs, and river geography in an ancient city-state scenario.",
 lesson:"../social-studies/",lessonText:"Explore the Mesopotamia lessons",focus:"Mesopotamia · Economy, geography and political choices",
 reading:[
  "CLASSROOM SCENARIO — A fictional Mesopotamian city-state beside a river has produced extra grain during a good harvest. It needs timber for building, stone for tools, and copper for metalworking. These resources are not all easily available nearby. Merchants propose trading some grain for materials from other regions.",
  "The city also faces a problem: canals need repairs before the next dry season. Leaders are debating how much grain to reserve locally, how much to trade, and how much to support workers repairing the canals.",
  "People in ancient Mesopotamian societies engaged in trade, crafts and farming. Rivers, roads, boats and merchants helped connect settlements. Surplus food could support specialized workers, but the exact decisions in this exercise are fictional and do not represent a particular historical city."
 ],
 sections:[
  {title:"Understand the economy",intro:"Use the scenario to connect resources with specialization.",questions:[
   C("tr1","Why might a river city trade grain for timber or copper?",["Every resource can be found equally nearby","Different regions have access to different resources","Farming removes the need for materials"],1,"Trade can provide materials not easily available locally."),
   C("tr2","Which GRAPES category includes merchants, production and trade?",["Economy","Arts","Religion"],0,"Exchange, work and resources are central to economic life."),
   T("tr3","Explain how producing a food surplus might allow some people to become specialized craftspeople.",28,"When farming produces extra... people can...")
  ]},
  {title:"Manage the canal",intro:"Divide a model water supply among three farm areas, recording at least two different allocations.",questions:[
   L("tr4","Use the Irrigation Allocation Model to record two different plans. Compare crop support and whether the allocation seems fair.","canal",2),
   C("tr5","What is a likely consequence of leaving irrigation canals unrepaired?",["Water delivery may become less reliable","Crops grow without water","Rivers stop flowing permanently"],0,"Canals helped direct water to fields; damage could disrupt that."),
   C("tr6","Which response best considers both immediate and long-term needs?",["Trade every grain immediately","Reserve some grain for local needs and plan for canal repair","Ignore maintenance for years"],1,"Balancing needs is central to responsible resource planning."),
   T("tr7","Explain one trade-off in the allocation plan you recorded, and identify who could be affected.",36,"My plan gives ... more water. The trade-off is ...")
  ]},
  {title:"Use evidence to advise the leader",intro:"Make a recommendation and acknowledge what you cannot know for certain.",questions:[
   O("tr8","Order this possible trade process logically.",["Goods arrive and are distributed","Merchants identify which materials the city needs","The city offers surplus grain or other goods","Trading partners agree to exchange"],[1,2,3,0],"Identify a need, offer resources, agree on an exchange, then distribute goods."),
   T("tr9","Write a recommendation to the city leader: how should the city balance grain reserves, trade and canal repair? Use at least two details from the scenario.",53,"I recommend... First... Second... A possible downside...")
  ]}
 ]
},
{
 id:"math-decimal-detective",subject:"math",subjectName:"Math 7",grade:"Grade 7",title:"Decimal Detective: Place Value & Estimation",time:"30–35 min",
 summary:"Compare decimals, estimate sums, work with money, and catch common place-value errors.",
 lesson:"../math/",lessonText:"Open Grade 7 Math",focus:"Place Value · Decimal operations and estimation",
 reading:[
  "You are checking a store's order sheet. Four items cost $12.45, $8.90, $3.75 and $19.60. The checkout display shows $45.70. Before trusting it, estimate the total and then calculate exactly.",
  "A classmate argues that 0.8 is smaller than 0.75 because 8 is smaller than 75. Another classmate says 3.06 is larger than 3.6 because 306 is larger than 36. You must explain the place-value mistakes.",
  "Remember that digits only have meaning in their positions: 0.8 = 0.80, and 3.6 = 3.60. Rounding can make calculations easier to check, but the exact total should use the actual prices."
 ],
 sections:[
  {title:"Check the checkout",intro:"Estimate first so you know whether your exact answer makes sense.",questions:[
   C("dd1","Which is the closest whole-dollar estimate for $12.45 + $8.90 + $3.75 + $19.60?",["$25","$45","$75"],1,"Rounded items are approximately $12 + $9 + $4 + $20 = $45."),
   N("dd2","What is the exact total of the four items in dollars?",44.70,"12.45 + 8.90 + 3.75 + 19.60 = 44.70."),
   N("dd3","By how many dollars is the checkout display of $45.70 incorrect?",1.00,"$45.70 − $44.70 = $1.00."),
   T("dd4","Explain how an estimate helps you check a calculator or cash-register answer.",20,"An estimate helps because...")
  ]},
  {title:"Understand place value",intro:"Line up decimal places before comparing or calculating.",questions:[
   C("dd5","Which decimal is greater?",["0.8","0.75","They are equal"],0,"0.8 = 0.80, and 80 hundredths is greater than 75 hundredths."),
   C("dd6","Which number is larger?",["3.06","3.6","They are equal"],1,"3.60 is greater than 3.06."),
   N("dd7","What is 0.7 + 0.08 + 0.006?",.786,"Seven tenths, eight hundredths and six thousandths total 0.786."),
   O("dd8","Order these values from least to greatest.",["0.503","0.35","0.53","0.305"],[3,1,0,2],"0.305 < 0.35 < 0.503 < 0.53.")
  ]},
  {title:"Explain the mistake",intro:"Teach someone how to correct a misconception.",questions:[
   T("dd9","Explain why 3.06 is less than 3.6, using place value or equivalent decimal notation.",27,"3.6 can be written as... That means..."),
   T("dd10","Create your own decimal comparison question with a correct solution and a short explanation.",25,"Compare ... and ... The greater number is ... because...")
  ]}
 ]
},
{
 id:"ela-the-choice",subject:"ela",subjectName:"English Language Arts",grade:"Grade 8",title:"The Choice: Theme & Character Decisions",time:"35–40 min",
 summary:"Read an original narrative, distinguish theme from topic, and support an interpretation with evidence.",
 lesson:"../ela/",lessonText:"Explore ELA story resources",focus:"Theme, character motivation and text evidence",
 reading:[
  "THE CHOICE — Original short story",
  "When the class voted on a new mural design, Leo's sketch came second. He had worked on it for weeks, layering bright green shapes over a black background, but most of the class wanted Anika's design. It showed a winding river with small pictures of places around the community.",
  "Leo smiled when the results were announced. Then, during lunch, he quietly removed his sketch from the notice board. It felt easier than watching someone else's idea become permanent.",
  "The next morning Anika asked him for help. “I like the way you draw trees,” she said. “The river goes through a forest in one section, and I can't make it look right.” Leo almost said no. He still felt disappointed, and he knew that helping would not make his design the winner.",
  "He brought his notebook the following day. They tried three versions before the trees looked right. Weeks later, as the class stood under the finished mural, Leo could still spot the shapes he had drawn. He didn't stop wishing his design had won, but he was glad the wall included something he had made."
 ],
 sections:[
  {title:"Identify topic and theme",intro:"A theme is a message about life or people, not just a one-word subject.",questions:[
   C("ch1","Which is a theme rather than simply a topic?",["Art","Disappointment","Contributing to a group can matter even when you don't get your first choice"],2,"A theme expresses a broader idea that the story develops."),
   C("ch2","What does Leo's decision to take down his sketch suggest?",["He feels disappointed","He has never drawn before","He dislikes his community"],0,"Removing the sketch suggests the result hurts."),
   T("ch3","Choose one sentence that reveals Leo's feelings. Explain how the author communicates them without saying the emotion directly.",28,"A detail is... This reveals...")
  ]},
  {title:"Follow the decision",intro:"Examine what prompts Leo to change his behavior.",questions:[
   O("ch4","Put the main events in narrative order.",["Leo helps draw the mural trees","The class chooses Anika's design","Leo sees his contribution in the finished mural","Leo removes his sketch"],[1,3,0,2],"Leo first loses, withdraws, chooses to help and later sees his contribution."),
   C("ch5","Which moment is the central turning point?",["Leo agrees to help Anika with the trees","The mural is completed weeks later","Leo first draws a sketch"],0,"Leo chooses to contribute despite disappointment."),
   T("ch6","Why does the ending feel more realistic than a version where Leo suddenly stops feeling disappointed?",28,"The ending is realistic because...")
  ]},
  {title:"Write with evidence",intro:"Use a specific story detail in your explanation.",questions:[
   C("ch7","Which evidence best supports the idea that Leo learns to cooperate?",["The vote had two designs","He brings his notebook and tries three versions of the trees","The notice board was in the classroom"],1,"His actions show that he contributes despite losing."),
   T("ch8","Write an Answer–Evidence–Explain paragraph explaining a theme of the story. Use a specific detail and connect it to the overall message.",52,"One theme is... For example... This shows..."),
   T("ch9","Imagine the ending from Anika's perspective. Write 3–5 sentences that remain consistent with the story.",38,"When Leo agreed to help, I...")
  ]}
 ]
},
{
 id:"thinking-fair-test",subject:"ct",subjectName:"Critical Thinking",grade:"Grade 7/8",title:"The Fair-Test Challenge",time:"35–40 min",
 summary:"Spot unfair comparisons, change one variable at a time, and use evidence to improve an investigation.",
 lesson:"../critical-thinking/",lessonText:"Explore logic investigations",focus:"Scientific reasoning · Variables, confounding and evidence",
 reading:[
  "FAIR TEST CASE — A group wants to know whether music affects how quickly students finish a puzzle. Group A does an easy puzzle in a quiet room; Group B does a harder puzzle while listening to music. Group B takes longer.",
  "The students claim that music slows everyone down. But the puzzle difficulty also changed, so the comparison cannot isolate the effect of music. Another problem is that a result from one attempt may not represent what happens generally.",
  "A stronger plan would use puzzles of similar difficulty, similar instructions and conditions, and a way to compare repeated trials. The independent variable is the condition deliberately changed. The dependent variable is the outcome measured. Controlled variables stay as similar as possible."
 ],
 sections:[
  {title:"Find the flaws",intro:"Identify what changed and what was measured.",questions:[
   C("ft1","What variable should be changed intentionally in the proposed experiment?",["Puzzle difficulty","Music condition","Time of day for one group only"],1,"If the question is about music, the music condition should be the independent variable."),
   C("ft2","What is the dependent variable?",["Puzzle completion time","The number of walls","The type of chair"],0,"Puzzle completion time is the measured outcome."),
   C("ft3","Why is the original comparison not fair?",["One group had a harder puzzle as well as music","Both groups used pens","The question was about puzzles"],0,"Puzzle difficulty is a confounding variable."),
   T("ft4","Explain why a harder puzzle could affect the result even if music has no effect.",26,"The group with music also... This makes it impossible to know...")
  ]},
  {title:"Redesign the test",intro:"Use the fair-test principles to improve the plan.",questions:[
   O("ft5","Put the actions in a logical investigation sequence.",["Compare the results and look for a pattern","State the question and define the variable","Collect repeated measurements under fair conditions","Choose how completion time will be measured"],[1,3,2,0],"Define the question and measurements, collect fair trials, then compare."),
   C("ft6","Which is a better controlled condition?",["Use similar puzzle difficulty for both groups","Give one group more instructions","Switch rooms and tasks at random without recording them"],0,"Holding difficulty similar reduces a confound."),
   T("ft7","Design an improved music-and-puzzle experiment. State the independent variable, dependent variable and two controls.",50,"Independent variable: ... Dependent variable: ... Controls: ..."),
   C("ft8","Which result is strongest for a cautious conclusion?",["One student finishes one puzzle faster","The same difference appears repeatedly in similar fair trials","Three classmates guess the result"],1,"Repeated fair measurements support more reliable conclusions.")
  ]},
  {title:"Interpret responsibly",intro:"A reasonable conclusion should match the evidence.",questions:[
   T("ft9","The new test shows a small difference in average completion times. Write a cautious conclusion that mentions the evidence and one uncertainty.",39,"The results suggest... However... More trials could...")
  ]}
 ]
}
);
})(window);
