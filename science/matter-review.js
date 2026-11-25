/* Cases and quiz prompts follow the eight Matter, Density and Fluids lessons. */
window.UnitPrep = {
  name: "Matter, Density and Fluids", n: "2", lessonPrefix: "./#matter/",
  quizIntro: "Eight new questions, from particle motion to the properties of water. Check each answer, then revisit any lesson you missed.",
  rounds: [
    {
      visual:"sample",
      title: "The chipped sample", source: "Bench record",
      evidence: "A uniform solid has a mass of 84 g and a volume of 28 cm³. A chip from the same solid has a volume of 7 cm³. Neither piece contains air pockets.",
      steps: [
        {q:"Which mass should go on the chip’s label?", a:["3 g","21 g","77 g"], c:1},
        {q:"What makes that prediction possible?", a:["Every piece has the same volume.","Chipping makes the particles lighter.","Each cubic centimetre still contains the same mass."], c:2}
      ], why:"Each cubic centimetre has a mass of 3 g. The chip contains 7 of them, so its mass is 21 g. Cutting changes the amount of material and leaves its density the same."
    },
    {
      visual:"ramp",
      title:"The slow lane", source:"Ramp log",
      evidence:"Two 5 mL drops travel 18 cm on the same ramp at 22 °C. Drop P takes 7 s. Drop Q takes 19 s.",
      steps:[
        {q:"Which drop should the lab label more viscous?",a:["Q","P","Both equally"],c:0},
        {q:"Which change would make a repeat comparison harder to interpret?",a:["Cleaning the ramp between trials.","Heating only drop Q before the repeat.","Timing both drops over the same distance."],c:1}
      ],why:"Q takes longer to flow the same distance under matched conditions. Heating one sample adds a second difference because temperature can change viscosity."
    },
    {
      visual:"barrel",
      title:"The sealed syringe", source:"Particle model",
      evidence:"A capped syringe holds 18 mL of air. A slow push reduces the volume to 12 mL. The seal holds and the temperature stays the same.",
      steps:[
        {q:"Which particle sketch would fit the second reading?",a:["Fewer particles in the barrel.","Smaller particles in the barrel.","The same particles closer together."],c:2},
        {q:"How does the pressure against the barrel walls change?",a:["It rises as the particles hit the walls more often per unit area.","It falls because each particle now has less mass.","It stays the same because no air escaped."],c:0}
      ],why:"The trapped air keeps its mass. With less space and the same temperature, its particles collide with the walls more often per unit area. Move the plunger again to check the model pressure."
    },
    {
      visual:"ice",
      title:"The ice tray", source:"Observation log",
      evidence:"Pure ice and liquid water sit together at 0 °C under ordinary air pressure. A heater supplies energy. The thermometer stays at 0 °C while more ice melts.",
      steps:[
        {q:"What should the observer write in the log?",a:["The heater cannot be working.","Energy enters while the amount of liquid increases.","The melting point rises as more ice melts."],c:1},
        {q:"Where does the energy go during melting?",a:["Into making each water particle expand.","Into creating new water particles.","Into loosening the arrangement of particles in the ice."],c:2}
      ],why:"During melting, energy changes how the particles are arranged. Once all the ice has melted, continued heating can raise the liquid’s temperature."
    }
  ],
  lessons:[
    {id:"states",title:"Particle theory",check:[{q:"Perfume spreads across still air. Which model explains this?",a:["Gas particles move and mix with other particles.","Every air particle turns into perfume.","The perfume particles keep growing."],c:0,why:"Moving particles spread from the region where the perfume was released."}]},
    {id:"density",title:"Density",check:[{q:"A solid has a mass of 68 g and a volume of 40 cm³. What is its density?",a:["0.59 g/cm³","28 g/cm³","1.70 g/cm³"],c:2,why:"Density is mass divided by volume. 68 ÷ 40 = 1.70 g/cm³."}]},
    {id:"lab",title:"Displacement",check:[{q:"Water rises from 26 mL to 43 mL around a fully submerged pebble. Which volume belongs to the pebble?",a:["43 cm³","17 cm³","69 cm³"],c:1,why:"The pebble displaces 43 − 26 = 17 mL of water. That is 17 cm³."}]},
    {id:"viscosity",title:"Viscosity",check:[{q:"Which pair of trials tests how temperature changes the flow of one syrup?",a:["Equal drops of that syrup at two temperatures on the same ramp.","Different syrups at the same temperature.","One hot drop on a steep ramp and one cold drop on a flat surface."],c:0,why:"Use the same liquid, amount and ramp so temperature is the only planned difference."}]},
    {id:"temperature",title:"Thermal expansion",check:[{q:"A sealed, flexible container of oil expands slightly when warmed. What happens to the oil’s density?",a:["It rises because the particles move faster.","It stays fixed because no oil escapes.","It falls because the same mass takes up more space."],c:2,why:"A larger volume at the same mass gives a smaller mass per unit volume."}]},
    {id:"pressure",title:"Compressibility",check:[{q:"Why does a hydraulic lift use liquid to transmit a push?",a:["Liquid particles are fixed in place.","The liquid barely compresses when pushed.","The liquid must turn into a gas first."],c:1,why:"The closely spaced particles leave little room for compression, so the liquid transmits pressure."}]},
    {id:"phase",title:"Changes of state",check:[{q:"Water droplets appear outside a cold, sealed bottle. Which change supplies those drops?",a:["Water vapour condenses to liquid on the bottle.","Ice inside the bottle passes through the wall.","Liquid water sublimes into droplets."],c:0,why:"Water vapour in the air releases energy and becomes liquid on the cold surface."}]},
    {id:"water",title:"Water’s properties",check:[{q:"Why can a lake warm more slowly than nearby dry ground in the sun?",a:["Water cannot absorb energy from sunlight.","Lake water has no particle motion.","Water takes substantial energy to raise its temperature."],c:2,why:"Water’s high heat capacity helps slow temperature changes."}]}
  ]
};
