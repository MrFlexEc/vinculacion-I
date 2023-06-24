 //ejecutar express
 const express = require("express");
 //Constante para invocar las rutas
 const router = express.Router();
 //Traer los metodos de las consultas
 const { Login,LoginValidacion, ejem,destroysession} = require('../controladores/login.controllers')




//ruta para ver login
 router.get('/login', Login)

// router.get('/', authPages)
//ruta para ver login 
router.get('/ejemplo', ejem)
//ruta cerrar sesion
router.get('/cerrarsesion',destroysession)

//ruta para validar
router.post('/loginvalidator', LoginValidacion)

 module.exports= router;