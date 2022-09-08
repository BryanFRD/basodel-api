const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');

const Purchase = DB.define('purchase', {
  ...BaseModel,
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  information: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
});

module.exports = Purchase;