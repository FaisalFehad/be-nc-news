const connection = require("../db/connection");

exports.saveArticleComment = (article_id, comment) => {
  const newComment = {
    author: comment.username,
    article_id,
    body: comment.body
  };
  return connection
    .insert(newComment)
    .into("comments")
    .returning("*")
    .then(postedCommentArr => {
      return postedCommentArr[0];
    });
};
