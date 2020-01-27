const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api-router");
const {
  handle404,
  handleCustoms,
  handle400,
  handle422,
  handle500
} = require("./errors/index");
app.use(express.static(path.join(__dirname, "build")));

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

// errors
app.use(handleCustoms);
app.use(handle400);
app.use(handle422);
app.use(handle500);
app.all("/*", handle404);

module.exports = app;
