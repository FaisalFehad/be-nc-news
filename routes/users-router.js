const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users-controller");
const { handle405 } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .all(handle405);

module.exports = usersRouter;
