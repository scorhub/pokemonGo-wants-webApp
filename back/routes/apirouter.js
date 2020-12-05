var express = require('express');
var app = express();

var frontRouter = require('./front');
var wantRouter = require('./wants');
var userRouter = require('./users');
var featureRouter = require('./features');
var myWantsRouter = require('./mywants');
var changesRouter = require('./changes');
var passwordRouter = require('./password');
var adminRouter = require('./adminapi');

app.use('/front', frontRouter);
app.use('/wants', wantRouter);
app.use('/users', userRouter);
app.use('/features', featureRouter);
app.use('/mywants', myWantsRouter);
app.use('/changes', changesRouter);
app.use('/password', passwordRouter);
app.use('/admin', adminRouter);

module.exports = app;