const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');

const UserCredential = DB.define('user_credential', {
  ...BaseModel,
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userAccountId: {
    type: DataTypes.UUID,
    allowNull: true
  }
});

module.exports = UserCredential;