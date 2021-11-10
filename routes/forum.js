const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const verifyToken = require("../config/verifyToken");

// GET all forums
router.get("/", forumController.forums);

// GET a single forum
router.get("/:id", forumController.get_forum);

// create a forum
router.post("/create-forum", verifyToken, forumController.create_forum);

// DELETE forum
router.delete("/:id/delete", verifyToken, forumController.delete_forum);

// update forum

module.exports = router;
