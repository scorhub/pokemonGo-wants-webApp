var express = require('express');
var router = express.Router();
const config = require('../../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.post('/', (req, res, next) => {
    let link = null;
    if(req.body.elink.length > 0){ link = req.body.elink };
    const newEvent = {
        ename: req.body.ename,
        estart: new Date(req.body.estart),
        eend: new Date(req.body.eend),
        etext: req.body.etext,
        elink: link,
        ewritedate: new Date()
    }
    knex('events').insert(newEvent)
    .then(eid => { res.status(201).end() })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

router.patch('/:id', (req, res, next) => {
    knex('events').where('eid', '=', req.params.id).update(req.body)
    .then(eid => { res.status(204).end() })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

module.exports = router;