const commentsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics-controller");
const { handle405 } = require("../errors/index");
const { updateCommentVote } = require("../controllers/comments-controller");

commentsRouter.route("/:comment_id").patch(updateCommentVote);

module.exports = commentsRouter;
