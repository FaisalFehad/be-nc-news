const connection = require("../db/connection");

exports.saveCommentByArticle = (article_id, comment) => {
  const newComment = {
    author: comment.username,
    article_id,
    body: comment.body
  };
  return connection
    .insert(newComment)
    .into("comments")
    .returning("*")
    .then(([postedComment]) => {
      if (!postedComment)
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      else return postedComment;
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
      return comments;
    });
};

exports.changeCommentVote = (comment_id, newVote) => {
  return connection
    .select("*")
    .from("comments")
    .where({ comment_id })
    .increment("votes", newVote.inc_votes)
    .returning("*")
    .then(([comment]) => {
      if (comment) return comment;
      else return Promise.reject({ status: 404, msg: "Comment Not Found" });
    });
};

exports.removeComment = comment_id => {
  return connection
    .from("comments")
    .where({ comment_id })
    .del()
    .then(deleted_comment => {
      return deleted_comment;
    });
};
