// Dashboard page
import { Link } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font-body)' }}>
      <Sidebar />
      <main style={{ flex:1, marginLeft:248, padding:'88px 40px 40px' }}>
        <div style={{ marginBottom:34 }}>
          <h1 style={{ fontSize:30, fontWeight:800, letterSpacing:'-0.5px' }}>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
          <p style={{ color:'var(--muted)', marginTop:6 }}>Your placement dashboard at a glance.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:28 }}>
          {[
            { icon:'🏢', label:'Companies', value:'180+', path:'/company',     c:'#2563eb' },
            { icon:'🤝', label:'Alumni',    value:'2400+',path:'/alumni',      c:'#0891b2' },
            { icon:'💼', label:'Open Jobs', value:'48',   path:'/alumni',      c:'#0369a1' },
          ].map((c,i)=>(
            <Link key={i} to={c.path} style={{ textDecoration:'none' }}>
              <div style={{ background:'rgba(255,255,255,.85)', backdropFilter:'blur(16px)', borderRadius:20, padding:'28px 24px', border:'1.5px solid rgba(37,99,235,.1)', boxShadow:'0 4px 20px rgba(37,99,235,.06)', transition:'transform .2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{ fontSize:32, marginBottom:10 }}>{c.icon}</div>
                <div style={{ fontSize:36, fontWeight:800, color:c.c, letterSpacing:'-1px' }}>{c.value}</div>
                <div style={{ fontSize:13, color:'var(--muted)', marginTop:4, fontWeight:500 }}>{c.label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ background:'rgba(255,255,255,.85)', backdropFilter:'blur(16px)', borderRadius:20, padding:'28px 32px', border:'1.5px solid rgba(37,99,235,.1)', boxShadow:'0 4px 20px rgba(37,99,235,.06)' }}>
          <h2 style={{ fontSize:17, fontWeight:800, marginBottom:20 }}>🔔 Upcoming Drives</h2>
          {[
            { company:'Amazon',    date:'Mar 15, 2025', role:'SDE Intern', ctc:'18 LPA', status:'Open' },
            { company:'Google',    date:'Mar 22, 2025', role:'SWE',        ctc:'25 LPA', status:'Soon' },
            { company:'Microsoft', date:'Apr 2, 2025',  role:'SDE-1',      ctc:'22 LPA', status:'Open' },
          ].map((d,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0', borderBottom:i<2?'1px solid #f1f5f9':'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:40, height:40, background:'rgba(37,99,235,.08)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🏢</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700 }}>{d.company} — {d.role}</div>
                  <div style={{ fontSize:12, color:'var(--muted)' }}>{d.date}</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <span style={{ fontSize:13, fontWeight:700, color:'#059669', background:'#dcfce7', borderRadius:20, padding:'3px 12px' }}>{d.ctc}</span>
                <span style={{ fontSize:11, fontWeight:700, background:d.status==='Open'?'rgba(37,99,235,.1)':'rgba(245,158,11,.1)', color:d.status==='Open'?'#2563eb':'#d97706', borderRadius:20, padding:'3px 10px' }}>{d.status}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
