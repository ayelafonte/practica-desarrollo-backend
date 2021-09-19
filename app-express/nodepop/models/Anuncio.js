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

anuncioSchema.statics.lista = function(filtro, skip, limit, select, sort) {
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(select);
    query.sort(sort);
    return query.exec();
}
 
anuncioSchema.statics.tags = function(){
    const query = Anuncio.find().distinct('tags');
    return query.exec();
}
 
// Crear modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exportar modelo
module.exports = Anuncio;

