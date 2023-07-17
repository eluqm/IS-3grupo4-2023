const controller = {};
const conexion = require('../database/db')
const db = require('../database/funcionesInsercion')

controller.mostrarHome = (req, res) => {
    res.render('home', { usuario: req.usuario })
};
controller.mostrarHistorialClinico = (req, res) => {
    res.render('registerHistorialClinico')
};

controller.mostrarCitaOdontologica = (req, res) => {
    res.render('registerCitaOdontologica')
};

controller.mostrarAntecedentes = (req, res) => {
    res.render('registerAntecedentes')
};


controller.registrarHistorialClinico = async (req, res) => {
    try {
        const cui = req.body.cui
        const dni = req.body.dni
        const procedencia = req.body.procedencia
        const estadoCivil = req.body.estadoCivil
        const fechaNacimiento = req.body.fechaNacimiento
        const ocupacion = req.body.ocupacion
        const domicilio = req.body.domicilio
        const correoElectronico = req.body.correoElectronico
        const facultad = req.body.facultad
        const escuela = req.body.escuela;

        try {
            const facultadQuery = new Promise((resolve, reject) => {
                conexion.query('SELECT * FROM facultad WHERE nombre = ?', [facultad], async (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results.length === 0) {
                            const insertedFacultadId = await db.insertarFacultad(facultad);
                            resolve(insertedFacultadId);
                        } else {
                            resolve(results[0].id_fac);
                        }
                    }
                });
            });

            const escuelaQuery = new Promise((resolve, reject) => {
                conexion.query('SELECT * FROM escuela_pro WHERE nombre = ?', [escuela], async (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results.length === 0) {
                            const insertedEscuelaId = await db.insertarEscuela(escuela);
                            resolve(insertedEscuelaId);
                        } else {
                            resolve(results[0].id_escuela);
                        }
                    }
                });
            });

            const [facultadId, escuelaId] = await Promise.all([facultadQuery, escuelaQuery]);
            let datos = {
                id_user: req.usuario.id_user,
                cui: cui,
                dni: dni,
                procedencia: procedencia,
                estado_civil: estadoCivil,
                fecha_nac: fechaNacimiento,
                ocupacion: ocupacion,
                domicilio: domicilio,
                correo_e: correoElectronico,
                id_fac: facultadId,
                id_escuela: escuelaId
            }
            db.insertarDatosIngreso(datos)
        } catch (error) {
            console.log(error);
        }
        
    } catch (error) {
        console.log(error)
    }
    res.redirect("/estudiante")
};

controller.registrarCitaOdontologica = async (req, res) => {
    try {   
        const ano = req.body.ano
        const condicion = req.body.condicion
        const escuela = req.body.escuela;
        const facultad = req.body.facultad

        // console.log(ano,condicion,escuela,facultad)

        try {
            const facultadQuery = new Promise((resolve, reject) => {
                conexion.query('SELECT * FROM facultad WHERE nombre = ?', [facultad], async (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results.length === 0) {
                            const insertedFacultadId = await db.insertarFacultad(facultad);
                            resolve(insertedFacultadId);
                        } else {
                            resolve(results[0].id_fac);
                        }
                    }
                });
            });

            const escuelaQuery = new Promise((resolve, reject) => {
                conexion.query('SELECT * FROM escuela_pro WHERE nombre = ?', [escuela], async (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results.length === 0) {
                            const insertedEscuelaId = await db.insertarEscuela(escuela);
                            resolve(insertedEscuelaId);
                        } else {
                            resolve(results[0].id_escuela);
                        }
                    }
                });
            });

            const [facultadId, escuelaId] = await Promise.all([facultadQuery, escuelaQuery]);
            let datos = {
                id_user: req.usuario.id_user,
                ano:ano,
                condicion:condicion,
                id_escuela: escuelaId,
                id_facultad: facultadId
            }
            db.insertarDatosCitaOdontologica(datos)
        } catch (error) {
            console.log(error);
        }
        
    } catch (error) {
        console.log(error)
    }
    res.redirect("/estudiante")
};

controller.registrarAntecedentes = async (req, res) => {
    try {   
        const alergias = req.body.alergias
        const antecedentesPatologicos = req.body.antecedentesPatologicos
        const antecedentesQuirurgicos = req.body.antecedentesQuirurgicos;
        const antecedentesFamiliares = req.body.antecedentesFamiliares
        const antecedentesGinecoObstetricos = req.body.antecedentesGinecoObstetricos
        const inmunizaciones = req.body.inmunizaciones

        // console.log(alergias,antecedentesPatologicos,antecedentesQuirurgicos,antecedentesFamiliares,antecedentesGinecoObstetricos)

        try {
            let datos = {
                algergias: alergias,
                patologicos:antecedentesPatologicos,
                quirurgicos:antecedentesQuirurgicos,
                familiares: antecedentesFamiliares,
                gineco_obstet: antecedentesGinecoObstetricos,
                inmunizaciones: inmunizaciones,
            }
            db.insertarAntecedentes(datos)
        } catch (error) {
            console.log(error);
        }
        
    } catch (error) {
        console.log(error)
    }
    res.redirect("/estudiante")
};
module.exports = controller;
