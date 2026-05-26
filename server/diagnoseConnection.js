// portfolio/server/diagnoseConnection.js
// Diagnostic tool to check MongoDB connection details

require('dotenv').config({ path: '../.env' });

console.log('\n🔍 MongoDB Connection Diagnostic\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI not found in .env');
  process.exit(1);
}

// Parse connection string
const url = new URL(MONGODB_URI);

console.log('📋 Connection String Components:');
console.log('─────────────────────────────────────────');
console.log('Protocol:', url.protocol);
console.log('Username:', url.username);
console.log('Password:', '***' + url.password.slice(-5)); // Show last 5 chars only
console.log('Hostname:', url.hostname);
console.log('Pathname:', url.pathname);
console.log('Database:', url.pathname.replace('/', '') || '(default)');
console.log('Search Params:');
url.searchParams.forEach((value, key) => {
  console.log(`  - ${key}: ${value}`);
});

console.log('\n📝 Full Connection String (masked):');
console.log('─────────────────────────────────────────');
console.log(MONGODB_URI.replace(/@.*:/g, '@***:').replace(/:.*@/, ':***@'));

console.log('\n🧪 Testing Connection...\n');

const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('');
    console.log('🎉 Your database is ready to use!');
    console.log('   You can now submit reviews without errors.');
    console.log('');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection Failed!');
    console.error('');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    console.error('');

    if (err.message.includes('authentication failed')) {
      console.error('🔐 Authentication Error - Possible issues:');
      console.error('  1. Wrong password in connection string');
      console.error('  2. MongoDB user doesn\'t exist in the cluster');
      console.error('  3. User doesn\'t have access to "portfolio" database');
      console.error('');
      console.error('✅ To fix:');
      console.error('  1. Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas');
      console.error('  2. Verify your username: hammadmukhtar128');
      console.error('  3. Verify your password: hammad@128');
      console.error('  4. Ensure user has database access');
      console.error('  5. Check IP is whitelisted (0.0.0.0/0 for all)');
    } else if (err.message.includes('getaddrinfo')) {
      console.error('🌐 Network Error - Possible issues:');
      console.error('  1. Cluster name might be wrong');
      console.error('  2. Internet connection issue');
      console.error('  3. Firewall blocking connection');
    }

    console.error('');
    process.exit(1);
  });
