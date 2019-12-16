const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const { handle404, handleCustoms } = require("./errors/index");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustoms);
app.use("/*", handle404);

module.exports = app;
