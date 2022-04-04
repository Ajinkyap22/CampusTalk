const express = require("express");
const router = express.Router({ mergeParams: true });
const replyController = require("../controllers/replyController");
const { upload, uploadDocs, uploadVideos } = require("../config/multer");
const verifyToken = require("../config/verifyToken");

// create a reply
router.post(
  "/create-reply",
  verifyToken,
  upload.single("file"),
  replyController.create_reply
);

// create a doc reply
router.post(
  "/create-doc-reply",
  verifyToken,
  uploadDocs.single("file"),
  replyController.create_reply
);

// create a video reply
router.post(
  "/create-vid-reply",
  verifyToken,
  uploadVideos.single("file"),
  replyController.create_reply
);

// retrieve all replies for a comment
router.get("/", replyController.get_comment_replies);

// retrieve single comment
router.get("/:id", replyController.get_reply);

// update a reply
router.put("/:id/edit-reply", verifyToken, replyController.edit_reply);

// delete a reply
router.delete("/:id/delete-reply", verifyToken, replyController.delete_reply);

// upvote a reply
router.put("/:id/upvote", verifyToken, replyController.upvote_reply);

// unupvote a reply
router.put("/:id/unupvote", verifyToken, replyController.unupvote_reply);

// downvote a reply
router.put("/:id/downvote", verifyToken, replyController.downvote_reply);

// undownvote a reply
router.put("/:id/undownvote", verifyToken, replyController.undownvote_reply);

// pin a reply
router.put("/:id/pin", verifyToken, replyController.pin_reply);

// unpin a reply
router.put("/:id/unpin", verifyToken, replyController.unpin_reply);

module.exports = router;
