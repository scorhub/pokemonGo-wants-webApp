const wantsCostumeData = require("./datafiles/wantscostumedata");

exports.seed = function(knex, Promise) {
  return knex("wants_costume").del()
    .then(function() {
      return knex("wants_costume").insert(wantsCostumeData);
    });
};