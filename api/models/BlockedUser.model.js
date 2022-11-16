const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");

class BlockedUserModel extends Model {}

BlockedUserModel.init({
  userAccountId: {
    type: DataTypes.UUID
  },
  blockedUserId: {
    type: DataTypes.UUID
  }
}, {
  sequelize: DB,
  modelName: 'blocked_UserAccounts'
});

module.exports = BlockedUserModel;