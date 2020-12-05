const newsData = require("./datafiles/newsdata");

exports.seed = function(knex, Promise) {
  return knex("news").del()
    .then(function() {
      return knex("news").insert(newsData);
    });
};