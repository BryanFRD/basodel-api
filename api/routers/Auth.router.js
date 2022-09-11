const express = require('express');
const Router = express.Router;
const jwt = require('jsonwebtoken');

class Auth {
  
  constructor(){
    this.router = Router();
    
    this.initializeRoutes();
  }
  
  initializeRoutes = () => {
    this.router.get('/', async (req, res) => {
      
      return res.status(401).send();
    });
  }
  
  generateAccessToken = (userId) => {
    //TODO Change it to 1 week '604800s'
    const tokenDuration = '1800s';
    return jwt.sign(userId, process.env.ACCESS_TOKEN, {expiresIn: ''});
  }
  
}

module.exports = Auth;