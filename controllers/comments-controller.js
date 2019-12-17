const {
  saveArticleComment,
  changeCommentVote
} = require("../models/comments-model");

exports.createArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const commentObj = req.body;

  saveArticleComment(article_id, commentObj)
    .then(postedComment => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};

exports.updateCommentVote = (req, res, next) => {
  const { comment_id } = req.params;
  const newVote = req.body;

  changeCommentVote(comment_id, newVote)
    .then(updatedComment => {
      res.status(201).send({ updatedComment });
    })
    .catch(next);
};
