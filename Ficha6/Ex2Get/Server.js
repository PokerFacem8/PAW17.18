var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (request.url == '/') {
        filePath += 'index.html';
    }

    if (filePath.includes('./action_page.php')) {
        let url = require('url');
        var q = url.parse(filePath, true);
        var qdata = q.query;

        let person = {
            name: qdata.firstname,
            last: qdata.lastname,
            email: qdata.email,
            codigo: qdata.codigopostal,
            pais: qdata.pais,
            data: qdata.dob,
            conducao: qdata.ncarta,
            morada: qdata.morada,
            titulo: qdata.titulo
        };



        fs = require('fs');

        fs.writeFile(qdata.firstname + qdata.lastname + ".json", JSON.stringify(person, null, 2), function (err) {
            if (err) {
                return console.log('Erro');
            }
            console.log('Done');
        });

    }






    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        if (error) {
            console.log(error);
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            console.log(content);
            response.end(content, 'utf-8');
        }
    });

}).listen(8000);
console.log('Server running at http://127.0.0.1:8125/');