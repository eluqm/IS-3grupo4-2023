const express = require("express");
const controller = require("../controllers/authentication.controller.js");

const router = express.Router();

router.get("/login", (req, res)=>{
    res.render('login', {alert:false})
})

router.get("/loginEstudiante", (req, res)=>{
    res.render('loginEstudiante', {alert:false})
})

router.get("/loginMedico", (req, res)=>{
    res.render('loginMedico', {alert:false})
})

router.get('/register', (req, res)=>{
    res.render('registerStudent')
})

//router para los métodos del controller
// router.post('/registerEstudiante', (req, res)=>{
//     console.log("Registrando Estudiante")

//     res.render('index')
// })

// router.post("/loginEstudiante", (req, res)=>{
//     console.log("Loguenado Estudiante")
//     res.render('index')
// })

// router.post("/loginMedico", (req, res)=>{
//     console.log("Logueando Medico")
//     res.render('index')
// })
router.post('/registerEstudiante', controller.registerEstudiante)
router.post('/loginEstudiante', controller.loginEstudiante)
// router.post('/loginMedico', controller.loginMedico)

router.get('/logout', controller.logout)

module.exports = router;
