// server.js or routes/contact.js
const express = require("express");
const router = express.Router();
const { sendContactEmail } = require("./../services/email");

router.post("/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      message,
      subject = "Portfolio Contact: New message from portfolio",
    } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "Please provide all required fields",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please provide a valid email address",
      });
    }

    await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    res.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      error: "Failed to send message. Please try again later.",
    });
  }
});

module.exports = router;
