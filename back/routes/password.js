var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);
const bcrypt = require('bcryptjs');

router.patch('/change', (req, res, next) => {
    const uid = res.locals.auth.uid;
    const body = req.body;
    if (body.newPassword === body.oldPassword) { return res.status(403).json({err: 'New password cannot be same than old password!'}) };
    knex.first('password').from('users').where('uid', '=', uid)
    .then(user => {
        if(user.length === 0){ return res.status(401).json({ err: 'Invalid password.'}) };
        bcrypt.compare(body.oldPassword, user.password)
        .then(passwordCorrect => {
            if(!passwordCorrect){ return res.status(401).json({ err: 'Invalid password.'}) };
            const saltRounds = 10;
            bcrypt.hash(body.newPassword, saltRounds)
            .then(newHashedPass => {
                const passwordUpd = { password: newHashedPass };
                knex('users').update(passwordUpd).where('users.uid', '=', uid)
                .then(fid => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in updating password.'}) });
            }).catch(err => { res.status(418).json({error: 'Database error in changing password.'}) });
        }).catch(err => { res.status(418).json({error: 'Database error in changing password.'}) });
    }).catch(err => { res.status(500).json({err: 'Database error in login.'}) });

});

module.exports = router;