//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")


//Ver Home
const authPageHistorialIngreso = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultHistorialIngreso = await pool.request().query('select prov.NOMBREPROOVEDOR, rep.NOMBREREPUESTO,rep.CODIGOREPUESTO,inrep.CANTIDAINGRESODREPUESTO,inrep.FECHAINGRESOREPUESTO,inrep.FECHAAUDIINGRESOREPUESTO,usu.NOMBREUSUARIO from REPUESTO rep inner join INGRESO_REPUESTO inrep on rep.IDRESPUESTO = inrep.IDRESPUESTO inner join USUARIO usu on usu.IDUSUARIO = inrep.IDUSUARIO inner join PROVEEDOR prov on prov.IDPROOVEDOR = inrep.IDPROOVEDOR')
        res.render('./HistorialIngresoPage/views/Historial_Ingreso',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            HistorialIngreso:resultHistorialIngreso.recordset
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
    authPageHistorialIngreso
}