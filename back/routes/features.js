var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex.select('afid', 'afdate', 'aftitle', 'afinfo', 'addedtolist', 'inprogress', 'completed', 'dnote', 'uid', 'showname').from('askfeature').join('users', 'askfeature.afuid', 'users.uid').whereNot('farchived', 1).orderBy('afid', 'DESC')
    .then(feats => { res.status(200).json(feats) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

router.post('/', (req, res, next) => {
    const newfeature = {
        afuid: res.locals.auth.uid,
        aftitle: req.body.aftitle,
        afinfo: req.body.afinfo,
        afdate: new Date()
    };
    knex('askfeature').insert(newfeature)
    .then(fid => { res.status(204).end() })
    .catch(err => { res.status(500).json({error:'Database error in asking new feature.'}) });
});

module.exports = router;