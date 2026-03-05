// Topic List component
export default function TopicList({ topics = [], color = '#2563eb' }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      {topics.map((t, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:'rgba(255,255,255,.8)', borderRadius:12, border:`1px solid ${color}12` }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:color, flexShrink:0 }}/>
          <span style={{ fontSize:14, fontWeight:500, color:'#374151' }}>{t}</span>
        </div>
      ))}
    </div>
  );
}
