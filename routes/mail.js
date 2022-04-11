const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

// send mail
router.post("/send_mail", mailController.send_mail);

module.exports = router;
