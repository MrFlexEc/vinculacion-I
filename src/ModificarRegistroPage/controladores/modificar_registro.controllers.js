//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")

//Ver Home
const authPageModificarRegistro = async (req, res) =>{
    let IDREGISTROPara;
    if(req.session.loggedin){
        const IDREGISTROPara = req.params.id;
        console.log(IDREGISTROPara)
        const pool = await dbConnection.getConnection();
        const resultmarca2 = await pool.request().query('SELECT * FROM MARCA')
        const resultcategoria2 = await pool.request().query('SELECT * FROM CATEGORIA')
        const resultproveedor2 = await pool.request().query('SELECT * FROM PROVEEDOR')
        const resultmedida2 = await pool.request().query('SELECT * FROM MEDIDA')
        const resultRegistro = await pool.request()
                                                .input('IDRESPUESTO', sql.Int, IDREGISTROPara)
                                                .query(' select rep.MODELOREPUESTO, pre.ALMAYORPRECIO, pre.FRECUENTEPRECIO,rep.MINCANREPUESTO,rep.MAXCANREPUESTO,rep.OBSERVACIONREPUEST,rep.DESCRIPCIONREPUESTO,rep.IDRESPUESTO,rep.CODIGOREPUESTO, rep.NOMBREREPUESTO, rep.CANTIDADREPUESTO, rep.FECHAREPUESTO, mar.NOMBREMARCA, pro.NOMBREPROOVEDOR, cat.NOMBRECATEGORIA, pre.PUBLICOPRECIO from REPUESTO rep inner join PROVEEDOR pro on rep.IDPROOVEDOR = pro.IDPROOVEDOR inner join MARCA mar on rep.IDMARCA = MAR.IDMARCA inner join CATEGORIA cat on rep.IDCATEGORIA = cat.IDCATEGORIA inner join PRECIO pre on rep.IDRESPUESTO = pre.IDRESPUESTO where  rep.IDRESPUESTO=@IDRESPUESTO')
        res.render('./ModificarRegistroPage/views/modificar_registro',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            Marca2:resultmarca2.recordset,
            Categoria2:resultcategoria2.recordset,
            Proveedor2:resultproveedor2.recordset,
            Medida2:resultmedida2.recordset,
            RERE:resultRegistro.recordset[0]

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
    //console.log("prueba");
    //console.log(IDREGISTROPara);
    // Agregar IDREGISTROPara como campo adicional en req
  req.IDREGISTROPara = IDREGISTROPara;

  // Llamar a la función EditarRegistro y pasar req y res
  await EditarRegistro(req, res);
}


const EditarRegistro = async (req, res) =>{
    try {
        const IDREGISTROPara = req.IDREGISTROPara; // Obtener el valor de IDREGISTROPara desde req
        console.log("hola")
        console.log(IDREGISTROPara)
        const IDREGISTROEnvio = req.params.id;
        const IDRESPUESTO = req.body.idrepuesto;
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

                const RepuestoOriginal = await pool.request().input('IDRESPUESTO', sql.Int, IDRESPUESTO)
                                                            .query('SELECT * FROM Repuesto where IDRESPUESTO=@IDRESPUESTO');
                                                            console.log("hola")
                    
                                                            console.log(RepuestoOriginal.recordset.length)
                                                            console.log(RepuestoOriginal.recordset[0].CODIGOREPUESTO)
                    if (RepuestoOriginal.recordset.length == 0 || RepuestoOriginal.recordset[0].CODIGOREPUESTO == codigoRegistro) {

           
                                    //validad cantidad
                        if(cantidadMinimaRegistro>cantidadMaximaRegistro){
                            res.render('./ModificarRegistroPage/views/modificar_registro',{
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
                            res.render('./ModificarRegistroPage/views/modificar_registro',{
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
                            res.render('./ModificarRegistroPage/views/modificar_registro',{
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
                            await pool.request().input('IDRESPUESTO', sql.Int, IDRESPUESTO)
                            .input('IDPROOVEDOR', sql.Int, proveedorRegistro)
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
                            .query('UPDATE  REPUESTO SET IDPROOVEDOR=@IDPROOVEDOR,IDCATEGORIA=@IDCATEGORIA,IDMARCA=@IDMARCA,IDMEDIDA=@IDMEDIDA,NOMBREREPUESTO=@NOMBREREPUESTO,CODIGOREPUESTO=@CODIGOREPUESTO,DESCRIPCIONREPUESTO=@DESCRIPCIONREPUESTO,MODELOREPUESTO=@MODELOREPUESTO,MINCANREPUESTO=@MINCANREPUESTO,MAXCANREPUESTO=@MAXCANREPUESTO,OBSERVACIONREPUEST=@OBSERVACIONREPUEST where IDRESPUESTO=@IDRESPUESTO')

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
                                                                    .query('UPDATE PRECIO SET PUBLICOPRECIO=@PUBLICOPRECIO,FRECUENTEPRECIO=@FRECUENTEPRECIO,ALMAYORPRECIO=@ALMAYORPRECIO where IDRESPUESTO=@IDRESPUESTO')

                                            }                                                   
                                            res.render('./ModificarRegistroPage/views/modificar_registro',{
                                                bienRegi:true,
                                                login:false,
                                                alert:true,
                                                alertTitle:"EXITOSO",
                                                alertMessage: "Repuesto Modificado correctamente",
                                                alertIcon:'success',
                                                showConfirmButton:true,
                                                timer:false,
                                                ruta:'VerRegistros',
                                            })
                        }
          
                      
                    }else{
                        res.render('./CrearRegistroPage/views/Crear_registro',{
                            bienRegi:false,
                            login:false,
                            alert:true,
                            alertTitle:"ERROR",
                            alertMessage: "El repuesto con ese código ya existe busquelo y modifiquelo",
                            alertIcon:'error',
                            showConfirmButton:true,
                            timer:false,
                          });

                    }

        }else{

            res.render('./ModificarRegistroPage/views/modificar_registro',{
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




module.exports = {
    authPageModificarRegistro,
    EditarRegistro
}