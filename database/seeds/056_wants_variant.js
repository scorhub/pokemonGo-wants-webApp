const wantsVariantData = require("./datafiles/wantsvariantdata");

exports.seed = function(knex, Promise) {
  return knex("wants_variant").del()
    .then(function() {
      return knex("wants_variant").insert(wantsVariantData);
    });
};