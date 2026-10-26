window.HUB = {
  subject: "ct",
  units: [
  {
    id:"lab", n:"1", name:"Think Lab", status:"now", when:"September – October",
    intro:"A toolkit for thinking clearly: telling facts from guesses, weighing evidence, spotting manipulation, building arguments, playing strategy games and making hard decisions. It all comes together in the final case file.",
    lessons:[
      {id:"l1", n:"1", title:"The Missing Time Capsule Mystery",
       big:"A mystery you can only solve by reasoning from the evidence, not from the most exciting story.",
       notes:[
         "We worked through a mystery as investigators, reading clues and building a theory.",
         "The goal wasn't to guess the culprit. It was to back every part of your theory with a clue you could point to.",
         "Next class we named the move we were already making: separating what we saw from what we assumed."
       ],
       work:"Time Capsule case packet.",
       check:[
         {q:"What makes a theory strong in a mystery?", a:["It's the most dramatic","Every part is backed by a clue","Most of the class agrees with it"], c:1, why:"Evidence, not excitement or popularity."}
       ]},
      {id:"l2", n:"2", title:"Seeing vs. Assuming",
       activity:{
         title:"Case file: The cracked trophy case",
         context:"At 3:20, a basketball is found near the trophy case. At 3:22, a teacher hears a bang in the hallway. At 3:25, someone notices a crack in the glass. No witness saw the glass break.",
         prompts:[
           {label:"Observations: List three confirmed details.",rows:3},
           {label:"Initial inference: What might someone conclude? Why isn't it proven?",rows:4},
           {label:"Revise: How does the new evidence change your theory?",hint:"NEW EVIDENCE: a dated photograph taken at 3:10 already shows the crack. Explain what this rules out and what remains unknown.",rows:4},
           {label:"What additional evidence would you seek?",rows:3}
         ],
         checklist:["I separated facts from guesses.","I revised my theory when the facts changed.","I acknowledged what is still unknown."]
       },
       big:"An inference can be reasonable AND wrong at the same time.",
       notes:[
         "Observation: something you (or a camera, or a record) could directly confirm. What was actually seen, heard, measured or written down.",
         "Inference: a conclusion you add on top of an observation. Sometimes a tiny, very reasonable step, but still a step you added.",
         "You can't stop inferring. You just need to know which parts of your story are confirmed and which parts you added.",
         "Selective attention: you notice what you're looking for. Two honest people can miss completely different things in the same scene.",
         "In the Cracked Trophy Case, new information arrived partway through. Changing your theory when the facts change is a skill, not a failure."
       ],
       terms:[["Observation","Something that can be directly confirmed."],["Inference","A conclusion you build on top of what you observed."],["Selective attention","Noticing only what you're focused on and missing the rest."]],
       work:"Cracked Trophy Case packet: sort the 8 report fragments, write a theory, then revise it after the New Information slip.",
       check:[
         {q:"\"Four kids were standing by the vending machine when the snack went missing. One of them took it.\" The second sentence is…", a:["An observation","An inference"], c:1, why:"Nobody saw it happen. It's a guess built on the first sentence."},
         {q:"Your theory doesn't fit a new confirmed fact. The best move is to…", a:["Ignore the fact","Revise the theory and say so","Pick a new culprit at random"], c:1, why:"Updating when the facts change is exactly the skill."}
       ]},
      {id:"l3", n:"3", title:"Two People, One Event",
       big:"Disagreeing about what happened doesn't always mean someone is lying.",
       notes:[
         "Same event + different vantage point, expectations or stake = different honest stories.",
         "Before asking \"who's lying?\", ask \"what could each person actually see from where they were?\"",
         "Each half of the class got only one witness account, wrote a confident summary, then combined it with the other half.",
         "Combined, the two accounts fit together. Each witness just missed part of it.",
         "Some things stayed unknown, like what someone meant to do. A good investigator says so instead of inventing details."
       ],
       terms:[["Perspective","Where someone was and what they were focused on."],["Bias","Something that tilts how a person sees or remembers an event."]],
       work:"Account A or B, your group's summary, and the Judge's Sheet.",
       check:[
         {q:"Two fans at the same game disagree about whether a shot was strong. Most likely…", a:["One is lying","They noticed or compared different things","The game didn't happen"], c:1, why:"Honest people can see the same moment differently."},
         {q:"Neither witness reported what someone was thinking. What should you claim about it?", a:["That we don't know","Whatever seems most likely","Whatever the class votes"], c:0, why:"Don't fill a gap with invented detail."}
       ]},
      {id:"l4", n:"4", title:"How Do You Know That?",
       big:"A claim is what someone says is true. Evidence is what actually backs it up. Confidence and popularity don't count as evidence.",
       notes:[
         "The Evidence Ladder, weakest to strongest:",
         "1. Rumour or anecdote: one person's story.",
         "2. Opinion or single review: honest, but one subjective source.",
         "3. Reported stat, source unclear: a specific-sounding number with no detail about who counted or how.",
         "4. Verified record or expert measurement: an official log or a qualified person measuring properly.",
         "5. Multiple independent sources agreeing: separate people checking separately and getting the same answer.",
         "A conflict of interest (the source gains from the result) or cherry-picking (hiding bad results) pushes a claim down the ladder.",
         "The ladder grades evidence, not truth. A weakly supported claim can still turn out to be true."
       ],
       terms:[["Claim","A statement that something is true."],["Evidence","What backs up a claim."],["Conflict of interest","When the person making a claim benefits if you believe it."],["Cherry-picking","Showing only the results that help your side."]],
       work:"Evidence Ladder: sort the 10 claim cards, then re-rank after the New Information slip.",
       check:[
         {q:"\"My cousin drank it before his game and played amazing.\" Which rung?", a:["1 · Anecdote","3 · Unclear stat","5 · Independent sources"], c:0, why:"One person's story."},
         {q:"Three separate referee crews reviewed two camera angles and agreed. Which rung?", a:["2 · Opinion","4 · Record","5 · Independent sources"], c:2, why:"Separate groups checked independently and agreed."},
         {q:"An ad says \"87% of users improved\" with no other detail. Which rung?", a:["1","3","5"], c:1, why:"A specific number, but we don't know who counted or how."}
       ]},
      {id:"l5", n:"5", title:"Ad Break: Who's Trying to Convince You?",
       big:"Once you've built a persuasion trick on purpose, you start seeing it everywhere.",
       notes:[
         "Bandwagon: \"everyone's already doing it\", so you don't want to be left out.",
         "Urgency and scarcity: \"today only\", \"only 3 left\", so you act before you think.",
         "Emotional pitch: aims at a feeling (fear of missing out, embarrassment, pride, excitement).",
         "Star power: a famous or cool-looking person uses it.",
         "Impressive-sounding nothing: words that sound scientific but don't say anything you can check (\"clinically snackable\").",
         "A technique isn't automatically a lie. The question is what it's being used to cover up."
       ],
       terms:[["Persuasion technique","A way of framing a message to get you to feel or act a certain way."],["Motive","What the person making the message wants from you."]],
       work:"Ad Builder (build an ad with 3+ tricks), then Teardown of another group's ad.",
       check:[
         {q:"\"Only 2 left! Sale ends at midnight!\" uses…", a:["Star power","Urgency and scarcity","Bandwagon"], c:1, why:"Pressure to act right now."},
         {q:"\"Join over a million players who already switched.\" uses…", a:["Bandwagon","Emotional pitch","Impressive-sounding nothing"], c:0, why:"Everyone else is doing it."}
       ]},
      {id:"l6", n:"6", title:"Spot the Fake",
       big:"Misleading and fake aren't the same. Misleading takes something real and arranges it to give a false impression. Fake has nothing real behind it.",
       notes:[
         "Three verdicts: Trustworthy, Misleading, Outright Fake.",
         "Five detective questions: Who made this? What do they want from me? What emotion are they trying to create? What evidence is missing? Could this be checked somewhere else?",
         "Polish isn't proof. A plain graph can be trustworthy and a slick graphic can be invented.",
         "A real name and job title don't help if the person doesn't exist.",
         "An AI answer can be confident and wrong. Check it before you repeat it."
       ],
       terms:[["Misleading","Real information arranged to create a false impression."],["Fabricated","Made up, with no real source."]],
       work:"Detective Sheet: verdicts and reasons for Exhibits A–J.",
       check:[
         {q:"A real survey of 12 people becomes the headline \"Scientists confirm…\". That's…", a:["Trustworthy","Misleading","Outright fake"], c:1, why:"Something real, oversold."},
         {q:"Which question checks for a conflict of interest?", a:["Who made this and what do they want?","Is the graph colourful?","How many likes does it have?"], c:0, why:"Motive matters."}
       ]},
      {id:"l7", n:"7", title:"Build a Better Argument",
       big:"A strong argument isn't the loudest one. Every part is backed up, and it deals honestly with the best point against it.",
       notes:[
         "Claim: what you think should happen.",
         "Reasons: why.",
         "Backup: something real for each reason: an example, something you've noticed, an actual record. Not an invented statistic.",
         "The other side: name the strongest point against you, honestly.",
         "Wanting something (\"everyone wants it\") isn't a reason. Neither is \"because we're older\" unless you explain why that matters."
       ],
       terms:[["Claim","What you're arguing for."],["Backup","Real support for a reason."],["Counterargument","The best point the other side could make."]],
       work:"Argument Builder, Critique Slip, and your revised paragraph.",
       check:[
         {q:"\"Lunch should be longer because literally everyone wants it.\" What's missing?", a:["A claim","A real reason with backup","Nothing"], c:1, why:"Wanting it isn't a reason it should happen."},
         {q:"Which is real backup?", a:["\"Studies show 90% of students agree\" (made up)","\"Library sign-outs went up both years we had silent reading\"","\"It's obvious\""], c:1, why:"An actual comparison you could check."}
       ]},
      {id:"l8", n:"8", title:"Cooperate or Betray",
       big:"Betraying is always better for you personally, but if both people reason that way, both end up worse off than if they had trusted each other.",
       notes:[
         "Scoring: both cooperate = 3 each. Both betray = 1 each. One betrays = betrayer 5, cooperator 0.",
         "This is a simplified Prisoner's Dilemma, one of the most famous ideas in game theory.",
         "Playing the same partner repeatedly changes things: trust, retaliation and forgiveness start to matter.",
         "When a round is announced as the last one, betrayals spike. There's no future round left to protect.",
         "The smartest move for one person and the smartest move for the group aren't always the same."
       ],
       table:{title:"Payoffs (my points / partner's points)", head:["","Partner cooperates","Partner betrays"], rows:[["I cooperate","3 / 3","0 / 5"],["I betray","5 / 0","1 / 1"]]},
       terms:[["Prisoner's Dilemma","A game where self-interest leads both players to a worse result than cooperating."],["Tit for Tat","Cooperate first, then copy what your partner did last round."]],
       work:"Round Tracking Sheet and reflection page.",
       check:[
         {q:"Your partner cooperates. Which choice gets YOU the most points?", a:["Cooperate","Betray"], c:1, why:"5 beats 3. That's the pull of the dilemma."},
         {q:"Max combined score if both cooperate for 7 rounds?", a:["21","35","42"], c:2, why:"6 points per round × 7 rounds."}
       ]},
      {id:"l9", n:"9", title:"The Art of the Deal",
       big:"Fairness changes what people actually do. And what someone says they want isn't always what they care about most. Ask.",
       notes:[
         "Ultimatum Game: the Proposer splits 10 points; the Responder can only accept or reject. Reject means both get zero.",
         "Pure self-interest says accept any offer above 0. Real people often reject low offers to punish unfairness.",
         "Offers usually land around 4–6 out of 10 because Proposers expect low offers to be rejected.",
         "Trade Table: everyone had secret values for the items. Pairs who asked questions found better deals than pairs who guessed.",
         "Position = what someone says they want. Priority = what they actually care about most."
       ],
       terms:[["Ultimatum Game","A take-it-or-leave-it split."],["Position","What someone asks for."],["Priority","What actually matters most to them."]],
       work:"Ultimatum & Trade Log.",
       check:[
         {q:"In the Ultimatum Game, a Responder rejects a 9/1 split. What happens?", a:["Responder gets 1","Both get 0","They negotiate"], c:1, why:"Reject means nobody gets anything."},
         {q:"Best way to find a good trade?", a:["Assume they want the rarest item","Ask what they actually value","Show nothing and refuse"], c:1, why:"Questions reveal hidden priorities."}
       ]},
      {id:"l10", n:"10", title:"Impossible Choices",
       big:"Decide what should matter BEFORE you look at the options.",
       notes:[
         "The scenario: the grade has $900 left over from a fundraiser. How should it be spent?",
         "Groups wrote their criteria first, then saw five options.",
         "Strong criteria are specific and checkable: \"No student should be left out because their family can't pay extra.\"",
         "Weak criteria are vague (\"it should be fair\") or one-dimensional (\"most fun\").",
         "You may revise criteria after seeing options, but cross out (don't erase) and explain why.",
         "A strong justification names your criteria and shows how the choice follows from them, including the trade-off you accepted."
       ],
       terms:[["Criteria","The standards you use to judge options."],["Trade-off","What you give up to get something else."]],
       work:"Impossible Choices handout: criteria, scoring grid, decision and justification.",
       check:[
         {q:"Which is the strongest criterion?", a:["It should be fair","It should be fun","Every student benefits, no matter what their family can afford"], c:2, why:"Specific, and you can check any option against it."},
         {q:"Why write criteria before seeing the options?", a:["So you can't just pick your favourite and justify it after","It's faster","The teacher said so"], c:0, why:"It keeps the decision honest."}
       ]},
      {id:"l11", n:"11", title:"Case File: The Loonie Line",
       big:"The final challenge. Every tool from Think Lab, in one case.",
       notes:[
         "Investigation firms figure out what happened to a missing fundraiser jar, then make a decision the evidence can't fully settle.",
         "Separate confirmed from assumed. Watch for honest disagreement. Rank the evidence. Ask who benefits. Set criteria before deciding.",
         "Period A: investigate and build your verdict. Period B: present and defend it.",
         "You're marked on using real evidence, reasoning that holds together, and naming what the case doesn't settle, not on guessing the ending."
       ],
       work:"Case packet, Verdict (Parts 1 and 2), and your firm's presentation.",
       check:[
         {q:"A poll says \"68% think it's suspicious\" from 41 self-selected votes. How much should it count?", a:["A lot, it's a specific number","Very little: small, self-selected sample","It proves what happened"], c:1, why:"A vote on suspicion isn't evidence of what happened."}
       ]}
    ]
  },
  {
    id:"games", n:"2", name:"Game Theory", status:"done", when:"Think Lab games",
    intro:"Strategy games that show what happens when everyone's choices affect everyone else.",
    lessons:[
      {id:"g1", n:"1", title:"Outsmart the Game",
       big:"Game theory is the study of decisions where your best move depends on what other people do.",
       notes:[
         "Warm-up puzzles: Eight Balls (find the heavy ball in two weighings) and Two Guards.",
         "Ultimatum Game: fairness matters, and knowing your history with someone changes your offers.",
         "Prisoner's Dilemma tournament, then a 10-round repeated game with one partner.",
         "Named strategies: Always Cooperate, Always Betray, Tit for Tat, Forgiving Tit for Tat, Random.",
         "Real-world scenarios: group projects, online squads, shared locker rooms, study groups, competing companies."
       ],
       terms:[["Players","Everyone whose choices affect the result."],["Incentive","What pushes a player toward a choice."],["Repeated game","Playing the same game with the same people more than once."]],
       work:"Outsmart the Game booklet.",
       check:[
         {q:"Why does a repeated game encourage cooperation?", a:["Betrayal can be punished next round","The rules change","Points are worth more"], c:0, why:"Reputation and payback matter when there's a next time."}
       ]},
      {id:"g2", n:"2", title:"Guess 2/3 of the Average",
       big:"The smart answer depends on how deeply you think everyone else is thinking.",
       notes:[
         "Everyone picks 0–100. The target is 2/3 of the group's average. Closest wins.",
         "Level 0: random, around 50. Level 1: 2/3 of 50 ≈ 33. Level 2: 2/3 of 33 ≈ 22. Keep going and it heads toward 0.",
         "Real groups never reach 0, because not everyone thinks the same number of levels deep.",
         "One player picking 100 can drag a small group's target way up."
       ],
       work:"Round Tracker.",
       check:[
         {q:"Guesses are 50, 40, 60, 30. What's the target?", a:["45","30","20"], c:1, why:"Average 45, and 2/3 of 45 = 30."}
       ]},
      {id:"g3", n:"3", title:"The Commons and the Fund",
       big:"What's good for me right now isn't always good for the group over time.",
       notes:[
         "Shared Fish Pond: the lake regrows if the group harvests 20 or less per round. Greed past that collapses it.",
         "The first greedy player usually gets away with it. The lake crashes once enough people copy them.",
         "Class Fund: contributions double and get split evenly. Everyone giving all doubles everyone's points, but a single keeper gets the most.",
         "Contributions often drop in a known last round."
       ],
       terms:[["Tragedy of the commons","When everyone takes a little too much of a shared resource and it runs out."],["Free rider","Someone who benefits without contributing."]],
       work:"Fish Pond and Class Fund trackers.",
       check:[
         {q:"In the Class Fund, 3 players give 8 and 1 keeps 8. What does the keeper end with?", a:["8","12","20"], c:2, why:"Fund 24 → 48 → 12 each, plus the 8 they kept."}
       ]},
      {id:"g4", n:"4", title:"The Auction",
       big:"When nobody knows what a prize is really worth, the winner is often the person who overestimated most.",
       notes:[
         "100 points for five sealed-bid rounds. Spend too early and you can't win later.",
         "Round 4 twist: the winner paid the second-highest bid.",
         "Round 5 mystery prize: the winner's curse. Winning an uncertain auction often means you overpaid."
       ],
       terms:[["Sealed bid","A secret bid nobody sees until the reveal."],["Winner's curse","Winning an auction by overestimating the prize's value."]],
       work:"Team Bid Sheet.",
       check:[
         {q:"Why might the winner of a mystery-prize auction lose out?", a:["They probably bid more than it was worth","They had to share it","They bid last"], c:0, why:"The highest guess of value tends to be too high."}
       ]}
    ]
  }
  ]
};
