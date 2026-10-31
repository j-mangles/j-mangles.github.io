window.HUB = {
  subject: "math",
  units: [
  {
    id:"fdp", n:"1", name:"Fractions, Decimals and Percents", status:"now", when:"September – November 6",
    intro:"One amount can be written three ways. We are learning to switch between fractions, decimals and percents, find percents of numbers, work with sales and tax, and compare numbers in any form.",
    after:"Coming up in this unit: percent problems in context (Oct 28); discounts, tax and money (Oct 29); comparing integers, decimals and fractions (Nov 2); mixed forms and number lines (Nov 3); Percent Skill Check and review (Nov 4); whiteboard review (Nov 5); Unit 1 test (Fri Nov 6).",
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
    id:"prob", n:"2", name:"Probability", status:"next", when:"November 9 – 16",
    intro:"How likely is something to happen? We write probability as a fraction, decimal, percent or ratio, then compare what should happen with what actually happens.",
    after:"Coming up in this unit: impossible, certain, \"not\" and spinners; experimental vs. theoretical probability; skill check (Nov 16).",
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
       ]},
      {id:"p3", n:"3", title:"Impossible, Certain and 'Not'",
       big:"Probability runs from 0 (impossible) to 1 (certain). The chance an event does NOT happen is 1 minus the chance it does.",
       notes:[
         "P(impossible) = 0 = 0%. P(certain) = 1 = 100%. Every probability is between 0 and 1.",
         "A fair die cannot roll a 7: P(7) = 0. A fair die always shows a number 1 through 6: probability 1.",
         "To find the opposite event, subtract from 1. If P(red) = 3/10, P(not red) = 7/10.",
         "Changing the sample space changes the probabilities. A spinner with two equal colours is different from one with eight sections, six of them blue.",
         "A chance of 25% does not promise one success in every four trials. It is a long-run prediction."
       ],
       terms:[["Certain event","An event with probability 1 or 100%."],["Impossible event","An event with probability 0 or 0%."],["Complement","The 'not' version of an event; their probabilities add to 1."]],
       work:"Notebook: order six events from impossible to certain, then calculate P(not red) for three bags. Optional: explore the Probability Bag on the unit page.",
       check:[
         {q:"A bag has 2 green and 6 yellow. P(not green) is…", a:["2/8","6/8","2/6"], c:1, why:"Six of the eight counters are not green."},
         {q:"An event has a 45% chance. Its opposite has…", a:["55%","45%","145%"], c:0, why:"Together they total 100%."},
         {q:"If P(A) = 0, the event is…", a:["Certain","Impossible","Equally likely"], c:1, why:"Zero means it cannot occur."}
       ]},
      {id:"p4", n:"4", title:"Two Independent Events and Sample Spaces",
       big:"When events do not affect each other, list ALL ordered outcomes using a table or tree diagram; multiply the chances to find a pair.",
       notes:[
         "Flip a fair coin twice. The complete sample space is HH, HT, TH, TT: four equally likely outcomes.",
         "P(HH) = 1/2 × 1/2 = 1/4 = 25%. P(exactly one head) = 2/4 = 50%, because HT and TH both count.",
         "Roll a die and flip a coin: 6 × 2 = 12 equally likely ordered pairs. A 6 and heads is just one of those twelve.",
         "Two events are independent when the first does not change the chance of the second. Replacing a drawn counter before the next draw keeps probabilities the same.",
         "For two dice there are 6 × 6 = 36 equally likely ordered pairs, including (1,2) and (2,1). Make a 6-by-6 table so you do not miss any.",
         "If colour groups have different counts, colour outcomes RR, RB, BR, BB need not be equally likely. Multiply each event's chance rather than assigning 1/4 automatically."
       ],
       table:{title:"Two coin flips: complete sample space",head:["First flip","Second flip","Ordered outcome"],rows:[["H","H","HH"],["H","T","HT"],["T","H","TH"],["T","T","TT"]]},
       terms:[["Sample space","Every possible outcome of an experiment."],["Independent events","Events where one result does not change the chance of the other."],["Ordered pair","Two results in sequence, such as (heads, tails)."]],
       work:"Draw a tree diagram for two coin flips, then a 2-by-6 table for a coin and die. Find P(two heads), P(one head) and P(heads and six).",
       check:[
         {q:"Flip a coin twice. P(exactly one head) is…", a:["1/4","1/2","3/4"], c:1, why:"HT and TH: 2 outcomes out of 4."},
         {q:"Roll a die and flip a coin. How many equally likely pairs?", a:["6","8","12"], c:2, why:"6 die faces × 2 coin faces = 12."},
         {q:"Two dice: How many ordered outcomes?", a:["12","36","18"], c:1, why:"6 rows by 6 columns = 36."}
       ]},
      {id:"p5", n:"5", title:"Prediction vs. Experiment: Two Events",
       big:"A theoretical probability comes from the sample space. Experimental probability comes from what actually happened.",
       notes:[
         "First make a table or tree diagram of the possible pair outcomes. That gives theoretical probabilities.",
         "For two fair coin flips, P(HH) = 1/4. After 20 pairs, 3 HH results would give an experimental probability of 3/20 = 15%.",
         "With more trials, the experimental proportion often approaches the theoretical chance, but it can move away over short stretches.",
         "Drawing a counter twice WITH replacement is independent. Without replacement the second draw changes, so these are not independent events.",
         "Compare your prediction to the experiment using counts and percents. A difference is not proof that the model is wrong."
       ],
       terms:[["Theoretical probability","A prediction based on all possible outcomes and their chances."],["Experimental probability","The number of successful trials divided by all trials."]],
       work:"Open 'Probability Investigation' from the Math 7 course shortcuts. Complete both single-draw and two-draw experiments, then write a claim supported by your results.",
       check:[
         {q:"Theory predicts 25%. You saw 7 successes in 20 pairs. Experimental chance?", a:["25%","35%","7%"], c:1, why:"7 ÷ 20 = 0.35 = 35%."},
         {q:"Why replace the counter between two draws?", a:["To make the events independent","To increase the number of counters","To make red more likely"], c:0, why:"The bag returns to its original composition before the second draw."},
         {q:"Which experiment is more likely to reflect a 25% theoretical chance?", a:["10 independent trials","1,000 independent trials","Both always equal 25%"], c:1, why:"Larger samples tend to be more stable, but are not guaranteed exact."}
       ]},
      {id:"p6", n:"6", title:"Probability Review and Skill Check",
       big:"Explain the sample space and show why your probability is reasonable; don't just guess an answer.",
       notes:[
         "Review 7.SP.4: write probabilities as ratios, fractions and percents.",
         "Review 7.SP.5: list at most 36 outcomes for two independent events with a table or tree diagram.",
         "Review 7.SP.6: conduct two-event experiments and compare the theoretical result to your experimental result.",
         "For your evidence, show the favourable outcomes and the entire sample space. Explain whether events are independent."
       ],
       work:"Use the unit review and the Chance Lab. Teacher provides the skill check when ready.",
       check:[
         {q:"Two coins: P(at least one tail) =", a:["1/4","2/4","3/4"], c:2, why:"HT, TH and TT are three of the four outcomes."},
         {q:"A 6-sided die and a coin yield…", a:["8 ordered pairs","12 ordered pairs","36 ordered pairs"], c:1, why:"6 × 2 = 12."}
       ]}
    ]
  },
  {
   id:"div", n:"3", name:"Divisibility", status:"soon", when:"November 17 – 19",
   intro:"Explain WHY a number is or is not divisible by 2, 3, 4, 5, 6, 8, 9 or 10. Test each rule with examples, not guesses.",
   after:"Use the Divisibility Detective on this unit page for unlimited practice. Curriculum outcome 7.N.1.",
   lessons:[
    {id:"d1",n:"1",title:"Divisibility by 2, 5 and 10",
     big:"Divisibility means a whole-number quotient with no remainder. The last digit reveals divisibility by 2, 5 and 10.",
     notes:[
      "Divisible by 2: last digit is 0, 2, 4, 6 or 8. Example: 348 ends in 8.",
      "Divisible by 5: last digit is 0 or 5. Example: 735 ends in 5.",
      "Divisible by 10: last digit is 0. Example: 240 ends in 0.",
      "A number ending in 0 is divisible by 2, 5 and 10. A number ending in 5 is divisible by 5 but not 2 or 10.",
      "A number is divisible by a divisor when there is no remainder after dividing."
     ],
     terms:[["Divisible","Gives a whole-number answer with no remainder."],["Remainder","The amount left after grouping equally."]],
     work:"Notebook: test 128, 345, 600, 729 and 410 by 2, 5 and 10. Explain each decision.",
     check:[
      {q:"Which number is divisible by both 2 and 5?",a:["135","250","128"],c:1,why:"250 ends in 0, so 2, 5 and 10 all divide it."},
      {q:"Is 718 divisible by 10?",a:["Yes","No"],c:1,why:"718 ends in 8, not 0."}
     ]},
    {id:"d2",n:"2",title:"Divisibility by 3 and 9",
     big:"For 3 and 9, add the digits. If the digit sum is divisible by 3 or 9, so is the original number.",
     notes:[
      "For 462, the digit sum is 4 + 6 + 2 = 12. Twelve is divisible by 3, so 462 is too.",
      "For 729, the sum is 7 + 2 + 9 = 18. Eighteen is divisible by 9, so 729 is too.",
      "Divisible by 9 always means divisible by 3. The reverse is not always true: 111 has digit sum 3, so it is divisible by 3 but not 9.",
      "The rule works because each place value (10, 100, 1000) is one more than a multiple of 9, and therefore of 3.",
      "Always explain using the digit sum instead of relying on a calculator."
     ],
     terms:[["Digit sum","The total of the digits in a whole number."]],
     work:"Find digit sums for 234, 327, 648, 1,245 and 2,016. Classify them as divisible by 3, 9, both or neither.",
     check:[
      {q:"Which is divisible by 9?",a:["234","513","444"],c:1,why:"5 + 1 + 3 = 9."},
      {q:"A number is divisible by 9. Is it always divisible by 3?",a:["Yes","No"],c:0,why:"Every multiple of 9 is also a multiple of 3."}
     ]},
    {id:"d3",n:"3",title:"Divisibility by 4 and 8",
     big:"Only the final two digits matter for 4, and the final three digits matter for 8.",
     notes:[
      "Divisible by 4: check the last two digits. 1,316 ends in 16, and 16 ÷ 4 = 4, so 1,316 is divisible by 4.",
      "Divisible by 8: check the last three digits. 2,128 ends in 128, and 128 ÷ 8 = 16, so 2,128 is divisible by 8.",
      "Why it works: 100 is a multiple of 4, while 1000 is a multiple of 8. Earlier digits cannot change the remainder.",
      "Every multiple of 8 is a multiple of 4 and 2. A multiple of 4 need not be a multiple of 8.",
      "A number ending in 00 is divisible by 4; a number ending in 000 is divisible by 8."
     ],
     work:"Test 624, 1,112, 2,340, 3,216 and 5,718 using the final two or three digits. Explain.",
     check:[
      {q:"Is 1,124 divisible by 4?",a:["Yes","No"],c:0,why:"The final two digits, 24, divide evenly by 4."},
      {q:"Is 1,124 divisible by 8?",a:["Yes","No"],c:1,why:"124 ÷ 8 leaves a remainder of 4."}
     ]},
    {id:"d4",n:"4",title:"The Rule of 6, Zero and Divisibility Review",
     big:"Divisible by 6 means divisible by BOTH 2 and 3. Division by zero is undefined.",
     notes:[
      "A number is divisible by 6 when it is even AND its digits add to a multiple of 3: 426 is even and 4 + 2 + 6 = 12, so it is divisible by 6.",
      "It is not enough to pass only one test. 222 passes both; 224 passes 2 but fails 3; 225 passes 3 but fails 2.",
      "Division by 0 is undefined. No number can be multiplied by 0 to produce a nonzero number. Even 0 ÷ 0 has no single answer.",
      "Use a table to decide which of 2, 3, 4, 5, 6, 8, 9 and 10 divide a given number.",
      "Explain the rule you used. In Grade 7, a correct 'no' with clear reasoning is as valuable as a correct 'yes'."
     ],
     terms:[["Undefined","An operation that does not have a valid numerical result in this context."]],
     work:"Open Divisibility Detective on this unit page. Check 360, 648 and 1,245, then write your own three mystery numbers.",
     check:[
      {q:"Which number is divisible by 6?",a:["225","224","234"],c:2,why:"234 is even and its digit sum is 9."},
      {q:"What is 14 ÷ 0?",a:["0","14","Undefined"],c:2,why:"Zero times any number is zero; it cannot produce 14."},
      {q:"If a number divides evenly by 8, must it divide evenly by 4?",a:["Yes","No"],c:0,why:"Every multiple of 8 is also a multiple of 4."}
     ]}
   ]
  },
  {id:"fracops", n:"4", name:"Fraction Operations", status:"soon", when:"Late November",
   intro:"Adding and subtracting fractions and mixed numbers. We start with two tools, the GCF and LCM, then add and subtract with like denominators, unlike denominators and mixed numbers, and finish with a skill check.",
   lessons:[
 {
  "id": "l01",
  "n": "1",
  "title": "GCF and LCM",
  "big": "The GCF is the biggest number that divides into both numbers. The LCM is the smallest number both numbers divide into. We use the GCF to simplify fractions and the LCM to find common denominators.",
  "notes": [
   "Factors divide a number evenly, and there are only a few of them. Multiples are what you get when you count by the number, and they go on forever. A factor is never bigger than the number. A multiple is never smaller.",
   "GCF: list the factors of each number in pairs (1 × 18, 2 × 9, 3 × 6), circle the ones in both lists and take the biggest. The GCF of 12 and 18 is 6.",
   "LCM: list multiples of each number and stop at the first match. The LCM of 4 and 6 is 12. 24 is also a common multiple, but 12 comes first.",
   "For bigger numbers, prime factors are faster. 24 = 2 × 2 × 2 × 3 and 36 = 2 × 2 × 3 × 3. GCF = what they share: 2 × 2 × 3 = 12. LCM = everything needed: 2 × 2 × 2 × 3 × 3 = 72.",
   "Divide the top and bottom by the GCF to simplify in one step: 24/36 → 24 ÷ 12 and 36 ÷ 12 = 2/3.",
   "Common mistake: multiplying the two numbers to get the LCM. 4 × 6 = 24 is a common multiple, but not always the least one."
  ],
  "table": {
   "title": "Which one do I need?",
   "head": [
    "GCF",
    "LCM"
   ],
   "rows": [
    [
     "Splitting things into equal groups",
     "Things that repeat and line up again"
    ],
    [
     "The biggest group size that works",
     "The first time both happen together"
    ],
    [
     "Simplifying a fraction",
     "Finding a common denominator"
    ]
   ]
  },
  "html": "<h3>Worked examples</h3><div class=\"task\" style=\"margin-bottom:12px\"><p><b>Find the GCF of 12 and 18.</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>12: 1, 2, 3, 4, 6, 12 <span style=\"display:block;font-size:.92em;color:var(--muted)\">List the factors.</span></li><li>18: 1, 2, 3, 6, 9, 18 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Work in pairs: 1 × 18, 2 × 9, 3 × 6.</span></li><li>Common: 1, 2, 3, 6 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Circle the ones in both lists.</span></li><li>Greatest: 6 <span style=\"display:block;font-size:.92em;color:var(--muted)\">The biggest number that divides both.</span></li></ol><p>Answer: <b>6</b></p></div><div class=\"task\" style=\"margin-bottom:12px\"><p><b>Bus A leaves every 6 minutes and Bus B every 8 minutes. Both leave at 9:00. When do they next leave together?</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>Repeating and lining up: LCM <span style=\"display:block;font-size:.92em;color:var(--muted)\">Decide which tool first.</span></li><li>6, 12, 18, 24 and 8, 16, 24 <span style=\"display:block;font-size:.92em;color:var(--muted)\">List multiples until they match.</span></li><li>LCM of 6 and 8 is 24 <span style=\"display:block;font-size:.92em;color:var(--muted)\">24 minutes after 9:00.</span></li></ol><p>Answer: <b>9:24</b></p></div>",
  "terms": [
   [
    "Factor",
    "A number that divides another number evenly."
   ],
   [
    "Multiple",
    "The product of a number and a whole number; what you get counting by that number."
   ],
   [
    "GCF",
    "Greatest common factor: the largest factor two numbers share."
   ],
   [
    "LCM",
    "Least common multiple: the smallest multiple two numbers share."
   ],
   [
    "Prime factorization",
    "Writing a number as a product of prime numbers, like 24 = 2 × 2 × 2 × 3."
   ]
  ],
  "work": "Lesson 1 practice sheet, Parts A to E. Part F is a challenge.",
  "check": [
   {
    "q": "The GCF of 15 and 25 is…",
    "a": [
     "3",
     "25",
     "5",
     "75"
    ],
    "c": 2,
    "why": "Factors of 15: 1, 3, 5, 15. Factors of 25: 1, 5, 25. The biggest shared one is 5."
   },
   {
    "q": "The LCM of 6 and 9 is…",
    "a": [
     "18",
     "3",
     "36",
     "54"
    ],
    "c": 0,
    "why": "6, 12, 18 and 9, 18. The first match is 18. 54 = 6 × 9 works, but it isn't the least."
   },
   {
    "q": "18/24 in simplest form is…",
    "a": [
     "9/12",
     "6/8",
     "2/3",
     "3/4"
    ],
    "c": 3,
    "why": "The GCF of 18 and 24 is 6. 18 ÷ 6 = 3 and 24 ÷ 6 = 4."
   },
   {
    "q": "Two lights flash together. One flashes every 4 seconds, the other every 10 seconds. When do they next flash together?",
    "a": [
     "After 14 seconds",
     "After 20 seconds",
     "After 40 seconds",
     "After 2 seconds"
    ],
    "c": 1,
    "why": "Repeating and lining up means LCM. 4, 8, 12, 16, 20 and 10, 20."
   }
  ]
 },
 {
  "id": "l02",
  "n": "2",
  "title": "Adding and Subtracting: Like Denominators",
  "big": "When the denominators match, the pieces are already the same size. Add or subtract the numerators, keep the denominator, then simplify.",
  "notes": [
   "The denominator names the size of the piece. The numerator counts the pieces. Three eighths plus two eighths is five eighths: 3/8 + 2/8 = 5/8.",
   "Keep the denominator, then simplify with the GCF: 5/12 + 1/12 = 6/12 = 1/2.",
   "Subtracting works the same way: 7/10 − 3/10 = 4/10 = 2/5.",
   "If the answer is improper, write it as a mixed number: 5/6 + 5/6 = 10/6 = 1 4/6 = 1 2/3.",
   "Mixed numbers: add the wholes, add the fractions, then regroup if the fractions made another whole. 2 3/5 + 1 4/5 = 3 + 7/5 = 3 + 1 2/5 = 4 2/5.",
   "To subtract from 1, write 1 with the same denominator: 1 − 5/8 = 8/8 − 5/8 = 3/8.",
   "Common mistake: adding the denominators too, like 3/8 + 2/8 = 5/16. The pieces are still eighths. Adding can't make an amount smaller, and 5/16 is less than 3/8."
  ],
  "html": "<h3>Worked examples</h3><div class=\"task\" style=\"margin-bottom:12px\"><p><b>5/6 + 5/6</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>5 + 5 = 10, so 10/6 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Improper: more than one whole.</span></li><li>10/6 = 1 4/6 <span style=\"display:block;font-size:.92em;color:var(--muted)\">6 sixths make one whole, with 4 sixths left.</span></li><li>1 4/6 = 1 2/3 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Simplify the fraction part.</span></li></ol><p>Answer: <b>1 2/3</b></p></div><div class=\"task\" style=\"margin-bottom:12px\"><p><b>A pizza has 8 slices. Sam eats 3/8 and Lee eats 2/8. What fraction is left?</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>Eaten: 3/8 + 2/8 = 5/8 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Add what was eaten.</span></li><li>Whole pizza = 8/8 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Write 1 with the same denominator.</span></li><li>8/8 − 5/8 = 3/8 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Subtract from the whole.</span></li></ol><p>Answer: <b>3/8 of the pizza</b></p></div>",
  "terms": [
   [
    "Numerator",
    "The top number: how many pieces."
   ],
   [
    "Denominator",
    "The bottom number: what size the pieces are."
   ],
   [
    "Improper fraction",
    "A fraction where the numerator is bigger than the denominator, like 10/6."
   ],
   [
    "Mixed number",
    "A whole number and a fraction together, like 1 2/3."
   ],
   [
    "Simplest form",
    "A fraction whose numerator and denominator share no factor except 1."
   ]
  ],
  "work": "Lesson 2 practice sheet, Parts A to E. Part F is a challenge.",
  "check": [
   {
    "q": "2/7 + 3/7 =",
    "a": [
     "5/14",
     "5/7",
     "6/7",
     "6/14"
    ],
    "c": 1,
    "why": "Same-size pieces: 2 sevenths + 3 sevenths = 5 sevenths. The denominator stays 7."
   },
   {
    "q": "11/12 − 5/12 in simplest form is…",
    "a": [
     "6/12",
     "6/24",
     "3/4",
     "1/2"
    ],
    "c": 3,
    "why": "11 − 5 = 6, so 6/12. The GCF of 6 and 12 is 6, so 6/12 = 1/2."
   },
   {
    "q": "5/8 + 7/8 as a mixed number is…",
    "a": [
     "1 1/2",
     "12/16",
     "1 3/8",
     "2"
    ],
    "c": 0,
    "why": "12/8 = 1 4/8 = 1 1/2."
   },
   {
    "q": "3 5/6 − 1 1/6 =",
    "a": [
     "2 4/12",
     "4 2/3",
     "2 2/3",
     "2 1/2"
    ],
    "c": 2,
    "why": "Wholes: 3 − 1 = 2. Fractions: 5/6 − 1/6 = 4/6 = 2/3."
   }
  ]
 },
 {
  "id": "l03",
  "n": "3",
  "title": "Adding and Subtracting: Unlike Denominators",
  "big": "Halves and thirds are different-sized pieces, so you can't just count them together. Rename both fractions with a common denominator first. Then it's a like-denominator question.",
  "notes": [
   "Same four steps every time: find the lowest common denominator (LCD), rename both fractions, add or subtract the numerators, then simplify and regroup.",
   "The LCD is the LCM of the denominators. For 1/2 + 1/3 the LCD is 6, so 3/6 + 2/6 = 5/6.",
   "Rename by multiplying the top and bottom by the same number: 3/4 = 9/12 (× 3) and 1/6 = 2/12 (× 2).",
   "Look for the lowest. For 4 and 6 the LCD is 12, not 24. 24 still works, but you'll have bigger numbers to simplify at the end.",
   "If one denominator is a multiple of the other, only one fraction needs renaming: 2/3 + 5/6 = 4/6 + 5/6 = 9/6 = 1 1/2.",
   "Mixed numbers: rename the fraction parts only. 1 1/2 + 2 2/3 = 1 3/6 + 2 4/6 = 3 7/6 = 4 1/6.",
   "Common mistake: adding tops and bottoms, like 1/2 + 1/3 = 2/5. You started with 1/2 and added more, so the answer has to be bigger than 1/2. 2/5 is smaller."
  ],
  "html": "<h3>Worked examples</h3><div class=\"task\" style=\"margin-bottom:12px\"><p><b>3/4 − 1/6</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>LCD of 4 and 6 is 12 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Not 24. Look for the lowest.</span></li><li>3/4 = 9/12 and 1/6 = 2/12 <span style=\"display:block;font-size:.92em;color:var(--muted)\">× 3 and × 2, top and bottom.</span></li><li>9/12 − 2/12 = 7/12 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Can&#x27;t be simplified.</span></li></ol><p>Answer: <b>7/12</b></p></div><div class=\"task\" style=\"margin-bottom:12px\"><p><b>A recipe needs 3/4 cup of white sugar and 1/3 cup of brown sugar. How much sugar altogether?</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>3/4 + 1/3, LCD 12 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Altogether means add.</span></li><li>9/12 + 4/12 = 13/12 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Rename both, then add.</span></li><li>13/12 = 1 1/12 <span style=\"display:block;font-size:.92em;color:var(--muted)\">A little more than 1 cup.</span></li></ol><p>Answer: <b>1 1/12 cups</b></p></div>",
  "terms": [
   [
    "Common denominator",
    "A denominator both fractions can be renamed with."
   ],
   [
    "Lowest common denominator (LCD)",
    "The smallest common denominator; the LCM of the denominators."
   ],
   [
    "Equivalent fractions",
    "Fractions that name the same amount, like 1/2 and 3/6."
   ]
  ],
  "work": "Lesson 3 practice sheet, Parts A to E. Part F is a challenge.",
  "check": [
   {
    "q": "The lowest common denominator for 3/4 and 1/6 is…",
    "a": [
     "24",
     "10",
     "6",
     "12"
    ],
    "c": 3,
    "why": "Multiples of 4: 4, 8, 12. Multiples of 6: 6, 12. 24 works, but 12 is the lowest."
   },
   {
    "q": "1/3 + 1/4 =",
    "a": [
     "2/7",
     "7/12",
     "1/12",
     "2/12"
    ],
    "c": 1,
    "why": "LCD 12: 4/12 + 3/12 = 7/12."
   },
   {
    "q": "7/8 − 1/4 =",
    "a": [
     "6/4",
     "3/4",
     "5/8",
     "1/2"
    ],
    "c": 2,
    "why": "1/4 = 2/8, so 7/8 − 2/8 = 5/8."
   },
   {
    "q": "2 3/4 + 1 1/2 =",
    "a": [
     "4 1/4",
     "3 4/6",
     "3 5/8",
     "4 1/2"
    ],
    "c": 0,
    "why": "1/2 = 2/4. Wholes: 3. Fractions: 3/4 + 2/4 = 5/4 = 1 1/4. So 3 + 1 1/4 = 4 1/4."
   }
  ]
 },
 {
  "id": "l04",
  "n": "4",
  "title": "Subtracting Mixed Numbers",
  "big": "If the first fraction is too small to subtract from, borrow one whole and turn it into a fraction. 3 1/4 becomes 2 5/4: the same amount, written so you can subtract.",
  "notes": [
   "Check the fractions first. In 3 1/4 − 1 3/4 you can't take 3/4 away from 1/4, so you need to borrow.",
   "Borrow by trading one whole for a fraction with the same denominator: 3 1/4 = 2 + 4/4 + 1/4 = 2 5/4.",
   "Then subtract wholes and subtract fractions: 2 5/4 − 1 3/4 = 1 2/4 = 1 1/2.",
   "A whole number has no fraction part, so borrow right away: 5 − 2 3/8 = 4 8/8 − 2 3/8 = 2 5/8.",
   "With unlike denominators, rename first, then decide if you need to borrow. 4 1/3 − 1 1/2 = 4 2/6 − 1 3/6 = 3 8/6 − 1 3/6 = 2 5/6.",
   "Not every question needs borrowing: 5 5/6 − 2 1/4 = 5 10/12 − 2 3/12 = 3 7/12.",
   "Another way: change both to improper fractions. 13/4 − 7/4 = 6/4 = 1 1/2. You never need to borrow, but the numbers get big when there are lots of wholes.",
   "Common mistake: flipping the fractions and doing 3/4 − 1/4 instead. Check a subtraction by adding back: your answer plus what you took away should give what you started with."
  ],
  "html": "<h3>Worked examples</h3><div class=\"task\" style=\"margin-bottom:12px\"><p><b>5 − 2 3/8</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>5 has no fraction part: borrow <span style=\"display:block;font-size:.92em;color:var(--muted)\">The denominator we need is 8.</span></li><li>5 = 4 8/8 <span style=\"display:block;font-size:.92em;color:var(--muted)\">One whole becomes 8/8.</span></li><li>4 8/8 − 2 3/8 = 2 5/8 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Subtract wholes, subtract fractions.</span></li></ol><p>Answer: <b>2 5/8</b></p></div><div class=\"task\" style=\"margin-bottom:12px\"><p><b>A rope is 6 1/4 m long. A piece 2 2/3 m long is cut off. How much rope is left?</b></p><ol style=\"margin:8px 0;padding-left:22px;display:grid;gap:4px\"><li>LCD 12: 6 3/12 − 2 8/12 <span style=\"display:block;font-size:.92em;color:var(--muted)\">Rename first.</span></li><li>3/12 is less than 8/12: borrow <span style=\"display:block;font-size:.92em;color:var(--muted)\">6 3/12 = 5 15/12.</span></li><li>5 15/12 − 2 8/12 = 3 7/12 <span style=\"display:block;font-size:.92em;color:var(--muted)\">A bit more than 3 1/2 m, which makes sense.</span></li></ol><p>Answer: <b>3 7/12 m</b></p></div>",
  "terms": [
   [
    "Borrowing (regrouping)",
    "Trading one whole for an equal fraction, like 1 = 4/4, so you can subtract."
   ],
   [
    "Improper fraction",
    "A fraction greater than 1, like 13/4."
   ]
  ],
  "work": "Lesson 4 practice sheet, Parts A to D. Part E is a challenge.",
  "check": [
   {
    "q": "4 1/5 − 1 3/5 =",
    "a": [
     "2 3/5",
     "3 2/5",
     "2 2/5",
     "3 3/5"
    ],
    "c": 0,
    "why": "Borrow: 4 1/5 = 3 6/5. Then 3 6/5 − 1 3/5 = 2 3/5."
   },
   {
    "q": "6 − 2 1/4 =",
    "a": [
     "4 1/4",
     "3 1/4",
     "3 3/4",
     "4 3/4"
    ],
    "c": 2,
    "why": "6 = 5 4/4. Then 5 4/4 − 2 1/4 = 3 3/4."
   },
   {
    "q": "Which one needs borrowing?",
    "a": [
     "7 3/4 − 3 1/4",
     "5 1/8 − 2 5/8",
     "5 5/6 − 2 1/4",
     "6 2/3 − 1 1/3"
    ],
    "c": 1,
    "why": "1/8 is less than 5/8. In the others the first fraction is bigger (5 5/6 − 2 1/4 is 10/12 vs 3/12 after renaming)."
   },
   {
    "q": "3 1/2 − 1 2/3 =",
    "a": [
     "2 1/6",
     "1 1/6",
     "2 5/6",
     "1 5/6"
    ],
    "c": 3,
    "why": "LCD 6: 3 3/6 − 1 4/6. Borrow: 2 9/6 − 1 4/6 = 1 5/6."
   }
  ]
 },
 {
  "id": "l05",
  "n": "5",
  "title": "Skill Check and Review",
  "big": "Every question in this unit comes down to the same moves: make the pieces the same size, add or take away, then simplify.",
  "notes": [
   "Same denominator? Add or subtract the numerators and keep the denominator.",
   "Different denominators? Find the LCD (the LCM of the denominators) and rename both fractions first.",
   "Subtracting mixed numbers? Rename first, then check whether you need to borrow.",
   "Finish in simplest form (divide by the GCF), and write improper answers as mixed numbers.",
   "Sense check: adding should give a bigger amount and subtracting a smaller one. Add back to check a subtraction.",
   "The skill check is 18 marks, no calculator. Part A is single fractions, Part B is mixed numbers with steps shown, and Part C is GCF and LCM, finding a mistake, and a word problem."
  ],
  "table": {
   "title": "Quick reference",
   "head": [
    "If you see…",
    "First move",
    "Example"
   ],
   "rows": [
    [
     "Same denominators",
     "Add or subtract the tops",
     "4/9 + 2/9 = 6/9 = 2/3"
    ],
    [
     "Different denominators",
     "Find the LCD and rename",
     "1/4 + 1/6 = 3/12 + 2/12 = 5/12"
    ],
    [
     "Mixed numbers, adding",
     "Wholes + fractions, then regroup",
     "1 3/4 + 2 1/2 = 3 5/4 = 4 1/4"
    ],
    [
     "Mixed numbers, small first fraction",
     "Borrow a whole",
     "4 1/3 − 2 2/3 = 3 4/3 − 2 2/3 = 1 2/3"
    ],
    [
     "Simplifying",
     "Divide by the GCF",
     "16/24 ÷ 8/8 = 2/3"
    ]
   ]
  },
  "work": "Fraction Operations Skill Check: 18 marks, no calculator, answers in simplest form.",
  "check": [
   {
    "q": "2/3 + 1/5 =",
    "a": [
     "3/8",
     "13/15",
     "3/15",
     "1 1/15"
    ],
    "c": 1,
    "why": "LCD 15: 10/15 + 3/15 = 13/15."
   },
   {
    "q": "5 1/4 − 2 5/6 =",
    "a": [
     "2 5/12",
     "3 5/12",
     "2 7/12",
     "3 7/12"
    ],
    "c": 0,
    "why": "LCD 12: 5 3/12 − 2 10/12. Borrow: 4 15/12 − 2 10/12 = 2 5/12."
   },
   {
    "q": "The GCF and LCM of 8 and 12 are…",
    "a": [
     "2 and 96",
     "4 and 96",
     "8 and 12",
     "4 and 24"
    ],
    "c": 3,
    "why": "Factors in common: 1, 2, 4, so the GCF is 4. Multiples: 8, 16, 24 and 12, 24, so the LCM is 24."
   },
   {
    "q": "Jo has 3 1/2 m of ribbon and uses 1 3/4 m. How much is left?",
    "a": [
     "2 1/4 m",
     "2 3/4 m",
     "1 3/4 m",
     "1 1/4 m"
    ],
    "c": 2,
    "why": "3 1/2 = 3 2/4 = 2 6/4. Then 2 6/4 − 1 3/4 = 1 3/4. Check: 1 3/4 + 1 3/4 = 3 1/2."
   }
  ]
 }
]},
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
