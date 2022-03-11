const express = require("express");
const router = express.Router({ mergeParams: true });
const postController = require("../controllers/postController");
const { upload, uploadDocs, uploadVideos } = require("../config/multer");
const verifyToken = require("../config/verifyToken");

// get all posts
router.get("/", postController.posts);

// get all unapproved posts
router.get("/postRequests", postController.unapproved_posts);

// get single post
router.get("/:id", postController.get_post);

// create post for image Uploads
router.post(
  "/create-post",
  verifyToken,
  upload.array("file", 10),
  postController.create_post
);

// create post for doc
router.post(
  "/create-doc-post",
  verifyToken,
  uploadDocs.single("file"),
  postController.create_doc_post
);

// create post for videos
router.post(
  "/create-vid-post",
  verifyToken,
  uploadVideos.single("file"),
  postController.create_doc_post
);

// delete a post
router.delete("/delete/:postId", verifyToken, postController.delete_post);

// approve a post
router.put("/approve/:postId", verifyToken, postController.approve_post);

// reject a post
router.put("/reject/:postId", verifyToken, postController.reject_post);

// update a post
router.put(
  "/update/:postId",
  verifyToken,
  upload.array("file", 10),
  postController.update_post
);

// update doc post
router.put(
  "/update-doc-post/:postId",
  verifyToken,
  uploadDocs.single("file"),
  postController.update_post
);

// update video post
router.put(
  "/update-vid-post/:postId",
  verifyToken,
  uploadVideos.single("file"),
  postController.update_post
);

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
