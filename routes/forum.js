const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const verifyToken = require("../config/verifyToken");
const upload = require("../config/multer");

// GET all forums
router.get("/", forumController.forums);

// GET a single forum
router.get("/:id", forumController.get_forum);

// create a forum
router.post("/create-forum", verifyToken, forumController.create_forum);

// DELETE forum
router.delete("/delete/:id", verifyToken, forumController.delete_forum);

// update forum
router.put(
  "/:id/update",
  verifyToken,
  upload.single("picture"),
  forumController.update_forum
);

// add rule
router.post("/:id/rules/add", verifyToken, forumController.add_rule);

module.exports = router;
