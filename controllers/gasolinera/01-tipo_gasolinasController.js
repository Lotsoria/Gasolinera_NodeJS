'use strict'
const db = require("../../models");
const Tipo_Gasolinas = db.tipo_gasolinas;

module.exports = {
    find(req, res){
        return Tipo_Gasolinas.findAll()
        .then(tipo_gasolinas => res.status(200).send(tipo_gasolinas))
        .catch(error => res.status(200).send(error))
    },
    create(req, res){
        let datos = req.body;
        const datos_ingresados ={
            tipo: datos.tipo,
            costo: datos.costo,
            createdAt: new Date()
        };
        Tipo_Gasolinas.create(datos_ingresados)
        .then(tipo_gasolinas =>{
            res.send(tipo_gasolinas);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({error: 'Error al insertar'});
        })
    },
    update(req, res) {
        let datos = req.body
        Tipo_Gasolinas.update(
            {
                tipo: datos.tipo,
                costo: datos.costo,
                updatedAt: new Date()
            },{ where: { id: datos.id }}
        )
            .then(tipo_gasolinas => {
                if (tipo_gasolinas[0] === 0) {
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
    }, 
}