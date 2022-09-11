const UserAccount = require('../models/UserAccount.model');
const BaseService = require('./BaseService.service');

class UserCredential extends BaseService {
  
  association = UserCredential.belongsTo(UserAccount);
  
  insert = (model, validate, params) => {
    console.log(model.associations);
  }
  
}

module.exports = UserCredential;