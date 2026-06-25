// portfolio/server/routes/contact.js
const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

// ─── Resend client (always use env var — NEVER hardcode the key) ───────────
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── GET /api/contact/test — smoke-test email sending ─────────────────────
router.get('/test', async (req, res) => {
  const to = process.env.EMAIL_TO;
  console.log('🧪 [TEST] Contact test endpoint hit');
  console.log('🧪 [TEST] RESEND_API_KEY loaded:', !!process.env.RESEND_API_KEY);
  console.log('🧪 [TEST] EMAIL_TO:', to);

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      success: false,
      error: 'RESEND_API_KEY is not set on this server.',
    });
  }
  if (!to) {
    return res.status(500).json({
      success: false,
      error: 'EMAIL_TO is not set on this server.',
    });
  }

  try {
    console.log('🧪 [TEST] Sending test email via Resend...');
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to,
      subject: '🧪 Portfolio Contact Form — Test Email',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0a0f1e;border-radius:12px;color:#e2e8f0;">
          <h2 style="color:#06b6d4;margin-bottom:16px;">✅ Test Email — Success</h2>
          <p>This is a test email triggered by <code>GET /api/contact/test</code>.</p>
          <p>If you received this, your Resend integration is working correctly.</p>
          <p style="color:#475569;font-size:13px;margin-top:20px;">Sent from hammadmukhtar.dev contact pipeline</p>
        </div>
      `,
    });

    if (error) {
      console.error('🧪 [TEST] Resend error:', JSON.stringify(error, null, 2));
      return res.status(500).json({
        success: false,
        error: 'Resend returned an error.',
        resendError: error,
      });
    }

    console.log('🧪 [TEST] Test email sent successfully. ID:', data?.id);
    return res.status(200).json({
      success: true,
      message: 'Test email sent successfully!',
      resendResponse: data,
    });
  } catch (err) {
    console.error('🧪 [TEST] Unexpected error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Unexpected error during test.',
      detail: err.message,
    });
  }
});

// ─── POST /api/contact — send contact form email via Resend ───────────────
router.post('/', async (req, res) => {
  console.log('📬 [CONTACT] Request received');

  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    console.warn('📬 [CONTACT] Validation failed — missing fields');
    return res.status(400).json({ error: 'All fields are required.' });
  }
  console.log('📬 [CONTACT] Validation passed — name:', name, '| email:', email);

  // Guard: ensure env vars are present
  if (!process.env.RESEND_API_KEY) {
    console.error('📬 [CONTACT] ❌ RESEND_API_KEY is not set — cannot send email');
    return res.status(500).json({ error: 'Email service is not configured. Please contact me directly.' });
  }

  const toEmail = process.env.EMAIL_TO || 'hammadmukhtar128@gmail.com';
  console.log('📬 [CONTACT] Sending to:', toEmail);

  try {
    console.log('📬 [CONTACT] Calling Resend API...');
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: toEmail,
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

    console.log('📬 [CONTACT] Resend response received:', JSON.stringify({ data, error }, null, 2));

    if (error) {
      console.error('📬 [CONTACT] ❌ Resend API error:', JSON.stringify(error, null, 2));
      return res.status(500).json({
        error: `Email delivery failed: ${error.message || JSON.stringify(error)}`,
      });
    }

    console.log('📬 [CONTACT] ✅ Email sent successfully. ID:', data?.id);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (err) {
    console.error('📬 [CONTACT] ❌ Unexpected error:', err.message);
    console.error('📬 [CONTACT] Stack:', err.stack);
    return res.status(500).json({
      error: `Unexpected server error: ${err.message}`,
    });
  }
});

module.exports = router;
