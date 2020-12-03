var express = require('express');
var router = express.Router();
const config = require('../../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/pokemons', (req, res, next) => {
    knex.select("*").from('pokemons').orderBy('number')
    .then(rows => { res.status(200).json(rows) });
});

router.get('/pokemons/arean', (req, res, next) => {
    knex.select("*").from('pokemons_arean').orderBy('apid')
    .then(rows => { res.status(200).json(rows) });
});

router.get('/pokemons/costume', (req, res, next) => {
    knex.select("*").from('pokemons_costume').orderBy('cpid')
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

router.get('/costume', (req, res, next) => {
    knex.select("*").from('wants_costume').orderBy('cwid')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/features', (req, res, next) => {
    knex.select("*").from('askfeature').orderBy('afid')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/events', (req, res, next) => {

});

router.get('/eventmons', (req, res, next) => {

});

router.get('/news', (req, res, next) => {
    
});

module.exports = router;