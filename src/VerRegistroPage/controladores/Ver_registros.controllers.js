//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")


//Ver Home
const authPageVerRegistros = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultVerRegistro = await pool.request().query('select rep.IDRESPUESTO,rep.CODIGOREPUESTO, rep.NOMBREREPUESTO, rep.CANTIDADREPUESTO, rep.FECHAREPUESTO, mar.NOMBREMARCA, pro.NOMBREPROOVEDOR, cat.NOMBRECATEGORIA, pre.PUBLICOPRECIO from REPUESTO rep inner join PROVEEDOR pro on rep.IDPROOVEDOR = pro.IDPROOVEDOR inner join MARCA mar on rep.IDMARCA = MAR.IDMARCA inner join CATEGORIA cat on rep.IDCATEGORIA = cat.IDCATEGORIA inner join PRECIO pre on rep.IDRESPUESTO = pre.IDRESPUESTO')
        res.render('./VerRegistroPage/views/Ver_registros',{
            login:true,
            name:req.session.name,
            rol:req.session.rol,
            resultadoVR:resultVerRegistro.recordset
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


//metodo eliminar
const DeleteRegistro = async(req, res)=>{

    try {
        const idRegistro = req.params.id;
        const pool = await dbConnection.getConnection();
        await pool.request()
        .input('IDRESPUESTO', sql.Int, idRegistro)
        .query("delete from REPUESTO where IDRESPUESTO=@IDRESPUESTO")
        res.redirect('/VerRegistros'); 
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })   
    }
      
}


module.exports ={
    authPageVerRegistros,
    DeleteRegistro
}