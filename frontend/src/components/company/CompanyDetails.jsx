// Company Details component
export default function CompanyDetails({ company }) {
  if (!company) return null;
  return (
    <div style={{ background:'rgba(255,255,255,.85)', backdropFilter:'blur(16px)', borderRadius:20, padding:28, border:'1.5px solid rgba(37,99,235,.1)' }}>
      <h2 style={{ fontSize:22, fontWeight:800, marginBottom:8 }}>{company.name}</h2>
      <p style={{ color:'#64748b', fontSize:14, lineHeight:1.7 }}>{company.description}</p>
      <div style={{ display:'flex', gap:12, marginTop:16, flexWrap:'wrap' }}>
        <span style={{ fontSize:13, background:'rgba(37,99,235,.08)', color:'#2563eb', borderRadius:20, padding:'4px 14px', fontWeight:700 }}>CGPA: {company.cgpa}</span>
        <span style={{ fontSize:13, background:'rgba(5,150,105,.08)', color:'#059669', borderRadius:20, padding:'4px 14px', fontWeight:700 }}>{company.ctc}</span>
        <span style={{ fontSize:13, background:'rgba(239,68,68,.08)', color:'#dc2626', borderRadius:20, padding:'4px 14px', fontWeight:700 }}>No Backlogs</span>
      </div>
    </div>
  );
}
