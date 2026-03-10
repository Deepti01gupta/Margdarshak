// Chat Window component
import { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import { WS_URL } from '../../utils/constants';

export default function ChatWindow() {
  const [msgs, setMsgs]   = useState([
    { id:1, from:'bot', text:'Hi! I am your Margdarshak assistant. Ask me about interview prep, company patterns, or connect with alumni! 🎓', time:'10:00' },
  ]);
  const [ws, setWs]       = useState(null);
  const [connected, setConnected] = useState(false);
  const bottomRef         = useRef(null);

  useEffect(() => {
    // Connect to Spring Boot WebSocket
    try {
      const socket = new WebSocket(WS_URL);
      socket.onopen    = ()     => setConnected(true);
      socket.onclose   = ()     => setConnected(false);
      socket.onmessage = (e)    => {
        const data = JSON.parse(e.data);
        setMsgs(m => [...m, { id:Date.now(), from:'bot', text:data.message, time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) }]);
      };
      setWs(socket);
      return () => socket.close();
    } catch { /* WS not available in dev */ }
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs]);

  const send = (text) => {
    const msg = { id:Date.now(), from:'me', text, time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) };
    setMsgs(m => [...m, msg]);
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ message: text }));
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 220px)', background:'rgba(255,255,255,.82)', backdropFilter:'blur(16px)', borderRadius:22, border:'1.5px solid rgba(37,99,235,.1)', overflow:'hidden', boxShadow:'0 8px 32px rgba(37,99,235,.08)' }}>
      {/* Header */}
      <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(37,99,235,.1)', display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:38, height:38, borderRadius:12, background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🤖</div>
        <div>
          <div style={{ fontWeight:800, fontSize:15 }}>Margdarshak AI</div>
          <div style={{ fontSize:11, display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background: connected?'#22c55e':'#f59e0b', display:'inline-block' }}/>
            <span style={{ color:'#64748b' }}>{connected?'Connected via WebSocket':'Demo mode'}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'20px 22px', display:'flex', flexDirection:'column', gap:12 }}>
        {msgs.map(m => (
          <div key={m.id} style={{ display:'flex', justifyContent:m.from==='me'?'flex-end':'flex-start' }}>
            <div style={{ maxWidth:'72%', padding:'12px 16px', borderRadius:m.from==='me'?'18px 18px 4px 18px':'18px 18px 18px 4px',
              background:m.from==='me'?'linear-gradient(135deg,#1d4ed8,#3b82f6)':'rgba(241,245,249,.9)',
              color:m.from==='me'?'white':'#0f172a', fontSize:14, lineHeight:1.6,
              boxShadow:m.from==='me'?'0 4px 14px rgba(37,99,235,.3)':'0 2px 8px rgba(0,0,0,.06)' }}>
              {m.text}
              <div style={{ fontSize:10, marginTop:4, opacity:.6, textAlign:'right' }}>{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef}/>
      </div>

      <ChatInput onSend={send}/>
    </div>
  );
}
