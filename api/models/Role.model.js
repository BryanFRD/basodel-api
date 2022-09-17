const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class Role extends Model {}

//TODO get id 0 if selected id doesn't exist

Role.init({
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
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize: DB,
  modelName: 'role',
});

module.exports = Role;