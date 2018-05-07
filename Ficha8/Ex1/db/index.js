const express = require('express');
const router = express.Router();
const user = require(__dirname + "/users");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//Get HomePage
router.get('/', (req, res) => {
    res.render('index.jade');
});

//Get SignPage
router.get('/sign', (req, res) => {
    res.render('sign.jade');
});

//Get LoginPage
router.get('/log', (req, res) => {
    res.render('login.jade');
});

/**
 * Insert New user to the DB
 */
router.post('/Registo', (req, res) => {

    req.check('email', 'Invalid email address').isEmail();
    req.check('psw', 'Invalid Password').isLength({ min: 6 }).equals(req.body.confpsw);
    let errors = req.validationErrors();
    if (errors) {
        console.log(errors);
    }

    let newuser = new user();
    newuser.name = req.body.firstname;
    newuser.last = req.body.lastname;
    newuser.email = req.body.email;
    newuser.password = newuser.generateHash(req.body.psw);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ficha8ex1");

        dbo.collection("users").insertOne(newuser, function (err, res) {
            if (err) throw err;
            console.log("User Added");
            db.close();
        });
    });
    res.redirect('/');
});


/**
 * Getting all Users from DB
 */
router.get('/users', (req, res) => {
    mongoose.model('users').find((err, users) => {
        res.send(users);
    });
});

//Get User
router.post('/Login', (req, res) => {

    let luser = new user();
    luser.email = req.body.email;
    luser.password = req.body.psw;

    MongoClient.connect(url, function (err, db) {   //Connect to DB
        if (err) throw err;
        var dbo = db.db("ficha8ex1");
        dbo.collection("users").findOne({ email: luser.email }, function (err, result) { //Find User
            if (err) throw err;

            if (!user) {
                return console.log('User Not Found!');
                res.redirect('/');
            }


            if (!luser.validPassword(luser.password, result.password)) {
                return console.log('Invalid PassWord!');
                res.redirect('/');
            }

            console.log(result.name);
            db.close();
            res.redirect('/');
        });
    });
});




module.exports = router;