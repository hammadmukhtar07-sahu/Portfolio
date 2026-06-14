// portfolio/client/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';
import authService from '../services/authService';
import projectService from '../services/projectService';
import ProjectForm from '../components/ProjectForm';
import '../styles/admin.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (id) => {
    if (globalThis.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter(p => p._id !== id));
        showNotification('Project deleted successfully');
      } catch (err) {
        console.error('Delete error:', err);
        setError('Failed to delete project');
      }
    }
  };

  const handleToggleVisibility = async (id, currentVisible) => {
    try {
      const project = projects.find(p => p._id === id);
      await projectService.updateProject(id, { ...project, visible: !currentVisible });
      setProjects(projects.map(p => 
        p._id === id ? { ...p, visible: !currentVisible } : p
      ));
      showNotification(`Project ${!currentVisible ? 'published' : 'hidden'}`);
    } catch (err) {
      setError('Failed to update project visibility');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProject) {
        await projectService.updateProject(editingProject._id, formData);
        setProjects(projects.map(p => 
          p._id === editingProject._id ? { ...p, ...formData } : p
        ));
        showNotification('Project updated successfully');
      } else {
        const newProject = await projectService.createProject(formData);
        setProjects([...projects, newProject.project]);
        showNotification('Project created successfully');
      }
      setShowForm(false);
      setEditingProject(null);
    } catch (err) {
      setError(err.message || 'Failed to save project');
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredProjects = filterCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === filterCategory);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1f3d 0%, #1a2b4d 100%)',
      color: '#e2e8f0',
      display: 'flex',
    }}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        style={{
          width: '250px',
          background: 'rgba(15, 31, 61, 0.9)',
          borderRight: '1px solid rgba(6, 182, 212, 0.1)',
          padding: '30px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
        <h2 style={{ color: '#06b6d4', fontSize: '18px', fontWeight: 700 }}>
          Portfolio Admin
        </h2>
        <div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>LOGGED IN AS</p>
          <p style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: 500 }}>
            {authService.getUser()?.email}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddProject}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px',
          }}>
          <FiPlus size={18} /> Add Project
        </motion.button>
        <div style={{ flex: 1 }} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            color: '#fca5a5',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px',
          }}>
          <FiLogOut size={18} /> Logout
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        {/* Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
                color: '#86efac',
                fontSize: '14px',
              }}>
              ✓ {notification}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
                color: '#fca5a5',
                fontSize: '14px',
              }}>
              ✗ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: '#06b6d4' }}>
            Projects Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Manage and organize your portfolio projects
          </p>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
          {['All', 'Web Project', 'Mobile App Project'].map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '8px 16px',
                background: filterCategory === cat 
                  ? 'rgba(6, 182, 212, 0.2)' 
                  : 'rgba(6, 182, 212, 0.05)',
                border: `1px solid ${filterCategory === cat 
                  ? 'rgba(6, 182, 212, 0.4)' 
                  : 'rgba(6, 182, 212, 0.1)'}`,
                borderRadius: '6px',
                color: filterCategory === cat ? '#06b6d4' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500,
                transition: 'all 0.3s',
              }}>
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <ProjectForm
              project={editingProject}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingProject(null);
              }}
            />
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#94a3b8' }}>Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(15, 31, 61, 0.5)',
            borderRadius: '12px',
            border: '1px solid rgba(6, 182, 212, 0.1)',
          }}>
            <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '10px' }}>
              No projects yet
            </p>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Click "Add Project" to create your first portfolio project
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px',
          }}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                style={{
                  background: 'rgba(15, 31, 61, 0.5)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0', flex: 1 }}>
                      {project.title}
                    </h3>
                    <span style={{
                      padding: '4px 8px',
                      background: 'rgba(139, 92, 246, 0.2)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: '#d8b4fe',
                      fontWeight: 600,
                    }}>
                      {project.category === 'Web Project' ? '🌐 Web' : '📱 App'}
                    </span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.5 }}>
                    {project.description.substring(0, 80)}...
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} style={{
                      padding: '3px 8px',
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      borderRadius: '4px',
                      fontSize: '11px',
                      color: '#06b6d4',
                    }}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span style={{
                      padding: '3px 8px',
                      fontSize: '11px',
                      color: '#94a3b8',
                    }}>
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                  {project.featured && (
                    <span style={{
                      padding: '4px 8px',
                      background: 'rgba(249, 158, 11, 0.1)',
                      color: '#fbbf24',
                      borderRadius: '4px',
                    }}>
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditProject(project)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'rgba(6, 182, 212, 0.15)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      borderRadius: '6px',
                      color: '#06b6d4',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}>
                    <FiEdit2 size={14} /> Edit
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleToggleVisibility(project._id, project.visible)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: project.visible 
                        ? 'rgba(16, 185, 129, 0.15)' 
                        : 'rgba(107, 114, 128, 0.15)',
                      border: project.visible 
                        ? '1px solid rgba(16, 185, 129, 0.2)' 
                        : '1px solid rgba(107, 114, 128, 0.2)',
                      borderRadius: '6px',
                      color: project.visible ? '#10b981' : '#9ca3af',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}>
                    {project.visible ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteProject(project._id)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '6px',
                      color: '#f87171',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}>
                    <FiTrash2 size={14} /> Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
