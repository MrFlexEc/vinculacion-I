 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const {authPageCrearRegistro,InsertRegistro} = require('../controladores/Crear_registro.controllers')


 //ruta para ver la interfaz de registro
 router.get('/crearRegistro', authPageCrearRegistro)

  //ruta para insertar un registro 
  router.post('/insertarRegistro', InsertRegistro) 


 module.exports= router;