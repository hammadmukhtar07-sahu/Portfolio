// portfolio/client/src/components/ReviewForm.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reviewService from '../services/reviewService';

const ReviewForm = ({ onSuccess, onClose = null }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', rating: 5, message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? parseInt(value) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));

    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('loading');

    try {
      // Client-side validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setError('Please fill in all required fields');
        setStatus('idle');
        return;
      }

      if (formData.message.trim().length < 10) {
        setError('Review must be at least 10 characters');
        setStatus('idle');
        return;
      }

      if (formData.message.trim().length > 500) {
        setError('Review cannot exceed 500 characters');
        setStatus('idle');
        return;
      }

      await reviewService.submitReview(formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', rating: 5, message: '' });
      setCharCount(0);

      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      }
    } catch (err) {
      setError(err.error || 'Failed to submit review. Please try again.');
      setStatus('idle');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    background: 'rgba(15, 31, 61, 0.6)',
    border: '1px solid rgba(6, 182, 212, 0.18)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    boxSizing: 'border-box'
  };

  const focusStyle = { borderColor: 'var(--cyan)', boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.12)' };
  const blurStyle = { borderColor: 'rgba(6, 182, 212, 0.18)', boxShadow: 'none' };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Name */}
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
          Your Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => Object.assign(e.target.style, blurStyle)}
          maxLength="50"
        />
      </div>

      {/* Email */}
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => Object.assign(e.target.style, blurStyle)}
        />
      </div>

      {/* Company (Optional) */}
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
          Company or Country
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your Company"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => Object.assign(e.target.style, blurStyle)}
          maxLength="100"
        />
      </div>

      {/* Rating */}
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>
          Rating *
        </label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <motion.button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: '2rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
                color: formData.rating >= star ? '#fbbf24' : 'rgba(6, 182, 212, 0.2)'
              }}
            >
              ★
            </motion.button>
          ))}
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>
            {formData.rating} / 5
          </span>
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
          Your Review *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Share your experience working with me... (minimum 10 characters)"
          style={{ ...inputStyle, fontFamily: 'var(--font-body)', resize: 'vertical', minHeight: '120px' }}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => Object.assign(e.target.style, blurStyle)}
          maxLength="500"
        />
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
          {charCount} / 500 characters
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#fca5a5',
              padding: '12px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem'
            }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
              color: '#86efac',
              padding: '12px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem'
            }}
          >
            ✓ Review submitted successfully! Thank you for your feedback.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        whileHover={{ scale: status === 'loading' || status === 'success' ? 1 : 1.02 }}
        whileTap={{ scale: status === 'loading' || status === 'success' ? 1 : 0.98 }}
        style={{
          padding: '14px 28px',
          background: status === 'success'
            ? 'rgba(34, 197, 94, 0.2)'
            : 'linear-gradient(135deg, var(--cyan), var(--purple))',
          color: status === 'success' ? '#86efac' : 'white',
          border: 'none',
          borderRadius: '10px',
          fontFamily: 'var(--font-body)',
          fontWeight: '600',
          fontSize: '0.95rem',
          cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' || status === 'success' ? 0.7 : 1,
          transition: 'all 0.3s ease',
          marginTop: '8px'
        }}
      >
        {status === 'loading' ? '⏳ Submitting...' : status === 'success' ? '✓ Submitted!' : 'Submit Review'}
      </motion.button>
    </form>
  );
};

export default ReviewForm;
