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

exports.create_post = function (req, res) {
  Post.create(
    {
      text: req.body.text || "",
      file: req.file.filename || req.body.file || "",
      anonymous: req.body.anonymous || false,
      author: req.body.authorId,
      forum: req.body.forumId,
      important: req.body.important || false,
    },
    async (err, post) => {
      if (err) return res.json(err);

      const newPost = await Post.populate(post, { path: "author" });

      return res.json(newPost);
    }
  );
};

// delete a post
exports.delete_post = function (req, res) {
  Post.findByIdAndRemove(req.params.postId, function (err, post) {
    if (err) return res.json(err);

    return res.json(post);
  });
};

exports.update_post = function (req, res) {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set: {
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
};

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

// pin a post
exports.pin_post = function (req, res) {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set: {
        pinned: true,
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

// unpin a post
exports.unpin_post = function (req, res) {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set: {
        pinned: false,
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
