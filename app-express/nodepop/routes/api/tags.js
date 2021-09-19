'use strict'

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

router.get('/', async (req, res, next) => {
    try {
        const tags = await Anuncio.tags()

        res.json({result: tags})

    } catch (err) {
        next(err)
    }
});

module.exports = router;
