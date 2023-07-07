 //ejecutar express
const express = require("express")
//invocar express mediante app
const app = express()

//variable de session
const session = require('express-session');
app.use(session({
    secret:'secret',
     resave: true,
     saveUninitialized:true
}))


//crear constante port y definir si exite un puerto sino usar 3000
let port;
app.set ('port', port || 2000)




//Definir motor de plantillas
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

//como capturar datos d formulario
//definir middlewares --> funciones que se ejecutan antes que lleguen a las rutas 
//desde aplicacion cliente se envia un dato al servidor en formato json, lo convierte a js
app.use(express.json());
//app.use(express(express.json));
//entender un dato a traves de formulario es capaz de procesarlo y convertir en objetos
//extended: false para no aceptar datos como imagenes solo datos simples
app.use(express.urlencoded({extended: false}));

//importar las rutas
app.use(require('./LoginPage/rutas/login.router'));
app.use(require('./HomePage/rutas/home.router'));
app.use(require('./CrearProveedorPage/rutas/Crear_proveedor.router'));
app.use(require('./CrearRegistroPage/rutas/Crear_registro.router'));
app.use(require('./VerRegistroPage/rutas/Ver_registros.router'));
app.use(require('./VerProveedorPage/rutas/ver_proveedor.router'));
app.use(require('./ModificarRegistroPage/rutas/modificar_registro.router'))
app.use(require('./ModificarProveedorPage/rutas/modificar_proveedor.router'))
app.use(require('./InventarioPage/rutas/inventario.router'))
app.use(require('./DataVerPage/rutas/DataVer.router'))
app.use(require('./UsuarioPage/rutas/Crear_usuarior.router'))
app.use(require('./HistorialIngresoPage/rutas/Historial_Ingreso'))
app.use(require('./HistorialEgresoPage/rutas/Historial_Egreso'))

//invocar metodos express este caso para levantar el servidor
app.listen(app.get('port'), ()=>{
    console.log("Servidor levantado http://localhost:2000/login");
})
