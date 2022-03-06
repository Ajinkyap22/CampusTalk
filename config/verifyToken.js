require("dotenv").config();
const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // verify the token
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.user = authData;
      // Next middleware
      next();
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
