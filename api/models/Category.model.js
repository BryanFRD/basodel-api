const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const ArticleModel = require('./Article.model');

class CategoryModel extends Model {}

CategoryModel.init({
  ...BaseModel,
  title: {
    type: DataTypes.STRING
  }
}, {
  sequelize: DB,
  modelName: 'category',
  paranoid: true
});

module.exports = CategoryModel;