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
      
      if(!token)
        return res.sendStatus(401);
        
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if(err)
          return res.sendStatus(401);
        
        const userAccount = await UserAccount.findByPk(user.userAccountId,
          {include: [Role]})
          .then(value => value)
          .catch(error => res.status(401).send({content: {error}}));
          
          delete user.iat;
          delete user.exp;
          
          const tokenData = {
            ...user,
            isBanned: userAccount.isBanned,
            roleId: userAccount.roleId,
            roleLevel: userAccount.role?.level,
            isDeleted: userAccount.isDeleted
          }
          
          const accessToken = generateAccessToken(tokenData);
          
          return res.status(200).send({content: {accessToken}});
        });
    });
  }
  
}

module.exports = RefreshToken;