//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")

//Ver Home
const authPageInventario = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultInventario = await pool.request().query('select rep.CODIGOREPUESTO, rep.NOMBREREPUESTO, rep.CANTIDADREPUESTO, rep.FECHAREPUESTO, mar.NOMBREMARCA, pro.NOMBREPROOVEDOR, cat.NOMBRECATEGORIA, pre.PUBLICOPRECIO from REPUESTO rep inner join PROVEEDOR pro on rep.IDPROOVEDOR = pro.IDPROOVEDOR inner join MARCA mar on rep.IDMARCA = MAR.IDMARCA inner join CATEGORIA cat on rep.IDCATEGORIA = cat.IDCATEGORIA inner join PRECIO pre on rep.IDRESPUESTO = pre.IDRESPUESTO')
        res.render('./InventarioPage/views/inventario',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            resultadoInven:resultInventario.recordset
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


const EgresoRepuesto = async (req, res) =>{
    
    try {
        const egresoCodigo = req.body.egresoCodigo;
        const egresoCantidad = parseInt(req.body.egresoCantidad) ;
        const pool = await dbConnection.getConnection();
        await pool.request().input('CODIGOREPUESTO', sql.VarChar(10), egresoCodigo)
                            .input('CANTIDADREPUESTO', sql.SmallInt, egresoCantidad)
                            .query('UPDATE REPUESTO SET CANTIDADREPUESTO=CANTIDADREPUESTO-@CANTIDADREPUESTO WHERE CODIGOREPUESTO=@CODIGOREPUESTO')

                            res.render('./InventarioPage/views/inventario',{
                                login:false,
                                alert:true,
                                alertTitle:"EXITOSO",
                                alertMessage: "Accion realiza correctamente",
                                alertIcon:'success',
                                showConfirmButton:false,
                                timer:1500,
                                ruta:'inventario'
                               
                              })


        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        }) 
    }
}

module.exports = {
    authPageInventario,
    EgresoRepuesto
}