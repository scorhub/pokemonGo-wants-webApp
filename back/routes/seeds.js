var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/pokemons', (req, res, next) => {
    knex.select("*").from('pokemons').orderBy('pokemons.number')
    .then(rows => { res.status(200).json(rows) });
});

router.get('/pokemons/arean', (req, res, next) => {
    knex.select("*").from('pokemons_arean').orderBy('pokemons_arean.apid')
    .then(rows => { res.status(200).json(rows) });
});

router.get('/wants', (req, res, next) => {
    knex.select("*").from('wants').orderBy('wid')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/always', (req, res, next) => {
    knex.select("*").from('wants_always').orderBy('awid')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/arean', (req, res, next) => {
    knex.select("*").from('wants_arean').orderBy('arwid')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/features', (req, res, next) => {
    knex.select("*").from('askfeature').orderBy('afid')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

module.exports = router;