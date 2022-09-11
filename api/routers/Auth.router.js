const express = require('express');
const Router = express.Router;

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
  
}

module.exports = Auth;