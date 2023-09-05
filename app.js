const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index.ejs', {campgrounds})
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})



// EJS - Embedded Javascript
// views - for ejs
// models = for mongoose (Mongoose is a MongoDB ODM i.e (Object database Modelling) that used to translate the code and its representation from MongoDB to the Node. js server.)
// The app.set() function is used to assign the setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server. 
// db commands - mongosh --> show dbs --> use yelp-camp --> db.campgrounds.find() 
// start express server --> nodemon app.js