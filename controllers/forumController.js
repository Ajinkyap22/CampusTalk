const Forum = require("../models/forum");
const { body, validationResult } = require("express-validator");

// get all forums
exports.forums = function (req, res) {
  Forum.find().exec((err, forums) => {
    if (err) return res.json(err);

    return res.json(forums);
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
