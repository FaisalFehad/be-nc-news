const connection = require("../db/connection");
const { handle402 } = require("../errors/index");

exports.fetchUserByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username })
    .then(userArr => {
      if (userArr[0]) return userArr[0];
      else {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
    });
};
