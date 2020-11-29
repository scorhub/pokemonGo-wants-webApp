var express = require('express');
var app = express();

const isAdmin = require('../mw/admin');
const isModerator = require('../mw/moderator');

var wantRouter = require('./wants');
var userRouter = require('./users');
var featureRouter = require('./features');
var myWantsRouter = require('./mywants');
var changesRouter = require('./changes');
var passwordRouter = require('./password');
var addDataRouter = require('./adddata');
var pokeRouter = require('./pokemons');
var seedRouter = require('./seeds');
var registerRouter = require('./register');

app.use('/wants', wantRouter);
app.use('/users', userRouter);
app.use('/features', featureRouter);
app.use('/mywants', myWantsRouter);
app.use('/changes', changesRouter);
app.use('/password', passwordRouter);
app.use('/adddata', isModerator, addDataRouter);
app.use('/pokemons', isAdmin, pokeRouter);
app.use('/seeds', isAdmin, seedRouter);
app.use('/register', isAdmin, registerRouter);

module.exports = app;