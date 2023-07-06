const express = require("express");
const { authPageVerProveedor,DeleteProveedor } = require("../controladores/ver_proveedor.controllers");


const router = express.Router();

//ruta ver interfaz de proveedor
router.get('/ver-proveedor', authPageVerProveedor)


//ruta para borrar registro
router.get('/borrarProveedor/:id', DeleteProveedor)

module.exports = router;