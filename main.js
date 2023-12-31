//Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = 5000;

//Database connection

mongoose.connect('mongodb+srv://root:root@nodeapp.eck5yei.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connection to DB successful'));

//Middlewares

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'magic key',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    next();
});

app.use(express.static('uploads'));

// Template Engine

app.set('view engine', 'ejs');

// route prefix

app.use("", require("./routes/routes"));


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
