/* Source material: Egypt atlas lesson 9 and the Egypt and Nubia Evidence Lab. */
(function () {
  "use strict";

  const timeline = "../social-studies/egypt-nubia-evidence.html";
  window.ComputerClassData.activities.push({
    id: "social-kush-power",
    subject: "ss",
    subjectName: "Social Studies",
    grade: "Grade 8",
    title: "How did power shift between Egypt and Kush?",
    time: "35 min",
    summary: "Investigate two periods on the Nile. Choose one clue from each and write a museum label explaining who could make decisions in each period.",
    lesson: "../social-studies/#egypt-l9",
    lessonText: "Read Egypt and Nubia",
    focus: "Ancient Egypt · Using evidence to explain change over time",
    reading: [
      "Imagine two museum displays. One shows enormous figures of an Egyptian pharaoh carved into a cliff in Nubia. The other describes Kushite kings restoring Egyptian temples. A visitor thinks both displays show Egypt ruling its southern neighbours. What would you need to know before agreeing?",
      "Nubia was a region along the Nile south of Egypt. Kush was a kingdom there. The river linked the two regions, but goods, people and political power did not always move in the same direction.",
      "Use the two dated maps and the evidence beside them. In each period, look for a decision a ruler made and a place where that decision took effect. A building’s style alone cannot tell you who controlled the region."
    ],
    sections: [
      {
        title: "Read the maps in time order",
        intro: "Take 5 minutes. Put the periods in order and decide what evidence would help you identify a ruler.",
        questions: [
          {
            id: "kush-time", type: "choice",
            prompt: "Which period would you place first on a timeline?",
            options: ["The period beginning around 744 BCE", "The period beginning around 1500 BCE", "They began in the same year because both dates are BCE"],
            correct: 1, why: "In BCE dates, the larger number is further in the past. About 1500 BCE comes before 744 BCE."
          },
          {
            id: "kush-test", type: "choice",
            prompt: "Which clue would most directly tell you who held political power in a region?",
            options: ["The direction the river flowed", "Two temples with a similar design", "Who appointed the official who governed the region"],
            correct: 2, why: "Appointing a governor shows that a ruler could choose who carried out decisions there."
          }
        ]
      },
      {
        title: "Investigate Egypt’s rule in Nubia",
        intro: "Take 8 minutes. Open the map for Egypt rules (c. 1500–1070 BCE). Find Abu Simbel and read the evidence beside the map. Record your own choice of clue here.",
        source: {href: timeline + "#egypt-rules", title: "Open the Egypt rules map"},
        questions: [
          {
            id: "kush-egypt-clue", type: "text", minWords: 12,
            prompt: "Choose the governor or the cliff figures at Abu Simbel. Name your clue and record one precise detail from the map’s evidence.",
            placeholder: "I chose … . The evidence for this period says …"
          },
          {
            id: "kush-egypt-inference", type: "text", minWords: 12,
            prompt: "What decision could an Egyptian ruler carry out in Nubia during this period? Explain how your chosen clue supports your answer.",
            placeholder: "The ruler could … . My clue supports this because …"
          }
        ]
      },
      {
        title: "Investigate Kushite rule in Egypt",
        intro: "Take 8 minutes. Open the map for Kush rules (c. 744–656 BCE). Find Napata, follow the direction of the arrow and read the evidence beside the map.",
        source: {href: timeline + "#kush-rules", title: "Open the Kush rules map"},
        questions: [
          {
            id: "kush-kush-clue", type: "text", minWords: 12,
            prompt: "Choose Piye’s campaign or the restoration of Egyptian temples. Record one precise detail about who took action, what they did and where.",
            placeholder: "I chose … . The evidence for this period says …"
          },
          {
            id: "kush-arrow", type: "choice",
            prompt: "On this map, what does the northward arrow help you explain?",
            options: ["Kushite rulers extended their power from the south into Egypt", "Egyptian officials carried gold from Nubia during this period", "Napata moved north of Egypt"],
            correct: 0, why: "The arrow follows the direction in which Kushite rule extended. Napata remained in Nubia."
          }
        ]
      },
      {
        title: "Write the museum label",
        intro: "Take 14 minutes. Return to the visitor’s idea from the opening. Check both of your recorded clues before writing.",
        questions: [
          {
            id: "kush-style", type: "choice",
            prompt: "Which discovery best challenges the idea that an Egyptian-style temple always proves Egypt held power?",
            options: ["The Nile connected places in both regions", "Kushite rulers restored Egyptian temples while ruling as pharaohs", "Egyptian rulers carved images at Abu Simbel"],
            correct: 1, why: "Kushite rulers chose to maintain Egyptian traditions. Architectural style alone cannot identify which kingdom held power."
          },
          {
            id: "kush-label", type: "text", minWords: 40,
            prompt: "How did power shift between Egypt and Kush? Write a label of at least 40 words. Identify who ruled where in each period, use one of your recorded details from each, and explain why a visitor looking only at temple style might miss the change.",
            placeholder: "During the earlier period … . We can see this in … . By the later period … . The evidence shows …"
          }
        ]
      }
    ]
  });
})();
