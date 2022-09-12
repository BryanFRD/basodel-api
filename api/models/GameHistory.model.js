const DB = require('../db/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class GameHistory extends Model {}

GameHistory.init({
  ...BaseModel,
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  information: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
}, {
  indexes: [{unique: true, fields: ['id']}],
  sequelize: DB,
  modelName: 'game_history',
});

module.exports = GameHistory;