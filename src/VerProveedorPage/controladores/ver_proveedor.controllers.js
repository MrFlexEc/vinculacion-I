//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")

//Ver Home
const authPageVerProveedor = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultVerProveedor = await pool.request().query('select * from PROVEEDOR;')
        res.render('./VerProveedorPage/views/ver_proveedores',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            resultadoVP:resultVerProveedor.recordset
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



//metodo eliminar
const DeleteProveedor = async(req, res)=>{

    try {
        const idProveedor = req.params.id;
        const pool = await dbConnection.getConnection();
        await pool.request()
        .input('IDPROOVEDOR', sql.Int, idProveedor)
        .query("delete from Proveedor where IDPROOVEDOR=@IDPROOVEDOR")
        res.redirect('/ver-proveedor'); 
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })   
    }
      
}

module.exports = {
    authPageVerProveedor,
    DeleteProveedor
}