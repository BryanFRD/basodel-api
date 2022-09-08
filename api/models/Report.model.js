const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const ReportStatus = require('./ReportStatus.model');

const Report = DB.define('report', {
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
});

Report.hasOne(ReportStatus);
ReportStatus.hasMany(Report);

module.exports = Report;