/* Ensures the exercise-response lab reads the lesson's actual sample data. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),data=fs.readFileSync(path.join(root,"science","data.js"),"utf8"),src=fs.readFileSync(path.join(root,"science","exercise-response-lab.js"),"utf8");
const win={};vm.runInNewContext(data,{window:win},{filename:"science/data.js",timeout:3000});
const H=win.HUB;H.lessonTools={"cells/circulatory":()=>{}};
vm.runInNewContext(src,{window:win,document:{createElement(){return {};}}},{filename:"science/exercise-response-lab.js",timeout:3000});
const source=H.units.flatMap(unit=>unit.lessons||[]).find(lesson=>lesson.id==="circulatory").charts[0].series[0].points;
assert.equal(JSON.stringify(H.exerciseResponse.points.map(({minute,rate})=>[minute,rate])),JSON.stringify(source));
assert.equal(JSON.stringify(H.exerciseResponse.summary),JSON.stringify({resting:72,restRange:[71,72],peak:142,peakMinute:8,increase:70,nearRate:76,nearMinute:13,recoveryMinutes:5}));
assert.equal(H.exerciseResponse.analyse().peak,142);
const page=fs.readFileSync(path.join(root,"science","index.html"),"utf8");
assert.ok(page.indexOf('src="exercise-response-lab.js')>page.indexOf('src="system-interactions.js'));
assert.ok(page.indexOf('src="exercise-response-lab.js')<page.indexOf('src="../assets/hub.js'));
console.log("Exercise & circulation data passed: source-linked series, checked values and lesson registration order.");
