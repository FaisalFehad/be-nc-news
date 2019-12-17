const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics-controller");
const { handle405 } = require("../errors/index");

topicsRouter
  .route("/")
  .get(getTopics)
  .all(handle405);

module.exports = topicsRouter;
