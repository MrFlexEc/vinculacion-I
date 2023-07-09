 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const {authPageDataVer} = require('../controladores/DataVer.controllers')


 //ruta para ver Datos completos de los repuestos
 router.get('/Data-ver/:id', authPageDataVer)


 module.exports= router;