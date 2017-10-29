// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./db');
const Movie = mongoose.model('Movie');
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');

app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/movies', function (req, res) {
    const directorName = req.query.director;
    if (directorName !== undefined && directorName  !== "") {
        Movie.find({director: directorName}, function (err, movies, count) {
            res.render('movies', {movies: movies});
        });
    } else {
        Movie.find(function (err, movies, count) {
            res.render('movies', {movies: movies});
        });
    }
});

app.get('/movies/add', function (req, res) {
    res.render('addMovie', {});
});

app.post('/movies/add', function (req, res) {
    const title = req.body.title;
    const director = req.body.director;
    const year = req.body.year;
    const movie = new Movie({title: title, year: year, director:director});
    movie.save(function (err, movie, count) {
        console.log("Movie added successfully!!!");
        res.redirect('/movies');
    });
});

app.listen(3000);