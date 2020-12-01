const pokemonCostumeData = require("./datafiles/pokemoncostumedata");

exports.seed = function(knex, Promise) {
  return knex("pokemons_costume").del()
    .then(function() {
      return knex("pokemons_costume").insert(pokemonCostumeData);
    });
};