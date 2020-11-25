var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select("*").from('pokemons').orderBy('pokemons.number')
    .then(pokemons => {
        knex.select('*').from('wants').where('wants.uid', '=', uid)
        .then(wants => {
            const myWants = pokemons.map(x => Object.assign(x, wants.find(y => y.wpid == x.pid)));
            res.status(200).json(myWants);
        }).catch(err => { res.status(500).json({error: 'Database error in combining want.'}) });
    }).catch(err => { res.status(500).json({error: 'Database error in getting want.'})});
});

router.patch('/:id', (req, res) => {
    const pogo = req.body;
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof pogo.want === 'boolean')) { return res.status(400).json({error: 'Want must be in boolean!'}) };
    const updData = { want: pogo.want };

    knex('wants').where('wpid', '=', id).andWhere('uid', '=', uid)
    .then(wanted => {
        if(wanted.length === 0){
            const newWant = {
                wpid: req.body.pid,
                uid: uid,
                want: true
            };
            knex('wants').insert(newWant)
            .then(wId => {
                knex('changes').insert({uid: uid, wid: wId, changetime: new Date()})
                .then(status => { res.status(200).json(pogo) })
                .catch(err => { res.status(500).json({error:'Database error in making new want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants').where('wpid', '=', id).andWhere('uid', '=', uid).update(updData) .then(status => {
                knex('changes').insert({uid: uid, wid: wanted[0].wid, changetime: new Date()})
                .then(status => { res.status(200).json(pogo) })
                .catch(err => { res.status(500).json({ error: 'Database error in updating existing want.' }) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing want.'}) });
});

router.get('/always', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select("*").from('pokemons').orderBy('pokemons.number')
    .then(pokemons => {
        knex.select('*').from('wants_always').where('wants_always.uid', '=', uid)
        .then(areanWants => {
            const myAlwaysWants = pokemons.map(x => Object.assign(x, areanWants.find(y => y.awpid == x.pid)));
            res.status(200).json(myAlwaysWants);
        }).catch(err => { res.status(500).json({error: 'Database error in combining always want.'}) });
    }).catch(err => { res.status(500).json({error: 'Database error in getting always want.'}) });
});

router.patch('/always/:id', (req, res) => {
    const pogo = req.body;
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof pogo.awant === 'boolean')) { return res.status(400).json({error: 'Want must be in boolean!'}) };
    const updAlwaysWant = { awant: pogo.awant };

    knex('wants_always').where('awpid', '=', id).andWhere('uid', '=', uid)
    .then(AlwaysWant => {
        if(AlwaysWant.length === 0){
            const newAlwaysWant = {
                awpid: req.body.pid,
                uid: uid,
                awant: true
            };
            knex('wants_always').insert(newAlwaysWant)
            .then(awId => {
                knex('changes').insert({uid: uid, awid: awId, changetime: new Date()})
                .then(status => { res.status(200).json(pogo) })
                .catch(err => { res.status(500).json({error: 'Database error in making new always want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_always').where('awpid', '=', id).andWhere('uid', '=', uid).update(updAlwaysWant)
            .then(status => {
                knex('changes').insert({uid: uid, awid: AlwaysWant[0].awid, changetime: new Date()})
                .then(status => { res.status(200).json(pogo) })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing always want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing always want.'}) });
});

router.get('/areanwants', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select("*").from('pokemons_arean').join('pokemons', 'pokemons_arean.apid', '=', 'pokemons.pid').orderBy('pokemons.number')
    .then(areans => {
        knex.select("*").from('wants_arean').where('wants_arean.uid', '=', uid)
        .then(areanwants => {
            const myAreanWants = areans.map(x => Object.assign(x, areanwants.find(y => y.arwpid == x.aid)));
            res.status(200).json(myAreanWants);
        });
    });
});

router.patch('/areanwants/:id', (req, res) => {
    const pogo = req.body;
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof pogo.arwant === 'boolean')) { return res.status(400).json({error:'Want must be in boolean!'}) };
    const updAreanWant = { arwant: pogo.arwant };
    knex('wants_arean').where('arwpid', '=', id).andWhere('uid', '=', uid)
    .then(areanWant => {
        if(areanWant.length === 0){
            const newAreanWant = {
                arwpid: req.body.aid,
                uid: uid,
                arwant: true
            };
            knex('wants_arean').insert(newAreanWant)
            .then(arwid => {
                knex('changes').insert({uid: uid, arwid: arwid, changetime: new Date()})
                .then(status => { res.status(200).json(pogo) })
                .catch(err => { res.status(500).json({error: 'Database error in making new areanwant.'})  });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_arean').where('arwpid', '=', id).andWhere('uid', '=', uid).update(updAreanWant)
            .then(status => {
                knex('changes').insert({uid: uid, arwid: areanWant[0].arwid, changetime: new Date()})
                .then(status => { res.status(200).json(pogo) })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing areanwant.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing areanwant.'}) });
});

module.exports = router;