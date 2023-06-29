const express = require("express");
const { authPageModificarRegistro } = require("../controladores/modificar_registro.controllers");

const router = express.Router();

router.get('/modificar-registro', authPageModificarRegistro)

module.exports = router;