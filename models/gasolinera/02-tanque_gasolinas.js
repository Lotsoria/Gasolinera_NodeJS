'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tanque_gasolinas extends Model {
        static associate(models) {
            tanque_gasolinas.belongsTo(models.tipo_gasolinas, {
                foreignKey: 'id_tipo_gasolinas'
            })
        }
    };
    tanque_gasolinas.init({
        id_tipo_gasolinas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capacidad: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        nivel_actual: {
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
        modelName: 'tanque_gasolinas',
        timestamps: false 
    });
    return tanque_gasolinas;
};