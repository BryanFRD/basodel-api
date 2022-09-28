const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class ChatMessageModel extends Model {}

ChatMessageModel.init({
  ...BaseModel,
  message: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  }
}, {
  sequelize: DB,
  modelName: 'chat_message',
  paranoid: true
});

module.exports = ChatMessageModel;