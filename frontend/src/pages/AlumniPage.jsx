// Alumni page
import Sidebar from '../components/common/Sidebar';
import AlumniCard from '../components/alumni/AlumniCard';

const MOCK_ALUMNI = [
  { id:1, name:'Priya Sharma',   company:'Google',    role:'SDE-2',     batch:'2022', skills:['DSA','System Design','Python'] },
  { id:2, name:'Rahul Mehta',    company:'Amazon',    role:'SDE-1',     batch:'2023', skills:['Java','AWS','Microservices'] },
  { id:3, name:'Ananya Singh',   company:'Microsoft', role:'SDE Intern',batch:'2024', skills:['C++','Azure','REST APIs'] },
  { id:4, name:'Vikram Nair',    company:'Flipkart',  role:'SDE-1',     batch:'2023', skills:['DSA','React','Node.js'] },
];

export default function AlumniPage() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font-body)' }}>
      <Sidebar />
      <main style={{ flex:1, marginLeft:248, padding:'88px 40px 40px' }}>
        <h1 style={{ fontSize:28, fontWeight:800, marginBottom:6 }}>🤝 Alumni Network</h1>
        <p style={{ color:'var(--muted)', marginBottom:32 }}>Connect with alumni, request mentorship, get referrals.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
          {MOCK_ALUMNI.map(a => <AlumniCard key={a.id} alumni={a} />)}
        </div>
      </main>
    </div>
  );
}
