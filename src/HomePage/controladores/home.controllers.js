//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")


//Ver Home
const authPageHome = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const RepuestoAlerta = (await pool.request().query('SELECT * FROM Repuesto')).recordset;
        const alertas = []; // arreglo para almacenar las alertas
            RepuestoAlerta?.forEach((mini) => {
            const Nombre= mini.NOMBREREPUESTO
            const CANTIDADMIN= parseInt(mini.MINCANREPUESTO) 
            const CANTIDAD= parseInt(mini.CANTIDADREPUESTO) 
            console.log(alertas) 
            if(CANTIDAD < CANTIDADMIN) { 
                alertas.push({
                    alertTitle: "Cantidad baja",
                    alertMessage: "El repuesto: " + Nombre + " tiene pocas unidades: " + CANTIDAD,
                    alertIcon: 'warning',
                    showConfirmButton: true,
                    timer: false,
                });
            } 
            
        });
        res.render('./HomePage/views/Home', {
            login: true,
            name: req.session.name,
            rol: req.session.rol,
            alert: true,
            alertas: alertas,
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
  //  res.render('./HomePage/views/Home')
}





module.exports ={
    //  home,
    authPageHome
}