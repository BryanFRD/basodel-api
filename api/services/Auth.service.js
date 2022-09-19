const BaseService = require('./BaseService.service');
const { Op } = require('sequelize');
const Role = require('../models/Role.model');
const UserAccount = require('../models/UserAccount.model');
const UserCredential = require('../models/UserCredential.model');
const jwt = require('jsonwebtoken');

class Auth extends BaseService {
  
  // CREATE
  create = async (model, req, res) => {
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
    
    if(!userCredential)
      return res.status(404).send({error: 'error.auth.create.notFound'});
    
    if(!userCredential.emailConfirmed)
      return res.status(401).send({error: 'error.auth.create.confirmEmail'});
    
    const isAuthenticated = await userCredential.authenticate(req.body.model.password);
    
    if(!isAuthenticated)
      return res.status(401).send({error: 'error.auth.create.authentication'});
    
    const uc = userCredential.toJSON();
    
    const tokenData = {
      userCredentialId: uc.id,
      id: uc.user_account.id,
      isBanned: uc.user_account.isBanned,
      roleId: uc.user_account.roleId,
      roleLevel: uc.user_account.role.level,
    }
    
    const accessToken = generateAccessToken(tokenData);
    const refreshToken = generateRefreshToken(tokenData);
    
    return res.status(200).send({accessToken, refreshToken, userAccount: uc.user_account});
  }
  
  // READ
  select = async (model, req, res) => {
    const auth = req?.headers['authorization'];
    const token = auth?.split(' ')[1];
    
    if(!token)
      return res.sendStatus(401);
      
    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
      if(err)
        return res.sendStatus(401);
      
      await UserCredential.findByPk(user.userCredentialId,
        {include: [
          UserAccount,
          {model: UserAccount, include: [Role]}
        ]})
        .then(value => {
          const uc = value.toJSON();
          
          if(!uc)
            return res.status(401).send({error: 'error.auth.get.notFound'});
          
          if(!uc.emailConfirmed)
            return res.status(401).send({error: 'error.auth.get.confirmEmail'});
          
          const tokenData = {
            userCredentialId: uc.id,
            id: uc.user_account.id,
            isBanned: uc.user_account.isBanned,
            roleId: uc.user_account.roleId,
            roleLevel: uc.user_account.role.level,
          }
          
          const accessToken = generateAccessToken(tokenData);
          
          res.status(200).send({accessToken, userAccount: uc.user_account});
        })
        .catch(error => res.status(404).send({error}));
      });
  }
  
  // DELETE
  delete = async (model, req, res) => {
    //TODO Delete token from cache
    return res.status(405).send({message: `DELETE ${params.id} FROM ${this.table}`});
  }
  
}

module.exports = Auth;