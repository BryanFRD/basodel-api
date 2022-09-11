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
      const model = req?.body?.model.loginOrEmail
      if(!model)
        return res.status(401).send();
      
      const userCredential = await UserCredential.findOne({
        where: {
          [Op.or]: [
            {email: req.body.model.loginOrEmail},
            {login: req.body.model.loginOrEmail}
          ]
        }
      });
      
      if(!userCredential)
        return res.status(401).send();
      
        console.log(userCredential);
        
      const accessToken = this.generateAccessToken(userCredential);
        
      return res.status(200).send({content: {accessToken}});
    });
  }
  
  generateAccessToken = (userId) => {
    //TODO Change it to 1 week '604800s'
    const tokenDuration = '1800s';
    return jwt.sign(userId, process.env.ACCESS_TOKEN, {expiresIn: tokenDuration});
  }
  
}

module.exports = Auth;