'use strict'

const mongoose = require('mongoose')

// Error de conexión
mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

// Abrir BBDD
mongoose.connection.once('open', () => {
    console.log('Conexión establecida en:', mongoose.connection.name);
});

// Conectar con la BBDD
mongoose.connect('mongodb://localhost/nodepop',{});

module.exports = mongoose.connection