const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const ReportStatusModel = require('./ReportStatus.model');

class ReportModel extends Model {}

ReportModel.init({
  ...BaseModel,
  reportedUserId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  origin: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize: DB,
  modelName: 'report',
  paranoid: true
});

ReportModel.hasMany(ReportStatusModel);
ReportStatusModel.hasMany(ReportModel, {foreignKey: {
  defaultValue: '1232b051-484b-43aa-ac51-0e57846668c0',
  allowNull: true
}});

module.exports = ReportModel;