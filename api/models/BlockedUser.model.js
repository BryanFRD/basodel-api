const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class BlockedUserModel extends Model {}

BlockedUserModel.init({
  userAccountId: {
    type: DataTypes.UUID
  },
  blockedUserAccountId: {
    type: DataTypes.UUID
  }
}, {
  sequelize: DB,
  modelName: 'blocked_UserAccounts'
});

module.exports = BlockedUserModel;