//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")


//Ver Interfaz para agregar registro
const authPageCrearRegistro = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultmarca = await pool.request().query('SELECT * FROM USUARIO2')

        res.render('./CrearRegistroPage/views/Crear_registro',{
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

const InsertRegistro = async (req, res) =>{
    try {

        const codigoRegistro = req.body.codigoRegistro;
        const nombreRegistro = req.body.nombreRegistro;
        const descripcionRegistro = req.body.descripcionRegistro;
        const marcaRegistro = req.body.marcaRegistro;
        const categoriaRegistro = req.body.categoriaRegistro;
        const proveedorRegistro = req.body.proveedorRegistro;
        const medidaRegistro = req.body.medidaRegistro;
        const modeloRegistro = req.body.modeloRegistro;
        const observacionRegistro = req.body.observacionRegistro;
        const ubicacionRegistro = req.body.ubicacionRegistro;



        const pool = await dbConnection.getConnection();
        await pool.request().input('NOMBREPROOVEDOR', sql.VarChar(50), nombreProveedor)
                            .input('RUCPROOVEDOR', sql.VarChar(15), rucProveedor)
                            .input('CONTACTOPROOVEDOR', sql.VarChar(50), contactoProveedor)
                            .input('EMPRESAPROOV', sql.VarChar(20), empresaProveedor)
                            .input('CORREOPROOV', sql.VarChar(40), correoProveedor)
                            .input('DIRECCIONPROOV', sql.VarChar(40), direccionProveedor)
                            .input('OBSERVACIONPROOV', sql.VarChar(100), observacionProveedor)
                            .query('INSERT INTO PROVEEDOR VALUES (@NOMBREPROOVEDOR,@RUCPROOVEDOR,@CONTACTOPROOVEDOR,@EMPRESAPROOV,@CORREOPROOV,@DIRECCIONPROOV,@OBSERVACIONPROOV)')
                            
                            res.render('./CrearProveedorPage/views/Crear_proveedor',{
                                login:false,
                                alert:true,
                                alertTitle:"EXITOSO",
                                alertMessage: "Proveedor ingresado correctamente",
                                alertIcon:'success',
                                showConfirmButton:true,
                                timer:false,
                                ruta:'crearProveedor',
                               
                              })

        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        }) 
    }
}





module.exports ={
    authPageCrearRegistro,
    InsertRegistro

}