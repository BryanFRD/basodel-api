const DB = require('../db/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class ChatMessage extends Model {}

ChatMessage.init({
  ...BaseModel,
  message: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
}, {
  indexes: [{unique: true, fields: ['id']}],
  sequelize: DB,
  modelName: 'chat_message',
});

module.exports = ChatMessage;