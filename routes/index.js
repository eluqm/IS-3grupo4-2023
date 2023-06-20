const express = require('express');

const rutas4 = require('./rutas4.router.js');
const rutas3 = require('./rutas3.router.js');
const rutas2 = require('./rutas2.router.js');
const rutas1 = require('./rutas1.router.js')

function routerApi(app) {
  const router = express.Router();
  app.use('', router);
  router.use('/authentication',rutas1)
  router.use('/products', rutas4);
  router.use('/users', rutas3);
  router.use('/sales', rutas2);
}

module.exports = routerApi;
