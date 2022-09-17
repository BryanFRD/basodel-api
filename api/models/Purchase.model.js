const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class Purchase extends Model {}

Purchase.init({
  ...BaseModel,
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  information: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
}, {
  sequelize: DB,
  modelName: 'purchase',
});

module.exports = Purchase;