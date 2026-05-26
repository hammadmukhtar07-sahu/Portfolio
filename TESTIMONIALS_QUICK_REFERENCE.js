// portfolio/client/src/components/Testimonials.jsx - QUICK REFERENCE
/**
 * TESTIMONIALS COMPONENT
 * 
 * Main review display section for the portfolio homepage.
 * 
 * Features:
 * - Fetches reviews from /api/reviews endpoint
 * - Displays reviews in paginated grid (6 per page)
 * - Shows average rating and total review count
 * - Skeleton loading animation
 * - Review form embedded in section
 * - Responsive design (desktop, tablet, mobile)
 * 
 * Usage:
 * import Testimonials from './components/Testimonials';
 * <Testimonials />
 */

// portfolio/client/src/components/ReviewCard.jsx - QUICK REFERENCE
/**
 * REVIEW CARD COMPONENT
 * 
 * Individual review card with:
 * - Client avatar (auto-generated)
 * - Star rating (1-5)
 * - Client name & company
 * - Review message with quote styling
 * - Submission date
 * - Hover animations
 * 
 * Props:
 * - review: Review object from API
 * - index: Card index for staggered animation
 * 
 * Usage:
 * <ReviewCard review={review} index={0} />
 */

// portfolio/client/src/components/ReviewForm.jsx - QUICK REFERENCE
/**
 * REVIEW FORM COMPONENT
 * 
 * Form for submitting new reviews with:
 * - Name, Email, Company, Rating, Message inputs
 * - Star rating selector (1-5)
 * - Character counter (0-500)
 * - Real-time validation
 * - Loading and success states
 * - Error handling
 * 
 * Props:
 * - onSuccess: Callback after successful submission
 * - onClose: Callback to close the form
 * 
 * Usage:
 * <ReviewForm 
 *   onSuccess={() => fetchReviews()}
 *   onClose={() => setShowForm(false)}
 * />
 */

// portfolio/client/src/components/ReviewModal.jsx - QUICK REFERENCE
/**
 * REVIEW MODAL COMPONENT
 * 
 * Auto-popup modal that appears after 120 seconds.
 * 
 * Features:
 * - Shows once per session using sessionStorage
 * - Dark overlay with blur backdrop
 * - Smooth scale + fade animations
 * - ESC key support
 * - Shows review form on demand
 * - Non-intrusive "Maybe Later" option
 * 
 * Usage:
 * <ReviewModal />
 * 
 * No props needed - manages own state
 */

// portfolio/server/routes/reviews.js - QUICK REFERENCE
/**
 * REVIEW API ROUTES
 * 
 * GET /api/reviews
 * - Fetches all reviews sorted by newest first
 * - Returns: { success, count, averageRating, reviews }
 * 
 * POST /api/reviews
 * - Submits new review
 * - Validates input on backend
 * - Returns: { success, message, review }
 * 
 * Validation:
 * - Required: name, email, rating, message
 * - Optional: company
 * - Email: valid format required
 * - Rating: 1-5
 * - Message: 10-500 characters
 */

// portfolio/server/models/Review.js - QUICK REFERENCE
/**
 * REVIEW MONGODB SCHEMA
 * 
 * Fields:
 * - name: String, required, max 50 chars
 * - email: String, required, valid email
 * - company: String, optional, max 100 chars
 * - rating: Number, required, 1-5
 * - message: String, required, 10-500 chars
 * - createdAt: Date, auto-generated
 * - updatedAt: Date, auto-generated
 * 
 * Indexes: Email
 * Validation: Built-in mongoose validators
 */

// portfolio/client/src/services/reviewService.js - QUICK REFERENCE
/**
 * REVIEW API SERVICE
 * 
 * Axios-based service for API calls
 * 
 * Methods:
 * - getAllReviews(): Fetches all reviews
 * - submitReview(data): Submits new review
 * 
 * Usage:
 * import reviewService from '../services/reviewService';
 * 
 * const data = await reviewService.getAllReviews();
 * const result = await reviewService.submitReview(formData);
 */

export const QUICK_SETUP_CHECKLIST = [
  '✅ npm install mongoose (in /server)',
  '✅ Update .env with MONGODB_URI',
  '✅ npm run seed (to populate dummy reviews)',
  '✅ npm run dev (server)',
  '✅ npm start (client)',
  '✅ Visit http://localhost:3000',
  '✅ Testimonials visible on homepage',
  '✅ Modal appears after 120 seconds',
  '✅ Submit a test review',
  '✅ Verify it appears in the list'
];

export const TROUBLESHOOTING_GUIDE = {
  'No reviews showing': {
    cause: 'MongoDB not connected',
    solution: 'Check .env MONGODB_URI and start MongoDB service'
  },
  'Form submission fails': {
    cause: 'Validation errors',
    solution: 'Check console errors, ensure email format is valid'
  },
  'Modal not appearing': {
    cause: 'sessionStorage dismissal or JavaScript error',
    solution: 'Clear browser storage, check console for errors'
  },
  'API endpoint 404': {
    cause: 'Routes not loaded in server',
    solution: 'Verify reviews route is added to server/index.js'
  }
};

export const CUSTOMIZATION_OPTIONS = {
  'Change popup timing': 'ReviewModal.jsx line ~42 (120000ms)',
  'Change items per page': 'Testimonials.jsx line ~17 (ITEMS_PER_PAGE = 6)',
  'Modify dummy reviews': 'server/data/dummyReviews.js',
  'Change colors': 'client/src/index.css root variables',
  'Adjust animations': 'Individual components framer-motion props'
};
