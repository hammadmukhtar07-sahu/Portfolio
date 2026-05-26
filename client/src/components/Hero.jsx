// portfolio/client/src/components/Hero.jsx
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../assets/hammad-avatar.jpg';

const SOCIAL = [
  { label: 'Facebook',  emoji: '📘', color: '#1877f2', url: 'https://www.facebook.com/share/14g6xVWqpxY/' },
  { label: 'LinkedIn',  emoji: '💼', color: '#0a66c2', url: 'https://www.linkedin.com/in/hammad-mukhtar-4812a23ba' },
  { label: 'Instagram', emoji: '📸', color: '#e1306c', url: 'https://www.instagram.com/hammadmukhtar128?igsh=MTVodjlya2w0MDI0Yw==' },
  { label: 'WhatsApp',  emoji: '💬', color: '#22c55e', url: 'https://wa.me/923336278367' },
  { label: 'GitHub',    emoji: '🐙', color: '#f1f5f9', url: 'https://github.com' },
];

export default function Hero() {
  const navigate = useNavigate();
  const particlesInit = useCallback(async (engine) => { await loadSlim(engine); }, []);

  return (
    <section id="hero" style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', padding:'0 2rem' }}>
      <Particles id="tsparticles" init={particlesInit}
        style={{ position:'absolute', inset:0, zIndex:0 }}
        options={{
          background:{ color:{ value:'transparent' } }, fpsLimit:60,
          interactivity:{ events:{ onHover:{ enable:true, mode:'repulse' } }, modes:{ repulse:{ distance:80, duration:0.4 } } },
          particles:{
            color:{ value:['#06b6d4','#8b5cf6','#0ea5e9'] },
            links:{ color:'#06b6d4', distance:130, enable:true, opacity:0.18, width:1 },
            move:{ enable:true, speed:0.8, outModes:'bounce' },
            number:{ density:{ enable:true, area:900 }, value:65 },
            opacity:{ value:0.4 }, shape:{ type:'circle' }, size:{ value:{ min:1, max:3 } },
          }, detectRetina:true,
        }}
      />

      {/* Glow blobs */}
      <div style={{ position:'absolute', top:'15%', left:'55%', width:500, height:500, background:'radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)', pointerEvents:'none', zIndex:1 }} />
      <div style={{ position:'absolute', top:'55%', left:'5%', width:400, height:400, background:'radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)', pointerEvents:'none', zIndex:1 }} />

      <div style={{ maxWidth:1100, margin:'0 auto', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'3rem', position:'relative', zIndex:2, paddingTop:80, flexWrap:'wrap' }}>

        {/* LEFT */}
        <div style={{ flex:'1 1 480px' }}>
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--cyan)', letterSpacing:'0.2em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:8, marginBottom:'1.4rem' }}>
              <span style={{ display:'block', width:20, height:1, background:'var(--cyan)' }} />
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.6rem,7vw,4.6rem)', fontWeight:800, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'1rem' }}>
            Hi, I'm{' '}
            <span style={{ background:'var(--gradient)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Hammad<br />Mukhtar
            </span>
          </motion.h1>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1rem,2.5vw,1.5rem)', fontWeight:600, color:'var(--text-secondary)', marginBottom:'1.4rem', minHeight:'2rem' }}>
            <TypeAnimation
              sequence={['Full Stack Developer', 2000, 'React.js Expert', 1800, 'Node.js Engineer', 1800, 'MongoDB Specialist', 1800, 'Problem Solver', 1800]}
              wrapper="span" speed={55} repeat={Infinity}
              style={{ color:'var(--cyan)' }}
            />
          </motion.div>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.3 }}
            style={{ color:'var(--text-secondary)', fontSize:'1rem', lineHeight:1.8, maxWidth:500, marginBottom:'2.2rem' }}>
            I build high-performance, scalable web applications with clean code and
            beautiful interfaces. Passionate about turning complex ideas into elegant digital experiences.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.4 }}
            style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
            <motion.button whileHover={{ scale:1.04, boxShadow:'0 0 30px rgba(6,182,212,0.35)' }} whileTap={{ scale:0.97 }}
              onClick={() => navigate('/projects')}
              style={{ background:'var(--gradient)', border:'none', color:'#fff', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.95rem', padding:'13px 30px', borderRadius:'10px', cursor:'none' }}>
              View My Work →
            </motion.button>
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              onClick={() => navigate('/contact')}
              style={{ background:'transparent', border:'1.5px solid var(--cyan)', color:'var(--cyan)', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.95rem', padding:'13px 30px', borderRadius:'10px', cursor:'none', transition:'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='var(--cyan-dim)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              Hire Me
            </motion.button>
          </motion.div>

          {/* Social icons */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
            style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            {SOCIAL.map(({ label, emoji, color, url }) => (
              <motion.a key={label} href={url} target="_blank" rel="noopener noreferrer"
                whileHover={{ y:-4, scale:1.12 }} whileTap={{ scale:0.95 }}
                title={label}
                style={{ width:42, height:42, borderRadius:'10px', background:'rgba(15,31,61,0.6)', border:`1px solid ${color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', textDecoration:'none', transition:'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${color}30`}>
                {emoji}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
            style={{ display:'flex', gap:'2.5rem', marginTop:'2.5rem', flexWrap:'wrap' }}>
            {[['50+','Projects Built'],['3+','Years Exp.'],['100%','Satisfaction']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.8rem', color:'var(--cyan)' }}>{n}</div>
                <div style={{ color:'var(--text-muted)', fontSize:'0.78rem' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — photo */}
        <motion.div initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.9, delay:0.3, ease:[0.22,1,0.36,1] }}
          style={{ flex:'0 1 320px', display:'flex', justifyContent:'center' }}>
          <div style={{ position:'relative' }}>
            {/* Spinning ring */}
            <motion.div animate={{ rotate:360 }} transition={{ duration:20, repeat:Infinity, ease:'linear' }}
              style={{ position:'absolute', inset:'-14px', borderRadius:'50%', border:'2px dashed rgba(6,182,212,0.25)' }} />
            {/* Glow */}
            <div style={{ position:'absolute', inset:'-10px', borderRadius:'50%', background:'linear-gradient(135deg,rgba(6,182,212,0.2),rgba(139,92,246,0.2))', filter:'blur(14px)' }} />
            {/* Photo */}
            <div style={{ width:280, height:280, borderRadius:'50%', overflow:'hidden', border:'3px solid rgba(6,182,212,0.45)', position:'relative' }}>
              <img src={avatarImg} alt="Hammad Mukhtar"
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
            </div>
            {/* Badge */}
            <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', bottom:'-10px', right:'-18px', background:'rgba(10,22,40,0.9)', backdropFilter:'blur(12px)', border:'1px solid rgba(6,182,212,0.3)', borderRadius:'10px', padding:'8px 14px', display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 6px #22c55e', animation:'pulse 2s infinite' }} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'#22c55e' }}>Available for work</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}
        style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, color:'var(--text-muted)', zIndex:2 }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.15em' }}>SCROLL</span>
        <div style={{ width:24, height:38, border:'2px solid rgba(6,182,212,0.3)', borderRadius:12, display:'flex', justifyContent:'center', padding:5 }}>
          <motion.div animate={{ y:[0,12,0] }} transition={{ duration:1.8, repeat:Infinity }}
            style={{ width:4, height:8, borderRadius:2, background:'var(--cyan)' }} />
        </div>
      </motion.div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </section>
  );
}
