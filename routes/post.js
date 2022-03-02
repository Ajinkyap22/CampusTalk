const express = require("express");
const router = express.Router({ mergeParams: true });
const postController = require("../controllers/postController");
const upload = require("../config/multer");
const verifyToken = require("../config/verifyToken");

// get all posts
router.get("/", postController.posts);

// get single post
router.get("/:id", postController.get_post);

// create post
router.post(
  "/create-post",
  verifyToken,
  upload.single("file"),
  postController.create_post
);

// delete a post
router.delete("/delete/:postId", verifyToken, postController.delete_post);

// update a post
router.put("/update/:postId", verifyToken, postController.update_post);

// upvotes a post
router.put("/upvote/:postId", verifyToken, postController.upvote_post);

// unupvotes a post
router.put("/unupvote/:postId", verifyToken, postController.unupvote_post);

// downvotes a post
router.put("/downvote/:postId", verifyToken, postController.downvote_post);

// undownvotes a post
router.put("/undownvote/:postId", verifyToken, postController.undownvote_post);

// pin a post
router.put("/pin/:postId", verifyToken, postController.pin_post);

// unpin a post
router.put("/unpin/:postId", verifyToken, postController.unpin_post);

module.exports = router;
