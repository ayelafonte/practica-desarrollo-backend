'use strict';

const nodepop = require('express');
const http = require('http');

const app = nodepop();

app.get('/', (req, res, next) => {
    res.send('hola'); //Recibe una peticion a la raiz del sitio responde hola
});

// Crear el servidor
const server = http.Server(app);

//Arrancar el servidor
server.listen(8085, () => {
    console.log('Servidor arrancado en el puerto 8085')
});