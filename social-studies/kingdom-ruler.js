/* Approximate dates from Unit 2 Lesson 2, Egypt's Timeline of Power. */
(() => {
  "use strict";
  const ruler = document.getElementById("kingdom-ruler");
  const by = id => document.getElementById(id);
  const eras = [
    {id:"old",name:"Old Kingdom",start:2650,end:2150},
    {name:"First Intermediate Period",start:2150,end:2050},
    {id:"middle",name:"Middle Kingdom",start:2050,end:1700},
    {name:"Second Intermediate Period",start:1700,end:1550},
    {id:"new",name:"New Kingdom",start:1550,end:1070}
  ];
  const kingdoms = eras.filter(e => e.id);
  const first = eras[0].start;
  const span = first - eras[eras.length-1].end;
  const measured = new Set(), drafts = {};
  const strip = ruler.querySelector(".kr-strip"), slider = by("kr-year"), answer = by("old-years");
  const selected = () => kingdoms.find(e => e.id === by("kr-kingdom").value);
  const duration = era => era.start - era.end;
  for(const era of eras){
    const band = document.createElement("span");
    band.style.flex = duration(era) + " 1 0";
    if(!era.id)band.className = "kr-gap";
    strip.appendChild(band);
  }
  function readYear(){
    const offset = Number(slider.value), year = first - offset;
    const next = eras.findIndex(e => e.start === year);
    const era = eras.find(e => year <= e.start && year >= e.end);
    const description = next>0 ? eras[next-1].name + " ends and the " + eras[next].name + " begins" : era.name;
    const label = "About " + year + " BCE · " + description + ".";
    strip.style.setProperty("--kr-position",offset/span*100+"%");
    slider.setAttribute("aria-valuetext",label);
    by("kr-reading").textContent = label;
  }
  function choose(){
    const era = selected();
    slider.value = first - era.start;
    readYear();
    by("kr-dates").textContent = era.name + " · about " + era.start + " to " + era.end + " BCE.";
    answer.value = drafts[era.id] || "";
    by("kr-feedback").textContent = "";
  }
  function showRecord(){
    const list = by("kr-record");list.replaceChildren();
    for(const era of kingdoms.filter(e => measured.has(e.id))){
      const item = document.createElement("li");
      item.textContent = era.name + " · about " + duration(era) + " years (" + era.start + " to " + era.end + " BCE).";
      list.appendChild(item);
    }
    by("kr-compare").hidden = !(measured.has("old") && measured.has("new"));
  }
  slider.addEventListener("input",readYear);
  by("kr-kingdom").addEventListener("change",choose);
  answer.addEventListener("input",() => { drafts[selected().id] = answer.value;by("kr-feedback").textContent=""; });
  by("kr-form").addEventListener("submit",event => {
    event.preventDefault();
    const era = selected(), guess = answer.valueAsNumber, target = duration(era);
    if(guess === target){
      measured.add(era.id);
      by("kr-feedback").textContent = era.start + " − " + era.end + " = " + target + ". Using these dates, the " + era.name + " lasted about " + target + " years.";
      showRecord();
    }else{
      by("kr-feedback").textContent = guess < 0 ? "Elapsed time is positive. Start with the larger BCE date." :
        guess === era.start + era.end ? "You added the two dates. To measure the distance between them, subtract the later date from the earlier one." :
        "Use " + era.start + " as your starting date. Count down to " + era.end + " BCE, then try the difference.";
    }
  });
  by("kr-compare").addEventListener("submit",event => {
    event.preventDefault();
    const old = duration(kingdoms[0]), recent = duration(kingdoms[2]);
    by("kr-verdict").textContent = by("kr-difference").valueAsNumber === old-recent ?
      "Yes. Using the lesson dates, the Old Kingdom lasted about 20 years longer (500 − 480)." :
      "Use the two durations in your record. Subtract the New Kingdom’s duration from the Old Kingdom’s duration.";
  });
  by("kr-difference").addEventListener("input",() => {by("kr-verdict").textContent="";});
  document.querySelector("[data-clear]").addEventListener("click",() => {
    measured.clear();for(const key of Object.keys(drafts))delete drafts[key];
    by("kr-kingdom").value="old";by("kr-difference").value="";by("kr-verdict").textContent="";
    showRecord();choose();
  });
  choose();
  if(location.hash === "#kingdom-ruler")ruler.open = true;
})();
