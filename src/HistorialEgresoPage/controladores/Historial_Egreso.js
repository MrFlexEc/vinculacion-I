//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")


//Ver Home
const authPageHistorialEgreso = async (req, res) =>{
    if(req.session.loggedin){
        res.render('./HistorialEgresoPage/views/Historial_Egreso',{
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





module.exports ={
    authPageHistorialEgreso
}