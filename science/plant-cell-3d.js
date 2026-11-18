// Geometry is illustrative; labels and roles follow the existing Cells lessons.
const viewport=document.querySelector('#viewport'),fallback=document.querySelector('#fallback'),labels=document.querySelector('#labels'),status=document.querySelector('#status');
const buttons=[...document.querySelectorAll('[data-part]')];
const roles=['Rigid outer layer that supports the cell; made of cellulose.','Thin, flexible layer that controls what moves in and out.','Jelly-like fluid, mostly water, between the membrane and nucleus.','Stores water, nutrients and wastes. A large vacuole also helps hold the plant cell’s shape.','The control centre; contains DNA, the instructions for the cell.','Where photosynthesis happens; contains the green pigment chlorophyll.','Turn sugar into usable energy.','Folded membranes next to the nucleus that build proteins and move materials.','Packages and ships materials; sits on its own, away from the nucleus.'];
let selected=0,render=()=>{}, meshes=[], labelNodes=[];
function select(i){selected=i;buttons.forEach((b,n)=>b.setAttribute('aria-pressed',n===i));document.querySelector('#part-name').textContent=buttons[i].textContent;document.querySelector('#part-role').textContent=roles[i];meshes.forEach(m=>{if(m.material.emissive)m.material.emissive.setHex(m.userData.part===i?0x303030:0)});labelNodes.forEach((l,n)=>l.classList.toggle('active',n===i));render();}
buttons.forEach((b,i)=>b.addEventListener('click',()=>select(i)));
try{
 const THREE=await import('three');const {OrbitControls}=await import('three/addons/controls/OrbitControls.js');
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0xf1f5f2);renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Rotatable plant cell. Arrow keys rotate; plus and minus zoom.');
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(0,7,10);const group=new THREE.Group();scene.add(group);scene.add(new THREE.HemisphereLight(0xffffff,0x607060,2.6));const light=new THREE.DirectionalLight(0xffffff,2.4);light.position.set(-4,9,7);scene.add(light);
 function part(geo,color,x,y,z,id){const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.65}));m.position.set(x,y,z);m.userData.part=id;group.add(m);meshes.push(m);return m}
 function box(w,h,d,c,x,y,z,id){return part(new THREE.BoxGeometry(w,h,d),c,x,y,z,id)}
 function ellipsoid(x,y,z,sx,sy,sz,c,id){const m=part(new THREE.SphereGeometry(1,28,18),c,x,y,z,id);m.scale.set(sx,sy,sz);return m}
 // Open front and top expose organelles without transparent shells obscuring them.
 box(7,.18,4.6,0x607c42,0,-.55,0,0);box(.18,1.25,4.6,0x607c42,-3.4,0,0,0);box(.18,1.25,4.6,0x607c42,3.4,0,0,0);box(7,1.25,.18,0x607c42,0,0,-2.2,0);
 box(6.55,.08,4.2,0xb09843,0,-.42,0,1);box(.07,.94,4.2,0xb09843,-3.25,0,0,1);box(.07,.94,4.2,0xb09843,3.25,0,0,1);box(6.5,.94,.07,0xb09843,0,0,-2.07,1);
 box(6.35,.08,4,0xc9dfd5,0,-.35,0,2);ellipsoid(.35,.15,0,1.85,.67,1.45,0x70c8d5,3);
 ellipsoid(-2,.2,.25,.74,.69,.73,0xa16bbc,4);ellipsoid(-1.98,.68,.5,.25,.24,.25,0x70448b,4);
 [[2.4,.1,-1.35],[2.5,.1,1.1],[-1.4,.1,-1.45]].forEach(([x,y,z])=>{const m=ellipsoid(x,y,z,.62,.25,.32,0x4b9a54,5);m.rotation.y=.4;for(let k=-1;k<=1;k++)box(.06,.12,.35,0x266b37,x+k*.18,y+.22,z,5)});
 [[-1.1,.05,1.5],[2.45,.08,-.1]].forEach(([x,y,z])=>{const m=ellipsoid(x,y,z,.45,.24,.26,0xd09262,6);m.rotation.y=-.6;for(let k=-1;k<=1;k++)box(.05,.08,.22,0xa56739,x+k*.16,y+.22,z,6)});
 for(let i=0;i<4;i++){const fold=box(.16,.2,1.05,0x718ab7,-2.85+i*.13,.17+i*.12,.25,7);fold.rotation.z=-.35}box(.5,.12,.3,0x718ab7,-2.55,.35,.25,7);
 for(let i=0;i<4;i++){const fold=ellipsoid(.9+i*.04,.03+i*.13,1.65,.58,.07,.22,0xc8829f,8);fold.rotation.y=-.1}
 const anchors=[[-3.3,.8,-1.9],[3.13,.55,-1.8],[-.9,-.27,-1.8],[.3,.85,0],[-2,1.02,.2],[2.45,.5,1.1],[-1.1,.4,1.6],[-2.8,.85,.7],[1.1,.62,1.8]].map(p=>new THREE.Vector3(...p));
 labelNodes=buttons.map((b,i)=>{const l=document.createElement('span');l.className='label';l.textContent=i===7?'ER':b.textContent;labels.append(l);return l});
 const controls=new OrbitControls(camera,renderer.domElement);controls.enablePan=false;controls.enableDamping=false;controls.minDistance=7;controls.maxDistance=18;controls.minPolarAngle=.15;controls.maxPolarAngle=1.45;controls.target.set(0,0,0);controls.update();
 let visible=true,frame=0;
 render=()=>{if(!visible||document.hidden||frame)return;frame=requestAnimationFrame(()=>{frame=0;renderer.render(scene,camera);group.updateMatrixWorld();anchors.forEach((a,i)=>{const p=a.clone().applyMatrix4(group.matrixWorld).project(camera);const l=labelNodes[i];l.style.left=((p.x+1)*viewport.clientWidth/2)+'px';l.style.top=((-p.y+1)*viewport.clientHeight/2)+'px';l.hidden=p.z>1||i!==selected});})};
 controls.addEventListener('change',render);const resize=()=>{camera.aspect=viewport.clientWidth/viewport.clientHeight;camera.updateProjectionMatrix();renderer.setSize(viewport.clientWidth,viewport.clientHeight);render()};new ResizeObserver(resize).observe(viewport);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;render()}).observe(viewport);document.addEventListener('visibilitychange',render);
 function turn(dir){if(dir==='left')group.rotation.y-=.2;if(dir==='right')group.rotation.y+=.2;if(dir==='up')group.rotation.x=Math.max(-.65,group.rotation.x-.15);if(dir==='down')group.rotation.x=Math.min(.65,group.rotation.x+.15);render()}
 function zoom(dir){camera.position.multiplyScalar(dir==='in'?.9:1.1);const length=camera.position.length();camera.position.setLength(THREE.MathUtils.clamp(length,7,18));controls.update();render()}
 document.querySelectorAll('[data-turn]').forEach(b=>b.addEventListener('click',()=>turn(b.dataset.turn)));document.querySelectorAll('[data-zoom]').forEach(b=>b.addEventListener('click',()=>zoom(b.dataset.zoom)));document.querySelector('#reset').addEventListener('click',()=>{group.rotation.set(0,0,0);camera.position.set(0,7,10);controls.target.set(0,0,0);controls.update();render()});
 renderer.domElement.addEventListener('keydown',e=>{const keys={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};if(keys[e.key]){e.preventDefault();turn(keys[e.key])}if(['+','=','-'].includes(e.key)){e.preventDefault();zoom(e.key==='-'?'out':'in')}});
 let down;renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;const r=renderer.domElement.getBoundingClientRect();const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hit=ray.intersectObjects(meshes)[0];if(hit)select(hit.object.userData.part)});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();renderer.domElement.hidden=true;fallback.hidden=false;labels.hidden=true;status.textContent='3D is unavailable. Use the labelled diagram and organelle names.'});
 viewport.append(renderer.domElement);resize();renderer.render(scene,camera);fallback.hidden=true;labels.hidden=false;status.textContent='3D model ready. Drag to rotate, or use the controls below.';select(selected);
}catch(error){status.textContent='3D is unavailable. Use the labelled diagram and organelle names.';document.querySelectorAll('[data-turn],[data-zoom],#reset').forEach(b=>b.disabled=true);console.info('Plant cell: using static diagram.',error.message)}
