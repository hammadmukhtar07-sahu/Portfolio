// portfolio/server/scripts/initAdmin.js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const initAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🔌 Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'hammadmukhtar128@gmail.com' });

    if (existingAdmin) {
      console.log('✅ Admin account already exists');
      process.exit(0);
    }

    // Create admin account
    const admin = new Admin({
      email: 'hammadmukhtar128@gmail.com',
      passwordHash: 'Hammad@128',
      name: 'Hammad Mukhtar',
      isActive: true,
    });

    await admin.save();
    console.log('✅ Admin account created successfully!');
    console.log('📧 Email: hammadmukhtar128@gmail.com');
    console.log('🔐 Password: Hammad@128');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

initAdmin();
