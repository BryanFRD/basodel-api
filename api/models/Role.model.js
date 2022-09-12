const DB = require('../db/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class Role extends Model {}

Role.init({
  ...BaseModel,
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  indexes: [{unique: true, fields: ['id']}],
  sequelize: DB,
  modelName: 'role',
});

module.exports = Role;