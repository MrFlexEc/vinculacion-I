 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const {authPageCrearUsuario,InsertUsuario} = require('../controladores/Crear_usuario.controllers')


 //ruta para ver la interfaz de proveedor
 router.get('/crearUsuario', authPageCrearUsuario)

  //ruta para insertar un proveedor
  router.post('/insertarUsuario', InsertUsuario)



 module.exports= router;