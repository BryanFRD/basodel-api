const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class InvoiceModel extends Model {}

InvoiceModel.init({
  ...BaseModel,
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  information: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize: DB,
  modelName: 'invoice',
  paranoid: true
});



module.exports = InvoiceModel;