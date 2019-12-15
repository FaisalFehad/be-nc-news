const connection = require("../db/connection");
const { handle402 } = require("../errors/index");

exports.fetchUserByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username })
    .then(userArr => {
      return userArr[0];
    });
};
