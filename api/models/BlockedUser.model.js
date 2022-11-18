const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");

class BlockedUserModel extends Model {}

BlockedUserModel.init({}, {
  sequelize: DB,
  modelName: 'blocked_UserAccounts'
});

module.exports = BlockedUserModel;