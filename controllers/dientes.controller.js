const controller = {};
const conexion = require('../database/db')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

var diente;
// Ruta para recibir los datos enviados desde el cliente
app.post('/datos_fractura', (req, res) => {
    // Obtener los datos enviados desde el cliente
    const datosRecibidos = req.body;
    diente = req.body;
    // Aquí puedes hacer lo que necesites con los datos recibidos,
    // por ejemplo, guardarlos en una base de datos, realizar operaciones, etc.
    console.log(datosRecibidos);
    // En este ejemplo, simplemente respondemos al cliente con un mensaje de éxito.
    res.send('Datos recibidos correctamente');
});

controller.funcion2 = (req, res) => {
    console.log(diente);
};

controller.funcion3 = (req, res) => {

}

module.exports = controller;


