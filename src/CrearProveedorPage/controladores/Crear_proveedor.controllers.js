//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")

//Ver proveedor
const authPageCrearProveedor = async (req, res) =>{
    if(req.session.loggedin){
        res.render('./CrearProveedorPage/views/Crear_proveedor',{
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

//Ver proveedor 2
const authPageCrearProveedor2 = async (req, res) =>{
    if(req.session.loggedin){
        res.render('./CrearProveedorPage/views/Crear_proveedor2',{
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


const InsertProveedor = async (req, res) =>{
    try {

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
            await pool.request().input('NOMBREPROOVEDOR', sql.VarChar(50), nombreProveedor)
                            .input('RUCPROOVEDOR', sql.VarChar(15), rucProveedor)
                            .input('CONTACTOPROOVEDOR', sql.VarChar(50), contactoProveedor)
                            .input('EMPRESAPROOV', sql.VarChar(20), empresaProveedor)
                            .input('CORREOPROOV', sql.VarChar(40), correoProveedor)
                            .input('DIRECCIONPROOV', sql.VarChar(40), direccionProveedor)
                            .input('OBSERVACIONPROOV', sql.VarChar(100), observacionProveedor)
                            .query('INSERT INTO PROVEEDOR VALUES (@NOMBREPROOVEDOR,@RUCPROOVEDOR,@CONTACTOPROOVEDOR,@EMPRESAPROOV,@CORREOPROOV,@DIRECCIONPROOV,@OBSERVACIONPROOV,GETDATE())')
                            
                            res.render('./CrearProveedorPage/views/Crear_proveedor',{
                                bienProve:true,
                                login:false,
                                alert:true,
                                alertTitle:"EXITOSO",
                                alertMessage: "Proveedor ingresado correctamente",
                                alertIcon:'success',
                                showConfirmButton:true,
                                timer:false,
                                ruta:'crearProveedor',
                               
                              })
        //ningun campo lleno
        }else{
            res.render('./CrearProveedorPage/views/Crear_proveedor',{
                bienProve:false,
                login:false,
                alert:true,
                alertTitle:"ERROR",
                alertMessage: "Por favor ingrese todos los datos",
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


const InsertProveedor2 = async (req, res) =>{
    try {

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
            await pool.request().input('NOMBREPROOVEDOR', sql.VarChar(50), nombreProveedor)
                            .input('RUCPROOVEDOR', sql.VarChar(15), rucProveedor)
                            .input('CONTACTOPROOVEDOR', sql.VarChar(50), contactoProveedor)
                            .input('EMPRESAPROOV', sql.VarChar(20), empresaProveedor)
                            .input('CORREOPROOV', sql.VarChar(40), correoProveedor)
                            .input('DIRECCIONPROOV', sql.VarChar(40), direccionProveedor)
                            .input('OBSERVACIONPROOV', sql.VarChar(100), observacionProveedor)
                            .query('INSERT INTO PROVEEDOR VALUES (@NOMBREPROOVEDOR,@RUCPROOVEDOR,@CONTACTOPROOVEDOR,@EMPRESAPROOV,@CORREOPROOV,@DIRECCIONPROOV,@OBSERVACIONPROOV,GETDATE())')
                            
                            res.render('./CrearProveedorPage/views/Crear_proveedor2',{
                                bienProve:true,
                                login:false,
                                alert:true,
                                alertTitle:"EXITOSO",
                                alertMessage: "Proveedor ingresado correctamente",
                                alertIcon:'success',
                                showConfirmButton:true,
                                timer:false,
                               
                              })
        //ningun campo lleno
        }else{
            res.render('./CrearProveedorPage/views/Crear_proveedor2',{
                bienProve:false,
                login:false,
                alert:true,
                alertTitle:"ERROR",
                alertMessage: "Por favor ingrese todos los datos",
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


module.exports ={
    authPageCrearProveedor,
    InsertProveedor,
    InsertProveedor2,
    authPageCrearProveedor2
}