
//Required Modules
const express = require('express');
const app = express();
const path = require('path');
const fpath = path.normalize(__dirname + "/..");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);




//Routes
const routes = require(fpath + "/db/index");

//set the default views folder
app.set('view engine', 'jade');
app.use(express.static('views'));

// register the session with its secret ID
app.use(session({
    secret: 'a6ad6a789fs5fs8f6sdsf5jgbvd9n',
    store: new MongoStore({
        url: 'mongodb://localhost:27017/ficha8ex1',
        databaseName: 'ficha8ex1',
        collection: 'sessions'
    }),    
    resave: true,
    saveUninitialized: true,
}));

//register the bodyParser middleware for processing forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Express Validator
app.use(expressValidator());



//----------------------------------

//Use Routes from /db
app.use('/', routes);

/**
 * The following code helps to redirect and respond 
 * whenever a wrong route is entered on the site.
 */
app.use(function (req, res) {
    res.render(fpath + '/views/404.jade');
});

//Server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});