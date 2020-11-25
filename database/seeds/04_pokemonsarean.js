const pokemonAreanData = require("./datafiles/pokemonareandata");

exports.seed = function(knex, Promise) {
  return knex("pokemons_arean").del()
    .then(function() {
      return knex("pokemons_arean").insert(pokemonAreanData);
    });
};