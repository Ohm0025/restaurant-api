require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./src/routes/router");
const notfoundMiddleware = require("./src/middleware/notfoundMiddleware");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const authenMiddleware = require("./src/middleware/authenMiddleware");

const app = express();
const node_env = process.env.NODE_ENV === "development" ? "dev" : "";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(node_env));

app.use("/", authenMiddleware, router);

app.all("*", notfoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send("hello vercel");
});

app.listen(port, () => console.log("server on port ", port));

module.exports = app;
