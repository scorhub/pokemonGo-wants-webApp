const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);
const jwt = require('jsonwebtoken');

const getTokenFrom = req => {
    const authorization = req.get(`authorization`);
    if(authorization && authorization.toLowerCase().startsWith('bearer')){ return authorization.substring(7); };
    return null;
};

const isAdmin = (req, res, next) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.SECRET);
    if(!token){ return res.status(401).json({ error: 'Token missing.' }); };
    if(!decodedToken || !decodedToken.uid){ return res.status(401).json({ error: "Invalid token." }); };
    knex.from('users').first('*').where('uid', '=', decodedToken.uid)
    .then(user => {
        if(!user) { return res.status(401).json({ error: "Invalid token." }); };
        if(Number(decodedToken.ucid) !== Number(user.ucid)){ return res.status(403).json({ error: "Access denied." }); };
        next();
    }).catch(err => { res.status(500).json({ error: 'Database error in checking authorization.' }); });
};

module.exports = isAdmin;