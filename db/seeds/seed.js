const { topics, articles, comments, users } = require("../data/");
const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  const topicsInsertions = knex("topics").insert(topics);
  const usersInsertions = knex("users").insert(users);
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => Promise.all([topicsInsertions, usersInsertions]))
    .then(() => {
      const formatedArticles = formatDates(articles);
      return knex
        .insert(formatedArticles)
        .into("articles")
        .returning("*");
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(comments, articleRef);
      return knex("comments").insert(formattedComments);
    });
};
