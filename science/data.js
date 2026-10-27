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
   intro:"Explore matter through density, temperature, viscosity, pressure, phase changes and the unusual properties of water. Predict, measure, explain and test with models.",
   after:"The Density Studio on this unit page is a simplified model: it assumes a solid object in freshwater with density 1 g/cm³. Investigations should be connected to classroom observations and experiments.",
   lessons:[
    {id:"m1",n:"1",title:"What Is Density?",
     big:"Density describes how much mass is packed into a given volume. Density = mass ÷ volume.",
     notes:[
      "Mass is the amount of matter in an object (g). Volume is the space it takes up (cm³ or mL).",
      "Density = mass (g) ÷ volume (cm³), written d = m/v. Units: g/cm³.",
      "Example: 180 g in 60 cm³ has a density of 180 ÷ 60 = 3 g/cm³.",
      "Two objects can have the same size but different masses; the heavier one is denser.",
      "To rearrange: mass = density × volume; volume = mass ÷ density. Always include units and check reasonableness."
     ],
     table:{title:"Density calculations",head:["Mass","Volume","Density"],rows:[["60 g","100 cm³","0.6 g/cm³"],["120 g","60 cm³","2 g/cm³"],["240 g","80 cm³","3 g/cm³"]]},
     terms:[["Mass","Amount of matter in an object."],["Volume","Space occupied by an object."],["Density","Mass per unit volume."],["Displacement","Liquid moved aside by a submerged object, used to measure its volume."]],
     work:"Use the Density Studio in this unit. Calculate density for 120 g/80 cm³, 225 g/75 cm³ and 90 g/150 cm³. Explain which is most dense.",
     check:[
      {q:"An object has mass 180 g and volume 60 cm³. Its density is…",a:["3 g/cm³","120 g/cm³","0.33 g/cm³"],c:0,why:"180 ÷ 60 = 3 g/cm³."},
      {q:"Two blocks have equal volume but different mass. The one with more mass is…",a:["Less dense","More dense","Always the same density"],c:1,why:"Density = mass ÷ volume."}
     ]},
    {id:"m2",n:"2",title:"Floating, Sinking and Designing a Fair Test",
     big:"A solid object tends to float in a fluid when its average density is lower than the fluid's density.",
     notes:[
      "Freshwater has density close to 1 g/cm³ under ordinary classroom conditions; this is an approximation.",
      "A solid block with density 0.6 g/cm³ will float; a solid block with density 2 g/cm³ will sink in freshwater.",
      "A floating object displaces enough water for the upward buoyant force to balance its weight.",
      "Shape matters through the overall volume of displaced water: a hollow metal boat can float even though solid metal is denser than water.",
      "For a fair test of materials, keep the liquid and conditions similar, measure mass and volume carefully, and record results."
     ],
     terms:[["Buoyancy","Upward force exerted by a fluid."],["Average density","Total mass divided by total volume of an object, including any trapped air."]],
     work:"Use the Density Studio presets and choose Float or Sink before revealing. Then design a fair test for three classroom objects and describe what you would measure.",
     check:[
      {q:"A solid block is 0.8 g/cm³ in freshwater (~1 g/cm³). It will generally…",a:["Float","Sink"],c:0,why:"It is less dense than the water."},
      {q:"Why can a steel ship float?",a:["Steel is less dense than water","The whole ship, including air, has a low average density","Ships have no mass"],c:1,why:"The hull displaces water and contains air, reducing overall average density."}
     ]},
    {id:"m3",n:"3",title:"Temperature and Density",
     big:"Heating usually spreads particles farther apart, increasing volume and lowering density; water is an important exception near freezing.",
     notes:[
      "When matter warms, particles generally move faster and many substances expand. If mass stays the same and volume increases, density decreases.",
      "Warm air is generally less dense than cool air at the same pressure. This helps explain convection.",
      "Water behaves unusually: liquid water is densest around 4°C, and ice is less dense than liquid water.",
      "Because ice floats, it forms a top layer that insulates the water below and helps aquatic life survive winter.",
      "Particle diagrams show spacing and movement, not literal particle size changes."
     ],
     terms:[["Thermal expansion","Increase in volume associated with warming."],["Convection","Movement of fluids driven by density differences."],["Anomalous expansion of water","Water expands as it freezes, making ice less dense than liquid water."]],
     work:"Sketch particle models of a heated gas and cooled gas. Explain why ice floats and predict how heating most liquids changes density.",
     check:[
      {q:"Mass stays constant; volume increases. What happens to density?",a:["Increases","Decreases","Stays the same"],c:1,why:"The same mass is spread through more volume."},
      {q:"Why does ice float on liquid water?",a:["Ice is less dense","Ice has no mass","Water molecules disappear"],c:0,why:"Water forms a more open structure when freezing."}
     ]},
    {id:"m4",n:"4",title:"Viscosity: Why Do Some Fluids Flow Slowly?",
     big:"Viscosity is resistance to flow. Honey typically flows more slowly than water under similar conditions.",
     notes:[
      "High-viscosity fluids resist flowing; low-viscosity fluids flow more easily.",
      "Viscosity is a property of fluids, including liquids and gases.",
      "For many liquids, warming decreases viscosity. Warm syrup flows more easily than cold syrup.",
      "A fair comparison uses the same ramp angle, sample amount, surface, starting line and measurement method.",
      "Density and viscosity are different. A fluid can be dense but still flow fairly easily."
     ],
     terms:[["Viscosity","Resistance of a fluid to flowing."],["Fluid","A substance that flows, such as a liquid or gas."]],
     work:"Plan or conduct a water-versus-syrup ramp test. Identify the independent, dependent and three controlled variables. Predict the effect of warming the syrup.",
     check:[
      {q:"Which is a measure of resistance to flow?",a:["Density","Viscosity","Mass"],c:1,why:"Viscosity describes how easily a fluid flows."},
      {q:"What typically happens when syrup is warmed?",a:["It flows more easily","It always becomes solid","Its mass disappears"],c:0,why:"For many liquids, viscosity decreases with temperature."}
     ]},
    {id:"m5",n:"5",title:"Temperature, Pressure and Compressibility",
     big:"Particle motion and spacing help explain changes in gas pressure, volume and temperature.",
     notes:[
      "Particles of gases are farther apart than particles of liquids or solids, so gases are much more compressible.",
      "If the volume of a sealed gas is held fixed, heating it usually raises pressure because particles collide more energetically with the container walls.",
      "If pressure remains roughly constant, heating a gas tends to increase its volume.",
      "Liquids are far less compressible than gases under everyday conditions.",
      "Water may be ice, liquid water, or water vapour depending on temperature and pressure; 'steam' commonly refers to water vapour, which is invisible, although visible mist contains tiny droplets."
     ],
     terms:[["Pressure","Force acting per unit area."],["Compressible","Can have its volume decreased substantially under pressure."],["Water vapour","Water in the gas state."]],
     work:"Draw a sealed syringe before and after compression, and explain how the particle spacing and pressure change. Explain a sealed-container heating example.",
     check:[
      {q:"Which is easiest to compress?",a:["Air","Liquid water","Ice"],c:0,why:"Gas particles have much more empty space between them."},
      {q:"Heat a sealed rigid gas container. Pressure usually…",a:["Goes up","Goes to zero","Cannot change"],c:0,why:"At fixed volume, warmer particles collide with the walls more energetically."}
     ]},
    {id:"m6",n:"6",title:"Changing State: Energy and Particle Attractions",
     big:"Particles attract each other. Adding energy can increase temperature or change a substance's state.",
     notes:[
      "Melting, freezing, boiling and condensation involve changing particle arrangements and attractions.",
      "During melting or boiling of a pure substance at a constant pressure, added energy goes toward changing state rather than raising temperature during the transition.",
      "Stronger attractive forces between particles generally require more energy to separate them during phase changes.",
      "A cooling curve can show flat sections when condensation or freezing occurs.",
      "Particles do not vanish during phase changes: matter is conserved in a closed system."
     ],
     terms:[["Phase change","A change of state, such as melting or evaporation."],["Melting point","Temperature at which solid and liquid phases coexist at a given pressure."],["Boiling point","Temperature at which a liquid boils at a given pressure."]],
     work:"Sketch a heating curve with two flat sections. Label solid, melting, liquid, boiling and gas; explain where energy goes.",
     check:[
      {q:"During boiling of pure water at a fixed pressure, added energy mainly…",a:["Raises the temperature without limit","Changes water from liquid to gas","Destroys water particles"],c:1,why:"Energy supports the phase change while temperature stays roughly constant."},
      {q:"If particle attractions are stronger, separating particles generally requires…",a:["Less energy","More energy","No energy"],c:1,why:"More energy is needed to overcome stronger attractions."}
     ]},
    {id:"m7",n:"7",title:"Why Is Water So Important?",
     big:"Water's unusual density, heat capacity and ability to dissolve substances help shape climate and sustain life.",
     notes:[
      "Water has a high specific heat capacity: it can absorb or release considerable energy with a relatively small temperature change.",
      "Ice is less dense than liquid water. Floating ice insulates lakes in winter.",
      "Water is often called a 'universal solvent' because it dissolves many substances, but it does not dissolve everything.",
      "Water carries dissolved nutrients and wastes through organisms and the environment.",
      "Evaporation, condensation, humidity and precipitation help move water and energy around Earth."
     ],
     terms:[["Heat capacity","Amount of energy needed to change an object's temperature."],["Solvent","A substance that dissolves another substance."],["Humidity","Amount of water vapour in air."],["Precipitation","Water falling from the atmosphere, such as rain or snow."]],
     work:"Write a short explanation: How do three unusual water properties support living things or affect Manitoba's climate? Include a specific example for each.",
     check:[
      {q:"Which property helps large lakes moderate nearby temperatures?",a:["Water's high specific heat capacity","Water's colour","Water has no density"],c:0,why:"Water absorbs and releases energy slowly compared with many materials."},
      {q:"Why is 'universal solvent' a nickname, not a literal claim?",a:["Water dissolves many but not all substances","Water dissolves nothing","Water turns all substances into gases"],c:0,why:"Oil, for example, does not simply dissolve in water."}
     ]}
   ]
  },
  {
  "id": "light",
  "n": "3",
  "name": "Solar Energy and Light",
  "status": "soon",
  "when": "February to March",
  "intro": "Energy & Light: five topics, 24-class teaching plan, existing Spectrum & Albedo Explorer, and a food-chain energy investigation.",
  "after": "Student booklet pages 2–19 and five topic slide decks match this learning sequence. The 14 study guides group multiple class periods, rather than replacing the teacher's full 24-class schedule. Models are simplified; your teacher provides any printed assignments and labs.",
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
  {id:"earth", n:"4", name:"Earth's Interior and Tectonics", status:"soon", when:"March to May",
   intro:"What's under our feet: layers of the Earth, plate tectonics, earthquakes and volcanoes."}
  ]
};
