const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const User = require(__dirname + "/users");

//Create a Connection to DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ficha8p2'
});



//Connect to DB
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});



//HomePage/Profile
router.get('/', (req, res) => {//Verificar se o user esta logged se estiver muda para o profile
    if (req.session.email) {
        res.render('userpage.jade', {
            username: req.session.name
        });
    } else {
        res.render('index.jade');
    }
});



//Sign IN if user is logged user will be redirect to Profile Page
router.get('/sign', (req, res) => {
    if (req.session.email) {//Verify if session is open
        res.redirect('/');
    } else {
        res.render('sign.jade', { title: 'Sign In', success: req.session.success, errors: req.session.errors });
        req.session.errors = null;

    }
});

//Sign IN
router.post('/Registo', (req, res) => { //Post Request for sign In
    req.check('email', 'Invalid email address').isEmail(); //Validate Email
    req.check('psw', 'Invalid Password').isLength({ min: 6 }).equals(req.body.confpsw); //Validate PassWord
    let errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors; //Store errors in Session
        req.session.success = false;
        res.redirect('/sign');
    } else {
        let newuser = new User(req.body.firstname, req.body.lastname, req.body.email, req.body.psw);

        db.query("SELECT * FROM `users` WHERE email = '" + newuser.email + "' ", (err, result) => {
            if (err) throw err;

            if (result.firstname) {
                console.log('Email already exists in DB');
            } else {
                let sql = "INSERT INTO users (firstname, lastname, email, password) VALUES ('" + newuser.name + "', '" + newuser.last + "', '" + newuser.email + "', '" + newuser.password + "')";
                let query = db.query(sql, (err, user) => {
                    if (err) throw err;
                    console.log("User Added!");
                    req.session.email = user.email;
                    req.session.name = user.firstname;
                    req.session.save();
                });
            }
        })
        res.redirect('/');
    }
});




//Log In if user is logged user will be redirect to Profile Page
router.get('/log', (req, res) => {
    if (req.session.email) {//Verify if session is open
        res.redirect('/');
    } else {
        res.render('login.jade');
    }
});


router.post('/Login', (req, res) => { //Post Request for log in
    let lemail = req.body.email;
    let lpsw = req.body.psw;

    let query = db.query("SELECT * FROM users WHERE email = '" + lemail + "' ", (err, result) => {
        if (err) throw err;

        if (result.length < 1) {
            return console.log('User Not Found!');
        }

        if (!User.validPassword(lpsw, result[0].password)) {//compare two psw hashed
            return console.log('Invalid PassWord!');
        }
        req.session.email = result[0].email;
        req.session.name = result[0].firstname;
        res.redirect('/');
    });

});









//Log Out dstroy curremt session then is redirect to index.jade
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        } else {
            console.log('User is no longer Logged In')
            return res.redirect('/');
        }
    });
});



module.exports = router;