var express = require('express');
var router = express.Router();
const config = require('../../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.patch('/:id', (req, res, next) => {
    knex('askfeature').where('afid', '=', req.params.id).update(req.body)
    .then(afid => { res.status(204).end() })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

router.get('/archived', (req, res, next) => {
    knex.select('afid', 'afdate', 'aftitle', 'afinfo', 'addedtolist', 'inprogress', 'completed', 'dnote', 'farchived', 'uid', 'showname').from('askfeature').join('users', 'askfeature.afuid', 'users.uid').where('farchived', 1).orderBy('afid', 'DESC')
    .then(feats => { res.status(200).json(feats) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

module.exports = router;