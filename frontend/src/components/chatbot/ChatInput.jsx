// Chat Input component
import { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  const submit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form onSubmit={submit} style={{ padding:'14px 18px', borderTop:'1px solid rgba(37,99,235,.1)', display:'flex', gap:10 }}>
      <input value={text} onChange={e=>setText(e.target.value)}
        placeholder="Ask about companies, prep tips, alumni…"
        style={{ flex:1, padding:'11px 16px', borderRadius:30, border:'1.5px solid #e2e8f0', fontFamily:'var(--font-body)', fontSize:14, outline:'none', background:'rgba(255,255,255,.9)', color:'#0f172a', transition:'border-color .2s' }}
        onFocus={e=>e.target.style.borderColor='#2563eb'}
        onBlur={e=>e.target.style.borderColor='#e2e8f0'}/>
      <button type="submit" disabled={!text.trim()}
        style={{ padding:'11px 22px', borderRadius:30, border:'none', background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)', transition:'opacity .2s', opacity:text.trim()?1:.5 }}>
        Send →
      </button>
    </form>
  );
}
