const featureData = require("./datafiles/featuredata");

exports.seed = function(knex, Promise) {
  return knex("askfeature").del()
    .then(function() {
      return knex("askfeature").insert(featureData);
    });
};