/* Based on the Lesson 2 guided notes, Timeline of Power assignment and source cards. */
window.lessonChallenge = {
  gameTitle: "Curate the Kingdoms", testTitle: "Egyptian Kingdoms and Evidence Test",
  unit: "Grade 8 Social Studies · Ancient Egypt", file: "kingdom-review",
  role: ["Exhibit editor", "Evidence checker"],
  intro: "Build a museum exhibit with a partner. The editor chooses a label. The checker decides how a new piece of evidence affects it. Trade jobs for the next exhibit.",
  note: "Use the approximate dates and source descriptions supplied with each exhibit. Dates are in BCE.",
  columns: ["Exhibit item", "Information supplied"],
  rounds: [
    {
      title:"Two labels out of order",
      rows:[["Label A","2400 BCE"],["Label B","1900 BCE"]],
      first:{prompt:"Which label goes earlier on the timeline?",options:["Label A","Label B","Both belong at the same point"],key:0,why:"2400 BCE comes before 1900 BCE. The year numbers decrease as time moves forward."},
      update:"The Old Kingdom ran from about 2650 to 2150 BCE. The Middle Kingdom ran from about 2050 to 1700 BCE.",
      second:{prompt:"Which labels belong in these two kingdom displays?",options:["A in the Middle, B in the Old","Both in the Old","A in the Old, B in the Middle"],key:2,why:"2400 falls between 2650 and 2150. On the same timeline, 1900 falls between 2050 and 1700."}
    },
    {
      title:"The missing stretch",
      rows:[["Middle Kingdom ends","About 1700 BCE"],["New Kingdom begins","About 1550 BCE"]],
      first:{prompt:"How much time should the exhibit leave between these kingdoms?",options:["About 3,250 years","About 150 years","About 15 years"],key:1,why:"Subtract 1550 from 1700. A strip drawn to scale needs space for about 150 years."},
      update:"A draft label says Egypt remained a single united kingdom for this entire stretch.",
      second:{prompt:"Which revision fits the lesson timeline?",options:["Label it the Second Intermediate Period, a time of division","Move the New Kingdom to 1700 BCE","Label it the First Intermediate Period, before the Middle Kingdom"],key:0,why:"The Second Intermediate Period separates the Middle and New Kingdoms. It belongs on the display as a period of division."}
    },
    {
      title:"Two sides of a palette",
      rows:[["One side","Narmer wears the White Crown of Upper Egypt."],["Other side","Narmer wears the Red Crown of Lower Egypt."]],
      first:{prompt:"Which caption is best supported by these details?",options:["Narmer wore only the Double Crown","One ruler appears with the symbols of both lands","The two crowns represent the same region"],key:1,why:"Both sides show Narmer. The two different crowns link him to Upper and Lower Egypt."},
      update:"The exhibit editor wants to use the palette’s royal victory scene as proof of exactly how Egypt was united.",
      second:{prompt:"What should the checker say about this source?",options:["A carved scene records every event in order","Royal art has no value as evidence","Royal art shows how a ruler wanted victory presented"],key:2,why:"The scene helps us study Narmer’s public image. On its own it cannot establish the exact events of unification."}
    },
    {
      title:"Place the crowns on a map",
      rows:[["Upstream, to the south","Upper Egypt"],["Downstream, in the northern Delta","Lower Egypt"]],
      first:{prompt:"Which symbol belongs beside the northern Delta?",options:["White Crown of Upper Egypt","Double Crown for the Delta alone","Red Crown of Lower Egypt"],key:2,why:"Lower Egypt was in the northern Delta and its symbol was the Red Crown."},
      update:"A third label shows the White and Red crowns combined in a single crown.",
      second:{prompt:"What does the combined crown represent?",options:["A ruler who governed the south alone","One ruler claiming authority over both lands","A period without a central ruler"],key:1,why:"The Double Crown combined the symbols of Upper and Lower Egypt to express rule over both."}
    },
    {
      title:"A name in the catalogue",
      rows:[["Abydos seal impressions","Place Narmer first in the dynasty."],["Later king lists","Give the first pharaoh the name Menes."]],
      first:{prompt:"Which statement can the seals support directly?",options:["Menes was definitely Hor-Aha","Narmer appears first on these seals","The later lists were written by Narmer"],key:1,why:"The seals give evidence for Narmer’s place in the sequence. They do not directly explain the later name Menes."},
      update:"A count of published opinions found that some scholars identified Menes with Narmer and others with Hor-Aha.",
      second:{prompt:"What can that count add to the catalogue?",options:["It documents a disagreement among scholars","It identifies Menes from a new ancient inscription","It proves the majority view settled the question"],key:0,why:"The count describes modern interpretations. It adds evidence of disagreement about the ancient names."}
    }
  ],
  cases:[
    {
      title:"Space for a divided kingdom",
      rows:[["Old Kingdom ends","About 2150 BCE"],["Middle Kingdom begins","About 2050 BCE"],["Middle Kingdom ends","About 1700 BCE"]],
      questions:[
        {prompt:"How long is the interval between the Old and Middle Kingdoms?",options:["About 450 years","About 100 years","About 350 years","About 4,200 years"],key:1},
        {prompt:"On the exhibit’s scale, 1 cm represents 50 years. How wide should the Middle Kingdom band be?",options:["2 cm","9 cm","35 cm","7 cm"],key:3}
      ],
      write:"An editor draws the Old and Middle Kingdoms touching and claims Egypt stayed united. Describe a change to the exhibit. Use dates or a measurement and explain what the missing period represents.",
      criteria:["Identify the missing period between the two kingdoms.","Use the supplied dates or scale to size the interval.","Explain how showing the interval changes the claim about unity."]
    },
    {
      title:"Approve the museum caption",
      rows:[["Palette","The two sides show Narmer wearing the crowns of Upper and Lower Egypt."],["Seals","Narmer appears first in the dynasty at Abydos."],["King lists","Later lists name the first pharaoh Menes."]],
      questions:[
        {prompt:"Which detail would best support a caption about authority over two lands?",options:["The two different crowns on the palette","The order of names on the seals","The later use of the name Menes","The fact that the lists were made later"],key:0},
        {prompt:"Which question remains open after reading all three labels?",options:["Whether the palette pictures a ruler","Whether Upper Egypt had a crown","Whether Menes and Narmer were the same person","Whether the later lists use the name Menes"],key:2}
      ],
      write:"Write a two- or three-sentence caption about Narmer. Use two named sources and distinguish one conclusion you can support from a question the sources leave unresolved.",
      criteria:["Use a specific detail from one named source.","Use a relevant detail from a second named source.","Distinguish a supported interpretation from an unresolved question."]
    }
  ]
};
