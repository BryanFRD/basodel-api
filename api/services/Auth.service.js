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
    
    const isAuthenticated = await userCredential?.authenticate(req.body.model.password);
    
    if(!isAuthenticated)
      return res.status(401).send({error: 'error.authentication'});
    
    const {user_account} = userCredential.toJSON();
    
    const tokenData = {
      id: user_account.id,
      isBanned: user_account.isBanned,
      roleId: user_account.roleId,
      roleLevel: user_account.role.level,
    }
      
    const accessToken = generateAccessToken(tokenData);
    const refreshToken = generateRefreshToken(tokenData);
    
    return res.status(200).send({accessToken, refreshToken, userAccount: user_account});
  }
  
  // READ
  select = async (model, req, res) => {
    const auth = req?.headers['authorization'];
    const token = auth?.split(' ')[1];
    
    if(!token)
      return res.sendStatus(404);
      
    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
      if(err)
        return res.sendStatus(404);
      
      await UserAccount.findByPk(user.id,
        {include: [Role]})
        .then(value => {
          const userAccount = value.toJSON();
          const tokenData = {
            id: userAccount.id,
            roleId: userAccount.roleId,
            roleLevel: userAccount.role.level
          }
          
          const accessToken = generateAccessToken(tokenData);
          
          res.status(200).send({accessToken, userAccount});
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