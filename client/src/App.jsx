// portfolio/client/src/App.jsx
import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import ReviewModal from './components/ReviewModal';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';
import './styles/admin.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, animId;
    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
    };
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.14; ringY += (mouseY - ringY) * 0.14;
      ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
      animId = requestAnimationFrame(animateRing);
    };
    const onEnter = () => { cursor.classList.add('hover'); ring.classList.add('hover'); };
    const onLeave = () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); };
    window.addEventListener('mousemove', onMove);
    animId = requestAnimationFrame(animateRing);
    const addListeners = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();
    const obs = new MutationObserver(addListeners);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(animId); obs.disconnect(); };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="cursor" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />
      <Navbar />
      <ReviewModal />
      <main>
        <Routes>
          <Route path="/" element={<><Hero /><Testimonials /></>} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
