const bcrypt = require("bcryptjs");
const { createUser } = require("../db/userQuery");

exports.registerController = async (req, res, next) => {
  try {
    const reqBody = req.body;

    const hashPassword = await bcrypt.hash(reqBody.password || "", 10);

    const userProfile = await createUser({
      ...reqBody,
      password: hashPassword,
    });
    res.status(201).json({ userProfile });
  } catch (err) {
    next(err);
  }
};
