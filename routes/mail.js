const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

// verification email
router.post("/verification", mailController.verifiation_mail);

// password reset
router.post("/reset-password", mailController.reset_password);

// requests mail
router.post("/requests", mailController.post_requests_mail);

// comment mail
router.post("/comment", mailController.comment_mail);

// reply mail
router.post("/reply", mailController.reply_mail);

// join request approved mail
router.post("/join-request-approved", mailController.join_request_approved);

module.exports = router;
