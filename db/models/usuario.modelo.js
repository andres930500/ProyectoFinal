const {Model, DataTypes} = require('sequelize');

const USUARIO_TABLE = 'usuarios';

const usuarioSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

class UsuarioModel extends Model {

    static associate(models){
        // this.belongsTo(models.UserModel, {foreignKey: 'user_id'});
    }

    static config(sequelize){
        return {
            sequelize,
            modelName: 'User',
            tableName: USUARIO_TABLE,
            timestamps: false
        }
    }

}

module.exports = {UsuarioModel, usuarioSchema, USUARIO_TABLE};