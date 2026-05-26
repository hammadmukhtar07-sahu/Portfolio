// portfolio/client/src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SOCIAL = [
  { label:'Facebook',  icon:'📘', url:'https://www.facebook.com/share/14g6xVWqpxY/' },
  { label:'LinkedIn',  icon:'💼', url:'https://www.linkedin.com/in/hammad-mukhtar-4812a23ba' },
  { label:'Instagram', icon:'📸', url:'https://www.instagram.com/hammadmukhtar128?igsh=MTVodjlya2w0MDI0Yw==' },
  { label:'WhatsApp',  icon:'💬', url:'https://wa.me/923336278367' },
  { label:'GitHub',    icon:'🐙', url:'https://github.com' },
];

const NAV = [
  { label:'Home', path:'/' },
  { label:'About', path:'/about' },
  { label:'Projects', path:'/projects' },
  { label:'Contact', path:'/contact' },
];

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ borderTop:'1px solid rgba(6,182,212,0.1)', padding:'3.5rem 2rem 2rem', background:'rgba(6,13,31,0.9)', backdropFilter:'blur(10px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'2.5rem', marginBottom:'3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.6rem', background:'var(--gradient)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'1rem', cursor:'none' }}
              onClick={() => navigate('/')}>HM.</div>
            <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', lineHeight:1.7, maxWidth:220 }}>
              Full Stack Developer building beautiful, performant web applications.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--cyan)', letterSpacing:'0.12em', marginBottom:'1rem' }}>QUICK LINKS</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {NAV.map(({ label, path }) => (
                <button key={label} onClick={() => navigate(path)}
                  style={{ background:'none', border:'none', textAlign:'left', color:'var(--text-muted)', fontFamily:'var(--font-body)', fontSize:'0.87rem', cursor:'none', padding:0, transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='var(--cyan)'}
                  onMouseLeave={e => e.target.style.color='var(--text-muted)'}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--cyan)', letterSpacing:'0.12em', marginBottom:'1rem' }}>CONTACT</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[
                { icon:'📧', text:'hammadmukhtar128@gmail.com', href:'mailto:hammadmukhtar128@gmail.com' },
                { icon:'📞', text:'+92 333 6278367', href:'tel:+923336278367' },
                { icon:'📍', text:'Islamabad, Pakistan', href:'#' },
              ].map(({ icon, text, href }) => (
                <a key={text} href={href}
                  style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text-muted)', textDecoration:'none', fontSize:'0.84rem', transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>
                  <span>{icon}</span>{text}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--cyan)', letterSpacing:'0.12em', marginBottom:'1rem' }}>FOLLOW ME</div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {SOCIAL.map(({ label, icon, url }) => (
                <motion.a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y:-4, scale:1.1 }} whileTap={{ scale:0.95 }}
                  title={label}
                  style={{ width:40, height:40, borderRadius:9, background:'rgba(15,31,61,0.6)', border:'1px solid rgba(6,182,212,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', textDecoration:'none', transition:'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--cyan)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='rgba(6,182,212,0.15)'}>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(6,182,212,0.08)', paddingTop:'1.5rem', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>
          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-muted)' }}>
            Built by <span style={{ color:'var(--cyan)', fontWeight:500 }}>Hammad Mukhtar</span> © 2025 — Made with ❤️ & React
          </div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-muted)', letterSpacing:'0.08em' }}>
            MERN STACK · FULL STACK DEVELOPER
          </div>
        </div>
      </div>
    </footer>
  );
}
