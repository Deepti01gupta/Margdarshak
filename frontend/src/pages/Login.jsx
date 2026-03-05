// Login page
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState('');
  const { login } = useAuth();
  const navigate  = useNavigate();
  const from = useLocation().state?.from?.pathname || '/dashboard';

  const handleSubmit = async e => {
    e.preventDefault(); setErr(''); setLoading(true);
    try { await login(email, password); navigate(from, { replace: true }); }
    catch (ex) { setErr(ex.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
      background:'linear-gradient(145deg,#eef3ff,#dbeafe,#f0f9ff)',
      fontFamily:'var(--font-body)',position:'relative',overflow:'hidden',padding:'24px'}}>
      <style>{`
        @keyframes gradPan{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blobM{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
        .inp{width:100%;padding:13px 16px;border-radius:12px;border:1.5px solid #e2e8f0;font-family:var(--font-body);font-size:14px;background:rgba(255,255,255,.88);transition:all .2s;outline:none;color:#0f172a}
        .inp:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.1);background:white}
        .sbtn{width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,#1d4ed8,#3b82f6,#60a5fa);background-size:200% 200%;animation:gradPan 3s ease infinite;color:white;font-family:var(--font-body);font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 6px 22px rgba(37,99,235,.35);transition:transform .2s}
        .sbtn:hover:not(:disabled){transform:translateY(-2px)}
        .sbtn:disabled{opacity:.7;cursor:not-allowed}
      `}</style>
      {/* Blobs */}
      <div style={{position:'absolute',width:500,height:500,background:'radial-gradient(circle,rgba(37,99,235,.14),transparent)',top:-150,left:-100,borderRadius:'50%',animation:'blobM 10s ease-in-out infinite',filter:'blur(30px)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',width:400,height:400,background:'radial-gradient(circle,rgba(8,145,178,.11),transparent)',bottom:-80,right:-60,borderRadius:'50%',animation:'blobM 12s ease-in-out infinite 3s',filter:'blur(30px)',pointerEvents:'none'}}/>

      <div style={{width:'100%',maxWidth:440,position:'relative',zIndex:1,animation:'fadeUp .7s ease'}}>
        <div style={{background:'rgba(255,255,255,.84)',backdropFilter:'blur(24px)',borderRadius:28,padding:'48px 40px',border:'1.5px solid rgba(255,255,255,.96)',boxShadow:'0 20px 60px rgba(37,99,235,.1)'}}>
          <div style={{textAlign:'center',marginBottom:36}}>
            <Link to="/" style={{display:'inline-flex',alignItems:'center',gap:8,textDecoration:'none',marginBottom:24}}>
              <div style={{width:40,height:40,background:'linear-gradient(135deg,#1d4ed8,#3b82f6)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>🎓</div>
              <span style={{fontSize:20,fontWeight:800,color:'#0f172a'}}>Campus<span style={{color:'#2563eb'}}>Connect</span></span>
            </Link>
            <h1 style={{fontSize:26,fontWeight:800,color:'#0f172a',letterSpacing:'-0.5px',marginBottom:8}}>Welcome back 👋</h1>
            <p style={{fontSize:14,color:'#64748b'}}>Sign in with your college email</p>
          </div>

          {err && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:'12px 16px',marginBottom:20,fontSize:13,color:'#dc2626',fontWeight:500}}>⚠️ {err}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:18}}>
              <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:7}}>Email Address</label>
              <input className="inp" type="email" placeholder="yourname@college.edu" value={email} onChange={e=>setEmail(e.target.value)} required/>
            </div>
            <div style={{marginBottom:26}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:7}}>
                <label style={{fontSize:13,fontWeight:600,color:'#374151'}}>Password</label>
                <span style={{fontSize:12,color:'#2563eb',cursor:'pointer',fontWeight:600}}>Forgot password?</span>
              </div>
              <div style={{position:'relative'}}>
                <input className="inp" type={showPw?'text':'password'} placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required style={{paddingRight:46}}/>
                <button type="button" onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:16}}>{showPw?'🙈':'👁'}</button>
              </div>
            </div>
            <button type="submit" className="sbtn" disabled={loading}>{loading?'⏳ Signing in…':'Sign In →'}</button>
          </form>

          <div style={{textAlign:'center',marginTop:24,fontSize:14,color:'#64748b'}}>
            Don't have an account?{' '}
            <Link to="/register" style={{color:'#2563eb',fontWeight:700,textDecoration:'none'}}>Join free →</Link>
          </div>

          <div style={{marginTop:22,padding:'10px 14px',background:'rgba(37,99,235,.05)',borderRadius:10,border:'1px dashed rgba(37,99,235,.18)',fontSize:11,color:'#64748b',textAlign:'center'}}>
            🔐 Secured with Spring Boot JWT — token stored in localStorage
          </div>
        </div>
      </div>
    </div>
  );
}
