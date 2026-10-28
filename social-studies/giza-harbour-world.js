/* The Missing Stone Shipment — textured Three.js environment.
   Procedural game artwork. Nothing here claims surveyed fidelity.
   Quality intentionally prioritizes laptop-class WebGL over asset-heavy AAA rendering.
 */
(function(g){
"use strict";
function create(T,holder,interactables){
 const scene=new T.Scene();
 scene.background=new T.Color(0x98b7b6);
 scene.fog=new T.FogExp2(0xc3b9a0,.0039);
 const camera=new T.PerspectiveCamera(65,1,.25,660);
 const renderer=new T.WebGLRenderer({antialias:true,powerPreference:"default"});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
 renderer.outputColorSpace=T.SRGBColorSpace;
 renderer.toneMapping=T.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.26;
 renderer.shadowMap.enabled=true;
 renderer.shadowMap.type=T.PCFSoftShadowMap;
 holder.replaceChildren(renderer.domElement);
 renderer.domElement.setAttribute("tabindex","0");
 renderer.domElement.setAttribute("aria-label","Walkable Old Kingdom harbour. Drag to look around; WASD or arrow keys move. Press E near clues and people.");
 const hemi=new T.HemisphereLight(0xf8e6c9,0x82796c,2.8);scene.add(hemi);
 const sun=new T.DirectionalLight(0xffdeb0,2.75);
 sun.position.set(-95,170,-100);sun.castShadow=true;
 sun.shadow.mapSize.set(1024,1024);
 sun.shadow.camera.left=-135;sun.shadow.camera.right=135;sun.shadow.camera.top=135;sun.shadow.camera.bottom=-135;
 sun.shadow.camera.near=5;sun.shadow.camera.far=380;
 sun.shadow.bias=-.00014;sun.shadow.normalBias=.03;
 scene.add(sun);
 const cache={};
 function rnd(seed){let x=(seed|0)||24;return()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
 function texture(name,c0,c1,seed=4){
  if(cache[name])return cache[name];
  const canvas=document.createElement("canvas");canvas.width=512;canvas.height=512;
  const ctx=canvas.getContext("2d"),r=rnd(seed);
  ctx.fillStyle=c0;ctx.fillRect(0,0,512,512);
  for(let i=0;i<4200;i++){
   const x=r()*512,y=r()*512,rad=.5+r()*6;
   ctx.fillStyle=i%3===0?c0:c1;ctx.globalAlpha=.018+r()*.14;
   ctx.beginPath();ctx.ellipse(x,y,rad*(.4+r()),rad*.24,0,0,Math.PI*2);ctx.fill();
  }
  ctx.globalAlpha=1;
  if(name==="brick"){
   ctx.strokeStyle="#654632";ctx.globalAlpha=.24;ctx.lineWidth=2;
   for(let y=0;y<=512;y+=48){
    ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(512,y);ctx.stroke();
    const offset=(y/48)%2?60:0;
    for(let x=offset-120;x<540;x+=120){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+48);ctx.stroke();}
   }
  }else if(name==="wood"){
   ctx.strokeStyle="#493525";ctx.globalAlpha=.26;ctx.lineWidth=1.4;
   for(let x=4;x<510;x+=28+r()*12){
    ctx.beginPath();ctx.moveTo(x,0);ctx.bezierCurveTo(x+7,190,x-7,310,x+4,512);ctx.stroke();
   }
  }else if(name==="cloth"){
   ctx.strokeStyle="#7f7863";ctx.globalAlpha=.13;ctx.lineWidth=1;
   for(let x=0;x<512;x+=8){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,512);ctx.stroke();}
   for(let y=0;y<512;y+=8){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(512,y);ctx.stroke();}
  }else if(name==="sand"){
   ctx.globalAlpha=.25;ctx.strokeStyle="#b08452";
   for(let i=0;i<140;i++){const y=r()*512,x=r()*512;ctx.beginPath();ctx.arc(x,y,3+r()*32,r()*Math.PI,r()*Math.PI+1.15);ctx.stroke();}
  }
  ctx.globalAlpha=1;
  const t=new T.CanvasTexture(canvas);
  t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;
  t.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
  cache[name]=t;return t;
 }
 const sandTex=texture("sand","#d3aa70","#af8855",39);sandTex.repeat.set(6,5);
 const brickTex=texture("brick","#b48a62","#956747",17);
 const stoneTex=texture("stone","#e5d2aa","#ad966f",53);
 const woodTex=texture("wood","#896342","#4e392a",11);
 const clothTex=texture("cloth","#eee3c6","#b4a187",71);
 const sand=new T.MeshStandardMaterial({map:sandTex,roughness:1});
 const brick=new T.MeshStandardMaterial({map:brickTex,roughness:.98});
 const stone=new T.MeshStandardMaterial({map:stoneTex,roughness:.95});
 const wood=new T.MeshStandardMaterial({map:woodTex,roughness:.86});
 const linen=new T.MeshStandardMaterial({map:clothTex,roughness:.98,side:T.DoubleSide});
 const basalt=new T.MeshStandardMaterial({color:0x685c48,roughness:1});
 const reed=new T.MeshStandardMaterial({color:0xa49661,roughness:1,side:T.DoubleSide});
 const green=[0x345c40,0x3e7449,0x4d7c50,0x296347].map(color=>new T.MeshStandardMaterial({color,roughness:1,side:T.DoubleSide}));
 const ink=new T.MeshStandardMaterial({color:0x513b31,roughness:1});
 const copper=new T.MeshStandardMaterial({color:0xb38551,metalness:.37,roughness:.63});
 const cargoMark=new T.MeshStandardMaterial({color:0x944c37,roughness:1});
 function box(group,x,y,z,w,h,d,mat,opts={}){
  const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat);
  m.position.set(x,y,z);m.castShadow=opts.shadow!==false;m.receiveShadow=true;group.add(m);return m;
 }
 function cylinder(group,x,y,z,r1,r2,h,mat,segments=10){
  const o=new T.Mesh(new T.CylinderGeometry(r1,r2,h,segments),mat);
  o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;group.add(o);return o;
 }
 function sphere(group,x,y,z,rad,mat){
  const m=new T.Mesh(new T.IcosahedronGeometry(rad,1),mat);
  m.position.set(x,y,z);m.castShadow=true;group.add(m);return m;
 }
 function ground(){
  const geo=new T.PlaneGeometry(330,270,55,45),a=geo.attributes.position;
  const r=rnd(5301);
  for(let i=0;i<a.count;i++){
   const x=a.getX(i),y=a.getY(i);
   const elevation=Math.sin(x*.08)*.4+Math.cos(y*.13)*.4+(r()-.5)*.32;
   a.setZ(i,elevation*.7);
  }
  geo.computeVertexNormals();
  const o=new T.Mesh(geo,sand);o.rotation.x=-Math.PI/2;o.position.set(56,-.25,0);
  o.receiveShadow=true;scene.add(o);
  // Long sloped riverbank along x=-58.
  const bankGeo=new T.BufferGeometry();
  const vs=new Float32Array([-66,-1.45,-102,-51,.1,-102,-66,-1.45,102,-51,.1,102]);
  bankGeo.setAttribute("position",new T.BufferAttribute(vs,3));
  bankGeo.setIndex([0,1,2,1,3,2]);bankGeo.computeVertexNormals();
  const bank=new T.Mesh(bankGeo,new T.MeshStandardMaterial({color:0xb59a6e,side:T.DoubleSide,roughness:1}));
  bank.receiveShadow=true;scene.add(bank);
  for(const z of [-93,-65,-33,0,31,66,92]){
   const grp=new T.Group();grp.position.set(-57,0,z);
   for(let i=0;i<5;i++){
    const rock=sphere(grp,Math.random()*4, .25, (i-2)*.75,.25+Math.random()*.28,basalt);
    rock.scale.set(1.5,.45,1);
   }
   scene.add(grp);
  }
 }
 ground();
 const waterGeo=new T.PlaneGeometry(170,280,30,45);
 waterGeo.rotateX(-Math.PI/2);
 const waterMat=new T.MeshPhongMaterial({color:0x387e86,specular:0xfbe8ac,shininess:78,transparent:true,opacity:.96,depthWrite:true,side:T.DoubleSide});
 const water=new T.Mesh(waterGeo,waterMat);water.position.set(-143,-.45,0);water.receiveShadow=true;scene.add(water);
 const waveBase=waterGeo.attributes.position.array.slice();
 const waterHighlights=[];
 for(let i=0;i<33;i++){
  const z=-110+i*7.3;
  const m=box(scene,-93+Math.sin(i*13)*24,-.22,z,4+Math.sin(i*2)*2,.015,.11,new T.MeshBasicMaterial({color:0xa4dad6,transparent:true,opacity:.18}),{shadow:false});
  waterHighlights.push(m);
 }
 function road(){
  // Packed earth route from southern loading to storehouse / workers.
  for(let i=0;i<34;i++){
   const x=-40+i*3,z=52-i*1.12;
   const patch=box(scene,x,.14,z,3.4,.04,10,
     new T.MeshStandardMaterial({color:i%2?0xbd935f:0xc5a06a,roughness:1}),{shadow:false});
   patch.rotation.y=-.25;
  }
  for(let i=0;i<35;i++){
   const x=-29+i*2.1,z=25-i*.57;
   box(scene,x,.16,z+1.5,1.4,.02,.12,basalt,{shadow:false});
  }
 }
 road();
 function quay(z){
  const group=new T.Group();group.position.set(-62,0,z);
  for(let i=0;i<9;i++){
   box(group,-i*2.25,.25,0,2.1,.35,10.8,wood);
   const beam=box(group,-i*2.25,0,0,.12,.24,10.8,ink);
   beam.position.y=.44;
  }
  for(const px of [-1,-7,-13,-19]){
   for(const pz of [-4,4]){cylinder(group,px,-.4,pz,.35,.42,3.1,wood,9);cylinder(group,px,1,pz,.42,.42,.45,wood);}
  }
  for(let i=0;i<4;i++){
   const post=box(group,-i*5,.78,-5,1,.8,1,wood);
   post.rotation.y=.2;
  }
  scene.add(group);
 }
 quay(-39);quay(54);
 function house(x,z,w,d,h,details=true){
  const group=new T.Group();group.position.set(x,0,z);
  box(group,0,h/2,0,w,h,d,brick);
  box(group,0,h+.26,0,w+.6,.52,d+.7,stone);
  box(group,0,2,-d/2-.11,2.8,4,.2,ink);
  box(group,0,4.5,-d/2-.18,3.5,.8,.22,wood);
  for(const q of [-1,1]){
   box(group,q*(w/2-2.8),h*.68,-d/2-.16,1.25,1.5,.23,ink);
  }
  if(details){
   // Ochre painted band along upper façade.
   box(group,0,h-1,-d/2-.21,w-1,.26,.16,cargoMark,{shadow:false});
   for(let i=0;i<3;i++){const palm=cylinder(group,-w/2+2+i*1.5,h+.9,d/2-2,.21,.21,1.6,wood,8);palm.rotation.z=Math.PI/2;}
   const awning=box(group,0,4,-d/2-3.3,w*.72,.18,5,linen);
   awning.rotation.x=-.16;
   for(const t of [-w*.35,w*.35])cylinder(group,t,2,-d/2-5.6,.2,.3,4,wood);
  }
  scene.add(group);
 }
 house(40,7,22,15,10);house(74,-9,23,18,13);house(88,52,17,16,8);house(11,-35,15,16,7,false);house(77,63,12,11,7,false);
 // Open workshade and wooden supply scaffold.
 for(const p of [[15,36],[56,66],[16,73]]){
  const group=new T.Group();group.position.set(p[0],0,p[1]);
  for(const i of [-1,1])for(const j of [-1,1])cylinder(group,i*6,3.5,j*5,.31,.38,7.3,wood,8);
  const canopy=box(group,0,7.3,0,14,.13,12,linen);canopy.rotation.z=.08;scene.add(group);
 }
 function palm(x,z,scale=1){
  const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(scale);
  const trunk=new T.Group();g.add(trunk);
  for(let i=0;i<9;i++){
   const y=.6+i*1.15,xoff=Math.sin(i*.26)*.72;
   const ring=cylinder(trunk,xoff,y,0, .43-i*.017,.55-i*.012,1.1,wood,9);
   if(i%2===0){const collar=cylinder(trunk,xoff,y+.52,0,.51,.51,.18,ink,10);collar.rotation.z=.05;}
  }
  const crown=new T.Group();crown.position.set(Math.sin(2.5)*.72,10.85,0);g.add(crown);
  for(let k=0;k<11;k++){
   const ang=k*Math.PI*2/11,verts=[],inds=[];
   for(let s=0;s<=10;s++){
    const t=s/10,len=8.7;
    const rad=t*len,drop=t*t*4.5,span=Math.sin(Math.PI*t)*.8;
    for(const sign of [-1,1]){verts.push(Math.cos(ang)*rad-Math.sin(ang)*span*sign,
       1.2-drop+Math.sin(t*Math.PI)*1.05,
       Math.sin(ang)*rad+Math.cos(ang)*span*sign);}
    if(s<10){const i=s*2;inds.push(i,i+1,i+2,i+1,i+3,i+2);}
   }
   const geometry=new T.BufferGeometry();
   geometry.setAttribute("position",new T.Float32BufferAttribute(verts,3));
   geometry.setIndex(inds);geometry.computeVertexNormals();
   const leaf=new T.Mesh(geometry,green[k%green.length]);leaf.castShadow=k%2===0;crown.add(leaf);
   const rib=cylinder(crown,Math.cos(ang)*2,1,Math.sin(ang)*2,.08,.08,4,wood,5);
   rib.rotation.z=1.1;
  }
  scene.add(g);
 }
 for(const [x,z,s] of [[-38,0,.8],[-27,-14,1.2],[69,27,1.25],[89,27,.85],[14,66,.8],[80,85,1],[0,-72,.9],[108,-54,1.1],[45,-70,.9],[105,-28,1]] )palm(x,z,s);
 function reeds(x,z,number=7){
  const rng=rnd(Math.abs(Math.round(x*70+z*19))+4);
  const g=new T.Group();g.position.set(x,0,z);
  for(let i=0;i<number;i++){
   const x=(rng()-.5)*5,z=(rng()-.5)*5,h=1+rng()*2;
   const stem=cylinder(g,x,h/2,z,.035,.05,h,reed,5);stem.rotation.z=(rng()-.5)*.14;
   const tip=cylinder(g,x,h+.25,z,.07,.1,.5,new T.MeshStandardMaterial({color:0x715339,roughness:1}),6);
   tip.rotation.z=(rng()-.5)*.3;
  }scene.add(g);
 }
 for(const z of [-90,-78,-66,-12,7,25,88])reeds(-56,z,7);
 const boats=[];
 function boat(x,z,scale=1,loaded=true){
  const g=new T.Group();g.position.set(x,-.42,z);g.scale.setScalar(scale);
  // 10 curved hull cross sections form a long, tapered, river-going wooden boat.
  const sections=11,side=6,L=27,vertices=[],indices=[];
  for(let i=0;i<sections;i++){
   const t=i/(sections-1),pz=(t-.5)*L;
   const flare=Math.pow(Math.sin(Math.PI*t),.5)*3.9+.35;
   for(let k=0;k<side;k++){
    const a=Math.PI*1.02+k/(side-1)*Math.PI*.96;
    const px=Math.cos(a)*flare;
    const py=1.1+Math.sin(a)*2.1+(Math.abs(pz)/(L*.5))*.75;
    vertices.push(px,py,pz);
   }
  }
  for(let i=0;i<sections-1;i++)for(let k=0;k<side-1;k++){
   const a=i*side+k,b=a+side;
   indices.push(a,b,a+1,b,b+1,a+1);
  }
  const hullGeo=new T.BufferGeometry();hullGeo.setAttribute("position",new T.Float32BufferAttribute(vertices,3));hullGeo.setIndex(indices);hullGeo.computeVertexNormals();
  const hull=new T.Mesh(hullGeo,new T.MeshStandardMaterial({map:woodTex,side:T.DoubleSide,roughness:.85}));
  hull.castShadow=true;g.add(hull);
  box(g,0,1.1,0,6.6,.33,L*.77,wood);
  for(let i=-4;i<=4;i++){
   box(g,0,1.45,i*2.4,8.2,.23,.35,ink);
  }
  cylinder(g,0,8,0,.31,.44,15,wood);
  box(g,0,15.7,0,9.5,.19,.25,wood);
  const sail=new T.Mesh(new T.PlaneGeometry(9,11,12,6),linen);
  const a=sail.geometry.attributes.position;
  for(let i=0;i<a.count;i++){const xx=a.getX(i),yy=a.getY(i);a.setZ(i,Math.sin((xx/9+.5)*Math.PI)*.9*Math.sin((yy/11+.5)*Math.PI));}
  a.needsUpdate=true;sail.geometry.computeVertexNormals();
  sail.position.set(0,10.3,.1);sail.rotation.y=.12;g.add(sail);
  for(const side of [-1,1]){
   const cable=cylinder(g,side*3.2,8,0,.045,.045,16,new T.MeshStandardMaterial({color:0x87694d}),5);
   cable.rotation.z=side*.36;
  }
  if(loaded)for(let i=0;i<4;i++)box(g,(i%2?1.5:-1.5),2.2,-7+Math.floor(i/2)*5,2.7,1.8,3.6,stone);
  scene.add(g);boats.push(g);
 }
 boat(-91,-36,.89,false);boat(-91,56,1.05,true);boat(-134,96,.7,false);
 function cargo(x,z,angle=0){
  const g=new T.Group();g.position.set(x,0,z);g.rotation.y=angle;
  box(g,0,.45,0,7,.8,13,wood);
  for(let i=0;i<4;i++)cylinder(g,i%2?2.4:-2.4,.34,i<2?-5:5,.5,.5,10,wood);
  for(let i=0;i<4;i++){
   const b=box(g,i%2?1.6:-1.6,1.6,i<2?-3.4:3.4,2.95,2.2,5.9,stone);
   box(g,b.position.x,2.82,b.position.z,1.4,.025,.22,cargoMark,{shadow:false});
  }
  scene.add(g);
 }
 cargo(39,58,Math.PI*.24);cargo(22,63,Math.PI*.14);
 // Hands-on hauling activity: small sledge visibly advances along a model track.
 const trainingSled=new T.Group();
 box(trainingSled,0,.42,0,5,.63,6.8,wood);
 for(const q of [-1.5,1.5])cylinder(trainingSled,q,.4,0,.4,.4,8,wood);
 const practiceStone=box(trainingSled,0,1.49,0,4.7,1.65,5.8,stone);
 box(trainingSled,0,2.36,0,2.6,.035,.16,cargoMark,{shadow:false});
 trainingSled.rotation.y=-.44;
 trainingSled.position.set(-28,0,24);
 scene.add(trainingSled);
 function setHaulProgress(ratio){
  const t=Math.max(0,Math.min(1,Number(ratio)||0));
  trainingSled.position.set(-28+13*t,0,24-12*t);
 }
 function storage(){
  const g=new T.Group();g.position.set(40,0,7);
  box(g,0,1.7,-8,9,3.3,3.8,wood);
  const sheet=box(g,0,3.41,-8,7.2,.09,3.0,linen,{shadow:false});
  for(let i=0;i<5;i++)box(g,-3+i*1.5,3.5,-7,1,.03,.2,ink,{shadow:false});
  cylinder(g,5.4,2.8,-8,.5,.62,1.7,copper);
  scene.add(g);
 }
 storage();
 // Sledge tracks and wet-looking patches are readable story evidence.
 for(let i=0;i<9;i++){
  const x=-39+i*3.4,z=58-i*5.8;
  for(const off of [-1.2,1.2]){
   const mark=box(scene,x,.15,z+off,2.8,.045,.23,new T.MeshStandardMaterial({color:0x8c714f,roughness:1}),{shadow:false});mark.rotation.y=.4;
  }
 }
 const wet=box(scene,-16,.15,12,13,.025,8,new T.MeshStandardMaterial({color:0x9b855e,roughness:1}),{shadow:false});
 wet.rotation.y=-.3;
 function labelSprite(text){
  const c=document.createElement("canvas");c.width=512;c.height=128;const ctx=c.getContext("2d");
  ctx.fillStyle="#142f36df";ctx.beginPath();ctx.roundRect(4,4,504,118,26);ctx.fill();
  ctx.strokeStyle="#d7b980";ctx.lineWidth=4;ctx.stroke();
  ctx.fillStyle="#f9e7b8";ctx.font="bold 32px Inter, sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(text.toUpperCase(),256,65,460);
  const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;
  const spr=new T.Sprite(new T.SpriteMaterial({map:tex,transparent:true,depthTest:false}));
  spr.scale.set(13.8,3.45,1);return spr;
 }
 const markers=[];
 for(const spec of interactables){
  const g=new T.Group();g.position.set(spec.x,0,spec.z);
  const icon=new T.Mesh(new T.IcosahedronGeometry(.75,1),new T.MeshStandardMaterial({color:0xffe5a5,emissive:0xbc7527,emissiveIntensity:.8,metalness:.1}));
  icon.position.y=3.1;g.add(icon);
  const halo=new T.Mesh(new T.TorusGeometry(1.35,.09,6,30),new T.MeshBasicMaterial({color:0xf3d294,transparent:true,opacity:.8}));
  halo.rotation.x=Math.PI/2;halo.position.y=.27;g.add(halo);
  const spr=labelSprite(spec.label||spec.name||spec.id);spr.position.y=5.5;g.add(spr);
  g.traverse(o=>{if(o.isMesh||o.isSprite)o.userData.interactId=spec.id;});
  scene.add(g);markers.push({g,icon,halo,spr,id:spec.id});
 }
 const people=[],skinMaterials=[0x9a6546,0xb07953,0x88563d,0xb4805c];
 function human(x,z,skinColor=0xab744e,robe=0xe4d5b6,headwear=false){
  const g=new T.Group();g.position.set(x,0,z);
  const skinMat=new T.MeshStandardMaterial({color:skinColor,roughness:1});
  const robeMat=new T.MeshStandardMaterial({color:robe,roughness:1});
  const hairMat=new T.MeshStandardMaterial({color:0x26211e,roughness:1});
  const torso=cylinder(g,0,3.25,0,.68,.59,2.45,robeMat,10);
  const kilt=cylinder(g,0,1.97,0,.97,.67,1.6,robeMat,10);
  const head=sphere(g,0,5.12,-.03,.72,skinMat);head.scale.y=1.16;
  const hair=sphere(g,0,5.62,.05,.77,hairMat);hair.scale.set(1,.45,1);
  if(headwear){
   const band=cylinder(g,0,5.53,0,.81,.81,.28,robeMat,12);band.rotation.z=.03;
   box(g,0,4.85,-.73,.27,1,.15,robeMat);
  }
  for(const side of [-1,1]){
   const arm=cylinder(g,side*.89,3.15,0,.18,.25,1.85,skinMat);
   arm.userData.arm=side;arm.rotation.z=-side*.21;
   const leg=cylinder(g,side*.31,.77,.09,.24,.29,1.48,skinMat);
   leg.userData.leg=side;
  }
  return g;
 }
 for(const [i,s] of interactables.filter(x=>x.kind==="person").entries()){
  const model=human(s.x,s.z,skinMaterials[i%skinMaterials.length],i===0?0xe9dbba:i===1?0xc4b19a:0xd9cbad,i===0);
  model.traverse(o=>{if(o.isMesh)o.userData.interactId=s.id;});
  scene.add(model);people.push({model,id:s.id,x:s.x,z:s.z,animated:false});
 }
 const extras=[
  [-8,46,0],[0,52,1],[4,61,2],[-49,58,3],[-40,57,0],[19,39,1],[30,42,2],[73,31,3],[85,-25,0],[-32,-49,1]
 ];
 for(let i=0;i<extras.length;i++){
  const [x,z,t]=extras[i],model=human(x,z,skinMaterials[t],i%2?0xcbb99b:0xe6d3b3,i%4===0);
  scene.add(model);people.push({model,x,z,animated:true,index:i});
 }
 const hero=human(0,0,0x9a6245,0xc5b89a,true);scene.add(hero);
 const far=new T.Group();
 // Distant Giza pyramids: visual landmark; they are NOT walkable or at measured distance.
 function pyramid(x,z,r,h,col){
  const mesh=new T.Mesh(new T.ConeGeometry(r,h,4),new T.MeshStandardMaterial({color:col,roughness:.93,flatShading:true}));
  mesh.position.set(x,h/2,z);mesh.rotation.y=Math.PI/4;mesh.castShadow=false;mesh.receiveShadow=true;far.add(mesh);
  const edges=new T.LineSegments(new T.EdgesGeometry(mesh.geometry),new T.LineBasicMaterial({color:0xf9e5bb,transparent:true,opacity:.25}));
  edges.position.copy(mesh.position);edges.rotation.copy(mesh.rotation);far.add(edges);
 }
 pyramid(200,-150,51,94,0xdfcfaa);pyramid(264,-23,45,80,0xcbbf9d);pyramid(223,111,27,54,0xc2b497);
 scene.add(far);
 // Small atmospheric particles (purely cosmetic, slow drifting).
 const dustCount=95,xyz=new Float32Array(dustCount*3),dr=rnd(17);
 for(let i=0;i<dustCount;i++){xyz[i*3]=-54+dr()*160;xyz[i*3+1]=.5+dr()*23;xyz[i*3+2]=-110+dr()*210;}
 const dustGeom=new T.BufferGeometry();dustGeom.setAttribute("position",new T.BufferAttribute(xyz,3));
 const dust=new T.Points(dustGeom,new T.PointsMaterial({color:0xffe4a3,size:.27,transparent:true,opacity:.37,depthWrite:false}));scene.add(dust);
 function resize(){
  const rect=holder.getBoundingClientRect(),w=Math.max(100,rect.width),h=Math.max(100,rect.height);
  renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
 }
 resize();window.addEventListener("resize",resize);
 const raycaster=new T.Raycaster();
 const target=new T.Vector3(),forward=new T.Vector3();
 let started=false;
 function render(dt,player,heading,first,paused){
  const time=performance.now()*.001;
  const waterPos=waterGeo.attributes.position;
  for(let i=0;i<waterPos.count;i++){
   waterPos.setY(i,waveBase[i*3+1]+Math.sin(time*1.5+i*.22)*.12+Math.sin(time*.8+i*.11)*.07);
  }
  waterPos.needsUpdate=true;waterGeo.computeVertexNormals();
  for(let i=0;i<boats.length;i++){
   boats[i].position.y=-.42+Math.sin(time*1.5+i*2)*.12;
   boats[i].rotation.z=Math.sin(time*.72+i)*.014;
  }
  for(let i=0;i<waterHighlights.length;i++){
   waterHighlights[i].material.opacity=.08+.08*Math.sin(time+i*1.4);
   waterHighlights[i].position.x=-93+Math.sin(time*.32+i*.8)*19;
  }
  for(const p of people){
   if(p.animated){
    const stride=Math.sin(time*(.42+p.index*.04)+p.index*2)*2.5;
    p.model.position.set(p.x+stride,0,p.z+Math.cos(time*.4+p.index)*1.3);
    p.model.rotation.y=Math.sin(time*.48+p.index);
   }else p.model.rotation.y=Math.sin(time*.44+p.x)*.18;
   p.model.children.forEach(child=>{
    if(child.userData.arm)child.rotation.x=Math.sin(time*2.9+p.x)*.19;
    if(child.userData.leg)child.rotation.x=Math.sin(time*2.9+p.x+child.userData.leg*Math.PI)*.16;
   });
  }
  markers.forEach((m,i)=>{
   m.icon.position.y=3.2+Math.sin(time*2.5+i*2)*.27;
   m.icon.rotation.y+=dt*.62;m.halo.material.opacity=.6+.2*Math.sin(time*2+i);
  });
  const go=hero.position;
  go.set(player.x,0,player.z);hero.rotation.y=-heading;hero.visible=!first;
  const swing=player.moving?Math.sin(time*9)*.35:0;
  hero.children.forEach(child=>{
   if(child.userData.arm)child.rotation.x=swing*child.userData.arm;
   if(child.userData.leg)child.rotation.x=-swing*child.userData.leg;
  });
  forward.set(Math.sin(heading),0,-Math.cos(heading));
  if(first){
   target.set(player.x,5.06,player.z);
   camera.position.lerp(target,.55);
   camera.lookAt(target.clone().add(forward.clone().multiplyScalar(30)).add(new T.Vector3(0,player.pitch*28,0)));
  }else{
   const back=target.set(player.x,5.5+Math.max(0,player.pitch)*7,player.z).sub(forward.clone().multiplyScalar(12));
   back.y+=5.6;
   if(!started){camera.position.copy(back);started=true;}
   else camera.position.lerp(back,.18);
   camera.lookAt(new T.Vector3(player.x,4.5,player.z).add(forward.clone().multiplyScalar(10)).add(new T.Vector3(0,player.pitch*13,0)));
  }
  renderer.render(scene,camera);
 }
 function pick(clientX,clientY){
  const rect=renderer.domElement.getBoundingClientRect();
  const p=new T.Vector2((clientX-rect.left)/rect.width*2-1,-(clientY-rect.top)/rect.height*2+1);
  raycaster.setFromCamera(p,camera);
  const hit=raycaster.intersectObjects(scene.children,true).find(x=>x.object.userData.interactId);
  return hit?.object.userData.interactId||null;
 }
 return{scene,camera,renderer,render,resize,pick,setHaulProgress,canvas:renderer.domElement};
}
g.HarbourWorld={create};
})(window);
