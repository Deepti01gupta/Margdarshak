// Chatbot page
import Sidebar from '../components/common/Sidebar';
import ChatWindow from '../components/chatbot/ChatWindow';

export default function ChatbotPage() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font-body)' }}>
      <Sidebar />
      <main style={{ flex:1, marginLeft:248, padding:'88px 40px 40px', display:'flex', flexDirection:'column' }}>
        <h1 style={{ fontSize:28, fontWeight:800, marginBottom:6 }}>🤖 AI Chatbot & Mentorship Chat</h1>
        <p style={{ color:'var(--muted)', marginBottom:24 }}>Real-time chat powered by WebSocket.</p>
        <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
          <ChatWindow />
        </div>
      </main>
    </div>
  );
}
