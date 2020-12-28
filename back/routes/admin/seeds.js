var express = require('express');
var router = express.Router();
const config = require('../../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/pokemons', (req, res, next) => {
    knex.select("*").from('pokemons').orderBy('number', 'ASC')
    .then(rows => { res.status(200).json(rows) });
});

router.get('/pokemons/arean', (req, res, next) => {
    knex.select("*").from('pokemons_arean').orderBy('aid', 'ASC')
    .then(rows => { res.status(200).json(rows) });
});

router.get('/pokemons/variant', (req, res, next) => {
    knex.select("*").from('pokemons_variant').orderBy('vid', 'ASC')
    .then(rows => { res.status(200).json(rows) });
});

router.get('/pokemons/costume', (req, res, next) => {
    knex.select("*").from('pokemons_costume').orderBy('cid', 'ASC')
    .then(rows => { res.status(200).json(rows) });
});

router.get('/pokemons/shiny', (req, res, next) => {
    knex.select("*").from('pokemons_shiny').orderBy('sid', 'ASC')
    .then(rows => { res.status(200).json(rows) });
});

router.get('/wants/lucky', (req, res, next) => {
    knex.select("*").from('wants').where('want', 1).orderBy('wid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/wants/always', (req, res, next) => {
    knex.select("*").from('wants_always').where('awant', 1).orderBy('awid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/wants/arean', (req, res, next) => {
    knex.select("*").from('wants_arean').where('arwant', 1).orderBy('arwid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/wants/variant', (req, res, next) => {
    knex.select("*").from('wants_variant').where('vwant', 1).orderBy('vwid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/wants/costume', (req, res, next) => {
    knex.select("*").from('wants_costume').where('cwant', 1).orderBy('cwid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/wants/shiny', (req, res, next) => {
    knex.select("*").from('wants_shiny').where('swant', 1).orderBy('swid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/features', (req, res, next) => {
    knex.select("*").from('askfeature').whereNot('farchived', 1).orderBy('afid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/news', (req, res, next) => {
    knex.select("*").from('news').whereNot('narchived', 1).orderBy('nid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

let dateNow = new Date();
let year = dateNow.getFullYear();
let month = dateNow.getMonth()-2;
let day = dateNow.getDate();
if(month < 10) { month = "0" + month; };
if(day < 10) { day = "0" + day; };
let threeMonthsAgo = year + "-" + month + "-" + day;

router.get('/events', (req, res, next) => {
    knex.select("*").from('events').where('estart', '>=', threeMonthsAgo).orderBy('eid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.get('/eventmons', (req, res, next) => {
    knex.select('emid', 'eventmons.eid', 'epid').from('eventmons').join('events', 'events.eid', 'eventmons.eid').where('estart', '>=', threeMonthsAgo).orderBy('emid', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

module.exports = router;