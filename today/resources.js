/* Classroom Mission Control · intentionally short, released-resource directory.
   Assignment entries are read from Computer Class data, not duplicated here.
   Add future-unit entries only when the teacher has released the unit. */
(function(g){
"use strict";
g.MissionResources={
 subjects:{
  math:"Math 7",
  sci:"Science 8",
  ss:"Social Studies 8",
  ela:"ELA 8",
  ct:"Critical Thinking"
 },
 periods:[
  {number:1,start:"8:55",end:"10:00"},
  {number:2,start:"10:00",end:"11:05"},
  {number:3,start:"11:15",end:"12:20"},
  {number:4,start:"1:15",end:"2:20"},
  {number:5,start:"2:20",end:"3:30"}
 ],
 lessons:[
  {id:"math-home",subject:"math",kind:"Lesson hub",title:"Grade 7 Mathematics",href:"../math/",description:"Open the current Math 7 unit and lessons."},
  {id:"math-percent",subject:"math",kind:"Interactive lesson",title:"Percent Strategy Studio",href:"../math/#fdp/l05",description:"Explore the connection between fractions, decimals and percents."},
  {id:"sci-home",subject:"sci",kind:"Lesson hub",title:"Science 8",href:"../science/",description:"Open the current Science lesson and unit resources."},
  {id:"sci-cells",subject:"sci",kind:"Interactive lesson",title:"Inside Plant & Animal Cells",href:"../science/#cells",description:"Study organelles, functions and the parts of cells."},
  {id:"sci-transport",subject:"sci",kind:"Interactive lesson",title:"Membrane Transport & Osmosis",href:"../science/#cells/transport",description:"Test how materials and water move through membranes."},
  {id:"sci-systems",subject:"sci",kind:"Interactive lesson",title:"Human Body Systems Explorer",href:"../science/#cells/systems",description:"Explore the relationships between body systems."},
  {id:"sci-circulation",subject:"sci",kind:"Interactive lesson",title:"Oxygen Delivery Lab",href:"../science/#cells/circulatory",description:"Investigate oxygen supply and demand."},
  {id:"sci-graph",subject:"sci",kind:"Interactive lesson",title:"Data & Graphing Studio",href:"../science/#skills/graph",description:"Create and interpret scientific graphs."},
  {id:"sci-measure",subject:"sci",kind:"Interactive lesson",title:"Measurement Challenge",href:"../science/#skills/si",description:"Practise SI measurements and reading instruments."},
  {id:"ss-home",subject:"ss",kind:"Lesson hub",title:"Social Studies 8 Atlas",href:"../social-studies/",description:"Visit the current Ancient Societies lessons and maps."},
  {id:"ss-river",subject:"ss",kind:"Interactive tool",title:"River Valley Decision Lab",href:"../social-studies/river-valley-lab.html",description:"Investigate how river geography shapes a society."},
  {id:"ss-evidence",subject:"ss",kind:"Interactive tool",title:"Artifact Evidence Desk",href:"../social-studies/evidence.html",description:"Examine historical evidence and test an interpretation."},
  {id:"ela-home",subject:"ela",kind:"Lesson hub",title:"English Language Arts 8",href:"../ela/",description:"Open the current ELA lessons and activities."},
  {id:"ela-plot",subject:"ela",kind:"Interactive lesson",title:"Plot Evidence Board",href:"../ela/#stories/plot",description:"Identify events, plot structure and evidence."},
  {id:"ela-writing",subject:"ela",kind:"Interactive lesson",title:"Writer's Studio",href:"../ela/#answering/day2",description:"Develop answers supported by details and explanation."},
  {id:"ct-home",subject:"ct",kind:"Lesson hub",title:"Think Lab",href:"../critical-thinking/",description:"Explore logic, evidence and independent reasoning."},
  {id:"ct-evidence",subject:"ct",kind:"Interactive lesson",title:"Evidence Inspector",href:"../critical-thinking/#lab/l4",description:"Investigate clues, arguments and conclusions."}
 ]
};
})(window);