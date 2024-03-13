const { User } = require("../models");
const AppError = require("../utility/appError");

exports.getUser = async (userid) => {
  const userProfile = await User.findOne({
    where: { id: userid },
    attributes: { exclude: ["password"] },
  });
  return userProfile;
};

exports.createUser = async (userObj) => {
  const userProfile = await User.create({ ...userObj });

  return userProfile;
};
