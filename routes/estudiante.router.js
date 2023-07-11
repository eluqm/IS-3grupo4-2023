const express = require('express');
const controller = require('../controllers/estudiante.controller.js');
const authController = require('../controllers/authentication.controller.js');

const router = express.Router();

router.get('/', authController.isAuthenticated,controller.mostrarHome)
// router.get('/ruta2',controller.funcion2)
// router.get('/ruta3',controller.funcion3)
// router.post('/ruta1',controller.funcion4)

module.exports = router;
