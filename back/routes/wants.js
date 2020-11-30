var express = require('express');
var router = express.Router();
const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

// Get method first gets every Pokémon from database, then gets personal wants and finally adds personal wants to list of all Pokémons.

//
// Routes for own regular, "lucky" wants.
//

router.get('/', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'number', 'name', 'img').from('pokemons').orderBy('pokemons.number')
    .then(pokemons => {
        knex.select('*').from('wants').where('wants.uid', '=', uid)
        .then(wants => {
            const myWants = pokemons.map(x => Object.assign(x, wants.find(y => y.wpid == x.pid)));
            res.status(200).json(myWants);
        }).catch(err => { res.status(500).json({error: 'Database error in combining want.'}) });
    }).catch(err => { res.status(500).json({error: 'Database error in getting want.'})});
});

router.patch('/:id', (req, res) => {
    const entryData = req.body;
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof entryData.want === 'boolean')) { return res.status(400).json({error: 'Want must be in boolean!'}) };
    const updData = { want: entryData.want };
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
                .then(status => { res.status(200).json(entryData) })
                .catch(err => { res.status(500).json({error:'Database error in making new want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants').where('wpid', '=', id).andWhere('uid', '=', uid).update(updData) .then(status => {
                knex('changes').insert({uid: uid, wid: wanted[0].wid, changetime: new Date()})
                .then(status => { res.status(200).json(entryData) })
                .catch(err => { res.status(500).json({ error: 'Database error in updating existing want.' }) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing want.'}) });
});

//
// Routes for own "always" wants.
//

router.get('/always', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('pid', 'number', 'name', 'img').from('pokemons').orderBy('pokemons.number')
    .then(pokemons => {
        knex.select('*').from('wants_always').where('wants_always.uid', '=', uid)
        .then(areanWants => {
            const myAlwaysWants = pokemons.map(x => Object.assign(x, areanWants.find(y => y.awpid == x.pid)));
            res.status(200).json(myAlwaysWants);
        }).catch(err => { res.status(500).json({error: 'Database error in combining always want.'}) });
    }).catch(err => { res.status(500).json({error: 'Database error in getting always want.'}) });
});

router.patch('/always/:id', (req, res) => {
    const entryData = req.body;
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof entryData.awant === 'boolean')) { return res.status(400).json({error: 'Want must be in boolean!'}) };
    const updAlwaysWant = { awant: entryData.awant };
    if (entryData.awant === true) {
        knex.select('*').from('wants_always').where('wants_always.uid', '=', uid)
        knex('wants_always').where('uid', '=', uid).andWhere('awant', '=', true).count('awid as amount')
        .then(areanAmount => { if (areanAmount[0].amount >= 50) { res.status(403).json({error: 'Maximum amount of always wants is 50.'}) };
        }).catch(err => { res.status(500).json({error: 'Database error in checking always want amount.'}) });
    };
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
                .then(status => { res.status(200).json(entryData) })
                .catch(err => { res.status(500).json({error: 'Database error in making new always want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_always').where('awpid', '=', id).andWhere('uid', '=', uid).update(updAlwaysWant)
            .then(status => {
                knex('changes').insert({uid: uid, awid: AlwaysWant[0].awid, changetime: new Date()})
                .then(status => { res.status(200).json(entryData) })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing always want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing always want.'}) });
});

//
// Routes for own "arean" wants.
//

router.get('/arean', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('aid', 'apid', 'areanimg', 'pid', 'number', 'name').from('pokemons_arean').join('pokemons', 'pokemons_arean.apid', '=', 'pokemons.pid').orderBy('pokemons.number')
    .then(areans => {
        knex.select("*").from('wants_arean').where('wants_arean.uid', '=', uid)
        .then(areanwants => {
            const myAreanWants = areans.map(x => Object.assign(x, areanwants.find(y => y.arwpid == x.aid)));
            res.status(200).json(myAreanWants);
        });
    });
});

router.patch('/arean/:id', (req, res) => {
    const entryData = req.body;
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof entryData.arwant === 'boolean')) { return res.status(400).json({error:'Want must be in boolean!'}) };
    const updAreanWant = { arwant: entryData.arwant };
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
                .then(status => { res.status(200).json(entryData) })
                .catch(err => { res.status(500).json({error: 'Database error in making new areanwant.'})  });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_arean').where('arwpid', '=', id).andWhere('uid', '=', uid).update(updAreanWant)
            .then(status => {
                knex('changes').insert({uid: uid, arwid: areanWant[0].arwid, changetime: new Date()})
                .then(status => { res.status(200).json(entryData) })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing areanwant.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing areanwant.'}) });
});

//
// Routes for own "costume" wants.
//

router.get('/costumes', (req, res, next) => {
    const uid = res.locals.auth.uid;
    knex.select('cid', 'cpid', 'version', 'costumeimg', 'pid', 'number', 'name', 'img').from('pokemons_costumes').join('pokemons', 'pokemons_costumes.cpid', '=', 'pokemons.pid').orderBy('pokemons.number')
    .then(costumes => {
        knex.select("*").from('wants_costumes').where('wants_costumes.uid', '=', uid)
        .then(costumeWants => {
            const myCostumeWants = costumes.map(x => Object.assign(x, costumeWants.find(y => y.cwpid == x.cid)));
            res.status(200).json(myCostumeWants);
        });
    });
});

router.patch('/costumes/:id', (req, res) => {
    const entryData = req.body;
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof entryData.cwant === 'boolean')) { return res.status(400).json({error:'Want must be in boolean!'}) };
    const updCosWant = { cwant: entryData.cwant };
    knex('wants_costumes').where('cwpid', '=', id).andWhere('uid', '=', uid)
    .then(cosWant => {
        if(cosWant.length === 0){
            const newCosWant = {
                cwpid: req.body.cid,
                uid: uid,
                cwant: true
            };
            knex('wants_costumes').insert(newCosWant)
            .then(cwid => {
                knex('changes').insert({uid: uid, cwid: cwid, changetime: new Date()})
                .then(status => { res.status(200).json(entryData) })
                .catch(err => { res.status(500).json({error: 'Database error in making new costume want.'})  });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_costumes').where('cwpid', '=', id).andWhere('uid', '=', uid).update(updCosWant)
            .then(status => {
                knex('changes').insert({uid: uid, cwid: cosWant[0].cwid, changetime: new Date()})
                .then(status => { res.status(200).json(entryData) })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing costume want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing costume want.'}) });
});

module.exports = router;