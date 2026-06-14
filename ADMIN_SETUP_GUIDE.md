# Admin Dashboard Setup Guide

## Overview
Your portfolio now has a secure Admin Dashboard where you can manage all projects. The system uses JWT authentication with the following credentials:

**Admin Login Credentials:**
- Email: `hammadmukhtar128@gmail.com`
- Password: `Hammad@128`

## Setup Instructions

### 1. Install Dependencies
First, install all required dependencies:

```bash
npm install:all
```

Or manually install for each package:

```bash
# Root dependencies
npm install

# Client dependencies
cd client && npm install && cd ..

# Server dependencies
cd server && npm install && cd ..
```

### 2. Initialize Admin User
Run this command in the server directory to create the admin account:

```bash
cd server && npm run init-admin
```

This will create the admin account with the credentials above.

### 3. Start Development Servers
Run both servers concurrently:

```bash
npm run dev
```

Or run them separately:
- **Client**: `npm run dev:client` (http://localhost:3000)
- **Server**: `npm run dev:server` (http://localhost:5000)

### 4. Access Admin Dashboard
1. Navigate to `http://localhost:3000/admin/login`
2. Enter your credentials:
   - Email: `hammadmukhtar128@gmail.com`
   - Password: `Hammad@128`
3. Click "Login"

You'll be redirected to the Admin Dashboard at `http://localhost:3000/admin/dashboard`

## Features

### Projects Page
- Shows "Coming Soon" when no projects exist
- Displays animated coming soon message
- Automatically loads projects from the database
- Filters projects by category (Web/Mobile)

### Admin Dashboard
- **Sidebar Navigation**: Quick access to logout and add projects
- **Project Management**:
  - Add new projects
  - Edit existing projects
  - Delete projects
  - Toggle visibility (publish/hide projects)
  - Mark projects as featured

### Project Form
**Project Type:**
- Web Project
- Mobile App Project

**Project Fields:**
- Title (required)
- Description (required)
- Category (dropdown)
- Technologies (multi-select with 20+ options)
- Project Image URL (optional)
- Live Website/App Link (required)
- GitHub Repository Link (optional)
- Featured Project toggle

**Available Technologies:**
HTML, CSS, JavaScript, React, Next.js, Node.js, Express.js, MongoDB, MySQL, PHP, Laravel, Flutter, React Native, Firebase, Tailwind CSS, Bootstrap, TypeScript, Python, Django, Postgres, GraphQL, AWS, Azure

### Project Card Display
Each project card shows:
- Project image or initial placeholder
- Title and category badge
- Description
- Technologies used
- "View Project" button (opens live link in new tab)
- "GitHub" button (optional - only if GitHub link provided)

## Environment Configuration

### Server (.env)
```
MONGODB_URI=mongodb+srv://hammadmukhtar128:hammad%40128@cluster0.gkptpzg.mongodb.net/portfolio
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Projects (Public)
- `GET /api/projects` - Get all visible projects

### Projects (Admin - Protected)
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/admin/all` - Get all projects (including hidden)

## Security Features

- JWT token-based authentication
- Passwords are hashed using SHA256
- Protected routes (admin pages require login)
- Token stored in localStorage
- Admin verification on every protected route

## Database Collections

### Admin
```javascript
{
  _id: ObjectId,
  email: String,
  passwordHash: String,
  name: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  technologies: [String],
  category: String, // "Web Project" or "Mobile App Project"
  imageUrl: String,
  liveUrl: String,
  githubUrl: String,
  featured: Boolean,
  visible: Boolean,
  color: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Admin page shows "Coming Soon"
- Make sure the server is running (`npm run dev:server`)
- Check that MongoDB is connected
- Verify the API URL in client .env

### Login fails
- Verify credentials: `hammadmukhtar128@gmail.com` / `Hammad@128`
- Make sure the admin user was created: `npm run init-admin`
- Check server logs for any errors

### Projects don't appear
- Verify projects are marked as `visible: true`
- Check browser console for API errors
- Ensure client .env has correct API_URL

### CORS errors
- Verify CLIENT_URL in server .env matches your client URL
- Check that server CORS configuration includes your client URL

## Customization

### Change Admin Credentials
Edit `server/scripts/initAdmin.js` before running `init-admin`:
```javascript
const admin = new Admin({
  email: 'your-email@gmail.com',
  passwordHash: 'your-password',
  name: 'Your Name',
});
```

### Change JWT Secret
Update `JWT_SECRET` in `.env` file (change before deploying to production!)

### Add More Technologies
Edit the `TECHNOLOGIES` array in `client/src/components/ProjectForm.jsx`

## Production Deployment

1. **Change JWT_SECRET** to a strong random value
2. **Update MONGODB_URI** to production database
3. **Update CLIENT_URL** in server .env
4. **Build client**: `npm run build`
5. **Deploy** using your preferred platform (Vercel, Netlify, Heroku, etc.)

## Support
For issues or questions, refer to the respective package documentation:
- [MongoDB Docs](https://docs.mongodb.com)
- [Express Docs](https://expressjs.com)
- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
