// Sidebar component
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NAV_ITEMS } from '../../utils/constants';

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: 248, minHeight: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(22px)',
      borderRight: '1.5px solid rgba(37,99,235,0.1)',
      padding: '88px 14px 24px', display: 'flex', flexDirection: 'column', gap: 4,
      boxShadow: '4px 0 24px rgba(37,99,235,0.06)',
    }}>
      {/* User card */}
      <div style={{ padding:'14px 16px', marginBottom:16, background:'linear-gradient(135deg,rgba(37,99,235,0.07),rgba(59,130,246,0.04))', borderRadius:16, border:'1px solid rgba(37,99,235,0.1)' }}>
        <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:8 }}>👤</div>
        <div style={{ fontWeight:800, fontSize:14, color:'#0f172a' }}>{user?.name}</div>
        <div style={{ fontSize:11, color:'#3b82f6', fontWeight:600, background:'rgba(37,99,235,0.08)', borderRadius:20, padding:'2px 10px', display:'inline-block', marginTop:4 }}>{user?.role}</div>
      </div>

      {NAV_ITEMS.map(item => {
        const active = location.pathname.startsWith(item.path);
        return (
          <Link key={item.path} to={item.path} style={{
            display:'flex', alignItems:'center', gap:10, padding:'11px 14px', borderRadius:12,
            textDecoration:'none', fontSize:13.5, fontWeight: active ? 700 : 500,
            color: active ? '#1d4ed8' : '#4b5563',
            background: active ? 'linear-gradient(135deg,rgba(37,99,235,0.1),rgba(59,130,246,0.05))' : 'transparent',
            border: active ? '1.5px solid rgba(37,99,235,0.14)' : '1.5px solid transparent',
            transition:'all 0.2s',
          }}>
            <span style={{ fontSize:17 }}>{item.icon}</span>
            {item.label}
            {active && <div style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:'#2563eb' }} />}
          </Link>
        );
      })}

      <div style={{ marginTop:'auto' }}>
        <Link to="/dashboard" style={{ display:'block', padding:'10px 14px', borderRadius:12, textDecoration:'none', fontSize:13, fontWeight:600, color:'#0f172a', background:'rgba(37,99,235,0.05)', border:'1px dashed rgba(37,99,235,0.2)', marginBottom:8 }}>
          📊 Dashboard
        </Link>
        <button onClick={async () => { await logout(); navigate('/'); }}
          style={{ width:'100%', padding:'10px 14px', borderRadius:12, border:'none', background:'#fef2f2', color:'#dc2626', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
