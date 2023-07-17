const controller = {};

const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

controller.registerEstudiante = async (req, res)=>{    
    try {
        const nombres = req.body.nombres
        const apellidos = req.body.apellidos
        const edad = req.body.edad
        const sexo = req.body.sexo
        const usuario = req.body.usuario
        const contrasena = req.body.contrasena

        let passHash = await bcryptjs.hash(contrasena, 8)    
        console.log(`${nombres} ${apellidos} ${edad} ${sexo} ${usuario} ${contrasena}`)   
        conexion.query('INSERT INTO datos SET ?', {usuario:usuario, contrasena: passHash, nombres:nombres,apellidos:apellidos,edad:edad,sexo:sexo}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    }       
}

controller.loginEstudiante = async (req, res)=>{
    try {
        const usuario = req.body.usuario
        const contrasena = req.body.contrasena        

        if(!usuario || !contrasena ){
            res.render('loginEstudiante',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'authentication/login'
            })
        }else{
            conexion.query('SELECT * FROM datos WHERE usuario = ?', [usuario], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(contrasena, results[0].contrasena)) ){
                    res.render('loginEstudiante', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'authentication/login'    
                    })
                }else{
                    //inicio de sesión OK
                    const id = results[0].id_user

                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                    // const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                    // console.log("TOKEN: "+token+" para el USUARIO : "+usuario)


                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('loginEstudiante', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: 'estudiante'
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

controller.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            // console.log(decodificada)
            conexion.query('SELECT * FROM datos WHERE id_user = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                // console.log("Mostrando resultados de busqueda")
                // console.log(results[0])
                req.usuario = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/authentication/login')        
    }
}


controller.logout = (req, res) =>{
    res.clearCookie('jwt')   
    return res.redirect('../')
}

module.exports = controller;
