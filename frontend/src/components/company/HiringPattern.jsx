// Hiring Pattern component
import { useState } from 'react';

const DATA = [
  { name:'Amazon',    e:'🛒', oa:['Arrays','Graphs','DP'],          tech:['OOPS','System Design','SQL'],     cgpa:'7.5+', ctc:'18–28 LPA', c:'#2563eb' },
  { name:'Google',    e:'🔍', oa:['Trees','Strings','Greedy'],       tech:['Algorithms','OS','Distributed'],  cgpa:'8.0+', ctc:'25–45 LPA', c:'#1d4ed8' },
  { name:'Microsoft', e:'🪟', oa:['LinkedList','BFS/DFS','DP'],      tech:['OOD','REST APIs','Azure'],        cgpa:'7.0+', ctc:'20–35 LPA', c:'#0369a1' },
  { name:'Flipkart',  e:'🛍', oa:['Hashing','Sorting','Arrays'],     tech:['DSA','Java','System Design'],     cgpa:'7.0+', ctc:'15–22 LPA', c:'#0891b2' },
];

export default function HiringPattern() {
  const [sel, setSel] = useState(0);
  const C = DATA[sel];
  return (
    <div>
      <div style={{ display:'flex', gap:10, marginBottom:28, flexWrap:'wrap' }}>
        {DATA.map((d,i)=>(
          <div key={i} onClick={()=>setSel(i)} style={{ cursor:'pointer', padding:'9px 20px', borderRadius:40, fontSize:13, fontWeight:700,
            background:sel===i?'#eff6ff':'rgba(255,255,255,.75)', border:`2px solid ${sel===i?d.c:'transparent'}`,
            color:sel===i?d.c:'#475569', transition:'all .2s', boxShadow:sel===i?`0 4px 16px ${d.c}25`:undefined }}>
            {d.e} {d.name}
          </div>
        ))}
      </div>
      <div style={{ background:`linear-gradient(145deg,rgba(255,255,255,.9),#eff6ff)`, backdropFilter:'blur(16px)', borderRadius:22, padding:'32px 28px', border:'2px solid rgba(37,99,235,.1)', boxShadow:'0 16px 48px rgba(37,99,235,.08)' }}>
        <h3 style={{ fontSize:22, fontWeight:800, marginBottom:24 }}>{C.e} {C.name}</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
          {[
            { label:'🧠 OA Round',   items:C.oa,   c:'#2563eb' },
            { label:'💻 Tech Round', items:C.tech, c:'#0891b2' },
            { label:'📋 Criteria',   items:[`CGPA ${C.cgpa}`,'No backlogs',`CTC: ${C.ctc}`], c:'#059669' },
          ].map((col,i)=>(
            <div key={i} style={{ background:'rgba(255,255,255,.8)', borderRadius:16, padding:20, border:`1px solid ${col.c}15` }}>
              <div style={{ fontSize:11, fontWeight:800, color:col.c, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>{col.label}</div>
              {col.items.map((it,j)=>(
                <div key={j} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:9 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:col.c, flexShrink:0 }}/>
                  <span style={{ fontSize:14, color:'#374151', fontWeight:500 }}>{it}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
