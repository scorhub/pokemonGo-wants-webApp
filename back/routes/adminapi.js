var express = require('express');
var app = express();

const isAdmin = require('../mw/admin');
const isModerator = require('../mw/moderator');

var addDataRouter = require('./admin/adddata');
var pokeRouter = require('./admin/pokemons');
var seedRouter = require('./admin/seeds');
var registerRouter = require('./admin/register');
var moderatorRouter = require('./admin/moderatorapi');
var newsRouter = require('./admin/news');

app.use('/adddata', isModerator, addDataRouter);
app.use('/pokemons', isAdmin, pokeRouter);
app.use('/seeds', isAdmin, seedRouter);
app.use('/register', isAdmin, registerRouter);
app.use('/moderator', isAdmin, moderatorRouter);
app.use('/news', isAdmin, newsRouter);

module.exports = app;