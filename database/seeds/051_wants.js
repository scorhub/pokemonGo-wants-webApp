const wantsData = require("./datafiles/wantsdata");

exports.seed = function(knex, Promise) {
  return knex("wants").del()
    .then(function() {
      return knex("wants").insert(wantsData);
    });
};