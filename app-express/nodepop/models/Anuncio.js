'use strict'

const mongoose = require('mongoose');

// Definir esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: Array
});

// Crear modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exportar modelo
module.exports = Anuncio;

