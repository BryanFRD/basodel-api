const express = require('express');
const { Op } = require('sequelize');
const Router = express.Router;
const jwt = require('jsonwebtoken');
const UserCredential = require('../models/UserCredential.model');

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
        include: [...Object.values(UserCredential.associations)]
      });
      console.log('userCredential:', userCredential);
      
      const isAuthenticated = await userCredential?.authenticate(password);
      
      if(!isAuthenticated)
        return res.status(401).send();
      
      const accessToken = this.generateAccessToken(userCredential.dataValues);
      
      return res.status(200).send({content: {accessToken}});
    });
  }
  
  generateAccessToken = (user) => {
    const tokenData = {
      userCredentialId: user.id,
      userAccountId: user.userAccountId,
      roleId: user.user_account.dataValues.roleId,
      isDeleted: user.isDeleted
    }
    
    console.log(tokenData);
    
    //TODO Change it to 1 week '604800s'
    const tokenDuration = '1800s';
    return jwt.sign(tokenData, process.env.ACCESS_TOKEN, {expiresIn: tokenDuration});
  }
  
}

module.exports = Auth;