const jwt = require("jsonwebtoken");

const AppError = require("../utility/appError");
const { getUser } = require("../db/userQuery");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    if (token) {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "private_key"
      );

      const userProfile = await getUser(payload.userid);
      req.userProfile = userProfile;
    }
    next();
  } catch (err) {
    next(err);
  }
};
