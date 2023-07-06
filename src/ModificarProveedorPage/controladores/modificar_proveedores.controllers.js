//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")

//Ver Home
const authPageModificarProveedor = async (req, res) =>{
    if(req.session.loggedin){
        IDPROOVEDOR= req.params.id;
        const pool = await dbConnection.getConnection();
        const Proveedor = await pool.request().input('IDPROOVEDOR', sql.Int, IDPROOVEDOR)
                                              .query('SELECT * FROM Proveedor where  IDPROOVEDOR=@IDPROOVEDOR')
        res.render('./ModificarProveedorPage/views/modificar_proveedor',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            proveedor:Proveedor.recordset[0]
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


const EditarProveedor = async (req, res) =>{    
    try {
        const IDPROOVEDOR = req.body.idproveedor;
        const nombreProveedor = req.body.nombreProveedor;
        const empresaProveedor = req.body.empresaProveedor;
        const correoProveedor = req.body.correoProveedor;
        const contactoProveedor = req.body.contactoProveedor;
        const rucProveedor = req.body.rucProveedor;
        const direccionProveedor = req.body.direccionProveedor;
        const observacionProveedor = req.body.observacionProveedor; 
        const pool = await dbConnection.getConnection();

        //validaciones
        //todos los campos llenos
        if(nombreProveedor && empresaProveedor && 
            correoProveedor && contactoProveedor && 
            rucProveedor &&direccionProveedor&&observacionProveedor){
            await pool.request().input('IDPROOVEDOR', sql.Int, IDPROOVEDOR)
                            .input('NOMBREPROOVEDOR', sql.VarChar(50), nombreProveedor)
                            .input('RUCPROOVEDOR', sql.VarChar(15), rucProveedor)
                            .input('CONTACTOPROOVEDOR', sql.VarChar(50), contactoProveedor)
                            .input('EMPRESAPROOV', sql.VarChar(20), empresaProveedor)
                            .input('CORREOPROOV', sql.VarChar(40), correoProveedor)
                            .input('DIRECCIONPROOV', sql.VarChar(40), direccionProveedor)
                            .input('OBSERVACIONPROOV', sql.VarChar(100), observacionProveedor)
                            .query('UPDATE PROVEEDOR SET NOMBREPROOVEDOR=@NOMBREPROOVEDOR,RUCPROOVEDOR=@RUCPROOVEDOR,CONTACTOPROOVEDOR=@CONTACTOPROOVEDOR,EMPRESAPROOV=@EMPRESAPROOV,CORREOPROOV=@CORREOPROOV,DIRECCIONPROOV=@DIRECCIONPROOV,OBSERVACIONPROOV=@OBSERVACIONPROOV where IDPROOVEDOR=@IDPROOVEDOR')
                            
                            res.render('./ModificarProveedorPage/views/modificar_proveedor',{
                                bienProve:true,
                                login:false,
                                alert:true,
                                alertTitle:"EXITOSO",
                                alertMessage: "Proveedor modificado correctamente",
                                alertIcon:'success',
                                showConfirmButton:true,
                                timer:false,
                                ruta:'ver-proveedor',
                               
                              })
        //ningun campo lleno
        }else{
            res.render('./ModificarProveedorPage/views/modificar_proveedor',{
                bienProve:false,
                login:false,
                alert:true,
                alertTitle:"ERROR",
                alertMessage: "Por favor ingrese todos los datosss",
                alertIcon:'error',
                showConfirmButton:true,
                timer:false,
               
              })

        }
        

        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        }) 
    }
}



module.exports = {
    authPageModificarProveedor,
    EditarProveedor
}