const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const UserCredential = require('./UserCredential.model');

const UserAccount = DB.define('user_account', {
  ...BaseModel,
  username: {
    type: DataTypes.STRING(16),
    allowNull: false,
    unique: true
  },
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  silver: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  gold: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
    allowNull: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  }
});

module.exports = UserAccount;