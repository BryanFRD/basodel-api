const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");

class UserArticleModel extends Model {}

UserArticleModel.init({}, {
  sequelize: DB,
  modelName: 'user_article'
});

module.exports = UserArticleModel;