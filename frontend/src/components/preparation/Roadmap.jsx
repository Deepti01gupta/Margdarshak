// Roadmap component
const STEPS = [
  { n:'01', title:'Master DSA Fundamentals', topics:['Arrays & Strings','Linked Lists','Stacks & Queues','Hash Maps'], weeks:'Weeks 1–4', c:'#2563eb' },
  { n:'02', title:'Advanced Data Structures', topics:['Trees & BST','Graphs & BFS/DFS','Heaps','Tries'], weeks:'Weeks 5–8', c:'#0891b2' },
  { n:'03', title:'Algorithm Paradigms',      topics:['DP Patterns','Greedy','Backtracking','Divide & Conquer'], weeks:'Weeks 9–12', c:'#0369a1' },
  { n:'04', title:'System Design & Projects', topics:['LLD/HLD','REST APIs','OOPS Design','Database Queries'], weeks:'Weeks 13–16', c:'#1e40af' },
];

export default function Roadmap() {
  return (
    <div>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display:'flex', gap:20, marginBottom:20 }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}>
            <div style={{ width:44, height:44, borderRadius:'50%', background:`${s.c}15`, border:`2px solid ${s.c}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:s.c, flexShrink:0 }}>{s.n}</div>
            {i<STEPS.length-1 && <div style={{ width:2, flex:1, background:`${s.c}30`, minHeight:24 }}/>}
          </div>
          <div style={{ background:'rgba(255,255,255,.82)', backdropFilter:'blur(14px)', borderRadius:18, padding:'20px 24px', border:`1.5px solid ${s.c}15`, flex:1, boxShadow:`0 4px 16px ${s.c}08`, marginBottom:i<STEPS.length-1?0:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12, flexWrap:'wrap', gap:8 }}>
              <h3 style={{ fontSize:17, fontWeight:800, color:'#0f172a' }}>{s.title}</h3>
              <span style={{ fontSize:11, background:`${s.c}10`, color:s.c, borderRadius:20, padding:'3px 12px', fontWeight:700 }}>{s.weeks}</span>
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {s.topics.map(t=>(
                <span key={t} style={{ fontSize:12, background:'rgba(37,99,235,.07)', color:'#2563eb', borderRadius:8, padding:'4px 10px', fontWeight:600 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
