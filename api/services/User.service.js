const UserCredential = require('../models/UserCredential.model');
const UserAccount = require('../models/UserAccount.model');
const BaseService = require('./BaseService.service');

class User extends BaseService {
  
  association = UserCredential.belongsTo(UserAccount);
  
  insert = async (model, validate, params) => {
    const userCredentialParam = params?.body?.model?.userCredential;
    const userAccountParam = params?.body?.model?.userAccount;
    
    if(!userCredentialParam || !userAccountParam)
      return {statusCode: 400, content: {error: 'Missing model'}}
    
    const userCredentialValidatorError = validate.UserCredential(userCredentialParam);
    const userAccountValidatorError = validate.UserAccount(userAccountParam)
    
    if(userCredentialValidatorError.error || userAccountValidatorError.error){
      return {statusCode: 400, 
        content: {
          msg: 'Missing values in models',
          userCredentialError: userCredentialValidatorError.error,
          userAccountError: userAccountValidatorError.error
        }
      };
    }
    
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
  
  select = async (model, validate, params) => {
    return {statusCode: 405, content: {err: "Request 'user' is meant to only be used with POST"}};
  }
  
  update = async (model, validate, params) => {
    return {statusCode: 405, content: {err: "Request 'user' is meant to only be used with POST"}};
  }
  
  delete = async (model, validate, params) => {
    return {statusCode: 405, content: {err: "Request 'user' is meant to only be used with POST"}};
  }
  
}

module.exports = User;