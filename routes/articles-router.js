const articlesRouter = require("express").Router();
const {
  getArticleById,
  changeArticleVotes
} = require("../controllers/articles_controller");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(changeArticleVotes);

module.exports = articlesRouter;
