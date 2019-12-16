const connection = require("../db/connection");
const { handle402 } = require("../errors/index");

exports.fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id");
};

exports.updateArticleVotes = (article_id, votesUpdate) => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .then(([article]) => {
      if (article) {
        article.votes += votesUpdate;
        return article;
      } else {
        return Promise.reject({
          status: 404,
          msg: "Article is not found"
        });
      }
    });
};
