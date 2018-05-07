//Required Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/";
const path = require('path');
const fpath = path.normalize(__dirname + "/..");
const user = require(fpath + "/db/users");

//all Environment
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('views'));
mongoose.connect(url + 'ficha8ex1'); //Connect to DB


/**
 * Get index.html
 */
app.get('/', (req, res) => {
    res.render('index.html');
});


/**
 * Getting all Users from DB
 */
app.get('/users', (req, res) => {
    mongoose.model('users').find((err, users) => {
        res.send(users);
    });
});


/**
 * Insert New user to the DB
 */
app.post('/Registo', (req, res) => {

    let newuser = new user();
    newuser.name = req.body.firstname;
    newuser.last = req.body.lastname;
    newuser.email = req.body.email;
    newuser.password = newuser.generateHash(req.body.psw);

    newuser.save(function (err, newuser) {
        if (err) return console.log(err);
        console.log(newuser);
    });
    res.redirect('/');
});


/**
 * The following code helps to redirect and respond 
 * whenever a wrong route is entered on the site.
 */
app.use(function (req, res) {
    res.sendFile(fpath + '/views/404.html');
});

//Server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});