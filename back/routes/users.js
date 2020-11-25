var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);
const bcrypt = require('bcryptjs');

router.get('/', (req, res, next) => {
    knex.select('uid', 'showname').from('users').whereNot('uid', '=', res.locals.auth.uid).orderBy('showname')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

router.post('/', (req, res, next) => {
    const body = req.body;
    const saltRounds = 10;
    bcrypt.hash(body.password, saltRounds)
    .then(passwordHash => {
        const userData = {
            username: body.username,
            password: passwordHash,
            showname: body.showname,
        };
        knex('users').insert(userData)
        .then(fid => { res.status(201).end() })
        .catch(err => { res.status(500).json({error: 'Database error.'}) });
    }).catch(err => { res.status(418).json({error: 'Database error in register.'}) });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    knex.select("*").from('wants').join('pokemons', 'wants.wpid', '=', 'pokemons.pid').where('wants.uid', '=', id).andWhere('wants.want', '=', 1).orderBy('pokemons.number')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting wants of a player.'}) });
});

router.get('/alwants/:id', (req, res, next) => {
    const id = req.params.id;
    knex.select("*").from('wants_always').join('pokemons', 'wants_always.awpid', '=', 'pokemons.pid').where('wants_always.uid', '=', id).andWhere('wants_always.awant', '=', 1).orderBy('pokemons.number')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting always wants of a player.'}) });
});

router.get('/areanwants/:id', (req, res, next) => {
    const id = req.params.id;
    knex.select("*").from('wants_arean').join('pokemons_arean', 'wants_arean.arwpid', '=', 'pokemons_arean.aid').join('pokemons', 'pokemons_arean.apid', '=', 'pokemons.pid').where('wants_arean.uid', '=', id).andWhere('wants_arean.arwant', '=', 1).orderBy('pokemons.number')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database Error in getting areanwants of a player.'}) });
});

module.exports = router;