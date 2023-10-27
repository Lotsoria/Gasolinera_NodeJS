'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class pagos extends Model {
        static associate(models) {
            pagos.belongsTo(models.tipo_pagos, {
                foreignKey: 'id_tipo_pago'
            })
        }
    };
    pagos.init({
        id_tipo_pago: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        monto: {
            type: DataTypes.FLOAT,
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
        modelName: 'pagos',
        timestamps: false 
    });
    return pagos;
};