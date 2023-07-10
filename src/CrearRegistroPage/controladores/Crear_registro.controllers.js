//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")


//Ver Interfaz para agregar registro
const authPageCrearRegistro = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultmarca = await pool.request().query('SELECT * FROM MARCA')
        const resultcategoria = await pool.request().query('SELECT * FROM CATEGORIA')
        const resultproveedor = await pool.request().query('SELECT * FROM PROVEEDOR')
        const resultmedida = await pool.request().query('SELECT * FROM MEDIDA')

        res.render('./CrearRegistroPage/views/Crear_registro',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            Marca:resultmarca.recordset,
            Categoria:resultcategoria.recordset,
            Proveedor:resultproveedor.recordset,
            Medida:resultmedida.recordset,
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
        const preciopublicoRegistro = req.body.preciopublicoRegistro;
        const precioalmayorRegistro = req.body.precioalmayorRegistro;
        const preciofrecuenteRegistro = req.body.preciofrecuenteRegistro;
        const cantidadMaximaRegistro = parseInt(req.body.cantidadMaximaRegistro);
        const cantidadMinimaRegistro = parseInt(req.body.cantidadMinimaRegistro) ;
        const pool = await dbConnection.getConnection();
        
        if(codigoRegistro && nombreRegistro && descripcionRegistro 
            &&marcaRegistro&&categoriaRegistro &&proveedorRegistro&& medidaRegistro
            &&modeloRegistro && observacionRegistro && preciopublicoRegistro && precioalmayorRegistro
            && preciofrecuenteRegistro && cantidadMaximaRegistro && cantidadMinimaRegistro ){


                const resultREPUESTO = await pool.request().query('SELECT * FROM Repuesto')
                const codigosExistentes = resultREPUESTO.recordset.map((repuesto) => repuesto.CODIGOREPUESTO);
                console.log(codigosExistentes)
                if (codigosExistentes.includes(codigoRegistro)){
                    res.render('./CrearRegistroPage/views/Crear_registro',{
                        bienRegi:false,
                        login:false,
                        alert:true,
                        alertTitle:"ERROR",
                        alertMessage: "EL repuesto con ese codigo ya existe",
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer:false,
                    })

                }else{
                    //validad cantidad
                    if(cantidadMinimaRegistro>cantidadMaximaRegistro){
                        res.render('./CrearRegistroPage/views/Crear_registro',{
                            bienRegi:false,
                            login:false,
                            alert:true,
                            alertTitle:"ERROR",
                            alertMessage: "La cantidad miníma no puede ser mayor a la cantidad Máxima",
                            alertIcon:'error',
                            showConfirmButton:true,
                            timer:false,
                        })
                    }
                    if(cantidadMinimaRegistro==cantidadMaximaRegistro){
                        res.render('./CrearRegistroPage/views/Crear_registro',{
                            bienRegi:false,
                            login:false,
                            alert:true,
                            alertTitle:"ERROR",
                            alertMessage: "La cantidades no pueden ser iguales",
                            alertIcon:'error',
                            showConfirmButton:true,
                            timer:false,
                        })
                    }
                    if(cantidadMaximaRegistro<cantidadMinimaRegistro){
                        res.render('./CrearRegistroPage/views/Crear_registro',{
                            bienRegi:false,
                            login:false,
                            alert:true,
                            alertTitle:"ERROR",
                            alertMessage: "La cantidad máxima no puede ser menor a la cantidad Mínima",
                            alertIcon:'error',
                            showConfirmButton:true,
                            timer:false,
                        })
                    }
                    if(cantidadMinimaRegistro<cantidadMaximaRegistro && cantidadMaximaRegistro>=cantidadMinimaRegistro){
                        await pool.request().input('IDPROOVEDOR', sql.Int, proveedorRegistro)
                        .input('IDCATEGORIA', sql.Int, categoriaRegistro)
                        .input('IDMARCA', sql.Int, marcaRegistro)
                        .input('IDMEDIDA', sql.Int, medidaRegistro)
                        .input('NOMBREREPUESTO', sql.VarChar(20), nombreRegistro)
                        .input('CODIGOREPUESTO', sql.VarChar(10), codigoRegistro)
                        .input('DESCRIPCIONREPUESTO', sql.VarChar(50), descripcionRegistro)
                        .input('MODELOREPUESTO', sql.VarChar(30), modeloRegistro)
                        .input('MINCANREPUESTO', sql.SmallInt, cantidadMinimaRegistro)
                        .input('MAXCANREPUESTO', sql.SmallInt, cantidadMaximaRegistro)
                        .input('OBSERVACIONREPUEST', sql.VarChar(50), observacionRegistro)
                        .query('INSERT INTO REPUESTO VALUES (@IDPROOVEDOR,@IDCATEGORIA,@IDMARCA,@IDMEDIDA,@NOMBREREPUESTO,@CODIGOREPUESTO,@DESCRIPCIONREPUESTO,@MODELOREPUESTO,@MINCANREPUESTO,@MAXCANREPUESTO,0,@OBSERVACIONREPUEST,GETDATE())')

                        const resultPrecio = await pool.request()
                                        .input('CODIGOREPUESTO', sql.VarChar(10), codigoRegistro)
                                        .query("SELECT * FROM REPUESTO WHERE CODIGOREPUESTO = @CODIGOREPUESTO")
                                        if(codigoRegistro==resultPrecio.recordset[0].CODIGOREPUESTO){
                                            const id_repuesto = resultPrecio.recordset[0].IDRESPUESTO
                                            const id_usuario = req.session.idUsuario
                                            await pool.request().input('IDRESPUESTO', sql.Int, id_repuesto)
                                                                .input('PUBLICOPRECIO', sql.Int, preciopublicoRegistro)
                                                                .input('FRECUENTEPRECIO', sql.Int, preciofrecuenteRegistro)
                                                                .input('ALMAYORPRECIO', sql.Int, precioalmayorRegistro)
                                                                .query('INSERT INTO PRECIO VALUES (@IDRESPUESTO,@PUBLICOPRECIO,@FRECUENTEPRECIO,@ALMAYORPRECIO)')
                                    
                                            await pool.request().input('IDUSUARIO', sql.Int, id_usuario)
                                                                .input('IDRESPUESTO', sql.Int, id_repuesto)
                                                                .query('INSERT INTO USUARIO_REPUESTO VALUES (@IDUSUARIO,@IDRESPUESTO)')
                                        }                                                   
                                        res.render('./CrearRegistroPage/views/Crear_registro',{
                                            bienRegi:true,
                                            login:false,
                                            alert:true,
                                            alertTitle:"EXITOSO",
                                            alertMessage: "Repuesto ingresado correctamente",
                                            alertIcon:'success',
                                            showConfirmButton:true,
                                            timer:false,
                                            ruta:'crearRegistro',
                                        })
                    }
                    
                        }


        }else{

            res.render('./CrearRegistroPage/views/Crear_registro',{
                bienRegi:false,
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
    authPageCrearRegistro,
    InsertRegistro

}