#!/bin/bash
# QUICK START GUIDE - Testimonials & Reviews System
# Run this to get your testimonials system up and running!

echo "🚀 Starting Portfolio Testimonials Setup..."
echo ""

# Step 1: Install Backend Dependencies
echo "📦 Step 1: Installing backend dependencies..."
cd server
npm install mongoose
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Step 2: Check MongoDB Connection
echo "🔌 Step 2: Checking MongoDB..."
echo "Make sure MongoDB is running:"
echo "  - Local: mongod"
echo "  - Atlas: Update MONGODB_URI in .env"
echo ""
read -p "Is MongoDB running? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️  Please start MongoDB and run this script again"
    exit 1
fi
echo ""

# Step 3: Seed dummy reviews
echo "🌱 Step 3: Seeding dummy reviews..."
npm run seed
if [ $? -eq 0 ]; then
    echo "✅ Dummy reviews added successfully"
else
    echo "❌ Failed to seed reviews"
fi
echo ""

# Step 4: Start backend
echo "🔧 Step 4: Starting backend server..."
echo "Run this command in another terminal:"
echo "  npm run dev"
echo ""

# Step 5: Start frontend
echo "⚛️  Step 5: Starting frontend..."
cd ../client
echo "Run this command in another terminal:"
echo "  npm start"
echo ""

echo "📝 Documentation:"
echo "  - Setup Guide: ../TESTIMONIALS_SETUP.md"
echo "  - Architecture: ../ARCHITECTURE.md"
echo "  - Quick Reference: ../TESTIMONIALS_QUICK_REFERENCE.js"
echo ""

echo "🎉 Setup complete! Open http://localhost:3000"
echo ""
echo "What to test:"
echo "  1. Visit homepage - see testimonials section"
echo "  2. Wait 120 seconds - auto-popup appears"
echo "  3. Click 'Leave a Review' - form opens"
echo "  4. Fill and submit form - review added instantly"
echo "  5. Check pagination - navigate through reviews"
echo ""
echo "💡 Tip: Check TESTIMONIALS_SETUP.md for customization options"
