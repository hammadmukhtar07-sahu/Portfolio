// portfolio/client/src/services/reviewService.js
import axios from 'axios';

const API_BASE_URL = '/api/reviews';

const reviewService = {
  // Fetch all reviews
  getAllReviews: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // Submit a new review
  submitReview: async (reviewData) => {
    try {
      const response = await axios.post(API_BASE_URL, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error.response?.data || error;
    }
  }
};

export default reviewService;
