const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');

const GameHistory = DB.define('game_history', {
  ...BaseModel,
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  information: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
});

module.exports = GameHistory;