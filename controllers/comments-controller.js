const {
  saveCommentByArticle,
  changeCommentVote,
  removeComment
} = require("../models/comments-model");

exports.createArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const commentObj = req.body;

  saveCommentByArticle(article_id, commentObj)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.updateCommentVote = (req, res, next) => {
  const { comment_id } = req.params;
  const newVote = req.body;

  changeCommentVote(comment_id, newVote)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  removeComment(comment_id)
    .then(deleted_count => {
      res.sendStatus(204);
    })
    .catch(next);
};
