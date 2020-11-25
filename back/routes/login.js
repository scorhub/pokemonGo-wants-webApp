var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    const body = req.body;
    knex.from('users').select('*').where('username', '=', body.username)
    .then(user => {
        if(user.length === 0){ return res.status(401).json({ err: 'Invalid username or password.'}) };
        const tempUser = user[0];
        bcrypt.compare(body.password, tempUser.password)
        .then(passwordCorrect => {
            if(!passwordCorrect){ return res.status(401).json({ err: 'Invalid username or password.'}) };
            const userForToken = {
                username: tempUser.username,
                uid: tempUser.uid,
                name: tempUser.showname
            };
            const token = jwt.sign(userForToken, config.SECRET);
            res.status(200).send({name: tempUser.showname, uid: tempUser.uid, ucid: tempUser.ucid, token});
            next();
        });
    }).catch(err => { res.status(500).json({err: 'Database error in login.'}) });
});

module.exports = router;