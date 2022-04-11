require("dotenv").config();
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// send mail using sendgrid api
exports.send_mail = (req, res) => {
  const msg = {
    to: "palaskarap15@gmail.com", // Change to your recipient
    from: process.env.MAIL_FROM, // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({
        message: "mail sent",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "mail not sent",
        error: error,
      });
    });
};

// post requests mail

// join requests mail

// comment mail

// reply mail

// email verification otp mail
