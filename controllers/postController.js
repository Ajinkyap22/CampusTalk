const Post = require("../models/post");
const Forum = require("../models/forum");
const User = require("../models/user");

// get all posts
exports.posts = function (req, res) {
  // find posts by forum & sort by date
  Post.find({ forum: req.params.id, approved: true })
    .sort({ timestamp: -1 })
    .populate("author")
    .populate("forum")
    .populate("comments")
    .exec((err, posts) => {
      if (err) return res.json(err);

      return res.json(posts);
    });
};

// get all unapproved posts
exports.unapproved_posts = function (req, res) {
  // find posts by forum & sort by date
  Post.find({ forum: req.params.id, approved: false })
    .sort({ timestamp: -1 })
    .populate("author")
    .populate("forum")
    .populate("comments")
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
  const files = [];
  const fileNames = [];

  if (req.files?.length) {
    // push the filename field from each member of req.files array to files array
    req.files.forEach((file) => {
      files.push(file.filename);
    });
  }

  if (req.body.originalFileNames) {
    // if it is an array
    if (Array.isArray(req.body.originalFileNames)) {
      req.body.originalFileNames.forEach((originalFile) => {
        fileNames.push(JSON.parse(originalFile));
      });
    } else {
      let originalFileNames = JSON.parse(req.body.originalFileNames);
      fileNames.push(originalFileNames);
    }
  }

  Post.create(
    {
      text: req.body.text || "",
      file: files,
      anonymous: req.body.anonymous || false,
      originalFileNames: fileNames || [],
      author: req.body.authorId,
      forum: req.body.forumId,
      important: req.body.important || false,
    },
    async (err, post) => {
      if (err) return res.json(err);

      // populate author & forum fields of the post
      let newPost = await Post.populate(post, { path: "author" });

      newPost = await Post.populate(post, { path: "forum" });

      return res.json(newPost);
    }
  );
};

// create post with a document or video
exports.create_doc_post = function (req, res) {
  const fileNames = [];

  if (req.body.originalFileNames) {
    fileNames.push(JSON.parse(req.body.originalFileNames));
  }

  Post.create(
    {
      text: req.body.text || "",
      file: req.file?.filename || req.body?.file || "",
      anonymous: req.body.anonymous || false,
      originalFileNames: fileNames || [],
      author: req.body.authorId,
      forum: req.body.forumId,
      important: req.body.important || false,
    },
    async (err, post) => {
      if (err) return res.json(err);

      let newPost = await Post.populate(post, { path: "author" });
      newPost = await Post.populate(post, { path: "forum" });

      return res.json(newPost);
    }
  );
};

// approve post
exports.approve_post = function (req, res) {
  Forum.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        posts: req.params.postId,
      },
    },
    { new: true }
  )
    .populate("posts")
    .exec((err) => {
      if (err) return res.json(err);

      // set post approved to true & populate author & forum fields
      Post.findByIdAndUpdate(
        req.params.postId,
        {
          approved: true,
        },
        { new: true }
      )
        .populate("author")
        .populate("forum")
        .populate("comments")
        .exec((err, post) => {
          if (err) return res.json(err);

          // update user posts
          User.findByIdAndUpdate(
            req.body.authorId,
            {
              $push: {
                posts: post._id,
              },
            },
            { new: true }
          ).exec((err) => {
            if (err) return res.json(err);

            return res.json(post);
          });
        });
    });
};

// reject post
exports.reject_post = function (req, res) {
  Post.findByIdAndRemove(req.params.postId, (err) => {
    if (err) return res.json(err);

    return res.json({ message: "Post rejected" });
  });
};

// delete a post
exports.delete_post = function (req, res) {
  Post.findByIdAndRemove(req.params.postId, function (err, post) {
    if (err) return res.json(err);

    // update forum
    Forum.findByIdAndUpdate(
      post.forum,
      {
        $pull: {
          posts: post._id,
        },
      },
      { new: true }
    ).exec((err) => {
      if (err) return res.json(err);

      // update user posts
      User.findByIdAndUpdate(
        post.author,
        {
          $pull: {
            posts: post._id,
          },
        },
        { new: true }
      ).exec((err) => {
        if (err) return res.json(err);

        return res.json(post);
      });
    });
  });
};

exports.update_post = function (req, res) {
  let fileNames = [];
  let files = [];

  // if req.body.file is an array
  if (Array.isArray(req.body.file)) {
    files = [...req.body.file];
  }

  if (req.files?.length) {
    // push the filename field from each member of req.files array to files array
    req.files.forEach((file) => {
      files.push(file.filename);
    });
  }

  if (req.body.originalFileNames && Array.isArray(req.body.originalFileNames)) {
    req.body.originalFileNames.forEach((originalFile) => {
      fileNames.push(JSON.parse(originalFile));
    });
  } else if (req.body.originalFileNames) {
    fileNames = [JSON.parse(req.body.originalFileNames)];
  }

  let set = {
    text: req.body.text || "",
    anonymous: req.body.anonymous || false,
    originalFileNames: fileNames || [],
    important: req.body.important || false,
  };

  console.log(req.body, req.file, req.files);

  if (Array.isArray(req.body.file) || req.files?.length) {
    set.file = files;
  }

  if (req.file) {
    set.file = req.file.filename;
  }

  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set: set,
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
      $push: { upvotes: req.body.id },
      $pull: {
        downvotes: req.body.id,
      },
    },
    { new: true }
  )
    .populate("author")
    .populate("forum")
    .exec((err, post) => {
      if (err) return res.json(err);

      return res.json(post);
    });
};

// unupvote a post
exports.unupvote_post = function (req, res) {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $pull: { upvotes: req.body.id },
    },
    { new: true }
  )
    .populate("author")
    .populate("forum")
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
      $addToSet: { downvotes: req.body.id },
      $pull: {
        upvotes: req.body.id,
      },
    },
    { new: true }
  )
    .populate("author")
    .populate("forum")
    .exec((err, post) => {
      if (err) return res.json(err);

      return res.json(post);
    });
};

// undownvote a post
exports.undownvote_post = function (req, res) {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $pull: { downvotes: req.body.id },
    },
    { new: true }
  )

    .populate("author")
    .populate("forum")
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
