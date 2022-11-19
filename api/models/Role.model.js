const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');

class RoleModel extends Model {}

//TODO get id 0 if selected id doesn't exist

RoleModel.init({
  ...BaseModel,
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
  paranoid: true
});

module.exports = RoleModel;