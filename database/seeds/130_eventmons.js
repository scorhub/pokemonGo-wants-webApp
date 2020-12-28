const eventMonsData = require("./datafiles/eventmonsdata");

exports.seed = function(knex, Promise) {
  return knex("eventmons").del()
    .then(function() {
      return knex("eventmons").insert(eventMonsData);
    });
};