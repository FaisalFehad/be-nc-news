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
      if (postedCommentArr) return postedCommentArr[0];
    });
};

exports.fetchCommentsByArticleId = article_id => {
  return connection
    .select("comment_id", "votes", "created_at", "body", "author as username")
    .from("comments")
    .where({ article_id })
    .then(comments => {
      return comments;
    });
};
