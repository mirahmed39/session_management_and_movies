const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

router.get('/movies', function (req, res) {
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

router.get('/movies/add', function (req, res) {
    res.render('addMovie', {});
});

router.post('/movies/add', function (req, res) {
    const title = req.body.title;
    const director = req.body.director;
    const year = req.body.year;
    const movie = new Movie({title: title, year: year, director:director});
    if(req.session.hasOwnProperty('movies'))
        req.session.movies.push(movie);
    else
        req.session.movies = [movie];
    movie.save(function (err, movie, count) {
        console.log("Movie added successfully!!!");
        res.redirect('/movies');
    });
});

router.get('/mymovies', function (req, res) {
    res.render('mymovies', {movies: req.session.movies});
});

module.exports = router;