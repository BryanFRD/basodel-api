const UserAccount = require('../models/UserAccount.model');
const BaseService = require('./BaseService.service');

class UserCredential extends BaseService {
  
  // association = UserCredentialModel.belongsTo(UserAccount);
  
  // insert = (model, validate, params) => {
  //   console.log(UserCredentialModel);
  //   return {statusCode: 400};
  // }
  
}

module.exports = UserCredential;