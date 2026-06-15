// portfolio/server/index.js
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoute = require('./routes/contact');
const reviewsRoute = require('./routes/reviews');
const authRoute = require('./routes/auth');
const projectsRoute = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('📝 Make sure:');
    console.error('   1. MongoDB is running (mongod)');
    console.error('   2. Or update MONGODB_URI in .env to MongoDB Atlas');
    console.error('   3. Connection string: mongodb+srv://username:password@cluster.mongodb.net/portfolio');
  });

// Middleware
// Allow both local development and deployed frontend
const allowedOrigins = [
  'http://localhost:3000',           // Local development
  process.env.CLIENT_URL,             // Environment variable (e.g., Vercel frontend)
  'https://your-portfolio.vercel.app' // Fallback/backup
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function(origin, callback) {
    // Allow localhost, any Vercel URL, or requests without origin (mobile apps, Postman)
    if (!origin || 
        origin.includes('localhost') || 
        origin.includes('vercel.app') || 
        allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/contact', contactRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/auth', authRoute);
app.use('/api/projects', projectsRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
