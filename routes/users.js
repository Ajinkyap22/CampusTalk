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
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// google auth redirect
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    return res.json("Sign in successful.");
  }
);

module.exports = router;
