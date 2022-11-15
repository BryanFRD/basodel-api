const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class ImageModel extends Model {}

ImageModel.init({
  ...BaseModel,
  src: {
    type: DataTypes.STRING
  },
  alt: {
    type: DataTypes.STRING
  }
}, {
  sequelize: DB,
  modelName: 'image',
  paranoid: true
});

module.exports = ImageModel;