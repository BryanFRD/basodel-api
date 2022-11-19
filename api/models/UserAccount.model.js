const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const RoleModel = require('./Role.model');
const PurchaseModel = require('./Invoice.model');
const GameHistoryModel = require('./GameHistory.model');
const ReportModel = require('./Report.model');
const ChatMessageModel = require('./ChatMessage.model');
const BlockedUserModel = require('./BlockedUser.model');
const InvoiceModel = require('./Invoice.model');
const ArticleModel = require('./Article.model');
const UserArticleModel = require('./UserArticle.model');

class UserAccountModel extends Model {}

UserAccountModel.init({
  ...BaseModel,
  username: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  silver: {
    type: DataTypes.INTEGER,
    defaultValue: 1000
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
    defaultValue: '1562b051-484b-43aa-ac51-0e57846668c0',
    allowNull: false
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
  as: 'blockedUser'
});

UserAccountModel.belongsToMany(ArticleModel, {
  through: UserArticleModel,
  uniqueKey: false
});

ArticleModel.belongsToMany(UserAccountModel, {
  through: UserArticleModel,
  uniqueKey: false
});

InvoiceModel.belongsTo(UserAccountModel);
UserAccountModel.hasMany(InvoiceModel);

module.exports = UserAccountModel;