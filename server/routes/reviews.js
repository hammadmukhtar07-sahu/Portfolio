// portfolio/server/routes/reviews.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');

// Validation middleware
const validateReview = (req, res, next) => {
  const { name, email, rating, message } = req.body;
  
  if (!name || !email || !rating || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0) {
    return res.status(400).json({ error: 'Fields cannot be empty' });
  }
  
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Review must be at least 10 characters' });
  }
  
  if (message.trim().length > 500) {
    return res.status(400).json({ error: 'Review cannot exceed 500 characters' });
  }
  
  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }
  
  next();
};

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(100);
    
    const averageRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;
    
    res.json({
      success: true,
      count: reviews.length,
      averageRating,
      reviews
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews', message: error.message });
  }
});

// POST a new review
router.post('/', validateReview, async (req, res) => {
  try {
    const { name, email, company, rating, message } = req.body;
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: 'Database connection failed. Please try again later.',
        debug: 'MongoDB is not connected'
      });
    }
    
    const review = new Review({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || '',
      rating: parseInt(rating),
      message: message.trim()
    });
    
    await review.save();
    
    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      review
    });
  } catch (error) {
    console.error('❌ Review save error:', error);
    res.status(500).json({ 
      error: 'Failed to save review. Please try again.',
      message: error.message 
    });
  }
});

module.exports = router;
