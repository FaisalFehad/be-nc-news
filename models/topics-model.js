const connection = require("../db/connection");
const { handle402 } = require("../errors/index");

exports.fetchAllTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then(topics => {
      if (!topics) handle402();
      else return topics;
    });
};
