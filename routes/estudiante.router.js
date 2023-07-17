const express = require('express');
const controller = require('../controllers/estudiante.controller.js');
const authController = require('../controllers/authentication.controller.js');

const router = express.Router();

router.get('/', authController.isAuthenticated,controller.mostrarHome)
router.get('/registrarHistorialClinico', authController.isAuthenticated,controller.mostrarHistorialClinico)
router.get('/registrarCitaOdontologica', authController.isAuthenticated,controller.mostrarCitaOdontologica)
router.get('/registrarAntecedentes', authController.isAuthenticated,controller.mostrarAntecedentes)

router.post('/registrarHistorialClinico',authController.isAuthenticated,controller.registrarHistorialClinico)
router.post('/registrarCitaOdontologica', authController.isAuthenticated,controller.registrarCitaOdontologica)
router.post('/registrarAntecedentes', authController.isAuthenticated,controller.registrarAntecedentes)

// router.get('/ruta3',controller.funcion3)
// router.post('/ruta1',controller.funcion4)

module.exports = router;
