require("dotenv").config();
const User = require("../models/user");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// email verification
exports.verifiation_mail = (req, res) => {
  let { name, email, confirmationCode } = req.body;

  const msg = {
    to: "palaskarap15@gmail.com",
    from: process.env.MAIL_FROM,
    subject: "Please confirm your CampusTalk account",
    html: `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Thank you for joining CampusTalk. Please confirm your account by clicking on the following link</p>
    <a href=http://localhost:3001/confirm/${confirmationCode}>Confirm Account</a>
    </div>`,
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

// password reset
exports.reset_password = (req, res) => {
  let { email } = req.body;
  let name;

  // find user by email
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      name = user.firstName;

      const msg = {
        to: "palaskarap15@gmail.com", // Change to your recipient
        from: process.env.MAIL_FROM, // Change to your verified sender
        subject: "Link to reset your CampusTalk password",
        html: `<h1>Reset Password</h1>
          <h2>Hello ${name}</h2>
          <p>You requested to reset your CampusTalk password. You can reset your password by clicking on the following link</p>
          <a href=http://localhost:3001/reset-password>Reset Password</a>
          </div>`,
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
    }
  });
};

// new requests mail
exports.post_requests_mail = (req, res) => {
  let { emails, forumName, type, forumId } = req.body;

  const msg = {
    to: ["palaskarap15@gmail.com", "palaskarajinkya22@gmail.com"],
    from: process.env.MAIL_FROM,
    subject: `New ${type} requests in ${forumName}`,
    html: `<h1>New ${type} Requests</h1>
    <h2>Hello fellow Moderator</h2>
    <p>There are new ${type} requests in ${forumName} waiting to be approved by you. Click on the below link to view them</p>
    <a href=http://localhost:3001/forums/${forumId}/${type}Requests>View Requests</a>
    </div>`,
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

// comment mail

// reply mail
