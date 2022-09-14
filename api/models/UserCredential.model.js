const DB = require('../db/db');
const { DataTypes, Model } = require("sequelize");
const BaseModel = require('./BaseModel.model');
const UserAccount = require('./UserAccount.model');
const bcrypt = require('bcrypt');

class UserCredential extends Model {
  
  authenticate = async (password) => {
    const authenticate = await bcrypt.compare(password, this.getDataValue('password'));
    return authenticate;
  }
  
}

UserCredential.init({
  ...BaseModel,
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      isEmail: true
    }
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      len: [4, 50]
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [4, 255]
    },
    get() {
      return 'password';
    }
  }
},{
  indexes: [
    {unique: true, fields: [{name:'email'}]},
    {unique: true, fields: [{name:'login'}]},
    {unique: true, fields: [{name:'userAccountId'}]}
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