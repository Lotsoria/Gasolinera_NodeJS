'use strict'
const db = require("../../models");
const Tipo_Pagos = db.tipo_pagos;

module.exports = {
    find(req, res){
        return Tipo_Pagos.findAll()
        .then(tipo_pagos => res.status(200).send(tipo_pagos))
        .catch(error => res.status(500).send(error))
    },
    create(req, res){
        let datos = req.body;
        const datos_ingresados = {
            tipo: datos.tipo,
            createdAt: new Date()
        };
        Tipo_Pagos.create(datos_ingresados)
        .then(tipo_pagos =>{
            res.send(tipo_pagos);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({error: 'Error al insetar'});
        })
    },
    update(req, res){
        let datos = req.body;
        Tipo_Pagos.update({
            tipo: datos.tipo,
            updatedAt: new Date()
        },{ where: { id: datos.id }})
        .then(tipo_pagos => {
            if (tipo_pagos[0] === 0) {
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