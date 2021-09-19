'use strict'

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// Devolver lista de anuncios y gestionar el error con try/catch
router.get('/', async (req, res, next) => {
    try {
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const select = req.query.select;
        const sort = req.query.sort;

        const filtro = {};

        if(nombre){
            filtro.nombre = new RegExp('^' + nombre, "i");
        }

        if(venta){
            filtro.venta = venta
        }

        if(precio) {
            let precios = precio.split('-');
            let precioMin = precios[0]
            let precioMax = precios[1] 

            if (precioMin = ' ' ) {
                precioMin = 0
            };
            
            if (precioMax = ' ') {
                filtro.precio = {$gte: precioMin}

            } else {
                filtro.precio = {$gte: precioMin, $lte: precioMax}
            }
        }
        
        if(tags){
            filtro.tags = tags
        }

        const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort)
        res.json({ results: anuncios });
    } catch (err) {
        next(err);
    }   
});

// Crear nuevos anuncios
router.post('/', async (req, res, next) => {
    try {
        const anuncioData = req.body;
        const anuncio = new Anuncio (anuncioData); // Crear anuncio en memoria
        const anuncioCreado = await anuncio.save();
        res.status(201).json({ result: anuncioCreado});
    } catch(err) {
        next(err)
    }
});

// Eliminar anuncios
router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        await Anuncio.deleteOne({_id: _id });
        res.json();
    } catch (err) {
        next(err);
    }
});

// Actualizar anuncios
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const anuncioData = req.body;

        const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: _id }, anuncioData, {
            new: true // Devuelve estado final
        });

        if(!anuncioActualizado){
            res.status(404).json({ error: 'not found'})
            return;
        }

        res.json({ result: anuncioActualizado });
    } catch (err) {
        next(err);
    }
});

// Exportar
module.exports = router
