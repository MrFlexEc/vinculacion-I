const express = require("express");
const { authPageInventario } = require("../controladores/inventario.controllers");

const router = express.Router();

router.get('/inventario', authPageInventario)

module.exports = router;