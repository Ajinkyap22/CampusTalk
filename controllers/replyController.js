const Comment = require("../models/comment");
const Reply = require("../models/reply");
const { body, validationResult } = require("express-validator");

// get all replies
exports.replies = function (req, res) {
  Reply.find()
    .populate("author")
    .exec((err, replies) => {
      if (err) return res.json(err);

      return res.json(replies);
    });
};

// get single reply
exports.get_reply = function (req, res) {
  Reply.findById(req.params.id)
    .populate("author")
    .exec((err, reply) => {
      if (err) return res.json(err);

      return res.json(reply);
    });
};

// create reply
exports.create_reply = [
  // sanitize and validate fields
  body("text", "Text cannot be empty.").trim().isLength({ min: 1 }),

  // process request
  (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    const file = req.file ? req.file.filename : "";

    Reply.create(
      {
        text: req.body.text,
        file,
        author: req.body.authorId,
      },
      async (err, reply) => {
        if (err) return res.json(err);

        const newReply = await Reply.populate(reply, { path: "author" });

        Comment.findByIdAndUpdate(
          req.body.commentId,
          {
            $push: {
              replies: reply._id,
            },
          },
          { new: true }
        )
          .populate("author")
          .populate("replies")
          .exec((err, comment) => {
            if (err) return res.json(err);

            return res.json({ reply: newReply, comment });
          });
      }
    );
  },
];

// Edit a reply
exports.edit_reply = [
  // sanitize and validate fields
  body("text", "Text cannot be empty.").trim().isLength({ min: 1 }),

  // process request
  (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    Reply.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
        },
      },
      { new: true }
    )
      .populate("author")
      .exec((err, reply) => {
        if (err) return res.json(err);

        return res.json(reply);
      });
  },
];

// delete a reply
exports.delete_reply = function (req, res) {
  Reply.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return res.json(err);

    return res.json(post);
  });
};

// Upvote a reply
exports.upvote_reply = function (req, res) {
  Reply.findByIdAndUpdate(
    req.params.id,
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
    .exec((err, reply) => {
      if (err) return res.json(err);

      return res.json(reply);
    });
};

// downvote a reply
exports.downvote_reply = function (req, res) {
  Reply.findByIdAndUpdate(
    req.params.id,
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
    .exec((err, reply) => {
      if (err) return res.json(err);

      return res.json(reply);
    });
};

// pin a reply
exports.pin_reply = function (req, res) {
  Reply.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        pinned: true,
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((err, reply) => {
      if (err) return res.json(err);

      return res.json(reply);
    });
};

// unpin a reply
exports.unpin_reply = function (req, res) {
  Reply.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        pinned: false,
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((err, reply) => {
      if (err) return res.json(err);

      return res.json(reply);
    });
};
