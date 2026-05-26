// portfolio/server/testConnection.js
// Run this to test MongoDB connection: node testConnection.js

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

console.log('\n🔍 Testing MongoDB Connection...\n');
console.log('Connection String:', MONGODB_URI?.substring(0, 50) + '...');
console.log('');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📊 Database Status: Ready');
    console.log('');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Failed!');
    console.error('Error:', err.message);
    console.error('');
    console.error('💡 Solutions:');
    console.error('');
    console.error('Option 1: Use MongoDB Atlas (Cloud)');
    console.error('  1. Create account: https://www.mongodb.com/cloud/atlas');
    console.error('  2. Create a free cluster');
    console.error('  3. Get connection string (starts with mongodb+srv://)');
    console.error('  4. Update MONGODB_URI in .env file');
    console.error('');
    console.error('Option 2: Install MongoDB Locally');
    console.error('  1. Download: https://www.mongodb.com/try/download/community');
    console.error('  2. Install and run: mongod');
    console.error('  3. Update .env: MONGODB_URI=mongodb://localhost:27017/portfolio');
    console.error('');
    process.exit(1);
  });
