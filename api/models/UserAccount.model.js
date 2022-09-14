const DB = require('../db/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const Role = require('./Role.model');
const Purchase = require('./Purchase.model');
const GameHistory = require('./GameHistory.model');
const Report = require('./Report.model');
const ChatMessage = require('./ChatMessage.model');

class UserAccount extends Model {}

UserAccount.init({
  ...BaseModel,
  username: {
    type: DataTypes.STRING(12),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [4, 12]
    }
  },
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      isNumeric: true,
      min: 0
    }
  },
  silver: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      isNumeric: true,
      min: 0
    }
  },
  gold: {
    type: DataTypes.INTEGER,
    defaultValue: 125,
    allowNull: true,
    validate: {
      isNumeric: true,
      min: 0
    }
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  indexes: [
    {unique: true, fields: [{name: 'username'}]}
  ],
  sequelize: DB,
  modelName: 'user_account',
});

Role.hasMany(UserAccount);
UserAccount.belongsTo(Role, {foreignKey: {
  defaultValue: 1,
  allowNull: false,
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