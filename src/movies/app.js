// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const moviesRouter = require('./routes/movies');

// setting session options (code used from online slides)
const sessionOptions = {
    secret: 'secret for signing session id',
    saveUninitialized: false,
    resave: false
};
app.use(session(sessionOptions));
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));

// route middleware
app.use('/', moviesRouter);

app.listen(3000);