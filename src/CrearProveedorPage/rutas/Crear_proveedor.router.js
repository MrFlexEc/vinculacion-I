 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const {authPageCrearProveedor,InsertProveedor,authPageCrearProveedor2,InsertProveedor2} = require('../controladores/Crear_proveedor.controllers')


 //ruta para ver la interfaz de proveedor
 router.get('/crearProveedor', authPageCrearProveedor)

  //ruta para insertar un proveedor
  router.post('/insertarProveedor', InsertProveedor)


   //ruta para ver la interfaz de proveedorRepuesto
    router.get('/crearProveedor2', authPageCrearProveedor2)

    //ruta para insertar un proveedorRepuesto
    router.post('/insertarProveedor2', InsertProveedor2)

 module.exports= router;