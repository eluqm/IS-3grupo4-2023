const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config({ path: './env/.env'});

const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
})
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER,);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_DATABASE);

conexion.connect( (error)=> {
    if(error){
        console.log('El error de conexión es: '+error)
        return
    }
    console.log('¡Conectado a la base de datos MySQL!')
})

module.exports = conexion