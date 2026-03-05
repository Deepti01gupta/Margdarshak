// Preparation page
import Sidebar from '../components/common/Sidebar';
import Roadmap from '../components/preparation/Roadmap';

export default function PreparationPage() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font-body)' }}>
      <Sidebar />
      <main style={{ flex:1, marginLeft:248, padding:'88px 40px 40px' }}>
        <h1 style={{ fontSize:28, fontWeight:800, marginBottom:6 }}>📚 Preparation</h1>
        <p style={{ color:'var(--muted)', marginBottom:32 }}>Roadmaps, topic lists, and interview experiences.</p>
        <Roadmap />
      </main>
    </div>
  );
}
