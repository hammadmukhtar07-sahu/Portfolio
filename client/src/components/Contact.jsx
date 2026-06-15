// portfolio/client/src/components/Contact.jsx
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';

const SOCIAL = [
  { label:'Facebook',  icon:'📘', color:'#1877f2', url:'https://www.facebook.com/share/14g6xVWqpxY/',                                              hint:'Follow on Facebook' },
  { label:'LinkedIn',  icon:'💼', color:'#0a66c2', url:'https://www.linkedin.com/in/hammad-mukhtar-4812a23ba',                                     hint:'Connect on LinkedIn' },
  { label:'Instagram', icon:'📸', color:'#e1306c', url:'https://www.instagram.com/hammadmukhtar128?igsh=MTVodjlya2w0MDI0Yw==',                     hint:'Follow on Instagram' },
  { label:'WhatsApp',  icon:'💬', color:'#22c55e', url:'https://wa.me/923336278367?text=Hi%20Hammad%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!', hint:'Chat on WhatsApp' },
  { label:'GitHub',    icon:'🐙', color:'#f1f5f9', url:'https://github.com',                                                                        hint:'View on GitHub' },
];

const inputStyle = {
  width:'100%', padding:'13px 16px',
  background:'rgba(15,31,61,0.6)',
  border:'1px solid rgba(6,182,212,0.18)',
  borderRadius:10, color:'var(--text-primary)',
  fontFamily:'var(--font-body)', fontSize:'0.92rem',
  outline:'none', transition:'border-color 0.25s, box-shadow 0.25s', boxSizing:'border-box',
};
const focusStyle = { borderColor:'var(--cyan)', boxShadow:'0 0 0 3px rgba(6,182,212,0.12)' };
const blurStyle  = { borderColor:'rgba(6,182,212,0.18)', boxShadow:'none' };

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.post(`${API_URL}/contact`, form);
      setStatus('success');
      setForm({ name:'', email:'', message:'' });
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" style={{ minHeight:'100vh', padding:'clamp(6rem,10vw,9rem) 2rem 4rem' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }}
          style={{ textAlign:'center', marginBottom:'4rem' }}>
          <div className="section-label" style={{ justifyContent:'center' }}>Get In Touch</div>
          <h2 className="section-title">Let's <span className="gradient-text">Work Together</span></h2>
          <div className="glow-line" style={{ margin:'1rem auto 0' }} />
          <p style={{ color:'var(--text-secondary)', fontSize:'1rem', maxWidth:480, margin:'1.5rem auto 0', lineHeight:1.75 }}>
            Have a project in mind or want to chat? I'm always open to exciting opportunities and collaborations.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'3rem', alignItems:'start' }}>

          {/* Info panel */}
          <motion.div
            initial={{ opacity:0, x:-40 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.7, delay:0.15 }}>

            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.4rem', marginBottom:'1rem' }}>Say Hello 👋</h3>
            <p style={{ color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'2rem', fontSize:'0.92rem' }}>
              I'm available for freelance work and full-time positions. If you have a project that needs
              creative coding, I'd love to hear about it. Response within 24 hours, guaranteed.
            </p>

            {/* Contact cards */}
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem', marginBottom:'2.5rem' }}>
              {[
                { icon:'📧', label:'EMAIL',    value:'hammadmukhtar128@gmail.com', href:'mailto:hammadmukhtar128@gmail.com' },
                { icon:'📞', label:'PHONE',    value:'+92 333 6278367',            href:'tel:+923336278367' },
                { icon:'📍', label:'LOCATION', value:'Islamabad, Pakistan',        href:'#' },
              ].map(({ icon, label, value, href }) => (
                <a key={label} href={href}
                  style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', background:'rgba(15,31,61,0.5)', border:'1px solid rgba(6,182,212,0.12)', borderRadius:10, textDecoration:'none', transition:'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='rgba(6,182,212,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='rgba(6,182,212,0.12)'}>
                  <div style={{ width:42, height:42, borderRadius:9, background:'var(--cyan-dim)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--text-muted)', letterSpacing:'0.1em' }}>{label}</div>
                    <div style={{ color:'var(--text-primary)', fontSize:'0.87rem' }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', letterSpacing:'0.12em', marginBottom:'1rem' }}>CONNECT WITH ME</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {SOCIAL.map(({ label, icon, color, url, hint }) => (
                  <motion.a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    whileHover={{ x:6 }} whileTap={{ scale:0.97 }}
                    style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 16px', background:'rgba(15,31,61,0.4)', border:`1px solid ${color}20`, borderRadius:10, textDecoration:'none', transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=`${color}60`; e.currentTarget.style.background=`${color}10`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor=`${color}20`; e.currentTarget.style.background='rgba(15,31,61,0.4)'; }}>
                    <span style={{ fontSize:'1.2rem' }}>{icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:'0.88rem', color:'var(--text-primary)' }}>{label}</div>
                      <div style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>{hint}</div>
                    </div>
                    <span style={{ color:`${color}80`, fontSize:'0.8rem' }}>↗</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity:0, x:40 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.7, delay:0.25 }}>
            <div style={{ background:'rgba(15,31,61,0.5)', backdropFilter:'blur(20px)', border:'1px solid rgba(6,182,212,0.12)', borderRadius:20, padding:'2.2rem', position:'relative', overflow:'hidden' }}>
              {/* Top accent */}
              <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:2, background:'var(--gradient)' }} />

              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.2rem', marginBottom:'1.8rem' }}>Send a Message</h3>

              {status === 'success' ? (
                <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                  style={{ textAlign:'center', padding:'3rem 1rem' }}>
                  <div style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>✅</div>
                  <h4 style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', marginBottom:'0.5rem' }}>Message Sent!</h4>
                  <p style={{ color:'var(--text-secondary)', fontSize:'0.9rem', marginBottom:'1.5rem' }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    style={{ background:'none', border:'1px solid rgba(6,182,212,0.3)', color:'var(--cyan)', borderRadius:8, padding:'8px 20px', fontFamily:'var(--font-body)', fontSize:'0.85rem', cursor:'pointer' }}>
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
                  {[
                    { name:'name',    label:'YOUR NAME',      type:'text',  placeholder:'Hammad Mukhtar' },
                    { name:'email',   label:'EMAIL ADDRESS',  type:'email', placeholder:'you@email.com' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:6 }}>{label}</label>
                      <input type={type} name={name} value={form[name]} onChange={handleChange} required placeholder={placeholder}
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, focusStyle)}
                        onBlur={e => Object.assign(e.target.style, blurStyle)} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:6 }}>MESSAGE</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Tell me about your project or just say hello..."
                      style={{ ...inputStyle, resize:'vertical', minHeight:130 }}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, blurStyle)} />
                  </div>

                  {status === 'error' && (
                    <div style={{ padding:'10px 14px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:8, color:'#f87171', fontSize:'0.85rem' }}>
                      ⚠️ {errMsg}
                    </div>
                  )}

                  <motion.button type="submit" disabled={status==='sending'}
                    whileHover={{ scale:1.02, boxShadow:'0 0 30px rgba(6,182,212,0.3)' }}
                    whileTap={{ scale:0.98 }}
                    style={{ background: status==='sending' ? 'rgba(6,182,212,0.3)' : 'var(--gradient)', border:'none', color:'#fff', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.95rem', padding:13, borderRadius:10, cursor: status==='sending' ? 'not-allowed' : 'none', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    {status === 'sending' ? (
                      <><div style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />Sending...</>
                    ) : (
                      <>📨 Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
