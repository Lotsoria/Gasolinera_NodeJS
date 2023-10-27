'use strict'
const db = require("../../models");
const Pagos = db.pagos;

module.exports = {
    find(req, res){
        return Pagos.findAll()
        .then(tipo_pagos => res.status(200).send(tipo_pagos))
        .catch(error => res.status(500).send(error))
    },
    create(req, res){
        let datos = req.body;
        const datos_ingresados = {
            id_tipo_pago: datos.id_tipo_pago,
            monto: datos.monto,
            createdAt: new Date()
        };
        Pagos.create(datos_ingresados)
        .then(pagos =>{
            res.send(pagos);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({error: 'Error al insetar'});
        })
    },
    update(req, res){
        let datos = req.body;
        Pagos.update({
            id_tipo_pago: datos.id_tipo_pago,
            monto: datos.monto,
            updatedAt: new Date()
        },{ where: { id: datos.id }})
        .then(pagos => {
            if (pagos[0] === 0) {
                return res.status(200).send({error: 'No se encontró ningún registro'});
            }
            else{
                return res.status(200).send('El registro ha sido actualizado');
            }
        })
        .catch(error => {
            console.log(error)
            return res.status(500).send({ error: 'Error al actualizar' });
        });
    }
}