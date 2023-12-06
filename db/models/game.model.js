const { Model, DataTypes } = require('sequelize');

const GAME_TABLE = 'games';

const GameSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  compatiblePlatform: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gameModes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  coverImageUrl: {
    type: DataTypes.STRING,
    allowNull: false // Ahora no puede ser nulo
  }
};

class GameModel extends Model {
  static associate(models) {
    // Puedes agregar asociaciones aquí si es necesario
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'game',
      tableName: GAME_TABLE,
      timestamps: false
    };
  }
}

module.exports = { GameModel, GameSchema, GAME_TABLE };

