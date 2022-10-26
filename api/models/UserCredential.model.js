const DB = require('../database/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const UserAccountModel = require('./UserAccount.model');
const bcrypt = require('bcrypt');

class UserCredentialModel extends Model {
  
  authenticate = async (password) => {
    console.log('password:', bcrypt.hashSync(password, 10));
    console.log('this.getDataValue("password"):', this.getDataValue('password'));
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
  paranoid: true,
  hooks: {
    beforeCreate: (userCredential) => {
      if(userCredential?.getDataValue('password'))
        userCredential.password = bcrypt.hashSync(userCredential.getDataValue('password'), 10);
    },
    beforeUpdate: (userCredential) => {
      if(userCredential?.getDataValue('password'))
        userCredential.password = bcrypt.hashSync(userCredential.getDataValue('password'), 10);
    }
  }
});

UserAccountModel.hasOne(UserCredentialModel);
UserCredentialModel.belongsTo(UserAccountModel);

module.exports = UserCredentialModel;