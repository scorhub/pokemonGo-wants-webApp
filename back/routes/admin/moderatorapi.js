var express = require('express');
var router = express.Router();
const config = require('../../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex.select('uid', 'showname', 'users.ucid', 'ucname').from('users').join('userclasses', 'users.ucid', 'userclasses.ucid').whereNot('uid', '=', res.locals.auth.uid).orderBy('showname')
    .then(rows => { res.status(200).json(rows) })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

router.patch('/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    if(!(typeof body.moderator === 'boolean')) { return res.status(400).json({error: 'Status must be in boolean!'}) };
    let updData = { ucid: null };
    if(body.moderator === true){ updData.ucid = 2; };
    if(body.moderator === false){ updData.ucid = 3; };
    knex('users').where('uid', '=', id).update(updData)
    .then(upd => { res.status(204).end() })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

module.exports = router;