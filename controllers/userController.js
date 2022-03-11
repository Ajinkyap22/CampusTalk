require("dotenv").config();
const Post = require("../models/post");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

// get users
exports.users_get = function (req, res, next) {
  User.find()
    .sort([["username", "ascending"]])
    .exec((err, users) => {
      if (err) res.json(err);

      res.json(users);
    });
};

// login
exports.login_post = function (req, res) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Incorrect E-mail or Password",
        user,
      });
    }

    jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) return res.status(400).json(err);

        User.findById(user._id)
          .populate({
            path: "forums",
            populate: { path: "members moderators" },
          })
          .exec((err, user) => {
            if (err) return res.json(err);

            res.json({
              token: token,
              user,
            });
          });
      }
    );
  })(req, res);
};

// signup
exports.signup_post = [
  // sanitize and validate fields
  body("email", "E-mail must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 }),
  body("password", "Password must be at least 8 characters long.")
    .trim()
    .isLength({ min: 8 }),
  body("confirmPassword", "Password must be at least 8 characters long.")
    .trim()
    .isLength({ min: 8 })
    .custom(async (value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Cnofirmed Password must be the same as password");
      return true;
    }),

  // process request
  async (req, res, next) => {
    // extract errors
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    // check if email exists
    const userExists = await User.find({ email: req.body.email });
    if (userExists.length > 0) {
      return res.status(409).json({
        error: "E-mail ID already in use",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({
        error: "Confirmed Password must be the same as password.",
      });
    }

    // create new user
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return next(err);

      User.create({ email: req.body.email, password: hash }, (err, user) => {
        if (err) return next(err);

        jwt.sign(
          { _id: user._id, email: user.email },
          process.env.SECRET,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) return next(err);

            User.findById(user._id)
              .populate({
                path: "forums",
                populate: { path: "members moderators" },
              })
              .exec((err, user) => {
                if (err) return res.json(err);

                return res.json({
                  token: token,
                  user,
                });
              });

            // return res.status(200).json({
            //   token,
            //   user: {
            //     _id: user._id,
            //     email: user.email,
            //   },
            //   message: "Signup successful",
            // });
          }
        );
      });
    });
  },
];

// get single user
exports.user = async function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) res.json(err);

    res.json(user);
  });
};

// google auth
exports.google = async function (req, res) {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { given_name, family_name, email, picture } = ticket.getPayload();

  User.findOneAndUpdate(
    { email },
    { firstName: given_name, lastName: family_name, email, picture },
    { upsert: true, new: true },
    function (err, user) {
      if (err) res.json(err);

      jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "10m" },
        (err, token) => {
          if (err) return res.status(400).json(err);

          User.findById(user._id)
            .populate({
              path: "forums",
              populate: { path: "members moderators" },
            })
            .exec((err, user) => {
              if (err) return res.json(err);

              return res.json({
                token: token,
                user,
              });
            });

          // return res.json({
          //   token: token,
          //   user: {
          //     _id: user._id,
          //     email: user.email,
          //     firstName: user.firstName,
          //     lastName: user.lastName,
          //   },
          // });
        }
      );
    }
  );
};

// delete single user
exports.delete_user = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.json(err);

    return res.json(user);
  });
};

// update profile
exports.profile = [
  // sanitize and validate fields
  body("firstName", "First name cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("lastName", "Last name cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("email", "E-mail must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 }),
  // process request
  async (req, res) => {
    // extract errors
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    // check if email exists
    const userExists = await User.find({ email: req.body.email });

    if (userExists.length > 0 && userExists[0]._id != req.params.id) {
      return res.status(409).json({
        error: "E-mail ID already in use",
      });
    }

    // update profile
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          picture: req.file?.filename || req.body.picture || "",
        },
      },
      { new: true },
      function (err, user) {
        if (err) return res.json(err);

        return res.json(user);
      }
    );
  },
];

// get all post created by user
exports.get_user_posts = function (req, res) {
  Post.find({ author: req.params.id, approved: true })
    .populate("author")
    .populate("forum")
    .populate("comments")
    .exec((err, posts) => {
      if (err) return res.json(err);

      return res.json(posts);
    });
};
