//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")

//Ver Inventario
const authPageInventario = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultInventario = await pool.request().query('select rep.IDRESPUESTO,rep.CODIGOREPUESTO, rep.NOMBREREPUESTO, rep.CANTIDADREPUESTO, rep.MINCANREPUESTO,rep.MAXCANREPUESTO,  rep.FECHAREPUESTO, mar.NOMBREMARCA, cat.NOMBRECATEGORIA, pre.PUBLICOPRECIO from REPUESTO rep inner join MARCA mar on rep.IDMARCA = MAR.IDMARCA inner join CATEGORIA cat on rep.IDCATEGORIA = cat.IDCATEGORIA inner join PRECIO pre on rep.IDRESPUESTO = pre.IDRESPUESTO')
        const resulrepuesto = await pool.request().query('SELECT * FROM Repuesto')
        const resultproveedor = await pool.request().query('SELECT * FROM PROVEEDOR')
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

        res.render('./InventarioPage/views/inventario',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            resultadoInven:resultInventario.recordset,
            Repuesto:resulrepuesto.recordset,
            Proveedor:resultproveedor.recordset,
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
  
}


const EgresoRepuestoIngreso = async (req, res) =>{
    
    try {

        // Obtiene el valor del campo datetime-local del formulario
    const fecha = req.body.fechaudiInventario;



    let fechaFormateada;
    if (fecha) {
      // Formatea la fecha en el formato esperado por SQL Server (YYYY-MM-DDTHH:MM)
      fechaFormateada = fecha.replace('T', ' ');
    } else {
      // Asigna null si no se seleccionó ninguna fecha
      fechaFormateada = null;
    }



       
        const accionInventario = req.body.accionInventario;
        const codigoInventario = req.body.codigoInventario;
        const fechaudiInventario = fechaFormateada;
        const proveedorInventario = req.body.proveedorInventario;
        const cantidadInventario = parseInt(req.body.cantidadInventario) ;



        if(accionInventario&&codigoInventario &&cantidadInventario){
            const pool = await dbConnection.getConnection();

            if(accionInventario=="Egreso"){
               

                const EgresoRepuesto = await pool.request().input('CODIGOREPUESTO', sql.VarChar(20), codigoInventario)
                                                            .query('SELECT * FROM REPUESTO WHERE IDRESPUESTO=@CODIGOREPUESTO')
                const cantidad=EgresoRepuesto.recordset[0].CANTIDADREPUESTO;  
                console.log(cantidad)                                        
                if(cantidadInventario >cantidad ){
                    res.render('./InventarioPage/views/inventario',{
                        InventarioEY:false,
                        login:false,
                        alert:true,
                        alertTitle:"ERROR",
                        alertMessage: "La cantidad ingresada es mayor a la cantidad existente",
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer:false,
                      })

                  
                }else{      
                    
                    
                const id_usuario = req.session.idUsuario
                await pool.request().input('CODIGOREPUESTO', sql.VarChar(20), codigoInventario)
                                    .input('CANTIDADREPUESTO', sql.SmallInt, cantidadInventario)
                                     .query('UPDATE REPUESTO SET CANTIDADREPUESTO=CANTIDADREPUESTO-@CANTIDADREPUESTO WHERE IDRESPUESTO=@CODIGOREPUESTO')

                await pool.request().input('IDUSUARIO', sql.Int, id_usuario)
                                    .input('IDRESPUESTO', sql.Int, codigoInventario)
                                    .input('CANTIDADEGRESOREPUESTO', sql.Int, cantidadInventario)
                                    .input('FECHAUDIEGRESOREPUESTO', sql.DateTime, fechaudiInventario)
                                    .query('INSERT INTO EGRESO_REPUESTO VALUES (@IDRESPUESTO,@IDUSUARIO,@CANTIDADEGRESOREPUESTO,GETDATE(),@FECHAUDIEGRESOREPUESTO)')

                res.render('./InventarioPage/views/inventario',{
                    InventarioEY:true,
                    login:false,
                    alert:true,
                    alertTitle:"EXITOSO",
                    alertMessage: "Egreso realizado correctamente",
                    alertIcon:'success',
                    showConfirmButton:false,
                    timer:1500,
                    ruta:'inventario' 
                  })
                }
            }
           
            if(accionInventario=="Ingreso"){
               
                const IngresoRepuesto = await pool.request().input('CODIGOREPUESTO', sql.VarChar(20), codigoInventario)
                                                            .query('SELECT * FROM REPUESTO WHERE IDRESPUESTO=@CODIGOREPUESTO')
                const maxcantidad=IngresoRepuesto.recordset[0].MAXCANREPUESTO; 
                const cantidad=IngresoRepuesto.recordset[0].CANTIDADREPUESTO;  
                const cantidadtotal= cantidadInventario+cantidad;
                console.log(cantidadtotal)      
                console.log(maxcantidad)                                     
                if(cantidadtotal >maxcantidad ){
                    res.render('./InventarioPage/views/inventario',{
                        InventarioEY:false,
                        login:false,
                        alert:true,
                        alertTitle:"ERROR",
                        alertMessage: "La cantidad ingresada sobrepasara la cantidad maxima permitida",
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer:false,
                      })

                  
                }else{      
                    
                
                const id_usuario = req.session.idUsuario
                await pool.request().input('CODIGOREPUESTO', sql.VarChar(20), codigoInventario)
                                    .input('CANTIDADREPUESTO', sql.SmallInt, cantidadInventario)
                                     .query('UPDATE REPUESTO SET CANTIDADREPUESTO=CANTIDADREPUESTO+@CANTIDADREPUESTO WHERE IDRESPUESTO=@CODIGOREPUESTO')

                await pool.request().input('IDUSUARIO', sql.Int, id_usuario)
                                    .input('IDRESPUESTO', sql.Int, codigoInventario)
                                    .input('IDPROOVEDOR', sql.Int, proveedorInventario)
                                    .input('CANTIDAINGRESODREPUESTO', sql.Int, cantidadInventario)
                                    .input('FECHAAUDIINGRESOREPUESTO', sql.DateTime, fechaudiInventario)
                                    .query('INSERT INTO INGRESO_REPUESTO VALUES (@IDRESPUESTO,@IDUSUARIO,@IDPROOVEDOR,@CANTIDAINGRESODREPUESTO,GETDATE(),@FECHAAUDIINGRESOREPUESTO)')

                res.render('./InventarioPage/views/inventario',{
                    InventarioEY:true,
                    login:false,
                    alert:true,
                    alertTitle:"EXITOSO",
                    alertMessage: "Ingreso realizado correctamente",
                    alertIcon:'success',
                    showConfirmButton:false,
                    timer:1500,
                    ruta:'inventario' 
                  })
                }
                
    
            }

        }else{
            res.render('./InventarioPage/views/inventario',{
                InventarioEY:false,
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
    authPageInventario,
    EgresoRepuestoIngreso
}