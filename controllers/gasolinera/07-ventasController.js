'use strict'
const db = require("../../models");
const Sequelize = require('sequelize');
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");
const Ventas = db.ventas;
const Tanque_Gasolinas = db.tanque_gasolinas;
const Tipo_Gasolinas = db.tipo_gasolinas;
const Clientes = db.clientes;
const Empleados = db.empleados;
const Tipo_Pagos = db.tipo_pagos;
const Pagos = db.pagos;
module.exports = {
    find(req, res) {
        return Ventas.findAll(
            {
                attributes: ['id', 'cantidad'],
                include: [{
                    model: Tanque_Gasolinas,
                    attributes: ['id'],
                    include: {
                        model: Tipo_Gasolinas,
                        attributes: ['tipo', 'costo']
                    }
                },
                {
                    model: Pagos,
                    attributes: ['id', 'monto'],
                    include: {
                        model: Tipo_Pagos,
                        attributes: ['tipo']
                    }
                },
                {
                    model: Clientes,
                    attributes: ['nombres', 'apellidos', 'puntos']
                },
                {
                    model: Empleados,
                    attributes: ['nombres', 'apellidos']
                }]
            }
        )
            .then(ventas => res.status(200).send(ventas))
            .catch(error => res.status(500).send(error))
    },
    async find1(req, res) {
        const options = {
            'method': 'GET',
            'url': `http://localhost:8081/api/tanquegasolinas`,
            'headers': {
                'Content-Type': 'application/json'
            }
        };
        try {
            const result = await axios(options);
            const resultado = result.data;
            res.status(200).send(resultado);
        } catch (e) {
            res.status(500).send("Error con el servidor");
        }
    },
    createV1(req, res) {

    },
    createV(req, res) {
        const datos = req.body;

        Tanque_Gasolinas.findByPk(datos.id_tanque_gasolinas, {
            include: Tipo_Gasolinas
        })
            .then(tanque_gasolinas => {
                if (!tanque_gasolinas) {
                    return res.status(404).json({ error: 'Registor no encontrado (tanque)' });
                }


                const pagar = tanque_gasolinas.tipo_gasolina.costo * datos.cantidad;
                tanque_gasolinas.nivel_actual = tanque_gasolinas.nivel_actual - datos.cantidad;
                const puntosobternido = pagar / 5;
                const datos_pago = {
                    id_tipo_pago: datos.id_tipo_pago,
                    monto: pagar,
                    createdAt: new Date()

                };
                Pagos.create(datos_pago)
                    .then(pago => {
                        const datos_venta = {
                            id_tanque_gasolinas: tanque_gasolinas.id,
                            id_pago: pago.id,
                            id_cliente: datos.id_cliente,
                            id_empleado: datos.id_empleado,
                            cantidad: datos.cantidad,
                            createdAt: new Date()
                        }
                        Ventas.create(datos_venta) 
                            .then(async ventas => {
                                const options = {
                                    'method': 'PUT',
                                    'url': `http://localhost:8081/api/tanquegasolinasUpdate`,
                                    'headers': {
                                        'Content-Type': 'application/json'
                                    },
                                    data: {
                                        id: datos.id_tanque_gasolinas,
                                        id_tipo_gasolinas: tanque_gasolinas.tipo_gasolina.id,
                                        capacidad: tanque_gasolinas.capacidad,
                                        nivel_actual: tanque_gasolinas.nivel_actual,
                                        updated_at: new Date()
                                    }
                                };
                                try {
                                    const result = await axios(options);
                                    const options2 = {
                                        'method': 'PUT',
                                        'url': `http://localhost:8000/clientes/update/${datos.id_cliente}`,
                                        'headers': {
                                            'Content-Type': 'application/json'
                                        },
                                        data: {
                                            puntos: puntosobternido
                                        }
                                    };
                                    try {
                                        const result = await axios(options2);
                                        const options3 = {
                                            'method': 'POST',
                                            'url': `http://localhost:8081/api/registroCreate`, 
                                            'headers': {
                                                'Content-Type': 'application/json'
                                            },
                                            data: {
                                                id_clientes:  datos.id_cliente,
                                                id_tipo_pagos: datos.id_tipo_pago
                                            }
                                        };
                                        try {
                                            const result = await axios(options3);
                                            console.log(result.data);
                                            res.send('Utilizando la API de Springboot')
                                        } catch (e) {
                                            console.log("Error con Spring");
                                        }
                                        
                                    } catch (e) {
                                        console.log("Error con fastapi");
                                    }

                                } catch (e) {
                                    res.status(500).send("Error con el servidor");
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                return res.status(500).json({ error: 'Error al insetar venta' });
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).json({ error: 'Error al insertar detalle de pago' });
                    });

            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al consultar Tanque' });
            });
    },
    create(req, res) {
        let datos = req.body;
        const datos_ingresados = {
            id_tanque_gasolinas: datos.id_tanque_gasolinas,
            id_pago: datos.id_pago,
            id_cliente: datos.id_cliente,
            id_empleado: datos.id_empleado,
            cantidad: datos.cantidad,
            createdAt: new Date()
        };
        Ventas.create(datos_ingresados)
            .then(ventas => {
                res.send(ventas);
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al insetar' });
            })
    },
    update(req, res) {
        let datos = req.body;
        Pagos.update({
            id_tipo_pago: datos.id_tipo_pago,
            monto: datos.monto,
            updatedAt: new Date()
        }, { where: { id: datos.id } })
            .then(pagos => {
                if (pagos[0] === 0) {
                    return res.status(200).send({ error: 'No se encontró ningún registro' });
                }
                else {
                    return res.status(200).send('El registro ha sido actualizado');
                }
            })
            .catch(error => {
                console.log(error)
                return res.status(500).send({ error: 'Error al actualizar' });
            });
    }
}