const Comment = require("../models/comment");
const Post = require("../models/post");
const Reply = require("../models/reply");
const { body, validationResult } = require("express-validator");

// get all comments
exports.comments = function (req, res) {
  Comment.find({ post: req.params.postId })
    .sort({ timestamp: -1 })
    .populate("author")
    .exec((err, comments) => {
      if (err) return res.json(err);

      return res.json(comments);
    });
};

// get single comment
exports.get_comment = function (req, res) {
  Comment.findById(req.params.id)
    .populate("author")
    .exec((err, comment) => {
      if (err) return res.json(err);

      return res.json(comment);
    });
};

// create comment
exports.create_comment = function (req, res) {
  const file = req.file ? req.file.filename : "";
  const filename = req.body.originalFileName
    ? JSON.parse(req.body.originalFileName)
    : null;

  Comment.create(
    {
      text: req.body.text || "",
      file,
      author: req.body.authorId,
      originalFileName: filename,
      post: req.body.postId,
    },
    async (err, comment) => {
      if (err) return res.json(err);

      const newComment = await Comment.populate(comment, { path: "author" });

      Post.findByIdAndUpdate(
        req.body.postId,
        {
          $push: {
            comments: comment._id,
          },
        },
        { new: true }
      )
        .populate("author")
        .populate("comments")
        .exec((err, post) => {
          if (err) return res.json(err);

          return res.json({ comment: newComment, post });
        });
    }
  );
};

// Edit a comment
exports.edit_comment = function (req, res) {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((err, comment) => {
      if (err) return res.json(err);

      return res.json(comment);
    });
};

// delete a comment
exports.delete_comment = function (req, res) {
  Comment.findByIdAndRemove(req.params.commentId, function (err, comment) {
    if (err) return res.json(err);

    // delete comment from post
    Post.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: {
          comments: req.params.commentId,
        },
      },
      { new: true }
    )
      .populate("author")
      .populate("comments")
      .populate("forum")
      .exec((err, post) => {
        if (err) return res.json(err);

        // delete all replies to comment
        Reply.deleteMany({ comment: req.params.commentId }, function (err) {
          if (err) return res.json(err);
        });

        return res.json({ comment, post });
      });
  });
};

// Upvote a comment
exports.upvote_comment = function (req, res) {
  Comment.findByIdAndUpdate(
    req.params.commentId,
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
    .exec((err, comment) => {
      if (err) return res.json(err);

      return res.json(comment);
    });
};

// unupvote a comment
exports.unupvote_comment = function (req, res) {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $pull: { upvotes: req.body.id },
    },
    { new: true }
  )
    .populate("author")
    .exec((err, comment) => {
      if (err) return res.json(err);

      return res.json(comment);
    });
};

// downvote a comment
exports.downvote_comment = function (req, res) {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $pull: {
        upvotes: req.body.id,
      },
      $push: {
        downvotes: req.body.id,
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((err, comment) => {
      if (err) return res.json(err);

      return res.json(comment);
    });
};

// undownvote a comment
exports.undownvote_comment = function (req, res) {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $pull: { downvotes: req.body.id },
    },
    { new: true }
  )

    .populate("author")
    .exec((err, comment) => {
      if (err) return res.json(err);

      return res.json(comment);
    });
};

// pin a comment
exports.pin_comment = function (req, res) {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $set: {
        pinned: true,
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((err, comment) => {
      if (err) return res.json(err);

      return res.json(comment);
    });
};

// unpin a comment
exports.unpin_comment = function (req, res) {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $set: {
        pinned: false,
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((err, comment) => {
      if (err) return res.json(err);

      return res.json(comment);
    });
};
