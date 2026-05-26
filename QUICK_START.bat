@echo off
REM QUICK START GUIDE - Testimonials & Reviews System
REM Windows Batch Version

echo.
echo 🚀 Starting Portfolio Testimonials Setup...
echo.

REM Step 1: Install Backend Dependencies
echo 📦 Step 1: Installing backend dependencies...
cd server
call npm install mongoose
if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo.

REM Step 2: MongoDB Check
echo 🔌 Step 2: Checking MongoDB...
echo Make sure MongoDB is running:
echo   - Local: mongod
echo   - Atlas: Update MONGODB_URI in .env
echo.
set /p mongo_running="Is MongoDB running? (y/n): "
if /i not "%mongo_running%"=="y" (
    echo ⚠️  Please start MongoDB and run this script again
    exit /b 1
)
echo.

REM Step 3: Seed dummy reviews
echo 🌱 Step 3: Seeding dummy reviews...
call npm run seed
if %errorlevel% equ 0 (
    echo ✅ Dummy reviews added successfully
) else (
    echo ❌ Failed to seed reviews
)
echo.

REM Step 4: Start backend
echo 🔧 Step 4: Starting backend server...
echo Run this command in another terminal:
echo   npm run dev
echo.

REM Step 5: Start frontend
echo ⚛️  Step 5: Starting frontend...
cd ..\client
echo Run this command in another terminal:
echo   npm start
echo.

echo 📝 Documentation:
echo   - Setup Guide: ..\TESTIMONIALS_SETUP.md
echo   - Architecture: ..\ARCHITECTURE.md
echo   - Quick Reference: ..\TESTIMONIALS_QUICK_REFERENCE.js
echo.

echo 🎉 Setup complete! Open http://localhost:3000
echo.
echo What to test:
echo   1. Visit homepage - see testimonials section
echo   2. Wait 120 seconds - auto-popup appears
echo   3. Click 'Leave a Review' - form opens
echo   4. Fill and submit form - review added instantly
echo   5. Check pagination - navigate through reviews
echo.
echo 💡 Tip: Check TESTIMONIALS_SETUP.md for customization options
