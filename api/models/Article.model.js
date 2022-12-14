const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const ImageModel = require('./Image.model');
const CategoryModel = require('./Category.model');
const UserAccountModel = require('./UserAccount.model');
const InvoiceModel = require('./Invoice.model');
const UserArticleModel = require('./UserArticle.model');

class ArticleModel extends Model {}

ArticleModel.init({
  ...BaseModel,
  title: {
    type: DataTypes.STRING
  },
  silver: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  gold: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  promo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize: DB,
  modelName: 'article',
  paranoid: true
});

CategoryModel.hasMany(ArticleModel);
ArticleModel.belongsTo(CategoryModel);

ImageModel.hasOne(ArticleModel);
ArticleModel.belongsTo(ImageModel);

ArticleModel.belongsToMany(InvoiceModel, {
  through: 'article_invoice'
});

module.exports = ArticleModel;