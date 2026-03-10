import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────── DATA ─────────────────────────────── */
const COMPANIES = [
  { name:'Amazon',    e:'🛒', c:'#1d4ed8', bg:'#eff6ff', oa:['Arrays','Graphs','DP'],          tech:['OOPS','System Design','SQL'],     cgpa:'7.5+', ctc:'18–28 LPA', rounds:3 },
  { name:'Google',    e:'🔍', c:'#1e40af', bg:'#eff6ff', oa:['Trees','Strings','Greedy'],       tech:['Algorithms','OS','Distributed'],  cgpa:'8.0+', ctc:'25–45 LPA', rounds:4 },
  { name:'Microsoft', e:'🪟', c:'#0369a1', bg:'#f0f9ff', oa:['LinkedList','BFS/DFS','DP'],      tech:['OOD','REST APIs','Azure'],        cgpa:'7.0+', ctc:'20–35 LPA', rounds:3 },
  { name:'Flipkart',  e:'🛍', c:'#1e3a8a', bg:'#eff6ff', oa:['Hashing','Sorting','Arrays'],     tech:['DSA','Java','System Design'],     cgpa:'7.0+', ctc:'15–22 LPA', rounds:3 },
];
const FEATURES = [
  { icon:'🏢', title:'Company Hiring Patterns', desc:'Every OA topic, technical round, eligibility criteria and CTC range — decoded for 180+ companies.', c:'#2563eb' },
  { icon:'🤝', title:'Alumni Mentorship',        desc:'Book live 30-min sessions with placed alumni. Real-time chat powered by WebSocket.',               c:'#0891b2' },
  { icon:'💼', title:'Referral Job Board',       desc:'Alumni post internal openings with direct referral forms. One-click apply for students.',           c:'#0369a1' },
  { icon:'📊', title:'Round Timeline Tracker',   desc:'TPO announces a drive → you get instant alerts + a custom preparation roadmap auto-generated.',    c:'#1e40af' },
];

/* ─────────────────────────── CANVAS MESH ──────────────────────────── */
function BlueMesh() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let W = (c.width  = window.innerWidth);
    let H = (c.height = window.innerHeight);
    let t = 0, raf;
    const blobs = [
      { x:.10, y:.22, r:520, h:222, s:.28 },
      { x:.88, y:.12, r:430, h:210, s:.22 },
      { x:.50, y:.78, r:380, h:232, s:.34 },
      { x:.92, y:.82, r:300, h:200, s:.18 },
      { x:.04, y:.88, r:260, h:215, s:.30 },
      { x:.62, y:.35, r:240, h:225, s:.24 },
    ];
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='#eef3ff'; ctx.fillRect(0,0,W,H);
      /* dot grid */
      ctx.fillStyle='rgba(37,99,235,0.035)';
      for(let x=0;x<W;x+=38) for(let y=0;y<H;y+=38){ctx.beginPath();ctx.arc(x,y,1.3,0,Math.PI*2);ctx.fill();}
      blobs.forEach((b,i)=>{
        const ox=Math.sin(t*b.s+i*1.5)*100, oy=Math.cos(t*b.s*.8+i*1.1)*80;
        const g=ctx.createRadialGradient(b.x*W+ox,b.y*H+oy,0,b.x*W+ox,b.y*H+oy,b.r);
        g.addColorStop(0,  `hsla(${b.h},88%,64%,.17)`);
        g.addColorStop(.5, `hsla(${b.h},82%,70%,.08)`);
        g.addColorStop(1,  `hsla(${b.h},78%,74%,0)`);
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(b.x*W+ox,b.y*H+oy,b.r,0,Math.PI*2); ctx.fill();
      });
      t+=.006; raf=requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
    window.addEventListener('resize',onResize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',onResize);};
  },[]);
  return <canvas ref={ref} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}}/>;
}

/* ────────────────────────── ORBIT PARTICLES ───────────────────────── */
function OrbitRing({ size=130 }) {
  const ref = useRef(null);
  useEffect(()=>{
    const c=ref.current; if(!c) return;
    const ctx=c.getContext('2d'); c.width=c.height=size;
    const cx=size/2, r=size/2-10;
    const pts=Array.from({length:18},(_,i)=>({ a:(i/18)*Math.PI*2, sp:.013+(i%3)*.004, sz:i%5===0?3.5:2 }));
    let raf;
    const draw=()=>{
      ctx.clearRect(0,0,size,size);
      ctx.beginPath(); ctx.arc(cx,cx,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(37,99,235,0.1)'; ctx.lineWidth=1.5; ctx.stroke();
      pts.forEach(p=>{
        p.a+=p.sp;
        const x=cx+Math.cos(p.a)*r, y=cx+Math.sin(p.a)*r;
        ctx.beginPath(); ctx.arc(x,y,p.sz,0,Math.PI*2);
        ctx.fillStyle=`rgba(37,99,235,${.3+.55*Math.abs(Math.sin(p.a))})`; ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw(); return()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={ref} width={size} height={size} style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none'}}/>;
}

/* ───────────────────────── SCROLL COUNTER ─────────────────────────── */
function Counter({ target }) {
  const [v,setV]=useState(0); const ref=useRef(null); const started=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true;
        const n=parseInt(target.replace(/\D/g,''));
        let i=0; const st=setInterval(()=>{i++;setV(Math.round(n*i/60));if(i>=60)clearInterval(st);},1800/60);
      }
    },{threshold:.5});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  return <span ref={ref}>{v.toLocaleString()}</span>;
}

/* ─────────────────────────── TYPEWRITER ───────────────────────────── */
function Typewriter({ words }) {
  const [wI,setWI]=useState(0); const [txt,setTxt]=useState(''); const [del,setDel]=useState(false);
  useEffect(()=>{
    const word=words[wI];
    const id=setTimeout(()=>{
      if(!del){ setTxt(word.slice(0,txt.length+1)); if(txt.length+1===word.length)setTimeout(()=>setDel(true),1500); }
      else    { setTxt(word.slice(0,txt.length-1)); if(txt.length===0){setDel(false);setWI((wI+1)%words.length);} }
    },del?40:75);
    return()=>clearTimeout(id);
  },[txt,del,wI,words]);
  return (
    <span style={{color:'#2563eb'}}>
      {txt}<span style={{display:'inline-block',width:3,height:'1em',background:'#2563eb',marginLeft:3,verticalAlign:'text-bottom',animation:'blink .9s step-end infinite'}}/>
    </span>
  );
}

/* ─────────────────────────── FLOAT CARD ───────────────────────────── */
function FloatCard({ style, children }) {
  return (
    <div style={{
      position:'absolute', background:'rgba(255,255,255,0.86)', backdropFilter:'blur(20px)',
      border:'1.5px solid rgba(255,255,255,0.96)', borderRadius:18, padding:'13px 17px',
      boxShadow:'0 8px 30px rgba(37,99,235,0.10)', zIndex:5, ...style
    }}>{children}</div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN LANDING PAGE
════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const [co, setCo]         = useState(0);
  const [scrolled,setScrolled] = useState(false);
  const [activeNav,setActiveNav] = useState(-1);
  const C = COMPANIES[co];

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>50);
    window.addEventListener('scroll',fn); return()=>window.removeEventListener('scroll',fn);
  },[]);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});

  return (
    <div style={{fontFamily:'var(--font-body)',color:'var(--text)',overflowX:'hidden'}}>
      <style>{`
        @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatA     { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(2deg)} }
        @keyframes floatB     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatC     { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-17px) scale(1.02)} }
        @keyframes gradPan    { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes popIn      { from{opacity:0;transform:scale(.88) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes ringPulse  { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.4);opacity:0} }
        @keyframes twinkle    { 0%,100%{opacity:.1} 50%{opacity:.55} }
        @keyframes borderFlow { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }

        .g-btn { cursor:pointer; border:none; font-family:var(--font-body); font-weight:700; padding:14px 34px; border-radius:50px;
          background:linear-gradient(135deg,#1d4ed8,#3b82f6,#60a5fa); background-size:200% 200%;
          animation:gradPan 3s ease infinite; color:white; font-size:15px;
          box-shadow:0 8px 28px rgba(37,99,235,.38); transition:transform .2s,box-shadow .2s; }
        .g-btn:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 14px 36px rgba(37,99,235,.50); }

        .o-btn { cursor:pointer; font-family:var(--font-body); font-weight:600; padding:12px 30px; border-radius:50px; font-size:15px;
          border:2px solid rgba(37,99,235,.2); background:rgba(255,255,255,.7); backdrop-filter:blur(10px);
          color:#2563eb; transition:all .2s; }
        .o-btn:hover { background:rgba(255,255,255,.95); border-color:#2563eb; transform:translateY(-2px); box-shadow:0 8px 20px rgba(37,99,235,.14); }

        .chip { cursor:pointer; padding:9px 20px; border-radius:40px; font-size:13px; font-weight:600;
          border:2px solid transparent; transition:all .25s; backdrop-filter:blur(10px); box-shadow:0 2px 10px rgba(0,0,0,.05); }
        .chip:hover { transform:translateY(-3px); box-shadow:0 8px 22px rgba(37,99,235,.15); }

        .f-card { border-radius:22px; padding:32px 26px; transition:all .32s; cursor:pointer; position:relative;
          overflow:hidden; backdrop-filter:blur(14px); border:1.5px solid rgba(255,255,255,.85); }
        .f-card:hover { transform:translateY(-8px) scale(1.01); box-shadow:0 26px 52px rgba(37,99,235,.11); }
        .f-card::after { content:''; position:absolute; top:0; right:0; width:80px; height:80px;
          background:linear-gradient(225deg,rgba(37,99,235,.08),transparent); border-radius:0 22px 0 80px;
          transition:all .3s; }
        .f-card:hover::after { width:110px; height:110px; }

        .s-card { backdrop-filter:blur(18px); border-radius:22px; padding:30px 20px;
          border:1.5px solid rgba(255,255,255,.92); text-align:center; transition:all .3s;
          box-shadow:0 4px 20px rgba(37,99,235,.06); }
        .s-card:hover { transform:translateY(-6px); box-shadow:0 16px 36px rgba(37,99,235,.12); }

        .step { backdrop-filter:blur(16px); border-radius:20px; padding:26px 28px; width:44%;
          border:1.5px solid rgba(255,255,255,.9); transition:transform .3s; }
        .step:hover { transform:translateY(-5px); }

        .tag { display:inline-block; font-size:10px; font-weight:800; padding:5px 14px;
          border-radius:20px; letter-spacing:1px; text-transform:uppercase; margin-bottom:14px; }

        .pill { display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,.82);
          border:1.5px solid rgba(37,99,235,.14); border-radius:30px; padding:6px 14px;
          font-size:13px; font-weight:600; backdrop-filter:blur(8px); }
      `}</style>

      <BlueMesh />

      {/* ══ NAVBAR ══════════════════════════════════════════════════════ */}
      <nav style={{
        position:'fixed', top:14, left:'50%', transform:'translateX(-50%)', zIndex:300,
        background: scrolled ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.68)',
        backdropFilter:'blur(22px)', border:'1.5px solid rgba(255,255,255,.95)',
        borderRadius:50, padding:'8px 12px 8px 20px',
        display:'flex', alignItems:'center', gap:2, minWidth:720,
        boxShadow: scrolled ? '0 8px 40px rgba(37,99,235,.13)' : '0 4px 20px rgba(37,99,235,.07)',
        transition:'all .35s',
      }}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginRight:16,flexShrink:0}}>
          <div style={{width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#1d4ed8,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17}}>🎓</div>
              <span style={{fontSize:18,fontWeight:800,letterSpacing:'-0.5px',color:'#0f172a'}}>Margdarshak</span>
        </div>
        <div style={{display:'flex',flex:1,justifyContent:'center',gap:0}}>
          {['Company','Preparation','Alumni','Chatbot'].map((n,i)=>(
            <span key={i} onClick={()=>{setActiveNav(i);scrollTo(['company-sec','prep-sec','alumni-sec','chat-sec'][i]);}}
              style={{cursor:'pointer',padding:'8px 15px',borderRadius:30,fontSize:13.5,fontWeight:activeNav===i?700:500,
                color:activeNav===i?'#1d4ed8':'#475569',
                background:activeNav===i?'rgba(37,99,235,.09)':'transparent',transition:'all .2s'}}>{n}
            </span>
          ))}
        </div>
        <div style={{display:'flex',gap:8,marginLeft:8,flexShrink:0}}>
          <Link to="/login"    className="o-btn" style={{fontSize:13,padding:'8px 18px',textDecoration:'none',display:'inline-block'}}>Login</Link>
          <Link to="/register" className="g-btn" style={{fontSize:13,padding:'9px 20px',textDecoration:'none',display:'inline-block'}}>Join Free ✨</Link>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <section style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'120px 48px 80px',position:'relative'}}>

        {/* Float cards */}
        <FloatCard style={{top:158,right:'7%',animation:'floatA 5s ease-in-out infinite'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#1d4ed8,#60a5fa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17}}>🔔</div>
            <div>
              <div style={{fontSize:11,color:'#94a3b8',fontWeight:500}}>Drive Alert</div>
              <div style={{fontSize:13,fontWeight:700}}>Amazon visiting Mar 15 🚀</div>
              <div style={{fontSize:11,color:'#2563eb',fontWeight:600}}>Prep roadmap ready →</div>
            </div>
          </div>
        </FloatCard>

        <FloatCard style={{top:278,left:'5%',animation:'floatB 6.5s ease-in-out infinite 1s'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,#1d4ed8,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:19}}>👩‍💻</div>
            <div>
              <div style={{fontSize:13,fontWeight:800}}>Priya Sharma</div>
              <div style={{fontSize:11,color:'#64748b'}}>SDE @ Google • Mentor</div>
              <div style={{fontSize:10,color:'#f59e0b',marginTop:2}}>★★★★★ Available</div>
            </div>
          </div>
        </FloatCard>

        <FloatCard style={{bottom:228,right:'9%',animation:'floatC 7s ease-in-out infinite 2s'}}>
          <div style={{fontSize:11,color:'#94a3b8',marginBottom:5,fontWeight:500}}>💼 New Referral</div>
          <div style={{fontSize:13,fontWeight:800}}>SDE Intern @ Microsoft</div>
          <div style={{display:'flex',gap:8,marginTop:8,alignItems:'center'}}>
            <span style={{fontSize:12,background:'#dbeafe',color:'#1d4ed8',borderRadius:20,padding:'3px 10px',fontWeight:700}}>₹12 LPA</span>
            <span style={{fontSize:12,color:'#2563eb',fontWeight:700,cursor:'pointer'}}>Apply →</span>
          </div>
        </FloatCard>

        <FloatCard style={{bottom:300,left:'6%',animation:'floatA 4.5s ease-in-out infinite .5s'}}>
          <div style={{fontSize:11,color:'#94a3b8',marginBottom:7,fontWeight:500}}>📊 OA Pattern</div>
          <div style={{display:'flex',gap:5,flexWrap:'wrap',maxWidth:160}}>
            {['Arrays','Graphs','DP','Trees'].map(t=>(
              <span key={t} style={{fontSize:11,background:'rgba(37,99,235,.09)',color:'#1d4ed8',borderRadius:6,padding:'2px 8px',fontWeight:700}}>{t}</span>
            ))}
          </div>
        </FloatCard>

        {/* Hero content */}
        <div style={{textAlign:'center',maxWidth:860,position:'relative',zIndex:2,animation:'fadeUp .9s ease'}}>

          {/* Live badge + orbit */}
          <div style={{display:'inline-block',position:'relative',marginBottom:36}}>
            <OrbitRing size={130} />
            <div style={{display:'inline-flex',alignItems:'center',gap:8,position:'relative',zIndex:1,
              background:'rgba(255,255,255,.8)',backdropFilter:'blur(14px)',
              border:'1.5px solid rgba(37,99,235,.2)',borderRadius:40,padding:'8px 22px',
              boxShadow:'0 4px 16px rgba(37,99,235,.12)'}}>
              <span style={{position:'relative',display:'inline-block',width:10,height:10}}>
                <span style={{position:'absolute',inset:0,background:'#22c55e',borderRadius:'50%'}}/>
                <span style={{position:'absolute',inset:-4,border:'2px solid #22c55e',borderRadius:'50%',animation:'ringPulse 1.4s ease-out infinite'}}/>
              </span>
              <span style={{fontSize:13,fontWeight:700,color:'#1e40af'}}>Live — 180+ companies tracked</span>
            </div>
          </div>

          <h1 style={{fontSize:'clamp(50px,7.5vw,86px)',fontWeight:800,lineHeight:1.04,
            letterSpacing:'-2.5px',marginBottom:28,color:'#0f172a',fontFamily:'var(--font-body)'}}>
            Your Campus<br/>
            <span style={{fontFamily:'var(--font-display)',fontStyle:'italic'}}>
              <Typewriter words={['Placement Universe','Success Story','Dream Company','Career Launch']}/>
            </span>
          </h1>

          <p style={{fontSize:18,color:'#475569',lineHeight:1.8,maxWidth:540,margin:'0 auto 48px',fontWeight:400}}>
            Decode hiring patterns, connect with alumni mentors, land direct referrals — and ace your campus placement.
          </p>

          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',marginBottom:60}}>
            <Link to="/register"><button className="g-btn">Get Started Free 🚀</button></Link>
            <button className="o-btn" onClick={()=>scrollTo('company-sec')}>Explore Companies →</button>
          </div>

          {/* Social proof */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:14,marginBottom:52}}>
            <div style={{display:'flex'}}>
              {['#1d4ed8','#0891b2','#0369a1','#1e40af','#2563eb'].map((c,i)=>(
                <div key={i} style={{width:34,height:34,borderRadius:'50%',background:c,border:'2.5px solid white',marginLeft:i===0?0:-9,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>
                  {'😊🧑‍💻👩‍💻🧑👩'[i]}
                </div>
              ))}
            </div>
            <span style={{fontSize:13,color:'#64748b'}}><strong style={{color:'#0f172a'}}>2,400+</strong> students placed this year</span>
          </div>

          {/* Company pills */}
          <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
            {COMPANIES.map((c,i)=>(
              <div key={i} onClick={()=>{setCo(i);scrollTo('company-sec');}}
                style={{display:'flex',alignItems:'center',gap:7,background:'rgba(255,255,255,.72)',backdropFilter:'blur(10px)',
                  border:'1.5px solid rgba(37,99,235,.14)',borderRadius:40,padding:'8px 18px',cursor:'pointer',
                  fontSize:13,fontWeight:700,color:'#1d4ed8',transition:'all .2s',boxShadow:'0 2px 10px rgba(37,99,235,.08)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.background='rgba(255,255,255,.95)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.background='rgba(255,255,255,.72)';}}
              ><span style={{fontSize:15}}>{c.e}</span>{c.name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ═══════════════════════════════════════════════════════ */}
      <section style={{padding:'60px 48px',position:'relative',zIndex:1}}>
        <div style={{maxWidth:1040,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20}}>
          {[
            {v:'2400',s:'+',l:'Alumni Connected',i:'🎓',c:'#2563eb'},
            {v:'180', s:'+',l:'Companies Listed', i:'🏢',c:'#0891b2'},
            {v:'650', s:'+',l:'Students Placed',  i:'🎯',c:'#0369a1'},
            {v:'94',  s:'%',l:'Satisfaction Rate',i:'⭐',c:'#1e40af'},
          ].map((s,i)=>(
            <div key={i} className="s-card" style={{background:'rgba(255,255,255,.78)'}}>
              <div style={{fontSize:30,marginBottom:10}}>{s.i}</div>
              <div style={{fontSize:48,fontWeight:800,color:s.c,lineHeight:1,letterSpacing:'-1px'}}>
                <Counter target={s.v}/>{s.s}
              </div>
              <div style={{fontSize:13,color:'#64748b',marginTop:8,fontWeight:500}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ COMPANY PATTERNS ════════════════════════════════════════════ */}
      <section id="company-sec" style={{padding:'80px 48px',position:'relative',zIndex:1}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:52}}>
            <span className="tag" style={{background:'rgba(37,99,235,.1)',color:'#2563eb'}}>⭐ Core Feature</span>
            <h2 style={{fontSize:'clamp(30px,5vw,52px)',fontWeight:800,letterSpacing:'-1.2px',marginBottom:12}}>Company Hiring Patterns</h2>
            <p style={{color:'#64748b',fontSize:16,maxWidth:440,margin:'0 auto'}}>OA topics, tech rounds, eligibility & CTC — everything decoded for every company.</p>
          </div>

          {/* Company tabs */}
          <div style={{display:'flex',gap:12,justifyContent:'center',marginBottom:44,flexWrap:'wrap'}}>
            {COMPANIES.map((c,i)=>(
              <div key={i} className="chip" onClick={()=>setCo(i)} style={{
                borderColor:co===i?c.c:'transparent',
                background:co===i?c.bg:'rgba(255,255,255,.7)',
                color:co===i?c.c:'#4b5563',
                boxShadow:co===i?`0 4px 18px rgba(37,99,235,.2)`:undefined,
              }}>{c.e} {c.name}</div>
            ))}
          </div>

          {/* Detail card */}
          <div key={co} style={{
            background:`linear-gradient(145deg,rgba(255,255,255,.90),${C.bg})`,
            backdropFilter:'blur(22px)', border:`2px solid rgba(37,99,235,.1)`,
            borderRadius:28, padding:'40px 36px',
            boxShadow:'0 20px 60px rgba(37,99,235,.09)',
            animation:'popIn .35s ease',
          }}>
            {/* Header */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:32,flexWrap:'wrap',gap:14}}>
              <div style={{display:'flex',alignItems:'center',gap:16}}>
                <div style={{width:62,height:62,borderRadius:18,background:'rgba(37,99,235,.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,boxShadow:'0 4px 16px rgba(37,99,235,.14)'}}>{C.e}</div>
                <div>
                  <h3 style={{fontSize:26,fontWeight:800,letterSpacing:'-0.5px'}}>{C.name}</h3>
                  <p style={{fontSize:13,color:'#64748b',marginTop:2}}>{C.rounds} interview rounds typical</p>
                </div>
              </div>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                {[['📊',`CGPA ${C.cgpa}`,'#2563eb'],['💰',C.ctc,'#059669'],['🚫','No backlogs','#dc2626']].map(([ic,tx,cl],j)=>(
                  <span key={j} className="pill" style={{color:cl,borderColor:`${cl}18`}}>{ic} {tx}</span>
                ))}
              </div>
            </div>

            {/* Columns */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
              {[
                {label:'🧠 OA Round',   items:C.oa,   note:'2 Coding + 1 Debug',    c:'#2563eb', cta:null},
                {label:'💻 Tech Round', items:C.tech, note:'Project discussion likely',c:'#0891b2', cta:null},
                {label:'📋 Eligibility',items:['No active backlogs',`CGPA ${C.cgpa}`,'Strong DSA skills','REST API basics'],note:null,c:'#059669',cta:'View Prep Roadmap →'},
              ].map((col,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,.82)',backdropFilter:'blur(12px)',borderRadius:20,padding:24,border:`1px solid ${col.c}14`}}>
                  <div style={{fontSize:11,fontWeight:800,color:col.c,textTransform:'uppercase',letterSpacing:1,marginBottom:16}}>{col.label}</div>
                  <div style={{display:'flex',flexDirection:'column',gap:10}}>
                    {col.items.map((it,j)=>(
                      <div key={j} style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{width:7,height:7,borderRadius:'50%',background:col.c,flexShrink:0}}/>
                        <span style={{fontSize:14,color:'#374151',fontWeight:500}}>{it}</span>
                      </div>
                    ))}
                  </div>
                  {col.note && <div style={{marginTop:14,background:`${col.c}0d`,borderRadius:10,padding:'7px 12px',fontSize:12,color:col.c,fontWeight:700}}>{col.note}</div>}
                  {col.cta  && (
                    <Link to="/login">
                      <button style={{marginTop:16,width:'100%',padding:10,borderRadius:12,cursor:'pointer',
                        background:`linear-gradient(135deg,${col.c},${col.c}bb)`,color:'white',border:'none',
                        fontFamily:'var(--font-body)',fontWeight:700,fontSize:13}}>
                        {col.cta}
                      </button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════════════ */}
      <section id="prep-sec" style={{padding:'80px 48px',position:'relative',zIndex:1}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:52}}>
            <span className="tag" style={{background:'rgba(8,145,178,.1)',color:'#0891b2'}}>🚀 Platform</span>
            <h2 style={{fontSize:'clamp(30px,5vw,52px)',fontWeight:800,letterSpacing:'-1.2px',marginBottom:12}}>Four Modules. One Mission.</h2>
            <p style={{color:'#64748b',fontSize:16}}>Everything you need to place successfully.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:24}}>
            {FEATURES.map((f,i)=>(
              <div key={i} className="f-card" style={{
                background:`linear-gradient(145deg,rgba(255,255,255,.74) 0%,${f.c}0a 100%)`,
                borderColor:`${f.c}15`,
              }}>
                <div style={{width:58,height:58,borderRadius:18,background:`${f.c}13`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,marginBottom:20,boxShadow:`0 4px 14px ${f.c}14`}}>{f.icon}</div>
                <h3 style={{fontSize:21,fontWeight:800,marginBottom:10,letterSpacing:'-0.3px'}}>{f.title}</h3>
                <p style={{fontSize:15,color:'#64748b',lineHeight:1.75,marginBottom:20}}>{f.desc}</p>
                <div style={{display:'inline-flex',alignItems:'center',gap:6,color:f.c,fontWeight:700,fontSize:14,cursor:'pointer'}}>Explore →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ JOURNEY STEPS ═══════════════════════════════════════════════ */}
      <section id="alumni-sec" style={{padding:'80px 48px',position:'relative',zIndex:1}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:64}}>
            <span className="tag" style={{background:'rgba(3,105,161,.1)',color:'#0369a1'}}>📍 Journey</span>
            <h2 style={{fontSize:'clamp(30px,5vw,52px)',fontWeight:800,letterSpacing:'-1.2px'}}>Student → Placed</h2>
          </div>
          <div style={{position:'relative'}}>
            {/* Vertical line */}
            <div style={{position:'absolute',left:'50%',top:44,bottom:44,width:2,transform:'translateX(-50%)',
              background:'linear-gradient(to bottom,#1d4ed8,#0891b2,#0369a1,#60a5fa)',borderRadius:2}}/>
            {[
              {n:'01',icon:'🏢',title:'Discover Companies',  desc:'Browse 180+ companies with decoded hiring patterns, CTC ranges, and eligibility criteria.',c:'#1d4ed8',side:'left'},
              {n:'02',icon:'🔔',title:'Get Instant Alerts',  desc:'Auto-notified when a drive is announced — with a personalised prep roadmap generated instantly.',c:'#0891b2',side:'right'},
              {n:'03',icon:'🤝',title:'Connect with Alumni', desc:'Find alumni from target companies. Book sessions, get referrals, and chat live via WebSocket.',c:'#0369a1',side:'left'},
              {n:'04',icon:'🎯',title:'Ace & Get Placed',    desc:'Walk in prepared with OA patterns, insider tips, and real HR questions from placed alumni.',c:'#2563eb',side:'right'},
            ].map((s,i)=>(
              <div key={i} style={{display:'flex',justifyContent:s.side==='left'?'flex-start':'flex-end',marginBottom:i<3?42:0,position:'relative'}}>
                <div style={{position:'absolute',left:'50%',top:32,transform:'translateX(-50%)',
                  width:16,height:16,borderRadius:'50%',background:s.c,border:'3px solid white',
                  boxShadow:`0 0 0 4px ${s.c}25`,zIndex:2}}/>
                <div className="step" style={{background:'rgba(255,255,255,.80)',boxShadow:`0 8px 24px ${s.c}0f`}}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
                >
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
                    <span style={{fontSize:26}}>{s.icon}</span>
                    <div>
                      <div style={{fontSize:10,fontWeight:800,color:s.c,letterSpacing:1,textTransform:'uppercase'}}>Step {s.n}</div>
                      <div style={{fontSize:19,fontWeight:800,letterSpacing:'-0.3px'}}>{s.title}</div>
                    </div>
                  </div>
                  <p style={{fontSize:14,color:'#64748b',lineHeight:1.7}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════════════ */}
      <section id="chat-sec" style={{padding:'60px 48px 100px',position:'relative',zIndex:1}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{
            background:'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#0f172a 100%)',
            borderRadius:36, padding:'84px 60px', textAlign:'center',
            position:'relative', overflow:'hidden',
            boxShadow:'0 40px 80px rgba(29,78,216,.25)',
          }}>
            {/* Glow orbs */}
            <div style={{position:'absolute',width:500,height:500,background:'radial-gradient(circle,rgba(37,99,235,.3),transparent)',top:-150,left:-80,borderRadius:'50%',pointerEvents:'none'}}/>
            <div style={{position:'absolute',width:350,height:350,background:'radial-gradient(circle,rgba(96,165,250,.18),transparent)',bottom:-100,right:-40,borderRadius:'50%',pointerEvents:'none'}}/>
            {/* Grid lines */}
            {Array.from({length:9}).map((_,i)=>(
              <div key={i} style={{position:'absolute',left:`${i*12.5}%`,top:0,bottom:0,width:1,background:'rgba(255,255,255,.04)',pointerEvents:'none'}}/>
            ))}
            {/* Stars */}
            {Array.from({length:30}).map((_,i)=>(
              <div key={i} style={{position:'absolute',width:i%4===0?3:2,height:i%4===0?3:2,background:'white',borderRadius:'50%',
                opacity:.1+Math.random()*.5,top:`${Math.random()*100}%`,left:`${Math.random()*100}%`,
                animation:`twinkle ${2+Math.random()*3}s ease-in-out infinite ${Math.random()*2}s`}}/>
            ))}
            <div style={{position:'relative',zIndex:1}}>
              <div style={{fontSize:54,marginBottom:22}}>🚀</div>
              <h2 style={{fontSize:'clamp(30px,5vw,58px)',fontWeight:800,color:'white',letterSpacing:'-1.5px',marginBottom:16,lineHeight:1.1}}>
                Ready to Land Your<br/>
                <span style={{background:'linear-gradient(135deg,#93c5fd,#dbeafe,#60a5fa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                  Dream Job?
                </span>
              </h2>
              <p style={{fontSize:17,color:'rgba(255,255,255,.6)',marginBottom:46,maxWidth:460,margin:'0 auto 46px',lineHeight:1.8}}>
                Join 2,400+ students using Margdarshak to prepare smarter, connect better, and place faster.
              </p>
              <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
                <Link to="/register"><button className="g-btn" style={{fontSize:16,padding:'16px 42px'}}>Join as Student 🎓</button></Link>
                <Link to="/register?role=alumni">
                  <button style={{cursor:'pointer',border:'2px solid rgba(255,255,255,.25)',fontFamily:'var(--font-body)',fontWeight:600,fontSize:15,padding:'14px 36px',borderRadius:50,
                    background:'rgba(255,255,255,.09)',color:'white',backdropFilter:'blur(10px)',transition:'all .2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.18)';e.currentTarget.style.transform='translateY(-2px)';}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.09)';e.currentTarget.style.transform='translateY(0)';}}>
                    Register as Alumni
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer style={{borderTop:'1px solid rgba(37,99,235,.1)',padding:'30px 48px',background:'rgba(255,255,255,.62)',backdropFilter:'blur(20px)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:28,height:28,background:'linear-gradient(135deg,#1d4ed8,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>🎓</div>
            <span style={{fontWeight:800,fontSize:16}}>Campus<span style={{color:'#2563eb'}}>Connect</span></span>
          </div>
          <div style={{display:'flex',gap:24}}>
            {['Company','Preparation','Alumni','Chatbot'].map((n,i)=>(
              <span key={i} onClick={()=>scrollTo(['company-sec','prep-sec','alumni-sec','chat-sec'][i])}
                style={{fontSize:13,color:'#94a3b8',cursor:'pointer',fontWeight:500}}>{n}</span>
            ))}
          </div>
              <div style={{fontSize:12,color:'#cbd5e1'}}>© 2025 Margdarshak. Made with ❤️</div>
        </div>
      </footer>
    </div>
  );
}
