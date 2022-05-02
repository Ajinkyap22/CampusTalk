const Forum = require("../models/forum");
const User = require("../models/user");
const Post = require("../models/post");
const Event = require("../models/event");
const { body, validationResult } = require("express-validator");

// get all forums
exports.forums = function (req, res) {
  Forum.find()
    .populate("members")
    .populate("moderators")
    .populate("posts")
    .exec((err, forums) => {
      if (err) return res.json(err);

      return res.json(forums);
    });
};

// get single forum
exports.get_forum = function (req, res) {
  Forum.findById(req.params.id, function (err, forum) {
    if (err) return res.json(err);

    return res.json(forum);
  });
};

// create a forum
exports.create_forum = [
  // sanitize and validate fields
  body("forumName", "Institute name cannot be empty.")
    .trim()
    .isLength({ min: 1 }),
  body("address", "Address cannot be empty.").trim().isLength({ min: 1 }),
  body("website", "Website URL must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 }),
  body("email", "E-mail must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 }),

  // process request
  async (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    // check if forum with the similar email or website exists
    const forumExists = await Forum.find({
      $or: [{ email: req.body.email }, { website: req.body.website }],
    });

    if (forumExists.length > 0) {
      return res.status(409).json({
        error:
          "A forum with the email address or website you provided with already exists. Please make sure your institute's forum doesn't already exist.",
      });
    }

    Forum.create(
      {
        forumName: req.body.forumName,
        address: req.body.address,
        website: req.body.website,
        email: req.body.email,
        members: [req.body.user],
        moderators: [req.body.user],
      },
      (err, forum) => {
        if (err) return res.json(err);

        // add forum to user's joined forums
        User.findByIdAndUpdate(
          req.body.user,
          {
            $push: {
              forums: forum._id,
            },
          },
          { new: true },
          (err, user) => {
            if (err) return res.json(err);
            Forum.populate(forum, { path: "members" }, (err, forum) => {
              if (err) return res.json(err);

              Forum.populate(forum, { path: "moderators" }, (err, forum) => {
                if (err) return res.json(err);

                Forum.populate(forum, { path: "posts" }, (err, forum) => {
                  if (err) return res.json(err);

                  return res.json(forum);
                });
              });
            });
          }
        );
      }
    );
  },
];

// delete a forum
exports.delete_forum = function (req, res) {
  Forum.findByIdAndRemove(req.params.id, function (err, forum) {
    if (err) return res.json(err);

    // remove forum from user's joined forums
    User.findByIdAndUpdate(
      req.body.id,
      {
        $pull: {
          forums: forum._id,
        },
      },
      { new: true },
      (err, user) => {
        if (err) return res.json(err);

        // remove all posts in forum
        Post.deleteMany({ forum: forum._id }, (err, posts) => {
          if (err) return res.json(err);

          // remove those posts from user's posts only if they exist
          if (posts.length > 0) {
            User.findByIdAndUpdate(
              req.body.id,
              {
                $pull: {
                  posts: { $in: posts },
                },
              },
              { new: true },
              (err, user) => {
                if (err) return res.json(err);

                // remove all events in forum
                Event.deleteMany({ forum: forum._id }, (err, events) => {
                  if (err) return res.json(err);

                  return res.json(events);
                });
              }
            );
          } else {
            // remove all events in forum
            Event.deleteMany({ forum: forum._id }, (err, events) => {
              if (err) return res.json(err);

              return res.json(events);
            });
          }
        });
      }
    );
  });
};

// update forum
exports.update_forum = [
  // sanitize and validate fields
  body("forumName", "Institute name cannot be empty.")
    .trim()
    .isLength({ min: 1 }),
  body("address", "Address cannot be empty.").trim().isLength({ min: 1 }),
  body("website", "Website URL must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 }),
  body("email", "E-mail must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 }),

  // process request
  (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    Forum.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          forumName: req.body.forumName,
          address: req.body.address,
          website: req.body.website,
          email: req.body.email,
          description: req.body.description,
        },
      },
      { new: true },
      function (err, forum) {
        if (err) return res.json(err);

        Forum.populate(forum, { path: "members" }, (err, forum) => {
          if (err) return res.json(err);

          Forum.populate(forum, { path: "moderators" }, (err, forum) => {
            if (err) return res.json(err);

            Forum.populate(forum, { path: "posts" }, (err, forum) => {
              if (err) return res.json(err);

              return res.json(forum);
            });
          });
        });
      }
    );
  },
];

// get all rules
exports.get_rules = function (req, res) {
  Forum.findById(req.params.id, (err, forum) => {
    if (err) return res.json(err);

    return res.json(forum.rules);
  });
};

// add rule
exports.add_rule = [
  // validate & sanitize
  body("rule", "Rule cannot be empty").trim().isLength({ min: 1 }),

  // process request
  (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errors: errors.array() });

    Forum.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          rules: req.body.rule,
        },
      },
      { new: true },
      function (err, forum) {
        if (err) return res.json(err);

        return res.json(forum.rules);
      }
    );
  },
];

// delete rules
exports.delete_rules = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        rules: [],
      },
    },
    { new: true },
    (err, forum) => {
      if (err) return res.json(err);

      return res.json(forum.rules);
    }
  );
};

// update rules
exports.update_rules = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        rules: req.body.rules,
      },
    },
    { new: true },
    (err, forum) => {
      if (err) return res.json(err);

      return res.json(forum.rules);
    }
  );
};

// join forum
exports.join_forum = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        joinRequests: req.body.id,
      },
    },
    { new: true }
  )
    .populate({ path: "members", model: "User" })
    .exec((err, forum) => {
      if (err) return res.json(err);

      return res.json(forum);
    });
};

// approve request
exports.approve_request = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        joinRequests: req.body.id,
      },
      $addToSet: {
        members: req.body.id,
      },
    },
    { new: true }
  )
    .populate({ path: "members", model: "User" })
    .populate("moderators")
    .populate("posts")
    .exec((err, forum) => {
      if (err) return res.json(err);

      // add forum to user's joined forums
      User.findByIdAndUpdate(
        req.body.id,
        {
          $addToSet: {
            forums: forum._id,
          },
        },
        { new: true },
        (err, user) => {
          if (err) return res.json(err);

          return res.json(forum);
        }
      );
    });
};

// reject request
exports.reject_request = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        joinRequests: req.body.id,
      },
    },
    { new: true }
  ).exec((err, forum) => {
    if (err) return res.json(err);

    return res.json(forum);
  });
};

// get all join requests
exports.get_join_requests = function (req, res) {
  // get all join requests & populate them
  Forum.findById(req.params.id)
    .populate({ path: "joinRequests", model: "User" })
    .exec((err, forum) => {
      if (err) return res.json(err);

      return res.json(forum.joinRequests);
    });
};

// get members
exports.get_members = function (req, res) {
  Forum.findById(req.params.id)
    .populate({ path: "members", model: "User" })
    .exec((err, forum) => {
      if (err) return res.json(err);

      return res.json(forum.members);
    });
};

// remove a member
exports.remove_member = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        members: req.body.id,
        moderators: req.body.id,
      },
    },
    { new: true }
  )
    .populate({ path: "members", model: "User" })
    .exec((err, forum) => {
      if (err) return res.json(err);

      // remove forum from user's joined forums
      User.findByIdAndUpdate(
        req.body.id,
        {
          $pull: {
            forums: forum._id,
          },
        },
        { new: true },
        (err, user) => {
          if (err) return res.json(err);

          return res.json(forum.members);
        }
      );
    });
};

// make moderator
exports.make_moderator = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      // push only if not already in array
      $addToSet: {
        moderators: req.body.id,
        members: req.body.id,
      },
    },
    { new: true }
  )
    .populate({ path: "moderators", model: "User" })
    .exec((err, forum) => {
      if (err) return res.json(err);

      console.log(forum._id, forum.members);

      return res.json(forum.moderators);
    });
};

// dismiss moderator
exports.dismiss_moderator = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        moderators: req.body.id,
      },
    },
    { new: true }
  )
    .populate({ path: "moderators", model: "User" })
    .exec((err, forum) => {
      if (err) return res.json(err);

      return res.json(forum.moderators);
    });
};

// get all the posts of a forum that user is a member of
exports.user_feed_posts = function (req, res) {
  // get all user forums
  const posts = [];
  Forum.find({ members: req.params.id })
    .populate({ path: "posts", populate: { path: "author forum" } })
    // sort by date newest first
    .exec((err, forums) => {
      if (err) return res.json(err);

      // get all posts from user forums
      forums.forEach((forum) => {
        posts.push(...forum.posts);
      });

      return res.json(posts);
    });
};
