const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const ReportStatus = require('./ReportStatus.model');

class Report extends Model {}

Report.init({
  ...BaseModel,
  reportedUserId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4
    }
  },
  content: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  origin: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
}, {
  sequelize: DB,
  modelName: 'report',
});

Report.hasOne(ReportStatus);
ReportStatus.hasMany(Report, {foreignKey: {
  defaultValue: 1,
  allowNull: true
}});

module.exports = Report;