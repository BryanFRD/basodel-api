const DB = require('../database/db');
const Role = require('../models/Role.model');
const UserAccount = require('../models/UserAccount.model');

class Auth {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  insert = async (model, params) => {
    const userCredential = await UserCredential.findOne({
      where: {
        [Op.or]: [
          {email: params.email},
          {login: params.login}
        ]
      },
      include: [
        UserAccount,
        {model: UserAccount, include: [Role]}
      ]
    });
    
    const isAuthenticated = await userCredential?.authenticate(password);
    
    if(!isAuthenticated)
      return res.status(401).send('error.authentication');
    
    const user = userCredential.dataValues;
    
    const tokenData = {
      id: user.user_account.id,
      isBanned: user.user_account.isBanned,
      roleId: user.user_account.roleId,
      roleLevel: user.user_account.role.level,
      isDeleted: user.user_account.isDeleted
    }
      
    const accessToken = generateAccessToken(tokenData);
    const refreshToken = generateRefreshToken(tokenData);
    
    return res.status(200).send({content: {accessToken, refreshToken, user_account: user.user_account}});
  }
  
  // READ
  select = async (model, params) => {
    
    return result;
  }
  
  // DELETE
  delete = async (model, params) => {
    //TODO Delete token from cache
    return {statusCode: 405, content: {err: `DELETE ${params.id} FROM ${this.table}`}};
  }
  
}

module.exports = Auth;