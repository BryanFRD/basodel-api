const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const UserAccountModel = require('./UserAccount.model');
const bcrypt = require('bcrypt');

class UserCredentialModel extends Model {
  
  authenticate = async (password) => {
    return await bcrypt.compare(password, this.getDataValue('password'));
  }
  
}

UserCredentialModel.init({
  ...BaseModel,
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    },
    get() {
      return 'password';
    }
  }
},{
  indexes: [
    {unique: true, fields: ['email']},
    {unique: true, fields: ['login']},
    {unique: true, fields: ['userAccountId']}
  ],
  sequelize: DB,
  modelName: 'user_credential',
  paranoid: true
});

UserAccountModel.hasOne(UserCredentialModel);
UserCredentialModel.belongsTo(UserAccountModel);

module.exports = UserCredentialModel;