'use strict'
const db = require("../../models");
const Empleados = db.empleados;

module.exports = {
    find(req, res){
        return Empleados.findAll()
        .then(empleados => res.status(200).send(empleados))
        .catch(error => res.status(500).send(error))
    },
    create(req, res){
        let datos = req.body;
        const datos_ingresados = {
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            cui: datos.cui,
            createdAt: new Date()
        };
        Empleados.create(datos_ingresados)
        .then(empleados =>{
            res.send(empleados);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({error: 'Error al insetar'});
        })
    },
    update(req, res){
        let datos = req.body;
        Empleados.update({
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            cui: datos.cui,
            updatedAt: new Date()
        },{ where: { id: datos.id }})
        .then(empleados => {
            if (empleados[0] === 0) {
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