'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tipo_pagos extends Model {
        static associate(models) {
            tipo_pagos.hasMany(models.pagos, {
                foreignKey: 'id_tipo_pago',
                onDelete: 'cascade'
            })
        }
    };
    tipo_pagos.init({
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
        },
        updatedAt:{
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at' 
        }
    }, {
        sequelize,
        modelName: 'tipo_pagos',
        timestamps: false 
    });
    return tipo_pagos;
};