const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');

const Role = DB.define('role', {
  ...BaseModel,
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
});

module.exports = Role;