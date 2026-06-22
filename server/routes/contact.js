// portfolio/server/routes/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create transporter globally to reuse connection pool
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Connection Error:', error.message);
  } else {
    console.log('✅ SMTP Server is ready to take our messages');
  }
});

// POST /api/contact — send email via Nodemailer
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {

    // Mail options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `📬 New Portfolio Contact from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0a0f1e;border-radius:12px;color:#e2e8f0;">
          <h2 style="color:#06b6d4;margin-bottom:16px;">New Message from Your Portfolio</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#94a3b8;width:80px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#94a3b8;">Email</td><td style="padding:8px 0;color:#06b6d4;">${email}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#1e293b;border-radius:8px;border-left:3px solid #06b6d4;">
            <p style="margin:0;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top:16px;color:#475569;font-size:13px;">Sent from hammadmukhtar.dev portfolio contact form</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

module.exports = router;
