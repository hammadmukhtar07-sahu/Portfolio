// portfolio/client/src/components/ProjectForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const TECHNOLOGIES = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Node.js',
  'Express.js', 'MongoDB', 'MySQL', 'PHP', 'Laravel', 'Flutter',
  'React Native', 'Firebase', 'Tailwind CSS', 'Bootstrap', 'TypeScript',
  'Python', 'Django', 'Postgres', 'GraphQL', 'AWS', 'Azure',
];

function ProjectForm({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || 'Web Project',
    technologies: project?.technologies || [],
    imageUrl: project?.imageUrl || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    featured: project?.featured || false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const toggleTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.includes(tech)
        ? formData.technologies.filter(t => t !== tech)
        : [...formData.technologies, tech],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.technologies.length === 0) newErrors.technologies = 'Select at least one technology';
    if (!formData.liveUrl.trim()) newErrors.liveUrl = 'Live URL is required';
    if (!formData.liveUrl.startsWith('http')) newErrors.liveUrl = 'URL must start with http or https';
    if (formData.githubUrl && !formData.githubUrl.startsWith('http')) {
      newErrors.githubUrl = 'GitHub URL must start with http or https';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to save project' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 1000,
      }}
      onClick={onCancel}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={{
          background: 'rgba(15, 31, 61, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          color: '#e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#06b6d4' }}>
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '24px',
              padding: 0,
            }}>
            <FiX />
          </motion.button>
        </div>

        {errors.submit && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#fca5a5',
            fontSize: '14px',
          }}>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., E-Commerce Platform"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 31, 61, 0.5)',
                border: `1px solid ${errors.title ? 'rgba(239, 68, 68, 0.3)' : 'rgba(6, 182, 212, 0.2)'}`,
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {errors.title && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>
              Project Type *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 31, 61, 0.5)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}>
              <option value="Web Project">Web Project</option>
              <option value="Mobile App Project">Mobile App Project</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 31, 61, 0.5)',
                border: `1px solid ${errors.description ? 'rgba(239, 68, 68, 0.3)' : 'rgba(6, 182, 212, 0.2)'}`,
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
            {errors.description && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.description}</p>}
          </div>

          {/* Technologies */}
          <div>
            <label style={{ display: 'block', marginBottom: '12px', color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>
              Technologies Used * ({formData.technologies.length} selected)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
              {TECHNOLOGIES.map(tech => (
                <motion.button
                  key={tech}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTechnology(tech)}
                  style={{
                    padding: '10px 12px',
                    background: formData.technologies.includes(tech)
                      ? 'rgba(6, 182, 212, 0.2)'
                      : 'rgba(6, 182, 212, 0.05)',
                    border: `1px solid ${formData.technologies.includes(tech)
                      ? 'rgba(6, 182, 212, 0.4)'
                      : 'rgba(6, 182, 212, 0.1)'}`,
                    borderRadius: '6px',
                    color: formData.technologies.includes(tech) ? '#06b6d4' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 500,
                    transition: 'all 0.3s',
                  }}>
                  {tech}
                </motion.button>
              ))}
            </div>
            {errors.technologies && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '8px' }}>{errors.technologies}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>
              Project Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 31, 61, 0.5)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Live URL */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>
              Live Website/App Link *
            </label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 31, 61, 0.5)',
                border: `1px solid ${errors.liveUrl ? 'rgba(239, 68, 68, 0.3)' : 'rgba(6, 182, 212, 0.2)'}`,
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {errors.liveUrl && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.liveUrl}</p>}
          </div>

          {/* GitHub URL */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>
              GitHub Repository Link (Optional)
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 31, 61, 0.5)',
                border: `1px solid ${errors.githubUrl ? 'rgba(239, 68, 68, 0.3)' : 'rgba(6, 182, 212, 0.2)'}`,
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {errors.githubUrl && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.githubUrl}</p>}
          </div>

          {/* Featured */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                accentColor: '#06b6d4',
              }}
            />
            <label style={{ color: '#cbd5e1', fontSize: '14px', cursor: 'pointer', flex: 1 }}>
              Mark as Featured Project ⭐
            </label>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 600,
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}>
              {loading ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '12px 24px',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '8px',
                color: '#06b6d4',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}>
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default ProjectForm;
