var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');


/* GET home page. */
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


module.exports = router;
