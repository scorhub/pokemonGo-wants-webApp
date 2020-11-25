var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);
const bcrypt = require('bcryptjs');

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

module.exports = router;