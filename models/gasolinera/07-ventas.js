'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ventas extends Model {
        static associate(models) {
            ventas.belongsTo(models.tanque_gasolinas, {
                foreignKey: 'id_tanque_gasolinas'
            }),
            ventas.belongsTo(models.pagos, {
                foreignKey: 'id_pago'
            }),
            ventas.belongsTo(models.clientes, {
                foreignKey: 'id_cliente'
            }),
            ventas.belongsTo(models.empleados, {
                foreignKey: 'id_empleado'
            })
        }
    };
    ventas.init({
        id_tanque_gasolinas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_pago: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_empleado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
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
        modelName: 'ventas',
        timestamps: false 
    });
    return ventas;
};