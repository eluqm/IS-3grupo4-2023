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

controller.estadoDiente = (req, res) => {
    if(req.body.seleccion == 'fractura' || req.body.seleccion == 'restauracion')
    {
        var estado = req.body.seleccion;
        // // if(req.body.color == 'red')
        // //     estado = 'fractura';
        // // else if(req.body.color == 'blue')
        // //     estado = 'restauracion';
        var seccion = 'seccion' + req.body.seccion;
        var sql = 'UPDATE dientes SET ' + seccion +' = ? WHERE id_diente= ?';
        conexion.query(sql, [req.body.tipo, req.body.diente], async (error, results)=>{
            if(error) console.log(error);
            console.log("insertado", estado);
            // console.log(req.body.color);
            console.log(req.body.diente);
            console.log(req.body.seccion);
        });
    }
    else if(req.body.seleccion == 'extraccion')
    {
        var sql = 'UPDATE dientes SET extraccion = 1 WHERE id_diente= ?';
        conexion.query(sql, req.body.diente, async (error, results) => {
            if(error) console.log(error);
            console.log("insertado", req.body.seleccion);
            console.log(req.body.diente);
        });
    }
    else if(req.body.seleccion == 'borrar')
    {
        if(req.body.tipo == 'seccion')
        {
            var seccion = 'seccion' + req.body.seccion_b;
            var sql = 'UPDATE dientes SET ' + seccion + ' = ? WHERE id_diente = ?';
            var sano = 'sano';
            conexion.query(sql, [sano, req.body.diente], async (error, results)=>{
                if(error) console.log(error);
                console.log("insertado", req.body.seleccion, req.body.tipo);
                console.log(req.body.diente);
                console.log(req.body.seccion_b);
            });
        }
        else if(req.body.tipo == 'extraccion')
        {
            var sql = 'UPDATE dientes SET extraccion = 0 WHERE id_diente = ?';
            conexion.query(sql, req.body.diente, async(error, results)=>{
                if(error) console.log(error);
                console.log("insertado", req.body.seleccion, req.body.tipo);
                console.log(req.body.diente);
            });
        }
    }
};

controller.funcion3 = (req, res) => {

};

module.exports = controller;


