const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const upload = require("../config/multer");
const verifyToken = require("../config/verifyToken");

// get all comments
router.get("/", commentController.comments);

// get a single comment
router.get("/:id", commentController.get_comment);

// create comment
router.post(
  "/create-comment",
  upload.single("file"),
  verifyToken,
  commentController.create_comment
);

// edit a comment
router.put(
  "/:commentId/edit-comment",
  verifyToken,
  commentController.edit_comment
);

module.exports = router;
