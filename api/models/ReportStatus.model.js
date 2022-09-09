const DB = require('../db/db');
const { DataTypes } = require("sequelize");
const BaseModel = require('./BaseModel.model');

const ReportStatus = DB.define('report_status', {
  ...BaseModel,
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  }
});

module.exports = ReportStatus;