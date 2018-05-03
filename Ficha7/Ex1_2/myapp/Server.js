"use strict";

const express = require('express');
const app = express();

app.set('view engine', 'jade');
app.set('views', './views');

class aluno{
    constructor(numero, nome, genero) {
        this.numero = numero;
        this.nome = nome;
        this.genero = genero;
    }
}

const alunos = [];
alunos[0] = new aluno('123','Pedro','M');
    




app.get('/alunos', (req, res) => {
    res.status(200).send(alunos);
});


app.get('/index', (req, res) => {
    res.render('index', {
        title: 'PAW',
        messageTitle: 'Jade',
        messageText: 'Exemplo...'
    });
});



app.listen(8080, () => {
    console.log('Servidor ativo na porta: 8080!');
});