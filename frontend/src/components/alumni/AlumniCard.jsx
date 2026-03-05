// Alumni Card component
import { useState } from 'react';
import MentorshipForm from './MentorshipForm';

export default function AlumniCard({ alumni }) {
  const [showForm, setShowForm] = useState(false);
  const { name, company, role, batch, skills=[] } = alumni;
  return (
    <>
      <div style={{ background:'rgba(255,255,255,.82)', backdropFilter:'blur(14px)', borderRadius:20, padding:'22px 20px', border:'1.5px solid rgba(37,99,235,.1)', boxShadow:'0 4px 20px rgba(37,99,235,.07)', transition:'all .25s' }}
        onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
        onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
          <div style={{ width:46, height:46, borderRadius:'50%', background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>👩‍💻</div>
          <div>
            <div style={{ fontWeight:800, fontSize:15, color:'#0f172a' }}>{name}</div>
            <div style={{ fontSize:12, color:'#3b82f6', fontWeight:600 }}>{role} @ {company}</div>
            <div style={{ fontSize:11, color:'#94a3b8' }}>Batch {batch}</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
          {skills.map(s=>(
            <span key={s} style={{ fontSize:11, background:'rgba(37,99,235,.08)', color:'#2563eb', borderRadius:6, padding:'2px 8px', fontWeight:700 }}>{s}</span>
          ))}
        </div>
        <button onClick={()=>setShowForm(true)} style={{ width:'100%', padding:'10px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', color:'white', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'var(--font-body)' }}>
          Request Mentorship 🤝
        </button>
      </div>
      {showForm && <MentorshipForm alumni={alumni} onClose={()=>setShowForm(false)}/>}
    </>
  );
}
