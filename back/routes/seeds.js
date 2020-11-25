var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

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

router.get('/areanwants', (req, res, next) => {
    knex.select("*").from('wants_arean').orderBy('arwid')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

module.exports = router;