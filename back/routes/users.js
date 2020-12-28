var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex.select('uid', 'showname').from('users').whereNot('uid', '=', res.locals.auth.uid).orderBy('showname', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

router.get('/:id', (req, res, next) => {
    knex.select('pid', 'number', 'name', 'rarity', 'generation', 'img', 'want').from('wants').join('pokemons', 'wants.wpid', '=', 'pokemons.pid').where('wants.uid', '=', req.params.id).andWhere('wants.want', '=', 1).orderBy('pokemons.number', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting lucky wants of a player.'}) });
});

router.get('/always/:id', (req, res, next) => {
    knex.select('pid', 'number', 'name', 'rarity', 'generation', 'img', 'awant').from('wants_always').join('pokemons', 'wants_always.awpid', '=', 'pokemons.pid').where('wants_always.uid', '=', req.params.id).andWhere('wants_always.awant', '=', 1).orderBy('pokemons.number', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting always wants of a player.'}) });
});

router.get('/arean/:id', (req, res, next) => {
    knex.select('pid', 'aid', 'number', 'name', 'rarity', 'generation', 'areanimg', 'arwant').from('wants_arean').join('pokemons_arean', 'wants_arean.arwpid', '=', 'pokemons_arean.aid').join('pokemons', 'pokemons_arean.apid', '=', 'pokemons.pid').where('wants_arean.uid', '=', req.params.id).andWhere('wants_arean.arwant', '=', 1).orderBy('pokemons.number', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting arean wants of a player.'}) });
});

router.get('/variant/:id', (req, res, next) => {
    knex.select('pid', 'vid', 'number', 'name', 'rarity', 'generation', 'variantimg', 'vwant').from('wants_variant').join('pokemons_variant', 'wants_variant.vwpid', '=', 'pokemons_variant.vid').join('pokemons', 'pokemons_variant.vpid', '=', 'pokemons.pid').where('wants_variant.uid', '=', req.params.id).andWhere('wants_variant.vwant', '=', 1).orderBy('pokemons.number', 'ASC').orderBy('pokemons_variant.vversion', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting variant wants of a player.'}) });
});

router.get('/costume/:id', (req, res, next) => {
    knex.select('pid', 'cid', 'number', 'name', 'rarity', 'generation', 'costumeimg', 'cwant').from('wants_costume').join('pokemons_costume', 'wants_costume.cwpid', '=', 'pokemons_costume.cid').join('pokemons', 'pokemons_costume.cpid', '=', 'pokemons.pid').where('wants_costume.uid', '=', req.params.id).andWhere('wants_costume.cwant', '=', 1).orderBy('pokemons.number', 'ASC').orderBy('cfirstappearance', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting costume wants of a player.'}) });
});

router.get('/shiny/:id', (req, res, next) => {
    knex.select('pid', 'sid', 'number', 'name', 'rarity', 'generation', 'shinyimg', 'swant').from('wants_shiny').join('pokemons_shiny', 'wants_shiny.swpid', '=', 'pokemons_shiny.sid').join('pokemons', 'pokemons_shiny.spid', '=', 'pokemons.pid').where('wants_shiny.uid', '=', req.params.id).andWhere('wants_shiny.swant', '=', 1).orderBy('pokemons.number', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting shiny wants of a player.'}) });
});

module.exports = router;