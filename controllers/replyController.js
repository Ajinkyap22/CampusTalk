const Comment = require("../models/comment");
const Reply = require("../models/reply");

// get all replies for a comment
exports.get_comment_replies = function (req, res) {
  Reply.find({ comment: req.params.commentId })
    .populate("author")
    .sort({ timestamp: -1 })
    .exec((err, replies) => {
      if (err) return res.json(err);

      return res.json(replies);
    });
};

// get single reply
exports.get_reply = function (req, res) {
  Reply.findById(req.params.id)
    .populate("author")
    .populate("comment")
    .exec((err, reply) => {
      if (err) return res.json(err);

      return res.json(reply);
    });
};

// create reply
exports.create_reply = function (req, res) {
  const file = req.file ? req.file.filename : "";

  const filename = req.body.originalFileName
    ? JSON.parse(req.body.originalFileName)
    : null;

  Reply.create(
    {
      text: req.body.text || "",
      file,
      author: req.body.authorId,
      originalFileName: filename,
      comment: req.body.commentId,
    },
    async (err, reply) => {
      if (err) return res.json(err);

      let newReply = await Reply.populate(reply, { path: "author" });
      newReply = await Reply.populate(newReply, { path: "comment" });

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
};

// Edit a reply
exports.edit_reply = function (req, res) {
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
};

// delete a reply
exports.delete_reply = function (req, res) {
  Reply.findByIdAndRemove(req.params.id, function (err, reply) {
    if (err) return res.json(err);

    // delete reply from comment
    Comment.findByIdAndUpdate(
      reply.comment,
      {
        $pull: {
          replies: reply._id,
        },
      },
      { new: true }
    )
      .populate("author")
      .populate("replies")
      .exec((err, comment) => {
        if (err) return res.json(err);

        return res.json(comment);
      });
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
    .populate("comment")
    .exec((err, reply) => {
      if (err) return res.json(err);

      return res.json(reply);
    });
};

// unupvote a reply
exports.unupvote_reply = function (req, res) {
  Reply.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        upvotes: req.body.id,
      },
    },
    { new: true }
  )
    .populate("author")
    .populate("comment")
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
    .populate("comment")
    .exec((err, reply) => {
      if (err) return res.json(err);

      return res.json(reply);
    });
};

// undownvote a reply
exports.undownvote_reply = function (req, res) {
  Reply.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        downvotes: req.body.id,
      },
    },
    { new: true }
  )
    .populate("author")
    .populate("comment")
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
