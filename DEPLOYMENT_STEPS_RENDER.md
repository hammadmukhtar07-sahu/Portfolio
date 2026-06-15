# 🚀 RENDER DEPLOYMENT - STEP-BY-STEP GUIDE

## Prerequisites

- GitHub account with your portfolio repo
- Render account (free at render.com)
- GitHub connected to Render
- Backend code is ready (no changes needed if already updated)

---

## Step 1: Create Render Account & Connect GitHub

### 1.1 Go to Render

```
https://render.com
```

### 1.2 Sign Up / Log In

Click "Sign up" or "Log in with GitHub"
- **Recommended:** Use GitHub login (auto-connects your repos)

### 1.3 Authorize GitHub Access

When asked, click "Authorize Render" to access your repositories.

---

## Step 2: Create Backend Web Service

### 2.1 Go to Dashboard

```
Dashboard → New + → Web Service
```

### 2.2 Select Repository

1. Click "Build and deploy from a Git repository"
2. Find your portfolio repository: `your-username/portfolio`
3. Click "Connect"

---

## Step 3: Configure Web Service

### 3.1 Service Settings

Fill in the following fields:

| Field | Value | Notes |
|-------|-------|-------|
| **Name** | `portfolio-backend` | Or your choice |
| **Root Directory** | `server` | ✅ Very important! |
| **Environment** | `Node` | Auto-detected |
| **Build Command** | `npm install` | Default is fine |
| **Start Command** | `node index.js` | Must be exactly this |
| **Region** | Pick closest to users | E.g., "Oregon" for US |

### 3.2 Plan Selection

For free tier (you can upgrade later):
```
Free → Create Web Service
```

**Screenshot of Build Command:**
```
Name: portfolio-backend
Root Directory: server                ← CRITICAL
Build Command: npm install
Start Command: node index.js
```

---

## Step 4: Add Environment Variables

### 4.1 Before Clicking "Create"

Scroll down to "Environment" section.

### 4.2 Add Each Variable

Click "Add Environment Variable" and add these:

#### Variable 1: MONGODB_URI

| Field | Value |
|-------|-------|
| Key | `MONGODB_URI` |
| Value | `mongodb+srv://hammadmukhtar128:hammad%40128@cluster0.gkptpzg.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0` |

**Note:** Use your actual MongoDB Atlas connection string from `.env`

---

#### Variable 2: JWT_SECRET

| Field | Value |
|-------|-------|
| Key | `JWT_SECRET` |
| Value | `e637b22db7cf67ddc5411f761d5a84d5ed27b2bd8a8da8805e19cd7e5b1c7046bd5597ef1d62edda757c722809b7aca1148a2ec49f2f960e6e84dec51aa5640a` |

**Note:** Use your actual JWT secret from `.env` (or generate new one)

---

#### Variable 3: CLIENT_URL

| Field | Value |
|-------|-------|
| Key | `CLIENT_URL` |
| Value | `https://your-portfolio.vercel.app` |

**Note:** Use your actual Vercel frontend URL from Step 2 of Vercel deployment

---

#### Variable 4: EMAIL_USER (Optional - for contact form)

| Field | Value |
|-------|-------|
| Key | `EMAIL_USER` |
| Value | `your-gmail@gmail.com` |

---

#### Variable 5: EMAIL_PASS (Optional - for contact form)

| Field | Value |
|-------|-------|
| Key | `EMAIL_PASS` |
| Value | `your-app-password` |

**Note:** Use Gmail App Password (generated in Gmail settings)

---

#### Variable 6: EMAIL_TO (Optional - for contact form)

| Field | Value |
|-------|-------|
| Key | `EMAIL_TO` |
| Value | `hammadmukhtar128@gmail.com` |

---

#### Variable 7: PORT (Optional - Render auto-assigns)

| Field | Value |
|-------|-------|
| Key | `PORT` |
| Value | Leave empty or `3000` |

**Note:** Render automatically assigns PORT. You can leave this empty.

---

### 4.3 Environment Variables Summary

After adding all, should see:

```
✓ MONGODB_URI
✓ JWT_SECRET
✓ CLIENT_URL = https://your-portfolio.vercel.app
✓ EMAIL_USER = your-gmail@gmail.com
✓ EMAIL_PASS = your-app-password
✓ EMAIL_TO = hammadmukhtar128@gmail.com
```

---

## Step 5: Deploy Backend

### 5.1 Click "Create Web Service"

Render will now:
1. Clone your repository
2. Install dependencies
3. Start the backend server
4. Assign a public URL

**Deployment Log:**
```
Building...
$ npm install
Installing dependencies...
npm notice installed xxxxxxx packages
Built successfully!
Service started on https://portfolio-backend-xxxx.onrender.com
```

**Wait Time:** 3-5 minutes

### 5.2 Save Your Backend URL

When deployment completes, note the URL:
```
https://portfolio-backend-xxxx.onrender.com
```

**Example:**
```
https://portfolio-backend-a1b2c3d4e5f6.onrender.com
```

---

## Step 6: Test Backend API

### 6.1 Test Health Endpoint

Open in browser or terminal:

```bash
curl https://your-backend-xxxxx.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Portfolio server is running"
}
```

### 6.2 Test MongoDB Connection

```bash
curl https://your-backend-xxxxx.onrender.com/api/reviews
```

**Expected Response:**
```json
[
  {
    "_id": "...",
    "name": "...",
    "email": "...",
    "rating": 5,
    "message": "...",
    "createdAt": "..."
  }
]
```

**If MongoDB Error:**
```
MongoServerSelectionError: connect ECONNREFUSED
```
→ Check `MONGODB_URI` environment variable

---

## Step 7: Update Vercel with Backend URL

### 7.1 Go to Vercel Dashboard

```
https://vercel.com/dashboard → portfolio → Settings
```

### 7.2 Update Environment Variable

1. Click "Environment Variables"
2. Find `REACT_APP_API_URL`
3. Change the value to your Render URL:
   ```
   https://portfolio-backend-xxxxx.onrender.com/api
   ```
4. Click "Save"

### 7.3 Redeploy Frontend

1. Go to "Deployments"
2. Click "Redeploy" on latest deployment
3. Wait for build to complete (2-5 minutes)

---

## Step 8: Test Full Stack

### 8.1 Visit Frontend

```
https://your-portfolio.vercel.app
```

### 8.2 Test API Calls

**Test 1: Get Reviews**
```javascript
// In browser console (F12)
fetch('https://your-portfolio.vercel.app/api/reviews')
  .then(r => r.json())
  .then(console.log)

// Should log review data (no CORS error)
```

**Test 2: Submit Review**
1. Visit `https://your-portfolio.vercel.app`
2. Scroll to testimonials section
3. Fill out review form
4. Click submit
5. Should succeed with no errors

**Test 3: Submit Contact Form**
1. Scroll to contact section
2. Fill out contact form
3. Click submit
4. Should succeed with message

---

## Step 9: Initialize Admin Account (Backend)

### 9.1 Check Admin Credentials

In your backend logs, look for initial admin setup. If not yet initialized:

### 9.2 SSH into Render (Optional Advanced)

If you need to run scripts on Render backend:

1. Render Dashboard → portfolio-backend → Shell
2. Run:
   ```bash
   cd server
   node scripts/initAdmin.js
   ```

---

## Troubleshooting

### Problem: Backend Deployment Failed

**Check Logs:**
1. Go to Render Dashboard → portfolio-backend
2. Click "Logs"
3. Look for error messages

**Common Errors:**

#### Error: "Cannot find module"
```
Error: Cannot find module 'express'
```
**Solution:** Check Root Directory is set to `server` (not `/`)

#### Error: "ENOENT: no such file or directory"
```
Error: ENOENT: no such file or directory, open '/etc/hostname'
```
**Solution:** Render is working normally, this is not an error

#### Error: "MongoDB Connection Failed"
```
MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Check `MONGODB_URI` environment variable has correct Atlas connection string

---

### Problem: CORS Still Not Working

**Error in Browser Console:**
```
Access-Control-Allow-Origin header missing
```

**Solution:**
1. Check `CLIENT_URL` is set in Render environment
2. Verify server CORS code updated (should accept `vercel.app` domains)
3. Redeploy backend (Render Dashboard → "Clear Build Cache" → "Redeploy")
4. Wait 10 seconds then try again

---

### Problem: Cold Starts Taking Too Long

Render's free tier goes to sleep after inactivity.

**First Visit:**
- May take 30 seconds to wake up
- Subsequent visits are fast

**Solution:** 
- Upgrade to paid tier if needed
- Or keep traffic flowing (set up monitoring)

---

## Verifying Everything Works

### Checklist

Backend:
- [ ] Health endpoint returns OK
- [ ] MongoDB connects successfully
- [ ] API returns review data

Frontend ↔ Backend:
- [ ] No CORS errors in console
- [ ] Review form submits successfully
- [ ] Contact form submits successfully
- [ ] Both forms show success messages

---

## Reference

| Item | URL/Value |
|------|-----------|
| Backend URL | https://portfolio-backend-xxxxx.onrender.com |
| Render Dashboard | https://render.com/dashboard |
| Health Check | https://portfolio-backend-xxxxx.onrender.com/api/health |
| Reviews API | https://portfolio-backend-xxxxx.onrender.com/api/reviews |
| Environment Variables Needed | MONGODB_URI, JWT_SECRET, CLIENT_URL, EMAIL_USER, EMAIL_PASS |
| Build Command | `npm install` |
| Start Command | `node index.js` |

---

## ✅ Backend Deployment Complete!

Your backend is now live on Render. Your full-stack portfolio is deployed! 🎉

**Next Steps:**
1. Test both frontend and backend working together
2. Monitor logs for any errors
3. Share your portfolio: https://your-portfolio.vercel.app

**Estimated Time:** ~20 minutes
