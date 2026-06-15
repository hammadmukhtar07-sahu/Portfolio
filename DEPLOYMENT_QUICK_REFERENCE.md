# 📋 DEPLOYMENT QUICK REFERENCE

## One-Page Cheat Sheet for Deployment

---

## 🔧 Code Changes Required

### 1. Create `vercel.json` in project root
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Update `client/src/services/reviewService.js`
Change from:
```javascript
const API_BASE_URL = '/api/reviews';
```
To:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = `${API_URL}/reviews`;
```

### 3. Update `client/src/components/Contact.jsx`
In `handleSubmit` function, change from:
```javascript
await axios.post('/api/contact', form);
```
To:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
await axios.post(`${API_URL}/contact`, form);
```

### 4. Remove proxy from `client/package.json`
Delete this line:
```json
"proxy": "http://localhost:5000"
```

### 5. Update `server/index.js` CORS config
Replace the CORS middleware with:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL,
  'https://your-portfolio.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || 
        origin.includes('localhost') || 
        origin.includes('vercel.app') || 
        allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
```

---

## 🚀 Deployment Steps

### Frontend (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Fix deployment issues"
   git push origin main
   ```

2. **On Vercel Dashboard**
   - Import repository: portfolio
   - Root Directory: `/` (default)
   - Build Command: `npm run build`
   - Environment Variables:
     - Add: `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`

3. **Deploy**
   - Click "Deploy" button
   - Wait 3-5 minutes

4. **Save Frontend URL**
   ```
   https://your-portfolio.vercel.app
   ```

---

### Backend (Render)

1. **On Render Dashboard**
   - New Web Service
   - Connect GitHub repository: portfolio
   - Service Settings:
     - Name: `portfolio-backend`
     - Root Directory: `server` ⚠️ IMPORTANT!
     - Build Command: `npm install`
     - Start Command: `node index.js`

2. **Add Environment Variables**
   ```
   MONGODB_URI = mongodb+srv://...
   JWT_SECRET = e637b22db...
   CLIENT_URL = https://your-portfolio.vercel.app
   EMAIL_USER = your-gmail@gmail.com
   EMAIL_PASS = your-app-password
   EMAIL_TO = hammadmukhtar128@gmail.com
   ```

3. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes

4. **Save Backend URL**
   ```
   https://portfolio-backend-xxxxx.onrender.com
   ```

---

### Connect Backend to Frontend

1. **Go to Vercel Dashboard**
   - Settings → Environment Variables
   - Edit `REACT_APP_API_URL`
   - Change to: `https://portfolio-backend-xxxxx.onrender.com/api`
   - Save

2. **Redeploy Frontend**
   - Deployments → "Redeploy"
   - Wait 2-5 minutes

---

## ✅ Verification Tests

### Frontend
```bash
curl https://your-portfolio.vercel.app/
# Should return HTML (not 404)

curl https://your-portfolio.vercel.app/projects
# Should return HTML (not 404)
```

### Backend
```bash
curl https://portfolio-backend-xxxxx.onrender.com/api/health
# Should return: {"status":"OK","message":"Portfolio server is running"}

curl https://portfolio-backend-xxxxx.onrender.com/api/reviews
# Should return: [{...review data...}]
```

### Full Stack
1. Visit: https://your-portfolio.vercel.app
2. Test routes: /about, /projects, /contact
3. Submit review form ✅
4. Submit contact form ✅
5. Check browser console (F12) for errors ❌

---

## ⚠️ Critical Checklist

- [ ] `vercel.json` created in root
- [ ] API URLs updated (reviewService, Contact)
- [ ] Proxy removed from client/package.json
- [ ] CORS updated in server/index.js
- [ ] Changes committed and pushed to GitHub
- [ ] Vercel has `REACT_APP_API_URL` environment variable
- [ ] Render has all environment variables (MongoDB, JWT, CLIENT_URL, etc.)
- [ ] Render root directory set to `server`
- [ ] Vercel updated with Render backend URL after deployment
- [ ] All routes load without 404
- [ ] No CORS errors in console
- [ ] Forms submit successfully

---

## 🆘 Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| 404 on /projects | Create/redeploy `vercel.json` |
| CORS error in console | Backend not deployed OR `CLIENT_URL` not set |
| API returns undefined | `REACT_APP_API_URL` not set in Vercel |
| MongoDB connection fails | Check `MONGODB_URI` environment variable |
| Backend won't start | Verify `Root Directory` is `server` on Render |
| Build fails: permission denied | Clear cache on Vercel & redeploy |

---

## 📱 Services Used

| Service | Purpose | URL |
|---------|---------|-----|
| Vercel | Frontend hosting | https://vercel.com |
| Render | Backend hosting | https://render.com |
| MongoDB Atlas | Database | https://cloud.mongodb.com |
| GitHub | Code repository | https://github.com |

---

**Time to Deploy:** ~40 minutes  
**Complexity:** Medium  
**Cost:** Free tier available on all services  

For detailed steps, see:
- [DEPLOYMENT_STEPS_VERCEL.md](./DEPLOYMENT_STEPS_VERCEL.md)
- [DEPLOYMENT_STEPS_RENDER.md](./DEPLOYMENT_STEPS_RENDER.md)
