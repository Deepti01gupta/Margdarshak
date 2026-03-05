// Company Card component
import { Link } from 'react-router-dom';

export default function CompanyCard({ company }) {
  const { id, name, emoji='🏢', cgpa, ctc, color='#2563eb' } = company;
  return (
    <Link to={`/company/${id}`} style={{ textDecoration:'none' }}>
      <div style={{ background:'rgba(255,255,255,.82)', backdropFilter:'blur(14px)', borderRadius:18, padding:'22px 20px',
        border:`1.5px solid ${color}15`, boxShadow:`0 4px 18px ${color}0a`, transition:'all .25s', cursor:'pointer' }}
        onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 28px ${color}18`; }}
        onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=`0 4px 18px ${color}0a`; }}>
        <div style={{ fontSize:36, marginBottom:12 }}>{emoji}</div>
        <h3 style={{ fontSize:17, fontWeight:800, color:'#0f172a', marginBottom:10 }}>{name}</h3>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <span style={{ fontSize:12, background:`${color}10`, color, borderRadius:20, padding:'3px 10px', fontWeight:700 }}>CGPA {cgpa}</span>
          <span style={{ fontSize:12, background:'rgba(5,150,105,.1)', color:'#059669', borderRadius:20, padding:'3px 10px', fontWeight:700 }}>{ctc}</span>
        </div>
      </div>
    </Link>
  );
}
