const { saveArticleComment } = require("../models/comments-model");

exports.createArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const commentObj = req.body;

  saveArticleComment(article_id, commentObj)
    .then(postedComment => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};
