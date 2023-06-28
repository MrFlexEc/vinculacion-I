 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const {authPageVerRegistros} = require('../controladores/Ver_registros.controllers')


 //ruta para ver home
 router.get('/VerRegistros', authPageVerRegistros)


 module.exports= router;