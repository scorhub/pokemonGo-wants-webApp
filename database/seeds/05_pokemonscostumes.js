const pokemonCostumeData = require("./datafiles/pokemoncostumedata");

exports.seed = function(knex, Promise) {
  return knex("pokemons_costumes").del()
    .then(function() {
      return knex("pokemons_costumes").insert(pokemonCostumeData);
    });
};