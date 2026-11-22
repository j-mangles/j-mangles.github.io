/* Cases apply the concepts in Cells & Systems, Topics 6–7. */
window.lessonChallenge = {
  "gameTitle": "Oxygen Detectives",
  "testTitle": "Oxygen Delivery Test",
  "unit": "Grade 8 Science · Cells and Systems",
  "subject": "sci",
  "back": "./#cells/circulatory/oxygen-trials",
  "lab": "Oxygen Delivery Lab",
  "file": "oxygen-review",
  "role": ["Model reader","Trial planner"],
  "intro": "Work with a partner. The model reader interprets the first readings. The trial planner handles the change. Switch roles each round and aim for 10 points together.",
  "note": "All readings are simplified model units. Lung capacity is the oxygen the lungs can supply. Flow capacity is the oxygen the blood can carry. Muscle need is the oxygen the working cells require.",
  "columns": ["Trial","Lung capacity","Flow capacity","Muscle need"],
  "rounds": [
    {
      "title": "The warm-up",
      "rows": [["Start",51,79,63]],
      "first": {"prompt":"What limits oxygen delivery?","options":["The lungs","Blood flow","Muscle need"],"key":0,"why":"The lungs can supply 51 units. Blood could carry 79, so only 51 can reach the muscles."},
      "update": "Flow capacity rises from 79 to 93. Lung capacity and muscle need stay the same.",
      "second": {"prompt":"How many units now reach the muscles?","options":["63","93","51"],"key":2,"why":"The lungs still supply only 51. Increasing the capacity of the next step leaves delivery unchanged."}
    },
    {
      "title": "A faster heartbeat",
      "rows": [["Start",86,58,69]],
      "first": {"prompt":"Which change could increase oxygen delivery immediately?","options":["Raise lung capacity alone","Raise flow capacity alone","Raise muscle need alone"],"key":1,"why":"The lungs already supply more oxygen than the blood can carry. Flow is the smaller capacity."},
      "update": "The team raises flow capacity from 58 to 72. The other readings stay the same.",
      "second": {"prompt":"Does delivery now cover the need?","options":["Yes, with 3 units to spare","Yes, with 17 units to spare","No, it falls short by 11"],"key":0,"why":"Delivery reaches 72 while need stays at 69. The original 11-unit shortfall becomes a 3-unit surplus."}
    },
    {
      "title": "The harder climb",
      "rows": [["Level ground",72,79,50],["Uphill",72,79,82]],
      "first": {"prompt":"Why does a shortfall appear uphill?","options":["The lungs supply less","The blood carries less","The muscles need more"],"key":2,"why":"Both capacities stayed fixed. Muscle need rose from 50 to 82 while delivery stayed at 72."},
      "update": "The climber rests. Muscle need falls to 56 while both capacities stay at their uphill values.",
      "second": {"prompt":"Which pair of readings would the model show?","options":["Delivery 56, need 56","Delivery 72, need 56","Delivery 79, need 72"],"key":1,"why":"Rest lowers demand in this trial. The two capacities still allow 72 units of delivery."}
    },
    {
      "title": "An even match",
      "rows": [["Start",65,65,76]],
      "first": {"prompt":"Which statement fits the starting readings?","options":["Only the lungs limit delivery","Both capacities limit delivery equally","The muscles receive 76 units"],"key":1,"why":"Both steps can handle exactly 65 units. Neither step has room to carry additional oxygen on its own."},
      "update": "A partner increases lung capacity to 79. Flow capacity stays at 65.",
      "second": {"prompt":"What should the team change next to raise delivery?","options":["Increase flow capacity","Increase lung capacity again","Increase muscle need"],"key":0,"why":"Blood flow now limits delivery. It can carry only 65 of the 79 units the lungs could supply."}
    },
    {
      "title": "Two changes at once",
      "rows": [["Trial A",44,58,69],["Trial B",72,79,69]],
      "first": {"prompt":"Can these trials isolate the effect of lung capacity?","options":["Yes, because muscle need stayed fixed","Yes, because delivery rose","No, because flow capacity also changed"],"key":2,"why":"Both supply settings changed between A and B. A comparison that changes just one of them can isolate its effect."},
      "update": "Start again from Trial A. This time the team wants to isolate the effect of lung capacity.",
      "second": {"prompt":"Which trial should be compared with A?","options":["Lungs 44, flow 79, need 69","Lungs 72, flow 79, need 82","Lungs 72, flow 58, need 69"],"key":2,"why":"Only lung capacity differs from A. Delivery rises from 44 to 58, where flow becomes the limit."}
    }
  ],
  "cases": [
    {
      "title": "Intervals in the gym",
      "rows": [["Before",51,86,82],["After",72,86,82]],
      "questions": [{"prompt":"How many units reach the muscles before the change?","options":["31","51","82","86"],"key":1},{"prompt":"What happens to the gap between delivery and need?","options":["It grows by 21 units","It disappears","It shrinks by 21 units","It stays at 31 units"],"key":2}],
      "write": "Explain why changing lung capacity helped in this trial and why the muscles still have a shortfall. Use readings from both rows.",
      "criteria": ["Identify the limiting step before the change.","Compare delivery before and after using both values.","Compare the final delivery with muscle need and explain the remaining gap."]
    },
    {
      "title": "Testing a recovery claim",
      "rows": [["A",86,65,76],["B",86,65,50],["C",93,79,76]],
      "questions": [{"prompt":"Which comparison isolates the effect of muscle activity on need?","options":["A and B","A and C","B and C","All three comparisons"],"key":0},{"prompt":"Which result follows from Trial B?","options":["The muscles need 65 and receive 50","The lungs limit delivery to 50","There is a shortfall of 15","Delivery exceeds need by 15"],"key":3}],
      "write": "A partner says that the higher lung capacity alone explains why C delivers more oxygen than A. Evaluate the claim. Give the three settings for one fair follow-up trial and predict its delivery.",
      "criteria": ["Identify the two settings that changed from A to C.","Give lung, flow and need values that change only lung capacity from A.","Predict delivery for your follow-up and explain which capacity sets it."]
    }
  ]
};
