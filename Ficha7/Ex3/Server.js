
const express = require('express')
const app = express()

app.use(express.static('views'));


app.get('/', (req, res) => {
    res.render('/index.html');
});

app.get('/action_page', (req,res)=>{
    let url = require('url');
    var q = url.parse('/', true);
    var qdata = req.query;

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
            res.status('404');
        }
        console.log('Done');
    });

});




app.listen(8080, () => {
    console.log('Servidor ativo na porta: 8080!');
});