var express = require('express');
var router = express.Router();
const config = require('../../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/count', (req, res, next) => {
    knex('pokemons').count('pid as amount')
    .then(data => { res.status(200).json(data[0].amount) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.post('/', (req, res, next) => {
    const pokemon = {
        // Pokédex entry number of Pokémon can be sended to backend, if you want to add them manually. Otherwise you can use code used below to calculate them automatically.
        number: req.body.number,
        name: req.body.name,
        // Add your preferred outside image url, or use addon to upload images to server.
        img: req.body.img
    };
    if (!pokemon.name) { return res.status(400).json({error: 'Content missing: Name.'}) };
    if (!pokemon.img.startsWith('http')) { return res.status(400).json({error: 'Image must be in url-form.'}) };
    knex.select("*").from('pokemons')
    .then(pokemons => {
        // Pokédex entry number can be calculated automatically (as provided) or added manually.
        const entryNumber = pokemons.length+1;
        // Manual input of the entry number.
        // const entryNumber = pokemon.number;
        const addPokemon = {
        number: entryNumber,
        name: pokemon.name,
        img: pokemon.img,
        pupdated: new Date()
        };
        knex('pokemons').insert(addPokemon)
        .then(pid => {
            addPokemon.pid = pid[0];
            res.status(200).json(addPokemon)
        }).catch(err => { res.status(500).json({error: 'Database error in insert, or auth failed.'}) });
    }).catch(err => { res.status(503).json({error: 'Database error in insert, or auth failed.'}) });
});

router.post('/arean', (req, res, next) => {
    const arean = {
        // Note: Input requires specific Pokédex entry number, which works as foreign key.
        apid: Number(req.body.number),
        areanimg: req.body.img,
        paupdated: new Date()
    };
    if (!arean.apid || !arean.areanimg) { return res.status(400).json({error: 'Content missing: Number or image.'}) };
    if (!arean.areanimg.startsWith('http')) { return res.status(400).json({error: 'Image must be in url-form.'}) };
    knex('pokemons_arean').insert(arean)
    .then(ok => {
        res.status(204).end();
    }).catch(err => { res.status(500).json({error: 'Database error in insert, or auth failed.'}) });
});

router.post('/variant', (req, res, next) => {
    const variant = {
        // Note: Input requires specific Pokédex entry number, which works as foreign key.
        vpid: Number(req.body.number),
        vversion: req.body.version,
        variantimg: req.body.img,
        pvupdated: new Date()
    };
    if (!variant.vpid || !variant.vversion || !variant.variantimg) { return res.status(400).json({error: 'Content missing: Number, version or image.'}) };
    if (!variant.variantimg.startsWith('http')) { return res.status(400).json({error: 'Image must be in url-form.'}) };
    knex('pokemons_variant').insert(variant)
    .then(ok => {
        res.status(204).end();
    }).catch(err => { res.status(500).json({error: 'Database error in insert, or auth failed.'}) });
});

router.post('/costume', (req, res, next) => {
    const costume = {
        // Note: Input requires specific Pokédex entry number, which works as foreign key.
        cpid: Number(req.body.number),
        version: req.body.version,
        costumeimg: req.body.img,
        cfirstappearance: req.body.cfirstappearance,
        pcupdated: new Date()
    };
    if (!costume.cpid || !costume.version || !costume.costumeimg) { return res.status(400).json({error: 'Content missing: Number, version or image.'}) };
    if (!costume.costumeimg.startsWith('http')) { return res.status(400).json({error: 'Image must be in url-form.'}) };
    knex('pokemons_costume').insert(costume)
    .then(ok => {
        res.status(204).end();
    }).catch(err => { res.status(500).json({error: 'Database error in insert, or auth failed.'}) });
});

router.post('/shiny', (req, res, next) => {
    const shiny = {
        // Note: Input requires specific Pokédex entry number, which works as foreign key.
        spid: Number(req.body.number),
        shinyimg: req.body.shinyimg,
        psupdated: new Date()
    };
    if (!shiny.spid || !shiny.shinyimg) { return res.status(400).json({error: 'Content missing: Number or image.'}) };
    if (!shiny.shinyimg.startsWith('http')) { return res.status(400).json({error: 'Image must be in url-form.'}) };
    knex('pokemons_shiny').insert(shiny)
    .then(ok => {
        res.status(204).end();
    }).catch(err => { res.status(500).json({error: 'Database error in insert, or auth failed.'}) });
});

module.exports = router;