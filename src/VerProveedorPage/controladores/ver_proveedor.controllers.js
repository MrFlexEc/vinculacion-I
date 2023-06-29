//invocar la conexion
const dbConnection = require('../../Database/database')
const sql = require("mssql")

//Ver Home
const authPageVerProveedor = async (req, res) =>{
    if(req.session.loggedin){
        const pool = await dbConnection.getConnection();
        const resultVerRegistro = await pool.request().query('select rep.CODIGOREPUESTO, rep.NOMBREREPUESTO, rep.CANTIDADREPUESTO, rep.FECHAREPUESTO, mar.NOMBREMARCA, pro.NOMBREPROOVEDOR, cat.NOMBRECATEGORIA, pre.PUBLICOPRECIO from REPUESTO rep inner join PROVEEDOR pro on rep.IDPROOVEDOR = pro.IDPROOVEDOR inner join MARCA mar on rep.IDMARCA = MAR.IDMARCA inner join CATEGORIA cat on rep.IDCATEGORIA = cat.IDCATEGORIA inner join PRECIO pre on rep.IDRESPUESTO = pre.IDRESPUESTO')
        res.render('./VerProveedorPage/views/ver_proveedores',{
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
  //  res.render('./HomePage/views/Home')
}

module.exports = {
    authPageVerProveedor
}