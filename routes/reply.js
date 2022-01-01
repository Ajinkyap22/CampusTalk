const express = require("express");
const router = express.Router();
const replyController = require("../controllers/replyController");
const upload = require("../config/multer");
const verifyToken = require("../config/verifyToken");

// create a reply
router.post(
  "/create-reply",
  verifyToken,
  upload.single("file"),
  replyController.create_reply
);

// retrieve all replies
router.get("/", replyController.replies);

// retrieve single comment
router.get("/:id", replyController.get_reply);

// update a reply
router.put("/:id/edit-reply", verifyToken, replyController.edit_reply);

// delete a reply
router.delete("/:id/delete-reply", verifyToken, replyController.delete_reply);

// upvote a reply
router.put("/:id/upvote", verifyToken, replyController.upvote_reply);

// downvote a reply
router.put("/:id/downvote", verifyToken, replyController.downvote_reply);

// pin a reply
router.put("/:id/pin", verifyToken, replyController.pin_reply);

// unpin a reply
router.put("/:id/unpin", verifyToken, replyController.unpin_reply);

module.exports = router;
