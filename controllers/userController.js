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
      { expiresIn: "7d" },
      (err, token) => {
        if (err) return res.status(400).json(err);

        User.findById(user._id)
          .populate({
            path: "forums",
            populate: { path: "members moderators" },
          })
          .exec((err, user) => {
            if (err) return res.json(err);

            // get token expiration date
            const expirationDate = new Date(
              new Date().getTime() + 7 * 24 * 60 * 60 * 1000
            );

            res.json({
              token: token,
              expirationDate: expirationDate,
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

      User.create(
        { email: req.body.email, password: hash, active: false, new: true },
        (err, user) => {
          if (err) return next(err);

          jwt.sign(
            { _id: user._id, email: user.email },
            process.env.SECRET,
            { expiresIn: "7d" },
            (err, token) => {
              if (err) return next(err);

              User.findById(user._id)
                .populate({
                  path: "forums",
                  populate: { path: "members moderators" },
                })
                .exec((err, user) => {
                  if (err) return res.json(err);

                  // get token expiration date
                  const expirationDate = new Date(
                    new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                  );

                  return res.json({
                    token: token,
                    expirationDate: expirationDate,
                    user,
                  });
                });
            }
          );
        }
      );
    });
  },
];

// confirm account
exports.confirm_account = function (req, res) {
  try {
    const { id } = req.params;

    User.findByIdAndUpdate(
      id,
      {
        $set: { active: true },
      },
      { new: true },
      (err, user) => {
        if (err) return res.json(err);

        return res.json(user);
      }
    );
  } catch (err) {
    return res.json(err);
  }
};

// get single user
exports.user = async function (req, res) {
  User.findById(req.params.id)
    .populate("forums")
    .populate("notifications")
    .populate("posts")
    .exec((err, user) => {
      if (err) return res.json(err);

      return res.json(user);
    });
};

// google auth
exports.google = async function (req, res) {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    requiredAudience: process.env.GOOGLE_CLIENT_ID,
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
        { expiresIn: "7d" },
        (err, token) => {
          if (err) return res.status(400).json(err);

          User.findById(user._id)
            .populate({
              path: "forums",
              populate: { path: "members moderators" },
            })
            .exec((err, user) => {
              if (err) return res.json(err);

              // get token expiration date
              const expirationDate = new Date(
                new Date().getTime() + 7 * 24 * 60 * 60 * 1000
              );

              return res.json({
                token: token,
                expirationDate: expirationDate,
                user,
              });
            });
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

// reset password
exports.reset_password = function (req, res) {
  const { resetPasswordToken, newPassword, confirmPassword } = req.body;

  User.findOne({ resetPasswordToken }, (err, user) => {
    if (err) return res.json(err);

    if (!user) return res.status(404).json({ error: "User not found" });

    // check if new password matches confirm password
    if (newPassword !== confirmPassword)
      return res.status(401).json({
        error: "Confirmed Password must be the same as password.",
      });

    // check if token is expired
    if (new Date(user.passwordResetExpires) < new Date()) {
      return res.status(401).json({
        error: "Password reset token has expired.",
      });
    }

    // hash new password
    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) return res.json(err);

      // update password
      User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            password: hash,
          },
        },
        { new: true },
        (err, user) => {
          if (err) return res.json(err);

          return res.json(user);
        }
      );
    });
  });
};

// unmark as new
exports.unmark_as_new = function (req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        new: false,
      },
    },
    { new: true },
    (err, user) => {
      if (err) return res.json(err);

      return res.json(user);
    }
  );
};
