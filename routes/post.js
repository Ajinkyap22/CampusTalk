const express = require("express");
const router = express.Router();
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
router.put("/update/:postId", postController.update_post);

module.exports = router;
