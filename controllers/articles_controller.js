const {
  fetchArticleById,
  updateArticleVotes
} = require("../models/articles_model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id).then(articleArr => {
    const article = articleArr[0];
    if (article) res.status(200).send({ article });
    else res.status(404).send({ msg: "The article is not found" });
  });
};

exports.changeArticleVotes = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  updateArticleVotes(article_id, inc_votes).then(updatedArticle => {
    res.status(201).send({ updatedArticle });
  });
};
