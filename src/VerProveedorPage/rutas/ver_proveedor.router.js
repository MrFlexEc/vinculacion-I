const express = require("express");
const { authPageVerProveedor } = require("../controladores/ver_proveedor.controllers");


const router = express.Router();

router.get('/ver-proveedor', authPageVerProveedor)

module.exports = router;