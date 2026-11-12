import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Phone, MessageCircle, Code2, Bug, BriefcaseBusiness, Menu, X, ExternalLink, Download, Sparkles, ChevronRight, Globe2 } from 'lucide-react';
import './style.css';

const reviews = [
 {name:'David',country:'United States',flag:'🇺🇸',project:"Android Testers For Sports Pick'em",quote:'Adil was very professional, communicative, and provided helpful feedback during the testing period. Recommended. I would work with him again.'},
 {name:'Andranik',country:'Armenia',flag:'🇦🇲',project:'Daily Android Screenshot Task',quote:'Thanks, Help a lot. A good and responsible person.'},
 {name:'Reelrecs',country:'United States',flag:'🇺🇸',project:'Movie & TV Fans Wanted: Test ReelRecs — Multiple Testers Needed',quote:'Adil has been an absolute pleasure to work with and I’m very grateful for our project together. I hope to work with him again soon and anticipate a long term collaboration! I would highly recommend his expertise and stand behind him with full trust.'},
 {name:'John',country:'United States',flag:'🇺🇸',project:'UI/UX Improvements Polishing the UI',quote:'Great work. Highly confident vendor help my project get to the finish line.. very caring and competent.'},
 {name:'John',country:'United States',flag:'🇺🇸',project:'Talk Library/voice wiring + Skill Selector',quote:'Adil came to my rescue multiple times. Highly competent, high energy. He edited my products UI, wired key features, prepared the iOS certifications, and clearly communicated along every step of the process. A competent business professional. Highly recommended.'},
 {name:'Krishnan Venkatraman',country:'India',flag:'🇮🇳',project:'Android App Testing: 14 Testers',quote:'A Job well done, Thank you!'},
 {name:'John',country:'United States',flag:'🇺🇸',project:'Provide Android APK Download Link -- 2',quote:"Highly competent. Great energy. Great work. I asked 3 other vendors and they overcharged and did not perform. This man is a gladiator. And, I'm sending more work his way. Extremely competent! WOW. Great contractor. Founder, Golf Coach Now."},
 {name:'Minseok',country:'South Korea',flag:'🇰🇷',project:'Live test purchase on our ticket site with a non-Korean card',quote:'Adil did a live card payment test on our ticket site and sent a clear screen recording of the whole flow, plus extra screenshots and details when we asked. Responsive, patient, and easy to work with. Recommended!'},
 {name:'Nicolas',country:'Germany',flag:'🇩🇪',project:'Vertical Loom-Style Onboarding Walkthrough Video 60–90 seconds',quote:'Easy communication, was flexible about changes. Can recommend!'},
 {name:'Tzvetan',country:'Spain',flag:'🇪🇸',project:'Android App Beta Testers Needed',quote:'He is a hard worker. Good job. Thank you!'},
 {name:'Mo',country:'Canada',flag:'🇨🇦',project:'Android App Beta Testing',quote:'Very professional. Thank you.'},
 {name:'Zhu',country:'Hong Kong',flag:'🇭🇰',project:'E-Commerce App Beta Testing',quote:'Pleasant cooperation!'},
 {name:'Wai Lon',country:'United States',flag:'🇺🇸',project:'Export a code out from the login page',quote:'He delivered the job project in no time. Great work and very pleasant to work with.'},
 {name:'Yasser',country:'France',flag:'🇫🇷',project:'Gmail Attachment Management Usability Test',quote:'Highly recommend, Adil did a great job.'},
 {name:'Vijay',country:'India',flag:'🇮🇳',project:'Android App Development & Publishing',quote:'This was my 8th project with Adil, and once again he did an excellent job. He successfully handled the Google Play Console submission and completed the required closed testing. He is skilled, responsive, reliable, and knowledgeable about Play Store requirements. Communication was smooth throughout the project. I highly recommend Adil and would be happy to work with him again.'}
];

const services = [
 {n:'01',icon:Code2,title:'Android App Development',desc:'Thoughtful Android experiences built with modern native tooling and maintainable architecture.',tags:['Kotlin','Jetpack Compose','Firebase','REST APIs','MVVM']},
 {n:'02',icon:Bug,title:'Software QA & Testing',desc:'Careful hands-on testing that uncovers issues, clarifies risk and gives teams actionable feedback.',tags:['Manual & Exploratory','Regression','UI / UX','Android & Web','Games','Postman API','Bug Reports','Closed Testing']},
 {n:'03',icon:BriefcaseBusiness,title:'Virtual Assistance',desc:'Reliable operational support that keeps research, communication and daily workflows moving.',tags:['Freelancer Bids','Job Research','ATS Analysis','Client Communication','Admin Support','Coordination']}
];
const skills = ['Kotlin','Jetpack Compose','Android Studio','Firebase','REST APIs','MVVM','Manual Testing','Regression Testing','Exploratory Testing','Postman','Jira-style Bug Reporting','Cross-device Testing','Google Play Console','Research','Client Communication','Administrative Support'];


function MiniBuilding({position=[0,0,0],color='#6eaaff',height=1.2,wide=.48}) {
 return <group position={position}>
  <mesh position={[0,height/2,0]} castShadow receiveShadow><boxGeometry args={[wide,height,wide]}/><meshStandardMaterial color="#182b48" roughness={.7}/></mesh>
  <mesh position={[0,height+.08,0]} castShadow><coneGeometry args={[wide*.82,.28,4]}/><meshStandardMaterial color={color} metalness={.25} roughness={.4}/></mesh>
  {[...Array(3)].map((_,i)=><mesh key={i} position={[0,height*.2+i*height*.23,wide/2+.006]}><planeGeometry args={[wide*.48,.09]}/><meshStandardMaterial color="#7fe8e1" emissive="#43b8d5" emissiveIntensity={1.4}/></mesh>)}
 </group>
}
function PineTree({position=[0,0,0],scale=1}) {
 return <group position={position} scale={scale}>
  <mesh position={[0,.22,0]}><cylinderGeometry args={[.07,.1,.45,5]}/><meshStandardMaterial color="#76533d"/></mesh>
  <mesh position={[0,.62,0]}><coneGeometry args={[.42,.8,6]}/><meshStandardMaterial color="#1e846f" roughness={.9}/></mesh>
  <mesh position={[0,.92,0]}><coneGeometry args={[.3,.62,6]}/><meshStandardMaterial color="#37b58a" roughness={.9}/></mesh>
 </group>
}
function Island({position=[0,0,0],color='#243a66',label,onClick,icon='✦',scale=1,kind='city'}) {
 const accent=kind==='qa'?'#a58cff':kind==='dev'?'#69b9ff':kind==='va'?'#7cc7ff':kind==='contact'?'#70e6bd':'#65d9c5';
 return <group position={position} scale={scale} onClick={onClick}>
  <mesh position={[0,-.42,0]} castShadow receiveShadow><cylinderGeometry args={[1.65,1.22,.72,7]}/><meshStandardMaterial color="#111d35" roughness={.86}/></mesh>
  <mesh position={[0,-.02,0]} castShadow receiveShadow><cylinderGeometry args={[1.68,1.68,.16,7]}/><meshStandardMaterial color={color} metalness={.22} roughness={.48}/></mesh>
  <mesh position={[0,.075,0]}><cylinderGeometry args={[1.48,1.48,.045,7]}/><meshStandardMaterial color="#355b84" emissive={color} emissiveIntensity={.22}/></mesh>
  <mesh position={[0,.16,0]}><torusGeometry args={[.7,.035,8,48]}/><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.7}/></mesh>
  <MiniBuilding position={[-.55,.1,-.2]} color={accent} height={kind==='dev'?1.35:kind==='qa'?1.05:1.18} wide={.46}/>
  <MiniBuilding position={[.38,.1,-.28]} color={kind==='qa'?'#8d75ff':'#4c91ce'} height={kind === 'contact' ? .7 : .9} wide={.38}/>
  <mesh position={[.38,.1,.48]}><cylinderGeometry args={[.12,.12,.25,8]}/><meshStandardMaterial color="#e5b969" emissive="#bd8a42" emissiveIntensity={.35}/></mesh>
  <PineTree position={[-1.08,.08,.48]} scale={.68}/>
  <PineTree position={[.98,.08,.62]} scale={.55}/>
  <mesh position={[0,.9,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.5,.045,8,32,Math.PI]}/><meshStandardMaterial color="#9dd3ff" emissive="#4388ff" emissiveIntensity={1.7}/></mesh>
  <Float speed={1.6} floatIntensity={.22}><Text position={[0,1.22,.05]} fontSize={.24} color="#ffffff" anchorX="center" outlineWidth={.012} outlineColor="#07101f">{icon}</Text></Float>
  <Html position={[0,1.52,0]} center distanceFactor={9} style={{pointerEvents:'none'}}><div className="island-label">{label}</div></Html>
 </group>
}

function ExplorerPod() {
 const pod=useRef(),pressed=useRef({}),wheels=useRef([]);
 useEffect(()=>{
  const down=e=>{const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(k)){pressed.current[k]=true;if(k.startsWith('arrow'))e.preventDefault();}};
  const up=e=>{pressed.current[e.key.toLowerCase()]=false;};
  const clear=()=>{pressed.current={};};
  window.addEventListener('keydown',down,{passive:false});window.addEventListener('keyup',up);window.addEventListener('blur',clear);
  return ()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',clear);};
 },[]);
 useFrame((_,dt)=>{
  if(!pod.current)return;
  const k=pressed.current,dx=(k.d||k.arrowright?1:0)-(k.a||k.arrowleft?1:0),dz=(k.s||k.arrowdown?1:0)-(k.w||k.arrowup?1:0);
  const len=Math.hypot(dx,dz),speed=len?3.15:0;
  if(len){const nx=dx/len,nz=dz/len;pod.current.position.x=THREE.MathUtils.clamp(pod.current.position.x+nx*speed*dt,-6.6,6.6);pod.current.position.z=THREE.MathUtils.clamp(pod.current.position.z+nz*speed*dt,-5.4,5.4);pod.current.rotation.y=Math.atan2(nx,nz);wheels.current.forEach(w=>{if(w)w.rotation.x+=speed*dt*3.8;});}
  pod.current.position.y=-1.79+Math.sin(performance.now()*.003)*.025;
 });
 return <group ref={pod} position={[0,-1.79,.15]}>
  <mesh position={[0,.24,0]} castShadow><boxGeometry args={[.72,.22,1.05]}/><meshStandardMaterial color="#55cdb0" metalness={.48} roughness={.28}/></mesh>
  <mesh position={[0,.43,-.08]} castShadow><boxGeometry args={[.46,.28,.46]}/><meshStandardMaterial color="#b6e9ff" metalness={.6} roughness={.16} transparent opacity={.82}/></mesh>
  <mesh position={[0,.23,.55]}><boxGeometry args={[.5,.1,.12]}/><meshStandardMaterial color="#a8d8ff" emissive="#4b9eff" emissiveIntensity={1.8}/></mesh>
  {[[-.39,.1,-.32],[.39,.1,-.32],[-.39,.1,.34],[.39,.1,.34]].map((pos,i)=><group key={i} ref={el=>wheels.current[i]=el} position={pos} rotation={[0,0,Math.PI/2]}><mesh castShadow><cylinderGeometry args={[.16,.16,.11,12]}/><meshStandardMaterial color="#101a2a" roughness={.9}/></mesh><mesh><cylinderGeometry args={[.07,.07,.115,10]}/><meshStandardMaterial color="#8ec8ed" metalness={.8}/></mesh></group>)}
  <pointLight position={[0,.18,.72]} color="#5fdcc2" intensity={1.3} distance={2.2}/>
 </group>
}
function World({onNavigate}) {
 const group=useRef();
 const paths=useMemo(()=>[
  new THREE.CatmullRomCurve3([new THREE.Vector3(-3.5,-1.15,1.1),new THREE.Vector3(-2.1,-1.35,.6),new THREE.Vector3(-.7,-1.2,-.3)]),
  new THREE.CatmullRomCurve3([new THREE.Vector3(-.7,-1.2,-.3),new THREE.Vector3(.6,-1.28,-1.1),new THREE.Vector3(2.2,-1.15,-1.6)]),
  new THREE.CatmullRomCurve3([new THREE.Vector3(2.2,-1.15,-1.6),new THREE.Vector3(3.2,-1.35,-.1),new THREE.Vector3(3.7,-1.2,1.4)]),
  new THREE.CatmullRomCurve3([new THREE.Vector3(3.7,-1.2,1.4),new THREE.Vector3(1.8,-1.38,2.3),new THREE.Vector3(0,-1.25,3.1)])
 ],[]);
 useFrame((s)=>{if(group.current) group.current.rotation.y=Math.sin(s.clock.elapsedTime*.12)*.045});
 return <group ref={group}>
  <ambientLight intensity={.72}/><hemisphereLight args={['#9acbff','#10213a',.7]}/>
  <directionalLight position={[5,9,6]} intensity={2.4} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
  <pointLight position={[-5,3,-4]} color="#586dff" intensity={38}/><pointLight position={[4,2,4]} color="#39d7b1" intensity={18}/>
  <Stars radius={90} depth={55} count={2600} factor={3.2} saturation={.65} fade speed={.7}/>
  <mesh position={[0,-2.65,0]} castShadow receiveShadow><cylinderGeometry args={[8.6,9.4,1.05,10]}/><meshStandardMaterial color="#101a31" metalness={.28} roughness={.76}/></mesh>
  <mesh position={[0,-2.08,0]}><cylinderGeometry args={[8.05,8.05,.12,10]}/><meshStandardMaterial color="#173d73" emissive="#103e89" emissiveIntensity={.65}/></mesh>
  <mesh position={[0,-1.99,0]}><torusGeometry args={[7.95,.045,8,120]}/><meshStandardMaterial color="#3e8dff" emissive="#286fff" emissiveIntensity={1.4}/></mesh>
  {paths.map((curve,i)=><mesh key={i} geometry={new THREE.TubeGeometry(curve,36,.055,8,false)}><meshStandardMaterial color="#78b7ed" emissive="#2c6ab7" emissiveIntensity={.55}/></mesh>)}
  <Island position={[-3.55,-.2,1.15]} color="#225b65" label="ABOUT ADIL" icon="AJ" kind="about" onClick={()=>onNavigate('about')}/>
  <Island position={[-1.25,.05,-2.05]} color="#244c85" label="DEVELOPMENT" icon="</>" kind="dev" onClick={()=>onNavigate('projects')}/>
  <Island position={[2.2,.05,-1.72]} color="#4c367d" label="QA TESTING LAB" icon="QA" kind="qa" onClick={()=>onNavigate('qa')}/>
  <Island position={[3.82,-.2,1.42]} color="#37517c" label="VA OFFICE" icon="VA" kind="va" onClick={()=>onNavigate('services')}/>
  <Island position={[0,-.28,3.55]} color="#315c45" label="CONTACT PORTAL" icon="↗" kind="contact" onClick={()=>onNavigate('contact')}/>
  <ExplorerPod/>
  <Float speed={1.05} floatIntensity={.28}><group position={[0,1.7,0]}><mesh><icosahedronGeometry args={[.58,1]}/><meshStandardMaterial color="#86c6ff" emissive="#347bff" emissiveIntensity={1.9} metalness={.7} roughness={.16}/></mesh><mesh><icosahedronGeometry args={[.82,1]}/><meshBasicMaterial color="#6db6ff" wireframe transparent opacity={.28}/></mesh></group></Float>
  <Float speed={1.2} floatIntensity={.2}><mesh position={[-5.2,1.15,-2.6]}><octahedronGeometry args={[.28]}/><meshStandardMaterial color="#9c82ff" emissive="#6548ff" emissiveIntensity={1.7}/></mesh></Float>
  <Float speed={1.45} floatIntensity={.22}><mesh position={[5.1,1.4,-3]}><octahedronGeometry args={[.22]}/><meshStandardMaterial color="#55e1bf" emissive="#159b80" emissiveIntensity={1.7}/></mesh></Float>
  <Float speed={.9} floatIntensity={.16}><mesh position={[0,2.4,-4.2]}><torusGeometry args={[.62,.018,6,48]}/><meshStandardMaterial color="#6b9cff" emissive="#386bff" emissiveIntensity={1.2}/></mesh></Float>
 </group>
}
function App(){
 const [menu,setMenu]=useState(false),[showWorld,setShowWorld]=useState(true),[active,setActive]=useState('all');
 const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)};
 const filtered=active==='all'?reviews:reviews.filter(r=>/Android|App|Beta|Testing|QA|UI\/UX|Gmail|ticket/i.test(r.project));
 return <div className="app">
  <header className="nav"><a className="brand" href="#top"><span className="brand-mark">AJ</span><span>ADIL JAVED<small>DIGITAL PORTFOLIO</small></span></a><button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button><nav className={menu?'nav-links open':'nav-links'}>{[['About','about'],['Services','services'],['Projects','projects'],['QA Work','qa'],['Reviews','reviews'],['Contact','contact']].map(([l,id])=><button key={id} onClick={()=>go(id)}>{l}</button>)}<button className="nav-cta" onClick={()=>go('contact')}>Let's talk <ArrowUpRight size={15}/></button></nav></header>
  <main id="top">
   <section className="hero">
    <div className="hero-copy"><div className="eyebrow"><span className="pulse"></span> AVAILABLE FOR SELECT PROJECTS <span className="eyebrow-line"/></div>
     <h1>Building better<br/><span>digital experiences.</span></h1>
     <p className="hero-sub">I’m Adil Javed — an Android App Developer, Manual QA Engineer and Virtual Assistant helping ideas move from concept to dependable delivery.</p>
     <div className="hero-actions"><button className="primary-btn" onClick={()=>go('projects')}>Explore my work <ArrowUpRight size={17}/></button><button className="text-btn" onClick={()=>go('contact')}>Start a conversation <ChevronRight size={16}/></button></div>
     <div className="hero-proof"><div><b>4 yrs</b><span>QA experience</span></div><i/><div><b>4 yrs</b><span>Android development</span></div><i/><div><b>3 yrs</b><span>Virtual assistance</span></div></div>
    </div>
    <div className="portrait-wrap"><div className="portrait-glow"></div><img src="/assets/adil-javed.jpeg" alt="Adil Javed professional portrait" className="portrait"/><div className="portrait-caption"><span className="status-dot"></span><div><b>Adil Javed</b><small>Pakistan · Working worldwide</small></div><span className="caption-index">01 / 03</span></div><div className="portrait-orbit orbit-one"></div><div className="portrait-orbit orbit-two"></div></div>
    <div className="hero-scroll" onClick={()=>go('world')}><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></div>
   </section>
   <section id="world" className="world-section section-pad"><div className="section-heading"><div><span className="kicker">THE INTERACTIVE EXPERIENCE</span><h2>Enter my <em>digital world.</em></h2></div><p>Explore the zones to discover what I build, test and support. Drag to orbit, scroll to zoom, or use the quick links below.</p></div>
    <div className="world-frame"><Canvas shadows camera={{position:[0,5.2,11.8],fov:43}} dpr={[1,1.8]}><Suspense fallback={null}><color attach="background" args={['#081224']}/><fog attach="fog" args={['#081224',12,26]}/><World onNavigate={go}/><OrbitControls enablePan={false} enableDamping dampingFactor={.08} minDistance={7.2} maxDistance={16} maxPolarAngle={Math.PI*.48} minPolarAngle={.42} /></Suspense></Canvas><div className="world-overlay"><span className="world-tag"><Sparkles size={13}/> INTERACTIVE MAP</span><span className="world-hint">WASD TO DRIVE · DRAG TO ORBIT · CLICK A ZONE</span></div></div>
    <div className="zone-links">{[['About Adil','about'],['Development','projects'],['QA Testing','qa'],['VA Services','services'],['Contact','contact']].map(([l,id],i)=><button key={id} onClick={()=>go(id)}><span>0{i+1}</span>{l}<ArrowUpRight size={14}/></button>)}</div>
   </section>
   <section id="about" className="about-section section-pad"><div className="section-label">01 — ABOUT</div><div className="about-grid"><h2>Curious by nature.<br/><em>Reliable by practice.</em></h2><div className="about-copy"><p>I work across the product journey — building Android applications, testing software with a detail-first mindset, and supporting the people and processes behind digital projects.</p><p>My approach is practical: understand the goal, communicate clearly, document the details and deliver work that teams can confidently move forward with.</p><div className="text-link-row"><a href="https://www.freelancer.com/u/adilmalikdev" target="_blank" rel="noreferrer">View Freelancer profile <ArrowUpRight size={15}/></a><span>Based in Pakistan · Open to international collaboration</span></div></div></div>
    <div className="stats-grid"><div><b>54+</b><span>QA & closed-testing projects / apps*</span></div><div><b>50</b><span>Freelancer reviews*</span></div><div><b>5/5</b><span>Freelancer rating*</span></div><div><b>11 yrs</b><span>Combined experience across 3 roles</span></div></div><small className="fineprint">*Experience, project count and Freelancer review figures are supplied by Adil; review count and rating should be reconfirmed against the live profile before publication.</small>
   </section>
   <section id="services" className="services-section section-pad"><div className="section-heading"><div><span className="kicker">02 — WHAT I DO</span><h2>Three disciplines.<br/><em>One dependable partner.</em></h2></div><p>Support for product teams, founders and busy professionals at different stages of their work.</p></div><div className="service-list">{services.map(s=><article className="service-card" key={s.n}><div className="service-num">{s.n}</div><s.icon className="service-icon" size={25}/><div className="service-body"><h3>{s.title}</h3><p>{s.desc}</p><div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div></div><ArrowUpRight className="service-arrow"/></article>)}</div></section>
   <section className="skills-section section-pad"><div className="section-label">03 — TOOLKIT</div><div className="skills-head"><h2>Tools I use.<br/><em>Skills I rely on.</em></h2><p>A working toolkit spanning native Android development, software quality and day-to-day project support.</p></div><div className="skill-cloud">{skills.map(s=><span key={s}>{s}</span>)}</div></section>
   <section id="projects" className="projects-section section-pad"><div className="section-heading"><div><span className="kicker">04 — SELECTED WORK</span><h2>Work with <em>purpose.</em></h2></div><p>A featured client collaboration and supporting work samples. Details are kept within the scope of the work shared.</p></div>
    <article className="featured-project"><div className="project-visual"><div className="project-placeholder"><div className="golf-brand"><span>◉</span> GolfCoach<span>Now</span></div><div className="phone-pair"><div className="phone-mock"><div className="mock-top">Good Morning, John.</div><div className="mock-green">Let’s build mastery.</div><div className="mock-panel">YOUR PROGRESS <b>82%</b><div className="mock-bar"></div></div><div className="mock-button">Analyze My Swing →</div></div><div className="phone-mock phone-right"><div className="mock-top">Swing Analysis</div><div className="mock-golfer">◉　BEFORE / AFTER</div><div className="mock-panel">KEY CORRECTION<br/><b>Shallower Club Path</b></div></div></div><span className="visual-note">PROJECT VISUAL PLACEHOLDER · ORIGINAL IMAGE TO BE ADDED</span></div></div><div className="project-info"><span className="kicker">FEATURED CLIENT PROJECT</span><h3>GolfCoachNow</h3><p>A golf coaching product concept focused on helping players understand swing mechanics, track progress and work toward more consistent performance.</p><div className="contribution"><b>My contribution</b><span>Mobile UI design</span><span>Android development contribution</span></div><div className="tags"><span>Mobile UI</span><span>Android</span><span>Golf Tech</span><span>Dark UI</span></div><p className="project-caveat">Project showcase only. No claim that the app is currently live.</p></div></article>
    <div className="project-secondary"><div><span className="kicker">MORE WORK</span><h3>Practical work.<br/><em>Clear evidence.</em></h3></div><p>Selected QA work samples are available to review below. Additional Android project visuals can be added as you share approved screenshots.</p><button className="outline-btn" onClick={()=>go('qa')}>Explore QA samples <ArrowUpRight size={15}/></button></div>
   </section>
   <section id="qa" className="qa-section section-pad"><div className="section-heading"><div><span className="kicker">05 — QUALITY ASSURANCE</span><h2>Tested with care.<br/><em>Reported with clarity.</em></h2></div><p>Selected testing documentation from mobile apps, games and AI products. Each sample opens the original report supplied for this portfolio.</p></div>
    <div className="qa-cards">
     <article className="qa-card"><div className="qa-card-top"><div className="qa-icon"><Bug/></div><span className="qa-chip">BROWSER GAME · QA</span></div><span className="kicker">QA CASE STUDY 01</span><h3>Dragons of Camelot</h3><p>Detailed game QA bug report covering authentication, security validation, gameplay, resource loading, navigation, accessibility and UI consistency.</p><div className="qa-metrics"><div><b>53</b><small>Reported items</small></div><div><b>3</b><small>Critical</small></div><div><b>12</b><small>High</small></div></div><div className="qa-meta"><span>Web game</span><span>Excel bug report</span></div><a href="/assets/dragons-of-camelot-qa-bug-report.xlsx" download>Download bug report <Download size={15}/></a></article>
     <article className="qa-card"><div className="qa-card-top"><div className="qa-icon"><Bug/></div><span className="qa-chip">MOBILE · ANDROID & IOS</span></div><span className="kicker">QA CASE STUDY 02</span><h3>Wham Bam</h3><p>41-page mobile app test plan covering three game modes, gameplay, team scoring, sensors, voice commands, session recovery, network, purchases and accessibility.</p><div className="qa-metrics"><div><b>41</b><small>Pages</small></div><div><b>18</b><small>Fail-marked tests</small></div></div><div className="qa-meta"><span>Android & iOS</span><span>Word test plan</span></div><a href="/assets/wham-bam-mobile-test-plan.docx" download>Download test plan <Download size={15}/></a></article>
     <article className="qa-card"><div className="qa-card-top"><div className="qa-icon"><Bug/></div><span className="qa-chip">AI · WEB APP</span></div><span className="kicker">QA CASE STUDY 03</span><h3>Inqui AI</h3><p>QA tracking across registration, authentication, WhatsApp connection, AI responses, lead management, dashboard behaviour and UI improvements.</p><div className="qa-metrics"><div><b>37</b><small>Tracked items</small><small> </small></div><div><b>4</b><small>Fixed / implemented</small></div></div><div className="qa-meta"><span>Web application</span><span>Excel QA tracker</span></div><a href="/assets/inqui-ai-qa-report.xlsx" download>Download QA report <Download size={15}/></a></article>
     <article className="qa-card qa-card-featured"><div className="qa-card-top"><div className="qa-icon"><Bug/></div><span className="qa-chip">ANDROID · EXPLORATORY</span></div><span className="kicker">QA CASE STUDY 04</span><h3>Vantage Point</h3><p>Exploratory Android testing focused on capsule creation, location access, time locks, account recovery, sharing and UI behaviour.</p><div className="qa-metrics"><div><b>8</b><small>Passed tests</small></div><div><b>12</b><small>Confirmed bugs</small></div><div><b>1</b><small>Client confirmation</small></div></div><div className="qa-meta"><span>Android 12–15</span><span>Excel test report</span></div><a href="/assets/vantage-point-testing-report.xlsx" download>Download test report <Download size={15}/></a></article>
     <article className="qa-card"><div className="qa-card-top"><div className="qa-icon"><Bug/></div><span className="qa-chip">PRODUCT TESTING</span></div><span className="kicker">QA CASE STUDY 05</span><h3>ReelRecs</h3><p>QA report documenting findings from exploratory testing of a movie and TV discovery experience.</p><div className="qa-metrics"><div><b>15</b><small>Reported issues*</small></div></div><div className="qa-meta"><span>Excel QA report</span><span>Existing work sample</span></div><a href="/assets/reelrecs-qa-report.xlsx" download>Download QA sample <Download size={15}/></a></article>
    </div>
    <small className="fineprint">Reports are shared as supplied. Counts reflect the attached files; “tracked items” may include bugs, enhancements and follow-up items, not only confirmed defects. Please ensure client permission before public distribution.</small>
   </section>
   <section id="reviews" className="reviews-section section-pad"><div className="section-heading"><div><span className="kicker">06 — CLIENT FEEDBACK</span><h2>Good work is built<br/><em>on good relationships.</em></h2></div><div className="review-summary"><b>5.0 <span>★★★★★</span></b><small>50 reviews · as provided by Adil</small><a href="https://www.freelancer.com/u/adilmalikdev" target="_blank" rel="noreferrer">See Freelancer profile <ArrowUpRight size={14}/></a></div></div><div className="review-controls"><span>SHOWING ALL {reviews.length} SHARED REVIEWS</span><button className={active==='all'?'selected':''} onClick={()=>setActive('all')}>All feedback</button><button className={active==='qa'?'selected':''} onClick={()=>setActive('qa')}>Testing & product work</button></div><div className="review-grid">{filtered.map((r,i)=><article className="review-card" key={r.name+r.project}><div className="review-top"><div className="review-avatar">{r.name[0]}</div><div><b>{r.name}</b><small>{r.flag} {r.country}</small></div><span className="review-stars">★★★★★ <small>5.0</small></span></div><h3>{r.project}</h3><p>“{r.quote}”</p><div className="review-foot"><span>Freelancer client feedback</span><span>Verified screenshot supplied</span></div></article>)}</div><p className="review-note">These 15 reviews are transcribed from screenshots you supplied. The 50-review total and 5/5 overall rating are your stated profile figures; the complete remaining reviews can be added when their screenshots are provided.</p></section>
   <section className="experience-section section-pad"><div className="section-label">07 — EXPERIENCE</div><div className="experience-grid"><h2>Experience across<br/><em>the full product cycle.</em></h2><div className="timeline"><div><b>Android App Development</b><span>4 years · Kotlin, Jetpack Compose, Firebase, APIs</span></div><div><b>Software QA & Testing</b><span>4 years · Manual testing, mobile, web, games and documentation</span></div><div><b>Virtual Assistance</b><span>3 years · Research, bid management, communication and admin support</span></div></div></div></section>
   <section id="contact" className="contact-section section-pad"><div className="contact-glow"></div><span className="kicker">08 — CONTACT</span><h2>Have a good project<br/>in <em>mind?</em></h2><p>Tell me what you’re building, what needs testing or where you need an extra pair of hands. Let’s talk.</p><div className="contact-actions"><a className="primary-btn" href="mailto:engadiljavedbhutta@gmail.com"><Mail size={17}/> Email Adil <ArrowUpRight size={16}/></a><a className="whatsapp-btn" href="https://wa.me/923296556813" target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp</a></div><div className="contact-details"><a href="mailto:engadiljavedbhutta@gmail.com">engadiljavedbhutta@gmail.com</a><a href="tel:+923296556813">+92 329 6556813</a><span>Pakistan · Available for international clients</span></div><div className="socials"><a href="https://github.com/adiljaved22?tab=repositories" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href="https://www.linkedin.com/in/adil-javed-b96a7136b/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="https://www.freelancer.com/u/adilmalikdev" target="_blank" rel="noreferrer" aria-label="Freelancer"><Globe2/></a></div></section>
  </main>
  <footer><a className="brand" href="#top"><span className="brand-mark">AJ</span><span>ADIL JAVED<small>DIGITAL PORTFOLIO</small></span></a><span>Designed to explore. Built to connect.</span><a href="#top">BACK TO TOP ↑</a><small>© {new Date().getFullYear()} Adil Javed. All rights reserved.</small></footer>
  <a className="floating-wa" href="https://wa.me/923296556813" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle/></a>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
