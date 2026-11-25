const mysterySlides = {
  onion: "Slide A shows repeated rows of cells with straight, box-like edges and a distinct outer wall. Some have a darker oval inside. No green structures are visible.",
  cheek: "Slide B shows cells with rounded outlines and a darker centre. There is no thick, rigid outer layer or visible green structure."
};
function drawMysterySlide() {
  const slide = document.getElementById("mc-slide");
  const label = slide.selectedOptions[0].textContent;
  const obj = Number(document.getElementById("mc-objective").value);
  const focus = Number(document.getElementById("mc-focus").value);
  const core = window.VirtualMicroscopeCore;
  core.drawField(document.getElementById("mc-field"), {name: slide.value, obj, focus, label});
  document.getElementById("mc-reading").textContent = label + " · " + core.total(obj) + "× total · " + core.fieldUm(obj) + " µm across";
  document.getElementById("mc-focus-status").textContent = focus >= 95 ? "Sharp" : focus >= 85 ? "Nearly sharp" : "Blurred";
  document.getElementById("mc-description").textContent = focus >= 85 ? mysterySlides[slide.value] : "The edges are blurred. Increase focus to distinguish the cell boundaries.";
}
for (const id of ["mc-slide","mc-objective","mc-focus"]) {
  document.getElementById(id).addEventListener("input", drawMysterySlide);
}
window.UnitPrep = {
  name:"Cells and Systems", n:"1", lessonPrefix:"./#cells/",
  quizIntro:"Eight questions on microscopy, organelles, transport, division and specialized cells. Check each answer and revisit any lesson you missed.",
  showEvidence(card) {
    document.getElementById("mystery-instrument").hidden = !card.scope;
    if (!card.scope) return;
    document.getElementById("mc-slide").value = card.scope;
    document.getElementById("mc-objective").value = card.objective;
    document.getElementById("mc-focus").value = 100;
    document.querySelector(".mc-controls details").open = false;
    drawMysterySlide();
  },
  rounds:[
    {
      title:"Two unlabelled slides",source:"Microscope notebook",scope:"onion",objective:"40",
      evidence:"One slide holds onion bulb tissue. The other holds cheek cells. Neither shows green chloroplasts. Compare their boundaries at the same magnification.",
      steps:[
        {q:"Which slide contains the onion cells?",a:["Slide B.","Slide A.","A plant cell cannot be identified without green chloroplasts."],c:1},
        {q:"Which observation best supports that choice?",a:["Some cells have a dark oval inside.","Neither slide looks green.","A rigid wall outlines the repeated cells on slide A."],c:2}
      ],why:"A bulb grows underground. Its cells can lack visible chloroplasts and still have plant cell walls. Both samples can have nuclei."
    },
    {
      title:"The vanishing neighbours",source:"Objective comparison",scope:"cheek",objective:"10",
      evidence:"On slide B, compare the 10× and 40× objectives. Keep the slide in place. Watch the field diameter and the number of cell widths that fit across it.",
      steps:[
        {q:"What happens when you change to the 40× objective?",a:["The field narrows and fewer cell widths fit.","The field widens and more cells fit.","The actual cheek cells grow."],c:0},
        {q:"A field measures 450 µm across and spans about seven cell widths. What is a reasonable cell-width estimate?",a:["About 3,150 µm.","About 64 µm.","About 450 µm."],c:1}
      ],why:"The higher objective magnifies a smaller patch of the slide. Dividing 450 µm by 7 gives about 64 µm per cell width."
    },
    {
      title:"Where did the water go?",source:"Membrane model",
      evidence:"A model cell holds 4% dissolved sugar. The liquid outside holds 10%. Only water can cross. The model cell becomes smaller.",
      steps:[
        {q:"Which movement accounts for the change?",a:["Sugar moves into the cell.","The membrane pulls sugar outward.","More water leaves the cell than enters it."],c:2},
        {q:"What would reverse the net movement if the cell still contains sugar?",a:["Move the cell into pure water.","Add more sugar outside.","Use a membrane that blocks water."],c:0}
      ],why:"Water moves both ways. In this model, its net movement is toward the higher solute concentration. Pure water outside reverses the concentration difference."
    },
    {
      title:"A lung under the lens",source:"Tissue observation",
      evidence:"The lining of an air sac is a single layer of very thin cells. A small blood vessel runs beside it. Oxygen concentration is higher in the air sac than in the arriving blood.",
      steps:[
        {q:"How does the lining help oxygen enter the blood?",a:["It pumps each oxygen molecule into the blood.","It gives oxygen a short distance to diffuse.","It makes new oxygen as blood passes."],c:1},
        {q:"If that lining thickened, with other conditions unchanged, what would you predict?",a:["More oxygen would diffuse per second.","The blood would no longer need oxygen.","Less oxygen would diffuse per second across the same area."],c:2}
      ],why:"Thin cells form a thin tissue barrier. Oxygen can diffuse across it quickly. A thicker barrier increases the distance and slows exchange."
    }
  ],
  lessons:[
    {id:"theory",title:"Microscope scale",check:[{q:"A 10× eyepiece is paired with a 20× objective. What is the total magnification?",a:["30×","200×","2×"],c:1,why:"Multiply the eyepiece magnification by the objective magnification."}]},
    {id:"plant",title:"Plant cell structures",check:[{q:"A leaf cell uses light to make sugars. Which structure carries out that work?",a:["Nucleus","Cell wall","Chloroplast"],c:2,why:"Chloroplasts absorb light for photosynthesis."}]},
    {id:"animal",title:"Organelles",check:[{q:"A cell makes and exports large amounts of protein. Which structures assemble those proteins?",a:["Ribosomes","Vacuoles","Cell walls"],c:0,why:"Ribosomes assemble proteins from amino acids."}]},
    {id:"transport",title:"Diffusion",check:[{q:"There is more oxygen outside a cell than inside. Oxygen can cross its membrane. Which describes net diffusion?",a:["Only inward motion is possible.","More oxygen moves inward than outward.","The cell must spend energy to pump oxygen in."],c:1,why:"Particles move both ways, with a net movement down the concentration gradient."}]},
    {id:"transport",title:"Osmosis",check:[{q:"A membrane passes water and blocks salt. Salt concentration is higher inside the model cell. Which change should happen first?",a:["Salt leaves through the membrane.","The cell loses water overall.","The cell gains water overall."],c:2,why:"Net water movement is toward the side with the higher concentration of dissolved salt."}]},
    {id:"reproduction",title:"Cell division",check:[{q:"Before one body cell divides to form two cells, why is its DNA copied?",a:["Each new cell needs a complete set of instructions.","DNA supplies the cell wall.","Each new cell needs half a set of instructions."],c:0,why:"Copying DNA allows each daughter cell to receive a complete set of genetic instructions."}]},
    {id:"specialized",title:"Cell specialization",check:[{q:"A muscle cell has many mitochondria. How does this help it contract repeatedly?",a:["They store an entire spare muscle.","They release usable energy through cellular respiration.","They make light for the muscle."],c:1,why:"Contractions require energy. Mitochondria supply much of the cell’s ATP."}]},
    {id:"levels",title:"Cells to systems",check:[{q:"Which sequence goes from a specialized cell to an organ to an organ system?",a:["Heart → muscle cell → circulation.","Circulatory system → heart → muscle cell.","Cardiac muscle cell → heart → circulatory system."],c:2,why:"Cardiac muscle cells form tissue within the heart. The heart is an organ in the circulatory system."}]}
  ]
};
