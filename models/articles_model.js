const connection = require("../db/connection");
const { handle402 } = require("../errors/index");

exports.fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .then(([article]) => {
      if (article) return article;
      else
        return Promise.reject({
          status: 404,
          msg: "The article is not found"
        });
    });
};

exports.updateArticleVotes = (article_id, votesUpdate) => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .increment("votes", votesUpdate)
    .returning("*")
    .then(([article]) => {
      if (article) return article;
      else return Promise.reject({ status: 404, msg: "Article Not Found" });
    });
};
