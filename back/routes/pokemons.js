var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex.select("*").from('pokemons').orderBy('pokemons.number')
    .then(rows => { res.status(200).json(rows) });
});

router.post('/', (req, res, next) => {
    const pokemon = {
        // Pokédex entry number of Pokémon can be sended to backend, if you want to add them manually. Otherwise you can use code used below to calculate them automatically.
        number: req.body.number,
        name: req.body.name,
        // Add your preferred outside image url, or use addon to upload images to server.
        img: 'url_to_image'
    };
    if (!pokemon.name) { return res.status(400).json({error: 'Content missing: Name.'}) };
    knex.select("*").from('pokemons')
    .then(pokemons => {
        // Pokédex entry number can be calculated automatically (as provided) or added manually.
        const entryNumber = pokemons.length+1;
        // Manual input of the entry number.
        // const entryNumber = pokemon.number;
        const addPokemon = {
        number: entryNumber,
        name: pokemon.name,
        img: pokemon.img
        };
        knex('pokemons').insert(addPokemon)
        .then(pid => {
            pogo.pid = pid[0];
            res.status(200).json(addPokemon)
        }).catch(err => { res.status(500).json({error: 'Database error in insert, or auth failed.'}) });
    }).catch(err => { res.status(500).json({error: 'Database error in insert, or auth failed.'}) });
});

module.exports = router;