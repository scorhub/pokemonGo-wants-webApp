const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const isAuthenticated = require('./mw/auth');

const app = express();

const loginRouter = require('./routes/login');
const apiRouter = require('./routes/apirouter');

// // // // Router for initial setup
// const initialRouter = require('./set_up/setup_register');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/login', loginRouter);
app.use('/api/verified', isAuthenticated, apiRouter);

// // // // Route for initial setup
// app.use('/api/initial/', initialRouter);

app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'build/')});
});

module.exports = app;