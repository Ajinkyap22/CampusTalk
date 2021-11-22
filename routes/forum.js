const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const verifyToken = require("../config/verifyToken");
const upload = require("../config/multer");

// GET all forums
router.get("/", forumController.forums);

// GET a single forum
router.get("/:id", forumController.get_forum);

// create a forum
router.post("/create-forum", verifyToken, forumController.create_forum);

// DELETE forum
router.delete("/delete/:id", verifyToken, forumController.delete_forum);

// update forum
router.put(
  "/update/:id",
  verifyToken,
  upload.single("picture"),
  forumController.update_forum
);

// get rules
router.get("/:id/rules", forumController.get_rules);

// add rule
router.post("/:id/rules/add", verifyToken, forumController.add_rule);

// delete all rules
router.delete("/:id/rules/delete", verifyToken, forumController.delete_rules);

// join forum
router.post("/:id/join", verifyToken, forumController.join_forum);

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

module.exports = router;
