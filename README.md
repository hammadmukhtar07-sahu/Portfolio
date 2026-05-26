# Hammad Mukhtar — Developer Portfolio

A modern, dark-themed full-stack portfolio built with **React.js** (frontend) and **Node.js + Express** (backend).

---

## ✨ Features

- Particle animated hero with tsparticles
- Typing animation (React Type Animation)
- Framer Motion scroll animations throughout
- Glassmorphism project cards
- Custom cursor effect (desktop)
- Animated skill progress bars
- Contact form connected to Nodemailer (real email sending)
- Fully responsive (mobile + desktop)
- Hamburger menu on mobile
- Smooth scroll navigation

---

## 📁 Folder Structure

```
portfolio/
├── client/                  # React frontend (CRA)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── data/
│   │   │   └── projects.js   ← update your project links here
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                  # Node.js + Express backend
│   ├── routes/
│   │   └── contact.js        ← Nodemailer email route
│   ├── index.js
│   └── package.json
├── .env.example             ← copy to .env and fill in
├── package.json             ← root scripts (concurrently)
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone / download the project

```bash
cd portfolio
```

### 2. Install all dependencies

```bash
npm run install:all
```

Or manually:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=hammadmukhtar128@gmail.com
```

> **Gmail App Password**: Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), generate a password for "Mail", and paste it in `EMAIL_PASS`.

### 4. Start development servers

```bash
npm run dev
```

- Frontend → [http://localhost:3000](http://localhost:3000)
- Backend → [http://localhost:5000](http://localhost:5000)

---

## 📦 Adding Your Project Links

Open `client/src/data/projects.js` and update each project's `liveUrl` and `githubUrl`:

```js
{
  id: 1,
  title: "Your Project Name",
  liveUrl: "https://your-live-demo.com",   // ← add your link
  githubUrl: "https://github.com/yourrepo", // ← add your link
  ...
}
```

To add a project thumbnail, put your image in `client/src/assets/` and replace `image: null` with:

```js
image: require('../assets/project1.png'),
```

---

## 🌐 Deployment

### Frontend (Vercel / Netlify)
```bash
cd client && npm run build
```
Deploy the `client/build/` folder.

### Backend (Railway / Render / Heroku)
Deploy the `server/` folder. Set your environment variables in the platform dashboard.

Update the `proxy` field in `client/package.json` for production:
```json
"proxy": "https://your-backend-url.com"
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Framer Motion, tsparticles |
| Styling | CSS Variables, inline styles |
| Animations | Framer Motion, React Type Animation |
| Icons | React Icons (Feather, FontAwesome) |
| HTTP | Axios |
| Backend | Node.js, Express 4 |
| Email | Nodemailer |
| Dev tools | Nodemon, Concurrently |

---

## 📞 Contact

**Hammad Mukhtar**
- Email: hammadmukhtar128@gmail.com
- Phone: +92 333 6278367
- WhatsApp: https://wa.me/923336278367

---

> Built with ❤️ © 2025 Hammad Mukhtar
