var express = require('express');
var router = express.Router();

const config = require('../utils/config');
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);
const jwt = require('jsonwebtoken');

const getTokenFrom = req => {
    const authorization = req.get(`authorization`);
    if (authorization && authorization.toLowerCase().startsWith('bearer')) { return authorization.substring(7) };
    return null;
};

const isAuthenticated = (req, res, next) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.SECRET);

    if (!token) { return res.status(401).json({err: 'Token missing.'}) };
    
    if (!decodedToken || !decodedToken.uid) { return res.status(401).json({err: 'Token invalid.'}) };

    knex.from('users').select('*').where('uid', '=', decodedToken.uid)
    .then(user => {
        if (user.lenght === 0) { return res.status(401).json({err: 'Token invalid.'}) };
        res.locals.auth = { uid: decodedToken.uid, username: decodedToken.username, showname: decodedToken.showname };
        next();
    }).catch(err => { res.status(500).json({err: 'Database error.'}) });
};

module.exports = isAuthenticated;