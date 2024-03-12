require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notfoundMiddleware = require("./middleware/notfoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(notfoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("server on port ", port));
