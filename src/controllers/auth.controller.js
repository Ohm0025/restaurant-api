const bcrypt = require("bcryptjs");
const { createUser, findLoginUser } = require("../db/userQuery");
const genToken = require("../utility/genToken");
const AppError = require("../utility/appError");

exports.registerController = async (req, res, next) => {
  try {
    const reqBody = req.body;

    if (!reqBody.password || reqBody.password?.trim() === "") {
      throw new AppError("password is required.", 400);
    }

    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!reqBody.password.match(passRegex)) {
      throw new AppError("password is invalid.", 400);
    }

    //password between 8 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter

    const hashPassword = await bcrypt.hash(reqBody.password, 10);

    const userProfile = await createUser({
      ...reqBody,
      password: hashPassword,
      role: "client",
    });
    res.status(201).json({ userProfile, message: "create new user success" });
  } catch (err) {
    next(err);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //validate login
    if (!email || !password) {
      throw new AppError("email and password is required.", 400);
    }

    //validate email format
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      throw new AppError("email invalid", 400);
    }

    //validate exist user
    const findUser = await findLoginUser(email);

    if (!findUser) {
      throw new AppError("this user not found.", 400);
    }

    //validate password
    const isCorrect = await bcrypt.compare(password, findUser.password);
    if (!isCorrect) {
      throw new AppError("password is incorrect.", 400);
    } else {
      //finally generate token
      res.status(200).json({ token: genToken({ userid: findUser.id }) });
    }
  } catch (err) {
    next(err);
  }
};
