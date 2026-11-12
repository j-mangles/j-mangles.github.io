/* Deterministic checks for the student-authored Fair Test Studio plan. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),source=fs.readFileSync(path.join(root,"science/fair-test-studio.js"),"utf8");
const scope={window:{HUB:{lessonTools:{}}}};
vm.runInNewContext(source,scope,{filename:"science/fair-test-studio.js"});
const validate=scope.window.HUB.fairTestPlanCore.validate;
const valid={question:"How does water temperature affect dissolving time?",prediction:"Warmer water may dissolve sugar faster because particles move more.",iv:"Water temperature",dv:"Dissolving time in seconds",cvs:["Sugar mass","Water volume","Stirring rate"],trials:3,method:"Change the water temperature, measure dissolving time and repeat three times."};
assert.deepEqual(Array.from(validate(valid)),[]);
assert.ok(validate({...valid,trials:2}).includes("3 to 20 repeat trials"));
assert.ok(validate({...valid,iv:"Dissolving time in seconds"}).includes("different independent and dependent variables"));
assert.ok(validate({...valid,cvs:["Water temperature","Water volume","Stirring rate"]}).includes("controlled variables that differ from the changed and measured variables"));
assert.ok(validate({...valid,cvs:["Sugar mass","Sugar mass","Stirring rate"]}).includes("three different controlled variables"));
assert.ok(validate({...valid,method:""}).includes("procedure"));
const html=fs.readFileSync(path.join(root,"science/index.html"),"utf8");
assert.ok(html.includes('src="fair-test-studio.js')&&html.indexOf('src="fair-test-studio.js')<html.indexOf('src="../assets/hub.js'));
assert.match(source,/download='fair-test-plan\.txt'/);
assert.doesNotMatch(source,/localStorage|fetch\s*\(/,"Student plans must remain in the page until they choose to download them");
console.log("Fair Test plan passed: completeness, variable separation, unique controls, repeat count, lesson wiring and local-only export.");
