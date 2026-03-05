// Register page
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [params]  = useSearchParams();
  const [form, setForm] = useState({ name:'', email:'', password:'', role: params.get('role')?.toUpperCase()==='ALUMNI'?'ALUMNI':'STUDENT' });
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState('');
  const { register } = useAuth();
  const navigate  = useNavigate();

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async e => {
    e.preventDefault(); setErr(''); setLoading(true);
    try { await register(form); navigate('/dashboard'); }
    catch (ex) { setErr(ex.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
      background:'linear-gradient(145deg,#eef3ff,#dbeafe,#f0f9ff)',
      fontFamily:'var(--font-body)',position:'relative',overflow:'hidden',padding:'40px 24px'}}>
      <style>{`
        @keyframes gradPan{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .inp{width:100%;padding:13px 16px;border-radius:12px;border:1.5px solid #e2e8f0;font-family:var(--font-body);font-size:14px;background:rgba(255,255,255,.88);transition:all .2s;outline:none;color:#0f172a}
        .inp:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.1);background:white}
        .sbtn{width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,#1d4ed8,#3b82f6,#60a5fa);background-size:200% 200%;animation:gradPan 3s ease infinite;color:white;font-family:var(--font-body);font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 6px 22px rgba(37,99,235,.35);transition:transform .2s}
        .sbtn:hover:not(:disabled){transform:translateY(-2px)}
        .sbtn:disabled{opacity:.7;cursor:not-allowed}
        .rbtn{flex:1;padding:12px 8px;border-radius:12px;border:2px solid;font-family:var(--font-body);font-weight:700;font-size:13px;cursor:pointer;transition:all .2s;text-align:center}
      `}</style>

      <div style={{position:'absolute',width:500,height:500,background:'radial-gradient(circle,rgba(37,99,235,.12),transparent)',top:-100,right:-80,borderRadius:'50%',filter:'blur(30px)',pointerEvents:'none'}}/>

      <div style={{width:'100%',maxWidth:460,position:'relative',zIndex:1,animation:'fadeUp .7s ease'}}>
        <div style={{background:'rgba(255,255,255,.85)',backdropFilter:'blur(24px)',borderRadius:28,padding:'44px 40px',border:'1.5px solid rgba(255,255,255,.96)',boxShadow:'0 20px 60px rgba(37,99,235,.10)'}}>
          <div style={{textAlign:'center',marginBottom:30}}>
            <Link to="/" style={{display:'inline-flex',alignItems:'center',gap:8,textDecoration:'none',marginBottom:20}}>
              <div style={{width:38,height:38,background:'linear-gradient(135deg,#1d4ed8,#3b82f6)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🎓</div>
              <span style={{fontSize:18,fontWeight:800,color:'#0f172a'}}>Campus<span style={{color:'#2563eb'}}>Connect</span></span>
            </Link>
            <h1 style={{fontSize:24,fontWeight:800,color:'#0f172a',letterSpacing:'-0.5px',marginBottom:6}}>Create your account 🚀</h1>
            <p style={{fontSize:13,color:'#64748b'}}>Join 2,400+ students & alumni today</p>
          </div>

          {/* Role selector */}
          <div style={{display:'flex',gap:10,marginBottom:22}}>
            {['STUDENT','ALUMNI'].map(r=>(
              <button key={r} type="button" className="rbtn" onClick={()=>set('role',r)} style={{
                borderColor: form.role===r?'#2563eb':'#e2e8f0',
                background:  form.role===r?'rgba(37,99,235,.08)':'rgba(255,255,255,.7)',
                color:       form.role===r?'#1d4ed8':'#64748b',
              }}>{r==='STUDENT'?'🎓 Student':'👩‍💼 Alumni'}</button>
            ))}
          </div>

          {err && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:'11px 16px',marginBottom:18,fontSize:13,color:'#dc2626',fontWeight:500}}>⚠️ {err}</div>}

          <form onSubmit={handleSubmit}>
            {[
              {k:'name',     label:'Full Name',    type:'text',     ph:'Rahul Sharma',       min:2},
              {k:'email',    label:'College Email', type:'email',    ph:'rahul@college.edu',  min:6},
              {k:'password', label:'Password',      type:'password', ph:'8+ characters',      min:8},
            ].map(f=>(
              <div key={f.k} style={{marginBottom:16}}>
                <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>{f.label}</label>
                <input className="inp" type={f.type} placeholder={f.ph} value={form[f.k]} onChange={e=>set(f.k,e.target.value)} required minLength={f.min}/>
              </div>
            ))}

            <div style={{marginBottom:20,padding:'10px 14px',background:'rgba(37,99,235,.05)',borderRadius:10,fontSize:12,color:'#64748b',border:'1px dashed rgba(37,99,235,.18)'}}>
              📋 By joining, you agree to our Terms. Your data is secured with Spring Boot JWT.
            </div>

            <button type="submit" className="sbtn" disabled={loading}>
              {loading?'⏳ Creating account…':`Join as ${form.role==='STUDENT'?'🎓 Student':'👩‍💼 Alumni'} →`}
            </button>
          </form>

          <div style={{textAlign:'center',marginTop:20,fontSize:14,color:'#64748b'}}>
            Already have an account?{' '}
            <Link to="/login" style={{color:'#2563eb',fontWeight:700,textDecoration:'none'}}>Sign in →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
