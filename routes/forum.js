const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const verifyToken = require("../config/verifyToken");

// GET all forums
router.get("/", forumController.forums);

// create a forum
router.post("/create-forum", verifyToken, forumController.create_forum);

module.exports = router;
