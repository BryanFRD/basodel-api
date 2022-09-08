const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');

const ChatMessage = DB.define('chat_message', {
  ...BaseModel,
  message: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  }
});

module.exports = ChatMessage;