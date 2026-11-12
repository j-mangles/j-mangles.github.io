/* Computer Class · Pack 2: five additional investigation-based Grade 7/8 lessons.
   All reading passages and classroom scenarios are original teaching materials. */
(function(g){
"use strict";
const store=g.ComputerClassData;if(!store)return;
const C=(id,prompt,options,correct,why)=>({id,type:"choice",prompt,options,correct,why});
const T=(id,prompt,minWords=18,placeholder="Explain your thinking with specific evidence.")=>({id,type:"text",prompt,minWords,placeholder});
const N=(id,prompt,answer,why,tolerance=.005)=>({id,type:"number",prompt,answer,tolerance,unit:"",why});
const O=(id,prompt,items,correct,why)=>({id,type:"order",prompt,items,correct,why});
const L=(id,prompt,lab,minTrials=3)=>({id,type:"lab",prompt,lab,minTrials});
store.activities.push(
{
 id:"science-organelle-rescue",subject:"sci",subjectName:"Science",grade:"Grade 8",title:"Cell Rescue: Which Organelle?",time:"35–40 min",
 summary:"Investigate a struggling cell, connect structures to functions, and explain how organelles work together.",
 lesson:"../science/#cells",lessonText:"Explore a plant and animal cell",focus:"Cells & Systems · Organelles and cell functions",
 reading:[
  "CASE FILE — A living animal cell has stopped making enough proteins to repair itself. Its membrane is still intact, its nucleus still contains DNA, and it has nutrients available. One organelle is working much more slowly than usual.",
  "Cell structures are not interchangeable. The nucleus contains genetic instructions. Ribosomes build proteins from those instructions. The endoplasmic reticulum helps make and move proteins and lipids. The Golgi apparatus modifies, sorts and packages many substances. Mitochondria release usable energy from food during cellular respiration.",
  "Plant cells additionally have a rigid cell wall, chloroplasts that capture light for photosynthesis, and often a large central vacuole that helps maintain pressure. Plant and animal cells both contain membranes, a nucleus in most cells, and other shared organelles."
 ],
 sections:[
  {title:"Identify the problem",intro:"Use the case file to separate which organelle stores instructions from which makes proteins.",questions:[
   C("or1","Which structure directly assembles proteins?",["Mitochondrion","Ribosome","Cell membrane"],1,"Ribosomes assemble proteins using instructions provided by the cell."),
   C("or2","Which organelle contains most of a eukaryotic cell's DNA?",["Nucleus","Golgi apparatus","Vacuole"],0,"Most DNA in plant and animal cells is in the nucleus."),
   T("or3","Explain why a cell can have its DNA intact yet struggle to repair itself if ribosomes are not functioning.",28,"The nucleus still... But without functioning ribosomes...")
  ]},
  {title:"Follow the cell's workflow",intro:"Trace one simplified route for a protein destined for export.",questions:[
   O("or4","Put these events in a logical order for a secreted protein.",["The Golgi apparatus modifies and sorts it","A ribosome builds the protein","DNA instructions are copied into a usable message","The protein travels through the endoplasmic reticulum"],[2,1,3,0],"Information comes from DNA, ribosomes build the protein, and the ER and Golgi help process and transport it."),
   C("or5","Which structure regulates what enters and leaves the cell?",["Cell membrane","Nucleus","Cell wall"],0,"The selectively permeable membrane controls exchanges with the environment."),
   C("or6","Which is usually found in a plant cell but not a typical animal cell?",["Nucleus","Chloroplast","Mitochondrion"],1,"Chloroplasts are found in photosynthetic plant cells."),
   T("or7","Choose mitochondria and one other organelle. Explain how their jobs connect to keep the cell working.",30,"Mitochondria... This helps the ... because...")
  ]},
  {title:"Recommend a rescue",intro:"Use the organelle evidence to justify an action rather than choosing randomly.",questions:[
   C("or8","If the cell's main problem is a severe shortage of usable cellular energy, which organelle would you examine first?",["Chloroplast","Mitochondrion","Cell wall"],1,"Mitochondria release usable energy through cellular respiration."),
   T("or9","Write a conclusion for the case file: name the most relevant organelle for the protein shortage, give two supporting facts, and explain one limitation of your diagnosis.",48,"Claim: ... Evidence 1: ... Evidence 2: ... Limitation: ...")
  ]}
 ]
},
{
 id:"social-hammurabi-justice",subject:"ss",subjectName:"Social Studies",grade:"Grade 8",title:"Hammurabi's Code: Justice or Control?",time:"35–40 min",
 summary:"Interpret adapted legal scenarios, compare social positions, and evaluate fairness in ancient Babylon.",
 lesson:"../social-studies/",lessonText:"Review Ancient Mesopotamia",focus:"Mesopotamia · Government, law and social structure",
 reading:[
  "Hammurabi ruled Babylon in the 18th century BCE. A famous collection of written laws associated with him covers disputes about property, trade, labour, family and injury. The penalties often depended on a person's social position. A written law could make rules visible, but it did not guarantee equal rights.",
  "The following cases are MODERNIZED, FICTIONAL CLASSROOM SCENARIOS illustrating questions the laws raise; they are not quotations from the ancient text.",
  "Case A: A builder is paid to construct a storage building. The walls collapse because the builder used poor materials. Case B: A merchant argues that a customer broke an agreement about payment. Case C: Two people suffer similar injuries, but they have different standing in the community. A judge considers different consequences depending on status.",
  "As a historian, distinguish evidence of what a law prescribed from evidence of what people actually did. A law can show what leaders wanted society to value or control, without proving that every case was enforced in the same way."
 ],
 sections:[
  {title:"Understand the role of law",intro:"Start by interpreting why governments publish rules.",questions:[
   C("ha1","Which GRAPES category is most connected to written laws and kingship?",["Arts","Politics","Geography"],1,"Government, leadership and legal rules are parts of political organization."),
   C("ha2","Which conclusion about written laws is best supported?",["All citizens necessarily had equal rights","Rules were written down, but treatment could differ by status","No disagreements occurred once laws existed"],1,"Written rules do not automatically create equal treatment."),
   T("ha3","Give one possible advantage and one possible concern about publishing a written collection of laws.",24,"An advantage is... A concern is...")
  ]},
  {title:"Apply the scenarios",intro:"These situations are invented so you can reason about the underlying legal questions.",questions:[
   C("ha4","Which issue is most central to Case A?",["Responsibility for unsafe construction","Choice of crops to plant","Religious ceremonies"],0,"Case A asks who should be responsible if poor construction harms others."),
   C("ha5","Which issue is most central to Case B?",["Trade contracts and payment","Whether an army should march","The origin of rivers"],0,"Case B concerns agreements between merchants and customers."),
   T("ha6","Suggest a fair response to Case A, and explain whose interests your response protects.",30,"I would... This protects... because..."),
   T("ha7","Explain why the same injury receiving different penalties based on social standing raises questions about fairness.",30,"A person with lower status... This matters because...")
  ]},
  {title:"Think like a historian",intro:"Separate evidence, interpretation and judgment.",questions:[
   C("ha8","What can historians NOT safely conclude from a surviving law collection alone?",["What rules leaders recorded","What punishments the text describes","That every case was enforced exactly as written"],2,"The written law does not prove every real-world decision matched it."),
   T("ha9","Write a balanced 5–7 sentence judgment: did written laws make Babylon more organized, more fair, or both? Include one benefit, one limitation, and a reminder about what sources cannot prove.",60,"One benefit... However... The source shows... but cannot prove...")
  ]}
 ]
},
{
 id:"math-fraction-kitchen",subject:"math",subjectName:"Math 7",grade:"Grade 7",title:"Fraction Kitchen: Scale the Recipe",time:"35–40 min",
 summary:"Adjust servings, calculate fractions, convert to decimals, and explain equivalent ratios.",
 lesson:"../math/",lessonText:"Review fractions and mixed numbers",focus:"Fractions and Decimals · Multiplication, equivalent values and problem solving",
 reading:[
  "RECIPE CARD — A batch for 4 servings uses 1½ cups of flour, ¾ cup of milk, ½ cup of sugar and 2 eggs. To make a different number of servings, multiply every ingredient by the same scale factor.",
  "For this exercise, fractions should be treated as exact amounts and eggs may be fractional for the purposes of calculation, even though a real cook might beat an egg and measure part of it.",
  "Scale factor = new servings ÷ 4. Example: 8 servings has a scale factor of 2. That doubles every ingredient. A 50% increase has a factor of 1.5 instead."
 ],
 sections:[
  {title:"Explore the recipe",intro:"Adjust the serving count in the kitchen tool. Record at least three versions before answering.",questions:[
   L("fk0","Use the digital recipe scaler. Record three trials, including a smaller batch and a larger batch.","recipe",3),
   N("fk1","For 8 servings, how many cups of flour are needed? Enter the decimal number of cups.",3,"1.5 × (8 ÷ 4) = 3 cups."),
   N("fk2","For 2 servings, how many cups of milk are needed? Enter the decimal number.",.375,"0.75 × (2 ÷ 4) = 0.375 cups."),
   N("fk3","For 6 servings, how many cups of sugar are needed? Enter the decimal number.",.75,"0.5 × (6 ÷ 4) = 0.75 cups."),
   C("fk4","Which factor changes 4 servings into 10 servings?",["1.5","2.5","4"],1,"10 ÷ 4 = 2.5.")
  ]},
  {title:"Reason with fractions",intro:"Apply equivalent fractions and operations rather than guessing.",questions:[
   C("fk5","Which decimal equals ¾?",["0.34","0.75","1.25"],1,"Three quarters is 3 ÷ 4 = 0.75."),
   N("fk6","For 10 servings, how many eggs does the mathematical model need?",5,"2 × 2.5 = 5 eggs."),
   O("fk7","Put these steps in a logical order for scaling a recipe.",["Multiply each ingredient by the factor","Find the original serving size","Divide new servings by original servings","Check whether the answers are reasonable"],[1,2,0,3],"First identify the original recipe, find the scale factor, apply it, and verify."),
   T("fk8","Describe why multiplying only one ingredient does not produce a properly scaled version of the same recipe.",24,"The proportions need to ... because ...")
  ]},
  {title:"Explain a strategy",intro:"Choose a specific example and show the calculation.",questions:[
   T("fk9","Explain how you would scale ¾ cup of milk from 4 servings to 6. Give a fraction or decimal answer and show the factor.",35,"The scale factor is... Milk becomes... I checked...")
  ]}
 ]
},
{
 id:"ela-second-draft",subject:"ela",subjectName:"English Language Arts",grade:"Grade 8",title:"The Second Draft: Conflict & Revision",time:"35–45 min",
 summary:"Read an original story, track character change, and improve a weak paragraph using evidence.",
 lesson:"../ela/",lessonText:"Review short-story skills",focus:"Short Stories · Inference, character change and evidence",
 reading:[
  "THE SECOND DRAFT — Original short story",
  "Malik had rehearsed his speech three times before he heard the first comment. “That's not what the old bridge looked like,” someone whispered from the back row. He stared at the photograph on his slide. He had spent the previous night choosing it because it was dramatic, not because he had checked the date.",
  "After class, his friend Iris showed him a photograph from the local archive. It was smaller and blurrier, but the caption included the year and the name of the photographer. Malik had used an image from a different town.",
  "“Nobody else noticed,” Malik said. He wanted to believe that. They had already signed up to present at the assembly, and he hated the thought of starting over.",
  "Iris closed her laptop. “You can still make it better,” she said. “But not by pretending the first version was right.”",
  "At home, Malik rebuilt his opening. He kept the parts of his speech he could verify and replaced the dramatic photograph with the archive picture. At the assembly, he began by explaining the correction. For a second, he could hear his voice shake. Then the next slide appeared, and he felt ready to continue."
 ],
 sections:[
  {title:"Interpret the character",intro:"Look beyond what Malik does and think about his changing motivation.",questions:[
   C("sd1","What is Malik's main internal conflict?",["Choosing between hiding an error and correcting it","Whether the bridge is open for traffic","Trying to learn how to use a laptop"],0,"Malik is tempted to hide a mistake but also wants his work to be accurate."),
   C("sd2","What best describes Iris's role in the story?",["She invents the false photograph","She gives Malik accurate evidence and challenges his thinking","She cancels the assembly"],1,"Iris provides evidence and encourages Malik to revise."),
   T("sd3","Identify a sentence or detail that reveals Malik's fear of admitting the mistake. Explain what it suggests.",26,"One detail is... This suggests...")
  ]},
  {title:"Trace cause and effect",intro:"Notice how a small research choice becomes a larger decision.",questions:[
   O("sd4","Put the events in the order they happen.",["Malik presents the corrected version","Malik selects a dramatic but unverified photo","Iris shows Malik an archival photograph","Malik rewrites his opening"],[1,2,3,0],"The unverified choice leads to the correction, revised work and new presentation."),
   C("sd5","Which is the story's turning point?",["Malik begins revising instead of hiding the mistake","Iris shuts her laptop","Malik first practises a speech"],0,"The choice to correct his work changes the direction of the conflict."),
   T("sd6","Compare Malik at the beginning and the end. What changes, and what evidence supports it?",33,"At first he... Later he... The evidence is...")
  ]},
  {title:"Revise the writing",intro:"Improve the weak paragraph rather than simply declaring it wrong.",questions:[
   C("sd7","Which sentence makes the strongest evidence-based claim?",["Malik is good and his speech is nice.","The archive picture is smaller.","Malik demonstrates responsibility when he replaces an unverified image and explains his correction."],2,"The sentence states a trait and supports it with two specific actions."),
   T("sd8","Revise this weak paragraph: 'Malik changed. He made a new slide. This was good.' Write 4–6 stronger sentences using an answer, specific evidence and explanation.",52,"Malik changes from... When the text states... This matters because..."),
   T("sd9","Explain one strategy you could use to check sources when creating your own presentation.",20,"Before using a picture or fact, I would...")
  ]}
 ]
},
{
 id:"thinking-misinformation",subject:"ct",subjectName:"Critical Thinking",grade:"Grade 7/8",title:"The Viral Claim: Check Before Sharing",time:"40–45 min",
 summary:"Evaluate a viral post, compare source quality, and revise a claim using available evidence.",
 lesson:"../critical-thinking/",lessonText:"Explore critical thinking lessons",focus:"Evidence, source reliability and responsible reasoning",
 reading:[
  "CLASSROOM CASE — A student sees a viral post claiming, 'The school will replace all library books with tablets next month!' The post includes no named author, date or link to an official announcement. Several classmates repeat it.",
  "Source A is an anonymous social-media screenshot. Source B is a current school newsletter saying the library is piloting a few tablets for research projects while keeping its existing print collection. Source C is a comment from a student who says, 'My friend heard the library might get new devices.'",
  "Three words matter: claim (what someone says is true), evidence (what can support or challenge it), and uncertainty (what you still do not know). Good reasoning does not mean distrusting everything; it means updating your belief when stronger evidence appears."
 ],
 sections:[
  {title:"Sort the sources",intro:"Consider authorship, direct evidence and how closely each source addresses the exact claim.",questions:[
   C("vc1","Which is the strongest evidence about the school's actual plan?",["An undated anonymous screenshot","The current official school newsletter","A third-hand comment"],1,"A current official statement directly addresses the planned pilot."),
   C("vc2","Which claim is supported by the provided newsletter?",["All printed books will be removed","A few tablets are being tested for research","No devices will ever be used"],1,"The newsletter describes a limited pilot while keeping books."),
   T("vc3","Identify two reasons the original viral post is difficult to verify.",25,"It does not identify... It also...")
  ]},
  {title:"Update the conclusion",intro:"Do not claim more certainty than the evidence supports.",questions:[
   C("vc4","What is the best response to the original post?",["Share it quickly to warn everyone","State that a limited pilot is reported, but the replacement claim is unsupported","Claim the newsletter proves tablets are bad"],1,"The appropriate claim matches the evidence without overstating it."),
   O("vc5","Put these actions in an effective verification order.",["Tell others what the verified information actually says","Identify the exact claim being made","Seek a direct, relevant source","Compare the source with the claim"],[1,2,3,0],"Specify the claim, find direct evidence, compare and communicate accurately."),
   T("vc6","Write a responsible reply to the viral claim in 2–4 sentences. Include what is known and what remains uncertain.",34,"The current newsletter says... This does not confirm..."),
   C("vc7","Why is popularity not the same as evidence?",["Many shares can repeat the same unverified claim","Shares automatically make an official announcement","Popular posts always include original sources"],0,"Repeating a claim does not create independent verification.")
  ]},
  {title:"Reflect on decisions",intro:"Think about what you would do before sharing an alarming claim.",questions:[
   T("vc8","Give a real-life example of when checking the source could prevent a misunderstanding. Do not share private information about classmates.",28,"For example... I would check..."),
   T("vc9","Write a three-step personal checklist for evaluating online claims, explaining why each step matters.",45,"First... Second... Third..."),
   L("vc10","Use the Source Verification Board to record three different source-check profiles. Include one source with no checks met and one with all three.","sources",3),
   T("vc11","Explain why a source can pass several verification checks without proving that its claim is true.",25,"A named and dated source can still... We also need...")
  ]}
 ]
}
);
})(window);