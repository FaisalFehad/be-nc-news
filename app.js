const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const {
  handle404,
  handleCustoms,
  handle400,
  handle422,
  handle405
} = require("./errors/index");

app.use(express.json());

app.use("/api", apiRouter);

// errors
app.use(handleCustoms);
app.use(handle400);
app.use(handle422);
app.use("/*", handle404);

module.exports = app;
