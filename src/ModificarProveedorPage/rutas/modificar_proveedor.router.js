const express = require("express");
const { authPageModificarProveedor,EditarProveedor } = require("../controladores/modificar_proveedores.controllers");

const router = express.Router();

//ver interfaz de mofificar proveedor
router.get('/modificar-proveedor/:id', authPageModificarProveedor)

//actualizar los datos
router.post('/update-proveedor', EditarProveedor)

module.exports = router;