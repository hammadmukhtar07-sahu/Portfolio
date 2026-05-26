// portfolio/client/src/components/Testimonials.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import reviewService from '../services/reviewService';
import { defaultReviews } from '../data/defaultReviews';

// Skeleton loader component
const SkeletonReviewCard = () => (
  <div style={{
    background: 'linear-gradient(145deg, rgba(15, 31, 61, 0.8), rgba(10, 20, 40, 0.9))',
    border: '1px solid rgba(6, 182, 212, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    minWidth: '380px',
    maxWidth: '420px',
    flexShrink: 0,
  }} >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'rgba(6, 182, 212, 0.1)'
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ width: '120px', height: '16px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ width: '80px', height: '12px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
    <div style={{ marginBottom: '20px' }}>
      <div style={{ width: '100%', height: '14px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '4px', marginBottom: '8px' }} />
      <div style={{ width: '95%', height: '14px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '4px', marginBottom: '8px' }} />
      <div style={{ width: '70%', height: '14px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '4px' }} />
    </div>
    <div style={{ width: '60px', height: '12px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '4px' }} />
  </div>
);

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await reviewService.getAllReviews();
      
      // Combine MongoDB manual reviews with our realistic default reviews
      const combinedReviews = [...data.reviews, ...defaultReviews];
      setReviews(combinedReviews);
      
      // Recalculate average rating dynamically from ALL reviews
      const avg = combinedReviews.length > 0 
        ? combinedReviews.reduce((sum, r) => sum + r.rating, 0) / combinedReviews.length 
        : 0;
      setAverageRating(avg);

    } catch (err) {
      console.error('Failed to fetch reviews from MongoDB:', err);
      // Fallback gracefully to default reviews if DB fails
      setReviews(defaultReviews);
      const avg = defaultReviews.reduce((sum, r) => sum + r.rating, 0) / defaultReviews.length;
      setAverageRating(avg);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSuccess = () => {
    setShowForm(false);
    fetchReviews(); // Refetch to get the new manual review appended to the list
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // Duplicate reviews for infinite scrolling effect
  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section
      id="testimonials"
      style={{
        minHeight: '100vh',
        padding: 'clamp(6rem, 10vw, 9rem) 0 4rem', // Removed horizontal padding for full-width carousel
        background: 'linear-gradient(180deg, transparent, rgba(6, 182, 212, 0.03) 50%, transparent)',
        overflow: 'hidden' // Important to prevent horizontal scrollbar on body
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '1rem'
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--cyan)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}>
              ⭐ Client Testimonials
            </span>
          </div>
          <h2 className="section-title">
            What Clients <span className="gradient-text">Say About Me</span>
          </h2>
          <div className="glow-line" style={{ margin: '1rem auto 0' }} />
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: 600,
            margin: '1.5rem auto 0',
            lineHeight: 1.75
          }}>
            Trusted by agencies, startups, and enterprises to deliver exceptional full-stack solutions globally.
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
            maxWidth: 600,
            margin: 'auto'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                fontWeight: '800',
                background: 'var(--gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '6px'
              }}>
                {reviews.length}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Total Reviews
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                fontWeight: '800',
                color: '#fbbf24',
                marginBottom: '6px'
              }}>
                {averageRating.toFixed(1)} ★
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Average Rating
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              padding: '16px 20px',
              borderRadius: '10px',
              marginBottom: '2rem',
              textAlign: 'center',
              fontSize: '0.9rem'
            }}
          >
            {error}
          </motion.div>
        )}
      </div>

      {/* Loading skeleton (Marquee style) */}
      {loading && (
        <div style={{ overflow: 'hidden', padding: '1rem 0' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              gap: '2rem',
              paddingLeft: '2rem'
            }}
          >
            {[...Array(4)].map((_, i) => (
              <SkeletonReviewCard key={i} />
            ))}
          </motion.div>
        </div>
      )}

      {/* Infinite Carousel Reviews */}
      {!loading && reviews.length > 0 && (
        <div 
          style={{ 
            position: 'relative',
            padding: '2rem 0 4rem 0',
            overflow: 'hidden'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient fade on edges */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '15vw',
            background: 'linear-gradient(90deg, var(--bg-primary) 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '15vw',
            background: 'linear-gradient(270deg, var(--bg-primary) 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }} />

          {/* Marquee Track */}
          <div 
            className="marquee-track"
            style={{
              display: 'flex',
              gap: '2.5rem',
              width: 'max-content',
              animationPlayState: isHovered ? 'paused' : 'running'
            }}
          >
            {marqueeReviews.map((review, idx) => (
              <ReviewCard key={`${review._id}-${idx}`} review={review} index={idx} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state (Fallback just in case) */}
      {!loading && reviews.length === 0 && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: 'rgba(6, 182, 212, 0.05)',
              border: '1px solid rgba(6, 182, 212, 0.1)',
              borderRadius: '14px',
              marginBottom: '3rem'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✨</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1rem' }}>
              No reviews yet. Be the first to share your experience!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontFamily: 'var(--font-body)',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ⭐ Write First Review
            </motion.button>
          </motion.div>
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
        {/* CTA Section with Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          style={{
            background: 'rgba(15, 31, 61, 0.8)',
            border: '1px solid rgba(6, 182, 212, 0.15)',
            borderRadius: '20px',
            padding: '3rem',
            backdropFilter: 'blur(10px)',
            marginTop: '2rem'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Left side - CTA Text */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                background: 'var(--gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Share Your Experience
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                Your feedback is incredibly valuable. If you've worked with me or used my services, please share your honest review. It helps me improve and helps other businesses find trustworthy development partners.
              </p>
              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <div>
                  <div style={{ color: 'var(--cyan)', fontWeight: '600' }}>⚡ Quick</div>
                  <div>Takes 2 minutes</div>
                </div>
                <div>
                  <div style={{ color: 'var(--cyan)', fontWeight: '600' }}>🔒 Secure</div>
                  <div>Email verified</div>
                </div>
              </div>
            </div>

            {/* Right side - Form Toggle or Form */}
            {!showForm ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  style={{
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.2)'
                  }}
                >
                  ⭐ Leave a Review Now
                </motion.button>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Reviews appear instantly after submission
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ReviewForm
                  onSuccess={handleReviewSuccess}
                  onClose={() => setShowForm(false)}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Global styles for pulse animation and marquee */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1.25rem)); }
        }
        
        .marquee-track {
          animation: scroll 40s linear infinite;
        }
        
        /* Slow down on hover - handled by inline style playState */
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .marquee-track {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
}
