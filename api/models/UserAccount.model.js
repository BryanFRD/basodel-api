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
    allowNull: false,
  },
  silver: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  gold: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
});

module.exports = UserAccount;