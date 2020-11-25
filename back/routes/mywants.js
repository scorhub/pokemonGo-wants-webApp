var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/lucky', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'number', 'name', 'rarity', 'generation', 'img', 'want').from('wants').join('pokemons', 'wants.wpid', '=', 'pokemons.pid').where('wants.uid', '=', uid).andWhere('wants.want', '=', 1).orderBy('pokemons.number')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting always wants of a player.'}) });
});

router.get('/always', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'number', 'name', 'rarity', 'generation', 'img', 'awant').from('wants_always').join('pokemons', 'wants_always.awpid', '=', 'pokemons.pid').where('wants_always.uid', '=', uid).andWhere('wants_always.awant', '=', 1).orderBy('pokemons.number')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting personal always wants.'}) });
});

router.get('/arean', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'aid', 'number', 'name', 'rarity', 'generation', 'areanimg', 'arwant').from('wants_arean').join('pokemons_arean', 'wants_arean.arwpid', '=', 'pokemons_arean.aid').join('pokemons', 'pokemons_arean.apid', '=', 'pokemons.pid').where('wants_arean.uid', '=', uid).andWhere('wants_arean.arwant', '=', 1).orderBy('pokemons.number')
    .then(myareans => { res.status(200).json(myareans) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting personal areanwants.'}) });
});

module.exports = router;