const wantsAlwaysData = require("./datafiles/wantsalwaysdata");

exports.seed = function(knex, Promise) {
  return knex("wants_always").del()
    .then(function() {
      return knex("wants_always").insert(wantsAlwaysData);
    });
};