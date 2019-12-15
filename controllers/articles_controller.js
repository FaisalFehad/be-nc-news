const { fetchArticleById } = require("../models/articles_model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id).then(articleArr => {
    const article = articleArr[0];
    if (article) res.status(200).send({ article });
    else res.status(404).send({ msg: "The article is not found" });
  });
};
