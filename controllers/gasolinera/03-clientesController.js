'use strict'
const axios = require('axios')
const db = require("../../models");
const Clientes = db.clientes;
module.exports = {
    find(req, res) {
        return Clientes.findAll()
            .then(clientes => res.status(200).send(clientes))
            .catch(error => res.status(500).send(error))
    },
    create(req, res) {
        let datos = req.body;
        const datos_ingresados = {
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            cui: datos.cui,
            puntos: 0,
            createdAt: new Date()
        };
        Clientes.create(datos_ingresados)
            .then(clientes => {
                res.send(clientes);
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al insetar' });
            })
    },
    update1(req, res) {
        let datos = req.body;
        Clientes.update({
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            puntos: datos.puntos,
            cui: datos.cui,
            updatedAt: new Date()
        }, { where: { id: datos.id } })
            .then(tanque_gasolinas => {
                if (tanque_gasolinas[0] === 0) {
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
    },
    async update(req, res) {
        let datos = req.body;
        const options = {
            'method': 'PUT',
            'url': `http://localhost:8000/clientes/update/${datos.id}`,
            'headers': {
                'Content-Type': 'application/json'
            },
            data: {
                puntos: datos.puntos
            }
        };

        try {
            const result = await axios(options);
            console.log(result.data);
            res.send(result.data + 'Utilizando la API de clientes')
        } catch (e) {
            console.log(e);
        }
    }
}