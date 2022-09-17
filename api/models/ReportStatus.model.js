const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class ReportStatus extends Model {}

//TODO get id 0 if selected id doesn't exist

ReportStatus.init({
  ...BaseModel,
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  }
}, {
  sequelize: DB,
  modelName: 'report_status',
});

module.exports = ReportStatus;