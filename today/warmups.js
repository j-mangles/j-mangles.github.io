/* Five-minute reviews for the board. Diagram keys refer to the Egypt atlas.
   Science images are from the Cells and Systems lessons and their class slides. */
(function (g) {
  "use strict";

  const egypt = {
    l1: {
      diagram: "flood", description: "The river starts rising in June, rises sharply over the summer, peaks in October and falls again.",
      recall: "What did floodwater leave on farmland when it receded?",
      interpret: "Point to a month when a farmer might have to wait to sow seed. What change in the river would the farmer watch for?",
      answer: "The flood left fertile silt. October is a good example. The graph shows the river at its peak. A farmer would wait for the water to retreat and expose the wet soil."
    },
    l2: {
      diagram: "kingdoms", description: "Unification is marked around 3100 BCE. Two Intermediate Periods separate the Old, Middle and New Kingdoms.",
      recall: "Which two regions did the king’s red and white crowns represent?",
      interpret: "A visitor says Egypt stayed united for 3,000 years. Which two breaks on the timeline would change their mind?",
      answer: "The red crown represented Lower Egypt and the white crown represented Upper Egypt. The First and Second Intermediate Periods mark times when rival regions held power."
    },
    l3: {
      diagram: "pyramids", description: "The first tomb has a flat roof, the second rises in six narrowing steps and the third has smooth sloping sides.",
      recall: "What purpose did a royal pyramid serve?",
      interpret: "Trace the outline of Djoser’s tomb. How did its builders adapt the earlier mastaba design?",
      answer: "A pyramid was a royal tomb. Djoser’s builders stacked smaller mastaba-like levels on top of wider ones, creating a stepped shape."
    },
    l4: {
      diagram: "mummy", description: "During mummification, several organs were removed. The heart remained in the body. The body was dried in natron and wrapped.",
      recall: "What did ancient Egyptians believe happened during the weighing of the heart?",
      interpret: "Which step in the diagram fits that belief? Explain why the heart was treated differently from the other organs shown.",
      answer: "Egyptians believed that a person’s heart was weighed against the feather of Ma’at in the afterlife. Embalmers left the heart in the body for this judgment."
    },
    l5: {
      diagram: "temple", description: "Moving from court to sanctuary, the floor rises, the ceiling drops and rooms grow darker. The god’s statue is in the sanctuary.",
      recall: "What did a temple house?",
      interpret: "Compare the open court and the sanctuary. Name one change in the building and one change in who could enter.",
      answer: "A temple housed a god’s statue. The open court admitted some visitors during festivals. The smaller, darker sanctuary restricted access to the priests who served the god."
    },
    l6: {
      diagram: "scripts", description: "The timeline shows hieroglyphic, hieratic and demotic scripts. All three bars overlap for part of their histories.",
      recall: "What did a cartouche around a name tell a reader?",
      interpret: "Did Egyptians have to stop using hieroglyphs before they could use demotic? Point to evidence on the timeline.",
      answer: "A cartouche marked a royal name. The bars overlap. People continued using hieroglyphs on monuments while using demotic for everyday writing."
    },
    l7: {
      diagram: "social", description: "The hierarchy places pharaoh at the top, scribes and officials in the middle, and farmers in its widest band.",
      recall: "How were many Egyptian workers paid?",
      interpret: "If farmers harvested much less grain, why might a tomb builder feel the effects? Connect two jobs in the diagram.",
      answer: "Many workers received grain or food made from it. A smaller harvest meant less grain could be collected and distributed to the builders."
    },
    l8: {
      diagram: "trade", description: "The Levant supplied cedar wood, Cyprus supplied copper, Nubia supplied gold and ivory, and Punt supplied incense.",
      recall: "Name one product Egypt could send to its trading partners.",
      interpret: "A shipbuilder needs long cedar timbers. Which partner would you send a boat to, and which label supports your choice?",
      answer: "Egypt could send grain, linen or papyrus. The Levant is the best match here because the trade diagram lists cedar wood beside Byblos."
    },
    l9: {
      diagram: "nubia", description: "The timeline marks Egyptian rule in Nubia from about 1500 to 1070 BCE and Kushite rule in Egypt from about 744 to 656 BCE.",
      recall: "Where did Nubia lie in relation to Egypt?",
      interpret: "Compare the two periods of rule. What changed about the direction of political control?",
      answer: "Nubia lay to Egypt’s south along the Nile. Egypt once ruled much of Nubia. Centuries later, Kushite kings from Nubia ruled Egypt as pharaohs."
    },
    l10: {
      diagram: "pharaohs", description: "The scale compares the building of the Great Pyramid around 2560 BCE, Cleopatra’s birth in 69 BCE and the present day.",
      recall: "Name one duty of a pharaoh.",
      interpret: "Which gap is longer, from the Great Pyramid to Cleopatra or from Cleopatra to today? Use the lower scale to explain.",
      answer: "Pharaohs had duties such as keeping order and defending Egypt. Almost 2,500 years separate the pyramid and Cleopatra. Her lifetime is closer to ours."
    },
    l11: {
      diagram: "conquerors", description: "The timeline marks Kushite, Assyrian, Persian, Greek and Ptolemaic rulers and the arrival of Roman rule in 30 BCE.",
      recall: "Why did tomb builders stop working near the end of the New Kingdom?",
      interpret: "Pick a ruling group from the timeline. Why would a change of ruler alone be poor evidence that Egyptian culture had disappeared?",
      answer: "The builders’ grain payments were late. Later, rulers such as those from Kush adopted the title of pharaoh and Egyptian religious practices. A change in power could happen while traditions continued."
    },
    l12: {
      diagram: "rosetta", description: "The stone carries one decree in hieroglyphs, demotic and Greek. The decoding diagram compares the royal names Ptolemy and Cleopatra.",
      recall: "Which script on the Rosetta Stone could scholars already read?",
      interpret: "Why would finding two royal names be a better test of a sound sign than finding just one?",
      answer: "Scholars could read Greek. If a sign in Ptolemy had the same sound in Cleopatra, the second name provided another check on the proposed reading."
    },
    l13: {
      diagram: "kemet", description: "A cross-section places the Nile beside low, silt-rich farmland, with higher desert on either side.",
      recall: "What did Kemet and Deshret mean?",
      interpret: "Someone says the Nile made all of Egypt fertile. Use the cross-section to revise that claim.",
      answer: "Kemet was the Black Land of the cultivated valley and Deshret the Red Land of the desert. Floodwater enriched the low strip beside the river while the higher desert stayed dry."
    }
  };

  const cells = {
    theory: {
      image: "scale.jpg", description: "A size scale places proteins to the left of a mitochondrion and a whole animal cell to its right. Each step grows tenfold.",
      recall: "Where do new cells come from?",
      interpret: "Find the mitochondrion and the animal cell. Which could fit inside the other? Explain how their positions on the scale support that.",
      answer: "New cells arise from existing cells. The mitochondrion is smaller on the scale and is an organelle inside the cell."
    },
    plant: {
      image: "scale.jpg", description: "A green plant cell on the size chart has a firm outer outline. An animal cell is pictured immediately above it.",
      recall: "Which plant organelle uses light energy to make sugar?",
      interpret: "Find the plant cell. Which structure around its outside helps it keep its shape? How does its job differ from the membrane’s?",
      answer: "The chloroplast captures light for photosynthesis. The cellulose cell wall supports the cell. The cell membrane controls which substances can enter and leave."
    },
    animal: {
      image: "scale.jpg", description: "The size chart pictures a mitochondrion, a small oval with folded inner membranes, to the left of a whole animal cell.",
      recall: "Which organelle holds an animal cell’s DNA?",
      interpret: "Find the folded oval labelled mitochondria. What would a working muscle cell have trouble doing if its mitochondria stopped working?",
      answer: "The nucleus holds the cell’s genetic instructions. Mitochondria release usable energy from nutrients. A muscle cell would struggle to power its contractions."
    },
    transport: {
      image: "osmosis.jpg", description: "Two sides of a beaker begin at the same water level. The right side has more solute dots. Later its water level is higher.",
      recall: "Which substance moves across the membrane in osmosis?",
      interpret: "Compare the two water levels before and after. Which way did water move overall? Use the dots as evidence.",
      answer: "Water moved across the membrane. More solute was on the right. Water moved there overall, raising the level on that side."
    },
    metabolism: {
      image: "ph.jpg", description: "On the pH graph, pepsin activity peaks near 2, amylase near 7 and trypsin near 8. The curves fall on either side of each peak.",
      recall: "What job does an enzyme do?",
      interpret: "Saliva containing amylase enters a stomach at about pH 2. Use the graph to predict what happens to this enzyme’s activity.",
      answer: "Enzymes speed up chemical reactions. Amylase works best around pH 7. Its curve is close to zero at pH 2, so its activity falls sharply."
    },
    reproduction: {
      image: "onion-dividing.jpg", description: "Neighbouring onion root cells have different patterns of dark material. In some the dark threads have gathered into distinct groups.",
      recall: "Why does a cell copy its DNA before it divides?",
      interpret: "Look at two cells in different stages. What visible difference suggests that the whole root is not dividing all at once?",
      answer: "Each new cell needs a copy of the genetic instructions. Some cells have a single region of dark material while others have distinct condensed threads or groups."
    },
    specialized: {
      image: "specialized.jpg", description: "Four images from left to right show cheek cells, blood cells, elongated muscle cells and nerve cells with slender extensions.",
      recall: "What makes a cell specialized?",
      interpret: "Which image shows cells with long extensions? How could that shape help them do their job?",
      answer: "A specialized cell has structures suited to a particular job. The nerve cells on the right have long extensions that carry signals and connect with other cells."
    },
    levels: {
      image: "levels.jpg", description: "Five steps show a cell, tissue, organ, organ system and organism in order of increasing organization.",
      recall: "What forms when similar cells work together?",
      interpret: "Place heart muscle tissue and the whole heart on different steps. Explain why they belong at different levels.",
      answer: "A group of similar working cells forms a tissue. Heart muscle is a tissue. The heart is an organ because several different tissues work together to pump blood."
    },
    systems: {
      image: "digestive.jpg", description: "A diagram from the lesson traces the passage from mouth to stomach to coiled small intestine and then large intestine.",
      credit: "Mariana Ruiz (LadyofHats), public domain.",
      recall: "What happens to food in the digestive system?",
      interpret: "Trace the route to the small intestine. Once nutrients are absorbed there, which system takes them to a muscle cell?",
      answer: "Digestion breaks food into substances the body can absorb. In the small intestine nutrients enter the body’s transport pathways. The circulatory system carries them in blood to cells."
    },
    circulatory: {
      image: "heart-rate.jpg", description: "One student’s heart rate is near 70 beats per minute at rest, rises above 140 by the end of jogging and then falls gradually during recovery.",
      recall: "What does the heart deliver to working muscles through the blood?",
      interpret: "Compare the jogging and recovery parts of the graph. Did the heart rate return to its starting value the instant jogging stopped? Point to evidence.",
      answer: "Blood delivers oxygen and nutrients. The rate is still high when jogging stops, then drops over several minutes toward its resting level."
    }
  };

  const resources = new Map();
  for (const [key, item] of Object.entries(egypt)) resources.set("../social-studies/#egypt-" + key, item);
  for (const [key, item] of Object.entries(cells)) resources.set("../science/#cells/" + key, item);
  resources.set("../science/#cells", cells.plant);
  resources.set("../computer-class/#social-nile-advantage", egypt.l1);
  resources.set("../computer-class/#social-kush-power", egypt.l9);
  resources.set("../computer-class/#science-microscope-evidence", cells.theory);
  resources.set("../computer-class/#science-membranes", cells.transport);
  resources.set("../computer-class/#science-organelle-rescue", cells.animal);
  resources.set("../computer-class/#science-oxygen-systems", cells.circulatory);

  let figureNumber = 0;
  function render(lastResource) {
    const item = resources.get(lastResource?.href);
    if (!item) return "";
    const diagram = item.diagram && g.EgyptDiagrams?.[item.diagram]?.();
    let figure;
    if (diagram) {
      // Arrow markers need distinct IDs if two periods share the same board.
      const svg = diagram.svg.replaceAll("eg-ar", "warmup-arrow-" + (++figureNumber));
      figure = '<div class="wu-figure-scroll" tabindex="0" role="group" aria-label="Lesson diagram">' + svg + '</div>' +
        '<details class="wu-description"><summary>Read the diagram in words</summary><p>' + item.description + '</p></details>';
    } else if (item.image) {
      figure = '<figure><img loading="lazy" src="../science/img/' + item.image + '" alt="' + item.description + '">' +
        '<figcaption>' + (item.credit || 'From the Cells and Systems lesson slides.') + '</figcaption></figure>';
    } else {
      figure = '<p>' + item.description + '</p>';
    }
    return '<details class="mb-warmup"><summary>Last class warm-up <small>5 min</small></summary>' +
      '<div class="wu-body"><h3>From memory</h3><p>' + item.recall + '</p>' +
      '<h3>Read the evidence</h3>' + figure + '<p>' + item.interpret + '</p>' +
      '<details class="wu-answer"><summary>Reveal a sample answer</summary><p>' + item.answer + '</p></details></div></details>';
  }
  g.ClassWarmups = { render };
})(window);
