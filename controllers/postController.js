const Forum = require("../models/forum");
const User = require("../models/user");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

// get all posts
exports.posts = function (req, res) {
  Post.find()
    .populate("author")
    .exec((err, posts) => {
      if (err) return res.json(err);

      return res.json(posts);
    });
};

// get single post
exports.get_post = function (req, res) {
  Post.findById(req.params.id, (err, post) => {
    if (err) return res.json(err);

    return res.json(post);
  });
};

// create post
exports.create_post = [
  // sanitize and validate fields
  body("Title", "Title cannot be empty.").trim().isLength({ min: 1 }),

  // process request
  (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    Post.create(
      {
        title: req.body.title,
        text: req.body.text || "",
        file: req.file.filename || req.body.file || "",
        anonymous: req.body.anonymous || false,
        author: req.body.authorId,
        forum: req.body.forumId,
      },
      async (err, post) => {
        if (err) return res.json(err);

        const newPost = await Post.populate(post, { path: "author" });

        return res.json(newPost);
      }
    );
  },
];

// delete a post
exports.delete_post = function (req, res) {
  Post.findByIdAndRemove(req.params.postId, function (err, post) {
    if (err) return res.json(err);

    return res.json(post);
  });
};
