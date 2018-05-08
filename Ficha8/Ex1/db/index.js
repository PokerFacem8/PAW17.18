const express = require('express');
const router = express.Router();
const user = require(__dirname + "/users");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//Get HomePage
router.get('/', (req, res) => {
    res.render('index.jade');
});

//Get SignPage
router.get('/sign', (req, res) => {
    if (req.session.user) {//Verify if session is open
        res.redirect('/');
    } else {
        res.render('sign.jade', { title: 'Sign In', success: req.session.success, errors: req.session.errors });
        req.session.errors = null;
    }
});


//Get UserPage
router.get('/user', function requiresLogin(req, res, next) {
    if (req.session.user) {//Verify if session is open
        res.render('userpage.jade', {
            username: req.session.user.name
        });
    } else {
        console.log('You must be logged in to view this page.');
        res.redirect('/log');
    }
});



// GET /logout
router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        } else {
            console.log('User is no longer Logged In')
            return res.redirect('/');
        }
    });
});



//Get LoginPage
router.get('/log', (req, res) => {
    if (req.session.user) {//Verify if session is open
        res.redirect('/');
    } else {
        res.render('login.jade');
    }
});



/**
 * Insert New user to the DB
 */
router.post('/Registo', (req, res) => {
    req.check('email', 'Invalid email address').isEmail(); //Validate Email
    req.check('psw', 'Invalid Password').isLength({ min: 6 }).equals(req.body.confpsw); //Validate PassWord
    let errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors; //Store errors in Session
        req.session.success = false;
        res.redirect('/sign');
    } else {
        req.session.success = true;
        let newuser = new user();
        newuser.name = req.body.firstname;
        newuser.last = req.body.lastname;
        newuser.email = req.body.email;
        newuser.password = newuser.generateHash(req.body.psw);

        MongoClient.connect(url, function (err, db) {// Connect to DB
            if (err) throw err;
            var dbo = db.db("ficha8ex1");

            dbo.collection("users").findOne({ email: newuser.email }, function (err, user) { //Find User to check if there is a user with same email already sign in
                if (err) {
                    return console.log('Error');
                }


                if (user) {
                    return console.log('Email Already in Use');//if db had that user

                } else { 
                    dbo.collection("users").insertOne(newuser, function (err, res) { //if not add user to db
                        if (err) throw err;
                        console.log("User Added");
                        req.session.user = newuser;
                        req.session.save();
                        db.close();
                    });
                }
            });
        });
        res.redirect('/');
    }
});



/**
 * Getting all Users from DB
 */
router.get('/users', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ficha8ex1");
        dbo.collection("users").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
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
        dbo.collection("users").findOne({ email: luser.email }, function (err, user) { //Find User
            if (err) {
                return console.log('user');
            }


            if (!user) {
                return console.log('User Not Found!');

            }

            if (!luser.validPassword(luser.password, user.password)) {//compare two psw hashed
                return console.log('Invalid PassWord!');

            }
            req.session.user = user; //save user to session
            req.session.save();
            db.close();
        });

    });
    res.redirect('/');
});


module.exports = router;