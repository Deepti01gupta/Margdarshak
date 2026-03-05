import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NAV_ITEMS } from '../../utils/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 300,
      display: 'flex', alignItems: 'center', gap: 2, minWidth: 720,
      background: scrolled ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.68)',
      backdropFilter: 'blur(22px)', border: '1.5px solid rgba(255,255,255,0.95)',
      borderRadius: 50, padding: '7px 10px 7px 20px',
      boxShadow: scrolled ? '0 8px 40px rgba(37,99,235,0.13)' : '0 4px 20px rgba(37,99,235,0.07)',
      transition: 'all 0.35s',
    }}>
      <Link to="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none', marginRight:16, flexShrink:0 }}>
        <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:17 }}>🎓</div>
        <span style={{ fontSize:18, fontWeight:800, color:'#0f172a', letterSpacing:'-0.5px' }}>Campus<span style={{ color:'#2563eb' }}>Connect</span></span>
      </Link>

      <div style={{ display:'flex', flex:1, justifyContent:'center', gap:0 }}>
        {NAV_ITEMS.map(item => {
          const active = location.pathname.startsWith(item.path);
          return (
            <Link key={item.path} to={isAuthenticated ? item.path : '/login'}
              style={{ textDecoration:'none', padding:'8px 15px', borderRadius:30, fontSize:13.5, fontWeight: active ? 700 : 500,
                color: active ? '#1d4ed8' : '#475569',
                background: active ? 'rgba(37,99,235,0.09)' : 'transparent', transition:'all 0.2s' }}>
              {item.icon} {item.label}
            </Link>
          );
        })}
      </div>

      <div style={{ display:'flex', gap:8, marginLeft:8, flexShrink:0 }}>
        {isAuthenticated ? (
          <>
            <span style={{ padding:'7px 14px', fontSize:13, fontWeight:600, color:'#1d4ed8', background:'rgba(37,99,235,0.07)', borderRadius:30 }}>
              👤 {user?.name?.split(' ')[0]}
            </span>
            <button onClick={async () => { await logout(); navigate('/'); }}
              style={{ cursor:'pointer', border:'none', padding:'7px 16px', borderRadius:30, background:'#fee2e2', color:'#dc2626', fontWeight:700, fontSize:13, fontFamily:'inherit' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    style={{ textDecoration:'none', padding:'8px 18px', borderRadius:30, border:'1.5px solid rgba(37,99,235,0.2)', color:'#2563eb', fontWeight:600, fontSize:13, background:'rgba(255,255,255,0.7)' }}>Login</Link>
            <Link to="/register" style={{ textDecoration:'none', padding:'9px 20px', borderRadius:30, background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', color:'white', fontWeight:700, fontSize:13, boxShadow:'0 4px 14px rgba(37,99,235,0.35)' }}>Join Free ✨</Link>
          </>
        )}
      </div>
    </nav>
  );
}
