/* Based on Systems booklet Topic 6 and the two traces in Follow a Nutrient. */
window.lessonChallenge = {
  gameTitle: "Trace the Bite", testTitle: "Digestion and Absorption Test",
  unit: "Grade 8 Science · Cells and Systems", file: "digestion-review",
  role: ["Trace reader", "Route checker"],
  intro: "One partner reads the observation and chooses an explanation. The other uses a new clue to decide what happens next. Switch jobs after each round.",
  note: "You are following two parts of wholegrain bread: starch that can be digested into glucose, and fibre that stays undigested in this model.",
  columns: ["Stop on the route", "Observation"],
  rounds: [
    {
      title: "A bite changes shape",
      rows: [["Mouth", "A large piece becomes several smaller pieces."], ["Oesophagus", "The pieces move toward the stomach."]],
      first: {prompt:"Which action explains the change in the mouth?", options:["Glucose crosses the lining","Teeth break the food into pieces","Blood carries the pieces away"], key:1, why:"Chewing changes the size of the pieces. Food is still inside the digestive tract."},
      update: "The food has been swallowed. A partner draws an arrow straight from the oesophagus to the small intestine.",
      second: {prompt:"Which stop belongs between them?", options:["Stomach","Large intestine","Capillary"], key:0, why:"Muscles move the food down the oesophagus to the stomach before it enters the small intestine."}
    },
    {
      title: "Mixed in the stomach",
      rows: [["Stomach", "Muscles churn the food and mix it with acid."]],
      first: {prompt:"Which caption fits the observation?", options:["Most nutrients have entered the blood","All the fibre has become glucose","Food is being broken down"], key:2, why:"Acid and muscular movement help break food down in the stomach. The observation shows digestion."},
      update: "The mixture enters the small intestine. A glucose molecule passes across its lining into a capillary.",
      second: {prompt:"What changed when the glucose crossed?", options:["It became undigested fibre","It moved from the gut into the blood","It returned to the stomach"], key:1, why:"Crossing the intestinal lining into blood is absorption. The glucose can now travel beyond the digestive tract."}
    },
    {
      title: "One bite, two routes",
      rows: [["Small intestine", "A glucose marker and an undigested fibre marker are both inside the gut."]],
      first: {prompt:"Which marker should appear in a nearby capillary?", options:["The glucose marker","The undigested fibre marker","Both markers together"], key:0, why:"Glucose can cross the small-intestine lining into blood. The undigested fibre stays inside the gut."},
      update: "A classmate puts the fibre marker in a muscle cell because it came from the same bite.",
      second: {prompt:"Where should the fibre marker go instead?", options:["Back along the oesophagus","Through a capillary to the liver","Along the gut to the large intestine"], key:2, why:"The two parts share the first part of the route. Undigested fibre continues along the digestive tract."}
    },
    {
      title: "A delivery to the muscle",
      rows: [["Intestinal capillary", "Glucose is in the blood."], ["Muscle cell", "The same glucose arrives later."]],
      first: {prompt:"Which system connects these observations?", options:["Nervous system","Circulatory system","Integumentary system"], key:1, why:"Blood transports absorbed glucose from the intestine to tissues such as muscle."},
      update: "The team has one more arrow to add after the glucose reaches the muscle cell.",
      second: {prompt:"Which ending fits this trace?", options:["The cell sends the original bite to the stomach","The glucose has to become fibre again","The cell can use glucose to release energy"], key:2, why:"A muscle cell can use delivered glucose to release energy for its work."}
    },
    {
      title: "What the last stop can tell us",
      rows: [["Large intestine", "The fibre marker is still inside the gut."], ["Remaining contents", "Some water is absorbed here."]],
      first: {prompt:"Which conclusion do these observations support?", options:["Undigested material can reach the large intestine","Most glucose enters blood at this stop","The original bite travelled through the blood"], key:0, why:"Fibre can remain in the gut while some water is absorbed from the remaining contents."},
      update: "Another team draws a single route: small intestine, bloodstream, large intestine. They want it to represent both markers.",
      second: {prompt:"Which edit fixes their drawing?", options:["Exchange the first and last stops","Split the arrows at the small intestine","Move the stomach after the bloodstream"], key:1, why:"Draw one arrow across the lining for glucose and another along the gut for undigested fibre."}
    }
  ],
  cases: [
    {
      title:"Two unlabelled markers",
      rows:[["Marker P","Appears in a capillary beside the small intestine, then at a muscle."],["Marker Q","Stays in the gut and later appears in the large intestine."]],
      questions:[
        {prompt:"Which labels fit the observations?",options:["P is fibre and Q is glucose","Both are undigested fibre","P is glucose and Q is undigested fibre","Both are glucose carried in blood"],key:2},
        {prompt:"Which observation gives direct evidence of absorption?",options:["P crosses from inside the gut into the capillary","The same bite contained P and Q","Q moves along the large intestine","Food is churned in the stomach"],key:0}
      ],
      write:"A student drew one continuous route for P and Q. Describe where to divide the route and use one observation for each new arrow.",
      criteria:["Identify where the routes separate.","Connect P’s capillary observation to transport to muscle.","Connect Q’s observation to movement along the gut."]
    },
    {
      title:"Check the labels on a class diagram",
      rows:[["Label A","The stomach churns a bite and mixes it with acid."],["Label B","The large intestine absorbs some water from the remaining material."]],
      questions:[
        {prompt:"Which process does label A illustrate?",options:["Elimination of waste","Delivery to muscle","Absorption into blood","Digestion in the stomach"],key:3},
        {prompt:"What belongs beside label B?",options:["All the starch first becomes glucose here","Undigested fibre can still be inside the gut here","All of the original food has entered blood here","The next stop for the fibre is a muscle capillary"],key:1}
      ],
      write:"A partner says, “The stomach breaks food down, so it must also be where most glucose enters the blood.” Use the diagram and explain the missing step between the stomach and a body cell.",
      criteria:["Describe what the stomach does to food.","Locate glucose absorption and name the boundary it crosses.","Explain how the absorbed glucose reaches a body cell."]
    }
  ]
};
