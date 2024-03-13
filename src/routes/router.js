const express = require("express");
const router = express.Router();
const authRoute = require("./auth.Route");

router.use("/authen", authRoute);

module.exports = router;
