var express = require('express');
var app = express();

const isAdmin = require('../mw/admin');

var pokeRouter = require('./pokemons');
var wantRouter = require('./wants');
var userRouter = require('./users');
var seedRouter = require('./seeds');
var featureRouter = require('./features');
var myWantsRouter = require('./mywants');
var changesRouter = require('./changes');
var passwordRouter = require('./password');
var registerRouter = require('./register');

app.use('/pokemons', pokeRouter);
app.use('/wants', wantRouter);
app.use('/users', userRouter);
app.use('/seeds', isAdmin, seedRouter);
app.use('/features', featureRouter);
app.use('/mywants', myWantsRouter);
app.use('/changes', changesRouter);
app.use('/password', passwordRouter);
app.use('/register', registerRouter);

module.exports = app;