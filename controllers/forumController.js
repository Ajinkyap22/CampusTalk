const Forum = require("../models/forum");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

// get all forums
exports.forums = function (req, res) {
  Forum.find().exec((err, forums) => {
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
  (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    Forum.create(
      {
        forumName: req.body.forumName,
        address: req.body.address,
        website: req.body.website,
        email: req.body.email,
      },
      (err, forum) => {
        if (err) return res.json(err);

        return res.json(forum);
      }
    );
  },
];

// delete a forum
exports.delete_forum = function (req, res) {
  Forum.findByIdAndRemove(req.params.id, function (err, forum) {
    if (err) return res.json(err);

    return res.json(forum);
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
          picture: req.file.filename || req.body.picture || "",
        },
      },
      { new: true },
      function (err, forum) {
        if (err) return res.json(err);

        return res.json(forum);
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

// join forum
exports.join_forum = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        members: req.body.id,
      },
    },
    { new: true }
  )
    .populate({ path: "members", model: "User" })
    .exec((err, forum) => {
      if (err) return res.json(err);

      return res.json(forum.members);
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
  Forum.findByIdAndUpdate(req.params.id, {
    $pull: {
      members: {
        _id: req.body.id,
      },
    },
  })
    .populate({ path: "members", model: "User" })
    .exec((err, forum) => {
      if (err) return res.json(err);

      return res.json(forum.members);
    });
};
