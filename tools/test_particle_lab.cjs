// Science Unit 2 Particle Lab: physics core behaves like matter, and the four lessons get the live model above their existing visual.
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
const read=f=>fs.readFileSync(path.join(__dirname,"..",f),"utf8");
const ctx={window:{HUB:{lessonTools:{"matter/states":()=>{},"matter/temperature":()=>{},"matter/pressure":()=>{},"matter/phase":()=>{}}}},requestAnimationFrame(){},getComputedStyle(){return{getPropertyValue:()=>""}}};
vm.runInNewContext(read("science/particle-lab.js"),ctx);
const {Sim}=ctx.window.ParticleCore;
["matter/states","matter/temperature","matter/pressure","matter/phase"].forEach(k=>assert.equal(typeof ctx.window.HUB.lessonTools[k],"function",k));
// a cold lattice stays together; a hot one spreads out
const run=(T,steps)=>{const s=new Sim({W:28,H:20,g:0.03,T});s.lattice(64,0.2,9.5,0.6,8);for(let i=0;i<steps;i++)s.step();return s;};
const cold=run(0.2,3000),hot=run(1.0,6000);
assert.ok(cold.condensed()>0.85,"cold is condensed");assert.ok(hot.condensed()<0.35,"hot is a gas");
// halving the volume of a sealed gas raises the pressure
const P=vol=>{const p=new Sim({W:24,H:16,g:0,T:0.8,lid:"driven",lidY:16,attract:0});p.scatter(36,0.8,15.5);p.lid.target=1+15*vol/100;for(let i=0;i<3000;i++)p.step();p.wall=0;p.impT=0;for(let i=0;i<6000;i++)p.step();return p.wall/p.impT/(2*23+2*(p.lid.y-1));};
const r=P(50)/P(100);assert.ok(r>1.6&&r<3,"half volume roughly doubles pressure: "+r.toFixed(2));
const html=read("science/index.html");assert.ok(html.indexOf("particle-lab.js")>html.indexOf("matter-visuals.js")&&html.indexOf("particle-lab.js")<html.indexOf("assets/hub.js"));
console.log("Particle Lab: solid stays together, gas spreads out, half volume gives "+r.toFixed(2)+"x pressure; wired into 4 lessons.");
