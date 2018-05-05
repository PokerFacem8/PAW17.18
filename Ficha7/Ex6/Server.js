const express = require('express');
const app = express();

app.use(express.static('views'));

app.get('/', (req, res, next) => {
    res.status('201').sendFile('/index.html');
});

app.get('/search', (req, res, next) => {
    let url = require('url');
    let query = req.query;
    let urlS = {
            protocol: query.protocol,
            slashes: query.slashes,
            auth: query.auth,
            host: query.host,
            port: query.port,
            hostname: query.hostname,
            hash: query.hash,
            search: query.search,
            query: query.query,
            pathname: query.pathname,
            path: query.path,
            href: query.href,
            results: query.results,
            include_tabs: query.include_tabs
    }

    const fs = require('fs');

    fs.writeFile(query.search + ".json", JSON.stringify(urlS, null, 2), function (err) {
        if (err) {
            res.status('404');
        }
        console.log('Done');
    });

});

app.get('/undefined', (req, res, next) => {
    let url = require('url');
    let query = req.query;
    const fs = require('fs')
    let filePath = __dirname + '/' + query.pathname + '.json';
    let rawdata = fs.readFileSync(filePath);
    let obj = JSON.parse(rawdata);
    res.json(obj);
});






/**
 * The following code helps to redirect and respond 
 * whenever a wrong route is entered on the site.
 */
app.use(function(req, res) {
    //res.status(404).send({url: req.originalUrl + ' not found'});
    res.sendFile(__dirname + '/views/404.html');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080!');
})