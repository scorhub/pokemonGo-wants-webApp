const pokemonShinyData = require("./datafiles/pokemonshinydata");

exports.seed = function(knex, Promise) {
  return knex("pokemons_shiny").del()
    .then(function() {
      return knex("pokemons_shiny").insert(pokemonShinyData);
    });
};