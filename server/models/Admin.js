// portfolio/server/models/Admin.js
const mongoose = require('mongoose');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      default: 'Admin',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre('save', function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = crypto
    .createHash('sha256')
    .update(this.passwordHash)
    .digest('hex');
  next();
});

// Method to verify password
adminSchema.methods.verifyPassword = function (password) {
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
  return this.passwordHash === hashedPassword;
};

module.exports = mongoose.model('Admin', adminSchema);
