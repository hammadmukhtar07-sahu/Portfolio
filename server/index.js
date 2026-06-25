// portfolio/server/index.js
// NOTE: On Railway, env vars are injected directly — dotenv is only for local dev.
// The path below intentionally loads from the repo root .env when running locally.
require('dotenv').config();
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

// ─── Startup environment validation ─────────────────────────────────────────
console.log('🚀 Portfolio backend starting...');
console.log('📦 Node version:', process.version);
console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('🔑 RESEND_API_KEY loaded:', !!process.env.RESEND_API_KEY);
console.log('📧 EMAIL_TO loaded:', process.env.EMAIL_TO || '(not set — will use hardcoded fallback)');
console.log('🗄️  MONGODB_URI loaded:', !!process.env.MONGODB_URI);
console.log('🔐 JWT_SECRET loaded:', !!process.env.JWT_SECRET);
console.log('🌐 CLIENT_URL:', process.env.CLIENT_URL || '(not set)');

if (!process.env.RESEND_API_KEY) {
  console.error('⚠️  WARNING: RESEND_API_KEY is not set. Contact form email sending will fail!');
  console.error('   → Set RESEND_API_KEY in Railway environment variables.');
}
if (!process.env.EMAIL_TO) {
  console.warn('⚠️  WARNING: EMAIL_TO is not set. Using hardcoded fallback: hammadmukhtar128@gmail.com');
}

// ─── MongoDB Connection ──────────────────────────────────────────────────────
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
    console.error('   1. MONGODB_URI is set correctly in Railway environment variables');
    console.error('   2. MongoDB Atlas allows connections from Railway IPs (allow all: 0.0.0.0/0)');
  });

// ─── CORS ────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/auth', authRoute);
app.use('/api/projects', projectsRoute);

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Portfolio server is running',
    timestamp: new Date().toISOString(),
    env: {
      resendConfigured: !!process.env.RESEND_API_KEY,
      emailTo: process.env.EMAIL_TO || 'hammadmukhtar128@gmail.com (fallback)',
      mongoConnected: mongoose.connection.readyState === 1,
    }
  });
});

// ─── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Contact test: http://localhost:${PORT}/api/contact/test`);
});
