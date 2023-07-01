const express = require("express");
const { authPageModificarRegistro,EditarRegistro} = require("../controladores/modificar_registro.controllers");

const router = express.Router();

//ver interfaz de mofificar
router.get('/modificar-registro/:id', authPageModificarRegistro)

//actualizar los datos
router.post('/update-registro', EditarRegistro)

module.exports = router;