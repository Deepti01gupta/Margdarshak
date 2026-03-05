// Company page
import Sidebar from '../components/common/Sidebar';
import HiringPattern from '../components/company/HiringPattern';

export default function CompanyPage() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font-body)' }}>
      <Sidebar />
      <main style={{ flex:1, marginLeft:248, padding:'88px 40px 40px' }}>
        <h1 style={{ fontSize:28, fontWeight:800, marginBottom:6 }}>🏢 Company Hiring Patterns</h1>
        <p style={{ color:'var(--muted)', marginBottom:32 }}>Browse all companies and their complete hiring data.</p>
        <HiringPattern />
      </main>
    </div>
  );
}
