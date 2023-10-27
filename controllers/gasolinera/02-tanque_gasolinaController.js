'use strict'
const db = require("../../models");
const Tanque_Gasolinas = db.tanque_gasolinas;
const Tipo_Gasolinas = db.tipo_gasolinas;

module.exports = {
    find(req, res){
        return Tanque_Gasolinas.findAll({
            attributes: ['id','id_tipo_gasolinas','capacidad','nivel_actual'],
            include: {
                model: Tipo_Gasolinas,
                attributes:['tipo','costo']
            }
        })
        .then(tanque_gasolinas => res.status(200).send(tanque_gasolinas))
        .catch(error => res.status(500).send(error))
    },
    create(req, res){
        let datos = req.body;
        const datos_ingresados = {
            id_tipo_gasolinas: datos.id_tipo_gasolinas,
            capacidad: datos.capacidad,
            nivel_actual: datos.nivel_actual,
            createdAt: new Date()
        };
        Tanque_Gasolinas.create(datos_ingresados)
        .then(tanque_gasolinas =>{
            res.send(tanque_gasolinas);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({error: 'Error al insetar'});
        })
    },
    update(req, res){
        let datos = req.body;
        Tanque_Gasolinas.update({
            id_tipo_gasolinas: datos.id_tipo_gasolinas,
            capacidad: datos.capacidad,
            nivel_actual: datos.nivel_actual,
            updatedAt: new Date()
        },{ where: { id: datos.id }})
        .then(tanque_gasolinas => {
            if (tanque_gasolinas[0] === 0) {
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