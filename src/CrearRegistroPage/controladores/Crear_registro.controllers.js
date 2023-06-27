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
        const resultubicacion = await pool.request().query('SELECT * FROM UBICACION')

        res.render('./CrearRegistroPage/views/Crear_registro',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            Marca:resultmarca.recordset ,
            Categoria:resultcategoria.recordset,
            Proveedor:resultproveedor.recordset,
            Medida:resultmedida.recordset,
            Ubicacion:resultubicacion.recordset
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
        const ubicacionRegistro = req.body.ubicacionRegistro;
        const marcaRegistro = req.body.marcaRegistro;
        const categoriaRegistro = req.body.categoriaRegistro;
        const proveedorRegistro = req.body.proveedorRegistro;
        const medidaRegistro = req.body.medidaRegistro;
        const modeloRegistro = req.body.modeloRegistro;
        const observacionRegistro = req.body.observacionRegistro;
        const preciopublicoRegistro = req.body.preciopublicoRegistro;
        const precioalmayorRegistro = req.body.precioalmayorRegistro;
        const preciofrecuenteRegistro = req.body.preciofrecuenteRegistro;
        const cantidadRegistro = req.body.cantidadRegistro;
        const cantidadMaximaRegistro = req.body.cantidadMaximaRegistro;
        const cantidadMinimaRegistro = req.body.cantidadMinimaRegistro;
        //console.log(marcaRegistro)
        //console.log(proveedorRegistro)
        //console.log(categoriaRegistro)
        const pool = await dbConnection.getConnection();
        await pool.request().input('IDPROOVEDOR', sql.Int, proveedorRegistro)
                            .input('IDUBICACION', sql.Int, ubicacionRegistro)
                            .input('IDCATEGORIA', sql.Int, categoriaRegistro)
                            .input('IDMARCA', sql.Int, marcaRegistro)
                            .input('IDMEDIDA', sql.Int, medidaRegistro)
                            .input('NOMBREREPUESTO', sql.VarChar(20), nombreRegistro)
                            .input('CODIGOREPUESTO', sql.VarChar(10), codigoRegistro)
                            .input('DESCRIPCIONREPUESTO', sql.VarChar(50), descripcionRegistro)
                            .input('MODELOREPUESTO', sql.VarChar(30), modeloRegistro)
                            .input('MINCANREPUESTO', sql.SmallInt, cantidadMinimaRegistro)
                            .input('MAXCANREPUESTO', sql.SmallInt, cantidadMaximaRegistro)
                            .input('CANTIDADREPUESTO', sql.SmallInt, cantidadRegistro)
                            .input('OBSERVACIONREPUEST', sql.VarChar(50), observacionRegistro)
                            .query('INSERT INTO REPUESTO VALUES (@IDPROOVEDOR,@IDUBICACION,@IDCATEGORIA,@IDMARCA,@IDMEDIDA,@NOMBREREPUESTO,@CODIGOREPUESTO,@DESCRIPCIONREPUESTO,@MODELOREPUESTO,@MINCANREPUESTO,@MAXCANREPUESTO,@CANTIDADREPUESTO,@OBSERVACIONREPUEST,GETDATE())')

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
                                login:false,
                                alert:true,
                                alertTitle:"EXITOSO",
                                alertMessage: "Repuesto ingresado correctamente",
                                alertIcon:'success',
                                showConfirmButton:true,
                                timer:false,
                                ruta:'crearRegistro',
                               
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