const { User } = require("../models");

exports.getUser = async (userid) => {
  const userProfile = await User.findOne({
    where: { id: userid },
    attributes: { exclude: ["password"] },
  });
  return userProfile;
};
