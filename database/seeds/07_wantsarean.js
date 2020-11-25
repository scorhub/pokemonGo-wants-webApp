const wantsAreanData = require("./datafiles/wantsareandata");

exports.seed = function(knex, Promise) {
  return knex("wants_arean").del()
    .then(function() {
      return knex("wants_arean").insert(wantsAreanData);
    });
};