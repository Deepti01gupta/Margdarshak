// Mentorship Form component
import { useState } from 'react';
import { requestMentorship } from '../../api/mentorshipApi';

export default function MentorshipForm({ alumni, onClose }) {
  const [msg, setMsg]   = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await requestMentorship({ alumniId: alumni.id, message: msg });
      setSent(true);
    } catch { alert('Failed to send. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,.5)', backdropFilter:'blur(6px)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={{ background:'rgba(255,255,255,.95)', borderRadius:24, padding:'36px 32px', maxWidth:440, width:'100%', boxShadow:'0 20px 60px rgba(37,99,235,.2)', border:'1.5px solid rgba(255,255,255,.98)' }}>
        {sent ? (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:52, marginBottom:16 }}>✅</div>
            <h3 style={{ fontSize:20, fontWeight:800, color:'#0f172a', marginBottom:8 }}>Request Sent!</h3>
            <p style={{ color:'#64748b', fontSize:14 }}>{alumni.name} will respond shortly.</p>
            <button onClick={onClose} style={{ marginTop:20, padding:'10px 28px', borderRadius:30, border:'none', background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', color:'white', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)' }}>Close</button>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize:20, fontWeight:800, marginBottom:4 }}>Request Mentorship 🤝</h3>
            <p style={{ color:'#64748b', fontSize:13, marginBottom:22 }}>Connecting with {alumni.name} @ {alumni.company}</p>
            <form onSubmit={submit}>
              <textarea value={msg} onChange={e=>setMsg(e.target.value)} required rows={4} placeholder="Introduce yourself and what help you need..."
                style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #e2e8f0', fontFamily:'var(--font-body)', fontSize:14, resize:'vertical', outline:'none', color:'#0f172a', marginBottom:16 }}
                onFocus={e=>e.target.style.borderColor='#2563eb'}
                onBlur={e=>e.target.style.borderColor='#e2e8f0'}/>
              <div style={{ display:'flex', gap:10 }}>
                <button type="button" onClick={onClose} style={{ flex:1, padding:'11px', borderRadius:12, border:'1.5px solid #e2e8f0', background:'white', color:'#64748b', fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)' }}>Cancel</button>
                <button type="submit" disabled={loading} style={{ flex:2, padding:'11px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', color:'white', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)', opacity:loading?.7:1 }}>
                  {loading?'Sending…':'Send Request →'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
