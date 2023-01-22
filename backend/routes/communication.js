const express = require("express");
const router = express.Router();
// const User = require("../models/User");
// const Task = require("../models/Task");
const sgMail = require("@sendgrid/mail");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config({ path: "./configs/config.env" });

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, authToken);

router.post(
  "/sendMessage",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const messageBody = req.body.message;
      const destination = req.body.destination;
      client.messages
        .create({
          body: messageBody,
          messagingServiceSid: "MG9451216e835fd5fc52da153e0a8cf33c",
          from: "+16018951879",
          to: destination,
        })
        .then((message) => console.log(message.sid, message));
      // done();
      return res.json({ success: true, message: "message successfully sent!" });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  }
);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post(
  "/sendEmail",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const emailBody = req.body.message;
      const destination = req.body.destination;
      const subject = req.body.subject;
      const msg = {
        to: destination, // Change to your recipient
        from: "yabre.tech@gmail.com", // Change to your verified sender
        subject: subject,
        text: emailBody,
      };
      const result = await sgMail
        .send(msg)
        .then((res) => {
          console.log(res);

          return;
        })
        .catch((error) => {
          console.error(error);
        });
      return res.json({ success: true, message: result });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  }
);
module.exports = router;
