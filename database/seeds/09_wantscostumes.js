const wantsCostumesData = require("./datafiles/wantscostumesdata");

exports.seed = function(knex, Promise) {
  return knex("wants_costumes").del()
    .then(function() {
      return knex("wants_costumes").insert(wantsCostumesData);
    });
};