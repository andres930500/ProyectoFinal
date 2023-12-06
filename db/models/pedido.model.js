const { Model, DataTypes } = require("sequelize");

const PEDIDO_TABLE = "pedidos";

const pedidoSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    productos: {
        type: DataTypes.JSON,
        allowNull: false,
    },
};


class PedidoModel extends Model {
    static associate(models) {
        // Define asociaciones si es necesario
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: "Pedido",
            tableName: PEDIDO_TABLE,
            timestamps: false,
        };
    }
}

module.exports = { PedidoModel, pedidoSchema, PEDIDO_TABLE };
