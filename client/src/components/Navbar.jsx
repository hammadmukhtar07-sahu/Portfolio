// portfolio/client/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 2rem', height: '68px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(6,13,31,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(6,182,212,0.1)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} onClick={() => navigate('/')}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem',
            background: 'var(--gradient)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', cursor: 'none', userSelect: 'none',
            display: 'flex', alignItems: 'center',
          }}>
          HM<span style={{ width:6,height:6,borderRadius:'50%',background:'var(--cyan)',display:'inline-block',marginLeft:2,marginBottom:14 }} />
        </motion.div>

        {/* Desktop */}
        <div className="nav-desktop" style={{ display:'flex', alignItems:'center', gap:'0.25rem' }}>
          {links.map(({ label, path }) => (
            <NavLink key={label} to={path}
              style={({ isActive }) => ({
                padding: '6px 16px', borderRadius: '8px',
                fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500,
                color: isActive ? 'var(--cyan)' : 'var(--text-secondary)',
                background: isActive ? 'var(--cyan-dim)' : 'transparent',
                border: isActive ? '1px solid rgba(6,182,212,0.25)' : '1px solid transparent',
                transition: 'all 0.2s', textDecoration: 'none',
              })}
              onMouseEnter={e => { if (!e.currentTarget.className.includes('active')) e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => {}}
            >{label}</NavLink>
          ))}
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
            onClick={() => navigate('/contact')}
            style={{
              marginLeft: '0.75rem',
              background: 'var(--gradient)', border: 'none', color: '#fff',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.85rem',
              padding: '8px 22px', borderRadius: '8px', cursor: 'none',
              boxShadow: '0 0 20px rgba(6,182,212,0.2)',
            }}>Hire Me</motion.button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
          className="hamburger"
          style={{ background:'none', border:'none', display:'none', flexDirection:'column', gap:'5px', cursor:'pointer', padding:'4px' }}>
          {[0,1,2].map(i => (
            <motion.span key={i}
              animate={{ rotate: menuOpen && i===0 ? 45 : menuOpen && i===2 ? -45 : 0, y: menuOpen && i===0 ? 7 : menuOpen && i===2 ? -7 : 0, opacity: menuOpen && i===1 ? 0 : 1 }}
              style={{ display:'block', width:'22px', height:'2px', background:'var(--cyan)', borderRadius:'2px' }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, x:'100%' }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:'100%' }}
            transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
            style={{
              position:'fixed', top:0, right:0, bottom:0, width:'75%', maxWidth:'300px',
              background:'rgba(6,13,31,0.97)', backdropFilter:'blur(24px)',
              zIndex:999, borderLeft:'1px solid var(--border)',
              display:'flex', flexDirection:'column', justifyContent:'center',
              alignItems:'flex-start', padding:'2rem', gap:'1.5rem',
            }}>
            {links.map(({ label, path }, i) => (
              <motion.div key={label}
                initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
                transition={{ delay: i*0.08+0.1 }}>
                <NavLink to={path} onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700,
                    color: isActive ? 'var(--cyan)' : 'var(--text-secondary)',
                    textDecoration: 'none', display: 'block',
                  })}>{label}</NavLink>
              </motion.div>
            ))}
            <motion.button initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
              onClick={() => { navigate('/contact'); setMenuOpen(false); }}
              style={{ background:'var(--gradient)', border:'none', color:'#fff', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.95rem', padding:'12px 28px', borderRadius:'8px', cursor:'pointer', marginTop:'0.5rem' }}>
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setMenuOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:998 }} />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } .hamburger { display: flex !important; } }
      `}</style>
    </>
  );
}
