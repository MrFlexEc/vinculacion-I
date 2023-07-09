//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")


//Ver Home
const authPageDataVer = async (req, res) =>{
    if(req.session.loggedin){
        const IDREGISTRO = req.params.id;
        const pool = await dbConnection.getConnection();
        const resultmarca2 = await pool.request().query('SELECT * FROM MARCA')
        const resultcategoria2 = await pool.request().query('SELECT * FROM CATEGORIA')
        const resultproveedor2 = await pool.request().query('SELECT * FROM PROVEEDOR')
        const resultmedida2 = await pool.request().query('SELECT * FROM MEDIDA')
        const resultRegistro = await pool.request()
                                                .input('IDRESPUESTO', sql.Int, IDREGISTRO)
                                                .query(' select rep.MODELOREPUESTO, pre.ALMAYORPRECIO, pre.FRECUENTEPRECIO,rep.MINCANREPUESTO,rep.MAXCANREPUESTO,rep.OBSERVACIONREPUEST,rep.DESCRIPCIONREPUESTO,rep.IDRESPUESTO,rep.CODIGOREPUESTO, rep.NOMBREREPUESTO, rep.CANTIDADREPUESTO, rep.FECHAREPUESTO, mar.NOMBREMARCA, pro.NOMBREPROOVEDOR, cat.NOMBRECATEGORIA, pre.PUBLICOPRECIO from REPUESTO rep inner join PROVEEDOR pro on rep.IDPROOVEDOR = pro.IDPROOVEDOR inner join MARCA mar on rep.IDMARCA = MAR.IDMARCA inner join CATEGORIA cat on rep.IDCATEGORIA = cat.IDCATEGORIA inner join PRECIO pre on rep.IDRESPUESTO = pre.IDRESPUESTO where  rep.IDRESPUESTO=@IDRESPUESTO')
       
        res.render('./DataVerPage/views/DataVer',{
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
  //  res.render('./HomePage/views/Home')
}





module.exports ={
    //  data,
    authPageDataVer
}