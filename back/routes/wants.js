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
    knex.select('pid', 'number', 'name', 'generation', 'img').from('pokemons').orderBy('pokemons.number', 'ASC')
    .then(pokemons => {
        knex.select('*').from('wants').where('wants.uid', '=', res.locals.auth.uid)
        .then(wants => {
            const myWants = pokemons.map(x => Object.assign(x, wants.find(y => y.wpid == x.pid)));
            res.status(200).json(myWants);
        }).catch(err => { res.status(500).json({error: 'Database error in combining want.'}) });
    }).catch(err => { res.status(500).json({error: 'Database error in getting want.'})});
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof req.body.want === 'boolean')) { return res.status(400).json({error: 'Want must be in boolean!'}) };
    knex('wants').where('wpid', '=', id).andWhere('uid', '=', uid)
    .then(wanted => {
        if(wanted.length === 0){
            const newWant = {
                wpid: id,
                uid: uid,
                want: req.body.want
            };
            knex('wants').insert(newWant)
            .then(wId => {
                knex('changes').insert({uid: uid, wid: wId, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error:'Database error in making new want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants').where('wpid', '=', id).andWhere('uid', '=', uid).update(req.body)
            .then(status => {
                knex('changes').insert({uid: uid, wid: wanted[0].wid, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({ error: 'Database error in updating existing want.' }) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing want.'}) });
});

//
// Routes for own "always" wants.
//

router.get('/always', (req, res, next) => {
    knex.select('pid', 'number', 'name', 'generation', 'img').from('pokemons').orderBy('pokemons.number', 'ASC')
    .then(pokemons => {
        knex.select('*').from('wants_always').where('wants_always.uid', '=', res.locals.auth.uid)
        .then(areanWants => {
            const myAlwaysWants = pokemons.map(x => Object.assign(x, areanWants.find(y => y.awpid == x.pid)));
            res.status(200).json(myAlwaysWants);
        }).catch(err => { res.status(500).json({error: 'Database error in combining always want.'}) });
    }).catch(err => { res.status(500).json({error: 'Database error in getting always want.'}) });
});

router.patch('/always/:id', (req, res) => {
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof req.body.awant === 'boolean')) { return res.status(400).json({error: 'Want must be in boolean!'}) };
    if (req.body.awant === true) {
        knex('wants_always').where('uid', '=', uid).andWhere('awant', '=', true).count('awid as amount')
        .then(areanAmount => { if (areanAmount[0].amount >= 50) { res.status(403).json({error: 'Maximum amount of always wants is 50.'}) };
        }).catch(err => { res.status(500).json({error: 'Database error in checking always want amount.'}) });
    };
    knex('wants_always').where('awpid', '=', id).andWhere('uid', '=', uid)
    .then(AlwaysWant => {
        if(AlwaysWant.length === 0){
            const newAlwaysWant = {
                awpid: id,
                uid: uid,
                awant: req.body.awant
            };
            knex('wants_always').insert(newAlwaysWant)
            .then(awId => {
                knex('changes').insert({uid: uid, awid: awId, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in making new always want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_always').where('awpid', '=', id).andWhere('uid', '=', uid).update(req.body)
            .then(status => {
                knex('changes').insert({uid: uid, awid: AlwaysWant[0].awid, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing always want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing always want.'}) });
});

//
// Routes for own "arean" wants.
//

router.get('/arean', (req, res, next) => {
    knex.select('aid', 'apid', 'areanimg', 'pid', 'number', 'name', 'generation').from('pokemons_arean').join('pokemons', 'pokemons_arean.apid', '=', 'pokemons.pid').orderBy('pokemons.number', 'ASC')
    .then(areans => {
        knex.select("*").from('wants_arean').where('wants_arean.uid', '=', res.locals.auth.uid)
        .then(areanwants => {
            const myAreanWants = areans.map(x => Object.assign(x, areanwants.find(y => y.arwpid == x.aid)));
            res.status(200).json(myAreanWants);
        });
    });
});

router.patch('/arean/:id', (req, res) => {
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof req.body.arwant === 'boolean')) { return res.status(400).json({error:'Want must be in boolean!'}) };
    knex('wants_arean').where('arwpid', '=', id).andWhere('uid', '=', uid)
    .then(areanWant => {
        if(areanWant.length === 0){
            const newAreanWant = {
                arwpid: id,
                uid: uid,
                arwant: req.body.arwant
            };
            knex('wants_arean').insert(newAreanWant)
            .then(arwid => {
                knex('changes').insert({uid: uid, arwid: arwid, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in making new arean want.'})  });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_arean').where('arwpid', '=', id).andWhere('uid', '=', uid).update(req.body)
            .then(status => {
                knex('changes').insert({uid: uid, arwid: areanWant[0].arwid, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing arean want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing arean want.'}) });
});

//
// Routes for own "variant" wants.
//

router.get('/variant', (req, res, next) => {
    knex.select('vid', 'vpid', 'variantimg', 'pid', 'number', 'name', 'generation', 'vversion').from('pokemons_variant').join('pokemons', 'pokemons_variant.vpid', '=', 'pokemons.pid').orderBy('pokemons.number', 'ASC').orderBy('pokemons_variant.vversion', 'ASC')
    .then(variants => {
        knex.select("*").from('wants_variant').where('wants_variant.uid', '=', res.locals.auth.uid)
        .then(variantwants => {
            const myVariantWants = variants.map(x => Object.assign(x, variantwants.find(y => y.vwpid == x.vid)));
            res.status(200).json(myVariantWants);
        });
    });
});

router.patch('/variant/:id', (req, res) => {
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof req.body.vwant === 'boolean')) { return res.status(400).json({error:'Want must be in boolean!'}) };
    knex('wants_variant').where('vwpid', '=', id).andWhere('uid', '=', uid)
    .then(variantWant => {
        if(variantWant.length === 0){
            const newVariantWant = {
                vwpid: id,
                uid: uid,
                vwant: req.body.vwant
            };
            knex('wants_variant').insert(newVariantWant)
            .then(vwid => {
                knex('changes').insert({uid: uid, vwid: vwid, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in making new variant want.'})  });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_variant').where('vwpid', '=', id).andWhere('uid', '=', uid).update(req.body)
            .then(status => {
                knex('changes').insert({uid: uid, vwid: variantWant[0].vwid, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing variant want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing variant want.'}) });
});

//
// Routes for own "costume" wants.
//

router.get('/costume', (req, res, next) => {
    knex.select('cid', 'cpid', 'version', 'costumeimg', 'pid', 'number', 'name', 'generation').from('pokemons_costume').join('pokemons', 'pokemons_costume.cpid', '=', 'pokemons.pid').orderBy('pokemons.number', 'ASC').orderBy('cfirstappearance', 'ASC')
    .then(costume => {
        knex.select("*").from('wants_costume').where('wants_costume.uid', '=', res.locals.auth.uid)
        .then(costumeWants => {
            const myCostumeWants = costume.map(x => Object.assign(x, costumeWants.find(y => y.cwpid == x.cid)));
            res.status(200).json(myCostumeWants);
        });
    });
});

router.patch('/costume/:id', (req, res) => {
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof req.body.cwant === 'boolean')) { return res.status(400).json({error:'Want must be in boolean!'}) };
    knex('wants_costume').where('cwpid', '=', id).andWhere('uid', '=', uid)
    .then(cosWant => {
        if(cosWant.length === 0){
            const newCosWant = {
                cwpid: id,
                uid: uid,
                cwant: req.body.cwant
            };
            knex('wants_costume').insert(newCosWant)
            .then(cwid => {
                knex('changes').insert({uid: uid, cwid: cwid, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in making new costume want.'})  });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_costume').where('cwpid', '=', id).andWhere('uid', '=', uid).update(req.body)
            .then(status => {
                knex('changes').insert({uid: uid, cwid: cosWant[0].cwid, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing costume want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing costume want.'}) });
});

//
// Routes for own "shiny" wants.
//

router.get('/shiny', (req, res, next) => {
    knex.select('pid', 'sid', 'number', 'name', 'generation', 'shinyimg').from('pokemons').join('pokemons_shiny', 'pokemons.pid', 'pokemons_shiny.spid').orderBy('pokemons.number', 'ASC')
    .then(shinys => {
        knex.select('*').from('wants_shiny').where('wants_shiny.uid', '=', res.locals.auth.uid)
        .then(shinyWants => {
            const myShinyWants = shinys.map(x => Object.assign(x, shinyWants.find(y => y.swpid == x.sid)));
            res.status(200).json(myShinyWants);
        }).catch(err => { res.status(500).json({error: 'Database error in combining always want.'}) });
    }).catch(err => { res.status(500).json({error: 'Database error in getting always want.'}) });
});

router.patch('/shiny/:id', (req, res) => {
    const id = req.params.id;
    const uid = res.locals.auth.uid;
    if (!(typeof req.body.swant === 'boolean')) { return res.status(400).json({error: 'Want must be in boolean!'}) };
    knex('wants_shiny').where('swpid', '=', id).andWhere('uid', '=', uid)
    .then(ShinyWant => {
        if(ShinyWant.length === 0){
            const newShinyWant = {
                swpid: id,
                uid: uid,
                swant: req.body.swant
            };
            knex('wants_shiny').insert(newShinyWant)
            .then(swId => {
                knex('changes').insert({uid: uid, swid: swId, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in making new shiny want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        } else {
            knex('wants_shiny').where('swpid', '=', id).andWhere('uid', '=', uid).update(req.body)
            .then(status => {
                knex('changes').insert({uid: uid, swid: ShinyWant[0].swid, changetime: new Date()})
                .then(status => { res.status(204).end() })
                .catch(err => { res.status(500).json({error: 'Database error in updating existing shiny want.'}) });
            }).catch(err => { res.status(500).json({error: 'Database error in adding changes.'}) });
        };
    }).catch(err => { res.status(500).json({error: 'Database error in changing shiny want.'}) });
});

module.exports = router;