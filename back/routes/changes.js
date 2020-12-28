var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex('changes').distinct('wid', 'awid', 'arwid', 'cwid', 'swid').orderBy('chid', 'desc').limit(3)
    .then(changes => { res.status(200).json(changes) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

module.exports = router;