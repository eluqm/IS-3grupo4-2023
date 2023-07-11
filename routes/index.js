const express = require('express');

const authenticationRouter = require('./authentication.router.js')
const estudianteRouter = require('./estudiante.router.js');
// const rutas3 = require('./rutas3.router.js');
// const rutas4 = require('./rutas4.router.js');

function routerApi(app) {
  const router = express.Router();
  app.use('', router);
  router.use('/authentication',authenticationRouter)  
  router.use('/estudiante', estudianteRouter);
  // router.use('/products', rutas4);
  // router.use('/users', rutas3);
}
module.exports = routerApi;
