const connection = require("../db/connection");
const { handle402 } = require("../errors/index");

exports.fetchAllTopics = () => {
  return connection.select("*").from("topics");
};
