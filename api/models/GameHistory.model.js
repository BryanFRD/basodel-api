const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class GameHistoryModel extends Model {}

GameHistoryModel.init({
  ...BaseModel,
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  information: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize: DB,
  modelName: 'game_history',
});

module.exports = GameHistoryModel;