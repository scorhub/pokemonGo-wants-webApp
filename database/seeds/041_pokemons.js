const pokemonData = require("./datafiles/pokemondata");

exports.seed = function(knex, Promise) {
  return knex("pokemons").del()
    .then(function() {
      return knex("pokemons").insert(pokemonData
      );
    });
};