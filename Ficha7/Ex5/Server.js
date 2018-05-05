const express = require('Express');
const app = express();

app.use(express.static('views'));

//Get index.html
app.get('/', (req, res, next) => {
    res.sendFile('/index.html');
});

app.get('/messageEncrypt/:id', (req,res)=> {

    const crypto = require('crypto');
    const cipher = crypto.createCipher('aes192', 'a password');

    let text = req.params.id;

    // encrypted text: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
    //let encrypted = cipher.update('some clear text data', 'utf8', 'hex');

    let encrypted = cipher.update(text, 'utf8', 'hex');

    encrypted += cipher.final('hex');
    console.log(encrypted);
    res.send(encrypted);
});

app.get('/messageDecrypt/:id', (req,res)=> {

    const crypto = require('crypto');
    const decipher = crypto.createDecipher('aes192', 'a password');

    let text = req.params.id;

    //const encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
    const encrypted = text;

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);
    // Prints: some clear text data
    res.send(decrypted);

});










app.put('/api/:company', function(res,req) {
    res.send('this is an update');
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
});