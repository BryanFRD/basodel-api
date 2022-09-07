const UserAccount = require('../models/UserAccount.model');
const BaseService = require('./BaseService.service');

class User extends BaseService {
  
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
      {...userCredentialParam,
        include: [userAccountParam]},
      {include: UserAccount})
      .then(model => ({statusCode: 201, content: {model}}))
      .catch(err => ({statusCode: 400, content: {err}}));
      
    return result;
  }
  
  select = async (model, validate, params) => {
    return {statusCode: 405, content: {error: "Request 'user' is meant to be only used with POST"}};
  }
  
  update = async (model, validate, params) => {
    return {statusCode: 405, content: {error: "Request 'user' is meant to be only used with POST"}};
  }
  
  delete = async (model, validate, params) => {
    return {statusCode: 405, content: {error: "Request 'user' is meant to be only used with POST"}};
  }
  
}

module.exports = User;