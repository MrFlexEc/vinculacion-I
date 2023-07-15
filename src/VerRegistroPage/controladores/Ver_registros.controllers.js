//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")


//Ver registro
const authPageVerRegistros = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultVerRegistro = await pool.request().query('select usu.NOMBREUSUARIO,rep.IDRESPUESTO,rep.CODIGOREPUESTO, rep.NOMBREREPUESTO, rep.CANTIDADREPUESTO, rep.FECHAREPUESTO, mar.NOMBREMARCA, pro.NOMBREPROOVEDOR, cat.NOMBRECATEGORIA, pre.PUBLICOPRECIO from REPUESTO rep inner join MARCA mar on rep.IDMARCA = mar.IDMARCA inner join CATEGORIA cat on rep.IDCATEGORIA = cat.IDCATEGORIA inner join PRECIO pre on rep.IDRESPUESTO = pre.IDRESPUESTO inner join USUARIO_REPUESTO_PROVEEDOR ur on ur.IDRESPUESTO = pre.IDRESPUESTO inner join USUARIO usu on usu.IDUSUARIO = ur.IDUSUARIO inner join PROVEEDOR pro on ur.IDPROOVEDOR = pro.IDPROOVEDOR')
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


//metodo eliminar Registro
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