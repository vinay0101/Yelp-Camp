const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
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

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
});

app.get('/campgrounds/new', async (req, res) => {
    res.render('campgrounds/new')
});

app.post('/campgrounds', async(req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show',{campground})
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit',{campground})
});

app.put('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`)
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})



// EJS - Embedded Javascript
// views - for ejs
// models = for mongoose (Mongoose is a MongoDB ODM i.e (Object database Modelling) that used to translate the code and its representation from MongoDB to the Node. js server.)
// The app.set() function is used to assign the setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server. 
// db commands - mongosh --> show dbs --> use yelp-camp --> db.campgrounds.find() 
// start express server --> nodemon app.js