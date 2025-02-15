const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require("express-session")

const { name } = require('ejs');

const gameCtrl = require('./controllers/games')
const userCtrl = require('./controllers/users')

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Middleware
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


//Home Page
app.get('/', async function(req, res){
    res.render('index.ejs', {user: req.session.user});
})

app.use('/games', gameCtrl)
app.use('/users', userCtrl)

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
