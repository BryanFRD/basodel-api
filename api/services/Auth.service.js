const DB = require('../database/db');
const Role = require('../models/Role.model');
const UserAccount = require('../models/UserAccount.model');
const UserCredential = require('../models/UserCredential.model');

class Auth {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  insert = async (model, req, res) => {
    const userCredential = await UserCredential.findOne({
      where: {
        [Op.or]: [
          {email: req.body.model.email},
          {login: req.body.model.login}
        ]
      },
      include: [
        UserAccount,
        {model: UserAccount, include: [Role]}
      ]
    });
    
    const isAuthenticated = await userCredential?.authenticate(password);
    
    if(!isAuthenticated)
      return res.status(401).send({error: 'error.authentication'});
    
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
    
    return res.status(200).send({accessToken, refreshToken, user_account: user.user_account});
  }
  
  // READ
  select = async (model, req, res) => {
    
    return res.sendStatus(200);
  }
  
  // DELETE
  delete = async (model, req, res) => {
    //TODO Delete token from cache
    return res.status(405).send({message: `DELETE ${params.id} FROM ${this.table}`});
  }
  
}

module.exports = Auth;