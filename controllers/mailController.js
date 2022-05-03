require("dotenv").config();
const User = require("../models/user");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function generateHTML(titleText, name, paraText, link, linkText) {
  return `
  <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
</head>

<body style="word-spacing:normal;">
  <div style="">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:175px;">
                                <img height="auto" src="https://drive.google.com/uc?export=view&id=1IXwp6i97sv_sd0pkyjmxenom2NsX91pH" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <p style="border-top:solid 4px #0F8CFF;font-size:1px;margin:0px auto;width:100%;">
                        </p>
                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #0F8CFF;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Roboto;font-size:20px;line-height:1;text-align:left;color:#000000;">${titleText} <mj-text color="#0F8CFF">${name}!</mj-text>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Roboto;font-size:20px;line-height:1.6;text-align:left;color:#000000;">${paraText}</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" bgcolor="#0F8CFF" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#0F8CFF;" valign="middle">
                            <a href=${link} style="display:inline-block;background:#0F8CFF;color:#ffffff;font-family:Roboto;font-size:20px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank">${linkText}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
  `;
}

// email verification
exports.verifiation_mail = (req, res) => {
  let { name, email, confirmationCode } = req.body;

  let html = generateHTML(
    "Hey",
    name,
    "Thank you for joining CampusTalk. Please confirm your account by clicking on the following link.",
    `${process.env.APP_URL}/confirm/${confirmationCode}`,
    "Confirm Account"
  );

  const msg = {
    to: email,
    from: process.env.MAIL_FROM,
    subject: "Please confirm your CampusTalk account",
    html,
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

      // generate reset token
      user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      user
        .save()
        .then((user) => {
          let html = generateHTML(
            "Hey",
            name,
            "You requested to reset your CampusTalk password. You can reset your password by clicking on the following link.",
            `${process.env.APP_URL}/reset-password/${user.resetPasswordToken}`,
            "Reset Password"
          );

          const msg = {
            to: email,
            from: process.env.MAIL_FROM,
            subject: "Link to reset your CampusTalk password",
            html,
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
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    }
  });
};

// new requests mail
exports.post_requests_mail = (req, res) => {
  let { emails, forumName, type, forumId } = req.body;

  let html = generateHTML(
    "Hey",
    "fellow Moderator",
    `There are new ${type} requests in ${forumName} waiting to be approved by you. Click on the below link to view them.`,
    `${process.env.APP_URL}/forums/${forumId}/${type}Requests`,
    "View Requests"
  );

  const msg = {
    to: emails,
    from: process.env.MAIL_FROM,
    subject: `New ${type} requests in ${forumName}`,
    html,
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
exports.comment_mail = (req, res) => {
  let { email, name, forumName, author, forumId, postId } = req.body;

  let html = generateHTML(
    "Hey",
    name,
    `${author} commented on your post in ${forumName}. Click on the below link to view the comments.`,
    `${process.env.APP_URL}/forums/${forumId}/posts/${postId}`,
    "View Comments"
  );

  const msg = {
    to: "palaskarap15@gmail.com",
    from: process.env.MAIL_FROM,
    subject: `${author} commented on your post in ${forumName}`,
    html,
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

// reply mail
exports.reply_mail = (req, res) => {
  let { email, name, forumName, author, forumId, postId } = req.body;

  let html = generateHTML(
    "Hey",
    name,
    `${author} replied to your comment on a post in ${forumName}. Click on the below link to view the reply.`,
    `${process.env.APP_URL}/forums/${forumId}/posts/${postId}`,
    "View Reply"
  );

  const msg = {
    to: email,
    from: process.env.MAIL_FROM,
    subject: `${author} replied to your comment on a post in ${forumName}`,
    html,
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

// forum join request approved mail
exports.join_request_approved = (req, res) => {
  let { email, name, forumName, forumId } = req.body;

  let html = generateHTML(
    "Hey",
    name,
    `Your request to join ${forumName} has been approved. You can now view and create posts in the forum. Click on the below link to view the forum.`,
    `${process.env.APP_URL}/forums/${forumId}`,
    "View Forum"
  );

  const msg = {
    to: email,
    from: process.env.MAIL_FROM,
    subject: `Your request to join ${forumName} has been approved`,
    html,
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
