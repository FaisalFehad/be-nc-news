const { fetchAllTopics } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  fetchAllTopics().then(topics => {
    res.status(200).send({ topics });
  });
};
