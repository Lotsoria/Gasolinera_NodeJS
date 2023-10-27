const { Router } = require('express');
const router = Router();

const tipo_clientesRouter = require('./01-tipo_gasolinas');
const tanque_gasolinasRouter = require('./02-tanque_gasolinas');
const clientesRouter = require('./03-clientes');
const empleadosRouter = require('./04-empleados');
const tipoPagosRouter = require('./05-tipo_pagos');
const pagosRouter = require('./06-pagos');
const ventasRouter = require('./07-ventas');


module.exports = (app) => {
    app.use('/tipo_gasolinas',tipo_clientesRouter);
    app.use('/tanque_gasolinas',tanque_gasolinasRouter);
    app.use('/clientes',clientesRouter);
    app.use('/empleados',empleadosRouter);
    app.use('/tipopagos',tipoPagosRouter);
    app.use('/pagos',pagosRouter);
    app.use('/ventas',ventasRouter);
    app.use('/', router);
};