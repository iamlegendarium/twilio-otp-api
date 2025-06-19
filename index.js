const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const twilio = require("twilio");

app.use(express.json());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    res.status(200).json({ message: "OTP sent", sid: verification.sid });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
  const { phoneNumber, code } = req.body;

  if (!phoneNumber || !code) {
    return res.status(400).json({ error: "Phone number and code are required" });
  }

  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phoneNumber,
        code,
      });

    if (verificationCheck.status === "approved") {
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(401).json({ error: "Invalid or expired OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
