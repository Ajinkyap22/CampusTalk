const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const verifyToken = require("../config/verifyToken");
const { upload } = require("../config/multer");

// GET all forums
router.get("/", forumController.forums);

// GET a single forum
router.get("/:id", forumController.get_forum);

// create a forum
router.post("/create-forum", verifyToken, forumController.create_forum);

// DELETE forum
router.delete("/delete/:id", verifyToken, forumController.delete_forum);

// update forum
router.put("/update/:id", verifyToken, forumController.update_forum);

// get rules
router.get("/:id/rules", forumController.get_rules);

// add rule
router.post("/:id/rules/add", verifyToken, forumController.add_rule);

// delete all rules
router.delete("/:id/rules/delete", verifyToken, forumController.delete_rules);

// update rules
router.put("/:id/rules", verifyToken, forumController.update_rules);

// join forum
router.post("/:id/join", verifyToken, forumController.join_forum);

// approve join request
router.put("/:id/approve_join/", verifyToken, forumController.approve_request);

// reject join request
router.put("/:id/reject_join/", verifyToken, forumController.reject_request);

// get all join requests
router.get("/:id/join_requests", forumController.get_join_requests);

// get members
router.get("/:id/members", forumController.get_members);

// remove a member
router.post("/:id/members/delete", verifyToken, forumController.remove_member);

// make moderator
router.post(
  "/:id/moderators/make",
  verifyToken,
  forumController.make_moderator
);

// dismiss as moderator
router.post(
  "/:id/moderators/dismiss",
  verifyToken,
  forumController.dismiss_moderator
);

// get all posts from user's forums
router.get("/userPosts/:id", forumController.user_feed_posts);

module.exports = router;
