
const db = {}

const conexion = require('./db')

db.insertarFacultad = (nombreFacultad) => {
    try {
        conexion.query('INSERT INTO facultad SET ?', {nombre: nombreFacultad}, async (error, results)=>{
            if(error) console.log(error)

            return results.insertId;
        })
    } catch (error) {
        console.log(error)
    }
}

db.insertarEscuela = (nombreEscuela) => {
    try {
        conexion.query('INSERT INTO escuela_pro SET ?', {nombre: nombreEscuela}, async (error, results)=>{
            if(error) console.log(error)
            //console.log(results);
            return results.id_escuela;
        })
    } catch (error) {
        console.log(error)
    }
}

db.insertarDatosIngreso = (datos) => {
    try {
        conexion.query('INSERT INTO datos_ingreso SET ?', datos, async (error, results)=>{
            if(error) console.log(error)

            // console.log(results);
        })
    } catch (error) {
        console.log(error)
    }
}

db.insertarDatosCitaOdontologica = (datos) => {
    try {
        conexion.query('INSERT INTO datos_odonto SET ?', datos, async (error, results)=>{
            if(error) console.log(error)

            // console.log(results);
        })
    } catch (error) {
        console.log(error)
    }
}

db.insertarAntecedentes = (datos) => {
    try {
        conexion.query('INSERT INTO antecedentes SET ?', datos, async (error, results)=>{
            if(error) console.log(error)
            // console.log(results);
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;