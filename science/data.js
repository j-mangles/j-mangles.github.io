window.HUB = {
  subject: "sci",
  units: [
  {
    id:"skills", n:"0", name:"Science Skills", status:"done", when:"September",
    intro:"How scientists think and work: telling observations from inferences, asking testable questions, running fair tests, graphing data and measuring in SI units.",
    lessons:[
      {id:"obs", n:"1", title:"Observation vs. Inference",
       big:"An observation is what you notice with your senses. An inference is your best explanation for it. Good scientists keep the two apart.",
       notes:[
         "An observation is something you can see, hear, smell, touch or measure right now. Example: the sidewalk is wet.",
         "An inference is a conclusion you reach by thinking about your observations. Example: it rained overnight.",
         "An inference can be wrong even when the observations are right. The sidewalk might be wet because someone watered the lawn.",
         "A good inference is backed by evidence, and you should be able to point to the observations that support it.",
         "In the Scientific Detective case files, glass lying outside a broken window suggests it was broken from inside. That's an inference supported by where the glass landed."
       ],
       terms:[["Observation","Information you collect with your senses or a measuring tool."],["Inference","An explanation or conclusion based on observations."],["Evidence","The observations that support an inference."]],
       work:"Observation vs. Inference handout: Part 1 (sort O or I) and Part 2 (Scientific Detective case files).",
       check:[
         {q:"\"Mia is wearing a bandage on her ankle.\" Observation or inference?", a:["Observation","Inference"], c:0, why:"You can see the bandage."},
         {q:"\"Mia sprained her ankle playing soccer.\" Observation or inference?", a:["Observation","Inference"], c:1, why:"It's an explanation. You didn't see it happen."},
         {q:"The smoke detector beeps every 30 seconds. Which is an inference?", a:["It's beeping every 30 seconds","Its battery is running low","It's on the ceiling"], c:1, why:"That's a likely explanation, not something you directly observed."}
       ]},
      {id:"what", n:"2", title:"What Is Science?",
       big:"Science is knowledge built by asking testable questions and checking the answers with evidence.",
       notes:[
         "The word science comes from the Latin scientia, which means knowledge.",
         "A scientific question is testable: you could run a test or take measurements to answer it. \"Does chewing gum help you concentrate?\" is testable.",
         "Questions about values or beliefs aren't scientific. \"Should students get more recess?\" and \"Is it wrong to eat meat?\" can't be settled by a test.",
         "A hypothesis is a testable prediction written as If… then… because… Example: If water is warmer, then sugar will dissolve faster, because heat makes water molecules move faster.",
         "Pseudoscience looks scientific but skips the testing, like a bracelet that claims to \"balance your energy\" with no test ever described.",
         "A legit question can still be tested badly. Three people \"feeling better\" with a magnet bracelet isn't a fair test: no control group, and no way to rule out the placebo effect."
       ],
       terms:[["Testable question","A question you can answer by experimenting or measuring."],["Hypothesis","A prediction in the form If… then… because…"],["Pseudoscience","Claims made to look scientific without real testing."],["Placebo effect","Feeling better because you expect to, not because the treatment worked."]],
       work:"Unit 0 booklet, Class 1 pages: Scientific or Not, hypothesis practice, and Science vs. Pseudoscience.",
       check:[
         {q:"Which question is scientific?", a:["Do ghosts exist?","Does a car's colour affect how hot it gets in the sun?","What is the meaning of life?"], c:1, why:"You can test it by measuring the temperature of different-coloured cars."},
         {q:"Which is written as a proper hypothesis?", a:["Sugar dissolves.","If water is warmer, then sugar will dissolve faster, because the molecules move faster.","I think warm water is better."], c:1, why:"It has the If… then… because… parts."},
         {q:"An ad says a bracelet balances your energy. No test is described. This is…", a:["Science","Pseudoscience"], c:1, why:"There's no testing and the claim can't be checked."}
       ]},
      {id:"fair", n:"3", title:"Designing a Fair Test",
       big:"In a fair test you change one thing, measure one thing, and keep everything else the same.",
       notes:[
         "The independent variable (IV) is the one thing you change on purpose.",
         "The dependent variable (DV) is what you measure to see what happened.",
         "Controlled variables (CVs) are everything you keep the same so the test stays fair.",
         "An uncontrolled variable (UCV) is something that could affect the results but you can't fully control, like natural differences between people.",
         "Example: ice cubes melting in the fridge, at room temperature and in the sun. IV is the location, DV is the time to melt, and CVs include the size of the cube and its starting temperature."
       ],
       terms:[["Independent variable (IV)","What you change on purpose."],["Dependent variable (DV)","What you measure."],["Controlled variable (CV)","What you keep the same."],["Uncontrolled variable (UCV)","Something that affects results but can't be fully controlled."]],
       work:"Unit 0 booklet, Class 2: Identify the Variables, and the Hair Spray Investigation.",
       check:[
         {q:"Rose bushes get different amounts of fertilizer, and flowers are counted after two months. What's the IV?", a:["Number of flowers","Amount of fertilizer","Two months"], c:1, why:"That's what was changed on purpose."},
         {q:"In the same test, what's the DV?", a:["Number of flowers","Type of rose bush","Amount of water"], c:0, why:"That's what was measured."},
         {q:"Why keep controlled variables the same?", a:["To make the test faster","So only the IV can explain the results","Because the teacher said so"], c:1, why:"If two things change at once, you can't tell which one caused the result."}
       ]},
      {id:"graph", n:"4", title:"Data and Graphing",
       big:"A good graph has a title, labelled axes with units and an even scale, and the right type for the data.",
       notes:[
         "The title should name both variables, for example \"Number of Buses Manufactured by Month.\"",
         "The IV goes on the x-axis (across). The DV goes on the y-axis (up).",
         "Each axis gets one label, with units if there are any.",
         "Use an even, consistent scale, like steps of 25 or 50.",
         "Use a line graph to show change over a continuous span, like a population over several years.",
         "Use a bar graph to compare separate categories, like four different liquids."
       ],
       terms:[["x-axis","The horizontal axis, for the independent variable."],["y-axis","The vertical axis, for the dependent variable."],["Scale","The evenly spaced numbers along an axis."]],
       work:"Unit 0 booklet, Class 3: Spot the Mistakes, Build Your Own Graph (black spruce), and Choosing a Graph Type. Also the Graphing Practice sheet.",
       check:[
         {q:"Which axis gets the dependent variable?", a:["x-axis","y-axis"], c:1, why:"The DV goes up the side."},
         {q:"Time for four different liquids to flow down a ramp. Which graph?", a:["Line graph","Bar graph"], c:1, why:"You're comparing separate categories."},
         {q:"Black spruce population over several years. Which graph?", a:["Line graph","Bar graph"], c:0, why:"It's a trend over a continuous span of time."}
       ]},
      {id:"si", n:"5", title:"Measurement and SI Units",
       big:"Scientists measure with the metric (SI) system, and converting is just moving the decimal by powers of 10.",
       notes:[
         "Mass is measured with a balance, in grams (g) or kilograms (kg).",
         "Liquid volume is measured with a graduated cylinder, in millilitres (mL) or litres (L).",
         "Length is measured with a ruler or measuring tape, in mm, cm, m or km.",
         "Time is measured with a stopwatch, in seconds (s) or minutes (min).",
         "kilo = 1000, centi = 1/100, milli = 1/1000. So 1 km = 1000 m, 1 m = 100 cm, 1 m = 1000 mm, 1 L = 1000 mL.",
         "1 cm³ = 1 mL."
       ],
       table:{title:"Conversion examples", head:["Start","Answer"], rows:[["3.0 m","300 cm"],["2 463 g","2.463 kg"],["0.4 km","40 000 cm"],["480 mL","0.48 L"],["10 cm³","10 mL"],["3 min","180 s"]]},
       terms:[["SI units","The international metric system scientists use."],["Kilo-","A thousand times bigger."],["Milli-","A thousand times smaller."]],
       work:"Unit 0 booklet, Class 4: Which Tool and Unit, and the 12 unit conversions. Practise with the converter on the Science Skills page.",
       check:[
         {q:"2 L = ? mL", a:["20 mL","200 mL","2 000 mL"], c:2, why:"1 L = 1000 mL."},
         {q:"35 m = ? km", a:["0.035 km","3.5 km","35 000 km"], c:0, why:"Going to a bigger unit, divide by 1000."},
         {q:"What tool measures the volume of water in a beaker?", a:["Balance","Graduated cylinder","Stopwatch"], c:1, why:"Volume of a liquid is read from a graduated cylinder."}
       ]},
      {id:"mini", n:"6", title:"Mini Investigation: Dissolving Sugar",
       big:"Put the whole method together: a testable question, a hypothesis, a fair procedure, real data and a conclusion based on it.",
       notes:[
         "Question: does water temperature affect how fast sugar dissolves?",
         "IV is the water temperature. DV is the time for the sugar to fully dissolve, in seconds.",
         "Controlled variables: the amount of sugar, the amount of water, how you stir, and the cup.",
         "Uncontrolled variables: exact room temperature, tiny differences in cube size, your reaction time on the stopwatch.",
         "Expected result: the warmer the water, the faster the sugar dissolves.",
         "If your data doesn't match, that's not automatically wrong. Explain what in your procedure might have gone differently."
       ],
       work:"Unit 0 booklet, Class 5: Mini Investigation write-up.",
       check:[
         {q:"What's the DV in this investigation?", a:["Water temperature","Time for the sugar to dissolve","Amount of sugar"], c:1, why:"It's what you measure."},
         {q:"Which step keeps the test fair?", a:["Stir every cup the same way","Use a different cup each time","Use more sugar in hot water"], c:0, why:"Stirring is a controlled variable."},
         {q:"Your data doesn't match your hypothesis. What do you do?", a:["Change the data","Explain what might have happened in your procedure","Start a new topic"], c:1, why:"Report real data and think about why."}
       ]}
    ]
  },
  {
    id:"cells", n:"1", name:"Cells and Systems", status:"now", when:"Late September to November",
    intro:"Every living thing is made of cells. We start with what cells are and what's inside them, then build up to tissues, organs and the body's systems.",
    after:"Practise the parts of the cell on this page. Diagram: click any part to see what it does, or use Label it to practise the plant and animal cell labelling worksheets. Part & Role: match each organelle to its job. Game: Organelle Rush, 60 seconds to name as many organelles from their clues as you can.",
    lessons:[
      {id:"theory", n:"1", title:"Cell Theory and Cell Size",
       imgs:[{src:"img/hooke.jpg",cap:"A modern portrait of Robert Hooke. No portrait of him from his own lifetime survives. Image from the lesson slides."},
             {src:"img/scale.jpg",cap:"Relative sizes, from atoms to an adult human, on a scale where each step is 10 times bigger. Image from the lesson slides."}],
       big:"All living things are made of cells, and cells only come from other cells.",
       notes:[
         "In 1665, Robert Hooke looked at a thin slice of cork under a microscope and saw tiny box-like spaces. He called them cellulae, Latin for \"small rooms.\"",
         "Cell theory has four points: 1) all living things are made of one or more cells; 2) cells are the basic units of structure and function in all organisms; 3) all cells come from pre-existing cells; 4) an organism's activity depends on the total activity of its cells.",
         "Cell sizes vary. Many bacteria are about 0.1–5 μm across, while typical plant and animal cells are about 10–100 μm across. 1 cm = 10 000 μm.",
         "Anything too small to see without a microscope is microscopic. Our eyes can't tell two things apart once they're closer than about 100 μm.",
         "Magnification = image size ÷ actual size, using the same units for both. A measurement-based example needs the actual size of the specimen; there is no one fixed denominator for every cell.",
         "Unicellular organisms are one cell, like bacteria and yeast. Multicellular organisms are many cells, like animals, plants and most fungi."
       ],
       table:{title:"One cell or many?", head:["Group","Unicellular or multicellular","Examples"], rows:[["Animals","All multicellular","humans, insects, fish"],["Plants","All multicellular","trees, grasses, mosses"],["Fungi","Most multicellular, some unicellular","mushrooms, mould; yeast"],["Bacteria","All unicellular","E. coli, Streptococcus"]]},
       terms:[["Cell","The smallest unit that can perform the functions of life."],["Biology","The science of living things."],["Microscopic","Too small to see without a microscope."],["Micrometre (μm)","One millionth of a metre."]],
       work:"Cells booklet, Topic 1: Cell Theory and Cell Size. Also the Cell Theory and Scale practice sheet.",
       check:[
         {q:"Where do new cells come from?", a:["Non-living material","Pre-existing cells","The air"], c:1, why:"That's point 3 of cell theory."},
         {q:"Which group is ALWAYS unicellular?", a:["Plants","Fungi","Bacteria"], c:2, why:"All bacteria are single cells."},
         {q:"What did Hooke actually look at?", a:["Cork","Blood","Pond water"], c:0, why:"He saw the empty \"small rooms\" in cork."}
       ]},
      {id:"plant", n:"2", title:"Plant Cells and Their Organelles",
       big:"A cell is like a factory with specialized parts. Plant cells have nine major organelles, including two animal cells don't have.",
       notes:[
         "Organelles are the specialized parts inside a cell, and each has a job.",
         "Plant cells have nine: cell wall, cell membrane, vacuole, nucleus, chloroplast, mitochondria, endoplasmic reticulum, Golgi apparatus and cytoplasm.",
         "Cell wall: a thick, rigid wall that gives support so the plant can stay upright. Plant cell walls are made of cellulose. Fungi have cell walls too, made of chitin.",
         "Chloroplast: where photosynthesis happens, turning sunlight energy into chemical energy. Chloroplasts contain the green pigment chlorophyll.",
         "Plant cells usually have one large vacuole that also helps hold the cell's shape.",
         "Photosynthesis only works well with enough light, water and carbon dioxide."
       ],
       terms:[["Organelle","A specialized part of a cell with its own job."],["Cell wall","Rigid outer layer that supports plant (and fungus) cells."],["Chloroplast","Where photosynthesis happens."],["Chlorophyll","The green pigment inside chloroplasts."]],
       work:"Cells booklet, Topic 1: label the plant cell diagram. Also the Plant Organelles practice sheet.",
       check:[
         {q:"Which two organelles are in plant cells but not animal cells?", a:["Nucleus and vacuole","Cell wall and chloroplast","Mitochondria and Golgi"], c:1, why:"Those are the plant-only pair."},
         {q:"What are plant cell walls made of?", a:["Chitin","Cellulose","Protein"], c:1, why:"Fungi walls are chitin; plant walls are cellulose."},
         {q:"Why do plants need cell walls?", a:["To move around","To stay upright and supported","To make food"], c:1, why:"Plants don't move, so they need rigid support."}
       ]},
      {id:"animal", n:"3", title:"Animal Cells and Their Organelles",
       big:"Animal cells have seven major organelles, each with a job that keeps the cell alive.",
       notes:[
         "Cell membrane: thin, flexible layer that controls what moves in and out.",
         "Cytoplasm: jelly-like fluid, mostly water, between the membrane and the nucleus. Older diagrams may call it cytosol.",
         "Nucleus: the control centre. It contains DNA, the instructions for everything the cell does, and has its own membrane called the nuclear envelope.",
         "Mitochondria: the \"powerhouse\". They turn sugar into usable energy, and need oxygen and nutrients to do it.",
         "Endoplasmic reticulum (ER): folded membranes next to the nucleus that build proteins and move materials.",
         "Golgi apparatus: the \"post office\" that packs and ships materials. Tip: the ER touches the nucleus; the Golgi sits on its own.",
         "Vacuoles: storage for water, nutrients and wastes. Animal cells have many small ones."
       ],
       terms:[["Nucleus","Control centre; holds the DNA."],["Mitochondria","Turn sugar into usable energy."],["Golgi apparatus","Packages and ships materials."],["Endoplasmic reticulum","Folded membranes that build proteins and move materials."],["Cytoplasm","Jelly-like fluid that fills the cell."]],
       work:"Cells booklet, Topic 1: label the animal cell diagram. Also the Animal Organelles practice sheet.",
       check:[
         {q:"Which organelle is the cell's \"powerhouse\"?", a:["Nucleus","Mitochondria","Vacuole"], c:1, why:"Mitochondria turn sugar into usable energy."},
         {q:"How can you tell the ER from the Golgi in a diagram?", a:["The ER is connected to the nucleus","The Golgi is always green","They're the same thing"], c:0, why:"The Golgi sits on its own."},
         {q:"Where is the cell's DNA kept?", a:["Cell membrane","Nucleus","Cytoplasm"], c:1, why:"The nucleus is the control centre."}
       ]},
      {id:"transport", n:"4", title:"The Cell Membrane and Transport",
        activity:{
          title:"Membrane Lab investigation: predict, observe, explain",
          context:"Use the Osmosis tab in the Membrane Lab above. Start with more dissolved solute outside than inside. Make a prediction BEFORE running the model. Then observe and explain the overall movement of water.",
          prompts:[
            {label:"Prediction: What will happen to water overall, and why?",hint:"Use water, solute and concentration.",rows:3},
            {label:"Test: What settings did you use, and what did the model show?",hint:"Record the relative solute amounts on each side. This is a simplified model, not a real-cell measurement.",rows:4},
            {label:"Explanation: Why does osmosis cause that net movement?",hint:"Explain water movement across a selectively permeable membrane.",rows:4},
            {label:"Reflection: Was your prediction supported? What would you test next?",rows:3}
          ],
          checklist:["I predicted before observing.","I recorded the settings and results.","I explained the result using scientific vocabulary."]
        },
       imgs:[{src:"img/transport.jpg",cap:"Simple diffusion, facilitated diffusion through proteins, and active transport using ATP. Image from the lesson slides."},
             {src:"img/osmosis.jpg",cap:"Osmosis: water moves across the membrane toward the side with more dissolved solute. Image from the lesson slides."}],
       big:"The cell membrane is selectively permeable. It lets some things through and keeps others out.",
       notes:[
         "Permeability depends on the substance. A permeable barrier lets that substance through, while an impermeable barrier blocks it. A selectively permeable membrane lets some substances cross but not others.",
         "The membrane is mostly phospholipids arranged in two rows: water-loving heads face out, water-fearing tails face in.",
         "Passive transport needs no energy. Simple diffusion moves molecules from high concentration to low.",
         "Facilitated diffusion also goes high to low, but through a special transport protein.",
         "Osmosis is water moving from low solute concentration to high solute concentration. It's the water that moves, not the solute.",
         "Active transport uses energy (ATP) to push substances from low concentration to high, against the gradient."
       ],
       terms:[["Selectively permeable","Lets only some substances through."],["Diffusion","Movement from high to low concentration."],["Osmosis","Diffusion of water across a membrane."],["Active transport","Using energy to move substances from low to high concentration."],["ATP","The cell's usable energy, made by mitochondria."]],
       work:"Cells booklet, Topic 2: Permeability, Membrane Structure and Transport questions.",
       check:[
         {q:"Which type of transport needs energy?", a:["Simple diffusion","Osmosis","Active transport"], c:2, why:"It moves things against the gradient using ATP."},
         {q:"In osmosis, what moves across the membrane?", a:["Water","Salt","Sugar"], c:0, why:"Osmosis is specifically about water."},
         {q:"A coffee filter is…", a:["Permeable","Impermeable","Selectively permeable"], c:2, why:"Water gets through, coffee grounds don't."}
       ]},
      {id:"metabolism", n:"5", title:"Cellular Metabolism",
       charts:[{title:"How well three digestive enzymes work at different pH levels",
         x:{label:"pH  (lower = more acidic, 7 = neutral, higher = more basic)",short:"pH",min:0,max:12,step:1,snap:0.1},
         y:{label:"Enzyme activity (% of best)",min:0,max:100,step:25,unit:"%"},
         start:2,
         series:[{name:"Pepsin (stomach)",fn:x=>100*Math.exp(-Math.pow(x-2,2)/(2*0.89*0.89))},
                 {name:"Amylase (saliva)",fn:x=>100*Math.exp(-Math.pow(x-7,2)/(2*1.0*1.0)),dash:"9 6"},
                 {name:"Trypsin (small intestine)",fn:x=>100*Math.exp(-Math.pow(x-8.3,2)/(2*0.95*0.95)),dash:"2 6"}],
         note:"Drag across the graph to change the pH. Tap an enzyme's name to hide or show its line."}],
       big:"Cells change energy from one form to another. Photosynthesis and cellular respiration are mirror images of each other.",
       notes:[
         "Metabolism is all the chemical reactions inside an organism.",
         "Cellular respiration happens in the mitochondria of nearly all living things. It turns sugar and oxygen into usable energy (ATP), plus carbon dioxide and water.",
         "Photosynthesis happens in the chloroplasts of plants. It turns sunlight, carbon dioxide and water into sugar and oxygen.",
         "The inputs of one are the outputs of the other.",
         "Enzymes are proteins that speed up reactions. Each works best in a narrow pH range.",
         "Pepsin works best around pH 2 (stomach), amylase around pH 7 (saliva) and trypsin around pH 8. Amylase stops working once it reaches the acidic stomach."
       ],
       table:{title:"Inputs and outputs", head:["Process","Where","Inputs","Outputs"], rows:[["Cellular respiration","Mitochondria","Oxygen, sugar","Carbon dioxide, water, usable energy (ATP)"],["Photosynthesis","Chloroplast","Carbon dioxide, water, sunlight","Oxygen, sugar"]]},
       terms:[["Metabolism","All the chemical reactions in an organism."],["Cellular respiration","Turning sugar into usable energy."],["Photosynthesis","Turning sunlight into chemical energy."],["Enzyme","A protein that speeds up chemical reactions."],["pH","How acidic or basic something is."]],
       work:"Cells booklet, Topic 2: Cellular Metabolism and the pH graph questions.",
       check:[
         {q:"Use the graph. Which enzyme works best in a very acidic place like the stomach (pH 2)?", a:["Pepsin","Amylase","Trypsin"], c:0, why:"Pepsin peaks at pH 2. The other two barely work there."},
         {q:"Where does cellular respiration happen?", a:["Chloroplast","Mitochondria","Nucleus"], c:1, why:"The powerhouse of the cell."},
         {q:"Which is an OUTPUT of photosynthesis?", a:["Carbon dioxide","Oxygen","Water"], c:1, why:"Plants release oxygen."},
         {q:"Your stomach is about pH 2. Which enzyme works well there?", a:["Pepsin","Amylase","Trypsin"], c:0, why:"Pepsin's best pH is about 2."}
       ]},
      {id:"reproduction", n:"6", title:"Cell Division and Cancer",
       imgs:[{src:"img/onion-dividing.jpg",cap:"Onion root cells dividing. The dark threads are copies of DNA being separated into two new cells. Image from the lesson slides."},
             {src:"img/cancer-cells.jpg",cap:"Two cancer cells that have just finished dividing (electron microscope, colour added). Image from the lesson slides."},
             {src:"img/radium.jpg",cap:"Left: dial painters at a U.S. radium factory, about 1922. Right: a 1921 ad for \"Undark\" radium paint. Image from the lesson slides."}],
       big:"Cells make new cells by copying their DNA and splitting in two. When division gets out of control, that's cancer.",
       notes:[
         "Cells divide to replace cells that die, heal wounds and help an organism grow.",
         "Cancer is a disease where abnormal cells divide out of control and can spread to other parts of the body.",
         "Carcinogens are things that damage DNA and raise the risk of cancer, like tobacco smoke, UV light, asbestos and radon gas.",
         "Chemotherapy uses medicines to kill cancer cells. Radiation therapy uses high-energy particles. Radiation is itself a carcinogen, so it carries risk.",
         "Case study: Marie and Pierre Curie discovered radium in 1898. It was later put in household products and fake medicines, and it hurt people, including young women who painted glowing watch dials.",
         "Companies selling harmful products have often denied the science, dodged responsibility, attacked scientists and hired their own \"experts.\""
       ],
       terms:[["Cell division","A cell copying its DNA and splitting into two identical cells."],["Cancer","Abnormal cells dividing out of control."],["Carcinogen","Something that increases the risk of cancer."],["Chemotherapy","Medicines used to kill cancer cells."]],
       work:"Cells booklet, Topic 3: Cell Division, carcinogens list and the Radium case study.",
       check:[
         {q:"Which is NOT a reason cells divide?", a:["Heal wounds","Help an organism grow","Make the cell bigger forever"], c:2, why:"Division makes new cells; it doesn't make one cell huge."},
         {q:"What is a carcinogen?", a:["A cancer medicine","Something that raises the risk of cancer","A type of cell"], c:1, why:"It damages DNA."},
         {q:"Who discovered radium?", a:["Robert Hooke","Marie and Pierre Curie","Leonard Woolley"], c:1, why:"In 1898."}
       ]},
      {id:"specialized", n:"7", title:"Specialized Cells and Stem Cells",
       imgs:[{src:"img/specialized.jpg",cap:"Specialized cells: cheek (epithelial), blood, muscle and nerve cells. Images from the lesson slides."},
             {src:"img/yew.jpg",cap:"Bark being stripped from a Pacific yew. Paclitaxel (taxol) was first made from this bark. Image from the lesson slides."},
             {src:"img/stem-cells.jpg",cap:"A colony of human embryonic stem cells (the dense patch) growing in a lab dish. Image from the lesson slides."}],
       big:"In a multicellular body, cells specialize for different jobs. Stem cells are the ones that haven't specialized yet.",
       notes:[
         "Cell differentiation is how cells become specialized. Muscle cells move the body; skin cells protect it; nerve cells send electrical signals; red blood cells carry oxygen; white blood cells fight infection.",
         "Multicellular life can live in more environments, specialize cells for different jobs and grow larger. Some unicellular organisms survive extreme places, like hot springs.",
         "Plants make primary products (in all cells, needed to survive, like DNA and sugars) and secondary products (in some cells, for special jobs like defence).",
         "Pacific yew: Indigenous peoples in western North America used its bark for generations, and the Tsimshian people used it to treat tumours. Western scientists didn't recognize its anti-cancer effect until 1962. Its secondary product, paclitaxel, is still used for breast and ovarian cancer.",
         "Embryonic stem cells can become any kind of cell. Tissue-specific stem cells can only become certain kinds, like blood stem cells becoming blood."
       ],
       terms:[["Specialized cell","A cell built for a particular job."],["Differentiation","The process of cells becoming specialized."],["Secondary product","A substance made in only some cells for a special purpose."],["Stem cell","A cell that hasn't specialized yet."]],
       work:"Cells booklet, Topic 4: Specialized Cells, Pacific Yew case study and Stem Cells video questions. Then the Cells Review.",
       check:[
         {q:"What does differentiation mean?", a:["Cells dying","Cells becoming specialized","Cells dividing"], c:1, why:"Cells take on specific jobs."},
         {q:"Which kind of stem cell can become ANY type of cell?", a:["Embryonic","Tissue-specific"], c:0, why:"Tissue-specific stem cells are limited."},
         {q:"Who used Pacific yew bark as medicine long before 1962?", a:["Indigenous peoples of western North America","The Curies","Robert Hooke"], c:0, why:"Including the Tsimshian people for tumours."}
       ]},
      {id:"levels", n:"8", title:"Levels of Organization",
       imgs:[{src:"img/levels.jpg",cap:"The five levels: cell, tissue, organ, organ system, organism. Image from the lesson slides."},
             {src:"img/tissues.jpg",cap:"The four tissue types in the body. OpenStax Anatomy and Physiology, CC BY."},
             {src:"img/organs.jpg",cap:"Three organs: lungs, liver and heart. NIAID NIH BioArt, public domain."}],
       big:"Living things are organized in levels, from cells to tissues to organs to organ systems to a whole organism.",
       notes:[
         "Cell: the smallest unit that can perform the functions of life.",
         "Tissue: many specialized cells working together. Only multicellular organisms have tissues.",
         "Organ: a structure made of tissues working together, like the lungs (swap oxygen and carbon dioxide), the liver (filters blood, makes bile) and the heart (pumps blood).",
         "Organ system: organs working together. The body has 12 major systems: circulatory, digestive, endocrine, immune, integumentary, lymphatic, muscular, nervous, reproductive, respiratory, skeletal and urinary.",
         "Organism: an individual living thing.",
         "Homeostasis: all the systems work to keep conditions inside your body stable, like temperature, water and blood sugar."
       ],
       terms:[["Tissue","Cells working together for one purpose."],["Organ","Tissues working together for one function."],["Organ system","Organs working together."],["Homeostasis","Keeping conditions inside the body stable."]],
       work:"Systems booklet, Topic 5: Levels of Biological Organization.",
       check:[
         {q:"Put these in order, smallest first:", a:["Organ, tissue, cell","Cell, tissue, organ","Tissue, cell, organ"], c:1, why:"Cells make tissues; tissues make organs."},
         {q:"What is homeostasis?", a:["Keeping conditions inside the body stable","Growing taller","Fighting infection"], c:0, why:"Like holding your temperature steady."},
         {q:"Which organ pumps blood?", a:["Liver","Lungs","Heart"], c:2, why:"The heart is the pump."}
       ]},
      {id:"systems", n:"9", title:"Systems of the Human Body",
       imgs:[{src:"img/digestive.jpg",cap:"The digestive system. Mariana Ruiz (LadyofHats), public domain."},
             {src:"img/skin.jpg",cap:"A slice through human skin. Don Bliss, National Cancer Institute, public domain."},
             {src:"img/nervous.jpg",cap:"The central and peripheral nervous system. OpenStax, CC BY."},
             {src:"img/respiratory.jpg",cap:"The respiratory system. Public domain, Wikimedia Commons."}],
       big:"Each body system has a job, and the major organs in it carry that job out.",
       notes:[
         "Digestive system breaks food into nutrients to absorb. Mouth, esophagus, stomach (breaks food down with acid and muscle), liver (bile), small intestine (most absorption), large intestine (some absorption, passes solid waste).",
         "Integumentary system is your hair, skin and nails. It protects you and helps control temperature. Skin is the largest organ.",
         "Nervous system sends electrical signals between the brain and body. The brain and spinal cord are the central nervous system; the nerves everywhere else are the peripheral nervous system.",
         "Respiratory system moves air in and out, bringing oxygen in and taking carbon dioxide out. Major organ: the lungs."
       ],
       terms:[["Digestive system","Breaks down food into nutrients."],["Integumentary system","Skin, hair and nails."],["Central nervous system","The brain and spinal cord."],["Respiratory system","Moves air in and out of the lungs."]],
       work:"Systems booklet, Topic 6: Systems of the Human Body.",
       check:[
         {q:"Where does most absorption of food happen?", a:["Stomach","Small intestine","Large intestine"], c:1, why:"The small intestine is long and thin for absorbing."},
         {q:"What's the largest organ in the body?", a:["Liver","Skin","Brain"], c:1, why:"Skin, part of the integumentary system."},
         {q:"The brain and spinal cord form the…", a:["Central nervous system","Peripheral nervous system"], c:0, why:"Nerves elsewhere are peripheral."}
       ]},
      {id:"circulatory", n:"10", title:"The Circulatory System",
       charts:[{title:"One student's heart rate before, during and after jogging",
         x:{label:"Time (minutes)",short:"Time",min:0,max:14,step:1,snap:1,unit:"min"},
         y:{label:"Heart rate (beats per minute)",min:60,max:160,step:20,unit:"bpm"},
         start:8, bands:[{from:2,to:8,label:"jogging"}], labels:[{x:1,text:"resting"},{x:11.5,text:"resting again"}],
         series:[{name:"Heart rate",points:[[0,72],[1,71],[2,73],[3,96],[4,118],[5,131],[6,138],[7,141],[8,142],[9,121],[10,104],[11,91],[12,82],[13,76],[14,73]]}],
         note:"Drag across the graph to read the heart rate at each minute. This is sample data from the lesson."}],
       imgs:[{src:"img/heart-flow.jpg",cap:"Blood flow through the heart. Wapcaplet, CC BY-SA 3.0."},
             {src:"img/capillary.jpg",cap:"A capillary bed between an artery (red) and a vein (blue). OpenStax, CC BY."},
             {src:"img/blood.jpg",cap:"Red blood cells, white blood cells and platelets under an electron microscope. Bruce Wetzel and Harry Schaefer, National Cancer Institute, public domain."}],
       big:"The heart pumps blood through arteries, capillaries and veins to deliver oxygen and nutrients and carry away wastes.",
       notes:[
         "The heart has four muscular chambers. The sinoatrial node (pacemaker) sends the electrical signal for each beat.",
         "Arteries carry oxygenated blood away from the heart. Veins carry deoxygenated blood toward it. Capillaries are tiny vessels where gases, nutrients and wastes are exchanged with cells.",
         "Exception: the pulmonary artery carries deoxygenated blood to the lungs, and the pulmonary vein carries oxygenated blood back. Artery and vein describe direction, not oxygen.",
         "Aorta: heart to body. Vena cava: body to heart.",
         "In the heart-rate graph, resting is about 72 beats per minute, jogging pushes it to about 140, and it returns to resting about 5–6 minutes after stopping. That return is homeostasis.",
         "Blood is about 55% plasma (the liquid), 44% red blood cells (carry oxygen with hemoglobin), and under 1% each of white blood cells (fight infection) and platelets (clot wounds).",
         "Red blood cells have no nucleus, so they can squeeze through capillaries, but they only last about 120 days."
       ],
       terms:[["Artery","Carries blood away from the heart."],["Vein","Carries blood toward the heart."],["Capillary","Tiny vessel where exchange with cells happens."],["Hemoglobin","Protein in red blood cells that carries oxygen and makes blood red."],["Plasma","The liquid part of blood."]],
       work:"Systems booklet, Topic 7: Blood Vessels, Blood Flow, the heart-rate graph and the red blood cell reading. Then the Systems Review.",
       check:[
         {q:"Use the graph. About how long after stopping does the heart rate get back near resting?", a:["1 minute","About 5–6 minutes","It never does"], c:1, why:"It stops at minute 8 and is back near 73 by about minute 13–14."},
         {q:"Which vessel carries blood from the heart to the body?", a:["Aorta","Vena cava","Pulmonary vein"], c:0, why:"It's the main artery."},
         {q:"Why is blood red?", a:["Plasma is red","Hemoglobin in red blood cells","Platelets"], c:1, why:"Hemoglobin gives the colour."},
         {q:"What is the largest component of blood by volume?", a:["Red blood cells","Plasma","White blood cells"], c:1, why:"About 55%."}
       ]}
    ]
  },
  {
   id:"matter",n:"2",name:"Matter, Density and Fluids",status:"soon",when:"December to January",
   intro:"What matter is made of and why it behaves the way it does: particle theory, density, fluids and viscosity, how temperature and pressure change things, phase changes, and what makes water special.",
   after:"These study guides follow your booklet. Topic 1, Particles and Density: Lessons 1 to 3. Topic 2, Fluids and Viscosity: Lesson 4. Topic 3, Temperature, Volume and Pressure: Lessons 5 and 6. Topic 4, Energy and Phase Changes: Lesson 7. Topic 5, Water's Special Properties: Lesson 8. The Density Studio on this page assumes a solid object in fresh water at 1.00 g/cm³.",
   lessons:[
 {
  "id": "states",
  "n": "1",
  "title": "States of Matter and Particle Theory",
  "big": "Matter is anything that has mass and takes up space. All of it is made of tiny particles that are always moving, and the particle theory explains why solids, liquids and gases behave so differently.",
  "notes": [
   "Matter has mass and takes up space. Light, sound and heat are not matter: they have no mass and take up no space.",
   "The particle theory of matter is a scientific model. Nobody can watch single particles, but the model explains what we observe.",
   "Point 1: all matter is made of tiny particles. Point 2: there is empty space between particles. Point 3: particles are always moving, and the more energy they have, the faster they move. Point 4: particles are attracted to each other, and some attractions are stronger than others.",
   "Evidence for point 3: food colouring spreads faster in hot water. The hot water particles have more energy, so they move faster and bump the colouring around more.",
   "Evidence for point 2: 50 mL of water plus 50 mL of rubbing alcohol makes about 97 mL, not 100 mL. Some particles fit into the spaces between the others.",
   "To explain something with particle theory, name the particles, say what they are doing, and connect it to a point. Perfume spreads across a room because its particles are always moving (point 3) and spread into the empty space between air particles (point 2)."
  ],
  "table": {
   "title": "The three states of matter",
   "head": [
    "",
    "Solid",
    "Liquid",
    "Gas"
   ],
   "rows": [
    [
     "Shape",
     "Definite shape",
     "Takes the shape of its container",
     "Spreads out to fill its container"
    ],
    [
     "Volume",
     "Definite volume",
     "Definite volume",
     "No definite volume"
    ],
    [
     "Particles arranged",
     "Packed tightly in a pattern",
     "Close together, can slide past each other",
     "Very far apart"
    ],
    [
     "Particles move",
     "Vibrate in place",
     "Move around each other",
     "Move quickly in all directions"
    ],
    [
     "Energy",
     "Lowest",
     "Medium",
     "Highest"
    ],
    [
     "Can be compressed?",
     "No",
     "Barely",
     "Yes, easily"
    ]
   ]
  },
  "terms": [
   [
    "Matter",
    "Anything that has mass and takes up space."
   ],
   [
    "Particle theory of matter",
    "The model that says matter is made of tiny moving particles with space between them that attract each other."
   ],
   [
    "Scientific model",
    "A way of representing something we can't see directly, used to explain observations."
   ],
   [
    "Compress",
    "Squeeze into a smaller volume."
   ]
  ],
  "work": "Booklet Lesson 1: fill in the notes, then practice questions 1 to 9.",
  "check": [
   {
    "q": "Which of these is NOT matter?",
    "a": [
     "Steam",
     "Smoke",
     "A shadow",
     "Air"
    ],
    "c": 2,
    "why": "A shadow is just an area without light. It has no mass and takes up no space."
   },
   {
    "q": "You can squeeze the air in a syringe smaller, but not water. Which point of particle theory explains it best?",
    "a": [
     "There is empty space between particles",
     "All matter is made of particles",
     "Particles are always moving",
     "Particles attract each other"
    ],
    "c": 0,
    "why": "Gas particles have lots of empty space between them, so they can be pushed closer together. Liquid particles are already close."
   },
   {
    "q": "Someone says the particles in a steel beam don't move because steel is a solid. They are…",
    "a": [
     "Right: solid particles are frozen still",
     "Right: only gas particles move",
     "Wrong: solid particles move faster than gas particles",
     "Wrong: solid particles vibrate in place"
    ],
    "c": 3,
    "why": "Particles are always moving (point 3). In a solid they vibrate in place instead of moving around."
   },
   {
    "q": "Sand can be poured and takes the shape of a bucket. Sand is…",
    "a": [
     "A liquid",
     "A solid made of many tiny grains",
     "A gas",
     "Not matter"
    ],
    "c": 1,
    "why": "Each grain keeps its own shape and volume. The grains are small enough to slide past each other in bulk."
   }
  ]
 },
 {
  "id": "density",
  "n": "2",
  "title": "Mass, Volume and Density",
  "big": "Density is how much mass is packed into a given volume: d = m ÷ v. Something floats in water if its density is less than 1.00 g/mL and sinks if it's more.",
  "notes": [
   "Mass is the amount of matter in an object, measured in grams or kilograms (1 kg = 1000 g) with a balance or scale.",
   "Mass is not weight. Weight is the force of gravity on an object, measured in newtons (N). The Moon's gravity is about one-sixth of Earth's, so an astronaut weighs about one-sixth as much there, but her mass doesn't change.",
   "Volume is the amount of space an object takes up. Liquids use mL and L (1 L = 1000 mL). Solids use cubic centimetres (cm³). 1 mL = 1 cm³.",
   "Box-shaped solid: volume = length × width × height. Odd-shaped solid: use water displacement. The object's volume is how much the water level rises.",
   "Density = mass ÷ volume, in g/cm³ for solids and g/mL for liquids. Water is 1.00 g/mL (1000 kg/m³).",
   "In particle terms, a substance is denser when its particles have more mass or are packed more tightly together.",
   "Rearrange with the triangle: m = d × v and v = m ÷ d. Cover the letter you want to find.",
   "Cutting an object in half halves its mass and its volume, so its density stays the same. That's why size doesn't decide floating: a huge log floats and a tiny pebble sinks."
  ],
  "html": "<h3>Worked examples</h3><div class=\"task\" style=\"margin-bottom:12px\"><p><b>A block of wood has a mass of 30 g and a volume of 50 cm³. What is its density?</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>Given: m = 30 g, v = 50 cm³<span style=\"display:block;font-size:.92em;color:var(--muted)\">Write what you know.</span></li><li>Formula: d = m ÷ v<span style=\"display:block;font-size:.92em;color:var(--muted)\"></span></li><li>d = 30 g ÷ 50 cm³ = 0.60 g/cm³<span style=\"display:block;font-size:.92em;color:var(--muted)\">Numbers with units.</span></li><li>0.60 is less than 1.00<span style=\"display:block;font-size:.92em;color:var(--muted)\">So it floats in water.</span></li></ol><p>Answer: <b>0.60 g/cm³</b></p></div><div class=\"task\" style=\"margin-bottom:12px\"><p><b>Lead has a density of 11.3 g/cm³. A lead fishing weight has a volume of 3.0 cm³. What is its mass?</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>Given: d = 11.3 g/cm³, v = 3.0 cm³<span style=\"display:block;font-size:.92em;color:var(--muted)\"></span></li><li>Formula: m = d × v<span style=\"display:block;font-size:.92em;color:var(--muted)\">Mass is on top of the triangle, so multiply.</span></li><li>m = 11.3 × 3.0 = 33.9 g<span style=\"display:block;font-size:.92em;color:var(--muted)\"></span></li></ol><p>Answer: <b>33.9 g</b></p></div><div class=\"task\" style=\"margin-bottom:12px\"><p><b>Cork has a density of 0.24 g/cm³. A cork has a mass of 12 g. What is its volume?</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>Given: d = 0.24 g/cm³, m = 12 g<span style=\"display:block;font-size:.92em;color:var(--muted)\"></span></li><li>Formula: v = m ÷ d<span style=\"display:block;font-size:.92em;color:var(--muted)\"></span></li><li>v = 12 ÷ 0.24 = 50 cm³<span style=\"display:block;font-size:.92em;color:var(--muted)\"></span></li></ol><p>Answer: <b>50 cm³</b></p></div>",
  "table": {
   "title": "Densities of some common substances (room temperature)",
   "head": [
    "Substance",
    "Density (g/cm³ or g/mL)"
   ],
   "rows": [
    [
     "air",
     "0.0012"
    ],
    [
     "cork",
     "0.24"
    ],
    [
     "pine wood",
     "about 0.5"
    ],
    [
     "ice",
     "0.92"
    ],
    [
     "vegetable oil",
     "0.92"
    ],
    [
     "water",
     "1.00"
    ],
    [
     "maple syrup",
     "1.32"
    ],
    [
     "honey",
     "1.42"
    ],
    [
     "aluminum",
     "2.70"
    ],
    [
     "iron",
     "7.87"
    ],
    [
     "lead",
     "11.3"
    ],
    [
     "gold",
     "19.3"
    ]
   ]
  },
  "terms": [
   [
    "Mass",
    "The amount of matter in an object (g, kg)."
   ],
   [
    "Weight",
    "The force of gravity on an object (N)."
   ],
   [
    "Volume",
    "The amount of space an object takes up (mL, L, cm³)."
   ],
   [
    "Density",
    "The amount of mass in a given volume: d = m ÷ v."
   ],
   [
    "Water displacement",
    "Finding an object's volume by how much it raises the water level."
   ]
  ],
  "work": "Booklet Lesson 2: notes and Examples 1 to 3, then practice questions 1 to 12.",
  "check": [
   {
    "q": "An object has a mass of 90 g and a volume of 30 cm³. Its density is…",
    "a": [
     "0.33 g/cm³",
     "3.0 g/cm³",
     "120 g/cm³",
     "2700 g/cm³"
    ],
    "c": 1,
    "why": "d = m ÷ v = 90 ÷ 30 = 3.0 g/cm³."
   },
   {
    "q": "A block of copper is cut in half. The density of each half…",
    "a": [
     "Is cut in half",
     "Doubles",
     "Becomes zero",
     "Stays the same"
    ],
    "c": 3,
    "why": "Mass and volume are both cut in half, so mass ÷ volume doesn't change."
   },
   {
    "q": "Honey has a density of 1.42 g/mL. A drop of honey in water will…",
    "a": [
     "Sink",
     "Float",
     "Float, then disappear",
     "Stay in the middle forever"
    ],
    "c": 0,
    "why": "1.42 is more than water's 1.00 g/mL."
   },
   {
    "q": "Water rises from 40 mL to 52 mL when a 36 g stone is added. The stone's density is…",
    "a": [
     "0.33 g/cm³",
     "0.69 g/cm³",
     "3.0 g/cm³",
     "1.3 g/cm³"
    ],
    "c": 2,
    "why": "Volume = 52 − 40 = 12 cm³. Density = 36 ÷ 12 = 3.0 g/cm³."
   }
  ]
 },
 {
  "id": "lab",
  "n": "3",
  "title": "Density Lab",
  "big": "Measure the mass and volume of five objects, calculate their densities, and use density to predict which ones sink or float. Then find out whether breaking clay in half changes its density.",
  "notes": [
   "The five objects: a wood block, a rubber eraser, a small rock, a steel bolt and a ball of modelling clay.",
   "Box shapes (wood, eraser): measure length, width and height with a ruler. Volume = length × width × height.",
   "Odd shapes (rock, bolt, clay): pour exactly 50 mL of water into the cylinder, slide the object in, and read the new level at eye level. Volume = new level − 50 mL.",
   "Weigh every object while it's dry, before it goes in water. A wet object carries extra water mass.",
   "Never drop an object into the graduated cylinder. Tilt it and let the object slide down the side, or the glass can crack.",
   "Density = mass ÷ volume, rounded to two decimal places with units. Compare each one to water at 1.00 g/cm³ to predict sink or float, then test it.",
   "Your numbers won't match the density table exactly. Reading the cylinder, rounding ruler measurements and real objects not being pure substances all add small differences.",
   "A steel ship floats even though steel is about 8 times denser than water. The whole ship, including the air inside, has a lower average density than water."
  ],
  "html": "<h3>Sample calculation</h3><div class=\"task\" style=\"margin-bottom:12px\"><p><b>A steel bolt has a mass of 47.2 g. The water rises from 50 mL to 56 mL. What is it mostly made of?</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>Volume = 56 mL − 50 mL = 6 mL = 6 cm³<span style=\"display:block;font-size:.92em;color:var(--muted)\">Displacement.</span></li><li>d = 47.2 g ÷ 6 cm³ = 7.87 g/cm³<span style=\"display:block;font-size:.92em;color:var(--muted)\">Two decimal places, with units.</span></li><li>7.87 g/cm³ matches iron in the table<span style=\"display:block;font-size:.92em;color:var(--muted)\">Steel is mostly iron. It sinks.</span></li></ol><p>Answer: <b>Iron (steel), sinks</b></p></div>",
  "terms": [
   [
    "Graduated cylinder",
    "A tall measuring container for liquid volume."
   ],
   [
    "Meniscus",
    "The curve at the top of water in a cylinder. Read the bottom of the curve at eye level."
   ],
   [
    "Average density",
    "Total mass ÷ total volume of an object, including any air inside."
   ],
   [
    "Measurement error",
    "The difference between a measured value and the true value."
   ]
  ],
  "work": "Density Lab handout (20 marks): predictions, data table, half-the-clay test and analysis questions.",
  "check": [
   {
    "q": "The water level goes from 50 mL to 58 mL when a rock is added. The rock's volume is…",
    "a": [
     "58 cm³",
     "108 cm³",
     "50 cm³",
     "8 cm³"
    ],
    "c": 3,
    "why": "Volume = new level − starting level = 58 − 50 = 8 mL = 8 cm³."
   },
   {
    "q": "Why do you weigh the objects before putting them in water?",
    "a": [
     "Dry objects weigh less than wet ones only on the Moon",
     "Water left on the object would add mass",
     "The scale only works on round objects",
     "Water makes objects lighter"
    ],
    "c": 1,
    "why": "Any water clinging to the object gets weighed too, so the mass (and density) comes out too high."
   },
   {
    "q": "A clay ball has a density of 1.80 g/cm³. You break it in half. One half should have a density of about…",
    "a": [
     "0.90 g/cm³",
     "3.60 g/cm³",
     "1.80 g/cm³",
     "1.00 g/cm³"
    ],
    "c": 2,
    "why": "Density is a property of the material. Half the mass in half the volume gives the same density."
   },
   {
    "q": "A block is 4 cm × 2 cm × 2.5 cm and has a mass of 12 g. Its density and result in water are…",
    "a": [
     "0.60 g/cm³, floats",
     "1.67 g/cm³, sinks",
     "0.60 g/cm³, sinks",
     "240 g/cm³, sinks"
    ],
    "c": 0,
    "why": "Volume = 4 × 2 × 2.5 = 20 cm³. Density = 12 ÷ 20 = 0.60 g/cm³, which is less than 1.00."
   }
  ]
 },
 {
  "id": "viscosity",
  "n": "4",
  "title": "Fluids and Viscosity",
  "big": "A fluid is anything that flows, which means liquids and gases. Viscosity is a fluid's resistance to flowing: honey has high viscosity and water has low viscosity.",
  "notes": [
   "Liquids and gases are both fluids because their particles can move past each other.",
   "High-viscosity fluids (honey, ketchup, syrup) flow slowly. Low-viscosity fluids (water, rubbing alcohol) flow quickly.",
   "In particle terms, fluids with stronger attractions between particles (or bigger, tangled particles) resist flowing more.",
   "Warming most liquids lowers their viscosity. Warm syrup pours more easily than cold syrup because the particles have more energy.",
   "Density and viscosity are different properties. Vegetable oil flows more slowly than water, but it's less dense and floats on top.",
   "A fair viscosity test keeps the ramp angle, amount of fluid, surface, starting line and temperature the same, and changes only the fluid."
  ],
  "terms": [
   [
    "Fluid",
    "A substance that flows: a liquid or a gas."
   ],
   [
    "Viscosity",
    "A fluid's resistance to flowing."
   ],
   [
    "Flow rate",
    "How fast a fluid moves, such as the time to travel down a ramp."
   ]
  ],
  "work": "Plan a water-versus-syrup ramp test. Name the independent variable, the dependent variable and three controlled variables, then predict what warming the syrup would do.",
  "check": [
   {
    "q": "Viscosity is a measure of…",
    "a": [
     "How much a fluid resists flowing",
     "How much mass is in a volume",
     "How hot a fluid is",
     "How much space a fluid takes up"
    ],
    "c": 0,
    "why": "Viscosity describes how easily a fluid flows. Density is mass per volume."
   },
   {
    "q": "Cold maple syrup is warmed up. It will most likely…",
    "a": [
     "Flow more slowly",
     "Turn into a solid",
     "Flow more easily",
     "Lose mass"
    ],
    "c": 2,
    "why": "Warmer particles have more energy and slide past each other more easily, so viscosity goes down."
   },
   {
    "q": "Oil flows more slowly than water but floats on it. This shows that…",
    "a": [
     "Oil is denser than water",
     "Viscosity and density are different properties",
     "Slow fluids always sink",
     "Oil isn't a fluid"
    ],
    "c": 1,
    "why": "Oil has higher viscosity but lower density (0.92 g/mL) than water."
   }
  ]
 },
 {
  "id": "temperature",
  "n": "5",
  "title": "Temperature, Volume and Density",
  "big": "When most substances warm up, their particles move faster and spread out. The volume increases, the mass stays the same, so the density goes down.",
  "notes": [
   "Heating gives particles more energy. They move faster and push farther apart, so most substances expand. This is called thermal expansion.",
   "Cooling does the opposite: particles slow down, move closer together and the substance contracts.",
   "The mass doesn't change when something expands. The same mass in a bigger volume means a lower density.",
   "Warm air is less dense than cool air, so it rises. This is why a hot-air balloon floats and why the upstairs of a house is warmer.",
   "Movement driven by density differences in a fluid is called convection. Warm fluid rises, cool fluid sinks, and a current forms.",
   "Thermal expansion matters in real life: bridges have expansion joints, and liquid in a thermometer rises as it warms."
  ],
  "terms": [
   [
    "Thermal expansion",
    "The increase in volume when a substance warms."
   ],
   [
    "Contraction",
    "The decrease in volume when a substance cools."
   ],
   [
    "Convection",
    "Movement in a fluid caused by warmer, less dense fluid rising and cooler, denser fluid sinking."
   ]
  ],
  "work": "Draw particle models of the same gas when cold and when hot. Then explain, using density, why warm air rises.",
  "check": [
   {
    "q": "A substance warms up. Its mass stays the same and its volume increases. Its density…",
    "a": [
     "Increases",
     "Stays the same",
     "Becomes zero",
     "Decreases"
    ],
    "c": 3,
    "why": "The same mass is spread through more space."
   },
   {
    "q": "Why does a hot-air balloon rise?",
    "a": [
     "Hot air has no mass",
     "The hot air inside is less dense than the cooler air outside",
     "The balloon fabric is lighter than air",
     "Heat pushes the balloon up directly"
    ],
    "c": 1,
    "why": "Heated air expands and becomes less dense, so the cooler air around it pushes it up."
   },
   {
    "q": "Bridges have gaps called expansion joints because…",
    "a": [
     "The bridge gets longer in summer heat",
     "Cars need somewhere to drain water",
     "Steel gets denser in summer",
     "The gaps make the bridge lighter"
    ],
    "c": 0,
    "why": "Warm steel and concrete expand. Without gaps, the bridge would buckle."
   }
  ]
 },
 {
  "id": "pressure",
  "n": "6",
  "title": "Pressure and Compressibility",
  "big": "Gas particles have lots of space between them, so gases can be squeezed and their pressure changes with temperature. Liquids and solids barely compress at all.",
  "notes": [
   "Pressure is a force pushing on an area. In a gas, pressure comes from particles hitting the walls of their container.",
   "Gases compress easily because their particles are far apart. Liquids barely compress because their particles are already close together.",
   "Squeeze a sealed syringe of air and the particles crowd closer. They hit the walls more often, so the pressure goes up.",
   "Heat a sealed, rigid container of gas and the particles move faster and hit the walls harder and more often, so the pressure rises. That's why aerosol cans warn you not to heat them.",
   "If a gas can expand, heating it makes it take up more volume instead, like a balloon getting bigger in the sun.",
   "Hydraulic systems (car brakes, excavators) use liquids because they don't compress: a push on one end is passed straight to the other."
  ],
  "terms": [
   [
    "Pressure",
    "Force acting on an area."
   ],
   [
    "Compressible",
    "Able to be squeezed into a smaller volume."
   ],
   [
    "Hydraulics",
    "Using a liquid under pressure to move or lift things."
   ]
  ],
  "work": "Draw a sealed syringe of air before and after you push the plunger in. Explain what happens to particle spacing and pressure.",
  "check": [
   {
    "q": "Which is easiest to compress?",
    "a": [
     "Liquid water",
     "Ice",
     "A steel bolt",
     "Air"
    ],
    "c": 3,
    "why": "Gas particles have far more empty space between them."
   },
   {
    "q": "A sealed, rigid can of gas is heated. The pressure inside…",
    "a": [
     "Goes down",
     "Stays the same",
     "Goes up",
     "Drops to zero"
    ],
    "c": 2,
    "why": "Faster particles hit the walls harder and more often."
   },
   {
    "q": "Car brakes use liquid instead of air because…",
    "a": [
     "Liquids are lighter",
     "Air is too dense",
     "Liquids barely compress, so the push passes straight through",
     "Liquids have no particles"
    ],
    "c": 2,
    "why": "If the brake lines held air, pressing the pedal would just squeeze the air."
   }
  ]
 },
 {
  "id": "phase",
  "n": "7",
  "title": "Energy and Phase Changes",
  "big": "Adding energy makes particles move faster until they can break away from each other, which changes the state. While the state is changing, the temperature stays the same.",
  "notes": [
   "Melting (solid to liquid) and boiling or evaporation (liquid to gas) need energy added. Freezing (liquid to solid) and condensation (gas to liquid) release energy.",
   "Sublimation goes straight from solid to gas, like dry ice. Deposition goes straight from gas to solid, like frost.",
   "On a heating curve the temperature climbs, then goes flat while the substance melts, climbs again, then goes flat again while it boils.",
   "During the flat parts, the added energy goes into pulling particles apart against their attractions, not into speeding them up.",
   "Substances with stronger attractions between particles need more energy to change state, so they have higher melting and boiling points.",
   "Particles are never created or destroyed in a phase change. Boiling water doesn't disappear; it spreads out as invisible water vapour."
  ],
  "terms": [
   [
    "Phase change",
    "A change from one state of matter to another."
   ],
   [
    "Melting point",
    "The temperature at which a solid becomes a liquid."
   ],
   [
    "Boiling point",
    "The temperature at which a liquid boils into a gas."
   ],
   [
    "Sublimation",
    "Changing directly from a solid to a gas."
   ]
  ],
  "work": "Sketch a heating curve for water from −20°C ice to 120°C steam. Label each section and explain where the energy goes on the flat parts.",
  "check": [
   {
    "q": "While pure water is boiling, the added energy mainly…",
    "a": [
     "Raises the temperature above 100°C",
     "Destroys water particles",
     "Makes the particles slow down",
     "Pulls particles apart so they become a gas"
    ],
    "c": 3,
    "why": "On the flat part of the curve, energy goes into the change of state, not into raising the temperature."
   },
   {
    "q": "Frost forming on a cold window is an example of…",
    "a": [
     "Deposition",
     "Melting",
     "Sublimation",
     "Evaporation"
    ],
    "c": 0,
    "why": "Water vapour goes straight to solid ice without becoming liquid first."
   },
   {
    "q": "A substance has a very high melting point. Its particles probably have…",
    "a": [
     "No attractions at all",
     "Strong attractions to each other",
     "No mass",
     "Lots of empty space inside them"
    ],
    "c": 1,
    "why": "More energy is needed to pull strongly attracted particles apart."
   }
  ]
 },
 {
  "id": "water",
  "n": "8",
  "title": "Water's Special Properties",
  "big": "Water breaks some of the usual rules: its solid floats, it soaks up a lot of heat before warming, and it dissolves more substances than almost anything else. Life depends on all three.",
  "notes": [
   "Most substances are densest as solids. Water is different: ice (0.92 g/cm³) is less dense than liquid water, so ice floats.",
   "When water freezes, its particles lock into an open pattern with more space than in the liquid, so it expands. That's why pipes can burst in winter.",
   "Liquid water is densest at about 4°C. In a frozen lake, the 4°C water sinks to the bottom and ice stays on top, insulating the water below so fish survive the winter.",
   "Water has a high heat capacity: it takes a lot of energy to warm it up and it cools slowly. Large lakes keep nearby areas milder in fall and cooler in spring.",
   "Water dissolves so many substances that it's nicknamed the universal solvent. It isn't literal: oil doesn't dissolve in water.",
   "In living things and in the environment, water carries dissolved nutrients and wastes from place to place."
  ],
  "terms": [
   [
    "Heat capacity",
    "How much energy it takes to change something's temperature."
   ],
   [
    "Solvent",
    "A substance that dissolves other substances."
   ],
   [
    "Solution",
    "A mixture where one substance is dissolved evenly in another."
   ]
  ],
  "work": "Explain three of water's special properties. For each one, give a real example of how it affects living things or Manitoba's weather.",
  "check": [
   {
    "q": "Ice floats on water because…",
    "a": [
     "Ice is less dense than liquid water",
     "Ice has no mass",
     "Ice is a gas",
     "Cold things always float"
    ],
    "c": 0,
    "why": "Freezing water forms an open pattern with more space, so ice is 0.92 g/cm³."
   },
   {
    "q": "Which property helps large lakes keep nearby towns milder in the fall?",
    "a": [
     "Water's colour",
     "Water's high heat capacity",
     "Water's low density",
     "Water's viscosity"
    ],
    "c": 1,
    "why": "Water stores a lot of energy and gives it off slowly."
   },
   {
    "q": "Water is called the universal solvent, but that's a nickname because…",
    "a": [
     "It dissolves nothing",
     "It dissolves everything, including oil",
     "It turns substances into gases",
     "It dissolves many substances, but not all"
    ],
    "c": 3,
    "why": "Oil and water don't mix, for example."
   }
  ]
 }
]
  },
  {
  "id": "light",
  "n": "3",
  "name": "Solar Energy and Light",
  "status": "soon",
  "when": "February to March",
  "intro": "Where Earth's energy comes from and where it goes: the electromagnetic spectrum, how surfaces absorb and reflect sunlight, photosynthesis, and how energy moves through food chains.",
  "after": "These study guides follow the same order as your booklet. Printed assignments and labs come from Mr. Mangles in class.",
  "lessons": [
    {
      "id": "u3t1-energy",
      "n": "1",
      "title": "Energy: What Can Make Things Change?",
      "big": "Energy is transferred and transformed rather than created or destroyed. Identify what changes and where the energy goes.",
      "notes": [
        "Energy is a quantity we use to describe the capacity to cause changes or do work. We measure energy in joules (J).",
        "The law of conservation of energy says that energy is not created or destroyed. It transfers between objects or changes form.",
        "When gasoline burns, stored chemical energy is transformed into thermal energy, movement, light and sound; it is not newly created.",
        "The Sun releases energy through nuclear fusion. Sunlight carries some of that energy through space to Earth.",
        "For each change, describe the energy source, the process and the useful and less useful outcomes. Energy often spreads into the surroundings as heat.",
        "Class materials: Energy & Light student booklet, Topic 1, pages 2–3; Topic 1 energy slides."
      ],
      "terms": [
        [
          "Energy",
          "A quantity describing the capacity to cause change."
        ],
        [
          "Transformation",
          "Energy changing from one form to another."
        ],
        [
          "Conservation of energy",
          "Total energy is not created or destroyed during a process."
        ]
      ],
      "work": "Booklet pp. 2–3. Draw a before/during/after energy-pathway diagram for a flashlight, a bike ride and a toaster. Complete your Topic 1 Energy Pre-Assignment when handed out.",
      "check": [
        {
          "q": "A flashlight turns on. Which description best fits conservation of energy?",
          "a": [
            "The flashlight creates energy",
            "Stored battery energy is transferred and transformed",
            "The light energy appears from nothing"
          ],
          "c": 1,
          "why": "Chemical energy stored in the battery transfers and changes into light and heat."
        },
        {
          "q": "Which unit commonly measures energy?",
          "a": [
            "Joule (J)",
            "Litre (L)",
            "Kilometre (km)"
          ],
          "c": 0,
          "why": "Energy is measured in joules."
        },
        {
          "q": "Where does energy go when a bouncing ball eventually stops?",
          "a": [
            "It is destroyed",
            "It mostly spreads as thermal energy and sound",
            "It vanishes into empty space immediately"
          ],
          "c": 1,
          "why": "The energy is transferred to the environment, not destroyed."
        }
      ]
    },
    {
      "id": "u3t1-stores",
      "n": "2",
      "title": "Potential and Kinetic Energy",
      "big": "Stored energy and energy of motion help explain everyday transformations.",
      "notes": [
        "Potential energy is energy stored due to position, condition or arrangement. A raised object and a stretched spring are examples.",
        "Kinetic energy is energy of motion. A rolling skateboard and moving river water have kinetic energy.",
        "Stored chemical energy in food or fuel can be transferred to motion and other energy outputs.",
        "Energy labels are useful models. Track changes rather than assuming energy exists in only one form.",
        "A falling object loses gravitational potential energy while gaining kinetic energy; air resistance transfers some energy into the surroundings.",
        "Class materials: booklet p. 3 and Topic 1 slides 7–8."
      ],
      "terms": [
        [
          "Potential energy",
          "Energy stored due to position or arrangement."
        ],
        [
          "Kinetic energy",
          "Energy associated with motion."
        ]
      ],
      "work": "Booklet p. 3. Make a two-column list of potential and kinetic examples, then explain the changes in a roller-coaster hill and hydroelectric dam.",
      "check": [
        {
          "q": "A spring is compressed but not released. The energy is mainly…",
          "a": [
            "Kinetic",
            "Stored potential",
            "Non-existent"
          ],
          "c": 1,
          "why": "Deforming the spring stores elastic potential energy."
        },
        {
          "q": "A skateboard rolling across the floor has…",
          "a": [
            "Kinetic energy",
            "Only gravitational potential energy",
            "No energy"
          ],
          "c": 0,
          "why": "Moving objects have kinetic energy."
        }
      ]
    },
    {
      "id": "u3t1-resources",
      "n": "3",
      "title": "Energy Resources and Trade-Offs",
      "big": "Energy sources offer benefits and costs; strong decisions compare their effects instead of claiming one is perfect.",
      "notes": [
        "Renewable sources replenish on human timescales, such as sunlight, flowing water and wind. Non-renewable resources replenish extremely slowly.",
        "Fossil fuels contain chemical energy from ancient organic matter. Burning them releases carbon dioxide and other pollution.",
        "Nuclear fission releases energy from heavy nuclei. It can produce electricity with low operating emissions but requires safety planning and radioactive-waste management.",
        "Hydroelectric power uses moving water to drive generators. Manitoba generates much of its electricity using hydropower.",
        "Wind turbines convert moving air's energy into electricity; solar panels convert sunlight into electricity.",
        "Compare reliability, cost, local land and water impacts, emissions and long-term consequences; renewable does not mean impact-free.",
        "Class materials: booklet pp. 4–5; Topic 1 Energy Resources slides and the Energy Transformations Storyboard."
      ],
      "terms": [
        [
          "Renewable resource",
          "Energy source replenished at a useful rate for humans."
        ],
        [
          "Non-renewable resource",
          "Energy source not replaced quickly enough on human timescales."
        ],
        [
          "Trade-off",
          "A benefit gained while accepting a cost or limitation."
        ]
      ],
      "work": "Booklet pp. 4–5. Choose Manitoba hydropower and one other source. Draw both energy transformations and justify a trade-off using two criteria. Work on the Storyboard Project when assigned.",
      "check": [
        {
          "q": "In a wind turbine, the input that drives the generator is…",
          "a": [
            "Wind's kinetic energy",
            "Chemical energy from coal",
            "Potential energy in a battery"
          ],
          "c": 0,
          "why": "Moving air spins the turbine."
        },
        {
          "q": "Which is a responsible comparison?",
          "a": [
            "Renewable sources have no drawbacks",
            "All electricity sources involve advantages and trade-offs",
            "Fossil fuels produce no emissions"
          ],
          "c": 1,
          "why": "A balanced choice weighs evidence and local impacts."
        }
      ]
    },
    {
      "id": "u3t1-budget",
      "n": "4",
      "title": "Earth's Energy Budget",
      "big": "Sunlight brings energy to Earth. Some is reflected; absorbed energy warms the planet and ultimately leaves as outgoing radiation.",
      "notes": [
        "Radiation can cross the vacuum of space because electromagnetic waves do not require matter.",
        "Of all incoming solar energy, roughly 30% is reflected by clouds, atmosphere and Earth's bright surfaces; about 70% is absorbed. These are broad averages, not fixed measurements for every place.",
        "Earth emits energy back toward space mainly as infrared radiation. Temperature depends on incoming and outgoing energy flows.",
        "If incoming and outgoing energy are equal over time, average global temperature can remain approximately steady. An imbalance changes stored energy and temperature.",
        "Albedo is a fraction or percentage of incoming light reflected by a surface. Ice and snow often have higher albedo than dark water or soil.",
        "The surface-only Albedo Explorer simplifies this picture. It does not model all atmospheric absorption or greenhouse effects.",
        "Class materials: booklet p. 6 and Topic 1 slides 15–16."
      ],
      "terms": [
        [
          "Energy budget",
          "The comparison of energy entering and leaving a system."
        ],
        [
          "Albedo",
          "The fraction of incoming light a surface reflects."
        ],
        [
          "Infrared",
          "Electromagnetic radiation emitted strongly by objects at Earth's temperatures."
        ]
      ],
      "work": "Booklet p. 6. Open the unit's Solar Spectrum & Albedo Explorer. Set a surface to 20% and then 70% albedo; describe the change in absorbed energy per 100 incoming units.",
      "check": [
        {
          "q": "What happens to sunlight that a surface reflects?",
          "a": [
            "It must be absorbed by that surface",
            "It travels away from that surface",
            "It is destroyed"
          ],
          "c": 1,
          "why": "Reflected light is redirected; it is not absorbed by the surface."
        },
        {
          "q": "At 60% albedo, a simplified surface receiving 100 units reflects…",
          "a": [
            "40 units",
            "60 units",
            "160 units"
          ],
          "c": 1,
          "why": "60% of 100 = 60 units."
        },
        {
          "q": "Which kind of radiation mainly carries Earth's outgoing thermal energy?",
          "a": [
            "Infrared",
            "X-rays",
            "Gamma rays"
          ],
          "c": 0,
          "why": "Earth emits mostly infrared due to its temperature."
        }
      ]
    },
    {
      "id": "u3t2-light",
      "n": "5",
      "title": "How Light Travels and Interacts",
      "big": "Light is electromagnetic radiation. It travels through empty space and can be transmitted, absorbed or reflected when it meets matter.",
      "notes": [
        "Sunlight reaches Earth across approximately 150 million kilometres of space. No air or other medium is needed for this radiation to travel.",
        "A transparent material transmits most visible light with little scattering, such as clear glass.",
        "A translucent material lets some light through but scatters it, such as frosted glass.",
        "An opaque material does not transmit visible light, such as a wooden board.",
        "Light generally travels in straight lines through a uniform medium, but it can reflect or change direction at an interface.",
        "Absorbed sunlight can increase an object's thermal energy or be transformed into chemical or electrical energy.",
        "Class materials: student booklet p. 7, Topic 2 Light slides and the Light Sources textbook assignment (if assigned)."
      ],
      "terms": [
        [
          "Transparent",
          "Transmits light clearly."
        ],
        [
          "Translucent",
          "Transmits but scatters some light."
        ],
        [
          "Opaque",
          "Does not transmit visible light."
        ],
        [
          "Radiation",
          "Energy carried by electromagnetic waves."
        ]
      ],
      "work": "Booklet p. 7. Sort five classroom objects as transparent, translucent or opaque and justify one tricky example with an observation.",
      "check": [
        {
          "q": "Frosted glass is generally…",
          "a": [
            "Opaque",
            "Translucent",
            "A light source"
          ],
          "c": 1,
          "why": "It transmits and scatters light, so you do not see clearly through it."
        },
        {
          "q": "How does sunlight cross the vacuum of space?",
          "a": [
            "As sound waves",
            "As electromagnetic radiation",
            "By heating air in space"
          ],
          "c": 1,
          "why": "Electromagnetic radiation can travel through a vacuum."
        }
      ]
    },
    {
      "id": "u3t2-albedo",
      "n": "6",
      "title": "Reflection, Albedo and Surface Heating",
      "big": "Light and dark surfaces often reflect different amounts of sunlight, but heating also depends on each material's thermal properties.",
      "notes": [
        "Reflection occurs when light bounces from a surface; absorption transfers light energy into the material.",
        "Bright surfaces such as snow often have relatively high albedo. Dark ocean water usually has lower albedo.",
        "Loss of sea ice can expose darker water, increasing sunlight absorption and amplifying warming through an ice–albedo feedback.",
        "Water changes temperature more slowly than dry sand partly because of its greater heat capacity and mixing.",
        "In the classroom Heating Earth's Surface Lab, use the same starting conditions and light source for a fair comparison. Different surfaces can respond differently.",
        "The unit's Albedo Explorer illustrates reflected and absorbed amounts out of 100 units, not exact real-world rates of warming.",
        "Class materials: booklet pp. 8–9, Topic 2 slides 5–10 and Heating Earth's Surface Lab."
      ],
      "terms": [
        [
          "Reflection",
          "Light changing direction as it bounces off a surface."
        ],
        [
          "Ice–albedo feedback",
          "Warming melts reflective ice, exposing darker surfaces that absorb more energy."
        ],
        [
          "Heat capacity",
          "Energy required to increase an object's temperature."
        ]
      ],
      "work": "Booklet pp. 8–9. Complete the teacher-provided Heating Earth's Surface Lab or use the Albedo Explorer for a prediction/claim/evidence/explanation. List controlled variables.",
      "check": [
        {
          "q": "Two similar surfaces receive the same sunlight. Which usually reflects more?",
          "a": [
            "Fresh snow",
            "Dark asphalt",
            "Both always reflect equally"
          ],
          "c": 0,
          "why": "Snow usually has higher albedo."
        },
        {
          "q": "Why might wet soil warm more slowly than dry soil?",
          "a": [
            "It cannot absorb sunlight",
            "Water has a high specific heat capacity and evaporation can cool it",
            "Wet soil creates no heat"
          ],
          "c": 1,
          "why": "Material properties, including water's thermal behaviour, affect temperature change."
        },
        {
          "q": "Melting sea ice can amplify warming because…",
          "a": [
            "More dark ocean absorbs sunlight",
            "Dark water reflects more than ice",
            "Albedo stops existing"
          ],
          "c": 0,
          "why": "Replacing bright ice with darker water increases absorption."
        }
      ]
    },
    {
      "id": "u3t2-refraction",
      "n": "7",
      "title": "Refraction: Why Things Look Bent",
      "big": "Light can change speed and direction when it moves between different transparent materials.",
      "notes": [
        "Refraction is a change in direction when light enters another material at an angle and changes speed.",
        "A straw may appear bent at the surface of water because rays leaving the water bend before reaching your eyes.",
        "A fish underwater can appear closer to the surface than it really is. Aiming directly where it appears may miss it.",
        "The amount of bending depends on each material's optical refractive index and the angle of the ray, not only its ordinary mass density.",
        "A ray travelling along the normal (straight toward the boundary) changes speed but does not bend sideways.",
        "Never use a laser beam toward anyone's eyes; classroom light activities should use teacher-approved equipment.",
        "Class materials: booklet p. 10, Topic 2 slides 11–13 and Light Lab."
      ],
      "terms": [
        [
          "Refraction",
          "Light changing direction as its speed changes across a boundary."
        ],
        [
          "Normal",
          "An imaginary line perpendicular to the surface."
        ],
        [
          "Refractive index",
          "An optical quantity related to light speed in a material."
        ]
      ],
      "work": "Booklet p. 10. Sketch a straw viewed across air and water. Draw a ray path and explain why a submerged object can appear too shallow. Complete the Light Lab when assigned.",
      "check": [
        {
          "q": "A straw appears bent at water's surface mainly because of…",
          "a": [
            "Refraction",
            "Sound",
            "Evaporation"
          ],
          "c": 0,
          "why": "The light changes direction across water and air."
        },
        {
          "q": "Light entering a new medium exactly along the normal…",
          "a": [
            "Must bend to the side",
            "Can change speed without changing direction",
            "Always reflects all light"
          ],
          "c": 1,
          "why": "At normal incidence the refracted ray stays on the normal."
        }
      ]
    },
    {
      "id": "u3t3-colour",
      "n": "8",
      "title": "Prisms, White Light and Colour",
      "big": "White light contains many wavelengths; a prism separates them because different colours refract by different amounts.",
      "notes": [
        "Newton's prism experiments demonstrated that sunlight contains a spectrum of colours; the prism did not have to create the colours.",
        "An additional optical arrangement can recombine the separated colours into white light.",
        "Visible light ranges from red (longer wavelength) to violet (shorter wavelength). The colour categories blend continuously.",
        "Objects appear coloured because they absorb some wavelengths and reflect or transmit others. Appearance also depends on lighting.",
        "Rods help us see in low light; cone cells support colour vision.",
        "Class materials: booklet pp. 11–12 and Topic 3 Colour & the Electromagnetic Spectrum slides 2–5."
      ],
      "terms": [
        [
          "Dispersion",
          "Separation of light into component wavelengths."
        ],
        [
          "Visible spectrum",
          "Part of electromagnetic radiation humans can see."
        ],
        [
          "Cones",
          "Photoreceptor cells that help detect colours."
        ]
      ],
      "work": "Booklet pp. 11–12. Draw what happens when white light enters a prism and explain how Newton's follow-up experiment tested his idea. Sort object colour observations by light absorbed or reflected.",
      "check": [
        {
          "q": "What did Newton's prism experiments demonstrate?",
          "a": [
            "A prism invents colour",
            "White light includes many colours",
            "The Sun only emits violet light"
          ],
          "c": 1,
          "why": "Different wavelengths already exist in white light."
        },
        {
          "q": "Which visible colour has the longer wavelength?",
          "a": [
            "Red",
            "Violet"
          ],
          "c": 0,
          "why": "Red is toward the longer-wavelength end of the visible spectrum."
        }
      ]
    },
    {
      "id": "u3t3-em",
      "n": "9",
      "title": "Electromagnetic Waves and Sun Safety",
      "big": "All electromagnetic waves travel through vacuum; shorter wavelengths correspond to higher frequency and higher photon energy.",
      "notes": [
        "From longer wavelength to shorter: radio, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays.",
        "As wavelength decreases, frequency increases. Photon energy also increases with frequency.",
        "Visible light occupies only a small part of the electromagnetic spectrum; sunlight also contains infrared and a small ultraviolet component.",
        "Different EM bands have practical applications: radio communication, microwave cooking, infrared cameras, visible light, UV disinfection and X-ray imaging.",
        "Ultraviolet light can damage skin-cell DNA. Sunscreen, shade, protective clothes and sunglasses reduce exposure.",
        "When comparing EM waves, distinguish the energy of an individual photon from how much radiation or total power reaches an object.",
        "Class materials: booklet pp. 13–14, Topic 3 slides 6–11 and the EM Radiation Reading."
      ],
      "terms": [
        [
          "Wavelength",
          "Distance between repeating points on a wave."
        ],
        [
          "Frequency",
          "How often a wave oscillates per second."
        ],
        [
          "Ultraviolet (UV)",
          "EM radiation with shorter wavelengths than visible violet light."
        ]
      ],
      "work": "Booklet pp. 13–14. Use the unit's Spectrum Explorer to rank three radiation bands and identify one application plus one safety issue. Complete the EM Radiation Reading and uses table.",
      "check": [
        {
          "q": "Which has higher photon energy?",
          "a": [
            "Radio waves",
            "X-rays"
          ],
          "c": 1,
          "why": "X-rays have shorter wavelength and greater frequency than radio."
        },
        {
          "q": "In the electromagnetic spectrum, wavelength decreases while frequency…",
          "a": [
            "Increases",
            "Decreases",
            "Always stays the same"
          ],
          "c": 0,
          "why": "In vacuum, wavelength and frequency are inversely related."
        },
        {
          "q": "Which is an effective UV safety step?",
          "a": [
            "Seek shade and wear protective clothing",
            "Stare at the Sun",
            "Skip eye protection"
          ],
          "c": 0,
          "why": "Shade and protective clothing reduce harmful UV exposure."
        }
      ]
    },
    {
      "id": "u3t4-photosynthesis",
      "n": "10",
      "title": "Photosynthesis: Capturing Solar Energy",
      "big": "Producers transfer energy from sunlight into chemical energy stored in glucose.",
      "notes": [
        "Chloroplasts in plant cells contain chlorophyll, which absorbs light used in photosynthesis.",
        "In a simplified description, carbon dioxide plus water plus light energy produce glucose and oxygen.",
        "Photosynthesis stores some incoming solar energy in sugars. Plants make their own organic food; soil provides water and minerals rather than ready-made food.",
        "Plants use glucose for growth and respiration. Photosynthesis and respiration are related but not exact reverses in all details.",
        "The carbon in glucose comes primarily from carbon dioxide in the air, not the soil.",
        "Class materials: student booklet p. 15 and Topic 4 Photosynthesis and Food Chains slides 2–4."
      ],
      "terms": [
        [
          "Photosynthesis",
          "Process converting light energy to chemical energy in sugars."
        ],
        [
          "Chlorophyll",
          "Pigment that absorbs light in photosynthesis."
        ],
        [
          "Glucose",
          "A sugar in which chemical energy is stored."
        ],
        [
          "Producer",
          "Organism that makes organic food from inorganic materials using an energy source."
        ]
      ],
      "work": "Booklet p. 15. Write a word-equation with inputs and outputs, explain the role of chloroplasts and use the Energy Pathway Studio on this lesson.",
      "check": [
        {
          "q": "What is the energy input for photosynthesis in most plants?",
          "a": [
            "Sunlight",
            "Soil nutrients alone",
            "The Moon's light"
          ],
          "c": 0,
          "why": "Photosynthesis captures light energy, usually from the Sun."
        },
        {
          "q": "Where does most of the carbon in plant glucose come from?",
          "a": [
            "Carbon dioxide in air",
            "Dissolved rock",
            "The roots' wood"
          ],
          "c": 0,
          "why": "Plants take up carbon dioxide and build sugars from its carbon."
        }
      ]
    },
    {
      "id": "u3t4-chains",
      "n": "11",
      "title": "Food Chains and Energy Pyramids",
      "big": "Energy flows from producers to consumers. Only a fraction of the chemical energy available at each trophic level becomes available at the next.",
      "notes": [
        "A food chain shows energy transfer between feeding relationships. Arrows point from the organism eaten to the eater.",
        "Producers such as prairie grasses or algae use solar energy to form chemical energy in food.",
        "Primary consumers eat producers, secondary consumers eat primary consumers, and so on.",
        "A common introductory model transfers about 10% of energy to the next trophic level; this is a broad rule of thumb, not an exact ecological law.",
        "Energy is used for metabolism and released as heat or remains in material not eaten or digested. This explains why less usable energy is available at higher levels.",
        "An energy pyramid describes energy flow or availability, not necessarily population counts or exact sizes.",
        "Class materials: booklet p. 16, Topic 4 slides 5–8 and Topic 4 Practice Questions."
      ],
      "terms": [
        [
          "Food chain",
          "A sequence of feeding relationships showing energy transfer."
        ],
        [
          "Trophic level",
          "Position in a feeding relationship such as producer or consumer."
        ],
        [
          "Energy pyramid",
          "Diagram showing declining available energy along a food chain."
        ]
      ],
      "work": "Booklet p. 16. Use the Energy Pathway Studio to test 10,000 J from grass to grasshopper, frog and hawk, then write why 90% is not 'destroyed'. Complete the Topic 4 practice.",
      "check": [
        {
          "q": "Which direction should an arrow point in grass → grasshopper?",
          "a": [
            "Grass to grasshopper",
            "Grasshopper to grass",
            "Arrows never show energy transfer"
          ],
          "c": 0,
          "why": "Arrows show the direction energy is transferred by eating."
        },
        {
          "q": "With 10,000 J at grass and a 10% transfer model, about how much reaches the frog (two transfers)?",
          "a": [
            "1,000 J",
            "100 J",
            "10 J"
          ],
          "c": 1,
          "why": "10,000 → 1,000 at grasshopper → 100 at frog."
        },
        {
          "q": "Does unused energy disappear?",
          "a": [
            "Yes",
            "No, it transfers to the environment and other pathways"
          ],
          "c": 1,
          "why": "Energy conservation still applies to ecosystems."
        }
      ]
    },
    {
      "id": "u3t5-greenhouse",
      "n": "12",
      "title": "The Natural Greenhouse Effect",
      "big": "Earth's atmosphere absorbs and re-emits infrared radiation, warming the surface compared with a planet without greenhouse gases.",
      "notes": [
        "Incoming solar radiation passes through the atmosphere; some is reflected, and some is absorbed by the surface and atmosphere.",
        "The warmed surface emits infrared radiation. Greenhouse gases absorb and re-emit some of this energy in different directions.",
        "Carbon dioxide, methane and water vapour are important greenhouse gases; nitrogen and oxygen are not strong infrared absorbers.",
        "The natural greenhouse effect makes Earth warm enough for much of its existing life.",
        "Not all infrared radiation is trapped: Earth loses energy to space continuously. The greenhouse effect changes the rate and altitude at which energy escapes.",
        "This is a physical energy-transfer mechanism; an actual glass greenhouse mainly reduces heat loss by convection and is not the same process.",
        "Class materials: booklet p. 17 and Topic 5 Greenhouse Effect slides 2–3."
      ],
      "terms": [
        [
          "Greenhouse gas",
          "Gas that absorbs and emits infrared radiation."
        ],
        [
          "Infrared emission",
          "Radiation released by objects due to their temperature."
        ],
        [
          "Atmosphere",
          "Layer of gases surrounding Earth."
        ]
      ],
      "work": "Booklet p. 17. Draw three labelled arrows: incoming sunlight, outgoing infrared from the surface and re-emitted infrared in both upward and downward directions.",
      "check": [
        {
          "q": "Which Earth radiation is absorbed by greenhouse gases?",
          "a": [
            "Only visible red light",
            "Infrared radiation emitted by Earth",
            "All radio broadcasts"
          ],
          "c": 1,
          "why": "Greenhouse gases absorb particular bands of infrared radiation."
        },
        {
          "q": "Is the natural greenhouse effect necessary for Earth's usual climate?",
          "a": [
            "Yes",
            "No, it is entirely human-made"
          ],
          "c": 0,
          "why": "The greenhouse effect is natural; human activities amplify it."
        }
      ]
    },
    {
      "id": "u3t5-balance",
      "n": "13",
      "title": "Human-Accelerated Warming and Feedback",
      "big": "Adding greenhouse gases changes Earth's energy balance. Interacting processes can amplify or reduce changes.",
      "notes": [
        "Burning fossil fuels increases atmospheric carbon dioxide, strengthening absorption and re-emission of infrared radiation.",
        "When Earth receives more energy than it sends back to space, energy accumulates and the climate warms until a new balance can be approached.",
        "Ice melt reduces the area covered by bright snow and sea ice. Darker land and water absorb more sunlight and can amplify warming.",
        "Feedback loops link multiple causes and consequences. A feedback is not proof that every change will continue at the same rate.",
        "Climate research combines observations, physical laws and models to estimate trends and uncertainties.",
        "When discussing solutions, compare practical benefits, costs and impacts of different energy choices.",
        "Class materials: booklet p. 18, Topic 5 slides 4–7 and Topic 5 Practice Questions."
      ],
      "terms": [
        [
          "Energy imbalance",
          "Incoming and outgoing energy flows that do not match."
        ],
        [
          "Climate feedback",
          "A process that changes the magnitude of an initial climate change."
        ],
        [
          "Human-accelerated greenhouse effect",
          "Additional warming due to human-driven increases in greenhouse gases."
        ]
      ],
      "work": "Booklet p. 18. Make a causal-loop diagram: more greenhouse gases → warming → sea ice loss → lower albedo → more absorption. Discuss one energy choice and its trade-off.",
      "check": [
        {
          "q": "Why does extra atmospheric CO₂ affect global temperature?",
          "a": [
            "It destroys sunlight",
            "It alters infrared absorption and Earth's energy balance",
            "It stops all clouds from forming"
          ],
          "c": 1,
          "why": "More greenhouse gases slow outgoing energy loss until the climate readjusts."
        },
        {
          "q": "How is melting sea ice an amplifying feedback?",
          "a": [
            "Open water usually absorbs more sunlight than ice",
            "Open water always has higher albedo",
            "Sea ice cannot affect energy flows"
          ],
          "c": 0,
          "why": "Replacing reflective ice with dark water increases absorption."
        },
        {
          "q": "What separates natural greenhouse warming from human acceleration?",
          "a": [
            "Only one exists",
            "Human activities increase greenhouse gas levels beyond the natural background",
            "The natural effect started last decade"
          ],
          "c": 1,
          "why": "Natural warming is part of Earth's normal climate; added gases strengthen it."
        }
      ]
    },
    {
      "id": "u3-review",
      "n": "14",
      "title": "Energy & Light: Review and Investigation",
      "big": "Use evidence to trace energy from the Sun into surfaces, living systems and Earth's atmosphere—and explain where it transfers next.",
      "notes": [
        "Topic 1: explain conservation, potential/kinetic energy, resource trade-offs and incoming/outgoing energy.",
        "Topic 2: distinguish reflection, absorption, transmission, albedo and refraction. Use lab variables to support a fair test.",
        "Topic 3: rank the electromagnetic spectrum from radio to gamma, explain frequency/wavelength and identify sun-safety measures.",
        "Topic 4: connect photons captured in photosynthesis to stored sugars and declining energy availability across food-chain levels.",
        "Topic 5: distinguish the natural and human-accelerated greenhouse effects, and describe the role of infrared radiation and albedo feedback.",
        "In a strong scientific explanation, make a claim, cite a specific observation or model result, and explain why the evidence supports it.",
        "Class materials: student booklet pp. 2–19, Topic 1–5 practice, teacher-provided unit review and test outline."
      ],
      "terms": [
        [
          "Model limitation",
          "An aspect of a representation that leaves out real-world complexity."
        ],
        [
          "Evidence-based claim",
          "Conclusion supported by observations, calculations or established science."
        ]
      ],
      "work": "Create a one-page diagram connecting the Sun, an icy surface, a plant, a consumer and the atmosphere. Mark energy transfers using arrows. Use the Spectrum & Albedo Explorer and Energy Pathway Studio, then write a 5-sentence claim/evidence/explanation.",
      "check": [
        {
          "q": "Which is a valid chain of energy transformations?",
          "a": [
            "Sunlight → plant chemical energy → consumer movement and heat",
            "Sunlight → destroyed energy → food",
            "Heat → nothing"
          ],
          "c": 0,
          "why": "Sunlight can be stored by plants and later transferred through food webs."
        },
        {
          "q": "Which shows responsible model interpretation?",
          "a": [
            "Our simple model perfectly predicts local climate",
            "This model illustrates a pattern while leaving out real-world factors",
            "Models never need evidence"
          ],
          "c": 1,
          "why": "Models help explain processes but have defined limitations."
        }
      ]
    }
  ]
},
{
  "id": "earth",
  "n": "4",
  "name": "Earth Science: Earth's Interior and Tectonics",
  "status": "soon",
  "when": "March to May",
  "intro": "Explore how Earth's internal heat causes tectonic activity and how rivers, flooding and glaciers shape the surface, especially in Manitoba. Organized around the four topics in our Earth Science booklet.",
  "after": "Based on the Science 8 Unit 4 student booklet, Topics 1–4, and the matching teacher slides. Try the Earth Interior & Plate Boundary Explorer and the River & Watershed Lab. All models are conceptual, not measured reconstructions or forecasts.",
  "lessons": [
    {
      "id": "e1-spheres",
      "title": "Earth's Four Connected Systems",
      "big": "Earth's atmosphere, hydrosphere, lithosphere and biosphere interact. One event can affect several spheres.",
      "notes": [
        "Atmosphere: gases surrounding Earth; hydrosphere: water in all states; lithosphere: the rigid crust and uppermost mantle; biosphere: living things and their environments.",
        "A volcano can add ash to the air, melt nearby snow and ice, build new rock, and disrupt living habitats.",
        "An Earth system is not isolated. Track cause and effect between spheres.",
        "Booklet Topic 1: Earth's Systems. SCI.8.E.10."
      ],
      "terms": [
        [
          "Atmosphere",
          "Gases surrounding Earth."
        ],
        [
          "Hydrosphere",
          "All water, liquid, ice and vapour."
        ],
        [
          "Lithosphere",
          "The rigid outer rocky layer, including the crust and uppermost mantle."
        ],
        [
          "Biosphere",
          "Living things and where they live."
        ]
      ],
      "work": "Complete the four-spheres eruption chart in Topic 1. Explain one change that crosses from one sphere to another.",
      "check": [
        {
          "q": "Which sphere includes glaciers and water vapour?",
          "a": [
            "Hydrosphere",
            "Lithosphere",
            "Biosphere"
          ],
          "c": 0,
          "why": "All water in every state belongs to the hydrosphere."
        },
        {
          "q": "Ash changes the air and affects nearby plants. This shows…",
          "a": [
            "System interactions",
            "The atmosphere is separate from life",
            "No environmental change"
          ],
          "c": 0,
          "why": "An eruption can affect the atmosphere and biosphere."
        }
      ],
      "n": "1"
    },
    {
      "id": "e2-time",
      "title": "Geological Time and Dating Rocks",
      "big": "Earth is about 4.6 billion years old. Relative and radiometric dating provide different evidence about Earth's past.",
      "notes": [
        "Geology studies Earth's materials, structure and history across very long timescales.",
        "One million seconds is about 12 days; one billion seconds is about 32 years.",
        "Relative dating puts rock layers and events in order; in an undisturbed sediment sequence, lower layers were laid down first.",
        "Radiometric dating uses predictable radioactive decay to estimate a numerical age. Half-life is the time for half an original parent isotope to decay.",
        "Example: 8 g becomes 4 g after one half-life and 2 g after two. Real mineral dating involves additional evidence.",
        "Booklet Topic 1: Geological Time and Rock Dating."
      ],
      "terms": [
        [
          "Geology",
          "The study of Earth's materials, structure and history."
        ],
        [
          "Relative dating",
          "Ordering rocks or events from older to younger."
        ],
        [
          "Radiometric dating",
          "Estimating numerical ages using radioactive decay."
        ],
        [
          "Half-life",
          "Time for half of a radioactive isotope to decay."
        ]
      ],
      "work": "Compare a million and a billion seconds. Complete the Topic 1 half-life problem, then explain why a relative age is not an exact age.",
      "check": [
        {
          "q": "After two half-lives, how much of 8 g remains?",
          "a": [
            "4 g",
            "2 g",
            "0 g"
          ],
          "c": 1,
          "why": "8 → 4 → 2 g."
        },
        {
          "q": "Undisturbed lower sediment layers are generally…",
          "a": [
            "Older",
            "Younger",
            "Exactly two billion years old"
          ],
          "c": 0,
          "why": "Relative position gives order, not a numerical age."
        }
      ],
      "n": "2"
    },
    {
      "id": "e3-layers",
      "title": "Inside Earth: Four Major Layers",
      "big": "The crust, mantle, outer core and inner core have different materials and physical properties.",
      "notes": [
        "Crust: thin, solid rock at the surface. Oceanic crust is usually thinner and denser than continental crust.",
        "Mantle: thick region of mostly solid rock that deforms slowly over geological time; it is not an underground ocean of magma.",
        "Outer core: liquid iron-rich metal. Inner core: solid iron-rich metal despite intense heat, because of enormous pressure.",
        "Lithosphere means the rigid crust and uppermost mantle. Asthenosphere is the more slowly deforming region of upper mantle beneath it.",
        "Seismic waves help scientists infer layers without drilling to the centre. Models exaggerate the crust's thickness.",
        "Booklet Topic 1: Layers of the Earth. SCI.8.E.10."
      ],
      "terms": [
        [
          "Crust",
          "Earth's thin outer solid rocky layer."
        ],
        [
          "Mantle",
          "Mostly solid hot rock beneath the crust."
        ],
        [
          "Outer core",
          "Liquid iron-rich region around the inner core."
        ],
        [
          "Inner core",
          "Solid metal at Earth's centre."
        ],
        [
          "Asthenosphere",
          "Slowly deforming region within the upper mantle."
        ]
      ],
      "work": "Label the four layers. Explain crust versus lithosphere, then investigate each layer using the Earth Interior & Plate Boundary Explorer.",
      "check": [
        {
          "q": "Which major layer is liquid?",
          "a": [
            "Outer core",
            "Inner core",
            "Mantle"
          ],
          "c": 0,
          "why": "The iron-rich outer core is liquid."
        },
        {
          "q": "The lithosphere includes…",
          "a": [
            "Crust and rigid uppermost mantle",
            "Only the inner core",
            "An ocean of magma"
          ],
          "c": 0,
          "why": "Lithosphere is defined mechanically by rigidity."
        }
      ],
      "n": "3"
    },
    {
      "id": "e4-heat",
      "title": "Where Earth's Internal Heat Comes From",
      "big": "Leftover heat from Earth's formation and ongoing radioactive decay contribute to the heat that powers tectonic activity.",
      "notes": [
        "Earth grew by accretion as rocky material collided under gravity. Collisions and compression generated substantial heat.",
        "Some ancient formation heat remains; radioactive decay in rocks provides ongoing heating.",
        "Movement, compression and friction can produce additional heat, as described in the Grade 8 booklet.",
        "Heat moves outward from hotter regions to cooler areas. Earth's mantle remains mostly solid while deforming very slowly.",
        "The Sun powers most weather and the surface water cycle, while Earth's internal heat helps power tectonic processes.",
        "Booklet Topic 1: Internal Heat. SCI.8.E.11–12."
      ],
      "terms": [
        [
          "Accretion",
          "Growth as smaller pieces gather and collide."
        ],
        [
          "Radioactive decay",
          "Change in unstable atoms that releases energy."
        ],
        [
          "Internal heat",
          "Thermal energy stored and generated within Earth."
        ]
      ],
      "work": "Explain three heat sources listed in the booklet. Compare the Sun's surface effects with Earth's internal heat.",
      "check": [
        {
          "q": "Which produces ongoing heat within Earth?",
          "a": [
            "Radioactive decay",
            "Only daylight",
            "Human-made electricity"
          ],
          "c": 0,
          "why": "Natural radioactive decay releases energy in Earth."
        },
        {
          "q": "Which contrast is most accurate?",
          "a": [
            "Sun powers much surface weather; internal heat contributes to tectonics",
            "Sun directly heats Earth's core",
            "Earth never loses heat"
          ],
          "c": 0,
          "why": "Earth is heated by different energy sources that drive different processes."
        }
      ],
      "n": "4"
    },
    {
      "id": "e5-drift",
      "title": "Wegener's Continental Drift Evidence",
      "big": "Fossils, rocks, glacial clues and continent shapes suggest landmasses changed position over time.",
      "notes": [
        "Wegener proposed a former supercontinent called Pangaea and argued continents had moved apart.",
        "Matching fossils on widely separated continents support earlier land connections. Mesosaurus was a small freshwater reptile.",
        "Matching rocks and mountain chains line up when some continents are reconstructed.",
        "Ancient glacial deposits in now-warm regions form a more coherent pattern when landmasses are rearranged.",
        "Wegener lacked a convincing mechanism for movement. Later seafloor research supported plate tectonics.",
        "Booklet Topic 2: Continental Drift and Evidence. SCI.8.E.12."
      ],
      "terms": [
        [
          "Pangaea",
          "Ancient supercontinent containing most landmasses."
        ],
        [
          "Continental drift",
          "The idea that continents have changed position over time."
        ],
        [
          "Glacial evidence",
          "Deposits or scratches left behind by ancient moving ice."
        ]
      ],
      "work": "List four lines of drift evidence; use the Evidence tab of Earth Explorer and justify which line you think is strongest.",
      "check": [
        {
          "q": "Why do Mesosaurus fossils in South America and Africa matter?",
          "a": [
            "They suggest a former connection",
            "They prove reptiles could fly",
            "They disprove plate motion"
          ],
          "c": 0,
          "why": "Freshwater animals could not easily cross the modern Atlantic."
        },
        {
          "q": "What was missing from Wegener's original explanation?",
          "a": [
            "How continents move",
            "Any fossil evidence",
            "A map of Africa"
          ],
          "c": 0,
          "why": "He lacked a convincing movement mechanism."
        }
      ],
      "n": "5"
    },
    {
      "id": "e6-seafloor",
      "title": "Seafloor Spreading",
      "big": "New oceanic crust forms at ridges and older crust moves away—a key mechanism behind plate tectonics.",
      "notes": [
        "At a mid-ocean ridge, plates separate, magma cools and new oceanic crust may form.",
        "Ocean-floor rocks are typically youngest near spreading ridges and older away from them.",
        "Magnetic striping and rock ages provide evidence for the spreading process.",
        "At some convergent boundaries, old oceanic lithosphere subducts into the mantle, recycling it.",
        "The continents are parts of moving plates, not independent rafts floating on ocean water.",
        "Booklet Topic 2: Hypothesis to Theory and Seafloor Spreading. SCI.8.E.12."
      ],
      "terms": [
        [
          "Mid-ocean ridge",
          "Undersea mountain chain associated with spreading."
        ],
        [
          "Seafloor spreading",
          "Creation of new oceanic crust where plates move apart."
        ],
        [
          "Subduction",
          "One tectonic plate descending beneath another."
        ]
      ],
      "work": "Use the ocean-floor age map: locate the youngest Atlantic rock and write an explanation of what the age pattern indicates.",
      "check": [
        {
          "q": "Ocean-floor rock near a typical ridge is usually…",
          "a": [
            "Youngest",
            "Oldest",
            "Identical age everywhere"
          ],
          "c": 0,
          "why": "New material cools where plates move apart."
        },
        {
          "q": "Older oceanic lithosphere may be…",
          "a": [
            "Subducted",
            "Turned into sunlight",
            "Transported only by glaciers"
          ],
          "c": 0,
          "why": "Plate recycling occurs in subduction zones."
        }
      ],
      "n": "6"
    },
    {
      "id": "e7-plates",
      "title": "What Moves Tectonic Plates?",
      "big": "Plates are rigid sections of lithosphere that move slowly as Earth's interior loses heat.",
      "notes": [
        "Most plates move only a few centimetres each year. Manitoba lies well inside the North American Plate.",
        "Continental crust is generally less dense and thicker than oceanic crust.",
        "Convection is movement of heat through a slowly moving material; Earth's mantle deforms as solid rock rather than boiling like water.",
        "Other mechanisms, including sinking slabs and ridge-related forces, contribute to plate motion.",
        "At a constant illustrative rate of 2.5 cm/year, plates separate 25 kilometres in one million years.",
        "The boiling-pot model makes the principle visible but greatly exaggerates how liquid-like and fast mantle processes are.",
        "Booklet Topic 2: Tectonic Plates, Crust and Convection. SCI.8.E.12."
      ],
      "terms": [
        [
          "Tectonic plate",
          "A moving portion of Earth's lithosphere."
        ],
        [
          "Convection",
          "Transfer of heat by the movement of a substance."
        ],
        [
          "Slab pull",
          "Force associated with sinking dense lithosphere."
        ]
      ],
      "work": "Compare continental and oceanic crust; calculate 2.5 cm/year for 1 million years. Explain a limitation of the pot analogy.",
      "check": [
        {
          "q": "Where is Manitoba located?",
          "a": [
            "Inside the North American Plate",
            "At the Mid-Atlantic Ridge",
            "On the San Andreas Fault"
          ],
          "c": 0,
          "why": "Manitoba is well away from a plate edge."
        },
        {
          "q": "2.5 cm a year over one million years equals…",
          "a": [
            "25 km",
            "25 metres",
            "2,500 km"
          ],
          "c": 0,
          "why": "2.5 million cm is 25 km."
        }
      ],
      "n": "7"
    },
    {
      "id": "e8-boundaries",
      "title": "Divergent, Convergent and Transform Boundaries",
      "big": "The way plates interact helps explain ridges, mountains, volcanic arcs and earthquakes.",
      "notes": [
        "Divergent plates move apart; many mid-ocean ridges form here. Iceland lies along a spreading region.",
        "Convergent plates move toward one another. Some collide as continents; others form subduction zones.",
        "Transform plates slide horizontally past one another and often cause earthquakes.",
        "Ocean–ocean, ocean–continent and continent–continent convergences have different geological outcomes.",
        "The Earth Explorer models exaggerate motion and layer thickness to make patterns observable.",
        "Booklet Topic 2: Plate Boundaries. SCI.8.E.12."
      ],
      "terms": [
        [
          "Divergent",
          "Plate boundary with movement apart."
        ],
        [
          "Convergent",
          "Plate boundary with movement toward one another."
        ],
        [
          "Transform",
          "Plate boundary with sideways sliding."
        ]
      ],
      "work": "Label the three boundary diagrams. Use Earth Explorer to explain what a model shows and what it leaves out.",
      "check": [
        {
          "q": "Where does new oceanic crust commonly form?",
          "a": [
            "Divergent boundaries",
            "Transform boundaries",
            "All mountain summits"
          ],
          "c": 0,
          "why": "New crust forms at spreading ridges."
        },
        {
          "q": "The San Andreas Fault is mainly a…",
          "a": [
            "Transform boundary",
            "Hot spring",
            "Convergent volcanic arc"
          ],
          "c": 0,
          "why": "Two plates slide past one another there."
        }
      ],
      "n": "8"
    },
    {
      "id": "e9-mountains",
      "title": "Mountains and Faults",
      "big": "Rock deformation and movement at plate boundaries can uplift mountains and create faults.",
      "notes": [
        "At continental collisions like India–Eurasia, thickening and folding of crust helps form the Himalayas.",
        "Where an oceanic plate subducts beneath a continent, mountain belts and volcanic arcs may form, as in the Andes.",
        "A fault is a fracture in rock along which displacement has occurred.",
        "Faults often concentrate where plates interact but may also occur within plates.",
        "Uplift and erosion both influence the mountains we observe today.",
        "Booklet Topic 3: Mountains and Faults. SCI.8.E.12."
      ],
      "terms": [
        [
          "Fault",
          "Fracture in rock along which movement has happened."
        ],
        [
          "Uplift",
          "Raising part of Earth's crust."
        ],
        [
          "Convergence",
          "Motion of plates toward each other."
        ]
      ],
      "work": "Compare the Himalayas and the Andes with labelled diagrams. Explain which evidence indicates uplift and which suggests subduction.",
      "check": [
        {
          "q": "The Himalayas formed primarily through…",
          "a": [
            "Continental collision",
            "A modern flood",
            "A sea breeze"
          ],
          "c": 0,
          "why": "Collision thickens and raises continental crust."
        },
        {
          "q": "A fault is…",
          "a": [
            "A fracture where rock has moved",
            "Any bend in a river",
            "Only a volcanic vent"
          ],
          "c": 0,
          "why": "Faulting involves displacement along a fracture."
        }
      ],
      "n": "9"
    },
    {
      "id": "e10-volcano",
      "title": "Volcanoes and the Ring of Fire",
      "big": "Volcanoes reflect several melting processes and can occur at plate boundaries or hot spots.",
      "notes": [
        "Magma is molten rock beneath the surface. Once erupted onto the surface, it is called lava.",
        "At subduction zones, descending material carries water that encourages melting in the overlying mantle.",
        "At divergent boundaries, rising mantle and separation help magma form and reach the surface.",
        "Hot-spot volcanism can occur within a moving plate; Hawaii is an example.",
        "Many volcanoes surround the Pacific where subduction zones form an uneven 'Ring of Fire.'",
        "Volcano shapes and behaviour vary; not every volcano is a steep cone.",
        "Booklet Topic 3: Volcanoes. SCI.8.E.12."
      ],
      "terms": [
        [
          "Magma",
          "Molten rock below Earth's surface."
        ],
        [
          "Lava",
          "Molten rock at Earth's surface."
        ],
        [
          "Subduction zone",
          "Region where one plate descends beneath another."
        ],
        [
          "Hot spot",
          "Area of volcanism that can lie away from plate boundaries."
        ]
      ],
      "work": "Compare Iceland, Hawaii and a Pacific subduction volcano. Trace how melting begins in each setting.",
      "check": [
        {
          "q": "A volcanic hot-spot example is…",
          "a": [
            "Hawaii",
            "Every transform fault",
            "Lake Winnipeg"
          ],
          "c": 0,
          "why": "Hawaii is a well-known oceanic hot spot."
        },
        {
          "q": "Erupted molten rock is called…",
          "a": [
            "Lava",
            "A glacier",
            "Sediment"
          ],
          "c": 0,
          "why": "Magma becomes lava upon eruption."
        }
      ],
      "n": "10"
    },
    {
      "id": "e11-quakes",
      "title": "Earthquakes, Tsunamis and Evidence",
      "big": "Sudden fault movement releases seismic waves. Undersea disturbances can move seawater and generate tsunamis.",
      "notes": [
        "Rock can lock across a fault, allowing stress to build before a sudden slip.",
        "The focus is where rupture begins underground; the epicentre lies directly above it at Earth's surface.",
        "Earthquakes happen at different plate boundary types.",
        "A large undersea earthquake can displace water, creating a tsunami that travels across the ocean.",
        "A tsunami may be low in deep water and grow higher as it nears shallow coastlines.",
        "The student booklet connects First Nations oral histories of the 1700 Cascadia earthquake with geological evidence and records from Japan. Study these respectfully as complementary sources of knowledge.",
        "Booklet Topic 3: Earthquakes and Tsunamis. SCI.8.E.12."
      ],
      "terms": [
        [
          "Focus",
          "The underground point where an earthquake rupture begins."
        ],
        [
          "Epicentre",
          "Surface point directly above the focus."
        ],
        [
          "Seismic waves",
          "Waves carrying energy from earthquakes."
        ],
        [
          "Tsunami",
          "Waves from sudden displacement of a large amount of water."
        ]
      ],
      "work": "Label focus, epicentre and fault. Sequence the events of a tsunami; explain how different evidence contributes to understanding the 1700 Cascadia event.",
      "check": [
        {
          "q": "An earthquake rupture starts at…",
          "a": [
            "The focus",
            "Only the epicentre",
            "The stratosphere"
          ],
          "c": 0,
          "why": "The focus is underground where movement begins."
        },
        {
          "q": "A deep-ocean tsunami is often…",
          "a": [
            "Fast with relatively low wave height",
            "Always a 20-m wall of water",
            "Caused only by wind"
          ],
          "c": 0,
          "why": "Wave height often grows as the tsunami moves into shallower water."
        }
      ],
      "n": "11"
    },
    {
      "id": "e12-geothermal",
      "title": "Geysers and Hot Springs",
      "big": "Groundwater heated near hot rock can flow at hot springs or erupt when pressure builds in confined underground channels.",
      "notes": [
        "Rain and melted snow can soak underground and become groundwater.",
        "Hot rock or magma near the surface can heat groundwater until it rises as a hot spring.",
        "A geyser requires water, heat and underground passages that allow pressure to build.",
        "Most hot springs are not geysers because pressure can escape without erupting.",
        "Iceland has accessible geothermal resources near active volcanic areas; Manitoba is far from an active plate boundary.",
        "Booklet Topic 3: Geysers & Hot Springs. SCI.8.E.12."
      ],
      "terms": [
        [
          "Groundwater",
          "Water in pore spaces and cracks underground."
        ],
        [
          "Hot spring",
          "Natural outflow of geothermally heated water."
        ],
        [
          "Geyser",
          "A hot spring that erupts intermittently under the right conditions."
        ]
      ],
      "work": "Explain why geysers are rarer than hot springs. Compare Iceland's geothermal use with typical conditions in Manitoba.",
      "check": [
        {
          "q": "A geyser needs what besides water and heat?",
          "a": [
            "Restricted underground plumbing",
            "A new moon",
            "An ocean iceberg"
          ],
          "c": 0,
          "why": "Pressure must accumulate to power an eruption."
        },
        {
          "q": "Why is geothermal heating especially accessible in Iceland?",
          "a": [
            "Active volcanic regions near a plate boundary",
            "A complete lack of groundwater",
            "Its deep-frozen core"
          ],
          "c": 0,
          "why": "Volcanic rock near the surface heats underground water."
        }
      ],
      "n": "12"
    },
    {
      "id": "e13-rivers",
      "title": "Weathering, Erosion, Deposition and Rivers",
      "big": "Flowing water shapes land by breaking down, moving and depositing sediments.",
      "notes": [
        "Weathering breaks down rock in place. Erosion moves material; deposition drops it in a new location.",
        "Freeze–thaw weathering may widen rock cracks where water freezes and expands.",
        "Faster river water can typically move more or larger sediment, but actual transport depends on grain and channel conditions.",
        "Water usually erodes the outside of a meander bend and deposits sediment on the inside.",
        "Sediment dropped where a river slows upon reaching a lake or sea can form a delta.",
        "Booklet Topic 4: Weathering, Erosion & Deposition; Precipitation & Rivers. SCI.8.E.14."
      ],
      "terms": [
        [
          "Weathering",
          "Breakdown of rock in place."
        ],
        [
          "Erosion",
          "Removal and transport of sediment."
        ],
        [
          "Deposition",
          "Dropping transported sediment."
        ],
        [
          "Meander",
          "A bend in a river."
        ],
        [
          "Delta",
          "Land built by deposited sediment at a river mouth."
        ]
      ],
      "work": "Label a meander's outer eroding bank and inner depositing bank. Open the River & Watershed Lab and describe what changed and why.",
      "check": [
        {
          "q": "What often happens on the outside of a river bend?",
          "a": [
            "More erosion",
            "Always deposition",
            "No moving water"
          ],
          "c": 0,
          "why": "The outside of a bend typically has faster flow and greater erosion."
        },
        {
          "q": "Deposition is…",
          "a": [
            "Sediment being dropped",
            "Magma solidifying in the core",
            "Water evaporating"
          ],
          "c": 0,
          "why": "Sediment settles as a river loses carrying capacity."
        }
      ],
      "n": "13"
    },
    {
      "id": "e14-watersheds",
      "title": "Watersheds and Red River Flooding",
      "big": "Watersheds channel water toward rivers and lakes; geography, snowmelt and infrastructure influence flood risk.",
      "notes": [
        "A watershed is land draining to a shared water body. It can cross provincial and international borders.",
        "The Lake Winnipeg drainage basin includes parts of the Canadian Prairies and northern United States; water ultimately leaves through the Nelson River toward Hudson Bay.",
        "The Red River flows north from the United States to Lake Winnipeg through a broad, flat floodplain.",
        "Spring thaw, heavy snow, rapid runoff and ice still present downstream can worsen flooding.",
        "The Red River Floodway diverts some water around Winnipeg during many major flood events, reducing flood levels in protected areas. It does not eliminate all flooding.",
        "Booklet Topic 4: Watersheds and Flooding. SCI.8.E.14."
      ],
      "terms": [
        [
          "Watershed",
          "Land that drains to the same river or lake."
        ],
        [
          "Runoff",
          "Water flowing over land toward streams."
        ],
        [
          "Floodplain",
          "Flat land beside a river that can flood."
        ],
        [
          "Floodway",
          "Engineered channel to divert high river flows."
        ]
      ],
      "work": "Study the booklet's Lake Winnipeg watershed map and Floodway graph. Explain Red River flooding with three causes and one mitigation. Experiment with the River & Watershed Lab.",
      "check": [
        {
          "q": "The Red River generally flows toward Lake Winnipeg…",
          "a": [
            "North",
            "South",
            "Into the Pacific"
          ],
          "c": 0,
          "why": "The Red River runs north."
        },
        {
          "q": "Which factor can worsen spring flooding?",
          "a": [
            "Flat land with large snowmelt runoff",
            "No snow anywhere",
            "No connection to precipitation"
          ],
          "c": 0,
          "why": "Runoff and low gradient can cause water to spread over a floodplain."
        }
      ],
      "n": "14"
    },
    {
      "id": "e15-glaciers",
      "title": "Glaciers and the Ice-Age Landscape of Manitoba",
      "big": "Moving glaciers can scrape and transport rock; melting ice deposits sediment and helped form Manitoba's landforms.",
      "notes": [
        "Glaciers form where accumulated land snow compacts into flowing ice.",
        "Rocks trapped under the ice can abrade bedrock and leave striations showing the direction of ice motion.",
        "Glaciers can carve U-shaped valleys; many rivers cut V-shaped valleys.",
        "Ice leaves behind clay, sand, gravel and boulders when it melts.",
        "The Laurentide Ice Sheet covered Manitoba. As it retreated, meltwater formed glacial Lake Agassiz, leaving extensive sediments.",
        "The Canadian Shield's exposed, scoured bedrock and thousands of lakes reflect long-term glacial processes.",
        "Booklet Topic 4: Glaciers and Manitoba Was Shaped by Ice. SCI.8.E.14."
      ],
      "terms": [
        [
          "Glacier",
          "Large mass of slowly moving land ice."
        ],
        [
          "Striation",
          "Scratch left in rock by material dragged under ice."
        ],
        [
          "Lake Agassiz",
          "Large former glacial lake that covered part of central North America."
        ],
        [
          "Glacial deposition",
          "Sediment left behind as ice melts."
        ]
      ],
      "work": "Compare a U-shaped glacial valley with a V-shaped river valley. Use the booklet's map to explain two Manitoba glacial features.",
      "check": [
        {
          "q": "Parallel scratches in bedrock may be caused by…",
          "a": [
            "Stones dragged under glacial ice",
            "Heat from the Sun drawing lines",
            "Only flowing lava"
          ],
          "c": 0,
          "why": "Glacial abrasion can leave striations."
        },
        {
          "q": "Which former lake helped shape southern Manitoba?",
          "a": [
            "Lake Agassiz",
            "Lake Baikal",
            "Lake Victoria"
          ],
          "c": 0,
          "why": "Glacial Lake Agassiz left widespread sediments."
        }
      ],
      "n": "15"
    },
    {
      "id": "e16-review",
      "title": "Earth Science Unit Review and Evidence Challenge",
      "big": "Connect Earth's interior, tectonic activity, water and ice into explanations supported by observations and models.",
      "notes": [
        "Topic 1: Connect the four spheres; describe Earth's layered structure and sources of internal heat.",
        "Topic 2: Explain continental-drift evidence, seafloor spreading and three plate boundaries.",
        "Topic 3: Distinguish processes causing mountains, volcanoes, earthquakes, tsunamis and geothermal features.",
        "Topic 4: Explain weathering, erosion, deposition, rivers, watersheds, the Red River and glaciation.",
        "A strong scientific explanation makes a claim, cites observations or measured evidence, explains the mechanism and acknowledges a model limitation.",
        "Review Earth Explorer plus River & Watershed Lab; compare the diagrams against booklet source maps and descriptions."
      ],
      "terms": [
        [
          "Model limitation",
          "Something a representation leaves out or simplifies."
        ],
        [
          "Scientific claim",
          "Explanation supported with evidence and reasoning."
        ],
        [
          "Earth-system connection",
          "An effect involving two or more spheres."
        ]
      ],
      "work": "Choose a Manitoba landform or event. Create a concept map of at least three connected Earth processes, then write a five-sentence claim/evidence/reasoning explanation.",
      "check": [
        {
          "q": "Which sequence describes a sediment journey?",
          "a": [
            "Weathering, erosion, deposition",
            "Deposition, combustion, sunlight",
            "Fault, electricity, steam"
          ],
          "c": 0,
          "why": "Sediment is broken down, carried and may be dropped."
        },
        {
          "q": "A good model should…",
          "a": [
            "Explain a mechanism while identifying limitations",
            "Always perfectly predict natural events",
            "Be treated as a photograph"
          ],
          "c": 0,
          "why": "Scale and missing real-world complexity must be acknowledged."
        },
        {
          "q": "Manitoba's landscape reflects…",
          "a": [
            "Glaciers and river processes",
            "Only active volcanoes",
            "Only weather this year"
          ],
          "c": 0,
          "why": "Ice, meltwater, deposition and rivers helped shape the province."
        }
      ],
      "activity": {
        "title": "Build a scientific explanation",
        "context": "Use your booklet, the Earth Explorer and River & Watershed Lab. Save your work before leaving this page.",
        "prompts": [
          {
            "label": "My claim about how Earth changes",
            "hint": "A specific statement about water, ice or tectonics."
          },
          {
            "label": "Observation or evidence 1",
            "hint": "Use a diagram, map or booklet example."
          },
          {
            "label": "Observation or evidence 2",
            "hint": "Use a different kind of evidence."
          },
          {
            "label": "How do the observations support my claim?",
            "hint": "Connect your claim to the physical process."
          },
          {
            "label": "One important limitation of my model or evidence",
            "hint": "What is simplified, missing or uncertain?"
          }
        ],
        "checklist": [
          "Specific claim",
          "Two evidence points",
          "Cause-and-effect explanation",
          "Model limitation"
        ]
      },
      "n": "16"
    }
  ]
}
  ]
};
