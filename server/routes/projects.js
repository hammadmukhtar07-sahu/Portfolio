// portfolio/server/routes/projects.js
const express = require('express');
const Project = require('../models/Project');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all visible projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ visible: true }).sort({ featured: -1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// Get all projects for admin (including hidden ones) - Must be before /:id route
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project' });
  }
});

// Create new project (admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, technologies, category, imageUrl, liveUrl, githubUrl, featured } = req.body;

    // Validate required fields
    if (!title || !description || !technologies || !category || !liveUrl) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const project = new Project({
      title,
      description,
      technologies,
      category,
      imageUrl: imageUrl || null,
      liveUrl,
      githubUrl: githubUrl || null,
      featured: featured || false,
      visible: true,
      color: ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 4)],
    });

    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project' });
  }
});

// Update project (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, technologies, category, imageUrl, liveUrl, githubUrl, featured, visible } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (technologies) project.technologies = technologies;
    if (category) project.category = category;
    if (imageUrl) project.imageUrl = imageUrl;
    if (liveUrl) project.liveUrl = liveUrl;
    if (githubUrl) project.githubUrl = githubUrl;
    if (featured !== undefined) project.featured = featured;
    if (visible !== undefined) project.visible = visible;

    await project.save();
    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project' });
  }
});

// Delete project (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
});

module.exports = router;
