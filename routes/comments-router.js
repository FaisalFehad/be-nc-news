const commentsRouter = require("express").Router();
const { handle405 } = require("../errors/index");
const {
  updateCommentVote,
  deleteComment
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVote)
  .delete(deleteComment)
  .all(handle405);

module.exports = commentsRouter;
