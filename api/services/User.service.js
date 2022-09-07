const MySQL = require('../database/MySQL.database');
const BaseService = require('./BaseService.service');

class User extends BaseService {
  
  insert = async ({body}) => {
    const model = body?.model;
    
    if(!model?.usercredential || !model?.useraccount)
    return {statusCode: 400}
    
    const userCredentialId = await MySQL.randomUUID('userCredential');
    const userAccountId = await MySQL.randomUUID('userAccount');
    
    model.usercredential = 
    {
      ...model.usercredential,
      id: userCredentialId.toString(),
      userAccountId: userAccountId.toString()
    };
    model.useraccount = {
      ...model.useraccount,
      id: userAccountId.toString()
    };
    
    const userCredentialSQL = this.getUserCredentialSQL(model.usercredential);
    const userAccountSQL = this.getUserAccountSQL(model.useraccount);
    
    const sql = `${userCredentialSQL}; ${userAccountSQL};`;
    
    /*
    INSERT INTO 'usercredential'('id', 'email', 'login', 'password', 'createdDate', 'lastUpdatedDate', 'isDeleted', 'userAccountId') 
    VALUES ('a','b','c','d','e','f','g','h');
    INSERT INTO 'useraccount'('id', 'username', 'xp', 'silver', 'gold', 'createdDate', 'lastUpdatedDate', 'isDeleted', 'roleId')
    VALUES ('a','b','c','d','e','f','g','h','i');
    */
    
    // const userCredentialResponse =
    //   await new UserCredential().insert({body: body.userCredential});
    
    // if(!userCredentialResponse.statusCode.toString().startsWith('2'))
    //   return userCredentialResponse;
      
    // const userAccountResponse =
    //   await new UserAccount().insert({body: body.userAccount});
    
    // if(!userAccountResponse.statusCode.toString().startsWith('2'))
    //   return userAccountResponse;
    
    return {statusCode: 418, content: {sql}};
  }
  
  select = async (params) => {
    return {statusCode: 405};
  }
  
  update = async (params) => {
    return {statusCode: 405};
  }
  
  getUserCredentialSQL = (model) => {
    const keys = [];
    const values = [];
    
    Object.entries(model).forEach(([key, value]) => {
      keys.push(`'${key}'`);
      values.push(`'${value}'`);
    });
    
    const userCredentialSQL =
    `INSERT INTO 'usercredential' (${keys.join(',')}) VALUES (${values.join(',')})`;
    
    return userCredentialSQL;
  }
  
  getUserAccountSQL = (model) => {
    const keys = [];
    const values = [];
    
    Object.entries(model).forEach(([key, value]) => {
      keys.push(`'${key}'`);
      values.push(`'${value}'`);
    });
    
    const userAccountSQL =
    `INSERT INTO 'useraccount' (${keys.join(',')}) VALUES (${values.join(',')})`;
    
    return userAccountSQL;
  }
  
}

module.exports = User;