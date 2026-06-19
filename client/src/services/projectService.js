// portfolio/client/src/services/projectService.js
const API_URL = process.env.REACT_APP_API_URL;

export const projectService = {
  // Get all visible projects
  getPublicProjects: async () => {
    try {
      const response = await fetch(`${API_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get single project
  getProject: async (id) => {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`);
      if (!response.ok) throw new Error('Failed to fetch project');
      return await response.json();
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  // Admin: Get all projects (including hidden)
  getAllProjects: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_URL}/projects/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch projects');
      return await response.json();
    } catch (error) {
      console.error('Error fetching all projects:', error);
      throw error;
    }
  },

  // Admin: Create project
  createProject: async (projectData) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create project');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Admin: Update project
  updateProject: async (id, projectData) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update project');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Admin: Delete project
  deleteProject: async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete project');
      return await response.json();
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },
};

export default projectService;
