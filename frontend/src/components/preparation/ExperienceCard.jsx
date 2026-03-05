// Experience Card component
export default function ExperienceCard({ exp }) {
  const { name, company, role, rounds, tips } = exp || {};
  return (
    <div style={{ background:'rgba(255,255,255,.82)', backdropFilter:'blur(14px)', borderRadius:18, padding:'22px 24px', border:'1.5px solid rgba(37,99,235,.1)', boxShadow:'0 4px 18px rgba(37,99,235,.07)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
        <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>👩‍💻</div>
        <div>
          <div style={{ fontWeight:800, fontSize:14, color:'#0f172a' }}>{name}</div>
          <div style={{ fontSize:12, color:'#3b82f6' }}>{role} @ {company}</div>
        </div>
      </div>
      <div style={{ fontSize:12, color:'#64748b', marginBottom:12 }}>{rounds} rounds</div>
      <p style={{ fontSize:14, color:'#374151', lineHeight:1.7 }}>{tips}</p>
    </div>
  );
}
