var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    let dateNow = new Date();
    let year = dateNow.getFullYear();
    let month = dateNow.getMonth()-2;
    let day = dateNow.getDate();
    if(month < 10) { month = "0" + month; };
    if(day < 10) { day = "0" + day; };
    let threeMonthsAgo = year + "-" + month + "-" + day;
    knex.select('eid', 'ename', 'etext', 'estart', 'eend', 'elink', 'ewritedate').from('events').where('estart', '>=', threeMonthsAgo).orderBy('ewritedate', 'DESC')
        .then(events => { res.status(200).json(events) })
    .catch(err => { res.status(500).json({error: 'Database error while getting requests.'}) });
});

module.exports = router;