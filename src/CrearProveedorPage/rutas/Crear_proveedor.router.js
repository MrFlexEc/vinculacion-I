 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const {authPageCrearProveedor,InsertProveedor} = require('../controladores/Crear_proveedor.controllers')


 //ruta para ver la interfaz de proveedor
 router.get('/crearProveedor', authPageCrearProveedor)

  //ruta para insertar un proveedor
  router.post('/insertarProveedor', InsertProveedor)


 module.exports= router;