//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")


//Ver Home
const authPageHistorialEgreso = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultHistorialEgreso = await pool.request().query('select rep.NOMBREREPUESTO,rep.CODIGOREPUESTO,egprep.CANTIDADEGRESOREPUESTO,egprep.FECHAEGRESOREPUESTO,egprep.FECHAUDIEGRESOREPUESTO,usu.NOMBREUSUARIO from REPUESTO rep inner join EGRESO_REPUESTO egprep on rep.IDRESPUESTO = egprep.IDRESPUESTO inner join USUARIO usu on usu.IDUSUARIO = egprep.IDUSUARIO')
        res.render('./HistorialEgresoPage/views/Historial_Egreso',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            HistorialEgreso:resultHistorialEgreso.recordset
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