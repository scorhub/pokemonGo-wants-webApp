var express = require('express');
var router = express.Router();
const config = require('../../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.post('/', (req, res, next) => {
    console.log('admin news POST')
    let text = req.body.ntext.replace(/\n/g, '<br/>');;
    const newNews = {
        nuid: res.locals.auth.uid,
        ntitle: req.body.ntitle,
        ntext: text,
        ndate : new Date(),
        narchived: 0
    };
    console.log(newNews)
    knex('news').insert(newNews)
    .then(fid => { res.status(201).end() })
    .catch(err => { res.status(500).json({error: 'Database error.'}) });
});

module.exports = router;