const DB = require('../db/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const UserAccount = require('./UserAccount.model');
const bcrypt = require('bcrypt');

class UserCredential extends Model {
  
  authenticate = (password) => {
    console.log(this);
    return false;
  }
  
}

UserCredential.init({
  ...BaseModel,
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  sequelize: DB,
  modelName: 'user_credential',
  hooks: {
    beforeCreate: async (userCredential) => {
      if(userCredential.password){
        const salt = await bcrypt.genSalt(10);
        userCredential.password = await bcrypt.hash(userCredential.password, salt);
      }
    },
    beforeUpdate: async (userCredential) => {
      if(userCredential.password){
        const salt = await bcrypt.genSalt(10);
        userCredential.password = await bcrypt.hash(userCredential.password, salt);
      }
    }
  }
});

UserAccount.hasOne(UserCredential);
UserCredential.belongsTo(UserAccount);

module.exports = UserCredential;