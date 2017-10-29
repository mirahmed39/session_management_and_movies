// db.js
const mongoose = require('mongoose');

// my schema goes here
const Movie = new mongoose.Schema({
    title: String,
    year: Number,
    director: String
});

// registering model
mongoose.model('Movie', Movie);

// coonect to the database
mongoose.connect('mongodb://localhost/hw05');