const MySQL = require('../database/MySQL.database');
const BaseService = require('./BaseService.service');
const UserCredential = require('../services/UserCredential.service');
const UserAccount = require('../services/UserAccount.service');

class User extends BaseService {
  
  insert = async ({body}) => {
    const userCredentialId = await MySQL.randomUUID('userCredential');
    const userAccountId = await MySQL.randomUUID('userAccount');
    
    const userCredentialResponse =
      await new UserCredential().insert({body: body.userCredential});
    
    if(!userCredentialResponse.statusCode.toString().startsWith('2'))
      return userCredentialResponse;
      
    const userAccountResponse =
      await new UserAccount().insert({body: body.userAccount});
    
    if(!userAccountResponse.statusCode.toString().startsWith('2'))
      return userAccountResponse;
    
    return {statusCode: 201, content: {userCredentialId, userAccountId}};
  }
  
  select = async (params) => {
    return {statusCode: 405};
  }
  
  update = async (params) => {
    return {statusCode: 405};
  }
  
}

module.exports = User;