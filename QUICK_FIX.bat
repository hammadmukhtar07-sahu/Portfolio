@echo off
REM QUICK FIX: MongoDB Atlas Connection Setup

echo.
echo 🚀 Quick Fix: MongoDB Connection Setup
echo ========================================
echo.

REM Test current connection
echo 🧪 Testing current MongoDB connection...
cd server
node testConnection.js

if %errorlevel% equ 0 (
    echo.
    echo ✅ Great! MongoDB is already connected.
    echo    Try submitting a review now!
    exit /b 0
)

echo.
echo ❌ MongoDB connection failed. Here's a quick fix:
echo.
echo Option 1: MongoDB Atlas [EASIEST - Cloud, Free]
echo ================================================
echo 1. Visit: https://www.mongodb.com/cloud/atlas
echo 2. Sign up with your email
echo 3. Create a FREE cluster (M0 Sandbox)
echo 4. In Network Access, add IP: 0.0.0.0/0
echo 5. Create a user and save username/password
echo 6. Click 'Connect' → 'Drivers' → Copy connection string
echo 7. Edit .env file and paste as MONGODB_URI
echo 8. Replace ^<password^> with your actual password
echo 9. Add /portfolio after cluster name
echo.
echo Example:
echo MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/portfolio?retryWrites=true^&w=majority
echo.
echo Option 2: Local MongoDB Installation
echo ====================================
echo 1. Download: https://www.mongodb.com/try/download/community
echo 2. Install Community Edition
echo 3. Run: mongod (in another terminal)
echo 4. Edit .env: MONGODB_URI=mongodb://localhost:27017/portfolio
echo.
echo 📝 Full guide: MONGODB_SETUP_GUIDE.md
echo.
echo After setup, restart both servers:
echo   - Terminal 1: npm run dev (in server folder)
echo   - Terminal 2: npm start (in client folder)
echo.
