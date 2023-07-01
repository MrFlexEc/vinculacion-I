 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const {authPageVerRegistros,DeleteRegistro} = require('../controladores/Ver_registros.controllers')


 //ruta para ver Ver los registros
 router.get('/VerRegistros', authPageVerRegistros)

 
 //ruta para borrar registro
 router.get('/borrarRegistro/:id', DeleteRegistro)


 module.exports= router;