/* Cases apply the concepts in Egypt’s Geography File, Unit 2 Lesson 1. */
window.lessonChallenge = {
  "gameTitle": "River Council",
  "testTitle": "River Settlement Test",
  "unit": "Grade 8 Social Studies · Early river civilizations",
  "subject": "ss",
  "back": "river-valley-lab.html?civilization=egypt#settlement",
  "lab": "River Valley Investigation",
  "file": "river-council",
  "role": ["Council speaker","Evidence checker"],
  "intro": "Your team advises a farming community. The council speaker makes the first call. The evidence checker responds when a new report arrives. Switch roles each round and aim for 10 points together.",
  "note": "These imagined field reports use ideas from Egypt’s Geography File. Each council has its own priority. A different priority can support a different decision.",
  "columns": ["Field report","What the council knows"],
  "rounds": [
    {
      "title": "Grain for next year",
      "rows": [["Low bank","The fields collect silt when the Nile rises. The grain store is on the same low ground."],["Ridge","Families can reach the fields on foot. The store sits above the last high-water mark."]],
      "first": {"prompt":"The council’s first priority is keeping stored grain dry. Which advice has the strongest support?","options":["Use the ridge store","Use the low-bank store","The stores face equal risk"],"key":0,"why":"Only the ridge report puts the store above the last high-water mark."},
      "update": "A farmer argues that the Nile rose in its usual season, so the low store must be safe.",
      "second": {"prompt":"Which evidence would best test that claim?","options":["The number of farmers","The date seed was sown","The peak water level beside the store"],"key":2,"why":"Knowing the flood season helps with timing. The peak height and the store’s elevation determine whether the water reaches it."}
    },
    {
      "title": "Water for the last field",
      "rows": [["Upper canal","The inlet is open and water reaches the first farms."],["Lower canal","The last farms are dry. A survey finds a blockage between the upper and lower fields."]],
      "first": {"prompt":"What best explains the dry lower fields?","options":["The river has dried up","The shared channel is blocked downstream of the first farms","The upper fields lack fertile silt"],"key":1,"why":"Water reaches the inlet and the upper farms. The blockage sits between them and the dry fields."},
      "update": "Both farming groups can spare workers for one day. Their priority is getting water to the last field.",
      "second": {"prompt":"Which plan addresses the evidence?","options":["Repair the blocked stretch together and check water at the last field","Move the grain store to higher ground","Widen the already flowing inlet and leave the blockage"],"key":0,"why":"Clearing the identified obstruction can reconnect the lower farms. Checking the last field shows whether the work helped."}
    },
    {
      "title": "Two ways into the valley",
      "rows": [["Open plain","A broad land route connects several neighbouring cities."],["Desert margin","The approach over land crosses desert. A landing on the Nile is still accessible."]],
      "first": {"prompt":"Traders need a land route between cities. Which site fits that priority?","options":["The desert margin, because deserts speed carts","Either, because both have the same land route","The open plain, because the route connects neighbours"],"key":2,"why":"The report gives direct evidence of a usable land connection across the plain."},
      "update": "A council member says the desert-margin settlement cannot be reached by outsiders.",
      "second": {"prompt":"Which detail challenges that claim?","options":["The plain has several cities","Boats can still use the Nile landing","Desert travel can be difficult"],"key":1,"why":"A natural barrier may slow one approach. The landing leaves another route into the settlement."}
    },
    {
      "title": "When to sow",
      "rows": [["Nile fields","The water has receded from the lower plots and left fresh silt."],["Plain fields","Seed is already in the ground when a sudden rise washes across the plots."]],
      "first": {"prompt":"Which claim do both reports help investigate?","options":["The influence of flood timing on crops","The language people spoke","The number of soldiers in each city"],"key":0,"why":"Both reports place the flood in relation to planting. One leaves soil ready, while the other reaches a planted crop."},
      "update": "Next season the Nile rises at the usual time, but water stops short of the outer plots.",
      "second": {"prompt":"Which revision best fits this report?","options":["The river changed direction","All Nile fields lost their soil","A familiar season still leaves some plots dry in a low flood"],"key":2,"why":"Timing and height answer different questions. The water can arrive on schedule and still fail to reach every plot."}
    },
    {
      "title": "Whose turn at the canal?",
      "rows": [["Upstream farms","Water reaches these farms even when they skip a day of canal clearing."],["Downstream farms","Silt building up along the shared channel delays water here first."]],
      "first": {"prompt":"Which issue most urgently needs an agreement?","options":["Which river is longer","How farms share the work of keeping the canal open","Whether silt can ever improve soil"],"key":1,"why":"The farms depend on the same channel, but a delay hurts the lower farms first."},
      "update": "One council member says this proves every Mesopotamian city had the same rules.",
      "second": {"prompt":"What evidence would let the team test that wider claim?","options":["Water levels from the same canal tomorrow","The depth of this canal at its inlet","Records of water rules from several cities"],"key":2,"why":"The report concerns one imagined canal. Comparing records from several cities could test a claim about shared rules."}
    }
  ],
  "cases": [
    {
      "title": "A family on a Nile bend",
      "rows": [["Bend Farm","Its low fields receive silt in an ordinary flood. The grain room shares the fields’ low bank."],["Terrace Farm","Its grain room sits above the highest mark in the family’s records. Its outer plot stays dry in a low flood."],["This season","Water has started rising at the usual time. The family has no measurement of the peak yet."]],
      "questions": [{"prompt":"Which detail most directly supports a plan to protect stored grain?","options":["The flood began on schedule","Bend Farm has low fields","The terrace grain room is above recorded flood marks","The family owns an outer plot"],"key":2},{"prompt":"Which observation would best show whether the outer plot receives water this season?","options":["The date of the first rise alone","The water mark reached at the plot","The distance between the two stores","The number of families on the bend"],"key":1}],
      "write": "Recommend a farm for this family. Use a specific detail from each site and explain one risk the family accepts with your choice.",
      "criteria": ["Make a clear recommendation tied to a family priority.","Use one accurate detail from each site in the comparison.","Explain one real disadvantage of the recommended site."]
    },
    {
      "title": "A move to the southern plain",
      "rows": [["Gate Farm","Water enters beside the farm. A breach in the riverbank reached its planted fields last season."],["End Farm","The house stands on raised ground. Its fields get water only after it passes along a canal shared by three farms."],["New report","The river has water. Silt has blocked the shared stretch before End Farm. The farms have two days before sowing."]],
      "questions": [{"prompt":"Which conclusion is supported by the report?","options":["The entire river has dried up","Gate Farm is safe in every flood","End Farm has lost all its soil","A full river can still leave End Farm’s fields dry"],"key":3},{"prompt":"Which observation would best show that a canal repair worked for End Farm?","options":["Water arrives at End Farm’s field entrance","Water is visible in the river","The house stays dry","Workers gather beside Gate Farm"],"key":0}],
      "write": "Choose Gate Farm or End Farm for the next planting season. Defend the decision with three details from the reports. Explain how the family could reduce one risk.",
      "criteria": ["Choose a farm and state the planting priority behind the choice.","Connect three accurate report details to the argument.","Explain a practical response to one risk at the chosen farm."]
    }
  ]
};
