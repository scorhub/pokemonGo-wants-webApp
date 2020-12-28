var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/lucky', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'number', 'name', 'rarity', 'generation', 'img', 'want').from('wants').join('pokemons', 'wants.wpid', '=', 'pokemons.pid').where('wants.uid', '=', uid).andWhere('wants.want', '=', 1).orderBy('pokemons.number', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting personal lucky wants.'}) });
});

router.get('/always', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'number', 'name', 'rarity', 'generation', 'img', 'awant').from('wants_always').join('pokemons', 'wants_always.awpid', '=', 'pokemons.pid').where('wants_always.uid', '=', uid).andWhere('wants_always.awant', '=', 1).orderBy('pokemons.number', 'ASC')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting personal always wants.'}) });
});

router.get('/arean', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'aid', 'number', 'name', 'rarity', 'generation', 'areanimg', 'arwant').from('wants_arean').join('pokemons_arean', 'wants_arean.arwpid', '=', 'pokemons_arean.aid').join('pokemons', 'pokemons_arean.apid', '=', 'pokemons.pid').where('wants_arean.uid', '=', uid).andWhere('wants_arean.arwant', '=', 1).orderBy('pokemons.number', 'ASC')
    .then(myareans => { res.status(200).json(myareans) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting personal arean wants.'}) });
});

router.get('/variant', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'vid', 'number', 'name', 'rarity', 'generation', 'variantimg', 'vwant').from('wants_variant').join('pokemons_variant', 'wants_variant.vwpid', '=', 'pokemons_variant.vid').join('pokemons', 'pokemons_variant.vpid', '=', 'pokemons.pid').where('wants_variant.uid', '=', uid).andWhere('wants_variant.vwant', '=', 1).orderBy('pokemons.number', 'ASC').orderBy('pokemons_variant.vversion', 'ASC')
    .then(myvariants => { res.status(200).json(myvariants) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting personal costume wants.'}) });
});

router.get('/costume', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'cid', 'number', 'name', 'rarity', 'generation', 'costumeimg', 'cwant').from('wants_costume').join('pokemons_costume', 'wants_costume.cwpid', '=', 'pokemons_costume.cid').join('pokemons', 'pokemons_costume.cpid', '=', 'pokemons.pid').where('wants_costume.uid', '=', uid).andWhere('wants_costume.cwant', '=', 1).orderBy('pokemons.number', 'ASC')
    .then(mycostumes => { res.status(200).json(mycostumes) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting personal costume wants.'}) });
});

router.get('/shiny', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'sid', 'number', 'name', 'rarity', 'generation', 'shinyimg', 'swant').from('wants_shiny').join('pokemons_shiny', 'wants_shiny.swpid', '=', 'pokemons_shiny.sid').join('pokemons', 'pokemons_shiny.spid', '=', 'pokemons.pid').where('wants_shiny.uid', '=', uid).andWhere('wants_shiny.swant', '=', 1).orderBy('pokemons.number', 'ASC')
    .then(myshinys => { res.status(200).json(myshinys) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting personal shiny wants.'}) });
});

module.exports = router;