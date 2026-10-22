window.HUB = {
  subject: "math",
  units: [
  {
    id:"fdp", n:"1", name:"Fractions, Decimals and Percents", status:"now", when:"September – November 2",
    intro:"One amount can be written three ways. We are learning to switch between fractions, decimals and percents, find percents of numbers, work with sales and tax, and compare numbers in any form.",
    after:"Coming up in this unit: percent problems in context (Oct 23); discounts, tax and money (Oct 26); comparing and ordering (Oct 27–29); Percent Skill Check and review (Oct 30); Unit 1 test (Mon Nov 2).",
    lessons:[
      {id:"l01", n:"1", title:"Same Value, Different Clothes",
       big:"A fraction, a decimal and a percent can all name the same amount. They're the same value wearing different clothes.",
       notes:[
         "1/2, 0.5 and 50% are all the same amount. So are 1/4, 0.25 and 25%.",
         "A hundred grid is the easiest way to see it: shade 30 of 100 squares and you've shown 30/100, 0.30 and 30%.",
         "Decimals use place value. 0.3 is three tenths, 0.07 is seven hundredths.",
         "Equivalent fractions name the same amount: 3/10 = 30/100."
       ],
       table:{title:"Values to know by heart", head:["Fraction","Decimal","Percent"], rows:[["1/2","0.5","50%"],["1/4","0.25","25%"],["3/4","0.75","75%"],["1/5","0.2","20%"],["1/10","0.1","10%"],["1/100","0.01","1%"]]},
       terms:[["Fraction","Part of a whole written as numerator over denominator."],["Decimal","A number written with place value to the right of the decimal point."],["Percent","A number out of 100."]],
       work:"Lesson 1 practice sheet.",
       check:[
         {q:"Which is NOT the same as the others?", a:["3/4","0.75","75%","0.34"], c:3, why:"0.34 is thirty-four hundredths. The others are all three quarters."},
         {q:"40 of 100 squares are shaded. What decimal is that?", a:["0.04","0.4","4.0"], c:1, why:"40 hundredths = 4 tenths = 0.4."}
       ]},
      {id:"l02", n:"2", title:"Percent Means Per Hundred",
       big:"Percent means \"out of 100\". 37% is 37 out of every 100.",
       notes:[
         "Per cent comes from Latin for \"by the hundred\" (think century, 100 years).",
         "Any percent can be written as a fraction over 100: 37% = 37/100.",
         "To write a percent as a decimal, divide by 100 (move the decimal two places left): 37% = 0.37, 5% = 0.05.",
         "Watch the small ones: 5% is 0.05, not 0.5. 0.5 is 50%.",
         "100% is the whole thing. Percents over 100 mean more than the whole, like 150% = 1.5."
       ],
       terms:[["Percent (%)","A ratio that compares a number to 100."]],
       work:"Lesson 2 practice sheet.",
       check:[
         {q:"What is 8% as a decimal?", a:["0.8","0.08","8.0"], c:1, why:"8 out of 100 is eight hundredths."},
         {q:"What is 0.6 as a percent?", a:["6%","60%","0.6%"], c:1, why:"0.6 = 0.60 = 60 hundredths = 60%."},
         {q:"23/100 as a percent is…", a:["23%","2.3%","0.23%"], c:0, why:"Out of 100 already, so it's 23%."}
       ]},
      {id:"l03", n:"3", title:"Equivalent Fractions, Decimals and Percents",
       big:"To get a percent from a fraction, make the denominator 100 if you can. If you can't, divide.",
       notes:[
         "If the denominator goes into 100, scale it up: 3/5 = 60/100 = 60%. 7/20 = 35/100 = 35%. 9/25 = 36/100 = 36%.",
         "If it doesn't, divide numerator by denominator: 3/8 = 3 ÷ 8 = 0.375 = 37.5%.",
         "Percent to fraction: write it over 100, then simplify. 45% = 45/100 = 9/20.",
         "Check that all three forms agree before you move on."
       ],
       terms:[["Equivalent","Equal in value, even if written differently."],["Simplest form","A fraction where numerator and denominator have no common factor except 1."]],
       work:"Lesson 3 practice sheet.",
       check:[
         {q:"7/20 as a percent is…", a:["7%","20%","35%","72%"], c:2, why:"7/20 × 5/5 = 35/100."},
         {q:"60% in simplest form is…", a:["60/100","6/10","3/5"], c:2, why:"60/100 ÷ 20/20 = 3/5."}
       ]},
      {id:"l04", n:"4", title:"Benchmark Percents",
       big:"50%, 25%, 10% and 1% are easy to find in your head. Use them to build almost any other percent.",
       notes:[
         "50% = half. Divide by 2.",
         "25% = a quarter. Divide by 4 (or half of a half).",
         "10% = divide by 10. 1% = divide by 100.",
         "Build other percents from these: 5% is half of 10%. 20% is 2 × 10%. 75% is 50% + 25%.",
         "Benchmarks are also great for estimating: 48% of 300 is a bit less than 150."
       ],
       table:{title:"Benchmarks of 80", head:["Percent","How","Answer"], rows:[["50%","80 ÷ 2","40"],["25%","80 ÷ 4","20"],["10%","80 ÷ 10","8"],["5%","half of 10%","4"],["1%","80 ÷ 100","0.8"]]},
       terms:[["Benchmark","A friendly reference number you can use to estimate or build other answers."]],
       work:"Lesson 4 practice sheet.",
       check:[
         {q:"10% of 360 is…", a:["3.6","36","360"], c:1, why:"Divide by 10."},
         {q:"Best way to find 5% of 240?", a:["240 ÷ 5","Half of 10%: 24 ÷ 2","240 × 5"], c:1, why:"10% is 24, so 5% is 12."}
       ]},
      {id:"l12", n:"12", title:"A Fraction Is Also Division",
       big:"The fraction bar means divide. 3/4 is 3 ÷ 4, which is 0.75.",
       notes:[
         "Numerator ÷ denominator. Always top divided by bottom.",
         "3 pizzas shared by 4 people: each person gets 3/4 of a pizza, which is 3 ÷ 4.",
         "Use long division when the denominator doesn't go into 10, 100 or 1000: 5/8 = 5 ÷ 8 = 0.625.",
         "Common mistake: dividing the wrong way (1/4 as 4 ÷ 1 = 4). If your decimal is bigger than 1 for a proper fraction, flip it."
       ],
       terms:[["Numerator","The top number of a fraction."],["Denominator","The bottom number; the number of equal parts."]],
       work:"Lesson 12 practice. Long Division Refresher if you need it.",
       check:[
         {q:"2/5 as a decimal is…", a:["2.5","0.4","0.25"], c:1, why:"2 ÷ 5 = 0.4."},
         {q:"5/8 =", a:["0.625","1.6","0.58"], c:0, why:"5 ÷ 8 = 0.625."}
       ]},
      {id:"l13", n:"13", title:"Terminating Decimals",
       big:"A terminating decimal stops. A fraction in simplest form terminates when its denominator is built only from 2s and 5s.",
       notes:[
         "1/4 = 0.25, 7/8 = 0.875, 11/20 = 0.55, 13/16 = 0.8125. They all stop.",
         "These denominators (2, 4, 5, 8, 10, 16, 20, 25…) all go evenly into 10, 100, 1000 or more.",
         "If the denominator has any other prime factor (3, 7, 11…), the decimal keeps going. 7/30 keeps going because of the 3.",
         "Simplify first: 3/12 = 1/4, which terminates even though 12 has a 3 in it."
       ],
       terms:[["Terminating decimal","A decimal that ends, like 0.375."]],
       work:"Lesson 13 practice and Stop or Keep Going.",
       check:[
         {q:"Which one terminates?", a:["2/3","9/25","5/9","1/6"], c:1, why:"25 = 5 × 5, so 9/25 = 0.36."},
         {q:"Why does 7/30 keep going?", a:["30 is even","30 has a factor of 3","7 is prime"], c:1, why:"Any factor other than 2 or 5 makes it repeat."}
       ]},
      {id:"l14", n:"14", title:"Repeating Decimals and Patterns",
       big:"A repeating decimal has a digit or block of digits that repeats forever. We show it with a bar over the repeating part.",
       notes:[
         "1/3 = 0.333… and 2/3 = 0.666…",
         "Ninths repeat their numerator: 5/9 = 0.555…",
         "Elevenths repeat a 2-digit block: 1/11 = 0.0909…, 4/11 = 0.3636… (9 × the numerator).",
         "Sometimes only part repeats: 1/6 = 0.1666… The bar goes only over the 6.",
         "Rounding: 1/6 ≈ 0.17 ≈ 17%, not 16%."
       ],
       html:`<p style="font-size:20px;margin:0">5/6 = 0.8<span style="text-decoration:overline">3</span> &nbsp;&nbsp; 4/11 = 0.<span style="text-decoration:overline">36</span> &nbsp;&nbsp; 1/7 = 0.<span style="text-decoration:overline">142857</span></p>`,
       terms:[["Repeating decimal","A decimal with a digit or block that repeats forever."],["Bar notation","A line over the digits that repeat."]],
       work:"Lesson 14 practice and the Repeating Match-Up.",
       check:[
         {q:"4/11 as a decimal is…", a:["0.444…","0.3636…","0.411"], c:1, why:"Elevenths repeat 9 × the numerator: 36."},
         {q:"In 0.8333…, the bar goes over…", a:["8 and 3","Only the 3","Only the 8"], c:1, why:"Only the 3 repeats."}
       ]},
      {id:"l15", n:"15", title:"Decimals Back to Fractions",
       big:"Read the decimal's place value, write it as a fraction, then simplify.",
       notes:[
         "0.6 is six tenths = 6/10 = 3/5.",
         "0.45 is 45 hundredths = 45/100 = 9/20.",
         "0.125 is 125 thousandths = 125/1000 = 1/8.",
         "The last digit's place tells you the denominator: tenths → 10, hundredths → 100, thousandths → 1000.",
         "Some repeating decimals are worth knowing: 0.333… = 1/3, 0.666… = 2/3, 0.111… = 1/9."
       ],
       work:"Lesson 15 practice.",
       check:[
         {q:"0.35 in simplest form is…", a:["35/10","7/20","3/5"], c:1, why:"35/100 ÷ 5/5 = 7/20."},
         {q:"0.666… as a fraction is…", a:["6/10","2/3","66/100"], c:1, why:"Repeating 6s is two thirds."}
       ]},
      {id:"l16", n:"16", title:"Fraction-Decimal Investigation and Skill Check",
       big:"Investigation into patterns in fraction-decimal conversions, then the Fraction-Decimal Skill Check.",
       notes:[
         "Review: numerator ÷ denominator, the 2s-and-5s rule for terminating decimals, and bar notation.",
         "If you missed the Skill Check, see Mr. Mangles to book a time to write it."
       ],
       work:"Fraction-Decimal Investigation. Fraction-Decimal Skill Check.",
       check:[
         {q:"Which will repeat?", a:["3/8","7/12","9/50"], c:1, why:"12 = 2 × 2 × 3. The 3 makes it repeat."}
       ]},
      {id:"l05", n:"5", title:"Percent of a Number",
       big:"To find a percent of a number, change the percent to a decimal (or fraction) and multiply.",
       notes:[
         "\"Of\" means multiply. 30% of 50 = 0.30 × 50 = 15.",
         "With a fraction: 25% of 44 = 1/4 of 44 = 44 ÷ 4 = 11.",
         "Estimate first so you can tell if your answer is reasonable. 32% of 80 should be a bit less than a third of 80 (about 26).",
         "The answer is part of the whole, so a percent under 100% always gives an answer smaller than the starting number."
       ],
       terms:[["Part","The amount the percent describes."],["Whole","The total amount, which is 100%."]],
       work:"Lesson 5 practice sheet (Percent of a Number) and the extra Percent Review.",
       check:[
         {q:"30% of 70 =", a:["2.1","21","210"], c:1, why:"0.3 × 70 = 21."},
         {q:"75% of 60 =", a:["45","15","80"], c:0, why:"60 ÷ 4 = 15, times 3 = 45."},
         {q:"Which is a sensible estimate for 49% of 812?", a:["About 40","About 400","About 800"], c:1, why:"49% is almost half."}
       ]},
      {id:"l06", n:"6", title:"Working Backwards",
       big:"If you know the part and the percent, you can find the whole. Find 1% (or 10%) first, then scale up to 100%.",
       notes:[
         "Example: 20% of a number is 14. If 20% is 14, then 10% is 7, so 100% is 70.",
         "Unit-percent method: divide the part by the percent to get 1%, then multiply by 100. 12 is 30% of what? 12 ÷ 30 = 0.4, × 100 = 40.",
         "Finding what percent: part ÷ whole × 100. 18 out of 24 = 0.75 = 75%.",
         "Always ask which of the three you're missing: the part, the whole or the percent."
       ],
       terms:[["Part ÷ whole","Gives the percent as a decimal. Multiply by 100 for the percent."]],
       work:"Lesson 6 practice: Working Backwards.",
       check:[
         {q:"25% of a number is 9. The number is…", a:["36","2.25","34"], c:0, why:"9 is a quarter, so the whole is 9 × 4."},
         {q:"What percent of 40 is 10?", a:["4%","25%","40%"], c:1, why:"10 ÷ 40 = 0.25 = 25%."}
       ]},
      {id:"l07", n:"7", title:"Choosing an Efficient Strategy",
       big:"There's more than one way to find a percent. Pick the fastest one for the numbers you're given.",
       notes:[
         "Easy fraction (F): 50%, 25%, 75%, 10%. 75% of 60 = 60 ÷ 4 × 3 = 45.",
         "Benchmarks (B): build it. 35% of 80 = 25% (20) + 10% (8) = 28. 90% of 40 = 40 − 4 = 36.",
         "Unit percent (U): find 1%, then multiply. 13% of 300: 1% = 3, so 13% = 39.",
         "Decimal (D): when nothing is friendly, multiply by the decimal. 43% of 68 = 0.43 × 68 = 29.24.",
         "In the Method Match-Up you sorted cards before solving. Choosing the method is part of the skill."
       ],
       work:"Lesson 7 practice and the Method Match-Up cards.",
       check:[
         {q:"Fastest way to find 62% of 200?", a:["Find 1% (2) and multiply by 62","Long multiplication","Guess and check"], c:0, why:"1% of 200 is 2, so 62% is 124."},
         {q:"35% of 80 =", a:["28","24","35"], c:0, why:"25% is 20, 10% is 8, and 20 + 8 = 28."}
       ]},
      {id:"l08", n:"8", title:"Percent Problem Solving in Context",
       big:"Read the problem, decide what's missing (part, whole or percent), solve, then ask whether the answer makes sense.",
       notes:[
         "Step 1: Underline what you know. Step 2: Name what's missing. Step 3: Estimate. Step 4: Solve. Step 5: Check if it's reasonable.",
         "Counts of people or objects have to be whole numbers, so round sensibly. 60% of 198 houses is 118.8, which really means about 119 houses.",
         "Class Snapshot: we took class data, turned it into percents, and predicted results for the whole grade.",
         "A sample (one class) can be different from the whole group, so predictions are estimates, not guarantees."
       ],
       terms:[["Reasonable","An answer that fits the situation and your estimate."],["Sample","A smaller group used to predict something about a bigger group."]],
       work:"Lesson 8 practice and Class Snapshot.",
       check:[
         {q:"40% of 25 students take the bus. How many?", a:["10","4","15"], c:0, why:"0.4 × 25 = 10."},
         {q:"An answer says 12.6 buses are needed. What should it be?", a:["12","12.6","13"], c:2, why:"You can't have part of a bus, and 12 isn't enough."}
       ]},
      {id:"l09", n:"9–10", title:"Discounts, Tax and Money",
       big:"The discount is how much you save. Sale price = regular price − discount. Then add 12% Manitoba tax (5% GST + 7% PST) to the sale price.",
       notes:[
         "Discount: 30% off $90 = 0.30 × 90 = $27 saved. Sale price: $90 − $27 = $63.",
         "Shortcut: 30% off means you pay 70%. 0.70 × 90 = $63.",
         "A bigger percent doesn't always save more. 50% off a $36 basketball saves $18, but 30% off $90 shoes saves $27.",
         "Tax = 12% of the price. Total = price + tax, or price × 1.12.",
         "Order matters: discount first, then tax on the sale price. Taking tax on the original price is the most common mistake.",
         "Money rounds to the nearest cent (two decimal places). $1.5588 rounds to $1.56, not $1.55.",
         "Working backwards: a $45 sale price after 25% off is 75% of the regular price, so the regular price is $60."
       ],
       terms:[["Discount","The amount taken off the price."],["Sale price","The price after the discount."],["Regular price","The original price before the sale."],["GST","Goods and Services Tax, federal, 5%."],["PST","Provincial Sales Tax, Manitoba, 7%."]],
       work:"Lesson 9–10 practice: discounts, tax and money.",
       check:[
         {q:"A $40 yoga mat is 25% off. Sale price?", a:["$10","$30","$15"], c:1, why:"Discount is $10, so you pay $30."},
         {q:"Which saves more money?", a:["50% off $20","20% off $80"], c:1, why:"$10 saved vs. $16 saved."},
         {q:"$34 shoes are 25% off. What price do you pay tax on?", a:["$34.00","$25.50","$8.50"], c:1, why:"Take the discount first: 75% of $34 = $25.50."},
         {q:"Round $1.5588 to the nearest cent.", a:["$1.55","$1.56","$1.50"], c:1, why:"The third decimal is 8, so round up."}
       ]},
      {id:"l17", n:"17", title:"Comparing Integers and Decimals",
       big:"On a number line, numbers get bigger as you move right. That's true for negatives too.",
       notes:[
         "−3 is greater than −8, because −3 is to the right of −8.",
         "To compare decimals, line up the decimal points and compare place by place. 0.5 > 0.45 because 5 tenths beats 4 tenths.",
         "Adding a zero helps: 0.5 = 0.50, and 0.50 > 0.45.",
         "A longer decimal isn't automatically bigger. 0.3 > 0.297."
       ],
       terms:[["Integer","A whole number or its opposite: …, −2, −1, 0, 1, 2, …"]],
       work:"Lesson 17 practice.",
       check:[
         {q:"Which is greater?", a:["−2.5","−2.05"], c:1, why:"−2.05 is closer to zero, so it's further right."},
         {q:"Which is greatest?", a:["0.4","0.39","0.399"], c:0, why:"0.400 > 0.399 > 0.390."}
       ]},
      {id:"l18", n:"18", title:"Comparing Fractions with Benchmarks",
       big:"Compare fractions to 0, 1/2 and 1 before doing any calculating.",
       notes:[
         "Is it more or less than half? 3/7 < 1/2 because half of 7 is 3.5. 5/8 > 1/2.",
         "Close to 1? 9/10 and 11/12 are both close; the one with the smaller missing piece is bigger. 11/12 is missing 1/12, which is smaller than 1/10.",
         "Same numerator: the smaller denominator is bigger. 3/5 > 3/8.",
         "Same denominator: compare numerators.",
         "When benchmarks don't settle it, use common denominators or decimals."
       ],
       terms:[["Benchmark fraction","A friendly fraction like 0, 1/2 or 1 used for comparing."]],
       work:"Lesson 18 practice.",
       check:[
         {q:"Which is greater: 4/9 or 5/8?", a:["4/9","5/8"], c:1, why:"4/9 is under half; 5/8 is over half."},
         {q:"Which is greater: 6/7 or 8/9?", a:["6/7","8/9"], c:1, why:"8/9 is only 1/9 away from 1, and 1/9 < 1/7."}
       ]},
      {id:"l19", n:"19–20", title:"Comparing Mixed Forms and Number Lines",
       big:"To compare a fraction, a decimal and a percent, change them all into the same form first. Number lines help you place them, and there's always another number in between.",
       notes:[
         "Order 3/5, 0.58 and 62%: 0.60, 0.58, 0.62. So 0.58 < 3/5 < 62%.",
         "Write each one in the same form, put them in order, then go back to the original forms for your answer.",
         "Watch for percents over 100% and mixed numbers: 1 1/4 = 1.25 = 125%.",
         "Between 0.4 and 0.5 there's 0.45, 0.41, 0.499… infinitely many.",
         "To place a number on a line, decide which two marks it falls between first, then estimate.",
         "Error analysis: find the mistake, explain why it's wrong, and fix it. That's how you prove you understand."
       ],
       work:"Lesson 19–20 practice.",
       check:[
         {q:"Order from least to greatest: 0.7, 2/3, 72%", a:["2/3, 0.7, 72%","0.7, 2/3, 72%","72%, 0.7, 2/3"], c:0, why:"0.667, 0.70, 0.72."},
         {q:"Which number is between 1/4 and 1/3?", a:["0.2","0.3","0.35"], c:1, why:"1/4 = 0.25 and 1/3 = 0.333…"},
         {q:"A student says 0.25 > 0.3 because 25 > 3. What's the error?", a:["Nothing, they're right","Comparing digits instead of place value","They should have used percents"], c:1, why:"0.25 is 25 hundredths; 0.3 is 30 hundredths."}
       ]},
      {id:"l21", n:"21", title:"Percent Skill Check and Unit Review",
       big:"Short Percent Skill Check first, then a review of the whole unit before the test.",
       notes:[
         "The Percent Skill Check covers percent of a number, working backwards, discounts and tax. If you missed it, see Mr. Mangles to book a time to write it.",
         "Percents: percent of a number, working backwards, discounts, tax (discount first).",
         "Fractions ↔ decimals: divide, the 2s-and-5s rule, bar notation, back to fractions.",
         "Comparing: benchmarks, same form, number lines.",
         "Use the practice tool on this page to make as many new questions as you want."
       ],
       work:"Percent Skill Check, then Unit Review: Prove It.",
       check:[
         {q:"A $50 game is 20% off. Total with 12% tax?", a:["$44.80","$46.00","$40.00"], c:0, why:"Sale price $40, tax $4.80, total $44.80."},
         {q:"Blue 28%, green 17%, red 35%. What percent is yellow?", a:["20%","80%","25%"], c:0, why:"28 + 17 + 35 = 80, and 100 − 80 = 20."}
       ]},
      {id:"l22", n:"22", title:"Unit Assessment",
       big:"Unit 1 test. If you were away, see Mr. Mangles to book a time to write it.",
       notes:["Bring a pencil and a calculator. Use the Unit Review and the practice tool to get ready."],
       work:"Unit 1 Assessment."}
    ]
  },
  {
    id:"prob", n:"2", name:"Probability", status:"next", when:"November 3 – 9",
    intro:"How likely is something to happen? We write probability as a fraction, decimal, percent or ratio, then compare what should happen with what actually happens.",
    after:"Coming up in this unit: impossible, certain, \"not\" and spinners; experimental vs. theoretical probability; skill check (Nov 9).",
    lessons:[
      {id:"p1", n:"1", title:"Probability of an Outcome",
       big:"Probability = favourable outcomes ÷ ALL possible outcomes.",
       notes:[
         "An outcome is one possible result. Rolling a 4 on a die is one outcome.",
         "A favourable outcome is the result you're looking for.",
         "A bag with 3 red and 9 blue counters has 12 counters in all. P(red) = 3/12 = 1/4.",
         "The denominator is always the total. Count everything in the bag first. 3/9 is a common mistake.",
         "Simplify your fraction when you can."
       ],
       terms:[["Outcome","One possible result of an experiment."],["Favourable outcome","The result you want to happen."],["Probability","How likely an event is: favourable ÷ total."]],
       work:"Lesson 1 practice sheet.",
       check:[
         {q:"A bag has 2 green, 5 red and 3 yellow. P(red) =", a:["5/10 = 1/2","5/5","5/3"], c:0, why:"10 counters in all, and 5 are red."},
         {q:"P(rolling a number greater than 4 on a die) =", a:["4/6","2/6 = 1/3","1/6"], c:1, why:"5 and 6 are favourable: 2 out of 6."}
       ]},
      {id:"p2", n:"2", title:"Probability as Fractions, Decimals and Percents",
       big:"A probability can be written as a fraction, a decimal, a percent or a ratio. It's the same chance in every form.",
       notes:[
         "P(even on a die) = 3/6 = 1/2 = 0.5 = 50%, or 3 : 6 as a ratio.",
         "To convert: numerator ÷ denominator gives the decimal; × 100 gives the percent.",
         "Some will repeat: P(4 on a die) = 1/6 = 0.1666… ≈ 17%. Round 0.1666… to 17%, not 16%.",
         "1/3 isn't 0.3 or 0.33. It's 0.333…, about 33%."
       ],
       terms:[["Ratio","A comparison written with a colon, like 3 : 6."]],
       work:"Lesson 2 practice sheet. Roll, Convert, Pass.",
       check:[
         {q:"P = 3/4. As a percent?", a:["34%","75%","43%"], c:1, why:"3 ÷ 4 = 0.75 = 75%."},
         {q:"P(rolling a 1 or 2) on a die, as a percent?", a:["about 33%","about 12%","20%"], c:0, why:"2/6 = 1/3 ≈ 33%."}
       ]}
    ]
  },
  {id:"div", n:"3", name:"Divisibility", status:"soon", when:"November 10 – 13", intro:"Divisibility rules, factors and multiples.", lessons:[]},
  {id:"fracops", n:"4", name:"Fraction Operations", status:"soon", when:"Mid-November", intro:"Adding and subtracting fractions and mixed numbers.", lessons:[]},
  {id:"int", n:"5", name:"Integer Operations", status:"soon", when:"Later this year", intro:"Adding and subtracting integers.", lessons:[]},
  {id:"eq", n:"6", name:"Patterns and Equations", status:"soon", when:"Later this year", intro:"Patterns, expressions and one-step equations.", lessons:[]},
  {id:"lin", n:"7", name:"Linear Equations and the Coordinate Plane", status:"soon", when:"Later this year", intro:"", lessons:[]},
  {id:"circ", n:"8", name:"Circles", status:"soon", when:"Later this year", intro:"", lessons:[]},
  {id:"area", n:"9", name:"Area and Circle Graphs", status:"soon", when:"Later this year", intro:"", lessons:[]},
  {id:"dec", n:"10", name:"Decimal Operations", status:"soon", when:"Later this year", intro:"", lessons:[]},
  {id:"prob2", n:"11", name:"Two-Event Probability", status:"soon", when:"Later this year", intro:"", lessons:[]},
  {id:"pat2", n:"12", name:"Patterns Revisited", status:"soon", when:"Later this year", intro:"", lessons:[]},
  {id:"geo", n:"13", name:"Geometric Constructions", status:"soon", when:"Later this year", intro:"", lessons:[]}
  ]
};
