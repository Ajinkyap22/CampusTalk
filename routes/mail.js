const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

// verification email
router.post("/verification", mailController.verifiation_mail);

// password reset
router.post("/reset-password", mailController.reset_password);

// requests mail
router.post("/requests", mailController.post_requests_mail);

module.exports = router;
