/* Computer Class · Pack 4. Original independent lessons for five current Grade 7/8 subjects.
   Student drafts stay local, as in all other Computer Class assignments. */
(function(g){
"use strict";
const store=g.ComputerClassData;if(!store)return;
const C=(id,prompt,options,correct,why)=>({id,type:"choice",prompt,options,correct,why});
const T=(id,prompt,minWords=22,placeholder="Use specific evidence and explain your thinking.")=>({id,type:"text",prompt,minWords,placeholder});
const N=(id,prompt,answer,why,tolerance=.005)=>({id,type:"number",prompt,answer,tolerance,unit:"",why});
const O=(id,prompt,items,correct,why)=>({id,type:"order",prompt,items,correct,why});
store.activities.push(
{
 id:"science-microscope-evidence",subject:"sci",subjectName:"Science",grade:"Grade 8",
 title:"Microscope Field Notes: Magnification & Evidence",time:"35–40 min",
 summary:"Compare magnifications, calculate specimen size, and explain the relationship between field of view and cell detail.",
 lesson:"../science/#cells/theory",lessonText:"Open the Virtual Microscope Investigation",focus:"Cells & Systems · Cell size, magnification and scientific observation",
 reading:[
  "Microscopes allow us to see details too small for the unaided eye. Total magnification equals eyepiece magnification multiplied by objective magnification. This classroom model uses a 10× eyepiece and 4×, 10× and 40× objectives.",
  "As objective magnification increases, the diameter of the visible field decreases. The model assumes an approximate 4,500 µm field at 40× total magnification, 1,800 µm at 100× total and 450 µm at 400× total. These are model values, not measurements for every real microscope.",
  "Cell-size estimation: approximate cell width in micrometres = field diameter in micrometres divided by the estimated number of cell widths across. The model slides are schematic drawings rather than micrographs. You can explore the actual interactive model using the related lesson link."
 ],
 sections:[
  {title:"Predict before observing",intro:"Use the microscope model values and the focus controls in the linked Science lesson.",questions:[
   C("mi1","Which objective lens produces 100× total magnification with a 10× eyepiece?",["4× objective","10× objective","40× objective"],1,"10 × 10 = 100× total magnification."),
   C("mi2","As total magnification rises from 40× to 400×, what happens to field-of-view diameter?",["It becomes smaller","It increases tenfold","It stays exactly the same"],0,"A higher magnification reveals a smaller area."),
   N("mi3","Using a 10× eyepiece with a 40× objective, what is the total magnification?",400,"10 × 40 = 400×."),
   T("mi4","Before opening the simulator, predict how onion cells will look different at 40× and 400× total magnification.",28,"At 40×... At 400×... I predict...")
  ]},
  {title:"Observe and calculate",intro:"Open the linked microscope lesson, change focus and objectives, and record specific observations.",questions:[
   N("mi5","At 400× total, the model's field diameter is 450 µm. If 5 cell widths fit across, estimate one cell width in µm.",90,"450 µm ÷ 5 = 90 µm."),
   N("mi6","At 100× total, a field is 1,800 µm across. If 18 similar cell widths fit across, what is the estimated width of one cell?",100,"1,800 ÷ 18 = 100 µm."),
   O("mi7","Put these microscope investigation actions in a safe logical sequence.",["Record your estimated cells across the field","Start with a low-power objective","Increase magnification if a higher-resolution view is needed","Adjust focus until the image is clear"],[1,3,2,0],"Start on low power, focus the specimen, then increase magnification and record a focused observation."),
   T("mi8","Describe two differences you actually noticed in the virtual microscope when switching between objectives or slide types.",34,"I saw... When I changed... This showed...")
  ]},
  {title:"Claim, evidence, reasoning",intro:"Treat drawings and measurements as approximations rather than exact biological measurements.",questions:[
   C("mi9","Which statement correctly identifies a limitation of the interactive model?",["All real cells have exactly the shown dimensions","The drawings simplify real tissue and field dimensions","Real microscopes do not have objective lenses"],1,"The model illustrates principles but cannot replace calibrated observations."),
   T("mi10","Write a Claim–Evidence–Reasoning paragraph: how does changing magnification affect what a scientist can observe? Include one calculation, one observation and a limitation.",56,"Claim: ... Evidence: ... Reasoning: ... Limitation: ...")
  ]}
 ]
},
{
 id:"math-fraction-budget",subject:"math",subjectName:"Math 7",grade:"Grade 7",
 title:"Fraction Budget: Plan a Class Purchase",time:"35–40 min",
 summary:"Solve fraction and percent problems with a fixed budget, compare deals, and justify a purchasing decision.",
 lesson:"../math/",lessonText:"Review Grade 7 fractions and percents",focus:"Number Sense · Fractions, decimals, percents and estimation",
 reading:[
  "CLASSROOM PURCHASE PLAN — The class has a practice budget of $240 for supplies. The team plans to spend three eighths of the money on notebooks, one quarter on art supplies, and the rest on a shared project. The values are invented for this calculation task, not a real classroom budget.",
  "The store offers two deals on an item priced at $80: Deal A takes 20% off. Deal B takes $14 off. Ignore sales taxes for this comparison. A different item priced at $75 is sold at a 10% discount; this time, add 12% practice sales tax to the discounted price.",
  "A good solution shows the fraction or percentage used, the calculation and a reasonableness check. Keep dollar answers to two decimal places where needed."
 ],
 sections:[
  {title:"Divide the budget",intro:"Convert fractions of the whole budget into actual amounts.",questions:[
   N("fb1","How many dollars are allocated to notebooks (3/8 of $240)?",90,"$240 ÷ 8 × 3 = $90."),
   N("fb2","How many dollars are allocated to art supplies (1/4 of $240)?",60,"One quarter of $240 is $60."),
   N("fb3","How many dollars are left for the shared project after notebooks and art?",90,"$240 − $90 − $60 = $90."),
   C("fb4","What fraction of the budget remains for the shared project?",["3/8","1/8","5/8"],0,"The remaining share is 1 − 3/8 − 1/4 = 3/8.")
  ]},
  {title:"Compare discounts",intro:"Compare the final amount paid, not only the discount label.",questions:[
   N("fb5","How many dollars does Deal A save on the $80 item at 20% off?",16,"0.20 × $80 = $16."),
   C("fb6","Which $80-item deal saves the most money?",["Deal A: 20% off","Deal B: $14 off","The savings are identical"],0,"Deal A saves $16 and Deal B saves $14."),
   N("fb7","What is the final price of the $75 item after 10% off and then 12% practice sales tax?",75.60,"$75 × 0.90 = $67.50, then $67.50 × 1.12 = $75.60."),
   O("fb8","Order these steps for calculating a taxed sale price.",["Add the tax to the discounted price","Find the original price","Calculate the discount and subtract it","Check the final cost against your budget"],[1,2,0,3],"Find the discount first, then apply tax to the price actually charged.")
  ]},
  {title:"Justify a decision",intro:"Show mathematical reasoning that another student could follow.",questions:[
   T("fb9","Explain how you calculated the shared-project portion of the budget using fractions or equivalent percentages.",30,"I found... Then I subtracted... My answer is reasonable because..."),
   T("fb10","Write a recommendation about the two $80-item deals. Include the two savings amounts, the difference and a reason.",34,"Deal ... saves ... Compared with ... Therefore...")
  ]}
 ]
},
{
 id:"social-historical-source",subject:"ss",subjectName:"Social Studies",grade:"Grade 8",
 title:"Mesopotamia: The Historian's Evidence Desk",time:"35–45 min",
 summary:"Differentiate artefacts from interpretations, examine irrigation decisions, and build a historically cautious claim.",
 lesson:"../social-studies/",lessonText:"Explore Mesopotamia and its geography",focus:"Ancient Societies · Historical inquiry, geography and GRAPES",
 reading:[
  "HISTORIAN'S DESK — Ancient Mesopotamia includes communities that developed near the Tigris and Euphrates rivers. Irrigation systems helped farmers bring water to fields. Surplus crops, trade and specialized jobs contributed to organized city life over time.",
  "SOURCE CARD A — A fictional classroom drawing of a clay tablet listing grain received and grain distributed by a storehouse. SOURCE CARD B — A modern textbook paragraph explaining that some officials and workers tracked grain. SOURCE CARD C — A fictional student's statement: 'Everyone in every Mesopotamian city must have received the same amount of grain.'",
  "The source cards are teaching reconstructions, NOT authentic primary sources. Archaeologists use surviving tablets, buildings, tools and art alongside comparisons and contextual evidence. Even a real tablet from one place and time cannot prove what happened throughout every Mesopotamian community."
 ],
 sections:[
  {title:"Recognize different evidence",intro:"Distinguish a physical record from an explanation or unsupported generalization.",questions:[
   C("hs1","If Source Card A represented a genuine ancient tablet, what kind of evidence would the tablet itself be?",["A primary source","A modern editorial","A fictional historical novel"],0,"A surviving object produced in the time studied is primary evidence."),
   C("hs2","What would the modern textbook paragraph in Source Card B generally be?",["A secondary interpretation","A direct archaeological object","A firsthand record by an ancient farmer"],0,"Modern historians interpret primary sources and other evidence."),
   C("hs3","What makes the claim that every city distributed grain equally unreliable?",["It generalizes beyond the available evidence","It mentions grain","It refers to a river civilization"],0,"One local record cannot prove a universal claim."),
   T("hs4","Explain how a genuine grain tablet could tell historians something about the economy while still leaving important questions unanswered.",32,"A tablet could show... But it might not tell us...")
  ]},
  {title:"Connect evidence to geography",intro:"Use GRAPES and river-geography concepts to develop a stronger explanation.",questions:[
   C("hs5","Which GRAPES category most directly concerns rivers, floodplains and the land?",["Geography","Arts","Social structure"],0,"Physical features and location are central to Geography."),
   O("hs6","Put these possible developments in a sensible reasoning sequence (not an exact timeline for every city).",["Specialized workers perform different jobs","Communities settle near water and fertile land","Irrigation supports more reliable crop production","Some food production supports people outside farming"],[1,2,3,0],"Access to water and organized farming can contribute to surplus and specialization."),
   C("hs7","Which additional evidence best helps test how grain was managed?",["Several well-dated genuine tablets from different places","An unsupported modern guess","A fictional drawing without source information"],0,"Multiple authentic contextualized records improve the strength of the historical inference."),
   T("hs8","Explain how river geography might influence both political decisions and economic specialization.",33,"Because... leaders needed... This allowed...")
  ]},
  {title:"Write a cautious historical claim",intro:"Good historical reasoning distinguishes observation, interpretation and uncertainty.",questions:[
   T("hs9","Write a Claim–Evidence–Reasoning paragraph about the connection between irrigation and early city development. Include one uncertainty.",58,"Claim: ... Evidence: ... Reasoning: ... What remains uncertain: ..."),
   T("hs10","Suggest one question you would ask before trusting a historical object or source card. Explain why that question matters.",22,"I would ask... It matters because...")
  ]}
 ]
},
{
 id:"ela-revision-workshop",subject:"ela",subjectName:"English Language Arts",grade:"Grade 8",
 title:"The Lost Page: Plot & Revision Workshop",time:"35–45 min",
 summary:"Interpret an original short story, organize its plot and improve an evidence-based paragraph.",
 lesson:"../ela/",lessonText:"Review plot diagrams and evidence writing",focus:"Reading and Writing · Conflict, inference, plot and revision",
 reading:[
  "THE LOST PAGE — Original classroom short story",
  "On the morning of the exhibition, Rowan reached into his backpack and found the folder open. The final page of his illustrated history project was missing. He shook the folder, checked the bottom of his bag and turned every notebook upside down. Nothing.",
  "His partner Mina was already setting up their table. 'It's probably in your locker,' she said. Rowan wanted to believe her, but he remembered carrying the folder through the library the day before.",
  "At lunch, Rowan retraced his route. The librarian was shelving books near the return cart. She pointed at a paper that had slipped between two books: a drawing of the old train station. The corner was bent, but the words were readable.",
  "Rowan ran back to the classroom with the page. For a moment he considered hiding the damage under another sheet. Instead, he showed Mina the bend and asked for tape. They repaired the corner together and added a small caption explaining how they found the source image.",
  "When visitors came to the exhibition, the project looked slightly less perfect than Rowan had imagined. But it was complete, and he knew every part of it had been checked."
 ],
 sections:[
  {title:"Understand conflict and motivation",intro:"Find the problem and the character's response.",questions:[
   C("lp1","What is the main external conflict in the story?",["A missing final project page","A disagreement about train stations","A cancelled exhibition"],0,"The lost page is the immediate obstacle Rowan must solve."),
   C("lp2","Which detail best shows Rowan feels anxious?",["He checks his bag and turns every notebook upside down","Mina sets up the table","Visitors arrive later"],0,"His repeated searching communicates urgency."),
   T("lp3","Describe Rowan's internal conflict when he considers hiding the damaged corner. What two choices is he weighing?",29,"Rowan could... Or he could... This matters because...")
  ]},
  {title:"Track events and climax",intro:"Use chronology to distinguish rising action, turning point and resolution.",questions:[
   O("lp4","Place the story's major events in narrative order.",["Rowan and Mina repair the page","The librarian locates the missing page","Rowan discovers the folder is missing a page","Visitors view the finished project"],[2,1,0,3],"The problem is discovered, evidence found, the damage addressed and the exhibition proceeds."),
   C("lp5","Which moment is the strongest turning point in Rowan's internal conflict?",["He chooses to show Mina the bent page instead of hiding it","He first opens his backpack","Visitors enter the exhibition"],0,"His choice to be honest resolves the central internal decision."),
   C("lp6","Which is a plausible theme supported by the ending?",["Doing careful, honest work matters more than appearing flawless","Train stations are always exciting","Every project must have a perfect drawing"],0,"Rowan accepts a visible imperfection and values accurate work."),
   T("lp7","Explain how Mina helps the resolution without solving the entire problem for Rowan.",28,"Mina... Rowan still needs to... Their cooperation...")
  ]},
  {title:"Revise with evidence",intro:"Support an interpretation with a detail and explain its importance.",questions:[
   C("lp8","Which sentence makes the strongest evidence-based claim?",["Rowan is a good person.","Rowan acts responsibly by admitting the page is damaged and helping repair it.","Rowan has a backpack."],1,"This claim connects a trait to specific actions."),
   T("lp9","Revise this weak paragraph: 'Rowan changed. The page was broken. He fixed it.' Write an Answer–Evidence–Explain paragraph of 5–7 sentences.",55,"Rowan changes because... The story states... This shows..."),
   T("lp10","Choose one sentence from your paragraph and improve its precision. Give your original sentence and revised version.",20,"Original: ... Revised: ...")
  ]}
 ]
},
{
 id:"thinking-ai-fact-check",subject:"ct",subjectName:"Critical Thinking",grade:"Grade 7/8",
 title:"AI Fact-Check Lab: Useful Tool or Unreliable Claim?",time:"35–45 min",
 summary:"Check an AI-style response against evidence, identify invented citations and practise responsible use of digital tools.",
 lesson:"../critical-thinking/",lessonText:"Open the Critical Thinking hub",focus:"Digital Literacy · AI output, sources, verification and responsible use",
 reading:[
  "CLASSROOM SCENARIO — A student asks a fictional AI assistant: 'Did every ancient Mesopotamian city use the same written laws?' The assistant replies confidently: 'Yes. Every city used a single law book written in 2000 BCE. Source: Ancient World Facts, page 999.' The answer provides no author, publisher, link or identifiable book.",
  "This answer is deliberately fictional and contains unsupported, misleading claims. Real Mesopotamian societies developed over different periods with different political arrangements and legal traditions. The Code of Hammurabi is associated with Babylon in the 18th century BCE and does not prove a single legal code applied everywhere.",
  "AI tools can help brainstorm, explain terms or revise writing, but fluent wording is not evidence of accuracy. A convincing-looking citation may be invented. Before submitting research, identify reliable sources, compare claims with them, and follow your teacher's expectations for acknowledging assistance."
 ],
 sections:[
  {title:"Investigate the claim",intro:"Identify what the AI response actually says, then separate evidence from confidence.",questions:[
   C("ai1","What is the most obvious problem with the citation 'Ancient World Facts, page 999'?",["It does not identify a traceable author, edition or publisher","It contains a page number","It uses a familiar-sounding title"],0,"A citation must point to a real, identifiable source."),
   C("ai2","Which is the safest conclusion about the assistant's confident tone?",["Confidence alone does not prove accuracy","A confident answer must be correct","The answer needs no outside verification"],0,"AI-generated explanations can contain errors despite sounding fluent."),
   T("ai3","Identify two specific claims in the fictional AI answer that you would need to verify. Explain why.",30,"Claim 1... Claim 2... I would check them because...")
  ]},
  {title:"Build a verification process",intro:"Use sources that can be checked independently, not just repeated statements.",questions:[
   O("ai4","Put these research steps in a logical order.",["Compare the claim with the source's actual content","Identify the exact claim and any citation","Locate a reputable, traceable source","Record a supported conclusion and uncertainty"],[1,2,0,3],"Identify, locate, compare and conclude."),
   C("ai5","Which source would usually be the best starting point for checking a claim about Hammurabi?",["A reputable museum, academic or historical reference with cited evidence","An anonymous screenshot repeating the claim","Another AI answer with no sources"],0,"Traceable expert sources can support a verifiable conclusion."),
   C("ai6","If two credible sources disagree, what should you do?",["Compare their evidence, dates and interpretations","Pick whichever answer is shorter","Hide the disagreement from your report"],0,"Disagreement is a reason for closer inquiry, not a reason to guess."),
   T("ai7","Write a three-step fact-checking checklist you could use before sharing an AI-generated historical claim.",41,"First... Next... Finally...")
  ]},
  {title:"Use digital tools responsibly",intro:"Explain how to benefit from a tool without presenting unchecked output as your own research.",questions:[
   C("ai8","Which practice best respects classroom expectations for independent work?",["Use AI as permitted, verify claims and acknowledge assistance when required","Submit the AI response without reading it","Invent a citation to match the answer"],0,"Responsible use means following class expectations and checking sources."),
   T("ai9","Rewrite the fictional assistant's answer more cautiously in 3–5 sentences. Explain what can be supported and what still needs verification.",49,"The available information suggests... A better source would..."),
   T("ai10","Write a short reflection explaining one useful role for AI in learning and one reason you must still think independently.",30,"AI can help by... I still need to...")
  ]}
 ]
}
);
})(window);