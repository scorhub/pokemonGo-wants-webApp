var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/type/list', (req, res, next) => {
    knex.select('pid', 'number', 'name', 'type1', 'type2', 'img').from('pokemons').whereNull('type1').orWhereNull('type2').orderBy('number', 'ASC')
    .then(notSet => {
        res.status(200).json(notSet);
    }).catch(err => { res.status(500).json({error: 'Database error on fetching data.'});});
});

router.patch('/type/:id', (req, res, next) => {
    const body = req.body;
    console.log(body)
    const id = req.params.id;
    if (body.type1 === undefined && body.type2 === undefined) { return res.status(400).json({error: 'Type required.'}); };
    knex.first('*').from('pokemons').where('pid', '=', id)
    .then(pokemon => {
        if ((pokemon.type1 && pokemon.type2) !== null) { return res.status(403).json({error: 'Types are already defined.'}); };
        if ((pokemon.type1 !== null && body.type1 !== undefined)) { return res.status(403).json({error: 'Type 1 is already defined.'}); };
        if ((body.type1 === undefined && pokemon.type1 === null)) { return res.status(403).json({error: 'Type 1 must be defined before type 2.'}); };
        var updTypes = {};
        if (body.type1 !== undefined) { updTypes.type1 = body.type1 };
        if (body.type2 !== undefined) { updTypes.type2 = body.type2 };
        knex('pokemons').where('pid', '=', id).update(updTypes)
        .then(updated => {
            res.status(204).end();
        }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
    }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
});

router.get('/generation/list', (req, res, next) => {
    knex.select('pid', 'number', 'name', 'generation', 'img').from('pokemons').whereNull('generation').orderBy('number', 'ASC')
    .then(notSet => {
        res.status(200).json(notSet);
    }).catch(err => { res.status(500).json({error: 'Database error on fetching data.'});});
});

router.patch('/generation/:id', (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    if (body.generation === undefined) { return res.status(400).json({error: 'Generation required.'}); };
    if (isNaN(body.generation)) { return res.status(400).json({error: 'Generation required in number format.'}); };
    knex.first('*').from('pokemons').where('pid', '=', id)
    .then(pokemon => {
        if (pokemon.generation !== null) { return res.status(403).json({error: 'Generation is already defined.'}); };
        var updGeneration = {};
        if (body.generation !== undefined) { updGeneration.generation = body.generation };
        knex('pokemons').where('pid', '=', id).update(updGeneration)
        .then(updated => {
            res.status(204).end();
        }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
    }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
});

router.get('/rarity/list', (req, res, next) => {
    knex.select('pid', 'number', 'name', 'rarity', 'img').from('pokemons').whereNull('rarity').orderBy('number', 'ASC')
    .then(notSet => {
        res.status(200).json(notSet);
    }).catch(err => { res.status(500).json({error: 'Database error on fetching data.'});});
});

router.patch('/rarity/:id', (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    if (body.rarity === undefined && body.subrarity === undefined) { return res.status(400).json({error: 'Rarity required.'}); };
    knex.first('*').from('pokemons').where('pid', '=', id)
    .then(pokemon => {
        if ((pokemon.rarity && pokemon.subrarity) !== null) { return res.status(403).json({error: 'Rarities are already defined.'}); };
        if ((pokemon.rarity !== null && body.rarity !== undefined)) { return res.status(403).json({error: 'Rarity is already defined.'}); };
        if ((body.rarity === undefined && pokemon.rarity === null)) { return res.status(403).json({error: 'Rarity must be defined before subrarity.'}); };
        var updRarity = {};
        if (body.rarity !== undefined) { updRarity.rarity = body.rarity };
        if (body.subrarity !== undefined) { updRarity.subrarity = body.subrarity };
        knex('pokemons').where('pid', '=', id).update(updRarity)
        .then(updated => {
            res.status(204).end();
        }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
    }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
});

router.get('/released/list', (req, res, next) => {
    knex.select('pid', 'number', 'name', 'img').from('pokemons').whereNull('released').orderBy('number', 'ASC')
    .then(notSet => {
        res.status(200).json(notSet);
    }).catch(err => { res.status(500).json({error: 'Database error on fetching data.'});});
});

router.patch('/released/:id', (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    if (body.released === undefined) { return res.status(400).json({error: 'Released info required.'}); };
    if (typeof body.released !== 'boolean') { return res.status(400).json({error: 'Released info required in boolean.'}); };
    knex.first('*').from('pokemons').where('pid', '=', id)
    .then(pokemon => {
        if (pokemon.released !== null) { return res.status(403).json({error: 'Released info is already defined.'}); };
        var updReleased = {};
        if (body.released !== undefined) { updReleased.released = body.released };
        knex('pokemons').where('pid', '=', id).update(updReleased)
        .then(updated => {
            res.status(204).end();
        }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
    }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
});

module.exports = router;