const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const { handle404 } = require("./errors/index");
app.use(express.json());

app.use("/api", apiRouter);

app.use("/*", handle404);

module.exports = app;
