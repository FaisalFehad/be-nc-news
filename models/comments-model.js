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

exports.fetchCommentsByArticleId = (article_id, query) => {
  // set default values
  if (!query.sort_by) sort_by = query.sort_by = "created_at";
  if (!query.order) order = query.order = "desc";

  return connection
    .select("comment_id", "votes", "created_at", "body", "author as username")
    .from("comments")
    .where({ article_id })
    .orderBy(query.sort_by, query.order)
    .then(comments => {
      if (comments.length) return comments;
      else return Promise.reject({ status: 404, msg: "Article not found" });
      console.log(comments);
    });
};
