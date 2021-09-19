'use strict'

// Conectar a la BBDD
const dbConnection = require('.lib/connectMongoose');

// Modelo de anuncios
const Anuncio = require('./models/Anuncio');
const anuncioData = require('./anuncios.json')

main().catch(err => console.log('Se produjo un error', err));

async function main() {
    await initAnuncios();

    dbConnection.close();
}

async function initAnuncios() {
    // Eliminar todos los documentos de la colección
    const deleted = await Anuncio.deleteMany(); 
    console.log(` Se han eliminado ${deleted.deletedCount} anuncios, `);
    // Crear anuncios iniciales
    const anuncios = await Anuncio.insertMany(anuncioData.anuncios);
    console.log(`Se han creado ${anuncios.length} anuncios.`);
}