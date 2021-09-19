'use strict'

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// Devolver lista de anuncios
router.get('/', async (req, res, next) => {
    const anuncios = await Anuncio.find();
    res.json({ results: anuncios });
});

// Exportar
module.exports = router
