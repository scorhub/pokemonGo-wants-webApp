// var express = require('express');
// var router = express.Router();
// const config = require('../utils/config');
// const options = config.DATABASE_OPTIONS;
// const knex = require('knex')(options);
// const bcrypt = require('bcryptjs');

// router.post('/userclass', (req, res, next) => {
//     knex.from('userclasses').select('*')
//     .then(classes => {
//         if(classes.length !== 0){ return res.status(403).json({ err: 'Userclasses are already created.'}) };
//         knex('userclasses').insert(req.body).then(ucid => { res.status(201).end() })
//         .catch(err => { res.status(500).json({error: 'Database error.'}) });
//     }).catch(err => { res.status(500).json({err: 'Database error.'}) });
// });

// router.post('/admin', (req, res, next) => {
//     const body = req.body;
//     knex.from('users').select('*')
//     .then(users => {
//         if(users.length !== 0){ return res.status(403).json({ err: 'Admin is already created.'}) };
//         const saltRounds = 10;
//         bcrypt.hash(body.password, saltRounds)
//         .then(passwordHash => {
//             const userData = {
//                 username: body.username,
//                 password: passwordHash,
//                 showname: body.showname,
//                 ucid: body.ucid,
//                 email: body.email
//             };
//             knex('users').insert(userData).then(uid => { res.status(201).end() })
//             .catch(err => { res.status(500).json({error: 'Database error.'}) });
//         }).catch(err => { res.status(418).json({error: 'Database error.'}) });
//     }).catch(err => { res.status(500).json({err: 'Database error.'}) });
// });

// module.exports = router;