require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const router = require("../src/routes/router");
const notfoundMiddleware = require("./middleware/notfoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const authenMiddleware = require("./middleware/authenMiddleware");

const app = express();
const node_env = process.env.NODE_ENV || "development";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(node_env));

app.use("/", authenMiddleware, router);

app.all("*", notfoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("server on port ", port));
