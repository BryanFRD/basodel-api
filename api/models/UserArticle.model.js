const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");

class UserArticleModel extends Model {}

UserArticleModel.init({
  userAccountId: {
    type: DataTypes.UUID
  },
  articleId: {
    type: DataTypes.UUID
  }
}, {
  sequelize: DB,
  modelName: 'user_article'
});

module.exports = UserArticleModel;