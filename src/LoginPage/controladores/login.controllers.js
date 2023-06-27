//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")



//Ver login ruta 
const Login = async (req, res) =>{
    res.render('./LoginPage/views/Login')
}


//validar usuario
const LoginValidacion = async (req, res) =>{
  
    try {
        const usuario = req.body.usuario;
        const contrasenia = req.body.password;
        if(usuario && contrasenia){
            const pool = await dbConnection.getConnection();
            const result = await pool.request()
                .input('NOMBRE', sql.VarChar(60), usuario)
                .input('CONTRASENIA', sql.VarChar(30), contrasenia)
                .query("select u.IDUSUARIO,u.NOMBREUSUARIO,u.CONTRASENIAUSUARIO,r.NOMBREROL from Usuario u inner join Rol r on u.IDROL = r.IDROL where NOMBREUSUARIO =@NOMBRE")
                if(result.recordset.length==0 || !(contrasenia == result.recordset[0].CONTRASENIAUSUARIO)){
                      res.render('./LoginPage/views/Login',{
                        alert:true,
                        alertTitle:"ERROR",
                        alertMessage: "Usuario y/o contraseña incorrecta",
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer:false,
                        ruta:'login'
                      })
                       
                }else{
                    req.session.loggedin=true;
                    req.session.name = result.recordset[0].NOMBREUSUARIO;
                    req.session.rol = result.recordset[0].NOMBREROL;
                    req.session.idUsuario = result.recordset[0].IDUSUARIO;
                    console.log( req.session.name)
                    console.log( req.session.rol)
                    res.render('./LoginPage/views/Login',{
                        alert:true,
                        alertTitle:"INICIO DE SESION",
                        alertMessage: "¡Inicio de Sesion Exitoso!",
                        alertIcon:'success',
                        showConfirmButton:false,
                        timer:1500,
                        ruta:'home'
                      })
                }
        }
        else{
            res.render('./LoginPage/views/Login',{
                alert:true,
                alertTitle:"ADVERTENCIA",
                alertMessage: "Por favor ingrese un usuario y/o contraseña",
                alertIcon:'warning',
                showConfirmButton:true,
                timer:false,
                ruta:'login'
              })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message: error.message
        }) 
    }
}

const destroysession = async (req, res) =>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}

//Autenticar paginas
/*
const authPages = async (req, res) =>{
    if(req.session.loggedin){
        res.render('./LoginPage/views/ejemplo',{
            login:true,
            name:req.session.name
        });
    }else{
        res.render('./LoginPage/views/ejemplo',{
            login:false,
            name:"Debe iniciar sesion"
        });
    }
}*/






module.exports ={
    Login,
    LoginValidacion,
    destroysession
}