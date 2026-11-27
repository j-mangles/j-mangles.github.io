// Each column follows one topic from the Grade 8 Cells and Systems review booklet.
const systemsBoard = {
  categories: [
    {name: "Cell division", qs: [
      {q: "A scraped knee heals as new skin cells form. Where do those new cells come from?", a: "Existing skin cells divide to produce new cells."},
      {q: "A student says a growing child keeps the same number of cells, all getting bigger. What process is missing?", a: "Cell division increases the number of cells as the body grows."},
      {q: "Why does a cell copy its DNA before it divides?", a: "Each daughter cell needs a complete set of instructions."},
      {q: "An amoeba divides into two. A skin cell also divides into two. What is different about the result for each organism?", a: "The amoeba produces two independent organisms. The new skin cells remain parts of one multicellular organism."},
      {q: "Cells at the edge of a small cut divide. Later the gap closes. Why is controlling when division stops as important as starting it?", a: "Division replaces missing cells. Once the tissue is repaired, continued uncontrolled division can produce a mass of extra cells."}
    ]},
    {name: "Specialized cells", qs: [
      {q: "What do we call the process by which a cell develops a particular structure and job?", a: "Differentiation."},
      {q: "A cell has a long extension that carries messages between distant parts of the body. Which type of cell fits this clue?", a: "A nerve cell. Its long extension carries signals over a distance."},
      {q: "A muscle cell shortens. A red blood cell carries oxygen. Explain one advantage of having both kinds of cells.", a: "The two jobs can happen at the same time. Red blood cells deliver oxygen while muscle cells use energy to contract."},
      {q: "A stem cell produces more stem cells as well as cells with a particular job. Name its two abilities.", a: "It can renew itself by dividing, and its descendants can differentiate into specialized cells."},
      {q: "Would a stem cell in adult blood-forming tissue normally make all the same cell types as an early embryonic stem cell? Explain.", a: "No. The adult stem cell usually produces a limited range of related cells, such as blood cells. An embryonic stem cell can give rise to a much wider range."}
    ]},
    {name: "Levels of organization", qs: [
      {q: "Many similar cells work together to do one job. Which level of organization is this?", a: "A tissue."},
      {q: "Put these in order from smallest to largest: organ system, cell, organism, tissue, organ.", a: "Cell, tissue, organ, organ system, organism."},
      {q: "A heart contains muscle tissue, nervous tissue and other tissues. Why do we call the heart an organ?", a: "Different tissues work together in the heart to pump blood."},
      {q: "A student writes “cardiac muscle cell, cardiac muscle tissue, circulatory system, person.” Which level is missing? Give the example that belongs there.", a: "The organ level is missing. The heart belongs between cardiac muscle tissue and the circulatory system."},
      {q: "A heart’s muscle cells contract less strongly. Connect that change at the cell level to a possible effect elsewhere in the body.", a: "Weaker contractions can make the heart pump less blood, so working tissues may receive less oxygen."}
    ]},
    {name: "Body systems", qs: [
      {q: "Which system includes the skin and forms an outer protective barrier?", a: "The integumentary system."},
      {q: "Which two organs form the central nervous system?", a: "The brain and spinal cord."},
      {q: "Air has reached the lungs. What must happen before its oxygen can travel to a toe?", a: "Oxygen moves from the lung air sacs into nearby capillaries. Blood carries it towards the toe."},
      {q: "Food has been broken down into small nutrient molecules. Where do many of them enter the blood, and which system takes them onwards?", a: "Many nutrients cross the lining of the small intestine into capillaries. The circulatory system carries them to cells."},
      {q: "After exercise, sweat evaporates from a runner’s skin. Which body condition does this help regulate, and what is the name for keeping internal conditions in a suitable range?", a: "Evaporation helps lower body temperature. Maintaining internal conditions within a suitable range is homeostasis."}
    ]},
    {name: "Circulation", qs: [
      {q: "Blood is a fluid containing cells and cell fragments. What is the liquid part called?", a: "Plasma."},
      {q: "Match each job to a blood component: carries oxygen, helps fight infection, helps form a clot.", a: "Red blood cells carry oxygen, white blood cells help fight infection, and platelets help form clots."},
      {q: "A blood vessel has walls just one cell thick and runs beside muscle cells. Which vessel is it, and what does the thin wall allow?", a: "A capillary. Its thin wall allows materials such as oxygen and carbon dioxide to move between blood and tissue."},
      {q: "A vessel takes oxygen-poor blood from the heart to the lungs. Is it an artery or a vein? Which clue settles it?", a: "It is the pulmonary artery. Arteries carry blood away from the heart. Oxygen level alone does not identify the vessel."},
      {q: "Blood has just returned from the lungs to the left atrium. Trace its route through the heart to a leg muscle, naming the next chamber, the main artery and the exchange vessels.", a: "Left atrium, left ventricle, aorta, arteries towards the leg, then muscle capillaries. Oxygen moves from the blood into the muscle cells."}
    ]}
  ],
  final: {
    cat: "Two exchanges, one journey",
    q: "A red blood cell leaves a leg muscle carrying less oxygen than before. Trace it through the heart to the lungs and back to the heart. Where does it pick up oxygen again?",
    a: "From the leg, blood returns through veins and the inferior vena cava to the right atrium, then the right ventricle. The pulmonary artery takes it to lung capillaries. Oxygen diffuses in from the air sacs. Pulmonary veins return the blood to the left atrium.",
    note: "An explanation should locate the oxygen pickup in the lung capillaries and show the right side of the heart before the lungs and the left side afterwards."
  }
};
