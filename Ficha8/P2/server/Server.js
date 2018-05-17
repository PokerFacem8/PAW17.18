const express = require('express');
const app = express();
const path = require('path');
const fpath = path.normalize(__dirname + "/..");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

//Routes
const login = require(fpath + "/routes/login.js");



//set the default views folder
app.set('view engine', 'jade');
app.use(express.static('views'));

let store = new MySQLStore( {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ficha8p2'

});



//Session
app.use(session({
    secret: '234v5678b4vv567c8',
    resave: false,
    saveUninitialized: false,
    store: store
}));









//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





//Express Validator
app.use(expressValidator());







//Use Routes from routes
app.use('/', login);



/**
 * The following code helps to redirect and respond 
 * whenever a wrong route is entered on the site.
 */
app.use(function (req, res) {
    res.render(fpath + '/views/404.jade');
});

//Server
app.listen(8080, ()=>{
    console.log("Server is Running!");

});