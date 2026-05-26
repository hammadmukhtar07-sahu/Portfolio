// portfolio/client/src/components/ReviewModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewForm from './ReviewForm';

const ReviewModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this modal in this session
    const isDismissed = sessionStorage.getItem('reviewModalDismissed');
    if (isDismissed) {
      setDismissed(true);
      return;
    }

    // Show modal after 120 seconds (2 minutes)
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setShowModal(true);
      }
    }, 120000); // 120 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setShowForm(false);
    sessionStorage.setItem('reviewModalDismissed', 'true');
  };

  const handleFormSuccess = () => {
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  // Close on ESC key
  useEffect(() => {
    if (showModal || showForm) {
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [showModal, showForm]);

  return (
    <AnimatePresence>
      {(showModal || showForm) && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(6, 13, 31, 0.85)',
              backdropFilter: 'blur(4px)',
              zIndex: 99999,
              cursor: 'pointer'
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(10, 22, 40, 0.95)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '500px',
              width: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(6, 182, 212, 0.1)',
              zIndex: 100000,
              cursor: 'default'
            }}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                color: 'var(--cyan)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              title="Close (ESC)"
            >
              ✕
            </motion.button>

            {!showForm ? (
              // Initial modal content
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Icon */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    fontSize: '3.5rem',
                    textAlign: 'center',
                    marginBottom: '20px'
                  }}
                >
                  😊
                </motion.div>

                {/* Heading */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginBottom: '12px',
                  background: 'var(--gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Enjoying the Portfolio?
                </h3>

                {/* Description */}
                <p style={{
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '28px'
                }}>
                  Your feedback helps me improve and build better projects. I'd love to hear your thoughts! Share your experience and help other potential clients learn about my work.
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowForm(true)}
                    style={{
                      padding: '14px 24px',
                      background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ⭐ Leave a Review
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    style={{
                      padding: '14px 24px',
                      background: 'rgba(6, 182, 212, 0.1)',
                      color: 'var(--cyan)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '10px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Maybe Later
                  </motion.button>
                </div>

                {/* ESC hint */}
                <p style={{
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Press ESC to close
                </p>
              </motion.div>
            ) : (
              // Form content
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '20px',
                  background: 'var(--gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Share Your Experience
                </h3>
                <ReviewForm
                  onSuccess={handleFormSuccess}
                  onClose={handleClose}
                />
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
