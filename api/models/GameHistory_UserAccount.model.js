const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');

const GameHistory_UserAccount = DB.define('gameHistory_userAccount', {
  
});

module.exports = GameHistory_UserAccount;