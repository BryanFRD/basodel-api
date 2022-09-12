const express = require('express');
const Router = express.Router;
const jwt = require('jsonwebtoken');
const Role = require('../models/Role.model');
const UserAccount = require('../models/UserAccount.model');

class RefreshToken {
  
  constructor(){
    this.router = Router();
    
    this.initializeRoutes();
  }
  
  initializeRoutes = () => {
    this.router.get('/', async (req, res) => {
      const auth = req?.headers['authorization'];
      const token = auth?.split(' ')[1];
      
      console.log(getRefreshTokens())
      
      if(!token || !getRefreshTokens().includes(token))
        return res.sendStatus(401);
        
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if(err)
          return res.sendStatus(401);
        
        const userAccount = await UserAccount.findByPk(user.userAccountId,
          {include: [Role]})
          .then(value => value)
          .catch(error => res.status(401).send({content: {error}}));
          
          console.log('userAccount:', userAccount);
          
          delete user.iat;
          delete user.exp;
          
          const tokenData = {
            ...user
          }
          
          console.log('tokenData:', tokenData);
          
          const accessToken = generateAccessToken(tokenData);
          
          return res.status(200).send({content: {accessToken}});
        })
        
        // const tokenData = {
        //   userCredentialId: user.id,
        //   userAccountId: user.user_account.id,
        //   isBanned: user.user_account.isBanned,
        //   roleId: user.user_account.roleId,
        //   roleLevel: user.user_account.role.level,
        //   isDeleted: user.isDeleted
        // }
        
      return res.sendStatus(418);
    });
  }
  
}

module.exports = RefreshToken;