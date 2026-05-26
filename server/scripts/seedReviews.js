// portfolio/server/scripts/seedReviews.js
// Run this script to populate dummy reviews: node scripts/seedReviews.js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Review = require('../models/Review');
const dummyReviews = require('../data/dummyReviews');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing reviews
    await Review.deleteMany({});
    console.log('Cleared existing reviews');
    
    // Insert dummy reviews with proper dates (spread across time)
    const reviewsWithDates = dummyReviews.map((review, index) => ({
      ...review,
      createdAt: new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)) // Each review 7 days apart
    }));
    
    await Review.insertMany(reviewsWithDates);
    console.log(`✅ Successfully seeded ${dummyReviews.length} dummy reviews!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
