const pokemonVariantData = require("./datafiles/pokemonvariantdata");

exports.seed = function(knex, Promise) {
  return knex("pokemons_variant").del()
    .then(function() {
      return knex("pokemons_variant").insert(pokemonVariantData);
    });
};