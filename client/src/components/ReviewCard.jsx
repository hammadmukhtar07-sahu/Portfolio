import React from 'react';
import { motion } from 'framer-motion';

const ReviewCard = ({ review, index }) => {
  // Generate a stable avatar based on name
  const getAvatar = (name) => {
    const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
    const colorIndex = name.charCodeAt(0) % colors.length;
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return { initials, color: colors[colorIndex] };
  };

  const avatar = getAvatar(review.name);
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ 
            color: i < rating ? '#fbbf24' : 'rgba(6,182,212,0.1)', 
            fontSize: '1.2rem',
            filter: i < rating ? 'drop-shadow(0 0 4px rgba(251,191,36,0.4))' : 'none'
          }}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index ? (index % 10) * 0.1 : 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        background: 'linear-gradient(145deg, rgba(15, 31, 61, 0.8), rgba(10, 20, 40, 0.9))',
        border: '1px solid rgba(6, 182, 212, 0.15)',
        borderRadius: '20px',
        padding: '30px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        minWidth: '380px',
        maxWidth: '420px',
        flexShrink: 0,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.15), inset 0 0 20px rgba(6, 182, 212, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
      }}
    >
      {/* Gradient accent on top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--cyan), var(--purple), var(--cyan))',
        opacity: 0.8
      }} />

      {/* Header with avatar, name, and rating */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
          {/* Avatar */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${avatar.color}, #1e293b)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '1.1rem',
              flexShrink: 0,
              boxShadow: `0 4px 15px ${avatar.color}40`,
              border: `1px solid ${avatar.color}80`
            }}
          >
            {avatar.initials}
          </div>

          {/* Name and Company */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ 
              fontWeight: '700', 
              fontSize: '1.05rem', 
              color: 'var(--text-primary)', 
              marginBottom: '4px',
              letterSpacing: '0.02em'
            }}>
              {review.name}
            </div>
            <div style={{ 
              fontSize: '0.85rem', 
              color: 'var(--cyan)',
              fontWeight: '500'
            }}>
              {review.company || 'Client'}
            </div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div style={{ marginBottom: '16px' }}>
        {renderStars(review.rating)}
      </div>

      {/* Review message */}
      <p style={{
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        marginBottom: '20px',
        fontStyle: 'italic',
        borderLeft: '3px solid rgba(6, 182, 212, 0.3)',
        paddingLeft: '16px'
      }}>
        "{review.message}"
      </p>

      {/* Date */}
      <div style={{ 
        fontSize: '0.75rem', 
        color: 'var(--text-muted)', 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em',
        fontWeight: '600'
      }}>
        {formatDate(review.createdAt)}
      </div>
      
      {/* Decorative background element */}
      <div style={{
        position: 'absolute',
        bottom: '-20px',
        right: '-20px',
        fontSize: '8rem',
        opacity: 0.03,
        pointerEvents: 'none',
        fontFamily: 'serif',
        lineHeight: 1
      }}>
        "
      </div>
    </motion.div>
  );
};

export default ReviewCard;
