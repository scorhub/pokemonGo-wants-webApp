var express = require('express');
var router = express.Router();
const config = require('../../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.post('/', (req, res, next) => {
    let text = req.body.ntext.replace(/\n/g, '<br/>');;
    const newNews = {
        nuid: res.locals.auth.uid,
        ntitle: req.body.ntitle,
        ntext: text,
        ndate : new Date(),
        narchived: 0,
        nedited: null
    };
    knex('news').insert(newNews)
    .then(nid => { res.status(201).end() })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

router.patch('/:id', (req, res, next) => {
    req.body.nedited = new Date();
    knex('news').where('nid', '=', req.params.id).update(req.body)
    .then(nid => { res.status(204).end() })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

router.get('/archived', (req, res, next) => {
    knex.select('nid', 'ntitle', 'ntext', 'showname', 'ndate', 'nedited').from('news').where('narchived', 1).join('users', 'users.uid', 'news.nuid').orderBy('ndate', 'DESC')
        .then(news => { res.status(200).json(news) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

module.exports = router;