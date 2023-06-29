const e = require("express");
const sql = require("mssql")


//datos para la conexion
const dbSettings = {
    user:'pruebaNode',
    password:'jajasalu2',
    server:'localhost',
    database:"ejemplo",
    port:1433,
    
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
