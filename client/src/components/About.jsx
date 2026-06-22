// portfolio/client/src/components/About.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../assets/hammad-avatar.jpg';
import officeImg from '../assets/hammad-office.jpg';
import { FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp, FaGithub } from 'react-icons/fa';

const skills = [
  { name:'React.js',   level:92, icon:'⚛️' },
  { name:'Node.js',    level:88, icon:'🟢' },
  { name:'MongoDB',    level:82, icon:'🍃' },
  { name:'Express.js', level:85, icon:'🚂' },
  { name:'JavaScript', level:93, icon:'🟨' },
  { name:'HTML & CSS', level:95, icon:'🎨' },
  { name:'Git & GitHub', level:87, icon:'🐙' },
  { name:'REST APIs',  level:88, icon:'🔌' },
];

const techBadges = ['React','Next.js','Node.js','Express','MongoDB','PostgreSQL','JavaScript','TypeScript','HTML5','CSS3','Tailwind CSS','Git','Docker','Redis','Socket.io','REST API','JWT','Axios'];


const SOCIAL = [
  { label:'Facebook',  icon:<FaFacebook />, color:'#1877f2', url:'https://www.facebook.com/share/14g6xVWqpxY/' },
  { label:'LinkedIn',  icon:<FaLinkedin />, color:'#0a66c2', url:'https://www.linkedin.com/in/hammad-mukhtar-4812a23ba' },
  { label:'Instagram', icon:<FaInstagram />, color:'#e1306c', url:'https://www.instagram.com/hammadmukhtar128?igsh=MTVodjlya2w0MDI0Yw==' },
  { label:'WhatsApp',  icon:<FaWhatsapp />, color:'#22c55e', url:'https://wa.me/923336278367' },
  { label:'GitHub',    icon:<FaGithub />, color:'#f1f5f9', url:'https://github.com' },
];

function SkillBar({ name, level, icon, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, x:-20 }} animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.5, delay:index*0.07 }}
      style={{ marginBottom:'1rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
        <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:'0.87rem', color:'var(--text-primary)' }}>
          <span>{icon}</span>{name}
        </span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.73rem', color:'var(--cyan)' }}>{level}%</span>
      </div>
      <div style={{ height:5, borderRadius:3, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
        <motion.div
          initial={{ width:0 }}
          animate={inView ? { width:`${level}%` } : {}}
          transition={{ duration:1.1, delay:index*0.08+0.2, ease:[0.22,1,0.36,1] }}
          style={{ height:'100%', borderRadius:3, background:'linear-gradient(90deg,var(--cyan),var(--purple))' }}
        />
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const navigate = useNavigate();

  return (
    <section id="about" style={{ minHeight:'100vh', padding:'clamp(6rem,10vw,9rem) clamp(1rem, 5vw, 2rem)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }}
          style={{ textAlign:'center', marginBottom:'4rem' }}>
          <div className="section-label" style={{ justifyContent:'center' }}>About Me</div>
          <h2 className="section-title">Crafting Digital <span className="gradient-text">Experiences</span></h2>
          <div className="glow-line" style={{ margin:'1rem auto 0' }} />
        </motion.div>

        {/* Top: Bio + Photo side by side */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%, 280px),1fr))', gap:'3rem', marginBottom:'4rem', alignItems:'center' }}>

          {/* Office photo */}
          <motion.div
            initial={{ opacity:0, x:-40 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.7, delay:0.1 }}
            style={{ position:'relative' }}>
            <div style={{ borderRadius:20, overflow:'hidden', border:'1px solid rgba(6,182,212,0.2)', boxShadow:'0 0 60px rgba(6,182,212,0.08)' }}>
              <img src={officeImg} alt="Hammad Mukhtar in office"
                style={{ width:'100%', display:'block', objectFit:'cover', maxHeight:420 }} />
            </div>
            {/* Accent bar */}
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'var(--gradient)', borderRadius:'0 0 20px 20px' }} />
            {/* Floating card */}
            <motion.div animate={{ y:[0,-6,0] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', top:20, right:-16, background:'rgba(10,22,40,0.92)', backdropFilter:'blur(12px)', border:'1px solid rgba(6,182,212,0.25)', borderRadius:12, padding:'10px 16px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.4rem', color:'var(--cyan)' }}>3+</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--text-muted)', letterSpacing:'0.1em' }}>YEARS EXP</div>
            </motion.div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity:0, x:40 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.7, delay:0.2 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:'1.8rem' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', overflow:'hidden', border:'2px solid rgba(6,182,212,0.4)', flexShrink:0 }}>
                <img src={avatarImg} alt="Hammad" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
              </div>
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.4rem', marginBottom:2 }}>Hammad Mukhtar</h3>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--cyan)', letterSpacing:'0.1em' }}>FULL STACK DEVELOPER</div>
              </div>
            </div>

            <p style={{ color:'var(--text-secondary)', lineHeight:1.85, marginBottom:'1.2rem', fontSize:'0.95rem' }}>
              I'm a passionate Full Stack Developer with 3+ years of experience building modern web applications.
              I specialize in the MERN stack — MongoDB, Express, React, and Node.js — and love turning
              complex problems into simple, beautiful, and intuitive solutions.
            </p>
            <p style={{ color:'var(--text-secondary)', lineHeight:1.85, fontSize:'0.95rem', marginBottom:'1.8rem' }}>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
              or mentoring aspiring developers. I believe in writing clean, maintainable code that makes a real difference.
            </p>

            {/* Info rows */}
            <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:'2rem' }}>
              {[
                { label:'📍 Location', value:'Islamabad, Pakistan' },
                { label:'📧 Email',    value:'hammadmukhtar128@gmail.com' },
                { label:'📞 Phone',   value:'+92 333 6278367' },
                { label:'🎯 Status',  value:'Available for freelance & full-time', green:true },
              ].map(({ label, value, green }) => (
                <div key={label} style={{ display:'flex', gap:12, fontSize:'0.87rem' }}>
                  <span style={{ color:'var(--text-muted)', minWidth:105 }}>{label}</span>
                  <span style={{ color: green ? '#22c55e' : 'var(--text-primary)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Social row */}
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:'1.8rem' }}>
              {SOCIAL.map(({ label, icon, color, url }) => (
                <motion.a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y:-4, scale:1.1 }} whileTap={{ scale:0.95 }}
                  title={label}
                  style={{ width:42, height:42, borderRadius:10, background:'rgba(15,31,61,0.6)', border:`1px solid ${color}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', textDecoration:'none', transition:'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor=color}
                  onMouseLeave={e => e.currentTarget.style.borderColor=`${color}35`}>
                  {icon}
                </motion.a>
              ))}
            </div>

            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
              <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                onClick={() => navigate('/projects')}
                style={{ background:'var(--gradient)', border:'none', color:'#fff', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.9rem', padding:'12px 26px', borderRadius:10, cursor:'none' }}>
                View My Projects
              </motion.button>
              <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                onClick={() => navigate('/contact')}
                style={{ background:'transparent', border:'1.5px solid var(--cyan)', color:'var(--cyan)', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.9rem', padding:'12px 26px', borderRadius:10, cursor:'none', transition:'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--cyan-dim)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Skills section */}
        <motion.div
          initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7, delay:0.3 }}
          style={{ background:'rgba(15,31,61,0.4)', backdropFilter:'blur(10px)', border:'1px solid rgba(6,182,212,0.1)', borderRadius:20, padding:'2.5rem' }}>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%, 280px),1fr))', gap:'3rem' }}>
            {/* Skill bars */}
            <div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', color:'var(--cyan)', marginBottom:'1.5rem' }}>Technical Proficiency</h3>
              {skills.map((s,i) => <SkillBar key={s.name} {...s} index={i} />)}
            </div>

            {/* Tech badges */}
            <div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', marginBottom:'1.5rem' }}>Technologies I Work With</h3>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {techBadges.map((tech,i) => (
                  <motion.span key={tech}
                    initial={{ opacity:0, scale:0.8 }} animate={inView ? { opacity:1, scale:1 } : {}}
                    transition={{ duration:0.3, delay:0.5+i*0.03 }}
                    whileHover={{ scale:1.08, borderColor:'var(--cyan)' }}
                    style={{ padding:'5px 13px', background:'rgba(6,182,212,0.06)', border:'1px solid rgba(6,182,212,0.2)', borderRadius:6, fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-secondary)', transition:'all 0.2s', cursor:'default' }}>
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Fun facts */}
              <div style={{ marginTop:'2rem', display:'flex', flexDirection:'column', gap:10 }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', marginBottom:'0.5rem' }}>Quick Facts</h3>
                {[
                  ['☕', 'Runs on coffee and clean code'],
                  ['🚀', 'Always learning something new'],
                  ['🎯', 'Pixel-perfect UI is non-negotiable'],
                  ['🌙', 'Best work happens at night'],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display:'flex', alignItems:'center', gap:10, fontSize:'0.87rem', color:'var(--text-secondary)' }}>
                    <span style={{ fontSize:'1.1rem' }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
