// Alumni Profile component
export default function AlumniProfile({ alumni }) {
  if (!alumni) return null;
  return (
    <div style={{ background:'rgba(255,255,255,.85)', backdropFilter:'blur(16px)', borderRadius:22, padding:'32px 28px', border:'1.5px solid rgba(37,99,235,.1)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:24 }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>👩‍💻</div>
        <div>
          <h2 style={{ fontSize:22, fontWeight:800, color:'#0f172a' }}>{alumni.name}</h2>
          <p style={{ color:'#3b82f6', fontWeight:600, fontSize:15 }}>{alumni.role} @ {alumni.company}</p>
          <p style={{ color:'#94a3b8', fontSize:13 }}>Batch {alumni.batch}</p>
        </div>
      </div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {alumni.skills?.map(s=>(
          <span key={s} style={{ fontSize:12, background:'rgba(37,99,235,.08)', color:'#2563eb', borderRadius:8, padding:'4px 12px', fontWeight:700 }}>{s}</span>
        ))}
      </div>
    </div>
  );
}
