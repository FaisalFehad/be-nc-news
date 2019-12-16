const articlesRouter = require("express").Router();
const {
  getArticleById,
  changeArticleVotes,
  getCommentsByArticleId
} = require("../controllers/articles_controller");

const { createArticleComment } = require("../controllers/comments-controller");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(changeArticleVotes);

articlesRouter
  .route("/:article_id/comments")
  .post(createArticleComment)
  .get(getCommentsByArticleId);

module.exports = articlesRouter;
