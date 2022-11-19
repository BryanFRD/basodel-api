const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class ReportStatusModel extends Model {}

//TODO get id 0 if selected id doesn't exist

ReportStatusModel.init({
  ...BaseModel,
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  }
}, {
  sequelize: DB,
  modelName: 'report_status',
  paranoid: true
});

module.exports = ReportStatusModel;