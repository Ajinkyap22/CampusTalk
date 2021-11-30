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

// update a post
exports.update_post = [
  // sanitize and validate fields
  body("Title", "Title cannot be empty.").trim().isLength({ min: 1 }),

  // process request
  (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          text: req.body.text || "",
          anonymous: req.body.anonymous || false,
        },
      },
      { new: true }
    )
      .populate("author")
      .exec((err, post) => {
        if (err) return res.json(err);

        return res.json(post);
      });
  },
];

// upvote a post
exports.upvote_post = function (req, res) {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $push: {
        upvotes: req.body.id,
      },
      $pull: {
        downvotes: req.body.id,
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((err, post) => {
      if (err) return res.json(err);

      return res.json(post);
    });
};

// downvote a post
exports.downvote_post = function (req, res) {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $push: {
        downvotes: req.body.id,
      },
      $pull: {
        upvotes: req.body.id,
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((err, post) => {
      if (err) return res.json(err);

      return res.json(post);
    });
};
