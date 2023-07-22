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
// Ruta para recibir los datos enviados desde el cliente
app.get('/odontograma', (req, res) => {
    // Obtener los datos enviados desde el cliente
    const datosRecibidos = req.body;
    diente = req.body;
    // Aquí puedes hacer lo que necesites con los datos recibidos,
    // por ejemplo, guardarlos en una base de datos, realizar operaciones, etc.
    console.log(datosRecibidos);
    // En este ejemplo, simplemente respondemos al cliente con un mensaje de éxito.
    res.send('Datos recibidos correctamente');
});

// router.get('/ruta1',controller.funcion1)
// router.get('/ruta2',controller.funcion2)
// router.get('/ruta3',controller.funcion3)
// router.post('/',controller.funcion2)

router.post('/', controller.funcion2);

// module.exports = router;

module.exports = router;
