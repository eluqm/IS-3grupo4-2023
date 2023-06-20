const express = require('express');
const controller = require('../controllers/controller3.controller.js');

const router = express.Router();

router.get('/ruta1',controller.funcion1)
router.get('/ruta2',controller.funcion2)
router.get('/ruta3',controller.funcion3)
router.post('/ruta1',controller.funcion4)

module.exports = router;
