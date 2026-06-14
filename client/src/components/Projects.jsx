// portfolio/client/src/components/Projects.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import projectService from '../services/projectService';

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const color = project.color || '#06b6d4';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{
        background: 'rgba(15, 31, 61, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(6, 182, 212, 0.12)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.6rem',
        display: 'flex', flexDirection: 'column',
        gap: '1rem',
        position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)';
        e.currentTarget.style.boxShadow = '0 0 40px rgba(6,182,212,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(6,182,212,0.12)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }} />

      {/* Thumbnail */}
      <div style={{
        width: '100%', aspectRatio: '16/9', borderRadius: '10px',
        background: `linear-gradient(135deg, ${color}18, rgba(139,92,246,0.1))`,
        border: `1px solid ${color}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', flexShrink: 0,
      }}>
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '2rem', color: color, opacity: 0.5,
            }}>
              {project.title.split(' ').map(w => w[0]).join('').slice(0, 3)}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: 'var(--text-muted)', letterSpacing: '0.1em',
            }}>PROJECT PREVIEW</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
          }}>
            {project.title}
          </h3>
          {project.category && (
            <span style={{
              padding: '4px 8px',
              background: color + '20',
              border: `1px solid ${color}40`,
              borderRadius: '4px',
              fontSize: '0.65rem',
              color: color,
              fontWeight: 600,
            }}>
              {project.category === 'Web Project' ? '🌐' : '📱'}
            </span>
          )}
        </div>
        <p style={{
          color: 'var(--text-secondary)', fontSize: '0.85rem',
          lineHeight: 1.7,
        }}>
          {project.description}
        </p>
      </div>

      {/* Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.technologies && project.technologies.map((t) => (
          <span key={t} style={{
            padding: '3px 9px',
            background: `${color}12`,
            border: `1px solid ${color}25`,
            borderRadius: '5px',
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            color: color,
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '0.3rem' }}>
        <motion.a
          href={project.liveUrl}
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '6px',
            background: 'var(--gradient)', border: 'none',
            color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600,
            fontSize: '0.8rem', padding: '9px',
            borderRadius: '8px', textDecoration: 'none',
          }}
        >
          <FiExternalLink size={13} /> View Project
        </motion.a>

        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid rgba(6,182,212,0.3)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '0.8rem', padding: '9px',
              borderRadius: '8px', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--cyan)';
              e.currentTarget.style.borderColor = 'var(--cyan)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)';
            }}
          >
            <FiGithub size={13} /> GitHub
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.getPublicProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const hasProjects = projects && projects.length > 0;

  return (
    <section id="projects" style={{
      padding: 'clamp(5rem, 10vw, 9rem) 2rem',
      background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.02) 50%, transparent 100%)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>My Work</div>
          <h2 className="section-title">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="glow-line" style={{ margin: '1rem auto 0' }} />
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Loading projects...</p>
          </motion.div>
        ) : hasProjects ? (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}>
              {projects.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              style={{ textAlign: 'center', marginTop: '3.5rem' }}
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                  letterSpacing: '0.05em', borderBottom: '1px solid var(--cyan)',
                  paddingBottom: '2px',
                }}
              >
                <FiGithub /> View more on GitHub
              </a>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              padding: '80px 40px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(6, 182, 212, 0.15)',
            }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '15px',
              }}>
                Coming Soon
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                lineHeight: 1.8,
                maxWidth: '500px',
                margin: '0 auto',
              }}>
                Projects will be added soon. Stay tuned for upcoming work and case studies.
              </p>
            </motion.div>

            {/* Animated dots */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '30px' }}>
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.2 }}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
