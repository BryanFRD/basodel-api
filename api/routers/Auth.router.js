const express = require('express');
const { Op } = require('sequelize');
const Router = express.Router;
const jwt = require('jsonwebtoken');
const UserCredential = require('../models/UserCredential.model');
const bcrypt = require('bcrypt');

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
        }
      });
      
      if(!userCredential)
        return res.status(401).send();
      
      const isValide = await bcrypt.compare(password, userCredential.dataValues.password);
      delete userCredential.dataValues.password;
      
      if(!isValide)
        return res.status(401).send();
        
      const accessToken = this.generateAccessToken(userCredential.dataValues);
      
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