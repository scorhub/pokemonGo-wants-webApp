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
    knex.select('eid as fid', 'ename', 'etext', 'estart', 'eend', 'elink', 'ewritedate as published').from('events').where('estart', '>=', threeMonthsAgo).orderBy('published', 'DESC')
    .then(events => {
        knex.select('nid', 'ntitle', 'ntext', 'showname', 'ndate as published', 'nedited').from('news').whereNot('narchived', 1).join('users', 'users.uid', 'news.nuid').orderBy('published', 'DESC')
        .then(news => {
            let maxFid = 0;
            if(events.length > 0){ maxFid = events.reduce((max, event) => (event.fid > max ? event.fid : max), events[0].fid); }
            let newFid = maxFid;
            let fiddedNews = news.map(function(el) {
                var o = Object.assign({}, el);
                newFid = newFid + 1;
                o.fid = newFid;
                return o;
            });
            const frontList = events.concat(fiddedNews);
            res.status(200).json(frontList);
        }).catch(err => { res.status(500).json({error: 'Database error while getting events.'}) });
    }).catch(err => { res.status(500).json({error: 'Database error while getting news.'}) });
});

module.exports = router;