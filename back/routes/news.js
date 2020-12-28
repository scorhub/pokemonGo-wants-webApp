var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex.select('nid', 'ntitle', 'ntext', 'showname', 'ndate', 'nedited').from('news').whereNot('narchived', 1).join('users', 'users.uid', 'news.nuid').orderBy('ndate', 'DESC')
        .then(news => { res.status(200).json(news) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

module.exports = router;