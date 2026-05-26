// portfolio/server/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    message: {
      type: String,
      required: [true, 'Please provide a review message'],
      minlength: [10, 'Review message must be at least 10 characters'],
      maxlength: [500, 'Review message cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
