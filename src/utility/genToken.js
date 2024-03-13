const jwt = require("jsonwebtoken");

module.exports = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || "private_key", {
    expiresIn: process.env.JWT_EXPIRES || "1d",
  });
