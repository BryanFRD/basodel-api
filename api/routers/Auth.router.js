const express = require('express');
const { Op } = require('sequelize');
const Router = express.Router;
const UserCredential = require('../models/UserCredential.model');
const Role = require('../models/Role.model');
const UserAccount = require('../models/UserAccount.model');

class Auth {
  
  constructor(){
    this.router = Router();
    
    this.initializeRoutes();
  }
  
  initializeRoutes = () => {
    this.router.get('/', async (req, res) => {
      const model = req?.body?.model;
      
      const loginOrEmail = model?.loginOrEmail;
      const password = model?.password;
      
      if(!loginOrEmail || !password)
        return res.status(401).send();
      
      const userCredential = await UserCredential.findOne({
        where: {
          [Op.or]: [
            {email: loginOrEmail},
            {login: loginOrEmail}
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
        userCredentialId: user.id,
        userAccountId: user.user_account.id,
        isBanned: user.user_account.isBanned,
        roleId: user.user_account.roleId,
        roleLevel: user.user_account.role.level,
        isDeleted: user.user_account.isDeleted
      }
        
      const accessToken = generateAccessToken(tokenData);
      const refreshToken = generateRefreshToken(tokenData);
      
      return res.status(200).send({content: {accessToken, refreshToken}});
    });
  }
  
}

module.exports = Auth;