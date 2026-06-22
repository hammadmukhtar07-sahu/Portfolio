// portfolio/client/src/components/ReviewModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewForm from './ReviewForm';

const ReviewModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this modal in this session
    const isDismissed = sessionStorage.getItem('reviewModalDismissed');
    if (isDismissed) {
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
    sessionStorage.setItem('reviewModalDismissed', 'true');
  };

  const handleFormSuccess = () => {
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  // Close on ESC key
  useEffect(() => {
    if (showModal) {
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [showModal]);

  return (
    <AnimatePresence>
      {showModal && (
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
              padding: 'clamp(20px, 5vw, 40px) clamp(16px, 4vw, 32px)',
              width: 'min(90vw, 550px)',
              maxHeight: '85vh',
              overflowX: 'hidden',
              overflowY: 'auto',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(6, 182, 212, 0.1)',
              zIndex: 100000,
              cursor: 'default',
              boxSizing: 'border-box'
            }}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 'clamp(8px, 2vw, 16px)',
                right: 'clamp(8px, 2vw, 16px)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: '#06b6d4',
                fontSize: '1.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                fontWeight: 'bold'
              }}
              title="Close (ESC)"
            >
              ✕
            </motion.button>

            {/* Form content - Direct display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
