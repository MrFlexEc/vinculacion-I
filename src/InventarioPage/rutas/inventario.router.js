const express = require("express");
const { authPageInventario,EgresoRepuesto } = require("../controladores/inventario.controllers");

const router = express.Router();

router.get('/inventario', authPageInventario)

//ruta realizar el egreso
router.post('/Egresoinventario', EgresoRepuesto)
module.exports = router;