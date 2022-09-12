const UserCredential = require('../models/UserCredential.model');
const UserAccount = require('../models/UserAccount.model');
const BaseService = require('./BaseService.service');

class User extends BaseService {
  
  association = UserCredential.belongsTo(UserAccount);
  
  insert = async (model, params) => {
    const userCredentialParam = params?.body?.model?.userCredential;
    const userAccountParam = params?.body?.model?.userAccount;
    
    if(!userCredentialParam || !userAccountParam)
      return {statusCode: 400, content: {error: 'Missing model'}}
    
    const result = model.UserCredential.create(
      {
        ...userCredentialParam,
        user_account: userAccountParam
      },
      {include: [this.association]})
      .then(model => ({statusCode: 201, content: {model}}))
      .catch(err => ({statusCode: 400, content: {err}}));
    
    return result;
  }
  
  select = async (model, params) => {
    return {statusCode: 405, content: {err: "Request 'user' is meant to only be used with POST"}};
  }
  
  update = async (model, params) => {
    return {statusCode: 405, content: {err: "Request 'user' is meant to only be used with POST"}};
  }
  
  delete = async (model, params) => {
    return {statusCode: 405, content: {err: "Request 'user' is meant to only be used with POST"}};
  }
  
}

module.exports = User;