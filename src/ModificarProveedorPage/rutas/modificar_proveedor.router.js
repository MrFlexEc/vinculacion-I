const express = require("express");
const { authPageModificarProveedor } = require("../controladores/modificar_proveedores.controllers");

const router = express.Router();

router.get('/modificar-proveedor', authPageModificarProveedor)

module.exports = router;