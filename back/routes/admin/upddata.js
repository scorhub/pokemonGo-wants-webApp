var express = require('express');
var router = express.Router();
const config = require('../../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

//
// Routes for updating regular Pokémon data.
//

router.get('/normal/image/:id', (req, res, next) => {
    const id = req.params.id;
    knex.select('pid', 'number', 'name', 'img', 'pupdated').from('pokemons').whereNull('pupdated').orWhere('pupdated', '>=', id).orderBy('number', 'ASC')
    .then(notUpdatedList => {
        res.status(200).json(notUpdatedList);
    }).catch(err => { res.status(500).json({error: 'Database error on fetching data.'});});
});

router.patch('/normal/image/:id', (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    if (body.img === undefined || body.img === null || !body.img.startsWith('http')) { return res.status(400).json({error: 'Image url required!'}); };
    knex.first('*').from('pokemons').where('pid', '=', id)
    .then(pokemon => {
        if (pokemon.img === body.img) { return res.status(403).json({error: 'Current image is already set.'}); };
        const updImage = {
            img: body.img,
            pupdated: new Date()
        };
        knex('pokemons').where('pid', '=', id).update(updImage)
        .then(updated => {
            res.status(204).end();
        }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
    }).catch(err => { res.status(500).json({error: 'Database error on updating.'});});
});

module.exports = router;