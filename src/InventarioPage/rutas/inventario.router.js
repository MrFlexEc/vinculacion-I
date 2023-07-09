const express = require("express");
const { authPageInventario,EgresoRepuestoIngreso } = require("../controladores/inventario.controllers");

const router = express.Router();

router.get('/inventario', authPageInventario)

//ruta realizar el egreso
router.post('/EgresoinventarioInventario', EgresoRepuestoIngreso)
module.exports = router;