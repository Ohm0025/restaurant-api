const express = require("express");
const router = express.Router();
const authRoute = require("./auth.Route");

router.use(authRoute);

module.exports = router;
