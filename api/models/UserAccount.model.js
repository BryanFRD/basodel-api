const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const Role = require('./Role.model');
const Purchase = require('./Purchase.model');
const GameHistory = require('./GameHistory.model');
const Report = require('./Report.model');
const ChatMessage = require('./ChatMessage.model');

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
    allowNull: true
  },
  silver: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  gold: {
    type: DataTypes.INTEGER,
    defaultValue: 125,
    allowNull: true
  }
});

Role.hasMany(UserAccount);
UserAccount.belongsTo(Role, {foreignKey: {
  defaultValue: 1,
  allowNull: true
}});

UserAccount.hasMany(ChatMessage);
ChatMessage.belongsTo(UserAccount);

UserAccount.hasMany(Purchase);
Purchase.belongsTo(UserAccount);

UserAccount.hasMany(GameHistory);
GameHistory.belongsToMany(UserAccount, {through: 'gamehistory_useraccount'});

UserAccount.hasMany(Report);
Report.belongsTo(UserAccount);

module.exports = UserAccount;