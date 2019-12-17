const articlesRouter = require("express").Router();
const {
  getArticleById,
  changeArticleVotes,
  getCommentsByArticleId
} = require("../controllers/articles_controller");

const { createArticleComment } = require("../controllers/comments-controller");
const { handle405 } = require("../errors/index");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(changeArticleVotes)
  .all(handle405);

articlesRouter
  .route("/:article_id/comments")
  .post(createArticleComment)
  .get(getCommentsByArticleId)
  .all(handle405);

module.exports = articlesRouter;
