const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

// GET all users
router.get("/", userController.users_get);

// POST login
router.post("/login", userController.login_post);

// POST signup
router.post("/signup", userController.signup_post);

// get single user
router.get("/:id", userController.user);

// google auth
router.post("/google", userController.google);

// delete user
router.delete("/delete/:id", userController.delete_user);

// user profile info
// firstname, lastname, email, picture

module.exports = router;
