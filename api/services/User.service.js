const MySQL = require('../database/MySQL.database');
const BaseService = require('./BaseService.service');

class User extends BaseService {
  
  insert = async (params) => {
    const userCredentialId = await MySQL.randomUUID('userCredential');
    const userAccountId = await MySQL.randomUUID('userAccount');
    
    return {userCredentialId: userCredentialId, userAccountId: userAccountId};
  }
  
  select = async (params) => {
    return null
  }
  
  update = async (params) => {
    
  }
  
  
  
}

module.exports = User;