
//Required Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/";
const path = require('path');
const fpath = path.normalize(__dirname + "/..");
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

//Routers
const routes = require(fpath + "/db/index");
//---------------------------------



//all Environment
app.set('view engine','jade');
app.use(express.static('views'));
mongoose.connect(url + 'ficha8ex1'); //Connect to DB
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

//----------------------------------

//Use Routes from /db
app.use('/',routes);

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