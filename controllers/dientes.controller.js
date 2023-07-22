const controller = {};
const conexion = require('../database/db')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

var diente;
app.post('/odontograma', (req, res) => {
    const datosRecibidos = req.body;
    diente = req.body;
    console.log(datosRecibidos);
    res.send('Datos recibidos correctamente');
});

controller.funcion2 = (req, res) => {
    console.log(req.body);
};

controller.funcion3 = (req, res) => {

};

module.exports = controller;


