const wantsShinyData = require("./datafiles/wantsshinydata");

exports.seed = function(knex, Promise) {
  return knex("wants_shiny").del()
    .then(function() {
      return knex("wants_shiny").insert(wantsShinyData);
    });
};