'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tipo_gasolinas extends Model {
        static associate(models) {
            tipo_gasolinas.hasMany(models.tanque_gasolinas, {
                foreignKey: 'id_tipo_gasolinas',
                onDelete: 'cascade'
            })
        }
    };
    tipo_gasolinas.init({
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        costo: {
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
        modelName: 'tipo_gasolinas',
        timestamps: false 
    });
    return tipo_gasolinas;
};