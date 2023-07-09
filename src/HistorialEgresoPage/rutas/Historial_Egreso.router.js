 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const {authPageHistorialEgreso} = require('../controladores/Historial_Egreso.controllers')


 
 router.get('/Historial-Egreso', authPageHistorialEgreso)


 module.exports= router;