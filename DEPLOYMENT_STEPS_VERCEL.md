# 🚀 VERCEL DEPLOYMENT - STEP-BY-STEP GUIDE

## Prerequisites

- GitHub account with your portfolio repo
- Vercel account (free at vercel.com)
- Code changes applied (vercel.json, API URL fixes)
- Changes committed and pushed to GitHub

---

## Step 1: Prepare Local Repository

### 1.1 Verify all fixes are applied

```bash
cd portfolio
git status
```

Should show changes to:
- ✅ `vercel.json` (new file)
- ✅ `client/src/services/reviewService.js` (updated API URL)
- ✅ `client/src/components/Contact.jsx` (updated API URL)
- ✅ `client/package.json` (proxy removed)

### 1.2 Commit changes

```bash
git add .
git commit -m "Fix: Configure API URLs and vercel.json for deployment"
git push origin main
```

**Expected Output:**
```
remote: Resolving deltas: 100% (4/4), done.
To github.com:your-username/portfolio.git
   xxxxxxx..xxxxxxx  main -> main
```

---

## Step 2: Create Vercel Project

### 2.1 Go to Vercel Dashboard

```
https://vercel.com/dashboard
```

### 2.2 Click "Add New..."

```
Dashboard → Add New → Project
```

### 2.3 Import Git Repository

1. Click "Import Project"
2. Paste GitHub repository URL:
   ```
   https://github.com/your-username/portfolio
   ```
3. Click "Continue"

### 2.4 Configure Project Settings

| Setting | Value |
|---------|-------|
| Project Name | `portfolio` (or your choice) |
| Root Directory | Leave as `/` (default) |
| Framework Preset | React |
| Build Command | `npm run build` |
| Output Directory | `client/build` |
| Install Command | `npm install && cd client && npm install && cd ../server && npm install` |

**Screenshot Guide:**
```
Framework Preset: 
  ↓ Detect "React" automatically

Root Directory:
  ↓ Remains "/"

Build Command:
  ↓ Show "npm run build" (correct)

Install Command:
  ↓ Change to: npm install && cd client && npm install && cd ../server && npm install
```

---

## Step 3: Configure Environment Variables on Vercel

### 3.1 Before Clicking Deploy...

In Vercel dashboard, look for "Environment Variables" section.

### 3.2 Add Environment Variables

Click "Add Environment Variable" for each:

#### Variable #1: REACT_APP_API_URL

| Field | Value |
|-------|-------|
| Name | `REACT_APP_API_URL` |
| Value | `https://your-backend.onrender.com/api` |
| Environments | Production, Preview, Development |

**Note:** Replace `your-backend` with your actual Render backend URL (you'll get this after deploying backend to Render)

#### Variable #2: NODE_ENV (Optional but recommended)

| Field | Value |
|-------|-------|
| Name | `NODE_ENV` |
| Value | `production` |
| Environments | Production |

### 3.3 Result

Environment Variables section should show:
```
✓ REACT_APP_API_URL = https://your-backend.onrender.com/api (Production, Preview, Development)
✓ NODE_ENV = production (Production)
```

---

## Step 4: Deploy Frontend

### 4.1 Click "Deploy"

In Vercel configuration page, scroll down and click the blue "Deploy" button.

**Deployment Process:**
```
✓ Building project...
✓ Installing dependencies...
✓ Building React application...
✓ Generating optimized production build...
✓ Uploading artifacts...
✓ Finalizing deployment...
```

**Wait Time:** 2-5 minutes

### 4.2 Deployment Complete!

You'll see:
```
✅ Production | Created | Automatic
🎉 https://your-portfolio.vercel.app
```

Save your URL: **`https://your-portfolio.vercel.app`**

---

## Step 5: Test Frontend Deployment

### 5.1 Visit Your Site

```
https://your-portfolio.vercel.app
```

### 5.2 Test Routes (Should NOT show 404)

- ✅ `https://your-portfolio.vercel.app/` - Home page
- ✅ `https://your-portfolio.vercel.app/about` - About section
- ✅ `https://your-portfolio.vercel.app/projects` - Projects page
- ✅ `https://your-portfolio.vercel.app/contact` - Contact section
- ✅ `https://your-portfolio.vercel.app/admin/login` - Admin login

**If you see 404:** Redeploy with new `vercel.json`

### 5.3 Test Console for Errors

1. Open `https://your-portfolio.vercel.app`
2. Press `F12` (or Cmd+Option+I on Mac)
3. Click "Console" tab
4. Look for errors like:
   ```
   ❌ CORS error
   ❌ Network error
   ❌ Cannot GET /api/reviews
   ```

**If you see CORS errors:** Backend hasn't been deployed yet (see DEPLOYMENT_STEPS_RENDER.md)

---

## Step 6: Connect Vercel to Render Backend

### 6.1 Deploy Backend First!

Before testing API calls, deploy backend to Render:
→ Follow [DEPLOYMENT_STEPS_RENDER.md](./DEPLOYMENT_STEPS_RENDER.md)

### 6.2 Update Vercel Environment Variable

Once Render backend is live:

1. Go to Vercel Dashboard → Portfolio → Settings → Environment Variables
2. Find `REACT_APP_API_URL`
3. Update the value:
   ```
   https://your-backend-xxxxx.onrender.com/api
   ```
4. Click "Save"

### 6.3 Trigger Redeploy

1. Go to Vercel Dashboard → Portfolio → Deployments
2. Find latest deployment
3. Click "Redeploy"

**Wait for redeploy:** 2-5 minutes

### 6.4 Test API Calls

After redeploy completes:

1. Visit `https://your-portfolio.vercel.app`
2. Submit a review form - should work
3. Submit contact form - should work
4. Check console (F12) for errors

---

## Troubleshooting

### Problem: Still Seeing 404 on Routes

**Cause:** `vercel.json` not deployed

**Solution:**
1. Verify `vercel.json` exists in root
2. Commit and push: `git add . && git commit -m "Add vercel.json" && git push`
3. In Vercel: Click "Redeploy"

**Test Command:**
```bash
curl https://your-portfolio.vercel.app/projects
# Should NOT return 404
```

---

### Problem: CORS Errors in Console

**Error Message:**
```
Access to XMLHttpRequest at 'https://your-backend...' 
from origin 'https://your-portfolio.vercel.app' 
has been blocked by CORS policy
```

**Cause:** Backend CORS not configured

**Solution:**
1. Check backend is deployed to Render
2. Verify server CORS configuration has been updated
3. Backend needs `CLIENT_URL=https://your-portfolio.vercel.app`
4. Wait 5-10 minutes after deploy for propagation

---

### Problem: Environment Variable Not Working

**Test:**
```javascript
// In browser console
console.log(process.env.REACT_APP_API_URL)
// Should output: https://your-backend.onrender.com/api
// If undefined, var not set on Vercel
```

**Solution:**
1. Go to Vercel Settings → Environment Variables
2. Verify `REACT_APP_API_URL` exists
3. Click "Redeploy" (env vars only apply at build time)

---

### Problem: Build Fails with "react-scripts: Permission denied"

**Cause:** node_modules corrupted

**Solution:**
1. Go to Vercel Dashboard → Settings → Git
2. Click "Clear Build Cache"
3. Click "Redeploy"

Vercel will reinstall all dependencies fresh.

---

## Verifying Everything Works

### Checklist

- [ ] Site loads without 404 errors on all routes
- [ ] `/about`, `/projects`, `/contact` routes work
- [ ] Admin login page loads (`/admin/login`)
- [ ] No errors in browser console (F12)
- [ ] Contact form submits successfully
- [ ] Review form submits successfully

### Final Test

```bash
# Test from terminal
curl https://your-portfolio.vercel.app/
# Should return HTML content (not 404)

curl https://your-portfolio.vercel.app/api/health
# Should NOT work (not on Vercel, on Render backend instead)
```

---

## Reference

| Item | URL/Value |
|------|-----------|
| Frontend URL | https://your-portfolio.vercel.app |
| Vercel Dashboard | https://vercel.com/dashboard |
| Git Repository | https://github.com/your-username/portfolio |
| Environment Variable Needed | `REACT_APP_API_URL` |
| Build Command | `npm run build` |
| Next Step | Deploy backend to Render |

---

## ✅ Deployment Complete!

Your frontend is now live on Vercel. Next:
→ Deploy backend to Render: [DEPLOYMENT_STEPS_RENDER.md](./DEPLOYMENT_STEPS_RENDER.md)

**Estimated Time:** ~15 minutes
