#!/bin/bash
# QUICK FIX: MongoDB Atlas Connection Setup for Windows/Mac/Linux

echo ""
echo "🚀 Quick Fix: MongoDB Connection Setup"
echo "========================================"
echo ""

# Step 1: Test current connection
echo "🧪 Testing current MongoDB connection..."
cd server
node testConnection.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Great! MongoDB is already connected."
    echo "   Try submitting a review now!"
    exit 0
fi

echo ""
echo "❌ MongoDB connection failed. Here's a quick fix:"
echo ""
echo "Option 1: MongoDB Atlas (Easiest - Cloud, Free Tier)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Visit: https://www.mongodb.com/cloud/atlas"
echo "2. Sign up with your email"
echo "3. Create a FREE cluster (M0 Sandbox)"
echo "4. In Network Access, add IP: 0.0.0.0/0"
echo "5. Create a user (remember username/password)"
echo "6. Click 'Connect' → 'Drivers' → Copy connection string"
echo "7. Paste into .env file as MONGODB_URI"
echo "8. Replace <password> with your actual password"
echo "9. Add /portfolio after cluster name"
echo ""
echo "Example (after setup):"
echo "MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority"
echo ""
echo "Option 2: Local MongoDB Installation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Download: https://www.mongodb.com/try/download/community"
echo "2. Install the Community Edition"
echo "3. Start MongoDB: mongod"
echo "4. Update .env: MONGODB_URI=mongodb://localhost:27017/portfolio"
echo ""
echo "📝 Full guide in: MONGODB_SETUP_GUIDE.md"
echo ""
echo "After setup, test again with: npm run dev (in server folder)"
