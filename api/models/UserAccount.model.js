const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const RoleModel = require('./Role.model');
const PurchaseModel = require('./Purchase.model');
const GameHistoryModel = require('./GameHistory.model');
const ReportModel = require('./Report.model');
const ChatMessageModel = require('./ChatMessage.model');
const BlockedUserModel = require('./BlockedUser.model');

class UserAccountModel extends Model {}

UserAccountModel.init({
  ...BaseModel,
  username: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  silver: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  gold: {
    type: DataTypes.INTEGER,
    defaultValue: 125,
    allowNull: true
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  indexes: [
    {unique: true, fields: ['username']}
  ],
  sequelize: DB,
  modelName: 'user_account',
  paranoid: true
});

UserAccountModel.hasMany(ChatMessageModel);
ChatMessageModel.belongsTo(UserAccountModel);

UserAccountModel.hasMany(PurchaseModel);
PurchaseModel.belongsTo(UserAccountModel);

UserAccountModel.hasMany(ReportModel);
ReportModel.belongsTo(UserAccountModel);

RoleModel.hasMany(UserAccountModel);
UserAccountModel.belongsTo(RoleModel, {
  foreignKey: {
    defaultValue: 1,
    allowNull: false,
  }
});

GameHistoryModel.belongsToMany(UserAccountModel, {
  through: 'gamehistory_useraccount'
});

UserAccountModel.belongsToMany(GameHistoryModel, {
  through: 'gamehistory_useraccount'
});

UserAccountModel.belongsToMany(UserAccountModel, {
  through: BlockedUserModel,
  foreignKey: 'userAccountId',
  as: 'blockedUser',
});

module.exports = UserAccountModel;