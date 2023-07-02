//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")

//Ver Home
const authPageModificarProveedor = async (req, res) =>{
    if(req.session.loggedin){
        res.render('./ModificarProveedorPage/views/modificar_proveedor',{
            login:true,
            name:req.session.name,
            rol:req.session.rol
        });
    }else{
        res.render('./LoginPage/views/Login',{
            alert:true,
            alertTitle:"ERROR",
            alertMessage: "Por favor inicie Sesion",
            alertIcon:'error',
            showConfirmButton:true,
            timer:false,
            ruta:'login'
        });
    }
}





module.exports = {
    authPageModificarProveedor
}