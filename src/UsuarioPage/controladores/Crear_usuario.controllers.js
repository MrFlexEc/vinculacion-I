//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")

//Ver proveedor
const authPageCrearUsuario = async (req, res) =>{
    if(req.session.loggedin){
        if(req.session.rol=="Administrador"){
            const pool = await dbConnection.getConnection();    
        const resultrol = await pool.request().query('SELECT * FROM Rol')
        res.render('./UsuarioPage/views/Crear_usuario',{
            admin:false,
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            Rol:resultrol.recordset,
        });

        }else{
            res.render('./UsuarioPage/views/Crear_usuario',{
                login:true,
                admin:true,
                alert:true,
                alertTitle:"ERROR",
                alertMessage: "Necesita ser Administrador",
                alertIcon:'error',
                showConfirmButton:true,
                timer:false,
                ruta:'home'
            });
        }
        
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




const InsertUsuario = async (req, res) =>{
    try {

        const nombreUsuario = req.body.nombreUsuario;
        const correoUsuario = req.body.correoUsuario;
        const ContraseniaUsuario = req.body.ContraseniaUsuario;
        const rolUsuario = req.body.rolUsuario;
        const pool = await dbConnection.getConnection();

        //validaciones
        //todos los campos llenos
        if(nombreUsuario && correoUsuario && 
            ContraseniaUsuario && rolUsuario){
            await pool.request().input('IDROL', sql.Int, rolUsuario)
                            .input('NOMBREUSUARIO', sql.VarChar(20), nombreUsuario)
                            .input('CORREOUSUARIO', sql.VarChar(50), correoUsuario)
                            .input('CONTRASENIAUSUARIO', sql.VarChar(50), ContraseniaUsuario)
                            .query('INSERT INTO Usuario (@IDROL,@NOMBREUSUARIO,@CORREOUSUARIO,@CONTRASENIAUSUARIO,GETDATE())')

                            res.render('./UsuarioPage/views/Crear_usuario',{
                                bienUsuario:true,
                                login:false,
                                alert:true,
                                alertTitle:"EXITOSO",
                                alertMessage: "Usuario ingresado correctamente",
                                alertIcon:'success',
                                showConfirmButton:true,
                                timer:false,
                                ruta:'crearUsuario',
                               
                              })
        //ningun campo lleno
        }else{
            res.render('./UsuarioPage/views/Crear_usuario',{
                bienUsuario:false,
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
    authPageCrearUsuario,
    InsertUsuario


}