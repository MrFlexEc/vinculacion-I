const e = require("express");
const sql = require("mssql")


//datos para la conexion
const dbSettings = {
    user:'sqlserver',
    password:'jajasalu2',
    server:'34.133.83.115',
    database:"VinculacionFinal",
    //database:"Vinculacion2",
    port:1433,

    /*
    user:'pruebaNode',
    password:'jajasalu2',
    server:'localhost',
    database:"Vinculacion2",
    port:1433,
    */
    options:{
        encrypt: true,
        trustServerCertificate: true,
    }

};

//proceso de conexion
    async function getConnection(){

    try {
        const pool = await sql.connect(dbSettings)
        console.log('Conectado a la base de datos')
        return pool  
    } catch (error) {
        console.error('problemas en la conexion')
    }   
}

//llamar a la funcion para que se ejecute
module.exports= {
    getConnection: getConnection
}

//module.exports = dbSettings
