const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');

const ReportStatus = DB.define('report_status', {
  ...BaseModel,
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  }
});

module.exports = ReportStatus;