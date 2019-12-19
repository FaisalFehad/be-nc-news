const {
  saveArticleComment,
  changeCommentVote,
  removeComment
} = require("../models/comments-model");

exports.createArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const commentObj = req.body;

  saveArticleComment(article_id, commentObj)
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
      if (deleted_count === 1) res.sendStatus(204);
      else
        return Promise.reject({
          status: 404,
          msg: "Comment Not Found"
        });
    })
    .catch(next);
};
