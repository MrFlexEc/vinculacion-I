 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const {authPageHistorialIngreso} = require('../controladores/Historial_Ingreso.controllers')


 
 router.get('/Historial-Ingreso', authPageHistorialIngreso)


 module.exports= router;