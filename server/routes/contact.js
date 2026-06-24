// portfolio/server/routes/contact.js
const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/contact — send email via Resend
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Default Resend test sender
      to: 'hammadmukhtar128@gmail.com', // Target email requested by user
      reply_to: email,
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
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }

    console.log('✅ Email sent successfully via Resend. ID:', data?.id);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (err) {
    console.error('Unexpected error in contact route:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
});

module.exports = router;
