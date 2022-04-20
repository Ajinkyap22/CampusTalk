const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { upload } = require("../config/multer");
const verifyToken = require("../config/verifyToken");

// GET all users
router.get("/", userController.users_get);

// get single user
router.get("/:id", userController.user);

// POST login
router.post("/login", userController.login_post);

// POST signup
router.post("/signup", userController.signup_post);

// confirm account
router.put("/confirm/:id", userController.confirm_account);

// google auth
router.post("/google", userController.google);

// delete user
router.delete("/delete/:id", userController.delete_user);

// user profile info
router.put(
  "/profile/:id",
  upload.single("picture"),
  verifyToken,
  userController.profile
);

// get all posts created by user
router.get("/:id/posts", userController.get_user_posts);

// reset password
router.post("/reset-password", userController.reset_password);

// unmark as new
router.put("/:id/unmark", userController.unmark_as_new);

module.exports = router;
