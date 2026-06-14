// portfolio/server/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
    },
    category: {
      type: String,
      enum: ['Web Project', 'Mobile App Project'],
      required: [true, 'Project category is required'],
    },
    imageUrl: {
      type: String,
      default: null,
    },
    liveUrl: {
      type: String,
      required: [true, 'Live URL is required'],
    },
    githubUrl: {
      type: String,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '#06b6d4',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
