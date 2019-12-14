const { topics, articles, comments, users } = require("../data/");
const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  const topicsInsertions = knex("topics").insert(topics);
  const usersInsertions = knex("users").insert(users);

  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return Promise.all([topicsInsertions, usersInsertions]);
    })
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

  /* 
      
      Your article data is currently in the incorrect format and will violate your SQL schema. 
      
      You will need to write and test the provided formatDate utility function to be able insert your article data.

      Your comment insertions will depend on information from the seeded articles, so make sure to return the data after it's been seeded.
      */

  // Your comment data is currently in the incorrect format and will violate your SQL schema.

  // Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id.

  // You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
  // */
};
