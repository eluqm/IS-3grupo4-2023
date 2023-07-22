const conexion = require('../database/db')
const express = require('express');
const controller = require('../controllers/dientes.controller');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

router.get('/',(req,res)=>{
    res.render("odontograma");
})

var diente;
app.get('/odontograma', (req, res) => {
    const datosRecibidos = req.body;
    diente = req.body;
    console.log(datosRecibidos);
    res.send('Datos recibidos correctamente');
});

// router.get('/ruta1',controller.funcion1)
// router.get('/ruta2',controller.funcion2)
// router.get('/ruta3',controller.funcion3)
// router.post('/',controller.funcion2)

router.post('/', controller.funcion2);

// module.exports = router;

module.exports = router;
