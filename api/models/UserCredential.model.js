const DB = require('../db/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const UserAccount = require('./UserAccount.model');
const bcrypt = require('bcrypt');

class UserCredential extends Model {
  
  authenticate = async (password) => {
    const test = await bcrypt.compare(password, this.getDataValue('password'));
    console.log('password:', password);
    console.log(test, this.getDataValue('password'))
    return test;
  }
  
}

UserCredential.init({
  ...BaseModel,
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return 'password';
    }
  }
},{
  indexes: [
    {unique: true, fields: ['id']},
    {unique: true, fields: ['email']},
    {unique: true, fields: ['login']}
  ],
  sequelize: DB,
  modelName: 'user_credential',
  hooks: {
    beforeCreate: async (userCredential) => {
      if(userCredential?.getDataValue('password'))
        userCredential.password = await bcrypt.hash(userCredential.getDataValue('password'), 10);
    },
    beforeUpdate: async (userCredential) => {
      if(userCredential?.getDataValue('password'))
        userCredential.password = await bcrypt.hash(userCredential.getDataValue('password'), 10);
    }
  }
});

UserAccount.hasOne(UserCredential);
UserCredential.belongsTo(UserAccount);

module.exports = UserCredential;